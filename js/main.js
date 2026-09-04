(function () {
  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const toggle = document.querySelector(".nav-toggle");
  const backTop = document.querySelector(".back-top");
  const slides = document.querySelectorAll(".hero__slide");
  const dots = document.querySelectorAll(".hero__dots button");
  const form = document.getElementById("contact-form");
  let current = 0;

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
    if (backTop) backTop.classList.toggle("is-visible", window.scrollY > 400);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  const goTo = (index) => {
    if (!slides.length) return;
    slides[current].classList.remove("is-active");
    if (dots[current]) dots[current].classList.remove("is-active");
    current = index;
    slides[current].classList.add("is-active");
    if (dots[current]) dots[current].classList.add("is-active");
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => goTo(index));
  });

  if (slides.length > 1) {
    setInterval(() => goTo((current + 1) % slides.length), 6500);
  }

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const service = String(data.get("service") || "").trim();
      const message = String(data.get("message") || "").trim();
      const text = [
        "Merhaba, Özipek Dekorasyon web sitesinden yazıyorum.",
        name && `Ad: ${name}`,
        phone && `Telefon: ${phone}`,
        service && `Hizmet: ${service}`,
        message && `Mesaj: ${message}`
      ].filter(Boolean).join("\n");
      window.open("https://wa.me/905323478988?text=" + encodeURIComponent(text), "_blank");
    });
  }
})();
