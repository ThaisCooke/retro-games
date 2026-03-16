const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

export async function draftLinkedInPost(ideaText) {
  if (!API_KEY || API_KEY === 'your-key-here') {
    throw new Error('No API key configured. Add VITE_ANTHROPIC_API_KEY to your .env file.');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: `You are a LinkedIn ghostwriter. Write authentic, first-person LinkedIn posts for a data professional building a personal brand in AI/data engineering, Lean Six Sigma, and continuous learning.

Style: conversational but professional, specific and personal, no corporate fluff, no excessive hashtags (max 3), no emojis unless they fit naturally.

Length: 150-300 words. Hook in first line. End with a question or call to action.`,
      messages: [
        {
          role: 'user',
          content: `Draft a LinkedIn post based on this idea: ${ideaText}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `API error ${response.status}`);
  }

  const data = await response.json();
  const text = data.content[0].text;

  if (text.length > 3000) {
    throw new Error('Draft exceeded 3000 characters — try a more focused idea.');
  }

  return text;
}
