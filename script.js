const bookingModal = document.getElementById("bookingModal");
const serviceModal = document.getElementById("serviceModal");
const bookBtn = document.getElementById("bookBtn");
const closeBtns = document.querySelectorAll(".close");
const bookingForm = document.getElementById("bookingForm");
const serviceCards = document.querySelectorAll(".service-card");
const serviceImagesContainer = document.querySelector(
  "#serviceModal .service-images-container"
);
const prevBtn = document.querySelector(".image-nav-btn.prev");
const nextBtn = document.querySelector(".image-nav-btn.next");
const lightThemeBtn = document.getElementById("lightTheme");
const darkThemeBtn = document.getElementById("darkTheme");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

let currentImageIndex = 0;
let currentImages = [];

function openModal(modal) {
  if (modal) modal.style.display = "flex";
}
function closeModal(modal) {
  if (modal) modal.style.display = "none";
}

if (bookBtn) bookBtn.addEventListener("click", () => openModal(bookingModal));

closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    closeModal(bookingModal);
    closeModal(serviceModal);
  });
});

window.addEventListener("click", (e) => {
  if (e.target === bookingModal) closeModal(bookingModal);
  if (e.target === serviceModal) closeModal(serviceModal);
});

if (bookingForm) {
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const service = document.getElementById("service")?.value;

    if (!name || !phone || !service) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    const notification = document.createElement("div");
    notification.className = "notification success";
    notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">✓</span>
                <p style="color: black;">Заявка принята! Мы свяжемся с вами в ближайшее время.</p>
            </div>`;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("fade-out");
      setTimeout(() => notification.remove(), 300);
    }, 3000);

    closeModal(bookingModal);
    bookingForm.reset();

    const iframe = document.createElement("iframe");
    iframe.name = "google-forms-iframe";
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const tempForm = document.createElement("form");
    tempForm.method = "POST";
    tempForm.action = bookingForm.action;
    tempForm.target = "google-forms-iframe";
    tempForm.style.display = "none";

    [
      ["entry.1205287458", name],
      ["entry.1211161903", phone],
      ["entry.638195446", service],
    ].forEach(([nameAttr, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = nameAttr;
      input.value = value;
      tempForm.appendChild(input);
    });

    document.body.appendChild(tempForm);
    tempForm.submit();

    setTimeout(() => {
      tempForm.remove();
      iframe.remove();
    }, 5000);
  });
}

function showImage(index) {
  if (!currentImages.length) return;
  currentImages.forEach((img) => img.classList.remove("active"));
  currentImages[index].classList.add("active");
  currentImageIndex = index;
  if (prevBtn) prevBtn.disabled = index === 0;
  if (nextBtn) nextBtn.disabled = index === currentImages.length - 1;
}

if (prevBtn)
  prevBtn.addEventListener("click", () => {
    if (currentImageIndex > 0) showImage(currentImageIndex - 1);
  });
if (nextBtn)
  nextBtn.addEventListener("click", () => {
    if (currentImageIndex < currentImages.length - 1)
      showImage(currentImageIndex + 1);
  });

serviceCards.forEach((card) => {
  card.addEventListener("click", () => {
    const title = card.querySelector("h3")?.innerText || "";
    const desc = card.querySelector("p")?.innerText || "";
    const serviceId = card.dataset.serviceId;

    const serviceImagesById = {
      // стрижки и укладки
      "haircuts": [
        "img/nogot.jpeg",
        "img/ЗАГЛУШКА.png",
        "img/nogot.jpeg",
        "img/nogot.jpeg",
        "img/nogot.jpeg",
        "img/nogot.jpeg",
        "img/nogot.jpeg",
      ],
      // окрашивание
      "coloring": [
        "img/nogot.jpeg",
        "img/ЗАГЛУШКА.png",
        "img/nogot.jpeg",
      ],
      // уход и восстановление
      "care": [
        "img/care-1.jpg",
        "img/care-2.jpg",
      ],
      // маникюр и педикюр
      "nails": [
        "img/nails-1.jpg",
        "img/nails-2.jpg",
      ],
      // брови и ресницы
      "brows-lashes": [
        "img/brows-1.jpg",
        "img/brows-2.jpg",
      ],
      // SPA-программы
      "spa": [
        "img/spa-1.jpg",
        "img/spa-2.jpg",
      ],
    };

    const fallbackImages = ["img/ЗАГЛУШКА.png"];
    const currentServiceImages = serviceImagesById[serviceId] || fallbackImages;

    document.getElementById("serviceTitle").innerText = title;
    document.getElementById("serviceDescription").innerText = desc;

    if (serviceImagesContainer) {
      serviceImagesContainer.innerHTML = "";
      currentImages = [];

      currentServiceImages.forEach((src, i) => {
        const img = document.createElement("img");
        img.className = "service-image" + (i === 0 ? " active" : "");
        img.alt = `Изображение услуги ${title} ${i + 1}`;
        img.src = src;
        serviceImagesContainer.appendChild(img);
        currentImages.push(img);
      });
    }

    showImage(0);
    openModal(serviceModal);
  });
});

if (lightThemeBtn)
  lightThemeBtn.addEventListener("click", () => {
    document.body.classList.remove("dark-theme");
    lightThemeBtn.classList.add("active");
    darkThemeBtn?.classList.remove("active");
  });

if (darkThemeBtn)
  darkThemeBtn.addEventListener("click", () => {
    document.body.classList.add("dark-theme");
    darkThemeBtn.classList.add("active");
    lightThemeBtn?.classList.remove("active");
  });

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });
}

const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -100px 0px" };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("animate");
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("section").forEach((s) => observer.observe(s));
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.opacity = "1";
    hero.style.transform = "translateY(0)";
  }
});

const logo = document.getElementById("logo");

logo.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
