const qaBank = [
    { keys: ["salut", "buna", "hey", "sal"], response: "Salut! Sunt asistentul tău virtual. Întreabă-mă despre proiecte sau contact." },
    { keys: ["proiecte", "lucrari", "showcase", "portofoliu"], response: "Am creat un Site Personal, un Business Card și un Dashboard responsive folosind Grid și Flexbox." },
    { keys: ["contact", "email", "mail", "unde"], response: "Mă poți găsi la adresa: <strong>razvan.ranga@e-uvt.ro</strong> sau pe GitHub." },
    { keys: ["cine", "esti"], response: "Sunt un chatbot creat pentru laboratorul de Web Design de către Ranga Răzvan." },
    { keys: ["uvt", "facultate", "informatica"], response: "Sunt student în anul 1 la Informatica, Universitatea de Vest din Timișoara." }
];

const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const chatContainer = document.getElementById("chat-container");

function appendMsg(text, type) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", type === "bot" ? "bot-msg" : "user-msg");
    msgDiv.innerHTML = text;
    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

window.onload = () => {
    appendMsg("Bună! Sunt pregătit să îți răspund la întrebări.", "bot");
};

chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = userInput.value.trim();
    if (!input) return;

    appendMsg(input, "user");
    userInput.value = "";

    setTimeout(() => {
        const lowerInput = input.toLowerCase();
        const match = qaBank.find(item => item.keys.some(k => lowerInput.includes(k)));
        
        const botReply = match ? match.response : "Interesant! Dar momentan știu să răspund doar despre proiecte, contact sau facultate.";
        appendMsg(botReply, "bot");
    }, 500);
});