function loadHTML(id, file) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    });
}

loadHTML("header-placeholder", "partials/header.html");
loadHTML("footer-placeholder", "partials/footer.html");
loadHTML("login-modal-placeholder", "modals/login-modal.html");
loadHTML("signup-modal-placeholder", "modals/signup-modal.html");
loadHTML("forgot-password-modal-placeholder", "modals/forgot-password-modal.html");
loadHTML("otp-modal-placeholder", "modals/otp-modal.html");

