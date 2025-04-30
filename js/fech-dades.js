import { getCategorias, getTareas, saveTareas } from "./storage.js";
import { paintTareas, paintTareasFinalizadas } from "./vista.js";
import { Tarea, Categoria } from "./modelos.js";

// TODO validar formulario de JSON
document.getElementById("form-importar").addEventListener("submit", function(e) {
    e.preventDefault(); 

    let nombreArchivo = document.getElementById("nombreArchivo").value.trim();

    if (nombreArchivo === "" || !nombreArchivo.endsWith(".json")) {
        alert("escribe el nombre de un archivo .json válido.");
        return;
    }

    let url = `./dades/${nombreArchivo}`;

    importarTareasDesdeJSON(url);
});


//TODO realizar fech del dades

export async function importarTareasDesdeJSON(url) {
    try {
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error("Error al cargar las tareas del json");
        }

        let tareasImportadas = await response.json();
        let tareasExistentes = getTareas();

        tareasImportadas.forEach(t => {
            let nuevaTarea = new Tarea(
                t.id,
                t.titol,
                t.descripcio,
                t.data,
                new Categoria(t.categoria.nom, t.categoria.color),
                t.prioritat
            );
            nuevaTarea.realizada = t.realitzada;
        
            tareasExistentes.push(nuevaTarea);
        });

        saveTareas(tareasExistentes);

        paintTareas();
        paintTareasFinalizadas();
    } catch (error) {
        console.error("Error:" + error);
    }
}
