/* =========================================================
   MI DÍA — Mente Serena
   Ánimo diario, retos del día que asigna el terapeuta, racha de
   constancia, ejercicios guiados y gráfico de la semana.
   Lo que el paciente registra se guarda en:
     clientes/{CODIGO}/registro/{fecha}_{paciente}
   y su terapeuta lo ve en el panel (gráfico de evolución).
   ========================================================= */
(() => {
  const EMO = [[1, "😞", "Muy mal"], [2, "🙁", "Mal"], [3, "😐", "Regular"], [4, "🙂", "Bien"], [5, "😄", "Muy bien"]];
  const EJ = {
    respiracion478: { n: "Respiración 4-7-8", d: "Calma la ansiedad en unos 2 minutos", ic: "wave", min: 2, tipo: "respira", fases: [["Inhala por la nariz", 4], ["Sostén el aire", 7], ["Exhala por la boca", 8]], ciclos: 4 },
    cuadrada: { n: "Respiración cuadrada", d: "Para concentrarte y bajar el estrés", ic: "box", min: 2, tipo: "respira", fases: [["Inhala", 4], ["Sostén", 4], ["Exhala", 4], ["Sostén", 4]], ciclos: 5 },
    anclaje: { n: "Anclaje 5-4-3-2-1", d: "Vuelve al presente si te sientes desbordado", ic: "anchor", min: 3, tipo: "pasos",
      pasos: ["Mira a tu alrededor y nombra en voz baja <b>5 cosas que puedes ver</b>.", "Ahora <b>4 cosas que puedes tocar</b>. Siente su textura y temperatura.", "Escucha con atención: <b>3 sonidos</b> que oyes en este momento.", "Nota <b>2 cosas que puedes oler</b> (o recuerda dos olores que te gusten).", "Por último, <b>1 cosa que puedes saborear</b>, o una cosa buena de ti."] },
    relajacion: { n: "Relajación muscular", d: "Suelta la tensión del cuerpo, de pies a cabeza", ic: "leaf", min: 5, tipo: "pasos", seg: 20,
      pasos: ["<b>Pies:</b> encoge los dedos con fuerza 5 segundos… y suelta. Nota la diferencia.", "<b>Piernas:</b> estira y tensa las piernas… y suelta despacio.", "<b>Abdomen:</b> aprieta el abdomen como si te protegieras… y suelta.", "<b>Manos y brazos:</b> cierra los puños y tensa los brazos… y suelta.", "<b>Hombros:</b> súbelos hacia las orejas… y déjalos caer.", "<b>Cara:</b> aprieta ojos y mandíbula… y relaja toda la cara.", "<b>Todo el cuerpo:</b> respira lento tres veces y disfruta la sensación de calma."] },
    gratitud: { n: "Diario de gratitud", d: "Escribe 3 cosas buenas de hoy", ic: "heart", min: 3, tipo: "gratitud" },
    pensamientos: { n: "Registro de pensamientos", d: "Ordena lo que piensas y sientes", ic: "brain", min: 5, tipo: "pensamiento" },
  };
  const hoyI = () => isoD(new Date());
  const diaI = n => { const d = new Date(); d.setDate(d.getDate() + n); return isoD(d); };
  const DSEM = ["D", "L", "M", "M", "J", "V", "S"];
  const S = { m: null, code: "", cli: null, reg: {}, ok: false };
  const regId = (f, mid) => `${f}_${mid}`;
  const hoyDe = () => S.reg[regId(hoyI(), S.m.id)] || {};
  const retosHoy = m => (m.retos || []).filter(r => r.activo !== false && (!r.desde || r.desde <= hoyI()) && (!r.hasta || r.hasta >= hoyI()));

  /* ---------- Guardar y leer ---------- */
  async function cargar() {
    S.reg = {};
    if (EN_VIVO) {
      const { fs, db } = await fb();
      const s = await fs.getDocs(fs.query(fs.collection(db, "clientes", S.code, "registro"), fs.where("fecha", ">=", diaI(-45))));
      s.docs.forEach(d => S.reg[d.id] = d.data()); return;
    }
    const L = localDB();
    if (L && L.clientes && L.clientes[S.code]) { S.reg = { ...(L.clientes[S.code].registro || {}) }; return; }
    S.reg = store.get("ms_reg_" + S.code, null) || (S.code === "MS-1024" ? demoReg() : {});
  }
  async function guardar(patch) {
    const f = hoyI(), mid = S.m.id, id = regId(f, mid), prev = S.reg[id] || {};
    const doc = { ...prev, ...patch, mid, fecha: f, actualizado: new Date().toISOString() };
    if (EN_VIVO) { const { fs, db } = await fb(); await fs.setDoc(fs.doc(db, "clientes", S.code, "registro", id), doc); }
    else {
      const L = localDB();
      if (L && L.clientes && L.clientes[S.code]) { L.clientes[S.code].registro = L.clientes[S.code].registro || {}; L.clientes[S.code].registro[id] = doc; store.set("ms_db", L); }
      else { const all = store.get("ms_reg_" + S.code, null) || { ...S.reg }; all[id] = doc; store.set("ms_reg_" + S.code, all); }
    }
    S.reg[id] = doc;
  }
  function demoReg() {   // datos de ejemplo para el código demo MS-1024
    const r = {}, an = [3, 2, 3, 3, 2, 3, 3, 4, 3, 3, 4, 4, 3, 4, 4, 4, 5, 4, 4, 4];
    an.forEach((a, i) => { const f = diaI(i - an.length), done = (i * 7) % 3 !== 0;
      r[regId(f, "lucia")] = { mid: "lucia", fecha: f, animo: a, retos: done ? { r1: true, ...(i % 2 ? { r2: true } : {}) } : {}, ejercicios: done ? [{ k: "respiracion478", min: 2, hora: "08:10" }] : [], ...(i % 4 === 0 ? { gratitud: ["Un café tranquilo", "Hablé con mi hermano", "Terminé un pendiente"] } : {}) }; });
    return r;
  }

  /* ---------- Racha de constancia ---------- */
  const activo = x => x && (x.animo || Object.values(x.retos || {}).some(Boolean) || (x.ejercicios || []).length || (x.gratitud || []).length || (x.pensamientos || []).length);
  function racha(mid) {
    let n = 0, i = activo(S.reg[regId(hoyI(), mid)]) ? 0 : -1;
    while (activo(S.reg[regId(diaI(i), mid)])) { n++; i--; }
    return n;
  }
  const planta = n => n >= 21 ? "🌳" : n >= 10 ? "🌿" : n >= 3 ? "🪴" : "🌱";

  /* ---------- Gráfico de la semana (14 días) ---------- */
  function grafico(mid) {
    const dias = Array.from({ length: 14 }, (_, i) => diaI(i - 13)), W = 560, H = 156, pl = 28, pr = 8, pt = 10, pb = 48;
    const X = i => pl + i * (W - pl - pr) / 13, Y = a => pt + (5 - a) * (H - pt - pb) / 4;
    const pts = dias.map((f, i) => ({ i, f, a: (S.reg[regId(f, mid)] || {}).animo })).filter(p => p.a);
    const linea = pts.map(p => `${X(p.i).toFixed(1)},${Y(p.a).toFixed(1)}`).join(" ");
    const nRet = f => { const x = S.reg[regId(f, mid)] || {}; return Object.values(x.retos || {}).filter(Boolean).length + (x.ejercicios || []).length; };
    const maxR = Math.max(1, ...dias.map(nRet));
    return `<svg class="bien-g" viewBox="0 0 ${W} ${H}" role="img" aria-label="Tu ánimo y actividad de los últimos 14 días">
      ${[1, 3, 5].map(a => `<line x1="${pl}" x2="${W - pr}" y1="${Y(a)}" y2="${Y(a)}" class="gl"/><text x="2" y="${Y(a) + 5}" class="ge">${EMO[a - 1][1]}</text>`).join("")}
      ${dias.map((f, i) => { const n = nRet(f), h = n ? Math.max(4, n / maxR * 22) : 0; return `${h ? `<rect x="${X(i) - 6}" y="${H - 18 - h}" width="12" height="${h}" rx="3" class="gb"><title>${n} reto(s) o ejercicio(s)</title></rect>` : ""}<text x="${X(i)}" y="${H - 3}" class="gd ${f === hoyI() ? "hoy" : ""}">${DSEM[new Date(f + "T12:00").getDay()]}</text>`; }).join("")}
      ${linea ? `<polyline points="${linea}" class="gline"/>` : ""}
      ${pts.map(p => `<circle cx="${X(p.i).toFixed(1)}" cy="${Y(p.a).toFixed(1)}" r="5" class="gp"><title>${p.f}: ${EMO[p.a - 1][2]}</title></circle>`).join("")}
    </svg>`;
  }

  /* ---------- Pintar "Mi día" ---------- */
  function pintar() {
    const box = document.getElementById("bien"); if (!box || !S.m) return;
    const m = S.m, x = hoyDe(), rs = retosHoy(m), hechos = rs.filter(r => (x.retos || {})[r.id]).length, n = racha(m.id), nombre = String(m.nombre || "").split(" ")[0];
    const semana = Array.from({ length: 7 }, (_, i) => diaI(i - 6)).map(f => `<i class="${activo(S.reg[regId(f, m.id)]) ? "on" : ""} ${f === hoyI() ? "hoy" : ""}" title="${f}">${DSEM[new Date(f + "T12:00").getDay()]}</i>`).join("");
    box.innerHTML = `<div class="bien">
      <div class="bien-h">
        <div><small>MI DÍA · ${new Date().toLocaleDateString("es-PE", { weekday: "long", day: "numeric", month: "long" }).toUpperCase()}</small><h3>${m.menor ? `¿Cómo se siente ${esc(nombre)} hoy?` : `${esc(nombre)}, ¿cómo te sientes hoy?`}</h3></div>
        <div class="racha" title="Días seguidos registrando tu ánimo o haciendo tus retos"><span>${planta(n)}</span><div><b>${n} día${n === 1 ? "" : "s"}</b><small>de constancia</small></div></div>
      </div>
      <div class="emo-row" role="group" aria-label="Elige cómo te sientes">${EMO.map(([v, e, t]) => `<button type="button" class="emo ${x.animo === v ? "on" : ""}" data-animo="${v}" aria-pressed="${x.animo === v}"><span>${e}</span><small>${t}</small></button>`).join("")}</div>
      <div class="emo-nota" ${x.animo ? "" : "hidden"}>
        <textarea id="bienNota" maxlength="280" rows="2" placeholder="¿Quieres contarle algo a tu terapeuta? (opcional · solo lo verá tu terapeuta)">${esc(x.nota || "")}</textarea>
        <button type="button" class="btn btn-light btn-sm" data-bnota>Guardar nota</button>
      </div>
      ${x.animo && x.animo <= 2 ? `<div class="emo-alerta">${icono("lifebuoy")}<div><b>Gracias por contarnos.</b> Es valiente decir que no estás bien. Tu terapeuta lo verá. Si sientes que no puedes más o piensas en hacerte daño, no esperes tu sesión:<div class="emo-acts"><button type="button" class="btn btn-sm btn-coral" data-crisis>Ver ayuda inmediata</button><button type="button" class="btn btn-sm btn-light" data-bwa>Escribir al centro</button></div></div></div>` : ""}
      <div class="bien-grid">
        <div class="bien-c">
          <div class="bien-ct"><b>${icono("target")} Retos de hoy</b>${rs.length ? `<span>${hechos} de ${rs.length}</span>` : ""}</div>
          ${rs.length ? `<span class="bien-bar"><i style="width:${Math.round(hechos / rs.length * 100)}%"></i></span>
            <div class="retos">${rs.map(r => { const ok = !!(x.retos || {})[r.id], e = r.ej && EJ[r.ej];
              return `<div class="reto ${ok ? "ok" : ""}"><label><input type="checkbox" data-reto="${esc(r.id)}" ${ok ? "checked" : ""}><span><b>${esc(r.t)}</b>${r.d ? `<small>${esc(r.d)}</small>` : ""}</span></label>${e && !ok ? `<button type="button" class="btn btn-pri btn-sm" data-ej="${esc(r.ej)}" data-rid="${esc(r.id)}">${icono("arrow")} Empezar</button>` : ""}</div>`; }).join("")}</div>
            ${hechos === rs.length ? `<p class="bien-ok">🎉 ¡Completaste tus retos de hoy! Cada pequeño paso cuenta.</p>` : ""}`
          : `<p class="bien-vacio">Tu terapeuta aún no te asignó retos. Mientras tanto, puedes hacer cualquiera de los ejercicios guiados de abajo.</p>`}
        </div>
        <div class="bien-c">
          <div class="bien-ct"><b>${icono("chart")} Mi semana</b><span class="sem">${semana}</span></div>
          ${grafico(m.id)}
          <p class="bien-ley"><span class="l1"></span> Ánimo <span class="l2"></span> Retos y ejercicios</p>
        </div>
      </div>
      <div class="bien-ct" style="margin-top:22px"><b>${icono("leaf")} Ejercicios guiados</b><small>Úsalos cuando los necesites. Cuentan para tu racha.</small></div>
      <div class="ejs">${Object.entries(EJ).map(([k, e]) => { const veces = Object.values(S.reg).filter(r => r.mid === m.id).reduce((a, r) => a + (r.ejercicios || []).filter(z => z.k === k).length, 0);
        return `<button type="button" class="ej" data-ej="${k}"><i>${icono(e.ic)}</i><b>${e.n}</b><small>${e.d}</small><em>${e.min} min${veces ? ` · hecho ${veces} ${veces === 1 ? "vez" : "veces"}` : ""}</em></button>`; }).join("")}</div>
    </div>`;
    marcarTareas();
  }
  // las tareas del terapeuta también quedan guardadas (para que él las vea)
  function marcarTareas() {
    const hechas = {}; Object.values(S.reg).filter(r => r.mid === S.m.id).forEach(r => Object.entries(r.tareas || {}).forEach(([k, v]) => { if (v) hechas[k] = true; }));
    document.querySelectorAll("#tareas [data-task]").forEach(c => { const k = c.dataset.task.split(":").slice(1).join(":"); if (hechas[k] && !c.checked) { c.checked = true; c.closest(".task").classList.add("done"); } });
  }

  /* ---------- Ejercicio guiado (ventana) ---------- */
  let T = null;
  function cerrarEj() { clearTimeout(T); clearInterval(T); const d = document.getElementById("ejModal"); if (d) d.remove(); document.body.classList.remove("ej-open"); }
  function abrirEj(k, rid) {
    const e = EJ[k]; if (!e) return; cerrarEj();
    const d = document.createElement("div"); d.id = "ejModal"; d.className = "ej-modal"; d.setAttribute("role", "dialog"); d.setAttribute("aria-modal", "true"); d.setAttribute("aria-label", e.n);
    d.innerHTML = `<div class="shade" data-ejx></div><div class="ej-box"><button class="x-btn" data-ejx aria-label="Cerrar">${icono("x")}</button><small class="ej-k">${icono(e.ic)} EJERCICIO GUIADO · ${e.min} MIN</small><h3>${e.n}</h3><div id="ejBody"></div></div>`;
    document.body.appendChild(d); document.body.classList.add("ej-open");
    const body = d.querySelector("#ejBody");
    const fin = async extra => {
      clearTimeout(T); clearInterval(T);
      const x = hoyDe(), retos = { ...(x.retos || {}) }; retosHoy(S.m).filter(r => r.ej === k || r.id === rid).forEach(r => retos[r.id] = true);
      const ejs = [...(x.ejercicios || []), { k, min: e.min, hora: new Date().toTimeString().slice(0, 5) }].slice(-30);
      try { await guardar({ ...extra, retos, ejercicios: ejs }); } catch (er) { console.error(er); toast("No se pudo guardar. Revisa tu internet."); return; }
      body.innerHTML = `<div class="ej-fin"><span>🌿</span><h4>¡Muy bien hecho!</h4><p>Registramos tu ejercicio${rid || retosHoy(S.m).some(r => r.ej === k) ? " y marcamos tu reto de hoy" : ""}. Tu racha: <b>${racha(S.m.id)} día(s)</b>.</p><button class="btn btn-pri" data-ejx>Listo</button></div>`;
      pintar();
    };
    if (e.tipo === "respira") {
      let c = 0, f = 0, s = 0, pausa = false;
      body.innerHTML = `<p class="ej-sub">Siéntate cómodo, hombros sueltos. Sigue el círculo: crece al inhalar y se achica al exhalar.</p>
        <div class="resp"><div class="resp-c" id="rc"><span id="rs"></span></div></div>
        <p class="resp-l" id="rl" aria-live="polite">Prepárate…</p>
        <p class="ej-ciclo" id="rcy">Ciclo 1 de ${e.ciclos}</p>
        <div class="ej-acts"><button class="btn btn-light" id="rp">Pausar</button><button class="btn btn-pri" id="rf">Terminar</button></div>`;
      const rc = body.querySelector("#rc"), rl = body.querySelector("#rl"), rs = body.querySelector("#rs");
      const fase = () => { const [t, seg] = e.fases[f]; rl.textContent = t; s = seg; rs.textContent = s;
        rc.style.transitionDuration = seg + "s"; if (/inhala/i.test(t)) rc.classList.add("in"); if (/exhala/i.test(t)) rc.classList.remove("in"); };
      setTimeout(() => { fase(); T = setInterval(() => { if (pausa) return; s--; if (s > 0) { rs.textContent = s; return; }
        f++; if (f >= e.fases.length) { f = 0; c++; if (c >= e.ciclos) return fin({}); body.querySelector("#rcy").textContent = `Ciclo ${c + 1} de ${e.ciclos}`; } fase(); }, 1000); }, 1200);
      body.querySelector("#rp").onclick = ev => { pausa = !pausa; ev.target.textContent = pausa ? "Seguir" : "Pausar"; };
      body.querySelector("#rf").onclick = () => fin({});
    } else if (e.tipo === "pasos") {
      let i = 0;
      const paso = () => { clearInterval(T);
        body.innerHTML = `<div class="ej-dots">${e.pasos.map((_, j) => `<i class="${j < i ? "ok" : j === i ? "on" : ""}"></i>`).join("")}</div><p class="ej-paso">${e.pasos[i]}</p>${e.seg ? `<p class="ej-timer" id="et">${e.seg}</p>` : ""}
          <div class="ej-acts">${i ? `<button class="btn btn-light" data-pv>Atrás</button>` : ""}<button class="btn btn-pri" data-nx>${i === e.pasos.length - 1 ? "Terminar" : "Siguiente"}</button></div>`;
        if (e.seg) { let s = e.seg; T = setInterval(() => { s--; const et = body.querySelector("#et"); if (et) et.textContent = Math.max(s, 0); if (s <= 0) { clearInterval(T); body.querySelector("[data-nx]").classList.add("pulse"); } }, 1000); }
        body.querySelector("[data-nx]").onclick = () => { if (i === e.pasos.length - 1) return fin({}); i++; paso(); };
        const pv = body.querySelector("[data-pv]"); if (pv) pv.onclick = () => { i--; paso(); };
      };
      paso();
    } else if (e.tipo === "gratitud") {
      const prev = (hoyDe().gratitud || []);
      body.innerHTML = `<p class="ej-sub">Piensa en tu día, aunque haya sido difícil. ¿Qué 3 cosas, grandes o pequeñas, agradeces?</p>
        ${[0, 1, 2].map(j => `<input class="ej-in" maxlength="140" placeholder="${["Ej. Un café tranquilo en la mañana", "Ej. Una conversación con alguien", "Ej. Algo que hice bien"][j]}" value="${esc(prev[j] || "")}">`).join("")}
        <div class="ej-acts"><button class="btn btn-pri" id="gs">Guardar</button></div>`;
      body.querySelector("#gs").onclick = () => { const g = [...body.querySelectorAll(".ej-in")].map(z => z.value.trim()).filter(Boolean); if (!g.length) return toast("Escribe al menos una"); fin({ gratitud: g.slice(0, 3) }); };
    } else if (e.tipo === "pensamiento") {
      body.innerHTML = `<p class="ej-sub">Cuando algo te afecte, escríbelo aquí. Lo revisarás con tu terapeuta.</p>
        <label class="ej-l">¿Qué pasó? (situación)</label><textarea class="ej-in" id="p1" maxlength="200" rows="2" placeholder="Ej. Mi jefe me pidió hablar a solas"></textarea>
        <label class="ej-l">¿Qué pensaste?</label><textarea class="ej-in" id="p2" maxlength="200" rows="2" placeholder="Ej. Seguro hice algo mal y me van a despedir"></textarea>
        <label class="ej-l">¿Qué sentiste y con qué intensidad?</label><div class="ej-row"><input class="ej-in" id="p3" maxlength="60" placeholder="Ej. Miedo, angustia"><input type="range" id="p4" min="0" max="10" value="7"><b id="p4v">7</b></div>
        <label class="ej-l">Otra forma de verlo (pensamiento alternativo)</label><textarea class="ej-in" id="p5" maxlength="200" rows="2" placeholder="Ej. También puede ser algo sobre un proyecto. No tengo pruebas de que sea malo."></textarea>
        <label class="ej-l">¿Cuánto sientes esa emoción ahora?</label><div class="ej-row"><input type="range" id="p6" min="0" max="10" value="4"><b id="p6v">4</b></div>
        <div class="ej-acts"><button class="btn btn-pri" id="ps">Guardar</button></div>`;
      ["p4", "p6"].forEach(id => body.querySelector("#" + id).oninput = ev => body.querySelector(`#${id}v`).textContent = ev.target.value);
      body.querySelector("#ps").onclick = () => { const v = id => body.querySelector("#" + id).value.trim(); if (!v("p1") || !v("p2")) return toast("Completa qué pasó y qué pensaste");
        fin({ pensamientos: [...(hoyDe().pensamientos || []), { s: v("p1"), p: v("p2"), e: v("p3"), i: +v("p4"), a: v("p5"), i2: +v("p6"), hora: new Date().toTimeString().slice(0, 5) }].slice(-5) }); };
    }
    d.querySelector(".x-btn").focus();
  }

  /* ---------- Eventos ---------- */
  document.addEventListener("click", async ev => {
    if (ev.target.closest("[data-ejx]")) return cerrarEj();
    const box = document.getElementById("bien"); if (!box || !S.m) return;
    const t = ev.target.closest("button"); if (!t) return;
    if (t.dataset.ej && !t.closest("#ejModal")) return abrirEj(t.dataset.ej, t.dataset.rid);
    if (!box.contains(t)) return;
    if (t.dataset.animo) { const v = +t.dataset.animo;
      try { await guardar({ animo: v }); } catch (er) { console.error(er); return toast("No se pudo guardar. Revisa tu internet."); }
      pintar(); toast(v >= 4 ? "¡Qué bueno! Registramos tu ánimo" : "Registrado. Gracias por contarnos"); if (v > 2) document.getElementById("bienNota")?.focus(); }
    if (t.matches("[data-bnota]")) { try { await guardar({ nota: document.getElementById("bienNota").value.trim().slice(0, 280) }); toast("Nota guardada · la verá tu terapeuta"); } catch (er) { toast("No se pudo guardar"); } }
    if (t.matches("[data-bwa]")) wa(`Hola ${NOMBRE}, soy ${S.cli.dueno} (código ${S.code}). Hoy no me siento bien y quisiera hablar con mi terapeuta.`);
  });
  document.addEventListener("change", async ev => {
    const c = ev.target.closest("[data-reto]");
    if (c && S.m) { const x = hoyDe(), retos = { ...(x.retos || {}), [c.dataset.reto]: c.checked };
      try { await guardar({ retos }); } catch (er) { c.checked = !c.checked; return toast("No se pudo guardar"); } pintar(); if (c.checked) toast("¡Reto cumplido! 💪"); return; }
    const k = ev.target.closest("#tareas [data-task]");
    if (k && S.m) { const id = k.dataset.task.split(":").slice(1).join(":"), x = hoyDe(); try { await guardar({ tareas: { ...(x.tareas || {}), [id]: k.checked } }); } catch (er) { console.error(er); } }
  });
  document.addEventListener("keydown", ev => { if (ev.key === "Escape" && document.getElementById("ejModal")) cerrarEj(); });

  // el portal avisa cuando muestra a un paciente
  window.addEventListener("me-render", async ev => {
    const { m, code, cli } = ev.detail; const nuevo = code !== S.code;
    S.m = m; S.code = code; S.cli = cli;
    const box = document.getElementById("bien"); if (!box) return;
    if (nuevo || !S.ok) { box.innerHTML = `<div class="bien"><p class="bien-vacio">Cargando tu día…</p></div>`; try { await cargar(); S.ok = true; } catch (er) { console.error(er); box.innerHTML = ""; return; } }
    pintar();
  });
  window.addEventListener("me-logout", () => { S.m = null; S.code = ""; S.ok = false; const b = document.getElementById("bien"); if (b) b.innerHTML = ""; cerrarEj(); });
})();
