// =============================================
// TECHCONF 2025 — JavaScript
// =============================================

// VENDOS URL-IN E LOGIC APP KËTU (pas konfigurimit në Azure):
const LOGIC_APP_URL = "https://prod-05.francecentral.logic.azure.com:443/workflows/2bcacc32d75d4b7598931e07ec5e3a16/triggers/When_an_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_an_HTTP_request_is_received%2Frun&sv=1.0&sig=pg6DNLH7gclhzPuv8EvEqpRTLMdzUdW5xj5_iTBcGGE";

// ---- COUNTDOWN TIMER ----
const eventDate = new Date("2026-11-15T09:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = eventDate - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerHTML =
      "<p style='font-size:1.5rem'>Eventi ka filluar! 🎉</p>";
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("days").textContent    = String(days).padStart(2, "0");
  document.getElementById("hours").textContent   = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ---- ORARI — TABS ----
function showDay(day, btn) {
  document.getElementById("day1").style.display = day === 1 ? "block" : "none";
  document.getElementById("day2").style.display = day === 2 ? "block" : "none";
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
}

// ---- FAQ ACCORDION ----
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const icon = btn.querySelector("span");
  answer.classList.toggle("open");
  icon.textContent = answer.classList.contains("open") ? "−" : "+";
}

// ---- NEWSLETTER — Azure Logic Apps ----
async function sendToNewsletter(name, email) {
  if (LOGIC_APP_URL === "VENDOS_URL_KETU") {
    console.log("Newsletter: Logic App URL nuk është konfiguruar ende.");
    return;
  }
  try {
    await fetch(LOGIC_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    });
    console.log("Newsletter: u dërgua me sukses për", email);
  } catch (err) {
    console.error("Newsletter gabim:", err);
  }
}

// ---- FORMULARI I REGJISTRIMIT ----
async function submitForm(e) {
  e.preventDefault();

  const name       = document.getElementById("name").value.trim();
  const email      = document.getElementById("email").value.trim();
  const ticket     = document.getElementById("ticket").value;
  const newsletter = document.getElementById("newsletter").checked;

  // Nëse ka zgjedhur newsletter, dërgo te Azure Logic Apps
  if (newsletter) {
    await sendToNewsletter(name, email);
    // Shfaq badge konfirmimi
    const badge = document.getElementById("newsletter-badge");
    if (badge) badge.style.display = "inline-block";
    // Shfaq mesazh newsletter
    const newsletterConfirm = document.getElementById("newsletter-confirm");
    if (newsletterConfirm) newsletterConfirm.style.display = "block";
  }

  // Fsheh formularin, shfaq mesazhin e suksesit
  document.querySelector(".reg-form").style.display = "none";
  document.getElementById("success-msg").style.display = "block";

  console.log("Regjistrim i ri:", { name, email, ticket, newsletter });
}
