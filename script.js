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
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      height: 100vh;
      width: 100vw;
      overflow: hidden;
      font-family: 'Arial', sans-serif;
      background: #000;
      position: relative;
    }

    .bg {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: url('${bgDataURL}') no-repeat center center/cover;
      filter: blur(8px) brightness(0.6);
      z-index: 0;
    }

    .content {
      position: relative;
      z-index: 1;
      height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      text-align: center;
      padding: 20px;
    }

    .message {
      background: rgba(0, 0, 0, 0.6);
      padding: 20px;
      border-radius: 20px;
      max-width: 90%;
      font-size: 1.3rem;
      line-height: 1.5;
    }

    audio {
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="bg"></div>
  <div class="content">
    <div class="message">
      ${messageText.replace(/\n/g, "<br>")}
    </div>
    ${musicDataURL ? `<audio controls autoplay loop><source src="${musicDataURL}" type="audio/mp3"></audio>` : ''}
  </div>
</body>
</html>
`;
}

