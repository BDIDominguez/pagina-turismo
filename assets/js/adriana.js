//import { Punto } from "./datos.js";
//import { subirImagen, subirPuntoTuristico } from "./datos.js";

// comente los import y puse las funciones que necesitaba ademas de las que cree  dentro de mi script porque con el import no las tomaba

// Constructor de Punto
function Punto(id, nombre, provincia, pais, descripcion, fotourl, miniaturaurl, hospedajes, transporte, formas_llegar) {
    this.id = id;
    this.nombre = nombre;
    this.provincia = provincia;
    this.pais = pais;
    this.descripcion = descripcion;
    this.fotourl = fotourl;
    this.miniaturaurl = miniaturaurl;
    this.hospedajes = hospedajes;
    this.transporte = transporte;
    this.formas_llegar = formas_llegar;
}
  
// Método para agregar un punto a la página
Punto.prototype.agregarPunto = function(contenedor) {
    // Crear elementos HTML
    const contenedorPunto = document.createElement("div");
    contenedorPunto.classList.add("index-punto");
  
    const elementoTitulo = document.createElement("h3");
    elementoTitulo.textContent = this.nombre;
  
    const elementoDescripcion = document.createElement("p");
    elementoDescripcion.textContent = this.descripcion;
  
    const elementoUbicacion = document.createElement("p");
    elementoUbicacion.textContent = this.pais + " " + this.provincia;
  
    const elementoTransporte = document.createElement("p");
    elementoTransporte.textContent = "Transportes: " + this.transporte + "; Formas de llegar: " + this.formas_llegar;
  
    const elementoHospedajes = document.createElement("p");
    elementoHospedajes.textContent = "Hospedajes: " + this.hospedajes;
  
    const elementoImagen = document.createElement("img");
    elementoImagen.src = this.miniaturaurl;
  
    // Agregar elementos al contenedor
    contenedorPunto.appendChild(elementoImagen);
    contenedorPunto.appendChild(elementoTitulo);
    contenedorPunto.appendChild(elementoDescripcion);
    contenedorPunto.appendChild(elementoUbicacion);
    contenedorPunto.appendChild(elementoTransporte);
    contenedorPunto.appendChild(elementoHospedajes);
  
    // Agregar contenedorPunto al contenedor principal
    contenedor.appendChild(contenedorPunto);
};
  
// Función para subir una imagen
async function subirImagen(archivo) {
    const archivoImagen = archivo.target.files[0];
    const nombreArchivo = archivoImagen.name;
    const nombreSinExtension = nombreArchivo.replace(/\.[^/.]+$/, "");
    const url = `https://api.imgbb.com/1/upload?key=fb47470933bd10712434f449f011599a&name=${nombreSinExtension}`;
    const data = new FormData();
    data.append("image", archivoImagen);
    try {
        const respuesta = await fetch(url, {
            method: "POST",
            body: data,
        });
        const datosregresados = await respuesta.json();
        return [datosregresados.data.url, datosregresados.data.thumb.url, datosregresados.success];
    } catch (error) {
        console.error(error);
    }
}
  
// Función para subir un punto turístico
async function subirPuntoTuristico(punto){
    try {
        const url = `https://sheetdb.io/api/v1/tv96lgxabh427`;
        const datosPunto = {
            data: {
                id: "INCREMENT",
                nombre: punto.nombre,
                provincia: punto.provincia,
                pais: punto.pais,
                descripcion: punto.descripcion,
                fotourl: punto.fotourl,
                miniaturaurl: punto.miniaturaurl,
                hospedajes: punto.hospedajes,
                transporte: punto.transporte,
                formas_llegar: punto.formas_llegar
            },
        };
        const opciones = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(datosPunto),
        };
        const response = await fetch(url, opciones);
        if (!response.ok){
            throw new Error("Error al guardar el Punto Turistico");
        }
        const data =  await response.json();
        return true; // Si se guardo bien
    } catch(error) {
        console.error("Error ", error);
        return false;
    }
}
  
// Función para guardar datos
async function guardarDatos() {
    try {
        // Obtener los valores de los campos del formulario
        const nombre = document.getElementById('nombre').value;
        const provincia = document.getElementById('provincia').value;
        const pais = document.getElementById('pais').value;
        const descripcion = document.getElementById('descripcion').value;
        const hospedajes = document.getElementById('hospedajes').value;
        const transporte = document.getElementById('transporte').value;
        const formas_llegar = document.getElementById('formas_llegar').value;
        const elementoImagen = document.getElementById('foto');
  
        console.log("Datos del formulario obtenidos:");
  
        // Verificar si se ha seleccionado un archivo de imagen
        if (elementoImagen.files.length > 0) {
            console.log("Archivo de imagen seleccionado. Procediendo a subir la imagen...");
  
            // Subir la imagen
            const [url, miniatura, success] = await subirImagen({ target: { files: [elementoImagen.files[0]] } });
  
            console.log("Resultado de la subida de imagen:", { url, miniatura, success });
  
            // Verificar si la imagen se subió correctamente
            if (success) {
                // Crear un nuevo punto turístico con los datos del formulario y la imagen subida
                const punto = new Punto(0, nombre, provincia, pais, descripcion, url, miniatura, hospedajes, transporte, formas_llegar);
  
                console.log("Punto turístico creado:", punto);
  
                // Subir el punto turístico a la base de datos
                const vResp = await subirPuntoTuristico(punto);
                console.log("Respuesta de la subida del punto turístico:", vResp);
  
                // Si se ha subido correctamente, agregar el punto turístico a la página
                if (vResp) {
                    // Obtener el contenedor donde se agregarán los puntos turísticos
                    const contenedor = document.getElementById("contenedor-puntos");
                    // Agregar el punto turístico al contenedor
                    punto.agregarPunto(contenedor);
                } else {
                    console.log("Error al guardar el punto turístico, no se agregará a la página.");
                }
            } else {
                console.log("Error al cargar la imagen del punto, por lo tanto, se cancela el proceso.");
            }
        } else {
            console.log("No se seleccionó ningún archivo de imagen.");
        }
    } catch (error) {
        console.error("Error al guardar los datos:", error);
    }
}
  
document.addEventListener("DOMContentLoaded", function() {
    // Función para manejar la vista previa de la imagen seleccionada
    document.getElementById("foto").addEventListener("change", e => {
        const elementoImagen = document.getElementById("registrar-foto-actual");
  
        if (e.target.files[0]) { // Si existe algún archivo, regresa true
            const lector = new FileReader();
            lector.onload = function(evento) {
                elementoImagen.src = evento.target.result;
            };
    
            lector.readAsDataURL(e.target.files[0]);
        } else {
            elementoImagen.src = "https://i.ibb.co/8MPLpzp/imagen.jpg";
        }
    });
    
    // Agregar evento click al botón "Guardar Datos"
    document.getElementById("guardarDatos").addEventListener("click", guardarDatos);
});  