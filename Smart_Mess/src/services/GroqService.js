const API_KEY = "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";
const MODEL = "llama-3.1-8b-instant";

export async function chatWithGroq(userMessage, menuItems) {
  const menuContext = menuItems.length > 0
    ? "Here is the current menu:\n" + menuItems.map((m) =>
        `- ${m.name} (₹${m.price}) - ${m.description || "No description"} [Category: ${m.categoryName || "General"}]`
      ).join("\n")
    : "The menu is currently empty.";

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: "system",
          content: `You are a helpful food assistant for the restaurant "Smart Mess". You help customers find items from the menu. 
Answer naturally and conversationally. Recommend items based on what the user asks for.
Keep responses concise and friendly. Use ₹ for prices.

${menuContext}`,
        },
        { role: "user", content: userMessage },
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
