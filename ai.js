const API_KEY = "não em publico"

const chatInput = document.getElementById("chatInput");
const sendButton = document.getElementById("sendMessage");
const chatMessages = document.getElementById("chatMessages");

let conversation = [];

conversation.push({
    role: "system",
    content: `
Você é Puff.

Você é um pet virtual.

Características:
- Fofo
- Curioso
- Brincalhão
- Carinhoso

Responda de forma curta e natural.
`
});

function addMessage(text, sender) {

    const div = document.createElement("div");

    div.classList.add(
        sender === "user"
            ? "userMessage"
            : "petMessage"
    );

    div.textContent = text;

    chatMessages.appendChild(div);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}

function removeTypingBubble() {

    const typing =
        document.querySelector(".typing");

    if (typing)
        typing.remove();
}

async function askAI(message) {

    try {

        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization":
                        `Bearer ${API_KEY}`,
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    model:
                        "llama-3.3-70b-versatile",

                    messages: [
                        ...conversation,
                        {
                            role: "user",
                            content: message
                        }
                    ],

                    temperature: 0.8,
                    max_tokens: 200
                })
            }
        );

        const data =
            await response.json();

        console.log(data);

        if (
            data.choices &&
            data.choices[0]
        ) {
            return data
                .choices[0]
                .message
                .content;
        }

        return null;

    } catch(err) {

        console.error(err);

        return null;
    }
}

async function sendMessage() {

    const text =
        chatInput.value.trim();

    if (!text) return;

    addMessage(text, "user");

    chatInput.value = "";

    const typing =
        document.createElement("div");

    typing.classList.add(
        "petMessage",
        "typing"
    );

    typing.textContent =
        "Digitando...";

    chatMessages.appendChild(typing);

    const response =
        await askAI(text);

    removeTypingBubble();

    if (response) {

        conversation.push({
            role: "user",
            content: text
        });

        conversation.push({
            role: "assistant",
            content: response
        });

        addMessage(
            response,
            "bot"
        );

    } else {

        addMessage(
            "Não consegui pensar agora... 🐾",
            "bot"
        );
    }
}

sendButton.addEventListener(
    "click",
    sendMessage
);

chatInput.addEventListener(
    "keydown",
    function(e) {

        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }

    }
);z
