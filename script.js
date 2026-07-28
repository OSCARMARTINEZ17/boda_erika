// =====================================
// SOBRE DE BIENVENIDA
// =====================================

const openInvitation = document.getElementById("openInvitation");

const envelope = document.getElementById("envelope");

if (openInvitation && envelope) {
  openInvitation.addEventListener("click", () => {
    envelope.style.opacity = "0";

    setTimeout(() => {
      envelope.style.display = "none";
    }, 1000);

    const audioEl = document.getElementById("audio");

    if (audioEl) {
      audioEl.play().catch(() => {
        console.log("Autoplay bloqueado por el navegador");
      });
    }
  });
}

// =====================================
// CONTADOR REGRESIVO
// =====================================

const weddingDate = new Date("October 11, 2026 16:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();

  const distance = weddingDate - now;

  const daysEl = document.getElementById("days");

  const hoursEl = document.getElementById("hours");

  const minutesEl = document.getElementById("minutes");

  const secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  if (distance <= 0) {
    daysEl.textContent = 0;
    hoursEl.textContent = 0;
    minutesEl.textContent = 0;
    secondsEl.textContent = 0;

    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );

  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// =====================================
// INVITACIÓN PERSONALIZADA
// =====================================

function getParam(nombre) {
  const params = new URLSearchParams(window.location.search);
  return params.get(nombre);
}

const nombreInvitado = getParam("nombre");
const personasInvitado = getParam("personas");
const paraQuien = getParam("para");

if (nombreInvitado) {
  const confirmSection = document.querySelector(".confirm-section");

  if (confirmSection) {
    const yaConfirmo = localStorage.getItem(
      "confirmo_" + encodeURIComponent(nombreInvitado),
    );

    if (yaConfirmo) {
      if (yaConfirmo === "si") {
        confirmSection.innerHTML = `
                    <div class="invitacion-personal">
                        <span style="font-size:3.5rem;display:block;margin-bottom:1rem;">✅</span>
                        <h2 class="section-title">Ya confirmaste</h2>
                        <p class="inv-saludo">
                            Hola de nuevo, <strong>${nombreInvitado}</strong> 👋
                        </p>
                        <p class="inv-texto">
                            Ya registramos tu asistencia.<br>
                            ¡Te esperamos el <strong>11 de Octubre</strong>! ❤️
                        </p>
                    </div>
                `;
      } else {
        confirmSection.innerHTML = `
                    <div class="invitacion-personal">
                        <span style="font-size:3.5rem;display:block;margin-bottom:1rem;">📋</span>
                        <h2 class="section-title">Ya respondiste</h2>
                        <p class="inv-saludo">
                            Hola de nuevo, <strong>${nombreInvitado}</strong> 👋
                        </p>
                        <p class="inv-texto">
                            Ya registramos que no podrás asistir.<br>
                            ¡Gracias por avisarnos! ❤️
                        </p>
                    </div>
                `;
      }
    } else {
      confirmSection.innerHTML = `
                <h2 class="section-title">Confirmación de Asistencia</h2>
                <div class="invitacion-personal">
                    <p class="inv-saludo">Hola, <strong>${nombreInvitado}</strong> 👋</p>
                    <p class="inv-texto">
                        Esta invitación es para
                        <strong>
                            ${personasInvitado}
                            ${personasInvitado == 1 ? "persona" : "personas"}
                        </strong>.
                    </p>
                    <p class="inv-pregunta">¿Confirmas tu asistencia?</p>
                    <div class="inv-btns">
                        <button class="inv-btn-si" onclick="confirmarPersonalizado('si')">
                            ✅ Sí asistiré
                        </button>
                        <button class="inv-btn-no" onclick="confirmarPersonalizado('no')">
                            😔 No asistiré
                        </button>
                    </div>
                </div>
            `;
    }
  }
}

// =====================================
// CONFIRMACIÓN PERSONALIZADA
// =====================================

function confirmarPersonalizado(respuesta) {
  const nombre = nombreInvitado || "Invitado";
  const personas = personasInvitado || "1";
  const para = (paraQuien || "novia").toLowerCase();

  const scriptURL =
    "https://script.google.com/macros/s/AKfycby9OQbhjChnNrgZMC7JPk5w7qtAI3CwQjhckp-r1i1TVkaYr4it2J9_fymuVfChgUJrgg/exec";

  fetch(
    `${scriptURL}?accion=confirmar&nombre=${encodeURIComponent(nombre)}&personas=${personas}&respuesta=${respuesta}&para=${encodeURIComponent(para)}`,
  ).catch((err) => console.log("Error al registrar:", err));

  localStorage.setItem("confirmo_" + encodeURIComponent(nombre), respuesta);

  const confirmSection = document.querySelector(".confirm-section");

  if (confirmSection) {
    if (respuesta === "si") {
      confirmSection.innerHTML = `
                <div class="invitacion-personal">
                    <span style="font-size:3.5rem;display:block;margin-bottom:1rem;">🎉</span>
                    <h2 class="section-title">¡Confirmado!</h2>
                    <p class="inv-saludo">
                        ¡Gracias <strong>${nombre}</strong>!
                    </p>
                    <p class="inv-texto">
                        Tu asistencia ha sido confirmada.<br>
                        ¡Te esperamos con mucho cariño el
                        <strong>11 de Octubre</strong>! ❤️
                    </p>
                </div>
            `;
    } else {
      confirmSection.innerHTML = `
                <div class="invitacion-personal">
                    <span style="font-size:3.5rem;display:block;margin-bottom:1rem;">😔</span>
                    <h2 class="section-title">¡Gracias!</h2>
                    <p class="inv-saludo">
                        Gracias por avisarnos, <strong>${nombre}</strong>.
                    </p>
                    <p class="inv-texto">
                        Lamentamos que no puedas acompañarnos,
                        pero te llevaremos en el corazón ese día. ❤️
                    </p>
                </div>
            `;
    }
  }
}

// =====================================
// MURO DE MENSAJES
// =====================================

const scriptURLMuro =
  "https://script.google.com/macros/s/AKfycby9OQbhjChnNrgZMC7JPk5w7qtAI3CwQjhckp-r1i1TVkaYr4it2J9_fymuVfChgUJrgg/exec";

document.addEventListener("DOMContentLoaded", () => {
  const textarea = document.getElementById("muro-mensaje");
  const contador = document.getElementById("muro-chars");

  if (textarea && contador) {
    textarea.addEventListener("input", () => {
      contador.textContent = textarea.value.length;
    });
  }
});

function enviarMensaje() {
  const nombre = document.getElementById("muro-nombre").value.trim();

  const mensaje = document.getElementById("muro-mensaje").value.trim();

  if (!nombre) {
    alert("Por favor escribe tu nombre.");
    return;
  }

  if (!mensaje) {
    alert("Por favor escribe un mensaje.");
    return;
  }

  fetch(
    `${scriptURLMuro}?accion=mensaje&nombre=${encodeURIComponent(nombre)}&mensaje=${encodeURIComponent(mensaje)}`,
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.ok) {
        document.getElementById("muro-nombre").value = "";
        document.getElementById("muro-mensaje").value = "";
        document.getElementById("muro-chars").textContent = "0";

        function enviarMensaje() {
          const nombre = document.getElementById("muro-nombre").value.trim();

          const mensaje = document.getElementById("muro-mensaje").value.trim();

          if (!nombre) {
            alert("Por favor escribe tu nombre.");
            return;
          }

          if (!mensaje) {
            alert("Por favor escribe un mensaje.");
            return;
          }

          fetch(
            `${scriptURLMuro}?accion=mensaje&nombre=${encodeURIComponent(nombre)}&mensaje=${encodeURIComponent(mensaje)}`,
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.ok) {
                document.getElementById("muro-nombre").value = "";
                document.getElementById("muro-mensaje").value = "";
                document.getElementById("muro-chars").textContent = "0";

                alert("¡Mensaje enviado! 💌");
              }
            })
            .catch(() => {
              alert("Error al enviar el mensaje. Intenta de nuevo.");
            });
        }

        alert("¡Mensaje enviado! 💌");
      }
    })
    .catch(() => {
      alert("Error al enviar el mensaje. Intenta de nuevo.");
    });
}

// =====================================
// ANIMACIÓN SCROLL
// =====================================

const elements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  elements.forEach((el) => {
    const top = el.getBoundingClientRect().top;

    const visible = window.innerHeight - 100;

    if (top < visible) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

// =====================================
// SCROLL SUAVE MENÚ
// =====================================

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
    });
  });
});

// =====================================
// REPRODUCTOR VINILO
// =====================================

const audioPlayer = document.getElementById("audio");
const btnPlay = document.getElementById("btnPlay");
const btnRewind = document.getElementById("btnRewind");
const btnForward = document.getElementById("btnForward");
const progressFill = document.getElementById("progressFill");
const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const vinylDisc = document.getElementById("vinyl");

function fmt(s) {
  if (!s || isNaN(s)) return "0:00";

  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);

  return m + ":" + (sec < 10 ? "0" : "") + sec;
}

if (btnPlay && audioPlayer) {
  btnPlay.addEventListener("click", () => {
    if (audioPlayer.paused) {
      audioPlayer.play().catch(() => {
        console.log("Reproducción bloqueada por el navegador");
      });

      btnPlay.textContent = "❚❚";

      if (vinylDisc) {
        vinylDisc.classList.add("spinning");
      }
    } else {
      audioPlayer.pause();

      btnPlay.textContent = "▶";

      if (vinylDisc) {
        vinylDisc.classList.remove("spinning");
      }
    }
  });
}

if (btnRewind && audioPlayer) {
  btnRewind.addEventListener("click", () => {
    audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10);
  });
}

if (btnForward && audioPlayer) {
  btnForward.addEventListener("click", () => {
    audioPlayer.currentTime = Math.min(
      audioPlayer.duration || 0,
      audioPlayer.currentTime + 10,
    );
  });
}

if (audioPlayer) {
  audioPlayer.addEventListener("loadedmetadata", () => {
    if (totalTime) {
      totalTime.textContent = fmt(audioPlayer.duration);
    }
  });

  audioPlayer.addEventListener("timeupdate", () => {
    const pct = audioPlayer.duration
      ? (audioPlayer.currentTime / audioPlayer.duration) * 100
      : 0;

    if (progressFill) {
      progressFill.style.width = pct + "%";
    }

    if (currentTime) {
      currentTime.textContent = fmt(audioPlayer.currentTime);
    }
  });

  audioPlayer.addEventListener("ended", () => {
    if (btnPlay) btnPlay.textContent = "▶";
    if (vinylDisc) vinylDisc.classList.remove("spinning");
    if (progressFill) progressFill.style.width = "0%";
    if (currentTime) currentTime.textContent = "0:00";
  });
}

if (progressBar && audioPlayer) {
  progressBar.addEventListener("click", (e) => {
    const rect = progressBar.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;

    if (audioPlayer.duration) {
      audioPlayer.currentTime = pct * audioPlayer.duration;
    }
  });
}

// =====================================
// PÉTALOS ANIMADOS
// =====================================

const coloresPetalos = [
  "#f4a7b9",
  "#f9c8d5",
  "#d4af37",
  "#e8c87a",
  "#b5c98a",
  "#8ab890",
];

function crearPetalo() {
  const petalo = document.createElement("div");

  petalo.classList.add("petalo");

  const size = Math.random() * 12 + 8;

  const color =
    coloresPetalos[Math.floor(Math.random() * coloresPetalos.length)];

  const duracion = Math.random() * 6 + 6;

  const delay = Math.random() * 4;

  petalo.innerHTML = `
        <svg width="${size}" height="${size}" viewBox="0 0 20 20">
            <ellipse
                cx="10" cy="10"
                rx="5" ry="9"
                fill="${color}"
                opacity=".8"
                transform="rotate(${Math.random() * 360} 10 10)"
            />
        </svg>
    `;

  petalo.style.left = Math.random() * 100 + "vw";

  petalo.style.animationDuration = duracion + "s";

  petalo.style.animationDelay = delay + "s";

  document.body.appendChild(petalo);

  setTimeout(
    () => {
      petalo.remove();
    },
    (duracion + delay) * 1000,
  );
}

setInterval(crearPetalo, 200);
