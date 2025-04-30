//TODO metodos para gestionar el local storage de tareas

export function getTareas() {
    let tareas = localStorage.getItem('tareas');
    return tareas ? JSON.parse(tareas) : [];
}

export function saveTareas(tareas) {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

export function deleteTarea(id){
    let tareas =  getTareas();
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].id === id) {
            tareas.splice(i, 1); 
            break; 
        }
    }
    storage.saveTareas(tareas);
}

//TODO metodos para gestionar el local storage de categorias

export function getCategorias(){
    let categorias = localStorage.getItem('categorias');
    return categorias ? JSON.parse(categorias) : [];
}

export function saveCategorias(categorias) {
    localStorage.setItem('categorias', JSON.stringify(categorias));
}

export function deleteCategoria(nombre) {
    let categorias = storage.getCategorias();
    for (let i = 0; i < categorias.length; i++) {
        if (categorias[i].nombre === nombre) { 
            categorias.splice(i, 1);
            break; 
        }
    }
    storage.saveCategorias(categorias);
}

//TODO funcion Para generar los id automaticos:

export function generateIdTarea() {
    let tareas = getTareas(); 
    
    if (tareas.length === 0) {
        return "task-001"; 
    }

    let numeros = tareas.map(t => {
        const match = t.id.match(/task-(\d+)/);
        return match ? parseInt(match[1], 10) : 0;  // En dicha parte he utilizado IA
    });

    let maxNumero = Math.max(...numeros);
    let nuevoNumero = (maxNumero + 1).toString().padStart(3, "0");

    return `task-${nuevoNumero}`;
}