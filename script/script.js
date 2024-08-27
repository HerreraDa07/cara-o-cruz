const dineroInicial = 50000;
const minima = 5000;
let derrotas = 0;
let dinero = 50000;
let victorias = 0;
function activarAnimacion(moneda) {
    const imagen = document.getElementById("animacion");
    let lado = moneda;
    const video = document.createElement("video");
    video.src = "/recursos/Animación.mp4";
    video.autoplay = true;
    video.className = "intermedio-derecha-animacion";
    video.id = "animacion";
    imagen.parentNode.replaceChild(video, imagen);
    video.addEventListener('ended', function () {
        const cara = document.createElement("img");
        cara.src = "/recursos/cara.svg";
        cara.className = "intermedio-derecha-animacion";
        cara.id = "animacion";
        const cruz = document.createElement("img");
        cruz.src = "/recursos/cruz.svg";
        cruz.className = "intermedio-derecha-animacion";
        cruz.id = "animacion";
        if (lado == "cara") { video.parentNode.replaceChild(cara, video); }
        else { video.parentNode.replaceChild(cruz, video); }
    })
}
function boton() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    reiniciar();
}
function cambiarTextosHtml(id, texto) {
    let textoHtml = document.getElementById(id);
    textoHtml.innerHTML = texto;
}
function datos() {
    cambiarTextosHtml("victorias", `Has ganado: <span style="color:forestgreen">${victorias}</span> ${victorias == 1 ? "vez" : "veces"}`);
    cambiarTextosHtml("derrotas", `Has perdido: <span style="color:red">${derrotas}</span> ${derrotas == 1 ? "vez" : "veces"}`);
    cambiarTextosHtml("dinero", `Tu dinero es: <span style="color:gold">${dinero}</span>`);
}
function iniciar() {
    document.getElementById("botonJugar").setAttribute("disabled", true);
    document.getElementById("botonRepetir").setAttribute("disabled", true);
    document.getElementById("apuesta").setAttribute("disabled", true);
    document.getElementById("lado").addEventListener("input", function () {
        if (this.value.length > 4) { this.value = this.value.slice(0, 4); }
        this.value = this.value.replace(/[^a-zA-Z]/g, "");
        this.value = this.value.toLowerCase();
        if (this.value == "cara" || this.value == "cruz") { document.getElementById("apuesta").removeAttribute("disabled"); }
        else { document.getElementById("apuesta").setAttribute("disabled", true); }
    });
    document.getElementById("apuesta").addEventListener("input", function () {
        document.getElementById("lado").setAttribute("disabled", true);
        this.value = this.value.replace(/[^0-9]/g, "");
        if (dinero != minima) { this.value = (this.value > dinero - minima) ? dinero - minima : this.value; }
        else (this.value = this.value = minima)
        if (this.value >= minima) { document.getElementById("botonJugar").removeAttribute("disabled"); }
        else { document.getElementById("botonJugar").setAttribute("disabled", true); }
    });
    datos();
}
function jugar() {
    let azar = numeroRandom();
    activarAnimacion(azar);
    let eleccion = document.getElementById("lado");
    let lado = eleccion.value;
    let juego = document.getElementById("apuesta");
    let apuesta = juego.value;
    lado == azar ? victorias++ : derrotas++;
    dinero = (lado == azar) ? dinero + apuesta * 2 : dinero - apuesta;
    cambiarTextosHtml("informacion", `Has escogido <span style="color:${lado == azar ? "forestgreen" : "red"}">${lado}</span>
         y salio <span style="color:${lado == azar ? "forestgreen" : "red"}">${azar}</span> <br>
         ${lado == azar ? "¡Felicitaciones! Has ganado" : "Has perdido"}`)
    document.getElementById("botonJugar").setAttribute("disabled", true);
    document.getElementById("botonRepetir").removeAttribute("disabled");
    document.getElementById("lado").setAttribute("disabled", true);
    document.getElementById("apuesta").setAttribute("disabled", true);
    modal();
    return datos();
}
function modal() {
    const modal = document.getElementById("modal");
    if (dinero == 0) { modal.style.display = "block"; }
    return;
}
function numeroRandom() {
    let numero = Math.floor(Math.random() * 2) + 1;
    let lado = (numero == 1) ? "cara" : "cruz";
    return lado;
}
function reiniciar() {
    const imagen = document.getElementById("animacion");
    const monedas = document.createElement("img");
    monedas.src = "/recursos/monedas.svg";
    monedas.className = "intermedio-derecha-animacion";
    monedas.id = "animacion"
    imagen.parentNode.replaceChild(monedas, imagen);
    dinero = dineroInicial;
    victorias = 0;
    derrotas = 0;
    datos()
    document.getElementById("lado").removeAttribute("disabled");
    document.getElementById("lado").value = "";
    document.getElementById("apuesta").value = "";
    document.getElementById("botonRepetir").setAttribute("disabled", true);
}
function repetir() {
    const imagen = document.getElementById("animacion");
    const monedas = document.createElement("img");
    monedas.src = "/recursos/monedas.svg";
    monedas.className = "intermedio-derecha-animacion";
    monedas.id = "animacion"
    imagen.parentNode.replaceChild(monedas, imagen);
    cambiarTextosHtml("informacion", `Para jugar, debes escoger el lado de la moneda <br>
        Luego debes ingresar el valor de tu apuesta <br>
        Cuando ingreses tu apuesta, no podrás cambiar el lado de la moneda elegido`)
    document.getElementById("lado").removeAttribute("disabled");
    document.getElementById("lado").value = "";
    document.getElementById("apuesta").value = "";
    document.getElementById("botonRepetir").setAttribute("disabled", true);
}
iniciar();