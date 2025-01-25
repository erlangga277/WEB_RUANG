const signInBtnLink = document.querySelector('.signInBtn-link');
const signUpBtnLink = document.querySelector('.signUpBtn-link');
const wrapper = document.querySelector('.wrapper');

// Transisi antara form login dan sign-up
signUpBtnLink.addEventListener('click', () => {
  wrapper.classList.toggle('active');
});

signInBtnLink.addEventListener('click', () => {
  wrapper.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", function (e) {
  const formSubmits = document.querySelectorAll(".form-submit");

  formSubmits.forEach(formSubmit => {
    formSubmit.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const username = formData.get("username");
      const password = formData.get("password");

      let users = JSON.parse(localStorage.getItem("users")) || {};

      if (formSubmit.id == "form-login") {
        // Logika Login
        if (!users[username] || users[username] !== password) {
          Swal.fire({
            title: "Login Gagal!",
            text: "Username atau password salah!",
            icon: "error",
          });
          return;
        }

        Swal.fire({
          title: "Login Berhasil!",
          text: "Anda akan diarahkan ke halaman utama!",
          icon: "success",
        }).then(() => {
          window.location.href = "ADMIN GWEH/dashboard.html";
        });

      } else if (formSubmit.id == "form-register") {
        // Logika Sign Up
        if (users[username]) {
          Swal.fire({
            title: "Signup Gagal!",
            text: "Username sudah terdaftar. Gunakan username lain!",
            icon: "error",
          });
          return;
        }

        if (password.length < 6) {
          Swal.fire({
            title: "Password terlalu pendek!",
            text: "Password harus minimal 6 karakter!",
            icon: "error",
          });
          return;
        }

        users[username] = password;
        localStorage.setItem("users", JSON.stringify(users));

        Swal.fire({
          title: "Signup Berhasil!",
          text: "Akun Anda berhasil dibuat!",
          icon: "success",
        }).then(() => {
          wrapper.classList.remove("active"); // Kembali ke form login
        });
      }
    });
  });
});