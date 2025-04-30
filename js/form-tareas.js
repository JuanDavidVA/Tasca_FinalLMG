import { Tarea } from "./modelos.js";
import { generateIdTarea, getTareas, saveTareas } from "./storage.js";
import { paintTareas } from "./vista.js";


function validarFormularioTarea() {

    let titulo = document.getElementById("titulo").value.trim();
    let descripcion = document.getElementById("descripcion").value.trim();
    let fecha = document.getElementById("fecha").value;
    let categoria = document.getElementById("categoria").value;
    let prioridad = document.getElementById("prioridad").value;

    if (!titulo || titulo.length > 100) {
        alert("No puede superar los 100 caracteres.");
        return null;
    }
    if ( descripcion.length > 300) {
        alert("No puede superar los 300 caracteres.");
        return null;
    }
    return { titulo, descripcion, fecha, categoria, prioridad };
}


//TODO Crear y enviar una tarea ya validada al array y local

document.getElementById("formTasc").addEventListener("submit", function(e) {
    e.preventDefault();

    const datos = validarFormularioTarea();
    if (!datos) return;

    const id = generateIdTarea();
    const nuevaTasca = new Tarea(id, datos.titulo, datos.descripcion, datos.fecha, datos.categoria, datos.prioridad);

    let tasques = getTareas();
    tasques.push(nuevaTasca);
    saveTareas(tasques);
    console.log(tasques)

    paintTareas();

    document.getElementById("formTasc").reset();
    
});