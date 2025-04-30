import { getTareas, saveTareas } from "./storage.js";
import { getCategorias, saveCategorias } from "./storage.js";
import { generarGraficoTareas } from "./grafico.js";

             //TODO funcioes para los botones de eliminar y canviar estado de tarea y categoria 

export function eliminarTarea(e) {

    let id = e.target.getAttribute("data-id");
    let tareas = getTareas();

    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].id === id) {
            tareas.splice(i, 1);
            break; 
        }
    }

    saveTareas(tareas);
    paintTareas();
    paintTareasFinalizadas();
}


export function eliminarCategoria(e) {

    let nombre = e.target.getAttribute("data-id");
    let categorias = getCategorias();

    for (let i = 0; i < categorias.length; i++) {
        if (categorias[i].nombre === nombre) {
            categorias.splice(i, 1);
            break; 
        }
    }

    saveCategorias(categorias);
    paintCategorias();
}

export function marcarTareaRealizada(e) {

    let id = e.target.getAttribute("data-id");
    let tareas = getTareas();

    tareas.forEach(t => {
        if (t.id === id) {
            t.realizada = true;
            t.realizadaFecha = new Date().toISOString();
        }
    });

    saveTareas(tareas);
    paintTareas(); 
    paintTareasFinalizadas();
    generarGraficoTareas();
    
}



      // TODO pintar Tareas pendientes
export function paintTareas() {

    let lista = document.getElementById("tareasPendientes");
    
    if (!lista) { 
        return;
    }

    let tareas = getTareas();
    let categorias = getCategorias();  

    lista.innerHTML = "";

    tareas.forEach(tarea => {
        if (!tarea.realizada) {
            let divTarea = document.createElement("div");
            divTarea.classList.add("div-tareas");

            let categoriaTarea = categorias.find(c => c.nombre === tarea.categoria);
            let colorCategoria = categoriaTarea ? categoriaTarea.color : "#ccc"; 
            
            divTarea.innerHTML = `
                <p><strong>${tarea.titulo}</strong></p>
                <p>${tarea.prioridad}</p>
                <p>${tarea.descripcion}</p>
                <div class="catdiv" style="background-color:${colorCategoria};"> ${tarea.categoria} 
                </div>
                <p>${tarea.fecha}</p>
    
                <button class="btn-realizar" data-id="${tarea.id}">Realizada</button>
                <button class="btn-eliminar" data-id="${tarea.id}">Eliminar</button>
            `;

            lista.appendChild(divTarea);
        }
    });

    document.querySelectorAll(".btn-eliminar").forEach(boton => {
        boton.addEventListener("click", eliminarTarea);
    });

    document.querySelectorAll(".btn-realizar").forEach(boton => {
        boton.addEventListener("click", marcarTareaRealizada);
    });
}


       //TODO pintar tareas finalizadas 
export function paintTareasFinalizadas() {
    let listaFinalizadas = document.querySelector(".tareasF");

    let tareas = getTareas();
    let categorias = getCategorias(); 

    listaFinalizadas.innerHTML = "";

    tareas.forEach(tarea => {
        if (tarea.realizada) { 
            let divTarea = document.createElement("div");
            divTarea.classList.add("div-tareas");

            let categoriaTarea = categorias.find(c => c.nombre === tarea.categoria);
            let colorCategoria = categoriaTarea ? categoriaTarea.color : "#ccc"; 
           
            divTarea.innerHTML = `
                <p><strong>${tarea.titulo}</strong></p>
                <p>Prioridad: ${tarea.prioridad}</p>
                <p>${tarea.descripcion}</p>
                <div class="catdiv" style="background-color:${colorCategoria};"> ${tarea.categoria} 
                </div>               
                <p>${tarea.fecha}</p>
        
                <button class="btn-eliminar" data-id="${tarea.id}">Eliminar</button>
            `;
            listaFinalizadas.appendChild(divTarea);
        }
    });

    document.querySelectorAll(".btn-eliminar").forEach(boton => {
        boton.addEventListener("click", eliminarTarea);
    });
}



     // TODO pintar automaticamente cada vez que se entra
document.addEventListener("DOMContentLoaded", function() {
    paintCategorias(); 
});

    //TODO pintar lista de categorias
export function paintCategorias() {
    let listaCategorias = document.getElementById("list-categorias");
   
    if (!listaCategorias){ 
        return;
    }

    let categorias = getCategorias();
    listaCategorias.innerHTML = "";

    categorias.forEach(categoria => {

        let divCategoria = document.createElement("div");
        divCategoria.classList.add("div-categoria");

        divCategoria.innerHTML = `
        <p><strong>${categoria.nombre}</strong></p>
        <div style="background-color: ${categoria.color}; padding: 6px;"></div>
        <button class="btn-eliminarC" data-id="${categoria.nombre}">Eliminar</button>
    `;
        
        listaCategorias.appendChild(divCategoria);
    });

    document.querySelectorAll(".btn-eliminarC").forEach(boton => {
        boton.addEventListener("click", eliminarCategoria);
    });
}

// TODO carrgar automaticamente el formulario con las nuevas categorias
document.addEventListener("DOMContentLoaded", function() {
    cargarCategoriasEnFormulario();
});

function cargarCategoriasEnFormulario() {
    
    let categorias = getCategorias();  
    let selectCategoria = document.getElementById("categoria");  

    if (!selectCategoria) {
        return;
    }

    selectCategoria.innerHTML = "";

    let opcionDefault = document.createElement("option");
    opcionDefault.value = "";
    opcionDefault.textContent = "Seleccionar categoría";
    selectCategoria.appendChild(opcionDefault);

    categorias.forEach(categoria => {
        let option = document.createElement("option");
        option.value = categoria.nombre;  
        option.textContent = categoria.nombre;  
        selectCategoria.appendChild(option);
    });
}


