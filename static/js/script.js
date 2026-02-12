const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;

    const timestamp = document.createElement('div');
    timestamp.className = 'timestamp';
    timestamp.textContent = new Date().toLocaleTimeString([], {hour: '2-digit',minute:'2-digit'});

    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(timestamp);
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;

}

async function sendMessage() {
    const message = userInput.value.trim();
    if(!message) return;

    addMessage( message, 'user');
    userInput.value= '';

    try{ 
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({message: message})
        });
         const data = await response.json();
        addMessage(data.response, 'bot');
    } catch (error) {
        addMessage('Sorry, I\'m having trouble connecting. Please try again.', 'bot');
    }
}   
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

addMessage('Hello There! I\'m Cura. Tell me what symptoms you\'re experiencing.', 'bot');