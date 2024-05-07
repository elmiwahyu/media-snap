let audioElement;

function playAudio() {
  const audioFile = document.getElementById("audioFile").files[0];
  if (audioFile) {
    audioElement = new Audio(URL.createObjectURL(audioFile));
    audioElement.play();
  } else {
    alert("Please choose an audio file.");
  }
}

function stopAudio() {
  if (audioElement) {
    audioElement.pause();
    audioElement.currentTime = 0;
  }
}

function accelerateAudio() {
  if (audioElement) {
    audioElement.playbackRate += 0.5; // Adjust acceleration rate as needed
  }
}

function downloadAudio() {
  const audioFile = document.getElementById("audioFile").files[0];
  if (audioFile) {
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(audioFile);
    downloadLink.download = "accelerated_audio.mp3"; // You can change the filename here
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  } else {
    alert("Please choose an audio file.");
  }
}

document.getElementById("audioFile").addEventListener("change", () => {
  // Hide the download button when a new audio file is selected
  document.getElementById("downloadButton").style.display = "none";
});

document.getElementById("audioFile").addEventListener("input", () => {
  // Reset playback rate when a new audio file is selected
  if (audioElement) {
    audioElement.playbackRate = 1;
  }
});
