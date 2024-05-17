export async function subirPuntoTuristico(punto){
  try {
    const url = `https://sheetdb.io/api/v1/tv96lgxabh427`
    // Creamos un objeto de Datos con los datos del Objeto Punto
    const datosPunto = {
      data: {
        id: "INCREMENT", // Con esto el servidor de SheetDB le asigna un ID automaticamente
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
    }
    // Configuramos la solicitud POST
    const opciones = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(datosPunto),
    }
    // Enviamos la solicitud POST
    const response = await fetch(url,opciones)
    if (!response.ok){
      throw new Error("Error al guardar el Punto Turistico")
    }
    const data =  await response.json()
    return true // Si se guardo bien
  }catch(error) {
    console.error("Error ", error)
    return false
  }
}




import { Usuario } from "./objetos.js";


/**
 * Funcion que regresa un objeto con los registros que contengan un ID igual al pasado si por casualidad se crearn mas de 1 regresara todos pero solo mostrara el primero
 * @param {*} id 
 * @returns 
 */
export async function consultarUsuario(id){
  let resp = new Usuario;
  const url = `https://sheetdb.io/api/v1/tv96lgxabh427/search?id=${id}&sheet=usuarios` 
  const respuesta = await fetch(url)
  if (respuesta.ok) {
    const data = await respuesta.json()
    if (data && data.length > 0) {
      data.forEach(item => {
        const usuario = new Usuario(
          item.id,
          item.nombre,
          item.apellido,
          item.fechaNacimiento,
          item.usuario,
          item.clave,
          item.foto,
          item.fotoMiniatura
        )
        resp = (usuario)
      })
      return resp
    }else{
      return []
    }
  }else{
    // Si la respuesta del servidor no fue exitosa, lanzar un error o manejarlo según sea necesario
    throw new Error("Error al obtener los datos de los usuarios")
  }
}



/**
 *
 * @param {} id numerico
 * @id es el numero de usario de no tener -1 en dicho id se traeran todos
 */
export async function listarUsaurios() {
  let listaUsuarios = []
  const url = "https://sheetdb.io/api/v1/tv96lgxabh427?sheet=usuarios"
  const respuesta = await fetch(url)
  if (respuesta.ok) {
    const data = await respuesta.json()
    if (data && data.length > 0) {
      data.forEach(item => {
        const usuario = new Usuario(
          item.id,
          item.nombre,
          item.apellido,
          item.fechaNacimiento,
          item.usuario,
          item.clave,
          item.foto,
          item.fotoMiniatura
        )
        listaUsuarios.push(usuario)
      })
      return listaUsuarios
    }else{
      return []
    }
  }else{
    // Si la respuesta del servidor no fue exitosa, lanzar un error o manejarlo según sea necesario
    throw new Error("Error al obtener los datos de los usuarios")
  }
}

// datosFiltrados.forEach((obj) => {
//   const punto = new Punto(obj.descripcion, obj.titulo, obj.nombreImagen, obj.ubicacion);
//   punto.agregarPunto(document.getElementById("index-contenedor-resultados"));

/**
 * @param {*} usuario Clase Usuario
 *
 * para ser almacenada en el servidor SheetDB
 */
export async function crearUsuario(usuario) {
  const url = "https://sheetdb.io/api/v1/tv96lgxabh427?sheet=usuarios";
  // Cremos un objeto con los datos del usuario
  const datosUsuario = {
    data: {
      id: "INCREMENT",
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      fechaNacimiento: usuario.fechaNacimiento,
      usuario: usuario.usuario,
      clave: usuario.clave,
      foto: usuario.foto,
      fotoMiniatura: usuario.fotoMiniatura,
    },
  };
  // configuramos la solicitud POST
  const opciones = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datosUsuario),
  };
  // Enviamos la solicitud POST
  fetch(url, opciones)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Error al guardar el usuario");
      }
      return await response.json();
    })
    .then((data) => {
      console.log("Usuario Guardado Existosamente: ", data);
    })
    .catch((error) => {
      console.error("Error ", error);
    });
}

/********************************************************************/
// Funcion para obtener los datos de la Api SheetDB
// Definir el URL para usar un archivo en formato JSON para los Datos
//const urlApi = './assets/js/index-data.json';
// y en filtro se envian las palabras que queremos filtrar de la busqueda

import { Punto } from "./objetos.js";

export async function bajarPuntos(filtro) {
  const urlApi = "https://sheetdb.io/api/v1/tv96lgxabh427"; // Direccion para consultar el primer libro que tenga el endpoint
  return fetch(urlApi)
    .then((Response) => Response.json())
    .then((data) => {
      // filtramos los datos segun lo solicitado en el filtro
      
      const datosFiltrados = data.filter((obj) => {
        return (
          obj.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
          obj.provincia.toLowerCase().includes(filtro.toLowerCase()) ||
          obj.pais.toLowerCase().includes(filtro.toLowerCase()) ||
          obj.descripcion.toLowerCase().includes(filtro.toLowerCase()) ||
          obj.hospedajes.toLowerCase().includes(filtro.toLowerCase()) 
        );
      });
      return datosFiltrados;
    })
    .catch((error) => {
      console.error("Error al obtener los datos", error);
    });
}

// Funcion que sube imagenes a un servidor de Imagenes https://imgbb.com/ key de la pagina fb47470933bd10712434f449f011599a
// De la url borar el "expiration=600" ya que esto es un indicador de segundos que se almacenara la imagen antes de borrarla si la quitas las imagens quedan almacenadas para siempre dejar solo para pruebas XD
export async function subirImagen(archivo) {
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
    //console.log("Datos de Respuesta " + datosregresados);
    //console.log("URL " + datosregresados.data.url);
    //console.log("Miniatura " + datosregresados.data.thumb.url);
    //console.log("Estado " + datosregresados.success);
    return [datosregresados.data.url, datosregresados.data.thumb.url, datosregresados.success];
  } catch (error) {
    console.error(error);
  }
}
