const dineroInicial = 50000;
const minima = 5000;
let derrotas = 0;
let dinero = 50000;
let victorias = 0;
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
    cambiarTextosHtml("victorias", `Has ganado: ${victorias} ${victorias == 1 ? "vez" : "veces"}`);
    cambiarTextosHtml("derrotas", `Has perdido: ${derrotas} ${derrotas == 1 ? "vez" : "veces"}`);
    cambiarTextosHtml("dinero", `Tu dinero es: ${dinero}`);
}
function iniciar() {
    document.getElementById("botonJugar").setAttribute("disabled", true);
    document.getElementById("botonRepetir").setAttribute("disabled", true);
    document.getElementById("apuesta").setAttribute("disabled", true);
    document.getElementById("lado").addEventListener("input", function () {
        this.value = this.value.replace(/[^a-zA-Z]/g, "");
        this.value = this.value.toLowerCase();
        if (this.value == "cara" || this.value == "Cruz") { document.getElementById("apuesta").removeAttribute("disabled"); }
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
    let eleccion = document.getElementById("lado");
    let lado = eleccion.value;
    let juego = document.getElementById("apuesta");
    let apuesta = juego.value;
    lado == azar ? victorias++ : derrotas++;
    dinero = (lado == azar) ? dinero + apuesta * 2 : dinero - apuesta;
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
    let lado = (numero == 1) ? "cara" : "Cruz";
    return lado;
}
function reiniciar() {
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
    document.getElementById("lado").removeAttribute("disabled");
    document.getElementById("lado").value = "";
    document.getElementById("apuesta").value = "";
    document.getElementById("botonRepetir").setAttribute("disabled", true);
}
iniciar();