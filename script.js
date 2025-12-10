const bookingModal = document.getElementById("bookingModal");
const serviceModal = document.getElementById("serviceModal");
const masterModal = document.getElementById("masterModal");
const bookBtn = document.getElementById("bookBtn");
const closeBtns = document.querySelectorAll(".close");
const bookingForm = document.getElementById("bookingForm");
const serviceCards = document.querySelectorAll(".service-card");
const masterCards = document.querySelectorAll(".master-card");
const serviceImagesContainer = document.querySelector(
  "#serviceModal .service-images-container"
);
const prevBtn = document.querySelector(".image-nav-btn.prev");
const nextBtn = document.querySelector(".image-nav-btn.next");
const lightThemeBtn = document.getElementById("lightTheme");
const darkThemeBtn = document.getElementById("darkTheme");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

const masterNameEl = document.getElementById("masterName");
const masterRoleEl = document.getElementById("masterRole");
const masterExperienceEl = document.getElementById("masterExperience");
const masterPhotoEl = document.getElementById("masterPhoto");
const masterImagesContainer = document.querySelector(
  "#masterModal .master-images-container"
);
const masterPrevBtn = document.querySelector("#masterModal .image-nav-btn.prev");
const masterNextBtn = document.querySelector("#masterModal .image-nav-btn.next");

let currentImageIndex = 0;
let currentImages = [];

let currentMasterImageIndex = 0;
let currentMasterImages = [];

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
    closeModal(masterModal);
  });
});

window.addEventListener("click", (e) => {
  if (e.target === bookingModal) closeModal(bookingModal);
  if (e.target === serviceModal) closeModal(serviceModal);
  if (e.target === masterModal) closeModal(masterModal);
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

function showMasterImage(index) {
  if (!currentMasterImages.length) return;
  currentMasterImages.forEach((img) => img.classList.remove("active"));
  currentMasterImages[index].classList.add("active");
  currentMasterImageIndex = index;
  if (masterPrevBtn) masterPrevBtn.disabled = index === 0;
  if (masterNextBtn)
    masterNextBtn.disabled = index === currentMasterImages.length - 1;
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

if (masterPrevBtn)
  masterPrevBtn.addEventListener("click", () => {
    if (currentMasterImageIndex > 0)
      showMasterImage(currentMasterImageIndex - 1);
  });
if (masterNextBtn)
  masterNextBtn.addEventListener("click", () => {
    if (currentMasterImageIndex < currentMasterImages.length - 1)
      showMasterImage(currentMasterImageIndex + 1);
  });

serviceCards.forEach((card) => {
  card.addEventListener("click", () => {
    const title = card.querySelector("h3")?.innerText || "";
    const descParagraph = card.querySelector("p");
    const descList = card.querySelector("ul");
    const serviceId = card.dataset.serviceId;

    const serviceImagesById = {
      // стрижки и укладки
      "haircuts": [
        "img/ЗАГЛУШКА.png",
        "img/ЗАГЛУШКА.png",
      ],
      // окрашивание
      "coloring": [
        "img/ЗАГЛУШКА.png",
        "img/ЗАГЛУШКА.png",
      ],
      // уход и восстановление
      "care": [
        "img/кератиновое выпрямление.jpeg",
      ],
      // маникюр и педикюр
      "nails": [
        "img/nails-1.jpeg",
        "img/nails-4.jpeg",
        "img/nails-2.jpeg",
        "img/nails-3.jpeg",
      ],
      // брови и ресницы
      "brows-lashes": [
        "img/ЗАГЛУШКА.png",
        "img/ЗАГЛУШКА.png",
      ],
      // SPA-программы
      "spa": [
        "img/ЗАГЛУШКА.png",
        "img/ЗАГЛУШКА.png",
      ],
    };

    const fallbackImages = ["img/ЗАГЛУШКА.png"];
    const currentServiceImages = serviceImagesById[serviceId] || fallbackImages;

    document.getElementById("serviceTitle").innerText = title;

    const descContainer = document.getElementById("serviceDescription");
    if (descContainer) {
      descContainer.innerHTML = "";

      if (descList) {
        const ul = document.createElement("ul");
        ul.className = "service-modal-list";

        Array.from(descList.querySelectorAll("li")).forEach((li) => {
          const item = document.createElement("li");
          item.textContent = li.innerText;
          ul.appendChild(item);
        });

        descContainer.appendChild(ul);
      } else if (descParagraph) {
        const p = document.createElement("p");
        p.textContent = descParagraph.innerText;
        descContainer.appendChild(p);
      }
    }

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

const mastersData = {
  "nails-1": {
    name: "Мастер маникюра 1",
    role: "Мастер маникюра",
    experience: "Опыт работы 5+ лет",
    photo: "img/ЗАГЛУШКА.png",
    works: [
      { img: "img/ЗАГЛУШКА.png", title: "Работа мастера 1" },
      { img: "img/ЗАГЛУШКА.png", title: "Работа мастера 2" },
    ],
  },
  "nails-2": {
    name: "Мастер маникюра 2",
    role: "Мастер маникюра",
    experience: "Опыт работы 3+ года",
    photo: "img/ЗАГЛУШКА.png",
    works: [
      { img: "img/ЗАГЛУШКА.png", title: "Работа мастера" },
    ],
  },
  "hair-1": {
    name: "Парикмахер 1",
    role: "Парикмахер-стилист",
    experience: "Опыт работы 7+ лет",
    photo: "img/ЗАГЛУШКА.png",
    works: [
      { img: "img/ЗАГЛУШКА.png", title: "Работа мастера" },
    ],
  },
  "hair-2": {
    name: "Парикмахер 2",
    role: "Парикмахер-стилист",
    experience: "Опыт работы 5+ лет",
    photo: "img/ЗАГЛУШКА.png",
    works: [
      { img: "img/ЗАГЛУШКА.png", title: "Работа мастера" },
    ],
  },
  "hair-3": {
    name: "Парикмахер 3",
    role: "Парикмахер",
    experience: "Опыт работы 4+ года",
    photo: "img/ЗАГЛУШКА.png",
    works: [
      { img: "img/ЗАГЛУШКА.png", title: "Работа мастера" },
    ],
  },
  "hair-4": {
    name: "Парикмахер 4",
    role: "Парикмахер",
    experience: "Опыт работы 6+ лет",
    photo: "img/ЗАГЛУШКА.png",
    works: [
      { img: "img/ЗАГЛУШКА.png", title: "Работа мастера" },
    ],
  },
};

if (masterCards.length && masterModal && masterNameEl && masterImagesContainer) {
  masterCards.forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.dataset.masterId;
      const data = mastersData[id];
      if (!data) return;

      if (masterNameEl) masterNameEl.textContent = data.name || "";
      if (masterRoleEl) masterRoleEl.textContent = data.role || "";
      if (masterExperienceEl)
        masterExperienceEl.textContent = data.experience || "";

      if (masterPhotoEl) {
        masterPhotoEl.src = data.photo || "img/ЗАГЛУШКА.png";
        masterPhotoEl.alt = data.name || "Мастер салона LEDY";
      }

      if (masterImagesContainer) {
        masterImagesContainer.innerHTML = "";
        currentMasterImages = [];

        (data.works || []).forEach((work, index) => {
          const img = document.createElement("img");
          img.className =
            "service-image" + (index === 0 ? " active" : "");
          img.src = work.img;
          img.alt = work.title || `Работа мастера ${data.name} ${index + 1}`;
          masterImagesContainer.appendChild(img);
          currentMasterImages.push(img);
        });
      }

      showMasterImage(0);
      openModal(masterModal);
    });
  });
}

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
