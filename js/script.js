// Start Fungsi untuk penambahan angka
document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".counter");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute("data-target");
          const duration = 2000;
          const start = 0;
          let startTime = null;

          const updateCounter = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            counter.textContent = Math.floor(progress * target) + "+";
            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target + "+";
            }
          };

          requestAnimationFrame(updateCounter);
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.1 }
  );

  counters.forEach((counter) => observer.observe(counter));
});
// End Fungsi untuk penambahan angka

document.getElementById("message-submit-button").addEventListener("click", function () {
  const inputText = document.getElementById("message-input").value.trim(); // Menghapus spasi tambahan

  // Memeriksa apakah input kosong
  if (inputText === "") {
    Swal.fire({
      icon: "error",
      title: "Gagal mengirim",
      text: "Harap isi semua bidang sebelum mengirim pesan",
      confirmButtonColor: "#f44336", // Ganti dengan warna yang diinginkan
      confirmButtonText: "OK",
    });
    return; // Menghentikan eksekusi jika input kosong
  }

  const whatsappUrl = `https://wa.me/6281521550913?text=${encodeURIComponent(inputText)}`;
  window.open(whatsappUrl, "_blank");
});

const scriptURL = "https://script.google.com/macros/s/AKfycbxS0tNgVZ7qU1-STyikAmDrstz-mHtXRqKqZIPteTeMVBelTATd4PPd8q4IBkuZ3Si9/exec";
const form = document.forms["database"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => console.log("Success!", response))
    .catch((error) => console.error("Error!", error.message));
});
