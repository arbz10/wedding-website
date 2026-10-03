/* ==========================================================
   Wedding Invitation & RSVP — behaviour
   ========================================================== */

// ---- Configuration ----------------------------------------
const CONFIG = {
  // Wedding start, local to the venue.
  weddingDate: "2027-06-12T15:00:00+02:00",
  weddingEnd: "2027-06-12T23:59:00+02:00",
  title: "Aria & Julian's Wedding",
  location: "The Glasshouse Garden, Lake Como, Italy",

  // Where RSVPs are POSTed as JSON. Works with Formspree, Getform,
  // a Google Apps Script web app, or your own backend.
  // Leave empty to keep responses in this browser only (handy for testing).
  rsvpEndpoint: "",
};

// ---- Photos -----------------------------------------------
// Each [data-img] slot shows its photo once it loads; until then (or if the
// file is missing) the CSS placeholder gradient stays visible.
document.querySelectorAll("[data-img]").forEach((el) => {
  const src = new URL(el.dataset.img, document.baseURI).href;
  const img = new Image();
  img.onload = () => {
    el.style.setProperty("--img", `url("${src}")`);
    el.classList.add("has-img");
  };
  img.src = src;
});

// ---- Navigation -------------------------------------------
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const toTop = document.getElementById("toTop");

function onScroll() {
  const y = window.scrollY;
  nav.classList.toggle("is-scrolled", y > 60);
  toTop.classList.toggle("is-visible", y > 600);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

function setMenu(open) {
  nav.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
}
navToggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
document.querySelectorAll(".nav__links a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

// ---- Countdown --------------------------------------------
const target = new Date(CONFIG.weddingDate).getTime();
const units = {};
document.querySelectorAll("#countdown [data-unit]").forEach((el) => (units[el.dataset.unit] = el));

function tick() {
  const diff = Math.max(0, target - Date.now());
  const pad = (n) => String(n).padStart(2, "0");
  units.days.textContent = pad(Math.floor(diff / 86400000));
  units.hours.textContent = pad(Math.floor((diff / 3600000) % 24));
  units.minutes.textContent = pad(Math.floor((diff / 60000) % 60));
  units.seconds.textContent = pad(Math.floor((diff / 1000) % 60));
  if (diff === 0) clearInterval(timer);
}
const timer = setInterval(tick, 1000);
tick();

// ---- Reveal on scroll -------------------------------------
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// ---- Add to calendar (.ics download) ----------------------
document.getElementById("addToCalendar").addEventListener("click", (e) => {
  e.preventDefault();
  const fmt = (d) => new Date(d).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding//RSVP//EN",
    "BEGIN:VEVENT",
    `UID:${fmt(CONFIG.weddingDate)}-wedding`,
    `DTSTAMP:${fmt(Date.now())}`,
    `DTSTART:${fmt(CONFIG.weddingDate)}`,
    `DTEND:${fmt(CONFIG.weddingEnd)}`,
    `SUMMARY:${CONFIG.title}`,
    `LOCATION:${CONFIG.location.replace(/,/g, "\\,")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: "wedding.ics" });
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

// ---- Gallery lightbox -------------------------------------
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
}
document.querySelectorAll(".gallery__item").forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector(".photo").style.getPropertyValue("--img");
    if (img) lightboxImg.style.setProperty("--img", img);
    else lightboxImg.style.removeProperty("--img");
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  });
});
document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => e.target === lightbox && closeLightbox());
document.addEventListener("keydown", (e) => e.key === "Escape" && !lightbox.hidden && closeLightbox());

// ---- RSVP -------------------------------------------------
const form = document.getElementById("rsvpForm");
const errorEl = document.getElementById("formError");
const thanks = document.getElementById("rsvpThanks");
const thanksText = document.getElementById("thanksText");

form.addEventListener("change", (e) => {
  if (e.target.name === "attending") {
    form.classList.toggle("is-declining", e.target.value === "no");
  }
});

function validate(data) {
  form.querySelectorAll(".is-invalid").forEach((el) => el.classList.remove("is-invalid"));
  const problems = [];
  if (!data.name.trim()) {
    form.name.classList.add("is-invalid");
    problems.push("your name");
  }
  if (!/^\S+@\S+\.\S+$/.test(data.email.trim())) {
    form.email.classList.add("is-invalid");
    problems.push("a valid email");
  }
  if (!data.attending) {
    form.querySelector("fieldset").classList.add("is-invalid");
    problems.push("whether you'll attend");
  }
  return problems;
}

function addWish(name, message) {
  if (!message.trim()) return;
  const li = document.createElement("li");
  li.className = "wish reveal is-visible";
  const p = document.createElement("p");
  p.textContent = `“${message.trim()}”`;
  const span = document.createElement("span");
  span.textContent = `— ${name.trim()}`;
  li.append(p, span);
  document.getElementById("wishesList").prepend(li);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  data.attending = data.attending || "";

  const problems = validate(data);
  if (problems.length) {
    errorEl.textContent = `Please provide ${problems.join(", ")}.`;
    errorEl.hidden = false;
    return;
  }
  errorEl.hidden = true;

  if (data.attending === "no") {
    delete data.guests;
    delete data.meal;
  }
  data.submittedAt = new Date().toISOString();

  const button = form.querySelector("button[type=submit]");
  button.disabled = true;
  button.textContent = "Sending…";

  try {
    if (CONFIG.rsvpEndpoint) {
      const res = await fetch(CONFIG.rsvpEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    } else {
      try {
        const saved = JSON.parse(localStorage.getItem("rsvps") || "[]");
        saved.push(data);
        localStorage.setItem("rsvps", JSON.stringify(saved));
      } catch (_) {
        /* storage unavailable — still show the confirmation */
      }
    }

    const first = data.name.trim().split(/\s+/)[0];
    thanksText.textContent =
      data.attending === "yes"
        ? `${first}, we can't wait to celebrate with you!`
        : `${first}, we'll miss you — thank you for letting us know.`;
    addWish(data.name, data.message || "");
    form.hidden = true;
    thanks.hidden = false;
  } catch (err) {
    errorEl.textContent = "Sorry, something went wrong sending your RSVP. Please try again.";
    errorEl.hidden = false;
    button.disabled = false;
    button.textContent = "Send RSVP";
  }
});
