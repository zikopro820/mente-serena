/* =========================================================
   PDF de RECIBOS y RECETAS — descarga directa (usa jsPDF,
   que se carga solo cuando alguien presiona "Descargar").
   El mismo archivo va en la web y en el panel.
   ========================================================= */
(function () {
  const SRC = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
  let cargando = null;
  function lib() {
    if (window.jspdf) return Promise.resolve(window.jspdf.jsPDF);
    if (!cargando) cargando = new Promise((ok, no) => {
      const s = document.createElement("script"); s.src = SRC;
      s.onload = () => window.jspdf ? ok(window.jspdf.jsPDF) : no(new Error("No se pudo preparar el PDF."));
      s.onerror = () => { cargando = null; no(new Error("No se pudo preparar el PDF. Revisa tu conexión a internet.")); };
      document.head.appendChild(s);
    });
    return cargando;
  }
  const S = n => "S/ " + (Math.round((+n || 0) * 100) / 100).toFixed(2);
  const MES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  const iso = f => f instanceof Date ? `${f.getFullYear()}-${String(f.getMonth() + 1).padStart(2, "0")}-${String(f.getDate()).padStart(2, "0")}` : String(f || "").slice(0, 10);
  const fmt = f => { const s = iso(f); if (!/^\d{4}-\d\d-\d\d$/.test(s)) return s; const [y, m, d] = s.split("-").map(Number); return `${d} ${MES[m - 1]} ${y}`; };
  const rgb = h => { const m = /^#?([0-9a-f]{6})$/i.exec(String(h || "").trim()); const v = m ? m[1] : "5b3df5"; return [0, 2, 4].map(i => parseInt(v.slice(i, i + 2), 16)); };
  const tipoImg = d => /^data:image\/png/i.test(d || "") ? "PNG" : /^data:image\/jpe?g/i.test(d || "") ? "JPEG" : null;
  const limpio = t => String(t ?? "").replace(/[^\x09\x0A\x0D\x20-\x7E -ÿ•–—‘’“”…€]/g, "").trim();   // jsPDF no dibuja emojis
  // número de recibo (igual en la web y en el panel)
  const num = (pre, f, id) => { let h = 0; for (const ch of String(id)) h = (h * 31 + ch.charCodeAt(0)) % 1679616; return `${pre}-${iso(f).replace(/-/g, "").slice(2)}-${h.toString(36).toUpperCase().padStart(4, "0")}`; };
  const archivo = t => limpio(t).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9-]+/g, "-").replace(/^-|-$/g, "");

  const INK = [30, 26, 51], GRIS = [110, 108, 130], CLARO = [235, 233, 245];
  function base(J) {
    const doc = new J({ unit: "mm", format: "a5" });
    const W = doc.internal.pageSize.getWidth(), H = doc.internal.pageSize.getHeight();
    const P = { doc, W, H, x0: 12, x1: W - 12 };
    P.need = (y, h) => { if (y + h > H - 14) { doc.addPage(); return 16; } return y; };
    P.t = (s, x, y, o = {}) => { doc.setFont("helvetica", o.b ? "bold" : o.i ? "italic" : "normal"); doc.setFontSize(o.s || 9); doc.setTextColor(...(o.c || INK)); doc.text(limpio(s), x, y, o.a ? { align: o.a } : undefined); };
    P.wrap = (s, w, size = 9) => { doc.setFontSize(size); return doc.splitTextToSize(limpio(s), w); };
    return P;
  }
  function cabecera(P, neg, titulo, sub) {
    const { doc, W, x0, x1 } = P, col = rgb(neg.color);
    doc.setFillColor(...col); doc.rect(0, 0, W, 3.5, "F");
    let x = x0, t = tipoImg(neg.logo);
    if (t) { try { doc.addImage(neg.logo, t, x0, 9, 16, 16); x = x0 + 20; } catch (e) { t = null; } }
    if (!t) { doc.setFillColor(...col); doc.roundedRect(x0, 9, 16, 16, 3.5, 3.5, "F"); P.t((limpio(neg.nombre) || "V")[0].toUpperCase(), x0 + 8, 19.6, { b: 1, s: 13, c: [255, 255, 255], a: "center" }); x = x0 + 20; }
    const lineas = [neg.razon && neg.razon !== neg.nombre ? neg.nombre : "", neg.ruc ? "RUC " + neg.ruc : "", neg.dir, neg.tel].filter(Boolean);
    P.t(neg.razon || neg.nombre, x, 13.5, { b: 1, s: 11 });
    lineas.forEach((s, i) => P.wrap(s, 62, 7.5).slice(0, 1).forEach(l => P.t(l, x, 17.6 + i * 3.4, { s: 7.5, c: GRIS })));
    P.t(titulo, x1, 14, { b: 1, s: 13, c: col, a: "right" });
    if (sub) { doc.setFont("courier", "bold"); doc.setFontSize(8); doc.setTextColor(...INK); doc.text(sub, x1, 19, { align: "right" }); }
    const y = Math.max(30, 17.6 + lineas.length * 3.4 + 2.5);
    doc.setDrawColor(200, 198, 215); doc.setLineDashPattern([1, 1], 0); doc.line(x0, y, x1, y); doc.setLineDashPattern([], 0);
    return y + 6;
  }
  function datos(P, y, pares) {
    const l = pares.filter(p => p[1] != null && String(p[1]).trim()), cw = (P.x1 - P.x0) / 2;
    l.forEach((p, i) => { const cx = P.x0 + (i % 2) * cw, cy = y + Math.floor(i / 2) * 9;
      P.t(String(p[0]).toUpperCase(), cx, cy, { s: 6.3, c: GRIS }); P.t(P.wrap(p[1], cw - 3, 8.6)[0], cx, cy + 3.8, { b: 1, s: 8.6 }); });
    return y + Math.ceil(l.length / 2) * 9 + 1;
  }
  function pie(P, textos) {
    const { doc, x0, x1, H } = P; let y = Math.max(P.y + 6, H - 10 - textos.length * 3.6);
    if (y + textos.length * 3.6 > H - 6) { doc.addPage(); y = 20; }
    doc.setDrawColor(200, 198, 215); doc.setLineDashPattern([1, 1], 0); doc.line(x0, y - 4, x1, y - 4); doc.setLineDashPattern([], 0);
    textos.forEach((t, i) => P.t(t.s, (x0 + x1) / 2, y + i * 3.6, { s: t.size || 7.4, c: t.c || GRIS, a: "center", b: t.b, i: t.i }));
  }

  /* ---------------- RECIBO ---------------- */
  async function recibo(r) {
    const J = await lib(), P = base(J), { doc, x0, x1 } = P, neg = r.neg || {}, col = rgb(neg.color);
    let y = cabecera(P, neg, r.titulo || "RECIBO", "N° " + r.num);
    y = datos(P, y, [["Fecha", fmt(r.fecha) + (r.hora ? " · " + r.hora : "")], ["Cliente", r.cliente], ["Código", r.code], [r.etqMascota || "Mascota", r.mascota], ["Atendió", r.vet], ["Atención", r.detalle]]);
    // tabla
    y = P.need(y, 16);
    doc.setFillColor(...CLARO); doc.roundedRect(x0, y, x1 - x0, 7, 1.5, 1.5, "F");
    P.t("DESCRIPCIÓN", x0 + 2.5, y + 4.7, { b: 1, s: 6.8, c: GRIS }); P.t("CANT.", x1 - 34, y + 4.7, { b: 1, s: 6.8, c: GRIS, a: "center" }); P.t("IMPORTE", x1 - 2.5, y + 4.7, { b: 1, s: 6.8, c: GRIS, a: "right" });
    y += 11.5;
    (r.items || []).forEach(it => {
      const ls = P.wrap(it.n, x1 - x0 - 48, 8.8); y = P.need(y, ls.length * 4 + 4);
      ls.forEach((l, k) => P.t(l, x0 + 2.5, y + k * 4, { s: 8.8, b: k === 0 && it.principal }));
      if ((+it.q || 1) > 1) P.t(`${S(it.p)} c/u`, x0 + 2.5, y + ls.length * 4, { s: 7, c: GRIS });
      P.t(String(+it.q || 1), x1 - 34, y, { s: 8.8, a: "center" }); P.t(S((+it.q || 1) * (+it.p || 0)), x1 - 2.5, y, { s: 8.8, a: "right" });
      const fin = y + (ls.length - 1) * 4 + ((+it.q || 1) > 1 ? 4 : 0) + 2.4;
      doc.setDrawColor(...CLARO); doc.line(x0, fin, x1, fin); y = fin + 5.2;
    });
    // totales
    y = P.need(y + 2, 30);
    doc.setDrawColor(...INK); doc.setLineWidth(.5); doc.line(x1 - 62, y, x1, y); doc.setLineWidth(.2);
    y += 6; P.t("Total", x1 - 62, y, { b: 1, s: 11 }); P.t(S(r.total), x1, y, { b: 1, s: 11, a: "right" });
    if (!r.presupuesto) (r.pagos || []).forEach(p => { y += 4.6; P.t(`Pago ${p.metodo || ""} · ${fmt(p.fecha)}`, x1 - 62, y, { s: 7.4, c: GRIS }); P.t(S(p.monto), x1, y, { s: 7.4, c: GRIS, a: "right" }); });
    if (!r.presupuesto) { y += 5.4; P.t("Pagado", x1 - 62, y, { s: 9 }); P.t(S(r.pagado), x1, y, { b: 1, s: 9, a: "right" }); }
    y += 5.4;
    if (r.presupuesto) P.t("Puedes pagarlo en cuotas sin intereses.", x1, y, { s: 8, c: GRIS, a: "right" });
    else if (r.saldo > 0) { P.t("Saldo pendiente", x1 - 62, y, { b: 1, s: 9, c: [220, 38, 38] }); P.t(S(r.saldo), x1, y, { b: 1, s: 9, c: [220, 38, 38], a: "right" }); }
    else { P.t("Estado", x1 - 62, y, { s: 9 }); P.t("CANCELADO", x1, y, { b: 1, s: 9, c: [25, 160, 110], a: "right" }); }
    if (r.anulado) { doc.setTextColor(239, 68, 68); doc.setFont("helvetica", "bold"); doc.setFontSize(44); doc.text("ANULADO", P.W / 2, P.H / 2, { align: "center", angle: 25 }); }
    P.y = y;
    pie(P, [{ s: neg.pie || "¡Gracias por confiar en nosotros!", c: INK, size: 8 }, ...(r.code ? [{ s: `Revisa tus pagos e historial con tu código ${r.code}${neg.web ? " en " + neg.web : ""}` }] : []), { s: r.presupuesto ? "Presupuesto referencial: puede variar según la evolución del tratamiento." : "Comprobante interno de pago. No es boleta ni factura electrónica.", size: 6.4 }]);
    doc.setFillColor(...col); doc.rect(0, P.H - 2.5, P.W, 2.5, "F");
    doc.save(`${r.archivo ? archivo(r.archivo) : "Recibo-" + archivo(r.num)}.pdf`);
  }

  /* ---------------- RECETA ---------------- */
  async function receta(r) {
    const J = await lib(), P = base(J), { doc, x0, x1 } = P, neg = r.neg || {}, col = rgb(neg.color);
    let y = cabecera(P, neg, r.titulo || "RECETA", fmt(r.fecha));
    const m = r.mascota || {};
    y = datos(P, y, r.campos || [["Mascota", m.nombre], ["Especie / raza", [m.especie, m.raza].filter(Boolean).join(" · ")], ["Peso", m.peso], ["Edad", m.edad], ["Dueño(a)", r.dueno], ["Código", r.code], ["Atención", r.servicio], ["Doctor(a)", r.vet]]);
    if (r.diagnostico) { y = P.need(y + 1, 12); P.t("DIAGNÓSTICO", x0, y, { b: 1, s: 6.8, c: GRIS }); y += 4; P.wrap(r.diagnostico, x1 - x0, 8.8).forEach(l => { y = P.need(y, 5); P.t(l, x0, y, { s: 8.8 }); y += 4; }); y += 2; }
    // Rp.
    y = P.need(y + 1, 14);
    P.t("Rp.", x0, y + 1, { b: 1, i: 1, s: 15, c: col }); P.t(r.rpTitulo || "Medicamentos para la casa", x0 + 12, y, { b: 1, s: 9.5 }); y += 7;
    (r.meds || []).filter(x => x.n).forEach((x, i) => {
      const det = [x.dosis && "Dosis: " + x.dosis, x.cada && "Cada " + x.cada, x.dias && "Por " + x.dias + (/^\d+$/.test(String(x.dias).trim()) ? " días" : "")].filter(Boolean).join("   ·   ");
      const ln = P.wrap(x.n, x1 - x0 - 10, 9.5), ld = det ? P.wrap(det, x1 - x0 - 10, 8) : [];
      y = P.need(y, ln.length * 4.4 + ld.length * 3.8 + 5);
      doc.setFillColor(...col); doc.circle(x0 + 2.6, y - 1.2, 2.6, "F"); P.t(String(i + 1), x0 + 2.6, y - .1, { b: 1, s: 7, c: [255, 255, 255], a: "center" });
      ln.forEach((l, k) => P.t(l, x0 + 8, y + k * 4.4, { b: 1, s: 9.5 })); y += ln.length * 4.4;
      ld.forEach(l => { P.t(l, x0 + 8, y, { s: 8, c: GRIS }); y += 3.8; });
      y += 3;
    });
    if (!(r.meds || []).some(x => x.n)) { P.t(r.sinMeds || "Sin medicamentos recetados.", x0 + 8, y, { s: 8.5, c: GRIS, i: 1 }); y += 6; }
    if (r.ind) {
      const ls = P.wrap(r.ind, x1 - x0 - 8, 8.6); y = P.need(y + 1, ls.length * 4 + 12);
      doc.setFillColor(...CLARO); doc.roundedRect(x0, y, x1 - x0, ls.length * 4 + 9, 2, 2, "F");
      P.t("INDICACIONES", x0 + 4, y + 5, { b: 1, s: 6.8, c: GRIS }); ls.forEach((l, k) => P.t(l, x0 + 4, y + 9.5 + k * 4, { s: 8.6 })); y += ls.length * 4 + 13;
    }
    if (r.control) { y = P.need(y, 8); P.t(`Próximo control: ${fmt(r.control)}${r.controlMotivo ? " · " + r.controlMotivo : ""}`, x0, y, { b: 1, s: 8.8, c: col }); y += 7; }
    // firma
    y = P.need(y + 10, 18);
    doc.setDrawColor(...GRIS); doc.line(x1 - 58, y, x1, y);
    P.t(r.vet || r.firma || "Médico veterinario", x1 - 29, y + 4.2, { b: 1, s: 8.4, a: "center" }); P.t(r.firma || "Médico veterinario", x1 - 29, y + 7.8, { s: 7, c: GRIS, a: "center" });
    P.y = y + 8;
    pie(P, [{ s: `Receta emitida por ${neg.razon || neg.nombre || ""}${neg.tel ? " · " + neg.tel : ""}` }, { s: r.aviso || "Ante cualquier reacción, comunícate con tu veterinario.", size: 6.6 }]);
    doc.setFillColor(...col); doc.rect(0, P.H - 2.5, P.W, 2.5, "F");
    doc.save(`Receta-${archivo(m.nombre || r.paciente || "paciente")}-${iso(r.fecha)}.pdf`);
  }

  /* ---------------- CONSTANCIA DE ATENCIÓN ---------------- */
  async function constancia(r) {
    const J = await lib(), P = base(J), { doc, x0, x1 } = P, neg = r.neg || {}, col = rgb(neg.color);
    let y = cabecera(P, neg, r.titulo || "CONSTANCIA", fmt(r.fecha));
    y = datos(P, y, r.campos || []);
    y = P.need(y + 4, 20);
    P.t(r.subtitulo || "CONSTANCIA DE ATENCIÓN", (x0 + x1) / 2, y, { b: 1, s: 11, c: col, a: "center" }); y += 9;
    String(r.texto || "").split(/\n+/).filter(Boolean).forEach(par => {
      P.wrap(par, x1 - x0, 9.4).forEach(l => { y = P.need(y, 5.4); P.t(l, x0, y, { s: 9.4 }); y += 5.2; }); y += 3;
    });
    P.t(`Lima, ${fmt(r.fecha)}`, x1, y + 2, { s: 8.8, c: GRIS, a: "right" });
    y = P.need(y + 22, 18);
    doc.setDrawColor(...GRIS); doc.line(x1 - 58, y, x1, y);
    P.t(r.vet || neg.nombre || "", x1 - 29, y + 4.2, { b: 1, s: 8.4, a: "center" }); P.t(r.firma || "Profesional tratante", x1 - 29, y + 7.8, { s: 7, c: GRIS, a: "center" });
    P.y = y + 8;
    pie(P, [{ s: `Emitida por ${neg.razon || neg.nombre || ""}${neg.tel ? " · " + neg.tel : ""}` }, { s: r.aviso || "Documento confidencial. No contiene información clínica.", size: 6.6 }]);
    doc.setFillColor(...col); doc.rect(0, P.H - 2.5, P.W, 2.5, "F");
    doc.save(`Constancia-${archivo(r.paciente || "paciente")}-${iso(r.fecha)}.pdf`);
  }

  /* ---------------- CONSENTIMIENTO INFORMADO ---------------- */
  async function consentimiento(r) {
    const J = await lib(), P = base(J), { doc, x0, x1 } = P, neg = r.neg || {}, col = rgb(neg.color);
    let y = cabecera(P, neg, "CONSENTIMIENTO", fmt(r.fecha));
    y = datos(P, y, r.campos || []);
    y = P.need(y + 2, 14);
    P.t(r.subtitulo || "CONSENTIMIENTO INFORMADO PARA LA ATENCIÓN", (x0 + x1) / 2, y, { b: 1, s: 10, c: col, a: "center" }); y += 7;
    String(r.texto || "").split(/\n+/).filter(Boolean).forEach(par => {
      P.wrap(par, x1 - x0, 8.4).forEach(l => { y = P.need(y, 4.6); P.t(l, x0, y, { s: 8.4 }); y += 4.2; }); y += 2.2;
    });
    y = P.need(y + 4, 34);
    if (r.firma && /^data:image\/png/.test(r.firma)) { try { doc.addImage(r.firma, "PNG", x1 - 60, y, 58, 22); } catch (e) {} }
    y += 23; doc.setDrawColor(...GRIS); doc.line(x1 - 62, y, x1, y);
    P.t(r.firmante || r.paciente || "", x1 - 31, y + 4.2, { b: 1, s: 8.2, a: "center" });
    P.t(r.firmanteDoc ? "DNI " + r.firmanteDoc : "Firma del paciente o apoderado", x1 - 31, y + 7.8, { s: 7, c: GRIS, a: "center" });
    P.t(`Firmado el ${fmt(r.fecha)}${r.hora ? " a las " + r.hora + " h" : ""}`, x0, y + 4.2, { s: 7.4, c: GRIS });
    P.y = y + 10;
    pie(P, [{ s: `${neg.razon || neg.nombre || ""}${neg.dir ? " · " + neg.dir : ""}` }, { s: "Documento confidencial · se guarda en la historia del paciente.", size: 6.6 }]);
    doc.setFillColor(...col); doc.rect(0, P.H - 2.5, P.W, 2.5, "F");
    doc.save(`Consentimiento-${archivo(r.paciente || "paciente")}-${iso(r.fecha)}.pdf`);
  }

  window.PDFV = { recibo, receta, constancia, consentimiento, num, cargar: lib };
})();
