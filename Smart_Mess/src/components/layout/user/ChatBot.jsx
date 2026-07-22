import { useState, useEffect, useRef } from "react";
import MenuService from "../../../services/MenuService";
import { chatWithGroq } from "../../../services/GroqService";

const suggestions = [
  "What's on the menu?",
  "Recommend something spicy",
  "What's cheap and good?",
  "Any desserts?",
  "What's popular today?",
];

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm your AI assistant. Ask me anything about the menu!" },
  ]);
  const [input, setInput] = useState("");
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    MenuService.all({ status: "active" }).then(setMenus);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text) => {
    const q = text || input;
    if (!q.trim() || loading) return;
    if (!text) setInput("");

    setMessages((prev) => [...prev, { from: "user", text: q }]);
    setLoading(true);

    try {
      const reply = await chatWithGroq(q, menus);
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Sorry, I'm having trouble connecting. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed", bottom: "90px", right: "25px", zIndex: 9999,
          width: "56px", height: "56px", borderRadius: "50%", border: "none",
          background: "var(--primary)", color: "#fff", fontSize: "24px",
          cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        {open ? <i className="fas fa-times" /> : <i className="fas fa-robot" />}
      </button>

      {open && (
        <div
          style={{
            position: "fixed", bottom: "155px", right: "25px", zIndex: 9999,
            width: "340px", maxHeight: "450px", background: "#fff",
            borderRadius: "12px", boxShadow: "0 8px 30px rgba(0,0,0,0.18)",
            display: "flex", flexDirection: "column", overflow: "hidden",
          }}
        >
          <div style={{ background: "var(--primary)", color: "#fff", padding: "14px 16px", fontWeight: "600", fontSize: "15px" }}>
            <i className="fas fa-robot me-2" />Smart Menu Assistant
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "12px", display: "flex", flexDirection: "column", gap: "8px", minHeight: "260px" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                  maxWidth: "80%", padding: "8px 12px", borderRadius: "12px",
                  fontSize: "13px", lineHeight: "1.5", whiteSpace: "pre-wrap",
                  background: msg.from === "user" ? "var(--primary)" : "#f0f2f5",
                  color: msg.from === "user" ? "#fff" : "#222",
                }}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div style={{ alignSelf: "flex-start", padding: "8px 12px", fontSize: "13px", color: "#999" }}>
                Thinking...
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div style={{ padding: "8px", borderTop: "1px solid #eee", display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {suggestions.slice(0, 3).map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                style={{
                  fontSize: "11px", padding: "3px 10px", borderRadius: "12px",
                  border: "1px solid #ddd", background: "#fafafa", cursor: "pointer",
                  color: "#666", whiteSpace: "nowrap",
                }}
              >
                {s}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", borderTop: "1px solid #eee" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about the menu..."
              style={{
                flex: 1, border: "none", padding: "10px 12px", fontSize: "13px",
                outline: "none",
              }}
            />
            <button
              onClick={() => handleSend()}
              disabled={loading}
              style={{
                background: "var(--primary)", color: "#fff", border: "none",
                padding: "0 14px", cursor: loading ? "not-allowed" : "pointer", fontSize: "16px",
                opacity: loading ? 0.6 : 1,
              }}
            >
              <i className="fas fa-paper-plane" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;
