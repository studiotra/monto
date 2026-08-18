const I18N = {
  en: {
    brandKicker: "Family trip · 20–28 Oct 2026",
    brandName: "Montréal & Toronto",
    navTravel: "Travel",
    navPack: "What to pack",
    navPrepare: "Prepare",
    footer: "Private family itinerary · Montréal, Toronto & Niagara",
    people: "3 people · 9 days",
    openMenu: "Open menu"
  },
  fr: {
    brandKicker: "Voyage en famille · 20–28 oct. 2026",
    brandName: "Montréal et Toronto",
    navTravel: "Voyage",
    navPack: "Que mettre dans la valise",
    navPrepare: "Préparer",
    footer: "Itinéraire familial privé · Montréal, Toronto et Niagara",
    people: "3 personnes · 9 jours",
    openMenu: "Ouvrir le menu"
  },
  ko: {
    brandKicker: "가족 여행 · 2026년 10월 20–28일",
    brandName: "몬트리올 & 토론토",
    navTravel: "여행",
    navPack: "짐 싸기",
    navPrepare: "준비하기",
    footer: "가족 일정 · 몬트리올, 토론토, 나이아가라",
    people: "3명 · 9일",
    openMenu: "메뉴 열기"
  }
};

function currentLang() {
  return localStorage.getItem("trip-lang") || "en";
}

function setLang(lang) {
  localStorage.setItem("trip-lang", lang);
  document.documentElement.lang = lang === "ko" ? "ko" : lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = el.getAttribute(`data-${lang}`);
    if (value) el.innerHTML = value;
  });
  document.querySelectorAll(".lang-toggle button").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
  });
  const t = I18N[lang];
  const brandKicker = document.querySelector(".brand .brand-kicker");
  const brandName = document.querySelector(".brand-name");
  const footerCopy = document.querySelector("[data-footer]");
  const people = document.querySelector("[data-people]");
  if (brandKicker) brandKicker.textContent = t.brandKicker;
  if (brandName) brandName.textContent = t.brandName;
  if (footerCopy) footerCopy.textContent = t.footer;
  if (people) people.textContent = t.people;
  document.querySelectorAll(".nav [data-nav]").forEach((a) => {
    a.textContent = t[a.dataset.nav];
  });
}

function renderChrome(active) {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  const t = I18N[currentLang()];
  header.innerHTML = `
    <div class="header-inner">
      <a class="brand" href="index.html">
        <span class="brand-kicker">${t.brandKicker}</span>
        <span class="brand-name">${t.brandName}</span>
      </a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-label="${t.openMenu}">Menu</button>
      <nav class="nav" id="main-nav">
        <a data-nav="navTravel" href="index.html" class="${active === "travel" ? "active" : ""}">${t.navTravel}</a>
        <a data-nav="navPack" href="pack.html" class="${active === "pack" ? "active" : ""}">${t.navPack}</a>
        <a data-nav="navPrepare" href="prepare.html" class="${active === "prepare" ? "active" : ""}">${t.navPrepare}</a>
        <div class="lang-toggle" role="group" aria-label="Language">
          <button type="button" data-lang="en" aria-pressed="${currentLang() === "en"}">EN</button>
          <button type="button" data-lang="fr" aria-pressed="${currentLang() === "fr"}">FR</button>
          <button type="button" data-lang="ko" aria-pressed="${currentLang() === "ko"}">KR</button>
        </div>
      </nav>
    </div>
  `;
  footer.innerHTML = `
    <div class="wrap">
      <span data-footer>${t.footer}</span>
      <span data-people>${t.people}</span>
    </div>
  `;

  const nav = header.querySelector("#main-nav");
  const menuBtn = header.querySelector(".menu-btn");
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  header.querySelectorAll(".lang-toggle button").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });
}

function setupFilters() {
  const buttons = document.querySelectorAll("[data-filter]");
  const items = document.querySelectorAll("[data-city]");
  if (!buttons.length) return;
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      items.forEach((el) => {
        el.hidden = filter !== "all" && el.dataset.city !== filter;
      });
    });
  });
}

function setupChecks() {
  document.querySelectorAll("[data-check]").forEach((input) => {
    const key = "check-" + input.dataset.check;
    input.checked = localStorage.getItem(key) === "1";
    input.addEventListener("change", () => {
      localStorage.setItem(key, input.checked ? "1" : "0");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderChrome(document.body.dataset.page);
  setLang(currentLang());
  setupFilters();
  setupChecks();
});
