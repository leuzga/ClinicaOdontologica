window.addEventListener('load', function () {
  //Al cargar la pagina buscamos y obtenemos el formulario donde estarán
  //los datos que el usuario cargará los turnos disponibles
  const disponibilidad = window.generarObjetoAsignaciones();
  let pacienteId = 0;
  //Temporalmente cargamos los turnos mientras esta el servicio
  let fechasHoras = [
    { fecha: '2023-12-01', hora: '07:00' },
    { fecha: '2023-12-03', hora: '08:00' },
    { fecha: '2023-12-05', hora: '09:00' },
  ];

  let turnosDisponibles  = window.filtrarAsignaciones(fechasHoras,disponibilidad);
  const selectTurno = document.querySelector('#fechaTurno')
  turnosDisponibles.forEach((fecha) => {
    const option = document.createElement('option');
    option.value = fecha.fecha;
    option.text = fecha.fecha;
    selectTurno.add(option);
  });

  window.actualizarHoras = function() {
    const fechaSeleccionada = document.getElementById('fechaTurno').value;
    const selectHoras = document.getElementById('horaTurno');

    // Encuentra el objeto correspondiente a la fecha seleccionada
    const objetoFecha = turnosDisponibles.find(obj => obj.fecha === fechaSeleccionada);

    // Limpia las opciones actuales
    selectHoras.innerHTML = '';

    // Llena el select con las horas correspondientes al objeto de fecha
    if (objetoFecha) {
      objetoFecha.horas.forEach(hora => {
        const opcion = document.createElement('option');
        opcion.value = hora;
        opcion.textContent = hora;
        selectHoras.appendChild(opcion);
      });
    }
  }

  const url = '/odontologo' + '/todos';
  const settings = {
    method: 'GET',
  };
  fetch(url, settings)
    .then((response) => response.json())
    .then((data) => {

      data.forEach((odontologo) => {
        const option = document.createElement('option');
        option.value = odontologo.id;
        option.text =  odontologo.nombre + ' ' + odontologo.apellido;
        odontologosTurno.add(option);
      })})
    .catch((error) => {
      console.log('Error: ' + error);
    });
  let emailPaciente = document.querySelector('#userEmail');


  window.findByEmail =function()  {

    const url = '/paciente/email/'+encodeURIComponent(emailPaciente.value);
    console.log(url);
    const settings = {
      method: 'GET',
    };

    fetch(url, settings)
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify(data, null, 2));
        document.querySelector('#nombre').value = data.nombre;
        document.querySelector('#apellido').value = data.apellido;
        document.querySelector('#cedula').value = data.cedula;
        document.querySelector('#email').value = data.email;
        pacienteId = data.id;
      })
      .catch((error) => {
        console.log('Error: ' + error);
      });
      document.querySelector('#userEmail').value = '';
  }

  const formulario = document.querySelector('#add_new_turno');

  //Ante un submit del formulario se ejecutará la siguiente funcion
  formulario.addEventListener('submit', function (event) {
    //creamos un JSON que tendrá los datos del formulario para insertar turno
    const formData = {
      paciente :{ id: pacienteId},
      odontologo: {id: document.querySelector('#odontologosTurno').value},
      fechaTurno: document.querySelector('#fechaTurno').value,
      horaTurno: document.querySelector('#horaTurno').value
    };

    //invocamos utilizando la función fetch la API peliculas con el método POST que guardará
    //la película que enviaremos en formato JSON
    const url = '/turnos';
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
        //Si no hay ningun error se muestra un mensaje diciendo que el turno fue agregado
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
    document.querySelector('#odontologosTurno').value = '';
    document.querySelector('#fechaTurno').value = '';
    document.querySelector('#horaTurno').value = '';
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
