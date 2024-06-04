const historyContainer = document.getElementById('history');
let history = [];

document.getElementById('generate-btn').addEventListener('click', generateQRCode);
document.getElementById('download-btn').addEventListener('click', downloadQRCode);

function generateQRCode() {
  const textInput = document.getElementById('text-input').value;
  const color = document.getElementById('color-input').value;
  const backgroundColor = document.getElementById('background-input').value;
  const size = document.getElementById('size-input').value;
  const dotType = document.getElementById('dot-type-select').value;
  const dotRadius = document.getElementById('dot-radius-input').value;

  const qrCode = new QRCodeStyling({
    width: size,
    height: size,
    data: textInput,
    dotsOptions: {
      color: color,
      type: dotType,
      radius: dotRadius
    },
    backgroundOptions: {
      color: backgroundColor,
    }
  });

  const qrCodeContainer = document.getElementById('qr-code');
  qrCodeContainer.innerHTML = '';
  qrCode.append(qrCodeContainer);
}

function downloadQRCode() {
  const qrCodeContainer = document.getElementById('qr-code').querySelector('canvas');
  const qrCodeDataUrl = qrCodeContainer.toDataURL("image/png");
  const a = document.createElement('a');
  a.href = qrCodeDataUrl;
  a.download = 'qr-code.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

document.getElementById('logo-input').addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    const logoUrl = event.target.result;
    const qrCodeContainer = document.getElementById('qr-code').querySelector('canvas');
    const ctx = qrCodeContainer.getContext('2d');
    const img = new Image();

    img.onload = function() {
      const x = (qrCodeContainer.width - img.width) / 2;
      const y = (qrCodeContainer.height - img.height) / 2;
      ctx.drawImage(img, x, y);
    };

    img.src = logoUrl;
  };

  reader.readAsDataURL(file);
});
