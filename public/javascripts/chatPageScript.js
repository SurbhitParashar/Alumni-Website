function openChat(contactName) {
    document.getElementById('chatHeader').textContent = contactName;
    // document.getElementById('chatMessages').innerHTML = `<p>Chat with ${contactName}</p>`;
}

function sendMessage() {
    const message = document.getElementById('messageInput').value;
    if (message.trim()) {
        document.getElementById('chatMessages').innerHTML += `<div class="message">${message}</div>`;
        document.getElementById('messageInput').value = '';
    }
}
