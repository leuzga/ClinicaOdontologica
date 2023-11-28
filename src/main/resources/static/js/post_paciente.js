window.addEventListener('load', function () {
  //Al cargar la pagina buscamos y obtenemos el formulario donde estarán
  //los datos que el usuario cargará de la nueva pelicula
  const formulario = document.querySelector('#add_new_paciente');

  //Ante un submit del formulario se ejecutará la siguiente funcion
  formulario.addEventListener('submit', function (event) {
    //creamos un JSON que tendrá los datos del formulario para insertar odontologo
    const formData = {
      nombre: document.querySelector('#nombre').value,
      apellido: document.querySelector('#apellido').value,
      matricula: document.querySelector('#cedula').value,
      matricula: document.querySelector('#fechaIngreso').value,
      matricula: document.querySelector('#domicilio').value,
      matricula: document.querySelector('#email').value,

    };
    //invocamos utilizando la función fetch la API peliculas con el método POST que guardará
    //la película que enviaremos en formato JSON
    const url = '/paciente';
    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    fetch(url, settings)
      .then((response) => response.json())
      .then((data) => {
        //Si no hay ningun error se muestra un mensaje diciendo que el odontologo fue agregado
        //se agrego bien
        let successAlert = `<div class="alert alert-success alert-dismissible">
          <button type="button" class="close" data-dismiss="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
          </button>
          <strong>Paciente agregado</strong>
        </div>`;

        document.querySelector('#response').innerHTML = successAlert;
        setTimeout(() => {
          document.querySelector('#response').style.display = 'block';
          resetUploadForm();
        }, 4000)
      })
      .catch((error) => {
        //Si hay algun error se muestra un mensaje diciendo que la pelicula
        //no se pudo guardar y se intente nuevamente
        let errorAlert =
        `<div class="alert alert-success alert-dismissible">
        <button type="button" class="close" data-dismiss="alert">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
          </svg>
        </button>
        <strong>Error intentelo nuevamente</strong>
      </div>`;

      document.querySelector('#response').innerHTML = errorAlert;
      setTimeout(() => {
        document.querySelector('#response').style.display = 'block';
        //se dejan todos los campos vacíos por si se quiere ingresar otra paciente
        resetUploadForm();
      }, 4000)
      });
  });

  function resetUploadForm() {
    document.querySelector('#nombre').value = '';
    document.querySelector('#apellido').value = '';
    document.querySelector('#cedula').value = '';
    document.querySelector('#fechaIngreso').value = '';
    document.querySelector('#domicilio').value = '';
    document.querySelector('#email').value = '';
  }

  (function () {
    let pathname = window.location.pathname;
    if (pathname === '/') {
      document.querySelector('.nav .nav-item a:first').addClass('active');
    } else if (pathname == '/index.html') {
      document.querySelector('.nav .nav-item a:last').addClass('active');
    }
  })();
});
