const formularioRegistro = document.getElementById("form-registro");

formularioRegistro.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const mensaje = document.getElementById("mensaje").value;
    const terminos = document.getElementById("terminos").checked;

    if (nombre === "" || email === "" || telefono === "" || mensaje === "") {
        alert("Por favor, completá todos los campos.");
        return;
    }

    if (!terminos) {
        alert("Debés aceptar los términos y condiciones.");
        return;
    }

    alert("¡Registro realizado correctamente!");

    formularioRegistro.reset();
});