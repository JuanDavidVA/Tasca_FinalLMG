//TODO crear class para una Tarea
export class Tarea {

    constructor(id,titulo,descripcion, fecha, categoria, prioridad){
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.categoria = categoria;
        this.prioridad = prioridad;
        this.realizada = false; 

    }

}
//TODO Crear  clase para una Categoria
export class Categoria {

    constructor(nombre, color){
        this.nombre = nombre;
        this.color = color;  
    }

}