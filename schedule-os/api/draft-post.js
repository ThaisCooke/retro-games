export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { ideaText } = req.body;
  if (!ideaText) {
    return res.status(400).json({ error: 'ideaText is required' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured' });
  }

  const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
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

  if (!anthropicRes.ok) {
    const err = await anthropicRes.json().catch(() => ({}));
    return res.status(anthropicRes.status).json({ error: err.error?.message || `API error ${anthropicRes.status}` });
  }

  const data = await anthropicRes.json();
  const text = data.content[0].text;

  if (text.length > 3000) {
    return res.status(422).json({ error: 'Draft exceeded 3000 characters — try a more focused idea.' });
  }

  return res.status(200).json({ text });
}
