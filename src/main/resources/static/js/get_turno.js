window.addEventListener('load', function () {

  (function () {
    //recorremos la colección de los turnos
    //con fetch invocamos a la API con el método GET

    const url = '/turno' + '/todos';
    const settings = {
      method: 'GET',
    };

    fetch(url, settings)
        .then((response) => response.json())
        .then((data) => {
          //recorremos la colección de turnos del JSON
          //para mostrarlos en el listado
          for (turno of data) {
            //por cada turno armaremos una fila de la tabla
            //cada fila tendrá un id que luego nos permitirá borrar los turnos registrados
            var table = document.getElementById('turnoTable');
            var turnoRow = table.insertRow();
            let tr_id = 'tr_' + turno.id;
            turnoRow.id = tr_id;

            //por cada turno creamos un boton delete que agregaremos en cada fila para poder eliminar
            let deleteButton = `
              <button id="btn_delete_${turno.id}" type="button" onclick="deleteBy(${turno.id})" class="btn btn-danger btn_delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-trash3" viewBox="0 0 16 16">
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>
              </button>
            `;

            //armamos cada columna de la fila
            //como primer columna pondremos el boton modificar
            //luego los datos de la turno
            //como ultima columna el boton eliminar
            turnoRow.innerHTML =
                '<td>' +
                turno.id+
                '</td>' +
                '<td class="td_paciente">' +
                turno.paciente.cedula.toUpperCase()+'-'+turno.paciente.nombre.toUpperCase() +
                ' '+turno.paciente.apellido.toUpperCase()+
                '</td>' +
                '<td class="td_odontologo">' +
                turno.odontologo.matricula.toUpperCase()+'-'+turno.odontologo.nombre.toUpperCase() +
                ' '+turno.odontologo.apellido.toUpperCase()+
                '</td>' +
                '<td class="td_fechaTurno">' +
                turno.fechaTurno.toUpperCase() +
                '</td>' +
                '<td class="td_fechaTurno">' +
                turno.horaTurno.toUpperCase() +
                '</td>' +
                '<td>' +
                deleteButton +
                '</td>';

          }
        });
  })(function () {
    let pathname = window.location.pathname;
    if (pathname == '/index.html') {
      document.querySelector('.nav .nav-item a:last').addClass('active');
    }
  });
});

function deleteBy(id) {
  const url = '/turno' + '/' + id;
  const settings = {
    method: 'DELETE',
  };
  fetch(url, settings)
      .then((response) => {
        response.json();
        window.location.href = './get_turnos.html'
      })

      .catch((error) => {
        alert('Mensaje de la Operacion: ' + error.message);
      });
}
