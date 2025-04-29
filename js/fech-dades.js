import { getTareas, saveTareas } from "./storage.js";
import { paintTareas, paintTareasFinalizadas } from "./vista.js";
// TODO validar formulario de JSON
document.getElementById("form-importar").addEventListener("submit", function(e) {
    e.preventDefault(); 

    const nombreArchivo = document.getElementById("nombreArchivo").value.trim();

    if (nombreArchivo === "") {
        alert("Por favor, escribe el nombre del archivo.");
        return;
    }

    const url = `./dades/${nombreArchivo}`;

    importarTareasDesdeJSON(url);
});


//TODO realizar fech del dades

export async function importarTareasDesdeJSON(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Error al cargar las tareas desde el servidor");
        }

        const tareasImportadas = await response.json();
        let tareasExistentes = getTareas();

        tareasImportadas.forEach(tarea => {
            tareasExistentes.push({
                id: tarea.id,
                titulo: tarea.titol,              
                descripcion: tarea.descripcio,
                fecha: tarea.data,
                categoria: tarea.categoria,         
                prioridad: tarea.prioritat,
                realizada: tarea.realitzada
            });
        });

        saveTareas(tareasExistentes);

        paintTareas();
        paintTareasFinalizadas();
    } catch (error) {
        console.error("Error importando tareas:", error);
    }
}
