function resizeAudio() {
  const audioFile = document.getElementById("audioFile").files[0];
  if (!audioFile) {
    alert("Please select an audio file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const audioData = event.target.result;
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    audioContext.decodeAudioData(audioData, function (buffer) {
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      const destination = audioContext.createMediaStreamDestination();
      source.connect(destination);
      const newBuffer = destination.stream;

      const blob = new Blob([newBuffer], { type: "audio/mp3" });
      const url = window.URL.createObjectURL(blob);
      const downloadLink = document.getElementById("downloadLink");
      downloadLink.href = url;
      downloadLink.style.display = "block";
    });
  };
  reader.readAsArrayBuffer(audioFile);
}
