import { Categoria } from "./modelos.js";
import { getCategorias,saveCategorias } from "./storage.js";
import { paintCategorias } from "./vista.js";


function validarFormularioCategoria() {

    let nombreCategoria = document.getElementById("inCateText").value.trim();
    let colorCategoria = document.getElementById("incolor").value;

    if (nombreCategoria.length > 50) {
        alert("nombre no puede tener más de 50 caracteres.");
        return null;
    }

    let hexColorRegex = /^#[0-9A-Fa-f]{6}$/;

    if (!hexColorRegex.test(colorCategoria)) {
        alert("selecciona un color válido en hex");
        return null;
    }
    
    let categoriasExistentes = getCategorias();
    for (let i = 0; i < categoriasExistentes.length; i++) {
        if (categoriasExistentes[i].nombre.toLowerCase() === nombreCategoria.toLowerCase()) {
            alert("Ya existe una categoría igual");
            return null;
        }
    }
    return {
        nombre: nombreCategoria,
        color: colorCategoria
    };
}

//TODO Crear y enviar una tarea ya validada al array de la vista y al local storage

document.getElementById("formCategorias").addEventListener("submit", function(e) {
    e.preventDefault();

    let datos = validarFormularioCategoria();
    if (!datos) return;

    let nuevaCategoria = new Categoria(datos.nombre, datos.color);
    let categorias = getCategorias();
    categorias.push(nuevaCategoria);
    saveCategorias(categorias);
    paintCategorias();

});