let  bgDataURL = "";
let headingtext = "";
let messageText = "";
let selectedFont = "'Poppins', sans-serif";
let blurAmount = 5;
let  textcolor = "#ffffff";

document.getElementById('bgInput').addEventListener('change', function (e) {
  const status = document.getElementById('bgStatus');
  status.innerHTML = `<div class="spinner"></div> Uploading...`;

  const reader = new FileReader();
  reader.onload = () => {
    bgDataURL = reader.result;
    updatePreview();
    status.innerHTML = `<span class="tick">✅ Uploaded</span>`;
  };
  reader.readAsDataURL(e.target.files[0]);
});

d
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
      font-family: ${selectedFont};
      background: url('${bgDataURL}') no-repeat center center/cover;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
      color: white;
      background: ${bgDataURL ? `url('${bgDataURL}') no-repeat center center/cover` : "#222"};
      backdrop-filter: blur( ${blurAmount}px);
    }
    .heading {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 15px;
      color: ${textColor};
      background: rgba(0,0,0,0.5);
      padding: 10px 20px;
      border-radius: 10px;
    }

    .message {
      background: rgba(0,0,0,0.6);
      padding: 20px;
      border-radius: 20px;
      max-width: 80%;
      font-size: 1.3rem;
      color: ${textColor};
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
</body>
</html>
`;
}
function downloadAsImage() {
  const exportCard = document.getElementById('imageExportCard');
  exportCard.innerHTML = generateCardHTML();
  exportCard.style.display = 'block';

  exportCard.style.width = "100%";
  exportCard.style.height = "100vh";
  exportCard.style.position = "absolute";
  exportCard.style.top = "-9999px"; // Hide off-screen

  html2canvas(exportCard, { scale: 2 }).then(canvas => {
    const link = document.createElement('a');
    link.download = `cardsy_card_${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    exportCard.style.display = 'none'; // Hide again
  });
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
}
function resetForm() {
  // Clear all input values
  document.getElementById('bgInput').value = "";
  document.getElementById('musicInput').value = "";
  document.getElementById('messageInput').value = "";

  // Clear preview data
  bgDataURL = "";
  musicDataURL = "";
  messageText = "";

  // Clear preview iframe
  const iframe = document.getElementById('previewFrame');
  iframe.src = "";
}
function updateFont() {
  selectedFont = document.getElementById('fontSelect').value;
  updatePreview();
}
document.getElementById('blurRange').addEventListener('input', function () {
  blurAmount = this.value;
  document.getElementById('blurValue').textContent = blurAmount + "px";
  updatePreview();
});
document.getElementById('textColor').addEventListener('input', function () {
  textColor = this.value;
  updatePreview();
});
document.getElementById('headingInput').addEventListener('input', function () {
  headingText = this.value;
  updatePreview();
});
document.getElementById('headingInput').value = "";
headingText = "";
