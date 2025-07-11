let bgDataURL = "";
let musicDataURL = "";
let messageText = "";
let selectedFont = "'Poppins', sans-serif";

// Handle background image upload
document.getElementById('bgInput').addEventListener('change', function (e) {
  const reader = new FileReader();
  reader.onload = () => {
    bgDataURL = reader.result;
    updatePreview();
  };
  reader.readAsDataURL(e.target.files[0]);
});

// Handle music upload
document.getElementById('musicInput').addEventListener('change', function (e) {
  const reader = new FileReader();
  reader.onload = () => {
    musicDataURL = reader.result;
    updatePreview();
  };
  reader.readAsDataURL(e.target.files[0]);
});

// Handle message input
document.getElementById('messageInput').addEventListener('input', function () {
  messageText = this.value;
  updatePreview();
});

// Handle font selection
function updateFont() {
  selectedFont = document.getElementById('fontSelect').value;
  updatePreview();
}

// Generate full card HTML
function generateCardHTML() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Your Gift Card</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins&family=Dancing+Script&family=Caveat&family=Playfair+Display&family=Indie+Flower&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: ${selectedFont};
      background: ${bgDataURL ? `url('${bgDataURL}') no-repeat center center/cover` : "#222"};
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: white;
      backdrop-filter: blur(5px);
    }
    .message {
      background: rgba(0,0,0,0.6);
      padding: 20px;
      border-radius: 20px;
      max-width: 80%;
      text-align: center;
      font-size: 1.3rem;
    }
    audio {
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="message">
    ${messageText ? messageText.replace(/\n/g, "<br>") : "Your message will appear here 💌"}
  </div>
  ${musicDataURL ? `<audio controls autoplay loop><source src="${musicDataURL}" type="audio/mp3"></audio>` : ""}
</body>
</html>
`;
}

// Live preview in iframe
function updatePreview() {
  const iframe = document.getElementById('previewFrame');
  const cardHTML = generateCardHTML();

  if (iframe && cardHTML) {
    iframe.srcdoc = cardHTML;
  }
}

// Download card as HTML file
function downloadCard() {
  const cardHTML = generateCardHTML();
  const blob = new Blob([cardHTML], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `cardsy_card_${Date.now()}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Reset form + preview
function resetForm() {
  document.getElementById('bgInput').value = "";
  document.getElementById('musicInput').value = "";
  document.getElementById('messageInput').value = "";
  document.getElementById('fontSelect').value = "'Poppins', sans-serif";

  bgDataURL = "";
  musicDataURL = "";
  messageText = "";
  selectedFont = "'Poppins', sans-serif";

  const iframe = document.getElementById('previewFrame');
  iframe.srcdoc = `<div style="font-family: Poppins; padding: 2rem; text-align: center; color: gray;">Start creating your card ✨</div>`;
}

// Reset on page load
window.onload = function () {
  resetForm();
};
