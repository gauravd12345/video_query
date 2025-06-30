// Only works during dev/testing
importScripts('apikey.js');


document.getElementById("send-btn").addEventListener("click", async () => {
  const input = document.getElementById("user-input").value;
  appendMessage("You", input);

  const response = await askAI(input);
  appendMessage("Assistant", response);

  document.getElementById("user-input").value = "";
});

function appendMessage(sender, text) {
  const log = document.getElementById("chat-log");
  const msg = document.createElement("div");
  msg.className = "message";
  msg.textContent = `${sender}: ${text}`;
  log.appendChild(msg);
  log.scrollTop = log.scrollHeight;
}

async function askAI(query) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: query }]
    })
  });
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "Sorry, I don't know.";
}
