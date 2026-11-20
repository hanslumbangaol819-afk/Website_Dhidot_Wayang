(function () {
  "use strict";
  var WA = "6287825228608";

  // Form "Kirim pesan" -> WhatsApp
  var form = document.getElementById("form-wa");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.classList.add("was-validated"); return; }
      var nama = form.nama.value.trim();
      var kota = form.kota.value.trim();
      var produk = form.produk.value;
      var pesan = form.pesan.value.trim();
      var teks = "Halo Dhidot Wayang Kulit, saya " + nama +
        (kota ? " dari " + kota : "") + ".\n" +
        "Produk yang saya tanyakan: " + produk + ".\n\n" + pesan;
      window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(teks), "_blank", "noopener");
    });
  }

  // Filter produk Utama / Kasaran
  var tombol = document.querySelectorAll(".filter-btn");
  tombol.forEach(function (b) {
    b.addEventListener("click", function () {
      tombol.forEach(function (x) { x.classList.remove("active"); });
      b.classList.add("active");
      var f = b.getAttribute("data-filter");
      document.querySelectorAll("[data-kategori]").forEach(function (c) {
        c.style.display = (f === "semua" || c.getAttribute("data-kategori") === f) ? "" : "none";
      });
    });
  });

  // Isi otomatis pilihan produk di form kontak (?produk=...)
  var p = new URLSearchParams(window.location.search).get("produk");
  if (p && form) {
    for (var i = 0; i < form.produk.options.length; i++) {
      if (form.produk.options[i].value === p) { form.produk.selectedIndex = i; break; }
    }
  }
})();
