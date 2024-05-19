import {
  subirImagen,
  subirSuscriptor,
  consultarSuscriptor,
  consultarUsuarioDNI,
  subirUsuario,
} from "./persistencia.js";
import { Usuario } from "./objetos.js";

document.addEventListener("DOMContentLoaded", function () {
  // Funcion para la carga del usuario
  document.getElementById("registrar-boton-cargar").addEventListener("click", cargarRegistro);

  // Funcion que carga el usuario de no encontrar el mismo dni en la base de datos
  async function cargarRegistro() {
    const dni = document.getElementById("registrar-dni").value
    const existe = await consultarUsuarioDNI(document.getElementById("registrar-correo").value);
    if (existe.dni !== dni ) {
      const fechaNacimiento = new Date(document.getElementById("registrar-fecha-nacimiento").value);
      const fechaFormateada = fechaNacimiento.toISOString().split('T')[0];
      const imagen = document.getElementById("registrar-foto-actual")
      const fullsize = ""
      if (imagen.getAttribute("data-fullsize") != null){
        fullsize = imagen.getAttribute("data-fullsize")
      }
      const usuario = new Usuario(
        0,
        dni,
        document.getElementById("registrar-correo").value,
        document.getElementById("registrar-nombre").value,
        document.getElementById("registrar-apellido").value,
        fechaFormateada,
        document.getElementById("registrar-nombre-usuario").value,
        document.getElementById("registrar-clave").value,
        imagen.src,
        fullsize
      );
      const vResp = await subirUsuario(usuario);
      if (vResp){
        alert("Se cargo con exito el usuario")
      }else{
        alert("Hubo un error al cargar el usuario")
      }
    } else {
      alert("Ese Usuario ya existe");
    }
  }

  // Cargamos la imagen seleccionada al servidor y le regresamos las rutas relativas a las fotos cargadas
  const idinputFile = "registrar-foto-perfil";
  document.getElementById(idinputFile).addEventListener("change", async () => {
    const inputFile = document.getElementById(idinputFile);
    if (inputFile.files.length > 0) {
      // Verificamos que haya un archivo en el input
      const [url, miniatura, success] = await subirImagen({
        target: { files: [inputFile.files[0]] },
      });
      document.getElementById("registrar-foto-actual").src = miniatura;
      document.getElementById("registrar-foto-actual").setAttribute("data-fullsize", url);
      // console.log("URL de la imagen: ", url);
      // console.log("URL de la miniatura: ", miniatura);
      // console.log("Éxito: ", success);
    } else {
      console.log("No se Selecciono ningun archivo.");
    }
  });

  // SECCION DEL SUSCRIBIR CARGA Y CONTROL
  const btSuscrptor = "footer-boton-suscriptor";
  // ESCUCHAMOS AL BOTON SUSCRIBIR Y LLAMAMOS A LA FUNCION DE CARGA
  document.getElementById(btSuscrptor).addEventListener("click", () => cargarSuscriptor());

  // ESCUCHAMOS AL INPUT POR SI ALGUINE PRECIONA ENTER QUE EJECUTE LA FUNCION DE CARGA
  document.getElementById("footer-text-subscribir").addEventListener("keydown", function (event) {
    // Verificar si la tecla presionada es Enter
    if (event.key === "Enter") {
      // Detener la propagación del evento para evitar el envío del formulario
      event.preventDefault();
      cargarSuscriptor();
    }
  });

  // FUNCION DE CARGA DEL CORREO
  async function cargarSuscriptor() {
    let correo = document.getElementById("footer-text-subscribir").value;
    let re = /\S+@\S+\.\S+/; // Explecion regular para validar el correo no se como funciona Todavia XD
    if (re.test(correo)) {
      // regresa true si es correo sino regresa false
      // COMPROBAR QUE EL CORREO NO EXISTE
      let existe = await consultarSuscriptor(correo);
      if (existe) {
        alert("paraaaaaa ansioooosooo  ya estas suscripto!!! -- Gracias por elegirnos");
      } else {
        // CARGAMOS EL CORREO AL ENDPOINT
        let respuesta = subirSuscriptor(correo);
        if (respuesta) {
          alert("Gracias por suscribirte!!");
          document.getElementById("footer-text-subscribir").value = "";
        }
      }
    } else {
      alert("Correo no Valido");
      document.getElementById("footer-text-subscribir").select();
    }
  }
}); // FIN DEL DOMContentLoaded
