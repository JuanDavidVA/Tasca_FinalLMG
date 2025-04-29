import { Categoria } from "./modelos.js";
import { getCategorias,saveCategorias } from "./storage.js";
import { paintCategorias } from "./vista.js";

//TODO funciones para validar formular de tareas





//TODO Crear y enviar una tarea ya validada al array de la vista y al local storage

document.getElementById("formCategorias").addEventListener("submit", function(e) {
    e.preventDefault();

    let nombreCategoria = document.getElementById("inCateText").value;
    let colorCategoria = document.getElementById("incolor").value;
    
    let nuevaCategoria = new Categoria(nombreCategoria, colorCategoria);

    let categoria = getCategorias();

    categoria.push(nuevaCategoria);
    console.log(categoria);

    saveCategorias(categoria);
    paintCategorias();
    
});