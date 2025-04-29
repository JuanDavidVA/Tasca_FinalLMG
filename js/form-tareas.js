import { Tarea } from "./modelos.js";
import { generateIdTarea, getTareas, saveTareas } from "./storage.js";
import { paintTareas } from "./vista.js";



//TODO funciones para validar formular de tareas





// Crear y enviar una tarea ya validada al array de la vista y al local storage


document.getElementById("formTasc").addEventListener("submit", function(e) {
    e.preventDefault(); 
    
    const titulo = document.getElementById("titulo").value;
    const descripcion = document.getElementById("descripcion").value;
    const fecha = document.getElementById("fecha").value;
    const categoria = document.getElementById("categoria").value;
    const prioridad = document.getElementById("prioridad").value;

    const id = generateIdTarea();

    const nuevaTasca = new Tarea(id, titulo, descripcion, fecha, categoria, prioridad);
    let tasques = getTareas();

    tasques.push(nuevaTasca);
    console.log(tasques);

    saveTareas(tasques);

    paintTareas();

});