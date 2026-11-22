/* Elsadany — behaviour and motion
   I use no external libraries. Everything I need to change is in the settings below. */

/* ========== Settings: I edit these values ========== */
const CONFIG = {
  github:    'MohamedElsadany56',
  linkedin:  'https://www.linkedin.com/in/mohamed-goma/',
  instagram: 'https://www.instagram.com/mohamedelsadany56/',
  facebook:  '',   // I put my Facebook link here when it is ready, and the button shows up automatically
  email:     'elsadany5665@gmail.com',   // the same email as in my GitHub README; I change it if I want
  cv:        'https://drive.google.com/file/d/1rfs5HLJTqCsMH_Z5MEA2TbEX_9J1SfvP/view?usp=sharing'
};

/* The ready-made email text (changes with the language) */
const MAIL = {
  ar: { subject: 'تواصل بخصوص فرصة عمل / مشروع تحليل بيانات', body: 'أهلًا محمد،\n\nشفت البورتفوليو بتاعك وحابب نتكلم بخصوص ...\n\nشكرًا.' },
  en: { subject: 'Opportunity / data analysis project inquiry', body: 'Hi Mohamed,\n\nI saw your portfolio and would like to talk about ...\n\nThanks.' }
};

/* My own estimated levels out of 100. I adjust them to reflect my real level. */
const SKILLS = [
  { ar: 'Power BI وDAX',          en: 'Power BI & DAX',   v: 90 },
  { ar: 'SQL',                    en: 'SQL',              v: 85 },
  { ar: 'تحليل استكشافي',         en: 'EDA',              v: 85 },
  { ar: 'Python للبيانات',        en: 'Python for data',  v: 80 },
  { ar: 'هندسة البيانات',         en: 'Data engineering', v: 70 },
  { ar: 'تعلّم آلة',              en: 'Machine learning', v: 70 }
];

const ROLES = [
  { ar: 'محلل بيانات',                      en: 'a data analyst' },
  { ar: 'محلل ذكاء أعمال (BI)',             en: 'a business intelligence analyst' },
  { ar: 'مطوّر لوحات Power BI',             en: 'a Power BI dashboard developer' },
  { ar: 'خريج علوم حاسب (بيانات ضخمة)',     en: 'a Computer Science graduate (Big Data)' }
];

/* Fallback data I show if GitHub cannot be reached */
const FALLBACK = [
  { name: 'BelMiad', lang: 'Dart', stars: 19 },
  { name: 'SpeakX', lang: 'Dart', stars: 3 },
  { name: 'Traffic_Predictor', lang: 'Jupyter Notebook', stars: 2 },
  { name: 'Data_Structure_Project', lang: 'C++', stars: 0 },
  { name: 'MazeGenrator', lang: 'Python', stars: 0 },
  { name: 'InstallingVScode_and_cpp-compiler', lang: 'Batchfile', stars: 0 }
];

/* ========== Helpers ========== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;
let lang = root.lang === 'en' ? 'en' : 'ar';

function i18n(el, ar, en) {
  el.dataset.ar = ar; el.dataset.en = en;
  el.textContent = lang === 'en' ? en : ar;
}

/* ========== Language ========== */
const TITLES = {
  ar: 'السعدني | Elsadany — محلل بيانات',
  en: 'Elsadany | السعدني — Data Analyst'
};
function applyLang(l) {
  lang = l;
  root.lang = l; root.dir = l === 'ar' ? 'rtl' : 'ltr';
  $$('[data-en]').forEach(el => {
    if (el.dataset.ar === undefined) el.dataset.ar = el.textContent;
    el.textContent = l === 'en' ? el.dataset.en : el.dataset.ar;
  });
  const img = $('.hero-photo img');
  if (img.dataset.altAr === undefined) img.dataset.altAr = img.alt;
  img.alt = l === 'en' ? img.dataset.altEn : img.dataset.altAr;
  $('#lang').textContent = l === 'ar' ? 'EN' : 'ع';
  $('#lang').setAttribute('aria-label', l === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
  document.title = TITLES[l];
  try { localStorage.setItem('lang', l); } catch (e) {}
  buildRadar();
  startTyping();
  updateMail();
  $('#toTop').setAttribute('aria-label', l === 'ar' ? 'للأعلى' : 'Back to top');
}
$('#lang').addEventListener('click', () => applyLang(lang === 'ar' ? 'en' : 'ar'));

/* ========== Light and dark mode ========== */
function setTheme(t, save) {
  root.setAttribute('data-theme', t);
  if (save) { try { localStorage.setItem('theme', t); } catch (e) {} }
}
$('#theme').addEventListener('click', () => setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true));
if (window.matchMedia) {
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    let saved = null; try { saved = localStorage.getItem('theme'); } catch (x) {}
    if (!saved) setTheme(e.matches ? 'dark' : 'light', false);
  });
}

/* ========== Menu ========== */
const burger = $('#burger'), menu = $('#menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
});
$$('#menu a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false');
}));

/* ========== Typing my roles ========== */
let typeTimer, ri = 0, ci = 0, deleting = false;
function startTyping() {
  clearTimeout(typeTimer);
  const el = $('#typed');
  ri = 0; ci = 0; deleting = false;
  if (reduced) { el.textContent = ROLES[0][lang]; return; }
  el.textContent = '';
  tick();
}
function tick() {
  const el = $('#typed'), w = ROLES[ri][lang];
  if (!deleting) {
    ci++; el.textContent = w.slice(0, ci);
    if (ci >= w.length) { deleting = true; typeTimer = setTimeout(tick, 1700); return; }
    typeTimer = setTimeout(tick, 85);
  } else {
    ci--; el.textContent = w.slice(0, ci);
    if (ci <= 0) { deleting = false; ri = (ri + 1) % ROLES.length; typeTimer = setTimeout(tick, 350); return; }
    typeTimer = setTimeout(tick, 38);
  }
}

/* ========== Counters ========== */
function fmtNum(el, v) {
  const dec = +el.dataset.dec || 0;
  return Number(v).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
}
function countUp(el) {
  if (el.dataset.done) return;
  el.dataset.done = '1';
  const to = +el.dataset.count;
  if (reduced) { el.textContent = fmtNum(el, to); return; }
  const dur = 1700, t0 = performance.now();
  (function step(t) {
    const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
    el.textContent = fmtNum(el, to * e);
    if (p < 1) requestAnimationFrame(step); else el.textContent = fmtNum(el, to);
  })(t0);
}
function setCount(el, n) {
  if (!el) return;
  el.dataset.count = n;
  if (el.dataset.done) el.textContent = fmtNum(el, n);
}

/* ========== Radar chart ========== */
const NS = 'http://www.w3.org/2000/svg';
const RC = { cx: 260, cy: 172, R: 105 };
let radarProgress = 0;
function polar(i, r) {
  const a = (i * 360 / SKILLS.length - 90) * Math.PI / 180;
  return [RC.cx + Math.cos(a) * r, RC.cy + Math.sin(a) * r, Math.cos(a), Math.sin(a)];
}
function svgEl(name, attrs, parent) {
  const e = document.createElementNS(NS, name);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}
function buildRadar() {
  const svg = $('#radar'); svg.textContent = '';
  const defs = svgEl('defs', {}, svg);
  [['rgFill', .55], ['rgStroke', 1]].forEach(([id, op]) => {
    const g = svgEl('linearGradient', { id, x1: 0, y1: 0, x2: 1, y2: 1 }, defs);
    ['--c1', '--c3', '--c4'].forEach((c, i) => {
      const st = svgEl('stop', { offset: i / 2, 'stop-opacity': op }, g);
      st.style.stopColor = 'var(' + c + ')';
    });
  });
  [25, 50, 75, 100].forEach(l => {
    const pts = SKILLS.map((_, i) => polar(i, RC.R * l / 100).slice(0, 2).join(',')).join(' ');
    svgEl('polygon', { class: 'ring-l', points: pts }, svg);
  });
  SKILLS.forEach((s, i) => {
    const [x, y, c, sn] = polar(i, RC.R);
    svgEl('line', { class: 'axis', x1: RC.cx, y1: RC.cy, x2: x, y2: y }, svg);
    const [lx, ly] = polar(i, RC.R + 20);
    const anchor = c > 0.25 ? 'start' : c < -0.25 ? 'end' : 'middle';
    const t = svgEl('text', { x: lx, y: sn < -0.9 ? ly - 14 : sn > 0.9 ? ly + 6 : ly - 2, 'text-anchor': anchor }, svg);
    t.textContent = s[lang];
    const v = svgEl('text', { class: 'val', x: lx, y: (sn < -0.9 ? ly - 14 : sn > 0.9 ? ly + 6 : ly - 2) + 16, 'text-anchor': anchor }, svg);
    v.textContent = s.v;
  });
  svgEl('polygon', { class: 'shape', id: 'shape', points: '' }, svg);
  const DOT = ['--c1', '--c3', '--c4', '--c2', '--c6', '--c1'];
  SKILLS.forEach((_, i) => { const d = svgEl('circle', { class: 'dot', r: 5.5, cx: RC.cx, cy: RC.cy }, svg); d.style.fill = 'var(' + DOT[i % DOT.length] + ')'; });
  paintRadar(radarProgress);
}
function paintRadar(p) {
  radarProgress = p;
  const pts = SKILLS.map((s, i) => polar(i, RC.R * s.v / 100 * p));
  const shape = $('#shape'); if (!shape) return;
  shape.setAttribute('points', pts.map(q => q[0] + ',' + q[1]).join(' '));
  $$('#radar .dot').forEach((d, i) => { d.setAttribute('cx', pts[i][0]); d.setAttribute('cy', pts[i][1]); });
}
function animateRadar() {
  if (reduced) { paintRadar(1); return; }
  const t0 = performance.now(), dur = 1300;
  (function step(t) {
    const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
    paintRadar(e);
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}

/* ========== Reveal on scroll ========== */
function onShow(el) {
  $$('[data-count]', el).forEach(countUp);
  $$('#donut, .hbars', el).forEach(x => x.classList.add('in'));
  if (el.id === 'radarCard') animateRadar();
  if (el.classList.contains('tilt')) {
    const d = parseInt(el.style.getPropertyValue('--d')) || 0;
    setTimeout(() => el.classList.add('settled'), 900 + d);
  }
}
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); io.unobserve(e.target); onShow(e.target);
  }), { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
  $$('.reveal').forEach(el => io.observe(el));
} else {
  $$('.reveal').forEach(el => { el.classList.add('in'); onShow(el); });
}

/* ========== Filtering my projects ========== */
$$('.chip').forEach(btn => btn.addEventListener('click', () => {
  $$('.chip').forEach(b => b.classList.toggle('on', b === btn));
  const f = btn.dataset.f;
  $$('#projGrid .card').forEach(c => c.classList.toggle('hide', f !== 'all' && !c.dataset.cat.split(' ').includes(f)));
}));

/* ========== GitHub stats ========== */
const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
async function loadGitHub() {
  let all = null;
  try {
    const r = await fetch('https://api.github.com/users/' + CONFIG.github + '/repos?per_page=100&sort=updated',
      { headers: { Accept: 'application/vnd.github+json' } });
    if (!r.ok) throw new Error(r.status);
    all = await r.json();
  } catch (e) { all = null; }
  const live = Array.isArray(all) && all.length > 0;
  const own = live ? all.filter(x => !x.fork).map(x => ({ name: x.name, lang: x.language, stars: x.stargazers_count })) : FALLBACK;

  const st = $('#ghStatus');
  live ? i18n(st, 'بيانات حيّة من GitHub.', 'Live data from GitHub.')
       : i18n(st, 'تعذّر الاتصال بـ GitHub، فتُعرض بيانات محفوظة.', 'Could not reach GitHub, showing saved data.');

  if (live) {
    setCount($('#statRepos'), all.length);
    const bel = own.find(x => norm(x.name) === 'belmiad');
    if (bel) setCount($('#statStars'), bel.stars);
    /* I link the cards to my real repositories */
    $$('a[data-repo]').forEach(a => {
      const keys = [norm(a.dataset.repo)]; if (keys[0] === 'pstree') keys.push('xv6');
      const hit = all.find(r => keys.some(k => norm(r.name).includes(k)));
      if (hit) a.href = hit.html_url;
    });
  }
  drawDonut(own);
  drawBars(own);
}

function drawDonut(repos) {
  const C = 2 * Math.PI * 52, counts = {};
  repos.forEach(r => { if (r.lang) counts[r.lang] = (counts[r.lang] || 0) + 1; });
  let list = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  if (list.length > 5) {
    const rest = list.slice(4).reduce((s, x) => s + x[1], 0);
    list = list.slice(0, 4).concat([['__other', rest]]);
  }
  const total = list.reduce((s, x) => s + x[1], 0) || 1;
  const g = $('#donutSegs'), lg = $('#legend'); g.textContent = ''; lg.textContent = '';
  let cum = 0;
  list.forEach(([name, n], i) => {
    const len = n / total * C;
    const c = svgEl('circle', { class: 'seg', cx: 70, cy: 70, r: 52 }, g);
    c.style.stroke = 'var(--c' + (i + 1) + ')';
    c.style.strokeDashoffset = -cum;
    c.style.setProperty('--len', Math.max(len - 2, 1));
    c.style.transitionDelay = (i * 120) + 'ms';
    cum += len;
    const li = document.createElement('li');
    const sw = document.createElement('i'); sw.style.background = 'var(--c' + (i + 1) + ')';
    const nm = document.createElement('em'); nm.style.fontStyle = 'normal';
    name === '__other' ? i18n(nm, 'أخرى', 'Other') : (nm.textContent = name);
    const ct = document.createElement('span'); ct.textContent = n;
    li.append(sw, nm, ct); lg.appendChild(li);
  });
  $('#donutNum').textContent = total === 1 && !list.length ? 0 : list.reduce((s, x) => s + x[1], 0);
  const panel = $('#donut').closest('.reveal');
  if (panel && panel.classList.contains('in')) $('#donut').classList.add('in');
}

function drawBars(repos) {
  const top = repos.slice().sort((a, b) => b.stars - a.stars).slice(0, 6);
  const max = Math.max(1, ...top.map(r => r.stars));
  const ul = $('#hbars'); ul.textContent = '';
  top.forEach(r => {
    const li = document.createElement('li');
    const nm = document.createElement('span'); nm.className = 'nm'; nm.textContent = r.name; nm.title = r.name;
    const tr = document.createElement('span'); tr.className = 'tr';
    const bar = document.createElement('i'); bar.style.setProperty('--v', Math.max(r.stars / max * 100, 3) + '%');
    tr.appendChild(bar);
    const v = document.createElement('span'); v.className = 'v'; v.textContent = r.stars + ' ★';
    li.append(nm, tr, v); ul.appendChild(li);
  });
  const panel = ul.closest('.reveal');
  if (panel && panel.classList.contains('in')) ul.classList.add('in');
}

/* ========== Contact links ========== */
function setupContact() {
  const set = (id, href) => { if (!href) return; const a = $(id); a.href = href; a.closest('li').hidden = false; };
  set('#cLinkedin', CONFIG.linkedin);
  set('#cInstagram', CONFIG.instagram);
  set('#cFacebook', CONFIG.facebook);
  set('#cCv', CONFIG.cv);
  $('#cGithub').href = 'https://github.com/' + CONFIG.github;
  $('#mailAddr').textContent = CONFIG.email;
  $('#copyMail').addEventListener('click', copyEmail);
  updateMail();
}

/* ========== Email ==========
   A plain mailto: link fails when no mail app is registered on the device (the usual case for Gmail users on a computer).
   So on a computer I open the Gmail compose screen directly in a new tab,
   and on a phone I use mailto, which opens the mail app. A copy button and a mail-app link are there as backups. */
function updateMail() {
  const a = $('#cEmail'); if (!a || !CONFIG.email) return;
  const m = MAIL[lang], q = encodeURIComponent;
  const mailto = 'mailto:' + CONFIG.email + '?subject=' + q(m.subject) + '&body=' + q(m.body);
  const phone = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (window.matchMedia && matchMedia('(pointer:coarse)').matches);
  a.href = phone ? mailto
    : 'https://mail.google.com/mail/?view=cm&fs=1&to=' + q(CONFIG.email) + '&su=' + q(m.subject) + '&body=' + q(m.body);
  if (phone) a.removeAttribute('target'); else a.target = '_blank';
  $('#mailApp').href = mailto;
}
function copyEmail() {
  const btn = $('#copyMail');
  const done = ok => {
    btn.textContent = ok ? (lang === 'en' ? 'Copied ✓' : 'تم النسخ ✓') : (lang === 'en' ? 'Press Ctrl+C' : 'اضغط Ctrl+C');
    if (!ok) { const r = document.createRange(); r.selectNodeContents($('#mailAddr')); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); }
    setTimeout(() => { btn.textContent = lang === 'en' ? btn.dataset.en : btn.dataset.ar; }, 2000);
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(CONFIG.email).then(() => done(true), () => done(false));
  } else {
    const t = document.createElement('textarea'); t.value = CONFIG.email; t.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(t); t.select(); let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) {}
    t.remove(); done(ok);
  }
}

/* ========== Node network in the background ========== */
function network() {
  const cv = $('#net'), ctx = cv.getContext('2d');
  let W = 0, H = 0, pts = [], raf = 0, visible = true;
  const col = { p: ['#2384AF', '#7A55E0', '#D1435B', '#C27803'] };
  const mouse = { x: -999, y: -999 };
  const readCols = () => {
    const s = getComputedStyle(root);
    col.p = ['--c1', '--c3', '--c4', '--c2'].map((v, i) => s.getPropertyValue(v).trim() || col.p[i]);
  };
  function resize() {
    const r = cv.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(64, W / 17));
    pts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: 1.6 + Math.random() * 2, c: Math.floor(Math.random() * 4) }));
  }
  function draw(move) {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      if (move) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; }
    });
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.hypot(dx, dy);
        if (d < 130) { ctx.globalAlpha = (1 - d / 130) * .4; ctx.strokeStyle = col.p[pts[i].c]; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); }
      }
    }
    pts.forEach(p => {
      const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
      if (dm < 170) { ctx.globalAlpha = (1 - dm / 170) * .65; ctx.strokeStyle = col.p[p.c]; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
      ctx.globalAlpha = .75; ctx.fillStyle = col.p[p.c]; ctx.beginPath(); ctx.arc(p.x, p.y, dm < 170 ? p.r + 1.2 : p.r, 0, 6.2832); ctx.fill();
    });
    ctx.globalAlpha = 1;
  }
  function loop() { draw(true); raf = visible ? requestAnimationFrame(loop) : 0; }
  readCols(); resize(); draw(false);
  new MutationObserver(() => { readCols(); if (reduced) draw(false); }).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { resize(); draw(false); }, 150); });
  if (reduced) return;
  const hero = cv.closest('.hero');
  hero.addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
  hero.addEventListener('pointerleave', () => { mouse.x = mouse.y = -999; });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible && !raf) loop(); }, { threshold: 0 }).observe(cv);
  }
  loop();
}

/* ========== Scrolling and interaction ========== */
function scrollFx() {
  const bar = $('.progress'), links = $$('#menu a'), secs = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
  let queued = false;
  const tt = $('#toTop');
  tt.addEventListener('click', () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));
  function update() {
    queued = false;
    const h = root.scrollHeight - innerHeight;
    const pr = h > 0 ? Math.min(1, scrollY / h).toFixed(4) : 0;
    bar.style.setProperty('--p', pr);
    tt.style.setProperty('--p', pr);
    tt.classList.toggle('show', scrollY > 600);
    let cur = null;
    secs.forEach(s => { if (s.getBoundingClientRect().top <= 120) cur = s.id; });
    links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + cur));
  }
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
  update();
  const hero = $('.hero'), ph = $('#photo');
  if (!reduced && matchMedia('(pointer:fine)').matches) {
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      ph.style.setProperty('--px', ((e.clientX - r.left) / r.width - .5) * -18 + 'px');
      ph.style.setProperty('--py', ((e.clientY - r.top) / r.height - .5) * -18 + 'px');
      hero.style.setProperty('--gx', (e.clientX - r.left) + 'px');
      hero.style.setProperty('--gy', (e.clientY - r.top) + 'px');
    });
    hero.addEventListener('pointerleave', () => { ph.style.setProperty('--px', '0px'); ph.style.setProperty('--py', '0px'); });
  }
}

/* ========== Card tilt and a cursor-following glow ========== */
function tiltCards() {
  const els = $$('.card, .stat');
  els.forEach(el => el.classList.add('tilt', 'spot'));
  if (reduced || !matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  els.forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
      el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      if (el.classList.contains('settled')) {
        el.style.setProperty('--ry', ((x - .5) * 8).toFixed(2) + 'deg');
        el.style.setProperty('--rx', ((.5 - y) * 6).toFixed(2) + 'deg');
      }
    });
    el.addEventListener('pointerleave', () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
  });
}

/* ========== Scrolling tools strip ========== */
function marquee() {
  const tr = $('#mq'); if (!tr) return;
  const base = $$('span', tr);
  base.forEach((s, i) => s.classList.add('k' + (i % 6 + 1)));
  base.forEach(s => { const c = s.cloneNode(true); c.classList.add('mq-clone'); tr.appendChild(c); });
}

/* ========== Start-up ========== */
$('#yr').textContent = new Date().getFullYear();
tiltCards();          /* I add the tilt classes before the cards reveal */
marquee();
setupContact();
applyLang(lang);      /* builds the radar chart and starts the typing */
network();
scrollFx();
loadGitHub();
