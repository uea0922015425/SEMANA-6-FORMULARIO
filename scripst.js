const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const edad = document.getElementById("edad");
const submitBtn = document.getElementById("submitBtn");

// Mensajes de error
function mostrarError(id, mensaje) {
  const error = document.getElementById(id + "Error");
  error.textContent = mensaje;
  error.style.display = "block";
}

function limpiarError(id) {
  const error = document.getElementById(id + "Error");
  error.style.display = "none";
}

// Validaciones
function esNombreValido(valor) {
  return valor.trim().length >= 3;
}

function esEmailValido(valor) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(valor);
}

function esPasswordValido(valor) {
  const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  return regex.test(valor);
}

function esConfirmPasswordValido() {
  return password.value === confirmPassword.value && password.value !== "";
}

function esEdadValida(valor) {
  return Number(valor) >= 18;
}

// Validación individual por campo
function validarCampo(input, condicion, idError) {
  if (condicion(input.value)) {
    input.classList.remove("invalid");
    input.classList.add("valid");
    limpiarError(idError);
    return true;
  } else {
    input.classList.remove("valid");
    input.classList.add("invalid");
    switch (idError) {
      case "nombre":
        mostrarError("nombre", "El nombre debe tener al menos 3 caracteres.");
        break;
      case "email":
        mostrarError("email", "Ingresa un correo electrónico válido.");
        break;
      case "password":
        mostrarError("password", "La contraseña debe tener al menos 8 caracteres, incluyendo un número y un carácter especial.");
        break;
      case "confirmPassword":
        mostrarError("confirm", "Las contraseñas no coinciden.");
        break;
      case "edad":
        mostrarError("edad", "Debes ser mayor o igual a 18 años.");
        break;
    }
    return false;
  }
}

// Validación general
function validarFormulario() {
  const esNombreOk = validarCampo(nombre, esNombreValido, "nombre");
  const esEmailOk = validarCampo(email, esEmailValido, "email");
  const esPassOk = validarCampo(password, esPasswordValido, "password");
  const esConfirmOk = esConfirmPasswordValido();
  const esEdadOk = validarCampo(edad, esEdadValida, "edad");

  // Si todo está bien, habilitamos el botón
  submitBtn.disabled = !(esNombreOk && esEmailOk && esPassOk && esConfirmOk && esEdadOk);
}

// Eventos en tiempo real
nombre.addEventListener("input", () => validarCampo(nombre, esNombreValido, "nombre"));
email.addEventListener("input", () => validarCampo(email, esEmailValido, "email"));
password.addEventListener("input", () => {
  validarCampo(password, esPasswordValido, "password");
  if (confirmPassword.value !== "") {
    validarCampo(confirmPassword, esConfirmPasswordValido, "confirm");
  }
});
confirmPassword.addEventListener("input", () => {
  if (!esConfirmPasswordValido()) {
    mostrarError("confirm", "Las contraseñas no coinciden.");
    confirmPassword.classList.add("invalid");
  } else {
    limpiarError("confirm");
    confirmPassword.classList.remove("invalid");
  }
});
edad.addEventListener("input", () => validarCampo(edad, esEdadValida, "edad"));

document.querySelectorAll("input").forEach(input => {
  input.addEventListener("blur", () => input.classList.contains("invalid") ? null : input.classList.add("valid"));
});

// Manejo del formulario
document.getElementById("registroForm").addEventListener("submit", function(e) {
  e.preventDefault();

  if (validarFormulario()) {
    alert("✅ ¡Registro completado exitosamente!");
  }
});

document.getElementById("registroForm").addEventListener("reset", () => {
  document.querySelectorAll("input").forEach(input => {
    input.classList.remove("valid", "invalid");
  });
  document.querySelectorAll(".error-message").forEach(msg => msg.style.display = "none");
  submitBtn.disabled = true;
});