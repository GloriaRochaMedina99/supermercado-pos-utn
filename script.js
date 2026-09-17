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
const mediosPago = document.getElementById("medios-pago");
const envios = document.getElementById("envios");

mediosPago.addEventListener("click", function() {
    alert("💳 Para conocer los medios de pago disponibles, consultá en el supermercado.");
});

envios.addEventListener("click", function() {
    alert("🚚 Para conocer la disponibilidad y condiciones de envío, consultá en el supermercado.");
});const emailContacto = document.getElementById("email-contacto");

emailContacto.addEventListener("click", function() {
    alert("📧 Podés comunicarte con nosotros por correo electrónico.");
});