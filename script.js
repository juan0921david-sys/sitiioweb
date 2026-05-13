/* MENU MOBILE */
(function () {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    });
  });
})();

/* REVEAL ON SCROLL */
(function () {
  const items = document.querySelectorAll(".reveal-up");
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 40, 240)}ms`;
    observer.observe(item);
  });
})();

/* TOAST NOTIFICATIONS */
(function () {
  const container = document.createElement("div");
  container.className = "toast-container";
  document.body.appendChild(container);

  window.showToast = function (msg, type = "info", duration = 3200) {
    const icons = { success: "✓", error: "✕", info: "💬" };

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.style.setProperty("--toast-duration", `${duration / 1000}s`);
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || "💬"}</span>
      <span class="toast-msg">${msg}</span>
      <button class="toast-close" aria-label="Cerrar">✕</button>
    `;

    container.appendChild(toast);

    toast.querySelector(".toast-close").addEventListener("click", () => removeToast(toast));

    const timer = setTimeout(() => removeToast(toast), duration);

    toast.addEventListener("click", () => {
      clearTimeout(timer);
      removeToast(toast);
    });
  };

  function removeToast(toast) {
    if (toast.classList.contains("removing")) return;
    toast.classList.add("removing");
    toast.addEventListener("animationend", () => toast.remove(), { once: true });
  }
})();

/* CARRUSEL DESKTOP GALERIA DE PRODUCTOS */
(function () {
  const slides = Array.from(document.querySelectorAll(".gal-slide"));
  const track = document.getElementById("galTrack");
  const dotsWrap = document.getElementById("galDots");
  const prevBtn = document.getElementById("galPrev");
  const nextBtn = document.getElementById("galNext");
  const currentEl = document.getElementById("galCurrent");
  const totalEl = document.getElementById("galTotal");
  const wrap = document.querySelector(".gal-track-wrap");

  if (!slides.length || !track || !wrap || !prevBtn || !nextBtn) return;

  const TOTAL = slides.length;
  let current = 0;
  let autoTimer = null;
  let slideWidth = wrap.clientWidth;

  totalEl.textContent = TOTAL;

  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "gal-dot" + (i === 0 ? " on" : "");
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function updateUI() {
    slides.forEach((slide, i) => slide.classList.toggle("active", i === current));
    Array.from(dotsWrap.children).forEach((dot, i) => dot.classList.toggle("on", i === current));
    currentEl.textContent = current + 1;
  }

  function setPosition(animated = true) {
    track.style.transition = animated
      ? "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)"
      : "none";
    track.style.transform = `translate3d(${-current * slideWidth}px, 0, 0)`;
  }

  function measure() {
    slideWidth = wrap.clientWidth;
    setPosition(false);
  }

  function goTo(index) {
    current = (index + TOTAL) % TOTAL;
    updateUI();
    setPosition(true);
    restartAuto();
  }

  function restartAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));
  window.addEventListener("resize", measure);

  updateUI();
  measure();
  restartAuto();
})();

/* PALETA DE COLORES Y CONFIGURACIÓN DE MODELOS */
const colores = [
  { nombre: "Beige", valor: "#d7c2a3", disponible: false },
  { nombre: "Neon husky", valor: "#d6ff3f", disponible: true },
  { nombre: "Naranja KTM", valor: "#ff6600", disponible: true },
  { nombre: "Negro azabache", valor: "#111111", disponible: true },
  { nombre: "Púrpura Yamaha", valor: "#4c2b87", disponible: true },
  { nombre: "Rosado pink", valor: "#ff4fa3", disponible: true },
  { nombre: "Rojo Honda", valor: "#d90429", disponible: true },
  { nombre: "Azul Husqvarna", valor: "#2f6cff", disponible: true },
  { nombre: "Azul Yamaha", valor: "#0033a0", disponible: true },
  { nombre: "Verde KX", valor: "#29a329", disponible: true },
  { nombre: "Gris nube 30%", valor: "#b8b8b8", disponible: true },
  { nombre: "Blanco", valor: "#f3f3f3", disponible: true },
  { nombre: "Azul RM", valor: "#1b52d6", disponible: true }
];

const INDICE_COLOR_DISPONIBLE_POR_DEFECTO = colores.findIndex(c => c.disponible);
const RUTA_IMGS = "img/";

const modelosConfig = {
  "Ribeed": {
    outline: RUTA_IMGS + "outlineribeed.png",
    zonas: [
      { id: "base", label: "Base", layer: "layerBase", mask: RUTA_IMGS + "baseribeed.png" },
      { id: "lineas", label: "Ribetes", layer: "layerLineas", mask: RUTA_IMGS + "lineasribeed.png" },
      { id: "laterales", label: "Laterales", layer: "layerLaterales", mask: RUTA_IMGS + "lateralribeed.png" }
    ]
  },

  "Universal": {
    outline: RUTA_IMGS + "outlineuniversal.PNG",
    zonas: [
      { id: "base", label: "Base", layer: "layerBase", mask: RUTA_IMGS + "baseuniversal.PNG" },
      { id: "lineas", label: "Ribetes", layer: "layerLineas", mask: RUTA_IMGS + "lineasuniversal.png" }
    ]
  },

  "Factory": {
    outline: RUTA_IMGS + "outlinefactory.png",
    zonas: [
      { id: "base", label: "Base", layer: "layerBase", mask: RUTA_IMGS + "basefactory.png" },
      { id: "lineas", label: "Ribetes", layer: "layerLineas", mask: RUTA_IMGS + "lineasfactory.png" }
    ]
  }
};

const modelosData = {
  "Ribeed": {
    features: [
      "Máximo grip y mejor control gracias a sus ribetes horizontales.",
      "Diseño con 6 o 7 correas, según el modelo de moto.",
      "Ideal para enduro y motocross, con costuras en distintos colores y hecho a la medida."
    ]
  },
  "Universal": {
    features: [
      "Diseño funcional y resistente.",
      "Adaptación a mayoría de marcas y modelos desde 2012 hasta 2024.",
      "Ofrece buen agarre y un acabado vulcanizado 99.9% impermeable."
    ]
  },
  "Factory": {
    features: [
      "Más agarre, más estilo y una apariencia más deportiva.",
      "Ribetes horizontales en costura.",
      "Su ajuste adaptable lo convierte en una opción llamativa y de gran desempeño."
    ]
  }
};

/* ============================================================
   HELPER: scroll suave al panel de info del modelo (desktop)
   ============================================================ */
function scrollToModelPanel() {
  const anchor = document.getElementById("modeloPanelAnchor");
  if (!anchor) return;
  setTimeout(() => {
    anchor.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 80);
}

/* ============================================================
   HELPER: actualizar panel desktop — todos los modelos layout normal
   ============================================================ */
function actualizarPanelDesktop(tipo, features) {
  const panel = document.getElementById("modeloPanelAnchor");
  if (!panel) return;

  panel.innerHTML = `
    <span class="tag" id="panelTag">${tipo}</span>
    <h3 id="panelTitle">${tipo}</h3>
    <ul class="modelo-lista" id="panelList">
      ${features.map(f => `<li>${f.trim()}</li>`).join("")}
    </ul>
    <button class="btn-sel" id="panelSelectBtn" data-type="${tipo}">Seleccionar modelo</button>
  `;

  const btn = document.getElementById("panelSelectBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      seleccionarModelo(btn.dataset.type);
      document.getElementById("configurar").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

/* ESTADO GLOBAL Y ELEMENTOS DEL DOM */
const estado = { tipo: "", colores: {} };
const pedido = [];

const allLayerIds = [
  "layerBase",
  "layerLine1",
  "layerLine2",
  "layerLine3",
  "layerLine4",
  "layerLine5",
  "layerLineas",
  "layerLaterales"
];

const previewOutline = document.getElementById("previewOutline");
const previewEmpty = document.getElementById("previewEmpty");
const inputCantidad = document.getElementById("cantidad");
const pedidoLista = document.getElementById("pedidoLista");
const pedidoCount = document.getElementById("pedidoCount");
const btnAgregarPedido = document.getElementById("btnAgregarPedido");
const btnLimpiarConfig = document.getElementById("btnLimpiarConfig");
const tipoSelect = document.getElementById("tipoSelect");

/* PREVIEW DEL CONFIGURADOR */
function setPreviewEmptyState(isEmpty) {
  if (isEmpty) {
    previewEmpty.classList.remove("hidden");
    previewOutline.style.display = "none";
    previewOutline.src = "";
  } else {
    previewEmpty.classList.add("hidden");
    previewOutline.style.display = "block";
  }
}

function resetPreviewLayers() {
  allLayerIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.backgroundColor = "transparent";
    el.style.background = "transparent";
    el.style.webkitMaskImage = "none";
    el.style.maskImage = "none";
    el.style.webkitMask = "none";
    el.style.mask = "none";
  });
}

function ensureDefaultsForModel(tipo) {
  const model = modelosConfig[tipo];
  if (!model) return;

  model.zonas.forEach(zona => {
    const idxActual = estado.colores[zona.id];
    if (typeof idxActual !== "number" || !colores[idxActual] || !colores[idxActual].disponible) {
      estado.colores[zona.id] = INDICE_COLOR_DISPONIBLE_POR_DEFECTO;
    }
  });
}

function aplicarPreview() {
  resetPreviewLayers();
  const model = modelosConfig[estado.tipo];

  if (!model) {
    setPreviewEmptyState(true);
    return;
  }

  setPreviewEmptyState(false);
  previewOutline.src = model.outline;

  model.zonas.forEach(zona => {
    const el = document.getElementById(zona.layer);
    if (!el) return;

    const color = colores[estado.colores[zona.id] ?? INDICE_COLOR_DISPONIBLE_POR_DEFECTO].valor;
    el.style.background = color;
    el.style.backgroundColor = color;
    el.style.webkitMaskImage = `url("${zona.mask}")`;
    el.style.maskImage = `url("${zona.mask}")`;
    el.style.webkitMaskRepeat = "no-repeat";
    el.style.maskRepeat = "no-repeat";
    el.style.webkitMaskPosition = "center";
    el.style.maskPosition = "center";
    el.style.webkitMaskSize = "contain";
    el.style.maskSize = "contain";
  });
}

function actualizarResumen() {
  const resumen = document.getElementById("resumenColores");
  if (!resumen || !estado.tipo || !modelosConfig[estado.tipo]) return;

  resumen.innerHTML = modelosConfig[estado.tipo].zonas.map(zona => {
    const colorObj = colores[estado.colores[zona.id] ?? INDICE_COLOR_DISPONIBLE_POR_DEFECTO];
    return `<p><span class="resumen-dot" style="background:${colorObj.valor}"></span>${zona.label}: <strong>${colorObj.nombre}</strong></p>`;
  }).join("");
}

function actualizarNotaDisponibilidad(zonaId) {
  const note = document.querySelector(`.color-note[data-note-zona="${zonaId}"]`);
  const select = document.querySelector(`.color-select[data-zona="${zonaId}"]`);
  if (!note || !select) return;

  const colorSeleccionado = colores[parseInt(select.value, 10)];
  note.classList.toggle("hidden", !colorSeleccionado || colorSeleccionado.disponible);
}

function setColor(zonaId, idx) {
  const color = colores[idx];
  if (!color) return;

  if (!color.disponible) {
    const select = document.querySelector(`.color-select[data-zona="${zonaId}"]`);
    if (select) select.value = String(estado.colores[zonaId] ?? INDICE_COLOR_DISPONIBLE_POR_DEFECTO);
    actualizarNotaDisponibilidad(zonaId);
    return;
  }

  estado.colores[zonaId] = idx;
  aplicarPreview();
  actualizarResumen();

  const select = document.querySelector(`.color-select[data-zona="${zonaId}"]`);
  if (select) select.value = String(idx);

  const chip = document.querySelector(`.color-chip[data-chip-zona="${zonaId}"]`);
  if (chip) chip.style.background = colores[idx].valor;

  const text = document.querySelector(`.color-chip-text[data-text-zona="${zonaId}"]`);
  if (text) text.textContent = colores[idx].nombre;

  actualizarNotaDisponibilidad(zonaId);
}

function renderOpciones() {
  const cont = document.getElementById("opcionesExtra");
  const model = modelosConfig[estado.tipo];
  const configGrid = document.querySelector(".config-grid");
  const previewStage = document.getElementById("previewStage");
  const universalBadge = document.getElementById("universalBadge");

  // Limpiar estado previo
  if (configGrid) configGrid.classList.remove("ribeed-mode");
  if (universalBadge) universalBadge.remove();

  if (tipoSelect) tipoSelect.value = estado.tipo || "";

  if (!model) {
    cont.innerHTML = `<p class="selecciona-modelo-msg">👆 Selecciona un modelo para configurar colores.</p>`;
    return;
  }

  ensureDefaultsForModel(estado.tipo);

  // Ribeed → config-grid horizontal (preview más ancho a la izquierda)
  if (estado.tipo === "Ribeed" && configGrid) {
    configGrid.classList.add("ribeed-mode");
  }

  // Universal → badge flotante encima del preview-stage
  if (estado.tipo === "Universal" && previewStage) {
    const badge = document.createElement("div");
    badge.id = "universalBadge";
    badge.className = "universal-badge";
    badge.textContent = "El borde blanco no hace parte del diseño final";
    previewStage.appendChild(badge);
  }

  let html = `<div class="config-model-title">${estado.tipo}</div>`;

  model.zonas.forEach(zona => {
    const idxActual = estado.colores[zona.id] ?? INDICE_COLOR_DISPONIBLE_POR_DEFECTO;
    const colorActual = colores[idxActual];

    html += `
      <div class="zona-bloque">
        <span class="select-label">${zona.label}</span>
        <div class="color-select-wrap">
          <select class="color-select" data-zona="${zona.id}">
            ${colores.map((color, i) =>
              `<option value="${i}" ${i === idxActual ? "selected" : ""}>${color.nombre}${!color.disponible ? " (No disponible)" : ""}</option>`
            ).join("")}
          </select>
        </div>
        <div class="color-chip-line">
          <span class="color-chip" data-chip-zona="${zona.id}" style="background:${colorActual.valor}"></span>
          <span class="color-chip-text" data-text-zona="${zona.id}">${colorActual.nombre}</span>
        </div>
        <div class="color-note hidden" data-note-zona="${zona.id}">El color Beige no está disponible en este momento.</div>
      </div>
    `;
  });

  html += `<div class="resumen-colores" id="resumenColores"></div>`;
  cont.innerHTML = html;

  cont.querySelectorAll(".color-select").forEach(select => {
    select.addEventListener("change", () => setColor(select.dataset.zona, parseInt(select.value, 10)));
  });

  actualizarResumen();
  aplicarPreview();
  model.zonas.forEach(zona => actualizarNotaDisponibilidad(zona.id));
}

function seleccionarModelo(tipo) {
  estado.tipo = tipo;
  renderOpciones();
}

function limpiarConfiguracion() {
  estado.tipo = "";
  estado.colores = {};

  if (tipoSelect) tipoSelect.value = "";

  document.getElementById("moto").value = "";
  document.getElementById("cantidad").value = "";
  document.getElementById("opcionesExtra").innerHTML =
    `<p class="selecciona-modelo-msg">👆 Selecciona un modelo para configurar colores.</p>`;

  // Limpiar clases y badges especiales
  const configGrid = document.querySelector(".config-grid");
  if (configGrid) configGrid.classList.remove("ribeed-mode");
  const universalBadge = document.getElementById("universalBadge");
  if (universalBadge) universalBadge.remove();

  setPreviewEmptyState(true);
  resetPreviewLayers();
}

/* PEDIDO */
function obtenerCantidadValida() {
  const valor = inputCantidad.value.trim();
  if (!valor || !/^\d+$/.test(valor)) return null;
  const numero = parseInt(valor, 10);
  return (Number.isNaN(numero) || numero <= 0) ? null : numero;
}

function construirColoresItem(tipo) {
  return modelosConfig[tipo].zonas.map(zona => {
    const c = colores[estado.colores[zona.id] ?? INDICE_COLOR_DISPONIBLE_POR_DEFECTO];
    return { zonaId: zona.id, label: zona.label, nombre: c.nombre, valor: c.valor };
  });
}

function renderPedido() {
  pedidoCount.textContent = `${pedido.length} ${pedido.length === 1 ? "ítem" : "ítems"}`;

  if (!pedido.length) {
    pedidoLista.innerHTML = `<p class="pedido-vacio">Aún no has agregado productos al pedido.</p>`;
    return;
  }

  pedidoLista.innerHTML = pedido.map((item, index) => `
    <div class="pedido-item">
      <div class="pedido-item-top">
        <div>
          <div class="pedido-item-title">${index + 1}. ${item.modelo}</div>
          <div class="pedido-item-sub">${item.moto}</div>
        </div>
        <button class="btn-eliminar-item" data-index="${index}">Eliminar</button>
      </div>
      <div class="pedido-item-detalle">
        <div><strong>Cantidad:</strong> ${item.cantidad}</div>
      </div>
      <ul class="pedido-colores">
        ${item.colores.map(color => `<li>${color.label}: ${color.nombre}</li>`).join("")}
      </ul>
    </div>
  `).join("");

  pedidoLista.querySelectorAll(".btn-eliminar-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.index, 10);
      pedido.splice(idx, 1);
      renderPedido();
      showToast("Ítem eliminado del pedido.", "info", 2500);
    });
  });
}

function agregarAlPedido() {
  const nombre = document.getElementById("nombre").value.trim();
  const moto = document.getElementById("moto").value.trim();
  const cantidad = obtenerCantidadValida();

  if (!estado.tipo) {
    showToast("Primero selecciona un modelo.", "error");
    if (tipoSelect) tipoSelect.focus();
    return;
  }

  if (!nombre) {
    showToast("Escribe tu nombre.", "error");
    document.getElementById("nombre").focus();
    return;
  }

  if (!moto) {
    showToast("Escribe la moto de este ítem.", "error");
    document.getElementById("moto").focus();
    return;
  }

  if (cantidad === null) {
    showToast("La cantidad debe ser un número mayor que 0.", "error");
    document.getElementById("cantidad").focus();
    return;
  }

  pedido.push({
    modelo: estado.tipo,
    moto,
    cantidad,
    colores: construirColoresItem(estado.tipo)
  });

  renderPedido();
  document.getElementById("moto").value = "";
  document.getElementById("cantidad").value = "";
  showToast(`✓ ${estado.tipo} agregado al pedido.`, "success", 3000);
}

function enviarPedidoCompleto() {
  const nombre = document.getElementById("nombre").value.trim();

  if (!nombre) {
    showToast("Escribe tu nombre.", "error");
    document.getElementById("nombre").focus();
    return;
  }

  if (!pedido.length) {
    showToast("Agrega al menos un producto al pedido.", "error");
    return;
  }

  const bloques = pedido.map((item, index) => {
    const coloresTexto = item.colores.map(c => `   - ${c.label}: ${c.nombre}`).join("\n");
    return `${index + 1}) Modelo: ${item.modelo}\n   Moto: ${item.moto}\n   Cantidad: ${item.cantidad}\n   Colores:\n${coloresTexto}`;
  }).join("\n\n");

  const msg = `Hola DG1L! 👋 Quiero cotizar este pedido:\n\nNombre: ${nombre}\n\n${bloques}`;

  showToast("¡Pedido enviado! Abriendo WhatsApp...", "success", 3500);
  setTimeout(() => {
    window.open("https://wa.me/573202034598?text=" + encodeURIComponent(msg), "_blank");
  }, 600);
}

/* VALIDACIÓN DE CANTIDAD */
if (inputCantidad) {
  inputCantidad.addEventListener("input", () => {
    inputCantidad.value = inputCantidad.value.replace(/[^0-9]/g, "");
    if (inputCantidad.value) {
      const n = parseInt(inputCantidad.value, 10);
      if (n < 1) inputCantidad.value = "1";
    }
  });

  inputCantidad.addEventListener("keydown", e => {
    if (["-", "+", "e", "E", "."].includes(e.key)) e.preventDefault();
  });

  inputCantidad.addEventListener("paste", e => {
    e.preventDefault();
    const texto = (e.clipboardData || window.clipboardData).getData("text");
    const soloNumeros = texto.replace(/[^0-9]/g, "");
    inputCantidad.value = soloNumeros ? String(Math.max(1, parseInt(soloNumeros, 10))) : "";
  });
}

/* SELECT DE MODELO EN COTIZADOR */
if (tipoSelect) {
  tipoSelect.addEventListener("change", () => {
    const tipo = tipoSelect.value;
    if (tipo) {
      seleccionarModelo(tipo);
    } else {
      estado.tipo = "";
      estado.colores = {};
      document.getElementById("opcionesExtra").innerHTML =
        `<p class="selecciona-modelo-msg">👆 Selecciona un modelo para configurar colores.</p>`;
      setPreviewEmptyState(true);
      resetPreviewLayers();
    }
  });
}

/* ============================================================
   CARRUSEL 3D DESKTOP — MODELOS
   Al hacer click en una card → scroll al panel de info
   ============================================================ */
(function () {
  const scene = document.getElementById("scene3d");
  const carousel = document.getElementById("carousel3d");
  const cards3d = Array.from(document.querySelectorAll(".c-card"));
  const ndots = document.querySelectorAll("#navDots .ndot");

  if (!scene || !carousel || !cards3d.length) return;

  const TOTAL = cards3d.length;
  const STEP = 360 / TOTAL;

  let rotY = 0;
  let target = 0;
  let pointerDown = false;
  let startX = 0;
  let startRot = 0;
  let dragMoved = 0;
  let currentIndex = 0;

  const lerp = (a, b, t) => a + (b - a) * t;
  const normalizeAngle = a => ((a % 360) + 360) % 360;
  const getNearestIndex = angle => Math.round(normalizeAngle(-angle) / STEP) % TOTAL;

  function renderPanel(index, doScroll) {
    const card = cards3d[index];
    const features = (card.dataset.features || "").split("|").filter(Boolean);
    const tipo = card.dataset.type;

    actualizarPanelDesktop(tipo, features);

    cards3d.forEach((c, i) => c.classList.toggle("is-focus", i === index));
    ndots.forEach((d, i) => d.classList.toggle("on", i === index));
    currentIndex = index;

    // Solo scroll si fue click explícito del usuario
    if (doScroll) {
      scrollToModelPanel();
    }
  }

  function goToIndex(index, doScroll) {
    target = -(index * STEP);
    renderPanel(index, doScroll);
  }

  (function tick() {
    rotY = lerp(rotY, target, 0.1);
    carousel.style.transform = `rotateY(${rotY}deg)`;

    const nearest = getNearestIndex(rotY);
    if (nearest !== currentIndex && !pointerDown) renderPanel(nearest, false);

    requestAnimationFrame(tick);
  })();

  const startDrag = clientX => {
    pointerDown = true;
    startX = clientX;
    startRot = target;
    dragMoved = 0;
  };

  const moveDrag = clientX => {
    if (!pointerDown) return;
    const dx = clientX - startX;
    dragMoved = Math.abs(dx);
    target = startRot + dx * 0.22;
  };

  const endDrag = () => {
    if (!pointerDown) return;
    pointerDown = false;
    goToIndex(getNearestIndex(target), false);
  };

  scene.addEventListener("mousedown", e => startDrag(e.clientX));
  window.addEventListener("mousemove", e => moveDrag(e.clientX));
  window.addEventListener("mouseup", endDrag);

  scene.addEventListener("touchstart", e => startDrag(e.touches[0].clientX), { passive: true });
  scene.addEventListener("touchmove", e => moveDrag(e.touches[0].clientX), { passive: true });
  scene.addEventListener("touchend", endDrag);

  // Click en card → enfocar Y hacer scroll al panel
  cards3d.forEach((card, index) => {
    card.addEventListener("click", () => {
      if (dragMoved > 10) return;
      goToIndex(index, true); // true = scroll al panel
    });
  });

  ndots.forEach(dot => {
    dot.addEventListener("click", () => goToIndex(parseInt(dot.dataset.i, 10), true));
  });

  renderPanel(0, false);
})();

/* ============================================================
   CARRUSEL 3D MOBILE — MODELOS
   ============================================================ */
(function () {
  const scene = document.getElementById("mobile3dScene");
  const cards = Array.from(document.querySelectorAll(".mobile3d-card"));
  const dots = Array.from(document.querySelectorAll("[data-m3dot]"));
  const infoTag = document.getElementById("mobile3dTag");
  const infoTitle = document.getElementById("mobile3dTitle");
  const infoList = document.getElementById("mobile3dList");
  const selectBtn = document.getElementById("mobile3dSelectBtn");

  if (!scene || !cards.length) return;

  const TOTAL = cards.length;
  let current = 0;
  let touchStartX = 0;
  let touchStartY = 0;
  let isDragging = false;
  let dragDx = 0;
  const modelKeys = ["Ribeed", "Universal", "Factory"];

  function getPosition(cardIdx, activeIdx) {
    let diff = cardIdx - activeIdx;
    if (diff > Math.floor(TOTAL / 2)) diff -= TOTAL;
    if (diff < -Math.floor(TOTAL / 2)) diff += TOTAL;
    return diff;
  }

  function applyPositions(activeIdx) {
    cards.forEach((card, i) => {
      const pos = getPosition(i, activeIdx);
      card.classList.remove("m3-active", "m3-left", "m3-right", "m3-hidden");

      if (pos === 0) card.classList.add("m3-active");
      else if (pos === 1 || (pos > 1 && TOTAL <= 3)) card.classList.add("m3-right");
      else if (pos === -1 || (pos < -1 && TOTAL <= 3)) card.classList.add("m3-left");
      else card.classList.add("m3-hidden");
    });
  }

  function updateInfo(idx) {
    const key = modelKeys[idx];
    const data = modelosData[key];
    if (!data) return;

    if (infoTag) infoTag.textContent = key;
    if (infoTitle) infoTitle.textContent = key;

    if (infoList) {
      let listHTML = data.features.map(f => `<li>${f}</li>`).join("");
      // Aviso Universal en mobile
      if (key === "Universal") {
        listHTML += `<li style="list-style:none;margin-top:8px;"><span class="universal-notice">El borde blanco no hace parte del diseño final</span></li>`;
      }
      infoList.innerHTML = listHTML;
    }

    if (selectBtn) selectBtn.dataset.type = key;

    dots.forEach((dot, i) => dot.classList.toggle("on", i === idx));
  }

  function goTo(idx) {
    current = ((idx % TOTAL) + TOTAL) % TOTAL;
    applyPositions(current);
    updateInfo(current);
  }

  function applyDragPreview(dx) {
    const ratio = Math.min(Math.abs(dx) / 60, 1);

    cards.forEach((card, i) => {
      const pos = getPosition(i, current);

      if (pos === 0) {
        card.style.transform = `translateX(${dx * 0.3}px) translateZ(0px) rotateY(${-dx * 0.04}deg) scale(${1 - ratio * 0.05})`;
        card.style.opacity = String(1 - ratio * 0.15);
      } else if (pos === 1) {
        const adv = dx < 0 ? ratio : 0;
        card.style.transform = `translateX(${110 - adv * 110}px) translateZ(${-100 + adv * 100}px) rotateY(${-28 + adv * 28}deg) scale(${0.82 + adv * 0.18})`;
        card.style.opacity = String(0.55 + adv * 0.45);
      } else if (pos === -1) {
        const adv = dx > 0 ? ratio : 0;
        card.style.transform = `translateX(${-110 + adv * 110}px) translateZ(${-100 + adv * 100}px) rotateY(${28 - adv * 28}deg) scale(${0.82 + adv * 0.18})`;
        card.style.opacity = String(0.55 + adv * 0.45);
      }
    });
  }

  function clearInlineTransforms() {
    cards.forEach(card => {
      card.style.transform = "";
      card.style.opacity = "";
    });
  }

  scene.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isDragging = true;
    dragDx = 0;
    scene.classList.add("is-dragging");
  }, { passive: true });

  scene.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    dragDx = e.touches[0].clientX - touchStartX;
    const dy = e.touches[0].clientY - touchStartY;

    if (Math.abs(dy) > Math.abs(dragDx) + 10) {
      isDragging = false;
      scene.classList.remove("is-dragging");
      clearInlineTransforms();
      return;
    }

    applyDragPreview(dragDx);
  }, { passive: true });

  scene.addEventListener("touchend", () => {
    if (!isDragging) return;

    isDragging = false;
    scene.classList.remove("is-dragging");
    clearInlineTransforms();

    if (dragDx < -50) goTo(current + 1);
    else if (dragDx > 50) goTo(current - 1);
    else applyPositions(current);

    dragDx = 0;
  });

  cards.forEach((card, i) => {
    card.addEventListener("click", () => {
      if (Math.abs(dragDx) > 8) return;
      if (i !== current) goTo(i);
    });
  });

  dots.forEach(dot => {
    dot.addEventListener("click", () => goTo(parseInt(dot.dataset.m3dot, 10)));
  });

  if (selectBtn) {
    selectBtn.addEventListener("click", () => {
      seleccionarModelo(selectBtn.dataset.type);
      document.getElementById("configurar").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  goTo(0);
})();

/* BOTÓN FLOTANTE WHATSAPP */
(function () {
  const fab = document.createElement("div");
  fab.className = "whatsapp-fab";
  fab.innerHTML = `
    <span class="whatsapp-fab-label">¡Contáctanos!</span>
    <a
      class="whatsapp-fab-btn"
      href="https://wa.me/573202034598?text=${encodeURIComponent("Hola D'Gil! 👋 Quiero más información sobre sus fundas.")}"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  `;
  document.body.appendChild(fab);

  let visible = false;
  window.addEventListener("scroll", () => {
    const shouldBeVisible = window.scrollY > 300;
    if (shouldBeVisible !== visible) {
      visible = shouldBeVisible;
      fab.classList.toggle("visible", visible);
    }
  }, { passive: true });
})();

/* EVENTOS GLOBALES */
btnAgregarPedido.addEventListener("click", agregarAlPedido);
btnLimpiarConfig.addEventListener("click", () => {
  limpiarConfiguracion();
  showToast("Configuración limpiada.", "info", 2200);
});

setPreviewEmptyState(true);
renderPedido();

document.getElementById("btnEnviar").addEventListener("click", enviarPedidoCompleto);
