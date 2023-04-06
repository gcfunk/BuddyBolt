const recognition = new webkitSpeechRecognition();

recognition.onresult = function(event) {
  const transcript = event.results[event.results.length - 1][0].transcript;
  console.log(transcript);
  document.getElementById('output').innerHTML = transcript;
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