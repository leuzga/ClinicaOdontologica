window.addEventListener('load', function () {
  //Al cargar la pagina buscamos y obtenemos el formulario donde estarán
  //los datos que el usuario cargará de la nueva pelicula
  const formulario = document.querySelector('#add_new_odontologo');

  //Ante un submit del formulario se ejecutará la siguiente funcion
  formulario.addEventListener('submit', function (event) {
    //creamos un JSON que tendrá los datos del formulario para insertar odontologo
    const formData = {
      matricula: document.querySelector('#matricula').value,
      nombre: document.querySelector('#nombre').value,
      apellido: document.querySelector('#apellido').value,
    };
    //invocamos utilizando la función fetch la API peliculas con el método POST que guardará
    //la película que enviaremos en formato JSON
    const url = '/odontologo';
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
        let successAlert =
          '<div class="alert alert-success alert-dismissible">' +
          '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
          '<strong>Odontologo agregado</strong> </div>';

        document.querySelector('#response').innerHTML = successAlert;
        setTimeout(() => {
          document.querySelector('#response').style.display = 'block';
          resetUploadForm();
        }, 4000);
      })
      .catch((error) => {
        //Si hay algun error se muestra un mensaje diciendo que la pelicula
        //no se pudo guardar y se intente nuevamente
        let errorAlert =
          '<div class="alert alert-danger alert-dismissible">' +
          '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
          '<strong> Error intente nuevamente</strong> </div>';

        document.querySelector('#response').innerHTML = errorAlert;
        setTimeout(() => {
          document.querySelector('#response').style.display = 'block';
          resetUploadForm();
        }, 4000);
      });
  });

  function resetUploadForm() {
    document.querySelector('#matricula').value = '';
    document.querySelector('#nombre').value = '';
    document.querySelector('#apellido').value = '';
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
