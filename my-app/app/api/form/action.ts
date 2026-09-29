'use server';

export async function submitEmail(formData: FormData) {
  const email = formData.get('email');
  console.log('Server logged email:', email);
}