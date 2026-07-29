const scriptURL =
  "https://script.google.com/macros/s/AKfycbxqi4sc_W3tj7JvqZPjoJrJTR_zwlWdxZpGNAr1TNUc_BwxEMD2vP6hGfpj-Y1K2zD9Ew/exec";

function mostrarPanel(nombre, event) {
  document
    .querySelectorAll(".panel")
    .forEach((p) => p.classList.remove("active"));

  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));

  document.getElementById("panel-" + nombre).classList.add("active");

  event.target.classList.add("active");
}

function cargarTodo() {
  cargarConfirmaciones();
  cargarMensajes();
}

function cargarConfirmaciones() {
  const lista = document.getElementById("lista-confirmaciones");

  lista.innerHTML = `<p class="cargando">Cargando...</p>`;

  fetch(`${scriptURL}?accion=obtenerConfirmaciones`)
    .then((res) => res.json())
    .then((data) => {
      if (!data.confirmaciones || data.confirmaciones.length === 0) {
        lista.innerHTML = `<p class="vacio">Aún no hay confirmaciones.</p>`;
        return;
      }

      const confirmaciones = data.confirmaciones;

      const totalSi = confirmaciones.filter((c) => c.respuesta === "SI").length;

      const totalNo = confirmaciones.filter((c) => c.respuesta === "NO").length;

      const totalPersonas = confirmaciones
        .filter((c) => c.respuesta === "SI")
        .reduce((sum, c) => sum + parseInt(c.personas || 0), 0);

      const totalDaniel = confirmaciones.filter(
        (c) => c.confirmo === "Daniel",
      ).length;

      const totalErika = confirmaciones.filter(
        (c) => c.confirmo === "Erika",
      ).length;

      document.getElementById("total-si").textContent = totalSi;
      document.getElementById("total-no").textContent = totalNo;
      document.getElementById("total-personas").textContent = totalPersonas;
      document.getElementById("total-daniel").textContent = totalDaniel;
      document.getElementById("total-erika").textContent = totalErika;

      lista.innerHTML = confirmaciones
        .map(
          (c) => `
                <div class="item-card">
                    <div class="item-card-top">
                        <span class="item-nombre">👤 ${c.nombre}</span>
                        <span class="${c.respuesta === "SI" ? "badge-si" : "badge-no"}">
                            ${c.respuesta === "SI" ? "✅ Sí va" : "❌ No va"}
                        </span>
                    </div>
                    <p class="item-detalle">
                        👥 ${c.personas} persona(s) · Con ${c.confirmo}
                    </p>
                    <p class="item-fecha">${c.fecha}</p>
                </div>
            `,
        )
        .join("");
    })
    .catch(() => {
      lista.innerHTML = `<p class="vacio">Error al cargar.</p>`;
    });
}

function cargarMensajes() {
  const lista = document.getElementById("lista-mensajes");

  lista.innerHTML = `<p class="cargando">Cargando...</p>`;

  fetch(`${scriptURL}?accion=obtenerMensajes`)
    .then((res) => res.json())
    .then((data) => {
      if (!data.mensajes || data.mensajes.length === 0) {
        lista.innerHTML = `<p class="vacio">Aún no hay mensajes. 💌</p>`;
        return;
      }

      lista.innerHTML = data.mensajes
        .map(
          (m) => `
                <div class="item-card">
                    <div class="item-card-top">
                        <span class="item-nombre">💛 ${m.nombre}</span>
                    </div>
                    <p class="mensaje-texto">"${m.mensaje}"</p>
                    <p class="item-fecha">${m.fecha}</p>
                </div>
            `,
        )
        .join("");
    })
    .catch(() => {
      lista.innerHTML = `<p class="vacio">Error al cargar.</p>`;
    });
}

cargarTodo();
