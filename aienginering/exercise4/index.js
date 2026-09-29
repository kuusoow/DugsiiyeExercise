import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Cost tracking rate table (per unit)
const COST_RATES = {
  gpt4o: { prompt: 0.0025 / 1000, completion: 0.01 / 1000 },
  gpt4oMini: { prompt: 0.00015 / 1000, completion: 0.0006 / 1000 },
  dalle3Hd: 0.08,
  gptImage1: 0.04,
  tts1HdChar: 0.03 / 1000
};

// Advanced Feature: Performance Monitoring & Cost Tracker
class StudioMonitor {
  constructor() {
    this.logs = [];
    this.totalCost = 0;
  }

  record(stage, durationMs, cost, details = {}) {
    this.totalCost += cost;
    const logEntry = { stage, durationMs: `${durationMs}ms`, cost: `$${cost.toFixed(4)}`, ...details };
    this.logs.push(logEntry);
    console.log(`⏱️ [${stage}] ${durationMs}ms | Estimated Cost: $${cost.toFixed(4)}`);
  }

  getMetrics() {
    return {
      totalCost: `$${this.totalCost.toFixed(4)}`,
      stageBreakdown: this.logs
    };
  }
}

// Wrapper to monitor execution latency and costs
async function executeMonitoredTask(monitor, stageName, costCalculator, actionFn) {
  const start = Date.now();
  const result = await actionFn();
  const duration = Date.now() - start;
  const cost = costCalculator(result);
  monitor.record(stageName, duration, cost);
  return result;
}

// 1. Content Creation: Generate article, summary, social posts, and audio script
async function generateContent(topic, monitor) {
  const prompt = `
    You are an AI Content Creator. Produce a full content package for the topic: "${topic}".
    Return ONLY a valid JSON object matching this schema:
    {
      "article": "Comprehensive markdown article...",
      "summary": "Concise executive summary...",
      "socialPosts": {
        "twitter": "Engaging tweet with hashtags",
        "linkedin": "Professional LinkedIn post"
      },
      "narrationScript": "Expressive narration script with emotional tone cues in brackets like [Enthusiastic] or [Thoughtful]."
    }
  `;

  return executeMonitoredTask(
    monitor,
    'Content Creation',
    (res) => {
      const usage = res.usage || { prompt_tokens: 500, completion_tokens: 800 };
      return (usage.prompt_tokens * COST_RATES.gpt4o.prompt) + (usage.completion_tokens * COST_RATES.gpt4o.output);
    },
    async () => {
      // 4. Quality Control: Primary model attempt with fallback strategy
      try {
        const response = await openai.chat.completions.create({
          model: 'gpt-4o',
          response_format: { type: 'json_object' },
          messages: [{ role: 'user', content: prompt }]
        });
        return {
          data: JSON.parse(response.choices[0].message.content),
          usage: response.usage
        };
      } catch (err) {
        console.warn(`⚠️ Primary text generation failed. Activating gpt-4o-mini fallback...`);
        const fallbackRes = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          response_format: { type: 'json_object' },
          messages: [{ role: 'user', content: prompt }]
        });
        return {
          data: JSON.parse(fallbackRes.choices[0].message.content),
          usage: fallbackRes.usage
        };
      }
    }
  );
}

// 2. Visual Design: Headers with DALL-E 3 and thumbnails with gpt-image-1
async function generateVisuals(topic, monitor) {
  // Generate Header using DALL-E 3
  const headerTask = executeMonitoredTask(
    monitor,
    'Visual Design - DALL-E 3 Header',
    () => COST_RATES.dalle3Hd,
    async () => {
      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: `High-resolution modern header banner illustration for topic: ${topic}`,
        n: 1,
        size: '1024x1024',
        quality: 'hd'
      });
      return response.data[0].url;
    }
  );

  // Generate Thumbnail using gpt-image-1 (with DALL-E fallback)
  const thumbnailTask = executeMonitoredTask(
    monitor,
    'Visual Design - Thumbnail',
    () => COST_RATES.gptImage1,
    async () => {
      try {
        const response = await openai.images.generate({
          model: 'gpt-image-1',
          prompt: `Vibrant icon-style blog thumbnail for: ${topic}`,
          n: 1,
          size: '1024x1024'
        });
        return response.data[0].url;
      } catch (err) {
        console.warn(`⚠️ gpt-image-1 unavailable. Falling back to DALL-E 3 standard thumbnail...`);
        const fallbackResponse = await openai.images.generate({
          model: 'dall-e-3',
          prompt: `Vibrant icon-style blog thumbnail for: ${topic}`,
          n: 1,
          size: '1024x1024',
          quality: 'standard'
        });
        return fallbackResponse.data[0].url;
      }
    }
  );

  const [headerUrl, thumbnailUrl] = await Promise.all([headerTask, thumbnailTask]);
  return { headerUrl, thumbnailUrl };
}

// 3. Audio Production: Narration with voice control and emotions[cite: 2]
async function generateAudio(script, voice, monitor) {
  return executeMonitoredTask(
    monitor,
    `Audio Production (${voice})`,
    () => script.length * COST_RATES.tts1HdChar,
    async () => {
      try {
        const response = await openai.audio.speech.create({
          model: 'tts-1-hd',
          voice: voice,
          input: script,
          response_format: 'mp3',
          speed: 1.0
        });
        return Buffer.from(await response.arrayBuffer());
      } catch (err) {
        console.warn(`⚠️ HD Audio failed. Falling back to standard tts-1 model...`);
        const fallbackResponse = await openai.audio.speech.create({
          model: 'tts-1',
          voice: voice,
          input: script,
          response_format: 'mp3'
        });
        return Buffer.from(await fallbackResponse.arrayBuffer());
      }
    }
  );
}

// 5. Export System: Package content suite into output directory[cite: 2]
async function exportContentSuite(topic, content, visuals, audioBuffer, metrics, outputDir) {
  await fs.mkdir(outputDir, { recursive: true });

  await fs.writeFile(path.join(outputDir, 'article.md'), `# ${topic}\n\n${content.article}`);
  await fs.writeFile(path.join(outputDir, 'summary.txt'), content.summary);
  await fs.writeFile(path.join(outputDir, 'social_posts.json'), JSON.stringify(content.socialPosts, null, 2));
  await fs.writeFile(path.join(outputDir, 'narration.mp3'), audioBuffer);

  const suiteManifest = {
    topic,
    generatedAt: new Date().toISOString(),
    content,
    visuals: {
      headerUrl: visuals.headerUrl,
      thumbnailUrl: visuals.thumbnailUrl
    },
    audioFile: 'narration.mp3',
    performanceAndCostMetrics: metrics
  };

  await fs.writeFile(path.join(outputDir, 'suite_manifest.json'), JSON.stringify(suiteManifest, null, 2));
  console.log(`📦 Content suite packaged successfully: ${outputDir}`);
}

// Full pipeline execution for single topic
async function processContentStudio(topic, voice = 'nova') {
  console.log(`\n🎬 Starting Content Studio pipeline for: "${topic}"`);
  const monitor = new StudioMonitor();
  const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const outputDir = path.join(process.cwd(), 'dist_content_suite', slug);

  try {
    const { data: content } = await generateContent(topic, monitor);

    const [visuals, audioBuffer] = await Promise.all([
      generateVisuals(topic, monitor),
      generateAudio(content.narrationScript, voice, monitor)
    ]);

    await exportContentSuite(topic, content, visuals, audioBuffer, monitor.getMetrics(), outputDir);
  } catch (err) {
    console.error(`❌ Content Studio execution failed for "${topic}":`, err.message);
  }
}

// Advanced Feature: Batch Processing[cite: 2]
async function runBatchProcessing(items) {
  console.log(`⚡ Initiating batch processing for ${items.length} topics...`);
  for (const item of items) {
    await processContentStudio(item.topic, item.voice);
  }
  console.log(`\n✨ Batch processing complete!`);
}

// Execute Application Batch
const contentBatch = [
  { topic: 'AI Infrastructure in 2026', voice: 'onyx' },
  { topic: 'Sustainable Energy Systems', voice: 'nova' }
];

await runBatchProcessing(contentBatch);