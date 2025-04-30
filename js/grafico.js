import { getTareas } from "./storage.js";

let graficoInstance = null;

export function generarGraficoTareas() {

    let tareas = getTareas();
    let listRealizadas = [];
    
    for (let t of tareas) {
        if (t.realizada && t.realizadaFecha) {
            listRealizadas.push(t);
        }
    }

    let tareasPorMes = Array(12).fill(0); 

    listRealizadas.forEach(t => {
        let mes = new Date(t.realizadaFecha).getMonth();
        tareasPorMes[mes]++; 
    });

    let graficoContext = document.getElementById("graficoTareas").getContext("2d");

    if (graficoInstance) {
        graficoInstance.destroy();
    }

    graficoInstance = new Chart(graficoContext, {   // Ayuda de la IA
        type: "line", 
        data: {
            labels: [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ],
            datasets: [{
                label: "Tareas completadas",
                data: tareasPorMes, 
                backgroundColor: "#4caf50",
                borderColor: "#388e3c",
                borderWidth: 1,
                fill: true
            }]
        },
    });
}