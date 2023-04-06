const recognition = new webkitSpeechRecognition();

recognition.onresult = function(event) {
  const transcript = event.results[event.results.length - 1][0].transcript;
  console.log(transcript);
    // document.getElementById('output').innerHTML = transcript;

    // Get the chat box element
    const chatBox = document.querySelector('.chat');

    // Create the user message element
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add('user-message');

    const messageTextElement = document.createElement('div');
    messageTextElement.classList.add('message-text');
    messageTextElement.innerText = transcript;
    messageElement.appendChild(messageTextElement);

    const avatarElement = document.createElement('img');
    avatarElement.src = "user-avatar.png";
    avatarElement.alt = "User Avatar";
    avatarElement.classList.add('avatar');
    messageElement.appendChild(avatarElement);

    // Add the message element to the chat box
    chatBox.appendChild(messageElement);
}

recognition.onerror = function(event) {
  console.error(event.error);
}

recognition.onend = function() {
  recognition.start();
}

sendClicked = function() {
    console.log('send clicked');
    recognition.start();
}