import { subirImagen } from "./persistencia.js"

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