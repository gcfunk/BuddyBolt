const recognition = new webkitSpeechRecognition();

recognition.onresult = function(event) {
  const transcript = event.results[event.results.length - 1][0].transcript;
  console.log(transcript);

  displayUserMessage(transcript);
  sendToOpenAI(transcript);
}

recognition.onerror = function(event) {
  console.error(event.error);
}

recognition.onend = function() {
  document.getElementById('listening').style.display = 'none';
}

displayUserMessage = function(transcript) {
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

displayBuddyMessage = function(transcript) {
  // Get the chat box element
  const chatBox = document.querySelector('.chat');

  // Create the user message element
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add('buddy-message');

  const avatarElement = document.createElement('img');
  avatarElement.src = "BuddyBolt.png";
  avatarElement.alt = "Buddy Avatar";
  avatarElement.classList.add('avatar');
  messageElement.appendChild(avatarElement);

  const messageTextElement = document.createElement('div');
  messageTextElement.classList.add('message-text');
  messageTextElement.innerText = transcript;
  messageElement.appendChild(messageTextElement);

  // Add the message element to the chat box
  chatBox.appendChild(messageElement);
}

sendToOpenAI = function(transcript) {
  // Replace YOUR_API_KEY with your actual OpenAI API key
  const apiKey = 'api_key';

  // Set up the API endpoint URL
  const apiUrl = 'https://api.openai.com/v1/engine/davinci-codex/completions';

  // Set up the request headers
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };

  // Set up the request data
  const requestData = {
    'prompt': transcript,
    'max_tokens': 5,
    'n': 1,
    'stop': ''
  };

  // Make the API request using fetch
  fetch(apiUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestData)
    })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Do something with the response data here
  })
  .catch(error => console.error(error));
}

sendClicked = function() {
  document.getElementById('listening').style.display = 'inline-block';
  recognition.start();
}

window.onload = function() {
  displayBuddyMessage("Hi there! How can I assist you today?");
};