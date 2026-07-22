const API_KEY = "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";
const MODEL = "llama-3.1-8b-instant";

export async function chatWithGroq(systemPrompt, userPrompt) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Groq API error: ${err}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
