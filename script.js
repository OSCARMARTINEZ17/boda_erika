// =====================================
// SOBRE DE BIENVENIDA
// =====================================

const openInvitation =
    document.getElementById("openInvitation");

const envelope =
    document.getElementById("envelope");

if (openInvitation && envelope) {

    openInvitation.addEventListener("click", () => {

        envelope.style.opacity = "0";

        setTimeout(() => {
            envelope.style.display = "none";
        }, 1000);

        const audioEl =
            document.getElementById("audio");

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

const weddingDate =
    new Date("October 11, 2026 16:00:00").getTime();

function updateCountdown() {

    const now =
        new Date().getTime();

    const distance =
        weddingDate - now;

    const daysEl =
        document.getElementById("days");

    const hoursEl =
        document.getElementById("hours");

    const minutesEl =
        document.getElementById("minutes");

    const secondsEl =
        document.getElementById("seconds");

    if (
        !daysEl ||
        !hoursEl ||
        !minutesEl ||
        !secondsEl
    ) return;

    if (distance <= 0) {

        daysEl.textContent = 0;
        hoursEl.textContent = 0;
        minutesEl.textContent = 0;
        secondsEl.textContent = 0;

        return;

    }

    const days =
        Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours =
        Math.floor((distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60));

    const minutes =
        Math.floor((distance % (1000 * 60 * 60)) /
        (1000 * 60));

    const seconds =
        Math.floor((distance % (1000 * 60)) /
        1000);

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

const nombreInvitado   = getParam("nombre");
const personasInvitado = getParam("personas");
const paraQuien        = getParam("para");

if (nombreInvitado) {

    const confirmSection =
        document.querySelector(".confirm-section");

    if (confirmSection) {

        const yaConfirmo =
            localStorage.getItem("confirmo_" + nombreInvitado);

        if (yaConfirmo) {

            const respuestaGuardada = yaConfirmo;

            if (respuestaGuardada === "si") {

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
                            ${personasInvitado == 1 ? 'persona' : 'personas'}
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

function confirmarPersonalizado(respuesta) {

    const nombre   = nombreInvitado || "Invitado";
    const personas = personasInvitado || "1";
    const para     = paraQuien || "novia";

    console.log("paraQuien:", para);

    const scriptURL =
    "https://script.google.com/macros/s/AKfycbwzjx7wMgJBApr9HyPy7WIU5ZyDSAczcPgVAwNUg2gw--WL46xCQFHhren4ND_AhY_GkQ/exec";

    fetch(`${scriptURL}?nombre=${encodeURIComponent(nombre)}&personas=${personas}&respuesta=${respuesta}&para=${encodeURIComponent(para)}`)
    .catch(err => console.log("Error al registrar:", err));

    localStorage.setItem("confirmo_" + nombre, respuesta);

    const confirmSection =
        document.querySelector(".confirm-section");

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
// ANIMACIÓN SCROLL
// =====================================

const elements =
    document.querySelectorAll(".reveal");

function revealOnScroll() {

    elements.forEach(el => {

        const top =
            el.getBoundingClientRect().top;

        const visible =
            window.innerHeight - 100;

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

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        const target =
            document.querySelector(
                this.getAttribute("href")
            );

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });

    });

});

// =====================================
// REPRODUCTOR VINILO
// =====================================

const audioPlayer  = document.getElementById("audio");
const btnPlay      = document.getElementById("btnPlay");
const btnRewind    = document.getElementById("btnRewind");
const btnForward   = document.getElementById("btnForward");
const progressFill = document.getElementById("progressFill");
const progressBar  = document.getElementById("progressBar");
const currentTime  = document.getElementById("currentTime");
const totalTime    = document.getElementById("totalTime");
const vinylDisc    = document.getElementById("vinyl");

function fmt(s) {

    if (!s || isNaN(s)) return "0:00";

    const m   = Math.floor(s / 60);
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

        audioPlayer.currentTime =
            Math.max(0, audioPlayer.currentTime - 10);

    });

}

if (btnForward && audioPlayer) {

    btnForward.addEventListener("click", () => {

        audioPlayer.currentTime =
            Math.min(
                audioPlayer.duration || 0,
                audioPlayer.currentTime + 10
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

        if (btnPlay)      btnPlay.textContent       = "▶";
        if (vinylDisc)    vinylDisc.classList.remove("spinning");
        if (progressFill) progressFill.style.width  = "0%";
        if (currentTime)  currentTime.textContent   = "0:00";

    });

}

if (progressBar && audioPlayer) {

    progressBar.addEventListener("click", (e) => {

        const rect = progressBar.getBoundingClientRect();
        const pct  = (e.clientX - rect.left) / rect.width;

        if (audioPlayer.duration) {
            audioPlayer.currentTime = pct * audioPlayer.duration;
        }

    });

}