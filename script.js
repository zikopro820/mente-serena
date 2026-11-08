/* =========================================================
   MENTE SERENA — Funciones del sitio
   Los servicios, especialistas, WhatsApp, dirección y horarios se
   editan desde el PANEL (si Firebase está conectado) o en datos.js.
   ========================================================= */
const D0 = window.DATOS || { ajustes: {}, servicios: [], productos: [], iconos: {} };
let AJ = { ...D0.ajustes };
let WHATSAPP = AJ.whatsapp || "51987654321";
const FB_CFG = window.FIREBASE_CONFIG || {};
const EN_VIVO = !!FB_CFG.apiKey && !FB_CFG.apiKey.startsWith("PEGA");
const FB_V = "10.12.2";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const soles = n => "S/ " + (+n).toFixed(2);
const precio = n => !+n ? "Consultar" : "S/ " + (Number.isInteger(+n) ? (+n).toLocaleString("en-US") : (+n).toFixed(2));
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const MEDIA = {};   // imágenes subidas desde el panel (m:ID → imagen)
const foto = (img, w = 600) => !img ? "" : img.startsWith("m:") ? (MEDIA[img.slice(2)] || "") : (img.startsWith("http") || img.startsWith("data:")) ? img : `https://images.unsplash.com/photo-${img}?auto=format&fit=crop&w=${w}&q=80`;
const wa = txt => window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(txt), "_blank");
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
const ICO = {
  plus: '<svg class="ico" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  check: '<svg class="ico" viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>',
  bag: '<svg class="ico" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/></svg>',
  paw: '<svg class="ico" viewBox="0 0 24 24"><path d="M7 3c-2.5 0-4 2-4 4.5 0 2 1 3.5 1.5 5.5.6 2.5.8 5.5 2 7.5.8 1.3 2.2 1 2.6-.4l.9-3.6c.3-1.2 1.7-1.2 2 0l.9 3.6c.4 1.4 1.8 1.7 2.6.4 1.2-2 1.4-5 2-7.5.5-2 1.5-3.5 1.5-5.5C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3z"/></svg>',
  arrow: '<svg class="ico" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
};
const icono = k => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">${(D0.iconos || {})[k] || (D0.iconos || {}).paw || ""}</svg>`;

/* ---------- Menú y animaciones ---------- */
const menu = $("#menu"), burger = $("#hamburger");
if (menu && burger) burger.addEventListener("click", () => burger.setAttribute("aria-expanded", menu.classList.toggle("open")));
let io = null;
function revealAll(root = document) {
  if (!io) { $$(".reveal", root).forEach(el => el.classList.add("visible")); return; }
  $$(".reveal:not(.visible)", root).forEach(el => io.observe(el));
}
if ("IntersectionObserver" in window) io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }), { threshold: .08 });
revealAll();
if (EN_VIVO) $$(".demo-only").forEach(el => el.remove());

function toast(t) {
  let el = $(".toast");
  if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
  el.innerHTML = ICO.check + t; el.classList.add("show");
  clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove("show"), 2200);
}

/* =========================================================
   DATOS: Firebase → panel en modo demo (mismo navegador) → datos.js
   ========================================================= */
const ordenar = l => l.slice().sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999) || String(a.n).localeCompare(String(b.n)));
let FBX = null;   // { fs, db } cuando Firebase está conectado
async function fb() {
  if (FBX) return FBX;
  const base = `https://www.gstatic.com/firebasejs/${FB_V}/`;
  const [app, fs] = await Promise.all([import(base + "firebase-app.js"), import(base + "firebase-firestore.js")]);
  FBX = { fs, db: fs.getFirestore(app.getApps().length ? app.getApp() : app.initializeApp(FB_CFG)) };
  return FBX;
}
const localDB = () => store.get("ms_db", null);
const mezclar = (a, b) => { const o = { ...a }; for (const k in (b || {})) o[k] = (b[k] && typeof b[k] === "object" && !Array.isArray(b[k]) && a && a[k]) ? { ...a[k], ...b[k] } : b[k]; return o; };
let DATA = null;
async function cargarDatos() {
  if (DATA) return DATA;
  let prod = null, serv = null, aj = null, web = null, cats = null, pags = null, docs = null;
  try {
    if (EN_VIVO) {
      let cache = null; try { cache = JSON.parse(sessionStorage.getItem("ms_cache")); } catch (e) {}
      if (cache && cache.v === 5 && Date.now() - cache.t < 3 * 60 * 1000) ({ prod, serv, aj, web, cats, pags, docs } = cache);
      else {
        const { fs, db } = await fb();
        const [p, s, a, w, c, g, dr] = await Promise.all([fs.getDocs(fs.collection(db, "productos")), fs.getDocs(fs.collection(db, "servicios")),
          fs.getDoc(fs.doc(db, "ajustes", "general")), fs.getDoc(fs.doc(db, "ajustes", "web")), fs.getDoc(fs.doc(db, "ajustes", "categorias")), fs.getDoc(fs.doc(db, "ajustes", "paginas")), fs.getDoc(fs.doc(db, "ajustes", "doctores"))]);
        cats = c.exists() ? c.data() : null; pags = g.exists() ? g.data() : null; docs = dr.exists() ? dr.data().lista : null;
        prod = p.docs.map(d => ({ ...d.data(), id: d.id })); serv = s.docs.map(d => ({ ...d.data(), id: d.id }));
        aj = a.exists() ? a.data() : null; web = w.exists() ? w.data() : null;
        try { sessionStorage.setItem("ms_cache", JSON.stringify({ v: 5, t: Date.now(), prod, serv, aj, web, cats, pags, docs })); } catch (e) {}
      }
    } else {
      const local = localDB();
      if (local) {
        if (local.productos) prod = Object.entries(local.productos).map(([id, x]) => ({ ...x, id }));
        if (local.servicios) serv = Object.entries(local.servicios).map(([id, x]) => ({ ...x, id }));
        aj = local.ajustes || null; web = local.web || null;
        cats = (local.conf || {}).categorias || null; pags = (local.conf || {}).paginas || null; docs = ((local.conf || {}).doctores || {}).lista || null;
      }
    }
  } catch (e) { console.warn("No se pudieron leer los datos; se usan los de ejemplo.", e); }
  await cargarMedios([web, pags]);
  DATA = {
    productos: ordenar(prod && prod.length ? prod : D0.productos).filter(x => x.visible !== false),
    servicios: ordenar(serv && serv.length ? serv : D0.servicios).filter(x => x.visible !== false),
    ajustes: { ...D0.ajustes, ...(aj || {}) },
    web: mezclar(D0.web || {}, web),
    categorias: { productos: ordenar((cats && cats.productos) || D0.categorias.productos), servicios: ordenar((cats && cats.servicios) || D0.categorias.servicios) },
    paginas: mezclar(D0.paginas || {}, pags),
    doctores: docs || D0.doctores || [],
  };
  return DATA;
}

// Imágenes guardadas aparte (encabezados, bloques, portada…): se leen todas antes de pintar
async function cargarMedios(objs) {
  const ids = [...new Set((JSON.stringify(objs).match(/"m:[A-Za-z0-9_-]+"/g) || []).map(x => x.slice(3, -1)))].filter(id => !MEDIA[id]);
  if (!ids.length) return;
  try {
    if (EN_VIVO) {
      let c = {}; try { c = JSON.parse(sessionStorage.getItem("ms_media") || "{}"); } catch (e) {}
      const faltan = ids.filter(id => !c[id]);
      if (faltan.length) { const { fs, db } = await fb();
        const r = await Promise.all(faltan.map(id => fs.getDoc(fs.doc(db, "medios", id)).catch(() => null)));
        r.forEach((d, i) => { if (d && d.exists()) c[faltan[i]] = d.data().data; });
        try { sessionStorage.setItem("ms_media", JSON.stringify(c)); } catch (e) {} }
      ids.forEach(id => { if (c[id]) MEDIA[id] = c[id]; });
    } else { const m = (localDB() || {}).medios || {}; ids.forEach(id => { if (m[id]) MEDIA[id] = m[id].data || m[id]; }); }
  } catch (e) { console.warn("No se pudieron leer las imágenes", e); }
}

/* ---------- Categorías (Pet Shop y servicios) ---------- */
let CATS = { productos: D0.categorias.productos, servicios: D0.categorias.servicios };
const norm = t => String(t || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
const catDe = (tipo, id) => CATS[tipo].find(c => c.id === id || norm(c.n) === norm(id)) || null;
const catNom = (tipo, id) => (catDe(tipo, id) || {}).n || id || "";
const enCat = (tipo, x, cid) => { const c = catDe(tipo, x.cat); return c ? c.id === cid : x.cat === cid; };
const catVisible = (tipo, x) => { const c = catDe(tipo, x.cat); return !c || c.visible !== false; };
function chipsCat(el, tipo, items, onPick, todos = "Todos") {
  const usados = CATS[tipo].filter(c => c.visible !== false && items.some(x => enCat(tipo, x, c.id)));
  el.innerHTML = `<button class="chip on" data-c="">${ICO.paw} ${todos}</button>` + usados.map(c => `<button class="chip" data-c="${esc(c.id)}">${icono(c.icon)} ${esc(c.n)}</button>`).join("");
  el.onclick = e => { const b = e.target.closest("[data-c]"); if (!b) return; $$(".chip", el).forEach(x => x.classList.remove("on")); b.classList.add("on"); onPick(b.dataset.c); };
  return usados;
}

/* ---------- Ajustes: WhatsApp, dirección, horarios ---------- */
function aplicarAjustes(a) {
  AJ = a; WHATSAPP = String(a.whatsapp || WHATSAPP).replace(/\D/g, "");
  $$(".wa-link").forEach(x => x.href = "https://wa.me/" + WHATSAPP);
  const t = {
    telefono: a.telefono, direccion: a.direccion, correo: a.correo,
    horario: `Lun a Sáb ${a.abre} – ${a.cierra} · Dom ` + (a.domingoCierra ? `${a.abre} – ${a.domingoCierra}` : "cerrado"),
    horarioLS: `${a.abre} – ${a.cierra}`, horarioDom: a.domingoCierra ? `${a.abre} – ${a.domingoCierra}` : "Cerrado",
    deliveryTxt: +a.deliveryGratis ? `Delivery gratis desde S/ ${a.deliveryGratis}` : "Delivery a todo Lima",
  };
  $$("[data-aj]").forEach(x => { const v = t[x.dataset.aj]; if (v != null && v !== "") x.textContent = v; });
  const m = $("#mapa"); if (m && a.direccion) { const src = "https://www.google.com/maps?q=" + encodeURIComponent(a.direccion) + "&output=embed"; if (m.src !== src) m.src = src; }
}

/* =========================================================
   PERSONALIZACIÓN (logo, nombre, colores, portada, nosotros...)
   ========================================================= */
let NOMBRE = "Mente Serena";
function hexMix(hex, to, p) {   // mezcla un color con blanco/negro para crear tonos
  const h = String(hex || "").replace("#", ""); if (!/^[0-9a-f]{6}$/i.test(h)) return null;
  const c = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)), t = to === "w" ? 255 : 0;
  return "#" + c.map(v => Math.round(v + (t - v) * p).toString(16).padStart(2, "0")).join("");
}
const iniciales = n => String(n || "").replace(/^(Dra?\.|Ps\.)\s*/i, "").split(/\s+/).slice(0, 2).map(w => w[0] || "").join("").toUpperCase();
function aplicarWeb(w) {
  const m = w.marca || {};
  NOMBRE = ((m.nombre1 || "") + (m.nombre2 || "")).trim() || NOMBRE;
  const logo = m.logo ? `<span class="paw logo-img"><img src="${esc(foto(m.logo, 200))}" alt="Logo ${esc(NOMBRE)}"></span>` : `<span class="paw">${$(".brand .paw svg")?.outerHTML || ""}</span>`;
  $$("[data-brand]").forEach(b => { b.innerHTML = `${logo}<span>${esc(m.nombre1 || "")}<b>${esc(m.nombre2 || "")}</b><small>${esc(m.eslogan || "")}</small></span>`; b.setAttribute("aria-label", NOMBRE + " inicio"); });
  $$("[data-nombre]").forEach(x => x.textContent = NOMBRE);
  $$("[data-eslogan]").forEach(x => x.textContent = m.eslogan || "");
  document.title = document.title.replace(/Mente Serena/g, NOMBRE);
  const r = document.documentElement.style, c1 = m.color1, c2 = m.color2;
  if (hexMix(c1, "w", 0)) { r.setProperty("--pri", c1); r.setProperty("--pri-2", hexMix(c1, "w", .25)); r.setProperty("--pri-soft", hexMix(c1, "w", .9)); $('meta[name="theme-color"]')?.setAttribute("content", c1); }
  if (hexMix(c2, "w", 0)) { r.setProperty("--coral", c2); r.setProperty("--coral-2", hexMix(c2, "w", .2)); }
  const p = w.portada || {};
  if ($("#hTitle")) {
    $("#hTag").textContent = p.etiqueta || ""; $("#hText").textContent = p.texto || "";
    $("#hTitle").innerHTML = `${esc(p.titulo || "")} <span>${esc(p.tituloColor || "")}</span>`;
    if (p.foto) { const im = $("#hPhoto img"); const src = foto(p.foto, 1000); if (!im) $("#hPhoto").insertAdjacentHTML("beforeend", `<img src="${esc(src)}" alt="" onerror="this.remove()">`); else if (im.getAttribute("src") !== src) im.src = src; }
    (p.cifras || []).forEach((c, i) => { const d = $$("#hCifras > div")[i]; if (d) { const t = d.querySelector("div"); t.innerHTML = `<b>${esc(c.n)}</b>${esc(c.t)}`; d.style.display = c.n ? "" : "none"; } });
  }
  const n = w.nosotros || {};
  if ($("#nTitle")) {
    $("#nTitle").innerHTML = `${esc(n.titulo || "")} <span class="c-pri">${esc(n.tituloColor || "")}</span>`;
    $("#nText").textContent = n.texto || "";
    $("#nPuntos").innerHTML = (n.puntos || []).filter(Boolean).map(x => `<li>${esc(x)}</li>`).join("");
    if (n.foto) $("#nPhoto").innerHTML = `<img src="${esc(foto(n.foto, 900))}" alt="">`;
  }
  if (w.equipo) $$("[data-pros]").forEach(box => { const lim = +box.dataset.limit || 99; box.innerHTML = w.equipo.filter(x => x.n).slice(0, lim).map(proCard).join(""); revealAll(box); });
  if ($("#team") && w.equipo) { $("#team").innerHTML = w.equipo.map(x => `<div class="doc reveal"><div class="av">${x.foto ? `<img src="${esc(foto(x.foto, 300))}" alt="">` : esc(iniciales(x.n))}</div><h3>${esc(x.n)}</h3><span>${esc(x.cargo)}</span><p>${esc(x.d)}</p></div>`).join(""); revealAll($("#team")); }
  if (w.testimonios) $$("[data-testis]").forEach(t => { t.innerHTML = w.testimonios.map(x => `<figure class="testi reveal"><div class="stars">★★★★★</div><blockquote>"${esc(x.q)}"</blockquote><figcaption class="testi-who"><span class="av">${esc(iniciales(x.n))}</span><div><b>${esc(x.n)}</b><span>${esc(x.r)}</span></div></figcaption></figure>`).join(""); revealAll(t); });
  const rd = w.redes || {};
  $$("[data-red]").forEach(a => { const u = rd[a.dataset.red]; if (u) { a.href = /^https?:/.test(u) ? u : "https://" + u; a.style.display = ""; } else a.style.display = "none"; });
  $$(".socials").forEach(s => s.style.display = Object.values(rd).some(Boolean) ? "" : "none");
  // la ayuda en crisis siempre queda visible (botón flotante); el aviso grande se puede ocultar
  $$(".crisis-banner").forEach(x => x.style.display = w.emergencias === false ? "none" : "");
}

/* ---------- Tarjeta de especialista ---------- */
function proCard(x) {
  const ps = x.area === "psiquiatria";
  return `<article class="pro reveal" data-area="${esc(x.area || "psicologia")}">
    <div class="pro-av">${x.foto ? `<img src="${esc(foto(x.foto, 300))}" alt="${esc(x.n)}">` : esc(iniciales(x.n))}</div>
    <div class="pro-b"><span class="pro-area ${ps ? "psiquiatria" : "psicologia"}">${ps ? "Psiquiatría" : "Psicología"}</span><h3>${esc(x.n)}</h3><b class="pro-cargo">${esc(x.cargo || "")}</b><p>${esc(x.d || "")}</p>
      ${x.enfoque ? `<small class="pro-enf">${esc(x.enfoque)}</small>` : ""}
      <div class="pro-foot"><span class="pro-mod">${icono("home")} Presencial${x.online !== false ? ` · ${icono("video")} Online` : ""}</span>${x.id ? `<a class="btn btn-light btn-sm" href="citas?pro=${encodeURIComponent(x.id)}">Agendar ${ICO.arrow}</a>` : `<a class="btn btn-light btn-sm" href="citas">Agendar ${ICO.arrow}</a>`}</div></div>
  </article>`;
}
const proCats = $("#proCats");
if (proCats) proCats.addEventListener("click", e => { const b = e.target.closest("[data-area]"); if (!b) return;
  $$(".chip", proCats).forEach(x => x.classList.toggle("on", x === b)); $$("[data-pros] .pro").forEach(p => p.style.display = !b.dataset.area || p.dataset.area === b.dataset.area ? "" : "none"); });

/* ---------- Ayuda inmediata (crisis) ---------- */
const crisis = $("#crisis");
document.addEventListener("click", e => {
  if (e.target.closest("[data-crisis]")) { e.preventDefault(); if (crisis) { crisis.hidden = false; crisis.querySelector(".crisis-line")?.focus(); } }
  if (e.target.closest("[data-crisis-close]") && crisis) crisis.hidden = true;
});
document.addEventListener("keydown", e => { if (e.key === "Escape" && crisis && !crisis.hidden) crisis.hidden = true; });

/* =========================================================
   SERVICIOS
   ========================================================= */
function svcCard(x) {
  const u = `servicio?id=${encodeURIComponent(x.id)}`;
  return `<article class="svc reveal">
    <a class="svc-img" href="${u}">${x.img ? `<img src="${esc(foto(x.img, 700))}" alt="${esc(x.n)}" loading="lazy" onerror="this.remove()">` : ""}<span class="ic">${icono(x.icon)}</span>${x.online !== false ? `<span class="svc-on">${icono("video")} Online</span>` : ""}</a>
    <div class="svc-body"><h3><a href="${u}">${esc(x.n)}</a></h3><p>${esc(x.d)}</p>
      <div class="svc-foot"><div class="price"><small>${esc(x.duracion || "Por sesión")}</small><b>${precio(x.p)}</b></div>
      <a href="${u}" class="btn btn-light btn-sm">Ver más ${ICO.arrow}</a></div>
    </div></article>`;
}
function pintarServicios(todos) {
  const list = todos.filter(x => catVisible("servicios", x));
  const main = $$("#svcMain"), mini = $("#svcMini");
  const draw = cid => {
    const l = cid ? list.filter(x => enCat("servicios", x, cid)) : list;
    main.forEach(el => { const lim = +el.dataset.limit || 99, pri = l.filter(x => x.tipo !== "adicional");
      el.innerHTML = (cid ? l.map(svcCard) : pri.slice(0, lim).map(svcCard)).join("") || `<p class="empty">No hay servicios en esta categoría.</p>`; revealAll(el); });
    if (mini) { mini.parentElement.parentElement.style.display = cid ? "none" : "";
      mini.innerHTML = list.filter(x => x.tipo === "adicional").map(x => `<div class="svc-mini reveal"><i>${icono(x.icon)}</i><div><b>${esc(x.n)}</b><span>${esc(x.d)}${+x.p ? " · " + precio(x.p) : ""}</span></div></div>`).join(""); revealAll(mini); }
  };
  const box = $("#svcCats"); if (box) chipsCat(box, "servicios", list, draw, "Todos");
  draw("");
}

/* =========================================================
   AGENDA: horarios libres reales y reserva
   turnos/{fecha_hora_n}  → lugar ocupado (sin datos personales)
   citas/{mismo id}       → la cita completa (solo la ve el panel)
   clientes/{código}/agenda/{id} → copia que ve el cliente en Mi Mascota
   ========================================================= */
const pad2 = n => String(n).padStart(2, "0");
const isoD = d => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
const aMin = t => { const [h, m] = String(t || "0:00").split(":").map(Number); return h * 60 + (m || 0); };
const aHora = m => pad2(Math.floor(m / 60)) + ":" + pad2(m % 60);
function horasDelDia(fecha) {
  const d = new Date(fecha + "T12:00"), dom = d.getDay() === 0;
  const fin = dom ? AJ.domingoCierra : AJ.cierra; if (!fin) return [];
  const paso = +AJ.turno || 30, out = [];
  for (let t = aMin(AJ.abre); t + paso <= aMin(fin); t += paso) out.push(aHora(t));
  return out;
}
let DOCTORES_W = [];
function capHora(fecha, h) {   // cuántas citas caben: doctores que trabajan a esa hora (y vinieron)
  const act = DOCTORES_W.filter(d => d.activo !== false);
  if (!act.length) return Math.max(1, +AJ.capacidad || 1);
  const dia = new Date(fecha + "T12:00").getDay(), paso = +AJ.turno || 30;
  return act.filter(d => (d.dias || []).includes(dia) && !(d.ausencias || []).some(a => a.desde <= fecha && fecha <= (a.hasta || a.desde))
    && aMin(h) >= aMin(d.desde) && aMin(h) + paso <= aMin(d.hasta)).length;
}
// ¿El profesional atiende ese día y a esa hora?
function trabaja(d, fecha, h) {
  const dia = new Date(fecha + "T12:00").getDay(), paso = +AJ.turno || 60;
  return d.activo !== false && (d.dias || []).includes(dia) && !(d.ausencias || []).some(a => a.desde <= fecha && fecha <= (a.hasta || a.desde))
    && aMin(h) >= aMin(d.desde) && aMin(h) + paso <= aMin(d.hasta);
}
async function ocupadosDe(fecha) {   // { "10:30": 2, ... }
  const cnt = {};
  if (EN_VIVO) {
    const { fs, db } = await fb();
    const s = await fs.getDocs(fs.query(fs.collection(db, "turnos"), fs.where("fecha", "==", fecha)));
    s.docs.forEach(d => { const h = d.data().hora; cnt[h] = (cnt[h] || 0) + 1; });
  } else {
    Object.values((localDB() || {}).turnos || {}).forEach(t => { if (t.fecha === fecha) cnt[t.hora] = (cnt[t.hora] || 0) + 1; });
  }
  return cnt;
}
async function buscarCliente(code) {   // → { dueno, mascotas:[{id,nombre,especie,raza}] } | null
  if (EN_VIVO) {
    const { fs, db } = await fb();
    const c = await fs.getDoc(fs.doc(db, "clientes", code)); if (!c.exists()) return null;
    const [ms, ag] = await Promise.all([fs.getDocs(fs.collection(db, "clientes", code, "mascotas")), fs.getDocs(fs.collection(db, "clientes", code, "agenda")).catch(() => ({ docs: [] }))]);
    return { dueno: c.data().dueno || "", mascotas: ms.docs.map(d => ({ id: d.id, ...d.data() })), agenda: ag.docs.map(d => ({ id: d.id, ...d.data() })) };
  }
  const L = localDB() || {}, c = (L.clientes || {})[code];
  if (!c) { const d = typeof CLIENTES !== "undefined" && CLIENTES[code];
    return d ? { dueno: d.dueno, mascotas: d.mascotas, demo: true, agenda: d.mascotas.flatMap(m => (m.citas || []).map(x => ({ mascotaId: m.id, fecha: isoD(x.fecha instanceof Date ? x.fecha : new Date(x.fecha + "T12:00")), estado: "confirmada", paqueteId: x.paquete && m.paquetes[0] ? m.paquetes[0].id : "" }))) } : null; }
  return { dueno: c.dueno, mascotas: Object.entries(c.mascotas || {}).map(([id, m]) => ({ id, ...m })), agenda: Object.entries(L.citas || {}).filter(([, a]) => a.code === code).map(([id, a]) => ({ id, ...a })) };
}
async function reservar(base, pago) {   // intenta ocupar un lugar libre del horario; devuelve el id de la cita
  const cap = Math.max(1, capHora(base.fecha, base.hora)), pub = base.code && base.mascotaId;
  const agenda = { fecha: base.fecha, hora: base.hora, servicio: base.servicio, precio: base.precio, modalidad: base.modalidad, mascota: base.mascota, mascotaId: base.mascotaId, total: base.precio, pagado: 0, estadoPago: "pendiente", estado: "confirmada", creado: base.creado };
  if (base.paqueteId) agenda.paqueteId = base.paqueteId;
  if (base.adelantoPend) { agenda.adelantoPend = base.adelantoPend; agenda.adelantoEstado = base.adelantoEstado; }
  for (let k = 1; k <= cap; k++) {
    const id = `${base.fecha}_${base.hora}_${k}`;
    if (EN_VIVO) {
      const { fs, db } = await fb();
      try {
        const b = fs.writeBatch(db);
        b.set(fs.doc(db, "turnos", id), { fecha: base.fecha, hora: base.hora, k, creado: base.creado });
        b.set(fs.doc(db, "citas", id), { ...base, k });
        if (pub) b.set(fs.doc(db, "clientes", base.code, "agenda", id), agenda);
        if (pago) b.set(fs.doc(db, "pagos_web", id), { ...pago, citaId: id });
        await b.commit(); return id;
      } catch (e) { if (!/permission|exists/i.test(e.code || e.message)) throw e; }   // ese lugar ya se ocupó: probamos el siguiente
    } else {
      const d = localDB() || { clientes: {} }; d.turnos = d.turnos || {}; d.citas = d.citas || {};
      if (d.turnos[id]) continue;
      d.turnos[id] = { fecha: base.fecha, hora: base.hora, k, creado: base.creado };
      d.citas[id] = { ...base, k };
      if (pago) { d.pagos_web = d.pagos_web || {}; d.pagos_web[id] = { ...pago, citaId: id }; }
      store.set("ms_db", d); return id;
    }
  }
  return null;
}

function iniciarCitas(servicios) {
  const book = $("#bookForm"); if (!book) return;
  const opts = $("#svcOpts"), res = servicios.filter(x => x.reservable !== false);
  const opt = (x, i) => `<label class="opt"><input type="radio" name="servicio" value="${esc(x.n)}" data-key="${esc(x.id)}" data-area="${esc(x.area || "psicologia")}" data-online="${x.online === false ? 0 : 1}" data-p="${+x.p || 0}" data-price="${+x.p ? precio(x.p) : "Consultar"}" required${i === 0 ? " checked" : ""}><span>${icono(x.icon)}${esc(x.n)}<small>${+x.p ? precio(x.p) : "a consultar"}${x.duracion ? " · " + esc(x.duracion) : ""}</small></span></label>`;
  if (opts && res.length) {
    let i = 0; const grupos = CATS.servicios.filter(c => c.visible !== false).map(c => ({ c, l: res.filter(x => enCat("servicios", x, c.id)) })).filter(g => g.l.length);
    const sinCat = res.filter(x => !catDe("servicios", x.cat));
    if (grupos.length > 1) { opts.classList.add("grouped"); opts.innerHTML = grupos.map(g => `<p class="opt-cat">${icono(g.c.icon)} ${esc(g.c.n)}</p>` + g.l.map(x => opt(x, i++)).join("")).join("") + (sinCat.length ? `<p class="opt-cat">Otros</p>` + sinCat.map(x => opt(x, i++)).join("") : ""); }
    else opts.innerHTML = res.map(opt).join("");
  }
  // profesional de preferencia: solo los del área del servicio elegido (psicología o psiquiatría)
  const pref = $("[name=preferencia]", book), prefTodos = pref ? pref.options[0].outerHTML : "";
  const areaSel = () => ($("input[name=servicio]:checked", book) || {}).dataset?.area || "psicologia";
  const proSel = () => DOCTORES_W.find(d => d.n === (pref && pref.value));
  function llenarPros() {
    if (!pref) return; const prev = pref.value, area = areaSel();
    const l = DOCTORES_W.filter(d => d.activo !== false && (!d.area || d.area === area));
    pref.innerHTML = prefTodos + l.map(d => `<option value="${esc(d.n)}" data-id="${esc(d.id)}">${esc(d.n)} · ${esc(d.esp || "")}</option>`).join("");
    if (l.some(d => d.n === prev)) pref.value = prev;
  }
  // modalidad: algunos servicios son solo presenciales
  const modMsg = $("#modMsg");
  function revisarModalidad() {
    const s = $("input[name=servicio]:checked", book), on = $("input[name=modalidad][value=Online]", book); if (!s || !on) return;
    const ok = s.dataset.online !== "0"; on.disabled = !ok; on.closest(".mod").classList.toggle("off", !ok);
    if (!ok && on.checked) $("input[name=modalidad][value=Presencial]", book).checked = true;
    modMsg.textContent = ok ? "" : "Este servicio se realiza solo de forma presencial.";
  }
  const dateIn = $("[name=fecha]", book), slotsBox = $("#slots");
  llenarPros(); revisarModalidad();
  book.addEventListener("change", e => { if (e.target.name === "servicio") { llenarPros(); revisarModalidad(); drawSlots(); } if (e.target.name === "preferencia") drawSlots(); });
  dateIn.min = isoD(new Date());
  const max = new Date(); max.setDate(max.getDate() + 60); dateIn.max = isoD(max);
  let slot = "", cliente = null;
  const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const nice = s => { const d = new Date(s + "T12:00"); return `${DIAS[d.getDay()]} ${d.getDate()} de ${MESES[d.getMonth()]}`; };
  let pedido = 0;
  async function drawSlots() {
    slot = ""; updateSum();
    if (!dateIn.value) { slotsBox.innerHTML = `<p class="slots-msg">Primero elige una fecha para ver los horarios disponibles.</p>`; return; }
    const fecha = dateIn.value, horas = horasDelDia(fecha), n = ++pedido;
    if (!horas.length) { slotsBox.innerHTML = `<p class="slots-msg">Ese día no atendemos. Prueba con otra fecha.</p>`; return; }
    slotsBox.innerHTML = `<p class="slots-msg">Buscando horarios disponibles…</p>`;
    let occ = {}; try { occ = await ocupadosDe(fecha); } catch (e) { console.warn(e); }
    if (n !== pedido) return;
    const cap = h => capHora(fecha, h), now = new Date(), hoy = fecha === isoD(now);
    const pro = proSel(), area = areaSel(), hayPros = DOCTORES_W.some(d => d.activo !== false);
    const atiende = h => !hayPros || (pro ? trabaja(pro, fecha, h) : DOCTORES_W.some(d => (!d.area || d.area === area) && trabaja(d, fecha, h)));
    const libres = horas.filter(h => atiende(h) && (occ[h] || 0) < cap(h) && !(hoy && aMin(h) <= now.getHours() * 60 + now.getMinutes() + 30));
    slotsBox.innerHTML = libres.length ? libres.map(h => { const n = cap(h) - (occ[h] || 0); return `<button type="button" class="slot" data-h="${h}">${h}${n > 1 ? `<small>${n} libres</small>` : ""}</button>`; }).join("")
      : `<p class="slots-msg">${pro ? esc(pro.n) + " no tiene horarios libres este día." : "No quedan horarios libres este día."} Prueba con otra fecha${pro ? " o con otro profesional" : ""}.</p>`;
  }
  slotsBox.addEventListener("click", e => {
    const b = e.target.closest(".slot"); if (!b) return;
    $$(".slot", slotsBox).forEach(x => x.classList.remove("on")); b.classList.add("on"); slot = b.dataset.h; updateSum();
  });
  dateIn.addEventListener("change", drawSlots);
  function updateSum() {
    const s = $("input[name=servicio]:checked", book), ed = $("[name=edad]", book).value;
    $("#sServ").textContent = s ? s.value : "—";
    $("#sPet").textContent = ($("[name=mascota]", book).value.trim() || "—") + (ed ? ` · ${ed} años` : "");
    $("#sDoc").textContent = pref && pref.value ? pref.value : "El primero disponible";
    $("#sMod").textContent = ($("input[name=modalidad]:checked", book) || {}).value || "Presencial";
    $("#sDate").textContent = dateIn.value ? nice(dateIn.value) : "—";
    $("#sHour").textContent = slot || "—";
    $("#sPrice").textContent = PAQ.usar ? "S/ 0 · incluida en tu paquete" : s ? s.dataset.price : "—";
    $(".summary .sum-total").classList.toggle("paq", !!PAQ.usar);
    let fa = $("#sAdl"); if (!fa) { $(".summary .sum-total").insertAdjacentHTML("afterend", `<div class="sum-row adl-row" id="sAdl"><span>Adelanto</span><b></b></div>`); fa = $("#sAdl"); }
    const am = typeof ADL !== "undefined" && ADL.si && !PAQ.usar ? +($("#adlMonto") || {}).value || 0 : 0;
    fa.hidden = !am; if (am) fa.querySelector("b").textContent = `${precio(am)} · saldo ${precio(Math.max((+(($("input[name=servicio]:checked", book) || {}).dataset?.p || 0)) - am, 0))}`;
  }
  book.addEventListener("input", updateSum); book.addEventListener("change", updateSum);

  /* ---- Adelanto con Yape o Plin (el paciente elige) ---- */
  const ADL = { si: false, met: "", banco: "", img: "", ocr: null, leyendo: false };
  const BANCOS = { BCP: ["#0033a0", "#ff7800"], Interbank: ["#00a94f", "#0039a6"], BBVA: ["#072146", "#1973b8"], Scotiabank: ["#ec111a", "#9b0a10"], BanBif: ["#003b7a", "#e4002b"], Pichincha: ["#ffdd00", "#0f265c"] };
  const cuentas = () => (Array.isArray(AJ.cuentas) ? AJ.cuentas : []).filter(c => c && c.banco && (c.num || c.cci));
  const cuentaSel = () => cuentas().find(c => c.id === ADL.banco) || null;
  const logoBanco = c => { const [c1, c2] = BANCOS[c.banco] || ["#3d6b63", "#c77b5d"];
    return c.logo ? `<img src="${esc(c.logo)}" alt="${esc(c.banco)}">` : `<span class="bk-mark" style="--b1:${c1};--b2:${c2}"><i></i>${esc(c.banco)}</span>`; };
  const adlBox = document.createElement("div"); adlBox.id = "adlBox";
  $("[name=nombre]", book).closest(".f-grid").previousElementSibling.before(adlBox);
  const metodos = () => [AJ.pagoYape !== false && AJ.yapeQR ? "Yape" : "", AJ.pagoPlin !== false && AJ.plinQR ? "Plin" : "", AJ.pagoTransf !== false && cuentas().length ? "Transferencia" : ""].filter(Boolean);
  const precioSel = () => +(($("input[name=servicio]:checked", book) || {}).dataset?.p || 0);
  const minAdl = () => { const p = precioSel(), v = +AJ.adelantoValor || 0, m = AJ.adelantoTipo === "porcentaje" ? Math.round(p * v / 100) : v; return p ? Math.min(m, p) : m; };
  const qrDe = m => m === "Plin" ? { qr: AJ.plinQR, num: AJ.plinNum, tit: AJ.plinTitular } : { qr: AJ.yapeQR, num: AJ.yapeNum, tit: AJ.yapeTitular };
  function pintarAdl() {
    const mets = metodos(), p = precioSel();
    if (!mets.length || !p || PAQ.usar) { adlBox.innerHTML = ""; ADL.si = false; return updateSum(); }
    if (!ADL.met || !mets.includes(ADL.met)) ADL.met = mets[0];
    if (AJ.adelantoObligatorio) ADL.si = true;
    const tr = ADL.met === "Transferencia", cb = cuentaSel();
    const q = qrDe(ADL.met), min = minAdl(), monto = $("#adlMonto") ? $("#adlMonto").value : min;
    adlBox.innerHTML = `<span class="f-label">${AJ.adelantoObligatorio ? "Adelanto para reservar *" : "¿Quieres dejar un adelanto?"}</span>
      ${AJ.adelantoObligatorio ? "" : `<div class="mods adl-op"><label class="mod"><input type="radio" name="adlOp" value="si" ${ADL.si ? "checked" : ""}><span>${ICO.check}<b>Adelantar ahora</b><small>Con ${mets.join(", ").replace(/, ([^,]*)$/, " o $1")} · desde ${precio(min)}</small></span></label>
        <label class="mod"><input type="radio" name="adlOp" value="no" ${ADL.si ? "" : "checked"}><span>${icono("home")}<b>Pagar en el consultorio</b><small>${/online/i.test(($("input[name=modalidad]:checked", book) || {}).value || "") ? "O antes de tu sesión online" : "El día de tu cita"}</small></span></label></div>`}
      <div class="adl" ${ADL.si ? "" : "hidden"}>
        ${mets.length > 1 ? `<div class="adl-tabs">${mets.map(m => `<button type="button" class="adl-tab ${m === ADL.met ? "on" : ""} ${m.toLowerCase()}" data-met="${m}">${m === "Transferencia" ? "Transferencia" : m}</button>`).join("")}</div>` : ""}
        ${tr ? `<div class="adl-bk">
          <b>1. Elige tu banco y transfiere</b><small>Toca el logo de tu banco: copiamos el número de cuenta y te llevamos a su página para pagar.</small>
          <div class="bk-logos">${cuentas().map(c => `<button type="button" class="bk ${cb && cb.id === c.id ? "on" : ""}" data-banco="${esc(c.id)}" aria-label="Pagar en ${esc(c.banco)}" title="Pagar en ${esc(c.banco)}">${logoBanco(c)}</button>`).join("")}</div>
          ${cb ? `<div class="bk-det">
            ${cb.num ? `<div class="bk-row"><span>Cuenta ${esc((cb.tipo || "").toLowerCase())} ${cb.moneda ? "en " + esc(cb.moneda.toLowerCase()) : ""} · ${esc(cb.banco)}</span><b>${esc(cb.num)}</b><button type="button" class="btn btn-light btn-sm" data-copynum="${esc(String(cb.num).replace(/\D/g, ""))}">Copiar</button></div>` : ""}
            ${cb.cci ? `<div class="bk-row"><span>CCI · si pagas desde otro banco</span><b>${esc(cb.cci)}</b><button type="button" class="btn btn-light btn-sm" data-copynum="${esc(String(cb.cci).replace(/\D/g, ""))}">Copiar</button></div>` : ""}
            <small>A nombre de <b>${esc(cb.titular || NOMBRE)}</b></small>
            ${cb.url ? `<a class="btn btn-pri btn-sm bk-ir" href="${esc(cb.url)}" target="_blank" rel="noopener">Ir a ${esc(cb.banco)} para pagar ↗</a>` : ""}
          </div>` : `<p class="bk-hint">👆 Elige el banco al que vas a transferir</p>`}
          <p class="adl-note">${icono("clock")} Desde el mismo banco llega al instante. Desde otro banco (con CCI) puede tardar hasta el siguiente día hábil si no es transferencia inmediata.</p>
        </div>` : `<div class="adl-qr ${ADL.met.toLowerCase()}">
          <img src="${esc(q.qr)}" alt="Código QR de ${ADL.met}">
          <div><b>1. Escanea el QR con ${ADL.met}</b><span>o ${ADL.met === "Plin" ? "plinea" : "yapea"} al número:</span><div class="adl-num"><b>${esc(q.num || "")}</b><button type="button" class="btn btn-light btn-sm" data-copynum="${esc(String(q.num || "").replace(/\D/g, ""))}">Copiar</button></div><small>A nombre de <b>${esc(q.tit || NOMBRE)}</b></small></div>
        </div>`}
        <div class="f-grid adl-g">
          <label class="adl-l">2. ¿Cuánto adelantas? <small>(mínimo ${precio(min)} · total ${precio(p)})</small><input type="number" id="adlMonto" min="${min}" max="${p}" step="0.1" value="${esc(monto)}" inputmode="decimal"></label>
          <label class="adl-l">3. Sube ${tr ? "la constancia de la transferencia" : "la captura del pago"}<span class="adl-up ${ADL.img ? "ok" : ""}"><input type="file" id="adlFile" accept="image/*">${ADL.img ? `<img src="${ADL.img}" alt="Captura del pago">` : `${icono("file")} Elegir imagen`}</span></label>
        </div>
        <div class="adl-ocr" id="adlOcr"></div>
        <label class="adl-l">Número de operación <small>(lo leemos de tu captura; corrígelo si hace falta)</small><input id="adlOp" maxlength="14" inputmode="numeric" placeholder="Ej. 12345678" value="${esc((ADL.ocr && ADL.ocr.op) || "")}"></label>
        <p class="adl-note">${icono("lock")} Recepción confirma tu adelanto en minutos y te avisa por WhatsApp. Lo verás en Mi Espacio.</p>
      </div>`;
    revisarOCR(); updateSum();
  }
  function revisarOCR() {
    const box = $("#adlOcr"); if (!box) return;
    if (ADL.leyendo) { box.className = "adl-ocr"; box.innerHTML = `<span class="spin"></span> Leyendo tu captura…`; return; }
    if (!ADL.img) { box.innerHTML = ""; return; }
    const o = ADL.ocr, m = +($("#adlMonto") || {}).value || 0;
    if (!o || !o.montos.length) { box.className = "adl-ocr warn"; box.innerHTML = `${icono("file")} No pudimos leer el monto de la captura. No te preocupes: recepción la revisará.`; return; }
    o.coincide = o.montos.some(x => Math.abs(x - m) < 0.01);
    box.className = "adl-ocr " + (o.coincide ? "ok" : "bad");
    box.innerHTML = o.coincide ? `${ICO.check} El monto de tu captura (${precio(m)}) coincide.${o.fechaOk === false ? " <b>Ojo: la fecha de la captura no es de hoy.</b>" : ""}`
      : `${icono("lifebuoy")} Tu captura dice <b>${o.montos.map(precio).join(" / ")}</b> y escribiste <b>${precio(m)}</b>. Corrige el monto o sube la captura correcta.
         <label class="adl-chk"><input type="checkbox" id="adlForzar"> Mi captura es correcta, que recepción la revise</label>`;
  }
  async function leerCaptura(src) {   // lectura automática del texto de la captura (en el celular)
    if (AJ.adelantoOCR === false) return null;
    if (!window.Tesseract) await new Promise((ok, no) => { const sc = document.createElement("script"); sc.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js"; sc.onload = ok; sc.onerror = no; document.head.appendChild(sc); });
    const r = await Promise.race([window.Tesseract.recognize(src, "spa"), new Promise((_, no) => setTimeout(() => no(new Error("tiempo")), 30000))]);
    const t = (r && r.data && r.data.text) || "";
    const montos = [...new Set([...t.matchAll(/S\s*\/\.?\s*(\d{1,4}(?:[.,]\d{1,2})?)/gi)].map(x => +x[1].replace(",", ".")).filter(x => x > 0))];
    const op = (t.match(/operaci[oó]n\D{0,25}(\d{6,14})/i) || t.match(/\b(\d{8})\b/) || [])[1] || "";
    const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "set", "oct", "nov", "dic"], fm = t.match(/(\d{1,2})\s*(?:de\s*)?(ene|feb|mar|abr|may|jun|jul|ago|set|sep|oct|nov|dic)[a-z]*\.?\s*(?:de\s*)?(\d{4})?/i);
    let fechaOk = null; if (fm) { const mi = MESES.indexOf(fm[2].toLowerCase().replace("sep", "set")), d = new Date(), ay = new Date(Date.now() - 864e5); fechaOk = [d, ay].some(x => x.getDate() === +fm[1] && x.getMonth() === mi); }
    return { montos, op, fechaOk, texto: t.slice(0, 400) };
  }
  function comprimir(file) { return new Promise((ok, no) => { const fr = new FileReader(); fr.onerror = no; fr.onload = () => { const im = new Image(); im.onerror = no; im.onload = () => {
    const k = Math.min(1, 1100 / Math.max(im.width, im.height)), c = document.createElement("canvas"); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
    c.getContext("2d").drawImage(im, 0, 0, c.width, c.height); let q = .75, u = c.toDataURL("image/jpeg", q); while (u.length > 650000 && q > .35) { q -= .1; u = c.toDataURL("image/jpeg", q); } ok(u); }; im.src = fr.result; }; fr.readAsDataURL(file); }); }
  adlBox.addEventListener("change", async e => {
    if (e.target.name === "adlOp") { ADL.si = e.target.value === "si"; return pintarAdl(); }
    if (e.target.id === "adlFile") { const f = e.target.files[0]; if (!f) return;
      try { ADL.img = await comprimir(f); } catch (er) { return toast("No se pudo abrir esa imagen"); }
      ADL.ocr = null; ADL.leyendo = true; pintarAdl();
      try { ADL.ocr = await leerCaptura(ADL.img); } catch (er) { console.warn("Lectura de captura:", er.message); ADL.ocr = null; }
      ADL.leyendo = false; const opIn = $("#adlOp"), keep = opIn ? opIn.value : ""; pintarAdl(); if (ADL.ocr && ADL.ocr.op && !keep) $("#adlOp").value = ADL.ocr.op; }
  });
  adlBox.addEventListener("input", e => { if (e.target.id === "adlMonto") { revisarOCR(); updateSum(); } });
  adlBox.addEventListener("click", e => { const t = e.target.closest("[data-met]"); if (t) { ADL.met = t.dataset.met; return pintarAdl(); }
    const bk = e.target.closest("[data-banco]"); if (bk) { ADL.banco = bk.dataset.banco; const c = cuentaSel(); if (!c) return;
      const n = String(c.num || c.cci || "").replace(/\D/g, ""); navigator.clipboard?.writeText(n).catch(() => {});
      if (c.url) window.open(c.url, "_blank", "noopener");
      toast(`Número de cuenta ${c.banco} copiado${c.url ? " · abriendo " + c.banco : ""}`); return pintarAdl(); }
    const c = e.target.closest("[data-copynum]"); if (c) { navigator.clipboard?.writeText(c.dataset.copynum).then(() => toast("Número copiado"), () => {}); } });
  book.addEventListener("change", e => { if (e.target.name === "servicio" || e.target.name === "modalidad" || e.target.id === "usarPaq") setTimeout(pintarAdl, 0); });

  /* ---- Paquete de sesiones (pagado por adelantado) ---- */
  const PAQ = { p: null, disp: 0, usar: false };
  const paqBox = document.createElement("div"); paqBox.id = "paqBox"; $("#petPick").after(paqBox);
  const hoyIso = isoD(new Date());
  function paqueteDe(m) {
    PAQ.p = null; PAQ.disp = 0; PAQ.usar = false; paqBox.innerHTML = ""; if (!m) return updateSum();
    const lista = (m.paquetes || []).map(p => ({ ...p, ses: +p.ses || 0, usadas: +p.usadas || 0 }));
    const vig = lista.find(p => p.usadas < p.ses && (!p.vence || String(p.vence).slice(0, 10) >= hoyIso));
    if (!vig) {
      const ult = lista[lista.length - 1];
      if (ult) paqBox.innerHTML = `<div class="paq-msg off">${ICO.paw}<div><b>Tu paquete «${esc(ult.t)}» ${ult.usadas >= ult.ses ? "ya no tiene sesiones" : "venció"}</b><small>Puedes reservar pagando la sesión, o renovarlo con descuento.</small></div><button type="button" class="btn btn-light btn-sm" data-renovar>Renovar por WhatsApp</button></div>`;
      return updateSum();
    }
    const reservadas = (cliente.agenda || []).filter(a => a.mascotaId === m.id && a.paqueteId === vig.id && (a.estado || "confirmada") === "confirmada" && String(a.fecha).slice(0, 10) >= hoyIso).length;
    PAQ.p = vig; PAQ.disp = Math.max(vig.ses - vig.usadas - reservadas, 0);
    const quedan = vig.ses - vig.usadas;
    if (!PAQ.disp) {
      paqBox.innerHTML = `<div class="paq-msg off">${ICO.paw}<div><b>Ya reservaste todas las sesiones de tu paquete</b><small>Te quedan ${quedan} sin usar y tienes ${reservadas} cita(s) reservada(s) con ellas. Para otra cita, paga la sesión o renueva tu paquete.</small></div><button type="button" class="btn btn-light btn-sm" data-renovar>Renovar por WhatsApp</button></div>`;
      return updateSum();
    }
    paqBox.innerHTML = `<label class="paq-msg on"><input type="checkbox" id="usarPaq" checked><div><b>Usar mi paquete · te ${PAQ.disp === 1 ? "queda 1 sesión disponible" : `quedan ${PAQ.disp} sesiones disponibles`}</b>
      <small>${esc(vig.t)}${reservadas ? ` · ya tienes ${reservadas} reservada(s)` : ""}${vig.vence ? ` · vence el ${nice(String(vig.vence).slice(0, 10))}` : ""}. Esta cita no se paga: ya está pagada.</small></div><span class="paq-cero">S/ 0</span></label><p class="paq-warn" id="paqWarn"></p>`;
    PAQ.usar = true; ajustarPaq(true);
  }
  const _ajustarPaq0 = () => setTimeout(() => typeof pintarAdl === "function" && pintarAdl(), 0);
  // el paquete es para un servicio: si eligen otro, se cobra normal
  function ajustarPaq(elegir) {
    const chk = $("#usarPaq"); if (!PAQ.p || !chk) return updateSum();
    const s = $("input[name=servicio]:checked", book), quiere = chk.checked;
    if (quiere && PAQ.p.servicio && elegir) { const r = $$("input[name=servicio]", book).find(x => x.dataset.key === PAQ.p.servicio); if (r && r !== s) { r.checked = true; llenarPros(); revisarModalidad(); drawSlots(); } }
    const s2 = $("input[name=servicio]:checked", book), vale = !PAQ.p.servicio ? (s2 && s2.dataset.area !== "psiquiatria") : (s2 && s2.dataset.key === PAQ.p.servicio);
    PAQ.usar = quiere && vale; _ajustarPaq0();
    const w = $("#paqWarn"); if (w) w.textContent = quiere && !vale ? "Tu paquete no incluye este servicio: esta cita se paga aparte." : "";
    chk.closest(".paq-msg").classList.toggle("dim", !PAQ.usar);
    updateSum();
  }
  paqBox.addEventListener("change", e => { if (e.target.id === "usarPaq") ajustarPaq(true); });
  paqBox.addEventListener("click", e => { if (e.target.closest("[data-renovar]")) { const m = cliente && cliente.mascotas.find(x => x.id === $("[name=mascotaId]", book).value);
    wa(`Hola ${NOMBRE}, quiero renovar mi paquete de sesiones${m ? " (paciente " + m.nombre + ")" : ""}. Mi código es ${cliente ? cliente.code : ""}.`); } });
  book.addEventListener("change", e => { if (e.target.name === "servicio") ajustarPaq(false); });

  /* ---- ¿Ya es paciente? busca a su familia con el código ---- */
  const codeIn = $("[name=codigo]", book), msgC = $("#codeMsg"), pick = $("#petPick");
  const normCode = c => { c = String(c || "").toUpperCase().replace(/[^A-Z0-9]/g, ""); return /^[A-Z]{2}[A-Z0-9]+$/.test(c) ? c.slice(0, 2) + "-" + c.slice(2) : c; };
  async function verCodigo() {
    const c = normCode(codeIn.value); cliente = null; pick.innerHTML = ""; $("[name=mascotaId]", book).value = ""; paqueteDe(null);
    if (!c) { msgC.textContent = ""; return; }
    msgC.className = "code-msg"; msgC.textContent = "Buscando…";
    try { cliente = await buscarCliente(c); } catch (e) { cliente = null; }
    if (!cliente) { msgC.className = "code-msg err"; msgC.textContent = "No encontramos ese código. Puedes reservar igual como paciente nuevo."; return; }
    cliente.code = c; codeIn.value = c;
    msgC.className = "code-msg ok"; msgC.textContent = `¡Hola, ${cliente.dueno.split(" ")[0]}! ¿Para quién es la cita?`;
    const pr0 = cliente.mascotas.length === 1 && cliente.mascotas[0].profesional;
    const nom = $("[name=nombre]", book); if (!nom.value) nom.value = cliente.dueno;
    pick.innerHTML = cliente.mascotas.map(m => `<button type="button" class="pp" data-pid="${esc(m.id)}">${m.foto ? `<img src="${esc(foto(m.foto, 120))}" alt="">` : ICO.paw}${esc(m.nombre)}</button>`).join("") + `<button type="button" class="pp" data-pid="">+ Otra persona</button>`;
    if (cliente.mascotas.length === 1) pick.querySelector(".pp").click();
  }
  $("#codeBtn").addEventListener("click", verCodigo);
  codeIn.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); verCodigo(); } });
  codeIn.addEventListener("change", verCodigo);
  const edadDe = nac => { if (!nac) return ""; const d = new Date(String(nac).slice(0, 10) + "T12:00"); return Math.max(0, Math.floor((Date.now() - d) / (365.25 * 864e5))); };
  pick.addEventListener("click", e => {
    const b = e.target.closest(".pp"); if (!b) return;
    $$(".pp", pick).forEach(x => x.classList.remove("on")); b.classList.add("on");
    const m = cliente.mascotas.find(x => x.id === b.dataset.pid);
    $("[name=mascotaId]", book).value = m ? m.id : "";
    $("[name=mascota]", book).value = m ? m.nombre : "";
    $("[name=edad]", book).value = m ? edadDe(m.nac) : "";
    if (m && m.profesional && pref) { const o = [...pref.options].find(x => x.value === m.profesional); if (o) { pref.value = m.profesional; drawSlots(); } }
    if (!m) $("[name=mascota]", book).focus();
    paqueteDe(m);
  });

  const ps = new URLSearchParams(location.search);
  if (ps.get("servicio")) { const r = $$("input[name=servicio]", book).find(x => x.dataset.key === ps.get("servicio")); if (r) r.checked = true; }
  if (ps.get("pro")) { const d = DOCTORES_W.find(x => x.id === ps.get("pro"));
    if (d) { const r = $$("input[name=servicio]", book).find(x => x.dataset.area === (d.area || "psicologia")); const cur = $("input[name=servicio]:checked", book);
      if (r && (!cur || cur.dataset.area !== (d.area || "psicologia"))) r.checked = true; llenarPros(); pref.value = d.n; } }
  if (ps.get("modalidad") === "Online") { const r = $$("input[name=servicio]", book).find(x => x.dataset.online !== "0"); const cur = $("input[name=servicio]:checked", book); if (cur && cur.dataset.online === "0" && r) r.checked = true; $("input[name=modalidad][value=Online]", book).checked = true; }
  llenarPros(); revisarModalidad();
  if (ps.get("codigo")) { codeIn.value = ps.get("codigo"); verCodigo(); }
  drawSlots(); pintarAdl();

  book.addEventListener("submit", async e => {
    e.preventDefault();
    const msg = $(".f-msg", book), btn = $("#bookBtn");
    $$(".error", book).forEach(x => x.classList.remove("error"));
    const bad = $$("[required]", book).filter(x => !x.checkValidity());
    const tel = $("[name=celular]", book); if (tel.value.replace(/\D/g, "").length < 9) bad.push(tel);
    if (!slot) bad.push(slotsBox);
    if (bad.length) {
      bad.forEach(x => x.classList.add("error"));
      msg.className = "f-msg err";
      msg.textContent = !slot && bad.length === 1 ? "Elige un horario disponible." : "Completa los campos obligatorios (*) y elige un horario.";
      (bad[0].focus ? bad[0] : slotsBox).focus?.(); return;
    }
    const v = n => ($(`[name="${n}"]`, book)?.value || "").trim();
    const s = $("input[name=servicio]:checked", book);
    let pago = null;
    if (ADL.si && !PAQ.usar && $("#adlMonto")) {
      const monto = Math.round((+$("#adlMonto").value || 0) * 100) / 100, min = minAdl(), p = precioSel();
      const err = t => { msg.className = "f-msg err"; msg.textContent = t; adlBox.scrollIntoView({ behavior: "smooth", block: "center" }); };
      if (!(monto >= min) || monto > p) return err(`El adelanto debe ser entre ${precio(min)} y ${precio(p)}.`);
      if (ADL.met === "Transferencia" && !cuentaSel()) return err("Elige el banco al que transferiste.");
      if (!ADL.img) return err("Sube la captura de tu pago para dejar el adelanto (o elige «Pagar en el consultorio»).");
      if (ADL.leyendo) return err("Espera un momento: estamos leyendo tu captura.");
      if (ADL.ocr && ADL.ocr.montos.length && !ADL.ocr.coincide && !($("#adlForzar") || {}).checked) return err("El monto no coincide con tu captura. Corrígelo o marca que tu captura es correcta.");
      pago = { monto, metodo: ADL.met, banco: ADL.met === "Transferencia" ? cuentaSel().banco : "", operacion: ($("#adlOp").value || "").replace(/\D/g, "").slice(0, 14), captura: ADL.img,
        montoLeido: ADL.ocr && ADL.ocr.montos.length ? ADL.ocr.montos[0] : null, montosLeidos: ADL.ocr ? ADL.ocr.montos.slice(0, 5) : [], coincide: ADL.ocr ? !!ADL.ocr.coincide : null, fechaOk: ADL.ocr ? ADL.ocr.fechaOk : null,
        estado: "por-validar", creado: new Date().toISOString() };
    }
    const cita = {
      fecha: dateIn.value, hora: slot, servicioId: s.dataset.key, servicio: s.value, precio: +s.dataset.p || 0, modalidad: ($("input[name=modalidad]:checked", book) || {}).value || "Presencial", area: s.dataset.area || "psicologia",
      code: cliente ? cliente.code : "", mascotaId: cliente ? v("mascotaId") : "", mascota: v("mascota").slice(0, 60),
      edad: v("edad").slice(0, 3), preferencia: v("preferencia").slice(0, 60),
      dueno: v("nombre").slice(0, 80), celular: v("celular").replace(/[^\d+ ]/g, "").slice(0, 15), motivo: v("motivo").slice(0, 300),
      origen: "web", estado: "confirmada", pagado: 0, estadoPago: "pendiente", creado: new Date().toISOString(),
    };
    if (PAQ.usar && PAQ.p && cita.code && cita.mascotaId) { cita.precio = 0; cita.paqueteId = PAQ.p.id; }
    if (pago) { cita.adelantoPend = pago.monto; cita.adelantoMetodo = pago.metodo + (pago.banco ? " " + pago.banco : ""); cita.adelantoEstado = "por-validar";
      Object.assign(pago, { code: cita.code, mascota: cita.mascota, dueno: cita.dueno, celular: cita.celular, servicio: cita.servicio, fecha: cita.fecha, hora: cita.hora, precio: cita.precio }); }
    btn.disabled = true; msg.className = "f-msg"; msg.textContent = "Reservando…";
    let id = null;
    try { id = await reservar(cita, pago); } catch (err) { console.error(err); }
    btn.disabled = false;
    if (!id) { msg.className = "f-msg err"; msg.textContent = "Ese horario se acaba de llenar o no pudimos conectar. Elige otro horario."; drawSlots(); return; }
    const txt = ["Hola, acabo de reservar una cita en la web:", "",
      `• Servicio: ${cita.servicio}${cita.precio ? " (" + precio(cita.precio) + ")" : ""}`, `• Modalidad: ${cita.modalidad}`, `• Fecha: ${nice(cita.fecha)}`, `• Hora: ${cita.hora}`,
      `• Paciente: ${cita.mascota}${cita.edad ? " (" + cita.edad + " años)" : ""}`, `• Contacto: ${cita.dueno}`, `• Celular: ${cita.celular}`];
    if (cita.preferencia) txt.push(`• Profesional de preferencia: ${cita.preferencia}`);
    if (cita.code) txt.push(`• Código de paciente: ${cita.code}`);
    if (cita.paqueteId) txt.push(`• Uso mi paquete: ${PAQ.p.t} (me quedarán ${PAQ.disp - 1} disponibles)`);
    if (pago) txt.push(`• Adelanto: ${precio(pago.monto)} por ${pago.metodo}${pago.banco ? " " + pago.banco : ""}${pago.operacion ? " (operación " + pago.operacion + ")" : ""} · subí la captura en la web`);

    book.hidden = true;
    const ok = $("#bookOk"); ok.hidden = false;
    ok.innerHTML = `<div class="ok-ic">${ICO.check}</div><h3>¡Cita confirmada!</h3><p>Te esperamos, ${esc(cita.dueno.split(" ")[0])}. Guarda estos datos:</p>
      <div class="ok-box"><div><span>Servicio</span><b>${esc(cita.servicio)}</b></div><div><span>Modalidad</span><b>${esc(cita.modalidad)}</b></div><div><span>Fecha</span><b>${esc(nice(cita.fecha))}</b></div>
      <div><span>Hora</span><b>${esc(cita.hora)} h</b></div><div><span>Paciente</span><b>${esc(cita.mascota)}</b></div>
      <div><span>Precio</span><b>${cita.paqueteId ? "S/ 0 · incluida en tu paquete" : cita.precio ? precio(cita.precio) : "A consultar"}</b></div>
      ${pago ? `<div class="full adl-okbox"><span>Adelanto</span><b>${precio(pago.monto)} por ${esc(pago.metodo)}${pago.banco ? " " + esc(pago.banco) : ""} · en validación</b><small>Recepción revisará tu captura y te confirmará por WhatsApp. Saldo a pagar: ${precio(Math.max(cita.precio - pago.monto, 0))}.</small></div>` : ""}
      <div class="full"><span>${cita.modalidad === "Online" ? "¿Cómo me conecto?" : "Te esperamos en"}</span><b>${cita.modalidad === "Online" ? "Te enviaremos el enlace de la videollamada por WhatsApp" + (cita.code ? " y aparecerá en Mi Espacio" : "") : esc(AJ.direccion)}</b></div></div>
      <p class="sub-ok">${cita.modalidad === "Online" ? "Busca un lugar privado y tranquilo, con buena conexión." : "Llega 10 minutos antes."} ${cita.code ? "También la verás en <b>Mi Espacio</b> con tu código." : "En tu primera sesión te daremos tu código para entrar a Mi Espacio."}</p>
      <div class="hero-actions"><button class="btn btn-pri" id="okWa">${ICO.check} Avisar por WhatsApp</button>${cita.code ? `<a class="btn btn-light" href="mi-espacio?codigo=${esc(cita.code)}">Ver en Mi Espacio</a>` : ""}<a class="btn btn-light" href="citas">Reservar otra</a></div>`;
    $("#okWa").addEventListener("click", () => wa(txt.join("\n")));
    ok.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

/* =========================================================
   PORTAL MI ESPACIO
   (Demo: los datos de ejemplo están aquí. En la versión real se
    leen de Firebase con el código del paciente.)
   Importante: aquí NUNCA se muestran notas de sesión. Las notas
   clínicas se guardan aparte y solo las ve el profesional.
   ========================================================= */
const day = n => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + n); return d; };
const isoN = n => isoD(day(n));
const MEET = "https://meet.google.com/abc-defg-hij";
const CLIENTES = {
  "MS-1024": { dueno: "Lucía Fernández", mascotas: [
    { id: "lucia", nombre: "Lucía Fernández", sexo: "Femenino", nac: isoN(-31 * 365), dni: "47851236", alergias: "Ninguna",
      profesional: "Ps. Camila Ortega", psiquiatra: "Dra. Valeria Montes", modalidad: "Online",
      citas: [{ servicio: "Terapia individual · sesión 6", fecha: isoN(1), hora: "19:00", vet: "Ps. Camila Ortega", modalidad: "Online", enlace: MEET, total: 0, pagado: 0, paquete: true },
              { servicio: "Control psiquiátrico", fecha: isoN(16), hora: "17:00", vet: "Dra. Valeria Montes", modalidad: "Presencial", total: 120, pagado: 0 }],
      paquetes: [{ id: "pq1", t: "Paquete de 8 sesiones · Terapia individual", ses: 8, usadas: 5, precio: 760, pagado: 760, desde: isoN(-36), vence: isoN(84), servicio: "terapia-individual" }],
      tareas: [{ id: "t1", t: "Registro de pensamientos", d: "Anota 3 situaciones de la semana: qué pasó, qué pensaste y qué sentiste (0 a 10).", f: isoN(-5) },
               { id: "t2", t: "Respiración diafragmática", d: "5 minutos, 2 veces al día. Usa el audio que te enviamos por WhatsApp.", f: isoN(-5) },
               { id: "t3", t: "Caminar 20 minutos", d: "3 veces por semana, de preferencia de día.", f: isoN(-12) }],
      retos: [{ id: "r1", t: "Respiración 4-7-8 al despertar", d: "4 ciclos, sentada en la cama", ej: "respiracion478", activo: true, desde: isoN(-20) },
               { id: "r2", t: "Escribe 3 cosas buenas del día", ej: "gratitud", activo: true, desde: isoN(-20) },
               { id: "r3", t: "Caminar 20 minutos", d: "De preferencia con luz de día", activo: true, desde: isoN(-20) }],
      escalas: [{ id: "gad7", n: "Ansiedad (GAD-7)", max: 21, v: [{ f: isoN(-42), p: 16 }, { f: isoN(-28), p: 13 }, { f: isoN(-14), p: 10 }, { f: isoN(-5), p: 7 }] },
                { id: "phq9", n: "Estado de ánimo (PHQ-9)", max: 27, v: [{ f: isoN(-42), p: 12 }, { f: isoN(-28), p: 10 }, { f: isoN(-14), p: 8 }, { f: isoN(-5), p: 6 }] }],
      historial: [
        { id: "h1", f: isoN(-5), hora: "19:00", t: "Terapia individual · sesión 5", vet: "Ps. Camila Ortega", modalidad: "Online", paquete: true, monto: 0, pagado: 0 },
        { id: "h2", f: isoN(-12), hora: "19:00", t: "Terapia individual · sesión 4", vet: "Ps. Camila Ortega", modalidad: "Online", paquete: true, monto: 0, pagado: 0 },
        { id: "h3", f: isoN(-19), hora: "19:00", t: "Terapia individual · sesión 3", vet: "Ps. Camila Ortega", modalidad: "Presencial", paquete: true, monto: 0, pagado: 0 },
        { id: "h4", f: isoN(-36), hora: "18:30", t: "Paquete de 8 sesiones · Terapia individual", vet: "", modalidad: "", monto: 760, pagado: 760, pagos: [{ monto: 760, metodo: "Yape", fecha: isoN(-36) }], compra: true },
        { id: "h5", f: isoN(-42), hora: "17:00", t: "Consulta psiquiátrica", vet: "Dra. Valeria Montes", modalidad: "Presencial", monto: 180, pagado: 180, pagos: [{ monto: 180, metodo: "Tarjeta", fecha: isoN(-42) }],
          meds: [{ n: "Sertralina 50 mg", dosis: "½ tableta la primera semana, luego 1 tableta", cada: "24 h (en la mañana), hasta el próximo control", dias: "" }],
          ind: "Tomar después del desayuno. Puede haber náuseas leves los primeros días. No suspender sin consultar. Continuar con la terapia semanal.", control: isoN(16), controlMotivo: "Control psiquiátrico" },
        { id: "h6", f: isoN(-44), hora: "19:00", t: "Primera consulta de orientación", vet: "Ps. Camila Ortega", modalidad: "Online", monto: 60, pagado: 60, pagos: [{ monto: 60, metodo: "Plin", fecha: isoN(-44) }] }],
      rec: [{ i: "video", t: "Sesión online con Ps. Camila Ortega", f: isoN(1) }, { i: "pill", t: "Control psiquiátrico", f: isoN(16) }, { i: "box", t: "Renovar tu paquete (te quedan 3)", f: isoN(20) }] }] },
  "MS-2048": { dueno: "Carmen Ramos", mascotas: [
    { id: "joaquin", nombre: "Joaquín Ramos", sexo: "Masculino", nac: isoN(-10 * 365 - 90), dni: "", alergias: "Ninguna", menor: true,
      profesional: "Ps. Mariana Ríos", psiquiatra: "", modalidad: "Presencial",
      citas: [{ servicio: "Terapia infantil · sesión 3", fecha: isoN(4), hora: "16:00", vet: "Ps. Mariana Ríos", modalidad: "Presencial", total: 0, pagado: 0, paquete: true }],
      paquetes: [{ id: "pq2", t: "Paquete de 4 sesiones · Terapia infantil", ses: 4, usadas: 2, precio: 400, pagado: 200, desde: isoN(-14), vence: isoN(46), servicio: "terapia-infantil" }],
      tareas: [{ id: "t4", t: "Termómetro de emociones", d: "Antes de dormir, Joaquín marca cómo se sintió en el día (para los padres: acompañen sin corregir).", f: isoN(-3) },
               { id: "t5", t: "Rutina de la mañana con dibujos", d: "Usen la cartilla de la sesión para preparar el colegio sin apuro.", f: isoN(-3) }],
      escalas: [],
      historial: [
        { id: "h7", f: isoN(-3), hora: "16:00", t: "Terapia infantil · sesión 2", vet: "Ps. Mariana Ríos", modalidad: "Presencial", paquete: true, monto: 0, pagado: 0 },
        { id: "h8", f: isoN(-10), hora: "16:00", t: "Terapia infantil · sesión 1 (con los padres)", vet: "Ps. Mariana Ríos", modalidad: "Presencial", paquete: true, monto: 0, pagado: 0,
          ind: "Mantener horarios de sueño fijos. Elogiar el esfuerzo, no solo el resultado. Evitar pantallas una hora antes de dormir." },
        { id: "h9", f: isoN(-14), hora: "16:00", t: "Paquete de 4 sesiones · Terapia infantil", vet: "", modalidad: "", monto: 400, pagado: 200, pagos: [{ monto: 200, metodo: "Efectivo", fecha: isoN(-14) }], compra: true }],
      rec: [{ i: "kid", t: "Sesión de Joaquín", f: isoN(4) }, { i: "card", t: "Saldo del paquete: S/ 200", f: isoN(4) }] },
    { id: "carmen", nombre: "Carmen Ramos", sexo: "Femenino", nac: isoN(-41 * 365), dni: "41236587", alergias: "Ninguna",
      profesional: "Ps. Andrés Villanueva", psiquiatra: "", modalidad: "Online",
      citas: [{ servicio: "Orientación a padres", fecha: isoN(9), hora: "20:00", vet: "Ps. Andrés Villanueva", modalidad: "Online", enlace: MEET, total: 110, pagado: 0 }],
      paquetes: [], tareas: [], escalas: [],
      historial: [{ id: "h10", f: isoN(-7), hora: "20:00", t: "Orientación a padres", vet: "Ps. Andrés Villanueva", modalidad: "Online", monto: 110, pagado: 110, pagos: [{ monto: 110, metodo: "Transferencia", fecha: isoN(-7) }] }],
      rec: [{ i: "video", t: "Orientación a padres (online)", f: isoN(9) }] }] },
};
const portal = $("#portal");
if (portal) {
  const MES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  const DIA = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const toD = s => { if (!s) return null; if (s instanceof Date) return s; const [y, mo, d] = String(s).slice(0, 10).split("-").map(Number); return new Date(y, mo - 1, d); };
  const fmt = d => { d = toD(d); return d ? `${d.getDate()} ${MES[d.getMonth()]} ${d.getFullYear()}` : ""; };
  const diff = d => Math.round((toD(d) - day(0)) / 864e5);
  const edadTxt = nac => { if (!nac) return ""; const m = Math.floor((Date.now() - toD(nac)) / (30.44 * 864e5)); return m >= 24 ? `${Math.floor(m / 12)} años` : `${Math.max(m, 0)} meses`; };
  const enDias = n => n === 0 ? "Hoy" : n === 1 ? "Mañana" : n < 0 ? `Hace ${-n} días` : `En ${n} días`;
  const modIco = m => /online/i.test(m || "") ? icono("video") : icono("home");
  const pagoTxt = (total, pagado, paq) => {
    total = +total || 0; pagado = +pagado || 0;
    if (paq && !total) return `<span class="st">Incluida en tu paquete</span>`;
    if (total && pagado >= total) return `<span class="st ok">Pagado ${soles(pagado)}</span>`;
    if (pagado > 0) return `<span class="st warn">Adelanto ${soles(pagado)} · Saldo ${soles(Math.max(total - pagado, 0))}</span>`;
    return total ? `<span class="st bad">Pago pendiente · ${soles(total)}</span>` : `<span class="st">Sin costo</span>`;
  };
  const pagoCita = c => c.adelantoEstado === "por-validar" ? `<span class="st warn">Adelanto ${soles(c.adelantoPend)} en revisión</span>`
    : c.adelantoEstado === "rechazado" ? `<span class="st bad">Adelanto no validado · escríbenos</span>` : pagoTxt(c.total, c.pagado, c.paquete);
  let cli = null, code = "", idx = 0, timer = null;

  function normal(c, pacs, agenda) {   // formato del panel → formato de esta página
    const hoy = day(0);
    return { dueno: c.dueno || "", mascotas: pacs.map(m => {
      let citas = (m.citas || []).slice();
      if (agenda) citas = agenda.filter(a => a.mascotaId === m.id && (a.estado || "confirmada") === "confirmada");
      citas = citas.map(a => ({ ...a, paquete: a.paquete || !!a.paqueteId, fecha: toD(a.fecha) })).filter(a => a.fecha >= hoy).sort((a, b) => (a.fecha - b.fecha) || String(a.hora).localeCompare(b.hora));
      const hist = (m.historial || []).slice();
      (agenda || []).filter(a => a.mascotaId === m.id && a.estado === "atendida" && !hist.some(h => h.citaId === a.id))
        .forEach(a => hist.push({ f: a.fecha, hora: a.hora, t: a.servicio, vet: a.vet || "", modalidad: a.modalidad || "", monto: +a.total || 0, pagado: +a.pagado || 0, citaId: a.id, pagos: a.pagos || [], paquete: !!a.paqueteId }));
      return { ...m, citas, paquetes: m.paquetes || [], tareas: m.tareas || [], escalas: m.escalas || [], retos: m.retos || [],
        historial: hist.map(h => ({ ...h, f: toD(h.f) })).sort((a, b) => b.f - a.f || String(b.hora || "").localeCompare(a.hora || "")),
        rec: (m.rec || []).map(r => ({ ...r, f: toD(r.f) })).filter(r => diff(r.f) >= -7).sort((a, b) => a.f - b.f) };
    }) };
  }
  async function buscar(c) {
    if (EN_VIVO) {
      const { fs, db } = await fb();
      const s = await fs.getDoc(fs.doc(db, "clientes", c)); if (!s.exists()) return null;
      const [ms, ag] = await Promise.all([fs.getDocs(fs.collection(db, "clientes", c, "mascotas")), fs.getDocs(fs.collection(db, "clientes", c, "agenda"))]);
      return normal(s.data(), ms.docs.map(d => ({ id: d.id, ...d.data() })), ag.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    const local = localDB();
    if (local && local.clientes && local.clientes[c]) {
      const x = local.clientes[c];
      const ag = Object.entries(local.citas || {}).filter(([, a]) => a.code === c).map(([id, a]) => ({ id, ...a, total: a.total ?? a.precio, pagado: a.pagado || 0 }));
      return normal(x, Object.entries(x.mascotas || {}).map(([id, m]) => ({ id, ...m })), ag);
    }
    const demo = CLIENTES[c]; return demo ? normal(demo, demo.mascotas, null) : null;
  }
  async function login(c) {
    c = c.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (/^[A-Z]{2}[A-Z0-9]+$/.test(c)) c = c.slice(0, 2) + "-" + c.slice(2);
    const err = $("#loginErr"), btn = $("#codeForm button");
    err.textContent = ""; btn.disabled = true;
    let r = null;
    try { r = await buscar(c); } catch (e) { console.error(e); err.textContent = "No pudimos conectar. Revisa tu internet e intenta otra vez."; btn.disabled = false; return; }
    btn.disabled = false;
    if (!r) { err.textContent = "Código no encontrado. Revisa tu código o escríbenos por WhatsApp."; $("#codeIn").classList.add("error"); try { sessionStorage.removeItem("ms_code"); } catch (e) {} return; }
    if (!r.mascotas.length) { err.textContent = "Tu código aún no tiene pacientes registrados. Consulta en recepción."; return; }
    cli = r; code = c; idx = 0;
    try { sessionStorage.setItem("ms_code", c); } catch (e) {}
    $("#login").style.display = "none"; $("#dash").classList.add("show");
    render(); window.scrollTo({ top: portal.offsetTop - 90, behavior: "smooth" });
  }
  function logout() { try { sessionStorage.removeItem("ms_code"); } catch (e) {} clearInterval(timer); window.dispatchEvent(new Event("me-logout")); $("#dash").classList.remove("show"); $("#login").style.display = ""; $("#codeIn").value = ""; }

  /* ---------- Paquetes ---------- */
  function paquetesHTML(m) {
    return m.paquetes.map(p => {
      const ses = +p.ses || 0, us = Math.min(+p.usadas || 0, ses), quedan = Math.max(ses - us, 0), pct = ses ? Math.round(us / ses * 100) : 0;
      const saldo = Math.max((+p.precio || 0) - (+p.pagado || 0), 0), dv = p.vence ? diff(p.vence) : null;
      const res = m.citas.filter(c => c.paqueteId ? c.paqueteId === p.id : c.paquete).length;
      return `<div class="fin paq"><div class="fin-h"><b>${esc(p.t)}</b><span>${soles(p.precio)}</span></div>
        <div class="paq-dots">${Array.from({ length: ses }, (_, i) => `<i class="${i < us ? "on" : ""}" title="Sesión ${i + 1}"></i>`).join("")}</div>
        <div class="fin-g"><div><small>Usadas</small><b>${us} de ${ses}</b></div><div><small>Te quedan</small><b class="${quedan <= 1 ? "c-red" : ""}">${quedan}</b>${res && quedan ? `<em class="paq-res">${res} ya reservada${res > 1 ? "s" : ""}</em>` : ""}</div><div><small>${saldo ? "Saldo" : "Pago"}</small><b class="${saldo ? "c-red" : ""}">${saldo ? soles(saldo) : "Completo"}</b></div></div>
        ${quedan === 0 ? `<div class="fin-next late"><span>Usaste todas tus sesiones. <a href="#" data-act="renovar" data-paq="${esc(p.t)}">Renovar paquete</a></span></div>`
          : dv != null ? `<div class="fin-next ${dv < 0 ? "late" : dv <= 14 ? "soon" : ""}"><span>${dv < 0 ? `Venció el ${fmt(p.vence)}` : `Vence el ${fmt(p.vence)} (${enDias(dv).toLowerCase()})`}${quedan <= 2 ? ` · <a href="#" data-act="renovar" data-paq="${esc(p.t)}">Renovar</a>` : ""}</span></div>` : ""}</div>`;
    }).join("");
  }
  /* ---------- Tareas (lo marcado se guarda en este celular) ---------- */
  const TKEY = () => "ms_tareas_" + code;
  function tareasHTML(m) {
    const hechas = store.get(TKEY(), {});
    return `<div class="tasks">${m.tareas.map(t => { const k = m.id + ":" + (t.id || t.t); return `<label class="task ${hechas[k] ? "done" : ""}"><input type="checkbox" data-task="${esc(k)}" ${hechas[k] ? "checked" : ""}><span><b>${esc(t.t)}</b>${t.d ? `<small>${esc(t.d)}</small>` : ""}${t.f ? `<em>Desde el ${fmt(t.f)}</em>` : ""}</span></label>`; }).join("")}</div>
      <p class="tasks-note">Marca lo que vas completando (se guarda en este celular) y coméntalo en tu próxima sesión.</p>`;
  }
  /* ---------- Mi avance (cuestionarios: menos puntos = mejor) ---------- */
  const NIVEL = (id, p, max) => { const r = p / max; return r < .2 ? ["ok", "Mínimo"] : r < .45 ? ["ok", "Leve"] : r < .7 ? ["warn", "Moderado"] : ["bad", "Alto"]; };
  function avanceHTML(m) {
    return m.escalas.filter(e => (e.v || []).length).map(e => {
      const v = e.v.slice().sort((a, b) => toD(a.f) - toD(b.f)), max = +e.max || Math.max(...v.map(x => +x.p), 1), W = 300, H = 90, pad = 10;
      const X = i => v.length < 2 ? W / 2 : pad + i * (W - 2 * pad) / (v.length - 1), Y = p => pad + (1 - (+p / max)) * (H - 2 * pad);
      const pts = v.map((x, i) => `${X(i).toFixed(1)},${Y(x.p).toFixed(1)}`).join(" "), ult = v[v.length - 1], pri = v[0], dif = (+ult.p) - (+pri.p), [cl, nv] = NIVEL(e.id, +ult.p, max);
      return `<div class="esc"><div class="esc-h"><b>${esc(e.n)}</b><span class="st ${cl}">${nv} · ${ult.p}/${max}</span></div>
        <svg class="esc-g" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(e.n)}: de ${pri.p} a ${ult.p} puntos"><polyline points="${pts}" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>${v.map((x, i) => `<circle cx="${X(i).toFixed(1)}" cy="${Y(x.p).toFixed(1)}" r="4.5"><title>${fmt(x.f)}: ${x.p} puntos</title></circle>`).join("")}</svg>
        <div class="esc-x">${v.map(x => `<span>${fmt(x.f).replace(/ \d{4}$/, "")}</span>`).join("")}</div>
        <p class="esc-t">${dif < 0 ? `<b class="c-ok">Bajaste ${-dif} puntos</b> desde tu primera medición. ¡Vas muy bien!` : dif > 0 ? `Subió ${dif} puntos: conversa sobre esto en tu próxima sesión.` : "Sin cambios desde la primera medición."}</p></div>`;
    }).join("") + `<p class="tasks-note">Son cuestionarios que completas con tu profesional. Menos puntos significa menos malestar. No reemplazan la evaluación en sesión.</p>`;
  }

  function render() {
    const m = cli.mascotas[idx];
    $("#dHello").textContent = `Hola, ${(cli.dueno || "").split(" ")[0]}`;
    $("#dCode").textContent = code;
    $("#petTabs").innerHTML = cli.mascotas.length > 1 ? cli.mascotas.map((p, i) => `<button class="pet-tab ${i === idx ? "on" : ""}" data-i="${i}"><span class="av">${p.foto ? `<img src="${esc(foto(p.foto, 200))}" alt="" onerror="this.remove()">` : esc(iniciales(p.nombre))}</span>${esc(p.nombre.split(" ")[0])}</button>`).join("") : "";
    $("#petCard").innerHTML = `
      <div class="pac-h"><span class="pac-av">${m.foto ? `<img src="${esc(foto(m.foto, 300))}" alt="" onerror="this.remove()">` : esc(iniciales(m.nombre))}</span><div><h2>${esc(m.nombre)}</h2><span>${esc([edadTxt(m.nac), m.sexo].filter(Boolean).join(" · "))}</span></div></div>
      <div class="facts">
        <div class="full"><small>Mi terapeuta</small><b>${esc(m.profesional || "Por asignar")}</b></div>
        ${m.psiquiatra ? `<div class="full"><small>Mi psiquiatra</small><b>${esc(m.psiquiatra)}</b></div>` : ""}
        <div><small>Modalidad</small><b>${esc(m.modalidad || "Presencial")}</b></div><div><small>DNI</small><b>${esc(m.dni || "—")}</b></div>
      </div>
      ${m.alergias && !/^ningun/i.test(m.alergias) ? `<div class="alert-box">${icono("shield")}<span><b>Alergia:</b> ${esc(m.alergias)}</span></div>` : ""}
      <p class="portal-lock">${icono("lock")} Tus notas de sesión son confidenciales y no se muestran aquí.</p>`;
    $("#paqCard").style.display = m.paquetes.length ? "" : "none"; $("#paquetes").innerHTML = paquetesHTML(m);
    $("#tareasCard").style.display = m.tareas.length ? "" : "none"; $("#tareas").innerHTML = m.tareas.length ? tareasHTML(m) : "";
    $("#avanceCard").style.display = m.escalas.some(e => (e.v || []).length) ? "" : "none"; $("#avance").innerHTML = avanceHTML(m);
    clearInterval(timer);
    const pr = m.citas[0];
    if (pr) {
      const d = pr.fecha, online = /online/i.test(pr.modalidad || "");
      $("#nextBox").innerHTML = `
        <div><small>PRÓXIMA SESIÓN · ${enDias(diff(d)).toUpperCase()}</small><h3>${esc(pr.servicio)}</h3>
          <p>${DIA[d.getDay()]} ${fmt(d)} · <b>${esc(pr.hora)} h</b><br>${pr.vet ? "Con: <b>" + esc(pr.vet) + "</b>" : "Profesional por confirmar"} · ${modIco(pr.modalidad)} ${esc(pr.modalidad || "Presencial")}</p>
          ${+pr.total || +pr.pagado || pr.paquete || pr.adelantoEstado ? `<div class="pay-line">${pagoCita(pr)}</div>` : ""}</div>
        <div class="countdown" id="cd"></div>
        <div class="next-actions">
          ${online ? (pr.enlace ? `<a class="btn btn-white" href="${esc(pr.enlace)}" target="_blank" rel="noopener">${icono("video")} Entrar a la videollamada</a>` : `<span class="join-wait">${icono("video")} El enlace aparecerá aquí antes de tu sesión</span>`) : ""}
          <button class="btn ${online ? "btn-glass" : "btn-white"}" data-act="confirmar">Confirmar asistencia</button>
          <button class="btn btn-glass" data-act="reprogramar">Reprogramar</button>
          <a class="btn btn-glass" href="citas?codigo=${encodeURIComponent(code)}">Agendar otra</a>
        </div>`;
      const [hh, mm] = String(pr.hora || "00:00").split(":"); const target = new Date(d); target.setHours(+hh, +mm);
      const tick = () => { let s = Math.max(0, Math.floor((target - Date.now()) / 1000)); const D = Math.floor(s / 86400); s %= 86400; const H = Math.floor(s / 3600); s %= 3600; const M = Math.floor(s / 60);
        $("#cd").innerHTML = `<div><b>${D}</b><span>días</span></div><div><b>${H}</b><span>horas</span></div><div><b>${M}</b><span>min</span></div>`; };
      tick(); timer = setInterval(tick, 30000);
    } else {
      $("#nextBox").innerHTML = `<div><small>PRÓXIMA SESIÓN</small><h3>${esc(m.nombre.split(" ")[0])} no tiene sesiones programadas</h3><p>Agenda tu próxima sesión en menos de un minuto.</p></div>
        <div class="next-actions"><a class="btn btn-white" href="citas?codigo=${encodeURIComponent(code)}">Agendar sesión</a></div>`;
    }
    $("#citasCard").style.display = m.citas.length > 1 ? "" : "none";
    $("#citasList").innerHTML = m.citas.map(c => `<div class="vac"><div><b>${esc(c.servicio)}</b><small>${DIA[c.fecha.getDay()]} ${fmt(c.fecha)} · ${esc(c.hora)} h · ${esc(c.modalidad || "Presencial")}${c.vet ? " · " + esc(c.vet) : ""}</small></div>${pagoCita(c)}</div>`).join("");
    // Pagos y recibos
    const pag = m.historial.filter(h => +h.monto > 0 || +h.pagado > 0);
    const totalPag = pag.reduce((a, h) => a + (+h.pagado || 0), 0), saldo = pag.reduce((a, h) => a + Math.max((+h.monto || 0) - (+h.pagado || 0), 0), 0);
    $("#pagos").innerHTML = pag.length ? `
      <div class="pay-sum"><div><small>Total pagado</small><b>${soles(totalPag)}</b></div>${saldo ? `<div class="due"><small>Saldo por pagar</small><b>${soles(saldo)}</b></div>` : `<div><small>Saldo</small><b>S/ 0.00</b></div>`}</div>
      <div class="pay-list">${pag.map(h => `<div class="pay-row"><div><b>${esc(h.t)}</b><small>${fmt(h.f)}${h.vet ? " · " + esc(h.vet) : ""}</small>
          <button type="button" class="doc-btn" data-doc="rc" data-hi="${m.historial.indexOf(h)}">${icono("file")} Descargar recibo (PDF)</button></div>
        <div class="amt"><b>${soles(+h.monto || +h.pagado)}</b>${pagoTxt(h.monto || h.pagado, h.pagado)}</div></div>`).join("")}</div>`
      : `<p style="color:var(--muted)">Aún no hay pagos registrados.</p>`;
    // Historial de sesiones (sin notas clínicas)
    $("#timeline").innerHTML = m.citas.map(c => `<li class="upcoming"><span class="t-date">${fmt(c.fecha)} · ${esc(c.hora)} h · Programada</span><b>${esc(c.servicio)}</b><span class="vet">${esc([c.vet, c.modalidad].filter(Boolean).join(" · "))}</span></li>`).join("") +
      m.historial.filter(h => !h.compra).map(h => { const i = m.historial.indexOf(h), rx = (h.meds || []).some(x => x.n);
        return `<li><span class="t-date">${fmt(h.f)}${h.hora ? " · " + esc(h.hora) + " h" : ""}${h.modalidad ? " · " + esc(h.modalidad) : ""}</span><b>${esc(h.t)}</b>
        ${rx ? `<div class="rx"><b>Indicaciones de tu psiquiatra</b>${h.meds.filter(x => x.n).map(x => `<span>${esc(x.n)}${x.dosis ? " – " + esc(x.dosis) : ""}${x.cada ? ", cada " + esc(x.cada) : ""}${x.dias ? " · " + esc(x.dias) + (/^\d+$/.test(x.dias) ? " días" : "") : ""}</span>`).join("")}</div>` : ""}
        ${h.ind ? `<p><b>Recomendaciones:</b> ${esc(h.ind)}</p>` : ""}
        <div class="doc-row">${rx || h.ind ? `<button type="button" class="doc-btn rx-btn" data-doc="rx" data-hi="${i}">${icono("pill")} ${rx ? "Descargar receta" : "Descargar indicaciones"}</button>` : ""}<button type="button" class="doc-btn" data-doc="ct" data-hi="${i}">${icono("file")} Constancia de atención</button>${+h.monto > 0 || +h.pagado > 0 ? `<button type="button" class="doc-btn" data-doc="rc" data-hi="${i}">${icono("card")} Recibo</button>` : ""}</div>
        ${h.vet ? `<span class="vet">Te atendió: ${esc(h.vet)}</span>` : ""}</li>`; }).join("")
      || `<p style="color:var(--muted)">Aún no hay sesiones registradas.</p>`;
    window.dispatchEvent(new CustomEvent("me-render", { detail: { m, code, cli } }));
    $("#rems").innerHTML = m.rec.length ? m.rec.map(r => `<div class="rem"><i>${icono(r.i)}</i><b>${esc(r.t)}</b><small>${enDias(diff(r.f))} · ${fmt(r.f)}</small></div>`).join("")
      : `<p style="color:var(--muted)">Sin recordatorios por ahora.</p>`;
  }
  // Recibo, receta y constancia en PDF (descarga directa)
  const isoF = d => d instanceof Date ? isoD(d) : String(d || "").slice(0, 10);
  const negocio = () => { const mk = ((DATA && DATA.web) || D0.web || {}).marca || {};
    return { nombre: NOMBRE, razon: AJ.razonSocial || "", ruc: AJ.ruc || "", dir: AJ.direccion || "", tel: AJ.telefono || "", logo: mk.logo || "", color: mk.color1 || "#3d6b63", pie: AJ.reciboPie || "", web: location.host + location.pathname.replace(/mi-espacio.*$/, "") + "mi-espacio" }; };
  async function descargar(tipo, h, m) {
    if (!window.PDFV) return toast("Espera un momento y vuelve a intentar");
    const f = isoF(h.f), area = /^Dr/.test(h.vet || "") ? "Médico psiquiatra" : "Psicólogo(a)";
    if (tipo === "rc") {
      const pagos = (h.pagos && h.pagos.length) ? h.pagos : +h.pagado ? [{ monto: +h.pagado, metodo: h.metodo || "", fecha: f }] : [], tot = +h.monto || +h.pagado || 0;
      return PDFV.recibo({ neg: negocio(), num: PDFV.num("C", f, h.citaId || h.id || h.t + f), fecha: (pagos[pagos.length - 1] || {}).fecha || f, hora: (pagos[pagos.length - 1] || {}).hora || "",
        cliente: cli.dueno, code, mascota: m.nombre, etqMascota: "Paciente", vet: h.vet, detalle: h.compra ? "Compra de paquete de sesiones" : `Sesión del ${fmt(h.f)}${h.hora ? " · " + h.hora + " h" : ""}${h.modalidad ? " · " + h.modalidad : ""}`,
        items: [{ n: h.t, q: 1, p: tot, principal: true }], total: tot, pagos, pagado: +h.pagado || 0, saldo: Math.max(tot - (+h.pagado || 0), 0) });
    }
    if (tipo === "ct") return PDFV.constancia({ neg: negocio(), fecha: f, paciente: m.nombre, firma: area, vet: h.vet,
      campos: [["Paciente", m.nombre], ["DNI", m.dni], ["Edad", edadTxt(m.nac)], ["Código", code], ["Fecha", fmt(h.f)], ["Hora", h.hora ? h.hora + " h" : ""], ["Modalidad", h.modalidad], ["Profesional", h.vet]],
      texto: `Se deja constancia de que ${m.nombre}${m.dni ? ", identificado(a) con DNI " + m.dni + "," : ""} asistió a una atención de ${String(h.t).replace(/ · sesión.*$/i, "").toLowerCase()} en ${NOMBRE} el día ${fmt(h.f)}${h.hora ? " a las " + h.hora + " h" : ""}${h.modalidad ? ", en modalidad " + h.modalidad.toLowerCase() : ""}.\n\nSe expide la presente a solicitud del interesado(a) para los fines que estime conveniente. Por confidencialidad, no se incluye información clínica.` });
    return PDFV.receta({ neg: negocio(), fecha: f, paciente: m.nombre, firma: area, aviso: "Medicamentos controlados: requieren la receta especial entregada en consulta. No suspendas ni cambies la dosis sin consultar.",
      campos: [["Paciente", m.nombre], ["Edad", edadTxt(m.nac)], ["DNI", m.dni], ["Alergias", m.alergias || "Ninguna"], ["Código", code], ["Atención", h.t], ["Profesional", h.vet]],
      vet: h.vet, servicio: h.t, meds: (h.meds || []).filter(x => x.n), ind: h.ind, control: h.control, controlMotivo: h.controlMotivo, rpTitulo: (h.meds || []).some(x => x.n) ? "Tratamiento indicado" : "Indicaciones" });
  }
  portal.addEventListener("click", async e => {
    const b = e.target.closest("[data-doc]"); if (!b) return;
    const m = cli.mascotas[idx], h = m.historial[+b.dataset.hi]; if (!h) return;
    const txt = b.innerHTML; b.disabled = true; b.textContent = "Preparando PDF…";
    try { await descargar(b.dataset.doc, h, m); toast(b.dataset.doc === "rx" ? "Receta descargada" : b.dataset.doc === "ct" ? "Constancia descargada" : "Recibo descargado"); }
    catch (er) { console.error(er); toast(er.message || "No se pudo crear el PDF"); }
    b.disabled = false; b.innerHTML = txt;
  });
  portal.addEventListener("change", e => {
    const c = e.target.closest("[data-task]"); if (!c) return;
    const h = store.get(TKEY(), {}); if (c.checked) h[c.dataset.task] = new Date().toISOString().slice(0, 10); else delete h[c.dataset.task];
    store.set(TKEY(), h); c.closest(".task").classList.toggle("done", c.checked); if (c.checked) toast("¡Bien hecho! Tarea completada");
  });
  portal.addEventListener("click", e => {
    const t = e.target.closest("[data-i]"); if (t) { idx = +t.dataset.i; render(); }
    const a = e.target.closest("[data-act]"); if (!a) return;
    e.preventDefault();
    const m = cli.mascotas[idx];
    if (a.dataset.act === "renovar") return wa(`Hola ${NOMBRE}, quiero renovar mi paquete: ${a.dataset.paq} (paciente ${m.nombre}, código ${code}).`);
    const pr = m.citas[0]; if (!pr) return;
    const base = `${pr.servicio} de ${m.nombre} el ${fmt(pr.fecha)} a las ${pr.hora} h, ${pr.modalidad || "presencial"} (código ${code})`;
    if (a.dataset.act === "confirmar") wa(`Hola ${NOMBRE}, confirmo mi sesión: ${base}. ¡Gracias!`);
    if (a.dataset.act === "reprogramar") wa(`Hola ${NOMBRE}, necesito reprogramar mi sesión: ${base}. ¿Qué otros horarios tienen?`);
  });
  $("#codeForm").addEventListener("submit", e => { e.preventDefault(); $("#codeIn").classList.remove("error"); login($("#codeIn").value); });
  $$("[data-code]").forEach(b => b.addEventListener("click", () => { $("#codeIn").value = b.dataset.code; login(b.dataset.code); }));
  $("#logout").addEventListener("click", logout);
  $("#printBtn").addEventListener("click", () => window.print());
  const pc = new URLSearchParams(location.search).get("codigo");
  let saved = null; try { saved = sessionStorage.getItem("ms_code"); } catch (e) {}
  if (pc || saved) cargarDatos().then(() => login(pc || saved));
}

/* =========================================================
   DETALLE DE SERVICIO (servicio?id=...)
   ========================================================= */
function paginaServicio(servs) {
  const box = $("#td"); if (!box) return;
  const id = new URLSearchParams(location.search).get("id"), x = servs.find(s => s.id === id);
  if (!x) { box.innerHTML = `<div class="pd-empty"><h2>Servicio no encontrado</h2><p>Puede que ya no esté disponible.</p><a class="btn btn-pri" href="servicios">Ver servicios</a></div>`; return; }
  const cat = catDe("servicios", x.cat), ben = Array.isArray(x.beneficios) ? x.beneficios : String(x.beneficios || "").split("\n").filter(Boolean);
  const faq = Array.isArray(x.faq) ? x.faq : String(x.faq || "").split("\n").map(l => { const [q, ...a] = l.split("|"); return { q: q.trim(), a: a.join("|").trim() }; }).filter(f => f.q);
  document.title = `${x.n} | ${NOMBRE}`;
  $("#tdCrumbs").innerHTML = `<a href="servicios">Servicios</a>${cat ? ` <span>›</span> <a href="servicios">${esc(cat.n)}</a>` : ""} <span>›</span> <b>${esc(x.n)}</b>`;
  box.innerHTML = `<div class="td">
    <div class="td-media"><span class="td-ph">${icono(x.icon)}</span>${x.img ? `<img src="${esc(foto(x.img, 1000))}" alt="${esc(x.n)}" onerror="this.remove()">` : ""}</div>
    <div class="td-info">
      <span class="cat">${icono(x.icon)} ${esc(cat ? cat.n : "Servicio")}</span>
      <h1>${esc(x.n)}</h1>
      <p class="td-lead">${esc(x.d || "")}</p>
      <div class="td-facts">
        <div><small>${+x.p ? "Precio por sesión" : "Precio"}</small><b>${precio(x.p)}</b></div>
        <div><small>Modalidad</small><b>${x.online === false ? "Presencial" : "Presencial u online"}</b></div>
        ${x.duracion ? `<div><small>Duración</small><b>${esc(x.duracion)}</b></div>` : ""}
        ${x.sesiones ? `<div><small>Sesiones</small><b>${esc(x.sesiones)}</b></div>` : ""}
      </div>
      <div class="hero-actions">${x.reservable !== false ? `<a class="btn btn-pri" href="citas?servicio=${encodeURIComponent(x.id)}">${ICO.check} Agendar este servicio</a>` : ""}<button class="btn btn-light" id="tdWa">Consultar por WhatsApp</button></div>
      <p class="td-note">${icono("lock")} Atención confidencial · Paquetes de sesiones con descuento.</p>
    </div></div>
    ${String(x.larga || "").trim() || ben.length ? `<div class="td-more">
      ${String(x.larga || "").trim() ? `<div><h2>¿En qué consiste?</h2>${String(x.larga).split(/\n{2,}/).filter(Boolean).map(t => `<p>${esc(t)}</p>`).join("")}</div>` : ""}
      ${ben.length ? `<div><h2>Beneficios</h2><ul class="checks">${ben.map(b => `<li>${esc(b)}</li>`).join("")}</ul></div>` : ""}</div>` : ""}
    ${faq.length ? `<div class="td-faq"><h2>Preguntas frecuentes</h2><div class="faq">${faq.map((f, i) => `<details${i ? "" : " open"}><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}</div></div>` : ""}`;
  $("#tdWa").addEventListener("click", () => wa(`Hola ${NOMBRE}, quisiera información sobre *${x.n}*. ¿Me pueden ayudar?`));
  const rel = servs.filter(s => s.id !== x.id && s.tipo !== "adicional" && catVisible("servicios", s)).sort((a, b) => (b.cat === x.cat) - (a.cat === x.cat)).slice(0, 3);
  if (rel.length) { $("#tdRelSec").hidden = false; $("#tdRel").innerHTML = rel.map(svcCard).join(""); revealAll($("#tdRel")); }
}

/* =========================================================
   FORMULARIO DE CONTACTO
   ========================================================= */
const cf = $("#contactForm");
if (cf) cf.addEventListener("submit", e => {
  e.preventDefault();
  const msg = $(".f-msg", cf);
  $$(".error", cf).forEach(x => x.classList.remove("error"));
  const bad = $$("[required]", cf).filter(x => !x.checkValidity());
  const tel = $("[name=celular]", cf); if (tel.value.replace(/\D/g, "").length < 9) bad.push(tel);
  if (bad.length) { bad.forEach(x => x.classList.add("error")); msg.className = "f-msg err"; msg.textContent = "Completa los campos obligatorios (*)."; bad[0].focus(); return; }
  const v = n => $(`[name="${n}"]`, cf).value.trim();
  wa([`Hola ${NOMBRE}:`, "", "• Nombre: " + v("nombre"), "• Celular: " + v("celular"), "• Asunto: " + v("asunto"), "• Mensaje: " + v("mensaje")].join("\n"));
  msg.className = "f-msg ok"; msg.textContent = "¡Listo! Se abrió WhatsApp con tu mensaje.";
});

/* =========================================================
   PÁGINAS EDITABLES: menú, encabezados, secciones del inicio, pie
   ========================================================= */
const PAGINA = (location.pathname.split("/").pop() || "").replace(/\.html$/, "") || "inicio";
const PAG_KEY = PAGINA === "index" ? "inicio" : PAGINA;
const QS = new URLSearchParams(location.search);
function setHead(el, d) {   // pill + título (con parte en color) + texto
  if (!el || !d) return;
  const pill = $(".pill", el), h = $("h1, h2, h3", el), p = h && h.parentElement.querySelector(":scope > p") || $("p", el);
  if (pill && d.pill != null) { const svg = pill.querySelector("svg"); pill.innerHTML = (svg ? svg.outerHTML + " " : "") + esc(d.pill); pill.style.display = d.pill ? "" : "none"; }
  if (h && d.titulo != null) h.innerHTML = esc(d.titulo) + (d.tituloColor ? ` <span class="${h.tagName === "H1" && !el.classList.contains("page-head") ? "" : "c-pri"}">${esc(d.tituloColor)}</span>` : "");
  if (p && d.texto != null) { p.textContent = d.texto; p.style.display = d.texto ? "" : "none"; }
}
function aplicarPaginas(pg) {
  // Menú
  const menuEl = $("#menu");
  if (menuEl && pg.menu) {
    const extra = (pg.extras || []).filter(x => x.enMenu).map(x => ({ id: "p:" + x.slug, n: x.n, visible: true, href: "pagina?p=" + encodeURIComponent(x.slug) }));
    const activo = PAG_KEY === "servicio" ? "servicios" : PAG_KEY === "pagina" ? "p:" + QS.get("p") : PAG_KEY;
    menuEl.innerHTML = [...pg.menu.filter(m => m.visible !== false).map(m => ({ ...m, href: m.id === "inicio" ? "./" : m.id })), ...extra]
      .map(m => `<li><a href="${esc(m.href)}" data-nav="${esc(m.id)}"${m.id === activo ? ' class="active" aria-current="page"' : ""}>${esc(m.n)}</a></li>`).join("");
    const ocultas = pg.menu.filter(m => m.visible === false).map(m => m.id);
    $$("footer a").forEach(a => { const h = (a.getAttribute("href") || "").split("?")[0]; if (ocultas.includes(h)) a.closest("li") ? a.closest("li").style.display = "none" : a.style.display = "none"; });
  }
  // Encabezado de cada página (con imagen de fondo opcional)
  const enc = (pg.encabezados || {})[PAG_KEY], ph = $("[data-ph]");
  if (enc) setHead(ph, enc);
  if (ph && enc && enc.img && foto(enc.img)) { ph.classList.add("has-img"); ph.style.setProperty("--ph-img", `url("${foto(enc.img, 1600)}")`); }
  // Textos sueltos de cada página
  const TX = pg.textos || {};
  $$("[data-t]").forEach(el => { const v = TX[el.dataset.t]; if (v != null && v !== "") el.textContent = v; });
  // Imágenes fijas (llamado final, ingreso a Mi Mascota…)
  const IMG = pg.imagenes || {};
  $$("[data-ik]").forEach(el => { const v = IMG[el.dataset.ik]; if (v && foto(v)) el.src = foto(v, 900); });
  // Secciones compartidas (aviso de emergencias, testimonios y llamado final) en todas las páginas
  (pg.inicio || []).forEach(sx => {
    if (!["emergencias", "cta", "testimonios"].includes(sx.id)) return;
    $$(sx.id === "emergencias" ? ".emergency" : sx.id === "cta" ? ".cta" : '[data-sec="testimonios"] .sec-head').forEach(box => {
      if (sx.id === "testimonios") return setHead(box, sx);
      const h = $(sx.id === "cta" ? "h2" : "h3", box), p = $("p", box);
      if (h && sx.titulo) h.textContent = sx.titulo; if (p && sx.texto != null) p.textContent = sx.texto;
    });
  });
  // Secciones del inicio: textos, mostrar/ocultar y orden
  if (PAG_KEY === "inicio" && pg.inicio) {
    const foot = $("footer");
    let n = 0;
    pg.inicio.forEach(sx => {
      const el = $(`[data-sec="${sx.id}"]`); if (!el) return;
      el.style.display = sx.visible === false ? "none" : "";
      if (sx.id === "emergencias") { const e = $(".emergency", el); if (e) { if (sx.titulo) $("h3", e).textContent = sx.titulo; if (sx.texto != null) $("p", e).textContent = sx.texto; } }
      else if (sx.id === "cta") { const c = $(".cta", el); if (c) { if (sx.titulo) $("h2", c).textContent = sx.titulo; if (sx.texto != null) $("p", c).textContent = sx.texto; } }
      else if (sx.id !== "accesos") setHead($(".sec-head", el) || el, sx);
      if (sx.id !== "accesos") { foot.parentNode.insertBefore(el, foot); }
      if (sx.visible !== false && el.tagName === "SECTION" && !["emergencias", "cta"].includes(sx.id)) el.classList.toggle("bg-soft", n++ % 2 === 0);
    });
    const cta = $('[data-sec="cta"]'); if (cta) cta.classList.remove("bg-soft");
  }
  // Pie de página
  if (pg.pie && pg.pie.texto && $("#pieTexto")) $("#pieTexto").textContent = pg.pie.texto;
  // Bloques agregados por el cliente en esta página
  const bl = ((pg.bloques || {})[PAG_KEY] || []).filter(b => b.visible !== false && (b.titulo || b.texto || b.img));
  const cont = $("#pgBloques");
  if (cont) {
    cont.innerHTML = bl.length ? `<section class="pg-bloques"><div class="container bloques">${bl.map((b, i) => bloqueHTML(b, i)).join("")}</div></section>` : "";
    const f = $("footer"); if (f) f.parentNode.insertBefore(cont, f);
    revealAll(cont);
  }
}
function bloqueHTML(b, i) {
  return `<article class="bloque reveal ${b.img ? "con-img" : ""} ${i % 2 ? "alt" : ""}">
    ${b.img && foto(b.img) ? `<div class="b-img"><img src="${esc(foto(b.img, 900))}" alt="" loading="lazy"></div>` : ""}
    <div class="b-txt">${b.titulo ? `<h2>${esc(b.titulo)}</h2>` : ""}${String(b.texto || "").split(/\n+/).filter(Boolean).map(t => `<p>${esc(t)}</p>`).join("")}
      ${b.boton && b.enlace ? `<a class="btn btn-pri" href="${esc(b.enlace)}">${esc(b.boton)} ${ICO.arrow}</a>` : ""}</div>
  </article>`;
}

/* =========================================================
   PÁGINAS CREADAS DESDE EL PANEL (pagina?p=...)
   ========================================================= */
function paginaLibre(pg) {
  const box = $("#pg"); if (!box) return;
  const x = (pg.extras || []).find(e => e.slug === QS.get("p"));
  if (!x) { box.innerHTML = `<section class="page-head"><div class="container"><h1>Página no encontrada</h1><p>Puede que haya sido eliminada.</p><div class="hero-actions" style="justify-content:center"><a class="btn btn-pri" href="./">Ir al inicio</a></div></div></section>`; return; }
  document.title = `${x.n} | ${NOMBRE}`;
  box.innerHTML = `<section class="page-head"><div class="container">${x.pill ? `<span class="pill">${icono("sparkle")} ${esc(x.pill)}</span>` : ""}<h1>${esc(x.titulo || x.n)}${x.tituloColor ? ` <span class="c-pri">${esc(x.tituloColor)}</span>` : ""}</h1>${x.texto ? `<p>${esc(x.texto)}</p>` : ""}</div></section>
    <section><div class="container bloques">${(x.bloques || []).map(bloqueHTML).join("")}</div></section>`;
  revealAll(box);
}

/* ---------- Curva del pie: toma el color de la sección anterior ---------- */
function curvaPie() {
  const f = $("footer"); if (!f) return;
  let p = f.previousElementSibling; while (p && (!p.offsetHeight || p.id === "pgBloques" && !p.innerHTML.trim())) p = p.previousElementSibling;
  if (p && p.id === "pgBloques") p = p.querySelector("section") || p;
  const bg = p ? getComputedStyle(p).backgroundColor : ""; if (bg && bg !== "rgba(0, 0, 0, 0)") f.style.setProperty("--wave", bg);
}
/* ---------- Arranque ---------- */
aplicarAjustes(AJ);
if (D0.web) aplicarWeb(D0.web);
cargarDatos().then(d => {
  CATS = d.categorias; DOCTORES_W = d.doctores || [];
  aplicarAjustes(d.ajustes);
  aplicarWeb(d.web);
  aplicarPaginas(d.paginas);
  pintarServicios(d.servicios);
  iniciarCitas(d.servicios);
  paginaLibre(d.paginas); paginaServicio(d.servicios);
  curvaPie();
});
