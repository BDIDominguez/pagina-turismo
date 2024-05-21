//esta es una pagina donnde puse juntas las funciones que yo utilizo en mi adriana.js
//Fue para mi orden personal y para ver si importandolas desde un archivo separado funcionaba



export class Punto {
    constructor(id, nombre, provincia, pais, descripcion, fotourl, miniaturaurl, hospedajes, transporte, formas_llegar) {
      this.id = id
      this.nombre = nombre
      this.provincia = provincia
      this.pais = pais
      this.descripcion = descripcion
      this.fotourl = fotourl
      this.miniaturaurl = miniaturaurl
      this.hospedajes = hospedajes
      this.transporte = transporte
      this.formas_llegar = formas_llegar
    }
  
    // metodo para agregar un punto a la pagina
    agregarPunto(contenedor) {
      // creamos el html para ser agregado al contenedor
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
      console.log("ruta a la miniatura", this.miniaturaurl)
      
      // agregamos al div los elemento
      contenedorPunto.appendChild(elementoImagen);
      contenedorPunto.appendChild(elementoTitulo);
      contenedorPunto.appendChild(elementoDescripcion);
      contenedorPunto.appendChild(elementoUbicacion);
      contenedorPunto.appendChild(elementoTransporte);
      contenedorPunto.appendChild(elementoHospedajes);
      // Agregamos el el div a la pagina
      contenedor.appendChild(contenedorPunto);
    }
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
  