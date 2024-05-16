import { Usuario, Punto } from "./objetos.js";
import { _fotoActual, _usuarioLogeado } from "./variables.js";
import {
  obtenerDatos,
  subirImagen,
  crearUsuario,
  listarUsaurios,
  consultarUsuario,
  subirPuntoTuristico,
} from "./persistencia.js";
import {
  metodoDeBusquedaIndex,
  metodoEnviarUsuarioNuevo,
  prueba,
} from "./dario.js";

/*

// CREAREMOS UN PUNTOTURISTICO PERO LE AGREGAREMOS LA FOTO PARA QUE ESTE COMPLETO!!
// EMPEZAREMOS CON LA OPCION DE CARGAR IMANGE QUE ESTAMOS SACANDO DE LA PAGINA REGISTRAR.HTML
// ESTE EJEMPLO SE LANZARA DESDE UNA VEZ CAMBIE EL ESTADO DEL INPUT QUE SE ENCUENTRA EN EL REGISTRAR.HTML
// ES SOLO PARA PRUEBAS O BASARSE EN EL
const idinputFile = "registro-foto-perfil"
document.getElementById(idinputFile).addEventListener('change', async () => {
  const inputFile = document.getElementById(idinputFile)
  if (inputFile.files.length > 0 ){ // Verificamos que haya un archivo en el input
    const [url, miniatura, success] = await subirImagen({ target: { files: [inputFile.files[0]] } })
    // EN ESTE PUNTO TENEMOS LA IMAGEN GUARDADA O NO Y PODEMOS DECIDIR SI GUARDAR O NO EL PUNTO
    if (success){ // Si dice que si creamos el Punto sacando los datos desde la pagina
      let desc = "El rio yala es un rio de alta montaña con aguas cristalinas, debilo a los años de erocion creo unos cañones que en la provincia se conbirtieon en un atractivo turistico"
      let punto = new Punto(0,"Padedores de Yala", "Jujuy", "Argentina", desc, url, miniatura, "Hotel Fenicia","Linea El Hurbano Nro 53", "Un ratito caminando y otro a pie!!")
      let vResp = subirPuntoTuristico(punto)
      console.log(vResp)
    }else{
      console.log("Error al cargar la imagen del punto por ende se cancela el proceso")
    }
    

  }else {
    console.log("No se Selecciono ningun archivo.")
  }
})

*/

/*
// CARGAMOS UN PUNTO TURISTICO SIN LAS FOTOS ESO SERIA EL PASO SIGUIENTE
let desc = "El rio yala es un rio de alta montaña con aguas cristalinas, debilo a los años de erocion creo unos cañones que en la provincia se conbirtieon en un atractivo turistico"
let punto = new Punto(0,"Padedores de Yala", "Jujuy", "Argentina", desc, "", "", "Hotel Fenicia","Linea El Hurbano Nro 53", "Un ratito caminando y otro a pie!!")
let vResp = subirPuntoTuristico(punto)
console.log(vResp)
*/



/*
// CON ESTE METODO SE PUEDE CARGAR UNA IMAGEN AL SERVIDOR DE IMAGENS y nos regresa 3 datos
// url  que contiene la direccion de la foto en formato grande, osea pesada pero de mejor calidad en formato https://...
// miniatura tambien una url pero como dice de una foto en miniatura para una carga mas rapida tambien en formato http://....
// y success que si tiene un true como valor es que la foto se subio sin problemas
const idinputFile = "registro-foto-perfil"
document.getElementById(idinputFile).addEventListener('change', async () => {
  const inputFile = document.getElementById(idinputFile)
  if (inputFile.files.length > 0 ){ // Verificamos que haya un archivo en el input
    const [url, miniatura, success] = await subirImagen({ target: { files: [inputFile.files[0]] } })
    console.log("URL de la imagen: ", url);
    console.log("URL de la miniatura: ", miniatura);
    console.log("Éxito: ", success);

  }else {
    console.log("No se Selecciono ningun archivo.")
  }
})
*/

/*
// Forma de Controlar los eventos del HTML algo los implement Listener de java MVC
const idBtn = "search-button"
console.log("hola!")
document.getElementById(idBtn).addEventListener('click', () => prueba())
*/

/*
// FUNCION QUE LISTA TRAE TODOS LOS SITIO
async function mostrarPuntos(){
  try{
    const lista = await obtenerDatos()
    console.log("listar directamente ",lista)
    console.log("Listar un usuario directamente ", lista[2])
    console.log("Mostrar nombre del objeto usuario ", usuario.nombre)
    console.log("Mostrar directamente la variable ", nombre)
  }catch (error){
    console.log(error)
  }
}
mostrarPuntos()
*/



/*
// CREAR UN USUARIO NUEVO ES NECESARIO CARGAR TODOS LOS CAMPOS EN EL MISMO ORDEN QUE EN LA TABLA / NO CONTROLA SI YA EXISTE CREA UNO NUEVO Y PUNTO
let nuevo = new Usuario(0,"Bernardo","Dominguez",new Date,"dario","dario","","");
let respuesta = crearUsuario(nuevo);
console.log(respuesta)
*/

/*
// FUNCION QUE LISTA TODOS LOS USUARIOS
async function mostrarUsuarios(){
  try{
    const lista = await listarUsaurios()
    let usuario = lista[0]
    let nombre = lista[0].nombre
    console.log("listar directamente ",lista)
    console.log("Listar un usuario directamente ", lista[2])
    console.log("Mostrar nombre del objeto usuario ", usuario.nombre)
    console.log("Mostrar directamente la variable ", nombre)
  }catch (error){
    console.log(error)
  }
}
mostrarUsuarios()
*/

/*
// INTENTO MOSTRAR 1 SOLO USUARIO ESPECIFICO
async function traerUsuario(id){
  try {
    const usuario = await consultarUsuario(id)
    console.log("en la funcion ", usuario.nombre)
  }catch (error){
    console.error("Error al obtener el Usuario ", error.message)
  }
}
traerUsuario(1)
*/