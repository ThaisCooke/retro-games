export async function draftLinkedInPost(ideaText) {
  const response = await fetch('/api/draft-post', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ideaText }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `Request failed (${response.status})`);
  }

  return data.text;
}
