const CATEGORY_ICONS = {
  'Супы': 'icon-soup',
  'Плов': 'icon-plov',
  'Салаты': 'icon-salad',
  'Шаурма': 'icon-wrap',
  'Добавки к шаурме': 'icon-wrap',
  'Хлеб': 'icon-bread',
  'Фри меню': 'icon-fries',
  'Люля кебаб': 'icon-skewer',
  'Люля кебаб в лаваше': 'icon-wrap',
  'Шашлык': 'icon-flame',
  'Соусы': 'icon-sauce',
  'Маринованное мясо': 'icon-meat',
  'Пельмени': 'icon-dumpling',
  'Выпечка': 'icon-pastry',
  'Сладости': 'icon-dessert',
  'Напитки': 'icon-drink',
  'Кофе зерновой': 'icon-coffee'
};

const PHONE_TEL = 'tel:+79517851177';

function formatPrice(price){
  if (typeof price === 'number') return price.toLocaleString('ru-RU') + ' ₽';
  return String(price).split('/').map(p => p.trim()).join(' / ') + ' ₽';
}

async function loadJSON(path){
  const res = await fetch(path);
  if (!res.ok) throw new Error('Не удалось загрузить ' + path);
  return res.json();
}

function renderMenu(menu){
  const tabsEl = document.getElementById('menuTabs');
  const panelsEl = document.getElementById('menuPanels');
  if (!tabsEl || !panelsEl) return;

  menu.categories.forEach((cat, i) => {
    const id = 'cat-' + i;
    const tab = document.createElement('button');
    tab.className = 'menu-tab' + (i === 0 ? ' is-active' : '');
    tab.type = 'button';
    tab.textContent = cat.name;
    tab.dataset.target = id;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    tabsEl.appendChild(tab);

    const panel = document.createElement('div');
    panel.className = 'menu-panel' + (i === 0 ? ' is-active' : '');
    panel.id = id;
    panel.setAttribute('role', 'tabpanel');
    cat.items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'menu-item';
      row.innerHTML = `
        <span class="menu-item-name">${item.name}</span>
        <span class="menu-item-unit">${item.unit || ''}</span>
        <span class="menu-item-leader"></span>
        <span class="menu-item-price">${formatPrice(item.price)}</span>
      `;
      panel.appendChild(row);
    });
    panelsEl.appendChild(panel);
  });

  tabsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.menu-tab');
    if (!btn) return;
    tabsEl.querySelectorAll('.menu-tab').forEach(t => {
      t.classList.toggle('is-active', t === btn);
      t.setAttribute('aria-selected', t === btn ? 'true' : 'false');
    });
    panelsEl.querySelectorAll('.menu-panel').forEach(p => {
      const active = p.id === btn.dataset.target;
      p.classList.toggle('is-active', active);
      if (active && window.gsap) {
        gsap.fromTo(p.children, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .4, stagger: .03, ease: 'power2.out' });
      }
    });
  });
}

function renderReviews(reviews){
  const track = document.getElementById('reviewTrack');
  if (!track) return;
  const list = (reviews.positive || []).slice(0, 6);
  list.forEach(r => {
    const card = document.createElement('article');
    card.className = 'review-card';
    card.setAttribute('data-reveal', '');
    card.innerHTML = `
      <svg class="icon icon-quote" aria-hidden="true"><use href="assets/icons.svg#icon-quote"/></svg>
      <div class="review-stars" aria-hidden="true">${'<svg class="icon"><use href="assets/icons.svg#icon-star"/></svg>'.repeat(5)}</div>
      <p class="review-text">${r.text}</p>
      <div class="review-foot"><b>${r.author}</b><span>${r.date}</span></div>
    `;
    track.appendChild(card);
  });
}

function renderLocations(info){
  const grid = document.getElementById('locGrid');
  if (!grid || !info.locations) return;
  info.locations.forEach(loc => {
    const card = document.createElement('article');
    card.className = 'loc-card';
    card.setAttribute('data-reveal', '');
    card.innerHTML = `
      <h3 class="loc-name">${loc.name}</h3>
      <div class="loc-row">
        <svg class="icon" aria-hidden="true"><use href="assets/icons.svg#icon-pin"/></svg>
        <span>${loc.address}</span>
      </div>
      <div class="loc-row">
        <svg class="icon" aria-hidden="true"><use href="assets/icons.svg#icon-clock"/></svg>
        <span>Ежедневно 10:00–22:00</span>
      </div>
      <div class="loc-delivery">
        <svg class="icon" aria-hidden="true" style="width:16px;height:16px;vertical-align:-2px;margin-right:6px"><use href="assets/icons.svg#icon-truck"/></svg>
        Бесплатная доставка от <b>${loc.delivery_free_from} ₽</b>. При заказе на меньшую сумму — доставка <b>${loc.delivery_fee_below_min} ₽</b>.
      </div>
      <a href="${PHONE_TEL}" class="btn btn-primary btn-sm">
        <svg class="icon" aria-hidden="true"><use href="assets/icons.svg#icon-phone"/></svg>
        Позвонить и заказать
      </a>
    `;
    grid.appendChild(card);
  });
}

function initHeader(){
  const header = document.getElementById('siteHeader');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const toggleIconUse = document.querySelector('#navToggleIcon use');

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggleIconUse.setAttribute('href', open ? 'assets/icons.svg#icon-close' : 'assets/icons.svg#icon-menu');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggleIconUse.setAttribute('href', 'assets/icons.svg#icon-menu');
  }));
}

function initCounters(){
  const els = document.querySelectorAll('[data-counter]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  els.forEach(el => {
    const target = parseFloat(el.dataset.counter);
    const suffix = el.dataset.suffix || '';
    const isDecimal = String(target).includes('.');
    const setFinal = () => { el.textContent = (isDecimal ? target.toFixed(1) : target.toLocaleString('ru-RU')) + suffix; };
    if (reduceMotion || !window.gsap) { setFinal(); return; }
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => gsap.to(obj, {
        v: target, duration: 1.4, ease: 'power2.out',
        onUpdate: () => { el.textContent = (isDecimal ? obj.v.toFixed(1) : Math.round(obj.v).toLocaleString('ru-RU')) + suffix; },
        onComplete: setFinal
      })
    });
  });
}

function initReveals(){
  const items = document.querySelectorAll('[data-reveal]');
  if (!window.gsap) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  items.forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => el.classList.add('is-visible')
    });
  });
}

function initSmoke(){
  const path = document.getElementById('smokePath');
  if (!path) return;
  if (!window.gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    path.style.strokeDashoffset = '0';
    return;
  }
  gsap.to(path, { strokeDashoffset: 0, duration: 1.6, delay: .3, ease: 'power2.out' });
}

function initHeroEntrance(){
  if (!window.gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.hero [data-reveal]').forEach(el => el.classList.add('is-visible'));
    return;
  }
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .fromTo('.hero-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .9 })
    .fromTo('.hero-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .7 }, '-=.55')
    .fromTo('.hero-actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .7 }, '-=.5')
    .fromTo('.hero-stats', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .7 }, '-=.45')
    .fromTo('.hero-art', { opacity: 0, scale: .92 }, { opacity: 1, scale: 1, duration: 1 }, '-=.9');
  document.querySelectorAll('.hero [data-reveal]').forEach(el => el.classList.add('is-visible'));
}

(async function init(){
  document.getElementById('year').textContent = new Date().getFullYear();
  initHeader();

  if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  try {
    const [menu, info, reviews] = await Promise.all([
      loadJSON('data/menu.json'),
      loadJSON('data/info.json'),
      loadJSON('data/reviews.json')
    ]);
    renderMenu(menu);
    renderReviews(reviews);
    renderLocations(info);
  } catch (err) {
    console.error(err);
  }

  initHeroEntrance();
  initSmoke();
  initCounters();
  initReveals();
})();
