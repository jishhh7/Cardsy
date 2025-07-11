let bgDataURL = "";
let musicDataURL = "";
let messageText = "";

document.getElementById('bgInput').addEventListener('change', function (e) {
  const reader = new FileReader();
  reader.onload = () => { bgDataURL = reader.result; updatePreview(); };
  reader.readAsDataURL(e.target.files[0]);
});

document.getElementById('musicInput').addEventListener('change', function (e) {
  const reader = new FileReader();
  reader.onload = () => { musicDataURL = reader.result; updatePreview(); };
  reader.readAsDataURL(e.target.files[0]);
});

document.getElementById('messageInput').addEventListener('input', function () {
  messageText = this.value;
  updatePreview();
});

function generateCardHTML() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Your Gift Card from Cardsy</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Arial', sans-serif;
      background: url('${bgDataURL}') no-repeat center center/cover;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
      color: white;
      backdrop-filter: blur(5px);
    }
    .message {
      background: rgba(0,0,0,0.6);
      padding: 20px;
      border-radius: 20px;
      max-width: 80%;
      font-size: 1.3rem;
    }
    audio {
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="message">
    ${messageText.replace(/\n/g, "<br>")}
  </div>
  ${musicDataURL ? `<audio controls autoplay loop><source src="${musicDataURL}" type="audio/mp3"></audio>` : ''}
</body>
</html>
`;
}

function updatePreview() {
  const iframe = document.getElementById('previewFrame');
  const blob = new Blob([generateCardHTML()], { type: "text/html" });
  iframe.src = URL.createObjectURL(blob);
}

function downloadCard() {
  const blob = new Blob([generateCardHTML()], { type: "text/html" });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = "cardsy_gift_card.html";
  a.click();
  a.download = `${Date.now()}_cardsy_card.html`;

}
