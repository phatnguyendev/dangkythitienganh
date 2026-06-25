const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzJaC8C0XMJNW5zJOCDG_5AIV8uYNzGVUdtMb0q34FX0phr52Ct1Qu28VNrTy1hlts9/exec';

const form = document.getElementById('registerForm');
const message = document.getElementById('message');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  message.style.color = 'blue';
  message.innerText = 'Đang gửi hồ sơ, vui lòng chờ...';

  try {
    const payload = {
      hoTen: getValue('hoTen'),
      gioiTinh: getValue('gioiTinh'),
      ngaySinh: getValue('ngaySinh'),
      noiSinh: getValue('noiSinh'),
      cccd: getValue('cccd'),
      sdt: getValue('sdt'),
      trinhDo: getValue('trinhDo'),
      matTruocCanCuoc: await fileToBase64(document.getElementById('matTruocCanCuoc').files[0]),
      matSauCanCuoc: await fileToBase64(document.getElementById('matSauCanCuoc').files[0]),
      anhThe: await fileToBase64(document.getElementById('anhThe').files[0])
    };

    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (result.success) {
      message.style.color = 'green';
      message.innerText = 'Đăng ký thành công!';
      form.reset();
    } else {
      message.style.color = 'red';
      message.innerText = 'Lỗi: ' + result.message;
    }

  } catch (error) {
    message.style.color = 'red';
    message.innerText = 'Lỗi gửi dữ liệu: ' + error.message;
  }
});

function getValue(id) {
  return document.getElementById(id).value.trim();
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
      return;
    }

    const reader = new FileReader();

    reader.onload = function () {
      resolve({
        fileName: file.name,
        mimeType: file.type,
        base64: reader.result.split(',')[1]
      });
    };

    reader.onerror = function () {
      reject(new Error('Không đọc được file: ' + file.name));
    };

    reader.readAsDataURL(file);
  });
}



// slide 
let currentSlide = 0;
const slides = document.querySelectorAll(".hero-slider .slide");
const prevBtn = document.querySelector(".hero-slider .prev");
const nextBtn = document.querySelector(".hero-slider .next");

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));

  if (index >= slides.length) currentSlide = 0;
  if (index < 0) currentSlide = slides.length - 1;

  slides[currentSlide].classList.add("active");
}

nextBtn.addEventListener("click", () => {
  currentSlide++;
  showSlide(currentSlide);
});

prevBtn.addEventListener("click", () => {
  currentSlide--;
  showSlide(currentSlide);
});

setInterval(() => {
  currentSlide++;
  showSlide(currentSlide);
}, 4000);
// end slide 