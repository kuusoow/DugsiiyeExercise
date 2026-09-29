import OpenAI from 'openai';
import fs from 'fs/promises';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


const conversation = [
  {
    id: 1,
    speaker: 'Alex',
    voice: 'nova',
    emotion: 'excited',
    text: 'Did you hear the incredible news?! We just got approved for the new project!'
  },
  {
    id: 2,
    speaker: 'Marcus',
    voice: 'onyx',
    emotion: 'calm',
    text: 'Wait... are you serious? That is fantastic news! All that hard work paid off.'
  },
  {
    id: 3,
    speaker: 'Elena',
    voice: 'fable',
    emotion: 'anxious',
    text: 'Oh goodness... but wait, does this mean our delivery deadline just moved up to next month?'
  },
  {
    id: 4,
    speaker: 'Sam',
    voice: 'alloy',
    emotion: 'reassuring',
    text: 'Take a deep breath, everyone. We have a solid roadmap, and we are completely ready for this.'
  }
];


const generateConversationAudio = async (dialogue) => {
  console.log(`🎙️ Generating multi-voice conversation audio files...\n`);

  for (const line of dialogue) {
    try {
      const filename = `line_${line.id}_${line.voice}_${line.emotion}.mp3`;

      const response = await openai.audio.speech.create({
        model: 'tts-1-hd',
        voice: line.voice,
        input: line.text,
        response_format: 'mp3',
        speed: 1.0
      });

      const buffer = Buffer.from(await response.arrayBuffer());
      await fs.writeFile(filename, buffer);

      console.log(`✅ [Line ${line.id} | ${line.speaker} (${line.emotion})]: Saved to ${filename}`);
    } catch (error) {
      console.error(`❌ Failed to generate line ${line.id} (${line.voice}):`, error.message);
    }
  }
};

await generateConversationAudio(conversation);