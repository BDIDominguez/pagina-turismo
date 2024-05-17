// Definir el URL para usar un archivo en formato JSON para los Datos
const urlApi = './assets/js/index-data.json';

// Funcion para guardar los datos en el archivo JSON
function guardarDatos() {
    // Obtener los valores del formulario
    var nombre = document.getElementById('nombre').value;
    var provincia = document.getElementById('provincia').value;
    var pais = document.getElementById('pais').value;
    var descripcion = document.getElementById('descripcion').value;
    var fotoInput = document.getElementById('foto'); // Input de la foto
    var foto = fotoInput.files[0]; // Obtener el archivo de la foto seleccionada
    var hospedajes = document.getElementById('hospedajes').value;
    var transporte = document.getElementById('transporte').value;
    var formas_llegar = document.getElementById('formas_llegar').value;

    // Crear un objeto con los datos del formulario
    const nuevoSitio = {
        
        "nombre": nombre,
        "provincia": provincia,
        "pais": pais,
        "descripcion": descripcion,
        "foto": foto.name, // Guardar solo el nombre del archivo
        "hospedajes": hospedajes,
        "transporte": transporte,
        "formas_llegar": formas_llegar
    };

    // Obtener los datos existentes del archivo JSON
    fetch(urlApi)
        .then(response => response.json())
        .then(data => {
            // Agregar el nuevo sitio al array de datos existentes
            data.push(nuevoSitio);
            // Convertir el objeto de datos a una cadena JSON
            const jsonData = JSON.stringify(data, null, 4);
            
            // Crear un blob con los datos JSON
            const blob = new Blob([jsonData], { type: 'application/json' });
            
            // Crear una URL para el blob
            const blobURL = URL.createObjectURL(blob);
            
            // Crear un enlace para descargar el archivo JSON
            const a = document.createElement('a');
            a.href = blobURL;
            a.download = 'index-data.json';
            
            // Simular un clic en el enlace
            a.click();
            
            // Liberar el objeto URL creado
            URL.revokeObjectURL(blobURL);
        })
        .catch(error => {
            console.error('Error al obtener los datos del archivo JSON', error);
            alert("Error al obtener los datos del archivo JSON");
        });
}
