/* MARANGGI NUSANTARA — script.js */
 
document.addEventListener("DOMContentLoaded", function () {
  safeInit('Dark Mode', initDarkMode);
  safeInit("Filter Katalog", initFilterKatalog);
  safeInit("Modal Detail", initModalDetail);
  safeInit("Form Validasi", initFormValidasi);
});
 
function safeInit(namaFitur, fn) {
  try {
    fn();
  } catch (error) {
    console.error("Gagal inisialisasi " + namaFitur, error);
  }
}
 
/*FITUR DARK MODE / LIGHT MODE TOGGLE*/
function initDarkMode() {
  const darkModeToggle = document.getElementById("darkModeToggle");

  darkModeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      darkModeToggle.textContent = "Mode Terang";
    } else {
      darkModeToggle.textContent = "Mode Gelap";
    }
  });
}

/* FILTER KATALOG*/
 
function initFilterKatalog() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const menuCards = document.querySelectorAll(".menu-card");
 
  if (!filterButtons.length || !menuCards.length) return;
 
  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const selectedCategory = btn.dataset.filter;
 
      filterButtons.forEach(function (b) {
        b.classList.remove("active");
      });
 
      btn.classList.add("active");
 
      menuCards.forEach(function (card) {
        const cocok =
          selectedCategory === "all" ||
          card.dataset.category === selectedCategory;
 
        // Pakai class utility Bootstrap "d-none" (sudah punya display:none)
        // karena class "hidden" tidak didefinisikan di style.css.
        card.classList.toggle("d-none", !cocok);
      });
    });
  });
}
 
/* MODAL DETAIL */
 
function initModalDetail() {
  const detailModal = document.getElementById("detailModal");
 
  if (!detailModal) return;
 
  detailModal.addEventListener("show.bs.modal", function (event) {
 
    const triggerButton = event.relatedTarget;
 
    if (!triggerButton) return;
 
    document.getElementById("modalMenuName").textContent =
      triggerButton.dataset.menuName || "";
 
    document.getElementById("modalMenuDesc").textContent =
      triggerButton.dataset.menuDesc || "";
 
    document.getElementById("modalMenuPrice").textContent =
      triggerButton.dataset.menuPrice || "";
  });
}
 
/* VALIDASI FORM */
 
function initFormValidasi() {
 
  const form = document.getElementById("contactForm");
 
  if (!form) return;
 
  const namaInput = document.getElementById("namaInput");
  const emailInput = document.getElementById("emailInput");
  const pesanInput = document.getElementById("pesanInput");
  const successMsg = document.getElementById("formSuccessMsg");
 
  form.addEventListener("submit", function (event) {
 
    event.preventDefault();
 
    let isValid = true;
 
    if (namaInput.value.trim() === "") {
      setInvalid(namaInput, "namaError", "Nama wajib diisi");
      isValid = false;
    } else {
      setValid(namaInput);
    }
 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
    if (!emailPattern.test(emailInput.value.trim())) {
      setInvalid(emailInput, "emailError", "Format email tidak valid");
      isValid = false;
    } else {
      setValid(emailInput);
    }
 
    if (pesanInput.value.trim().length < 10) {
      setInvalid(pesanInput, "pesanError", "Pesan minimal 10 karakter");
      isValid = false;
    } else {
      setValid(pesanInput);
    }
 
    if (isValid) {
 
      if (successMsg) {
        successMsg.classList.remove("d-none");
      }
 
      form.reset();
 
      [namaInput, emailInput, pesanInput].forEach(function (input) {
        input.classList.remove("is-valid");
      });
 
      if (successMsg) {
        setTimeout(function () {
          successMsg.classList.add("d-none");
        }, 4000);
      }
    }
  });
 
  function setInvalid(input, errorId, message) {
 
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
 
    const error = document.getElementById(errorId);
 
    if (error) {
      error.textContent = message;
    }
  }
 
  function setValid(input) {
 
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  }
}