window.addEventListener('load', function () {
  (function () {
    //con fetch invocamos a la API de peliculas con el método GET
    //nos devolverá un JSON con una colección de peliculas
    const url = '/odontologo' + '/todos';
    const settings = {
      method: 'GET',
    };

    fetch(url, settings)
      .then((response) => response.json())
      .then((data) => {
        //recorremos la colección de peliculas del JSON
        for (odontologo of data) {
          //por cada pelicula armaremos una fila de la tabla
          //cada fila tendrá un id que luego nos permitirá borrar la fila si eliminamos la pelicula
          var table = document.getElementById('odontologoTable');
          var odontologoRow = table.insertRow();
          let tr_id = 'tr_' + odontologo.id;
          odontologoRow.id = tr_id;

          //por cada pelicula creamos un boton delete que agregaremos en cada fila para poder eliminar la misma
          //dicho boton invocara a la funcion de java script deleteByKey que se encargará
          //de llamar a la API para eliminar una pelicula
          let deleteButton = `
              <button id="btn_delete_${odontologo.id}" type="button" onclick="deleteBy(${odontologo.id})" class="btn btn-danger btn_delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-trash3" viewBox="0 0 16 16">
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>
              </button>
            `;

          //por cada pelicula creamos un boton que muestra el id y que al hacerle clic invocará
          //a la función de java script findBy que se encargará de buscar la pelicula que queremos
          //modificar y mostrar los datos de la misma en un formulario.
          let updateButton = `
              <button id="btn_id_${odontologo.id}" type="button" onclick="findBy(${odontologo.id})" class="btn btn-info btn_id">
                ${odontologo.id}
              </button>
            `;
          let updateActionButton = `
              <button id="btn_id_${odontologo.id}" type="button" onclick="findBy(${odontologo.id})" class="btn btn-info btn_id">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
              </button>
            `;

          //armamos cada columna de la fila
          //como primer columna pondremos el boton modificar
          //luego los datos de la pelicula
          //como ultima columna el boton eliminar
          odontologoRow.innerHTML =
            '<td>' +
            updateButton +
            '</td>' +
            '<td class="td_matricula">' +
            odontologo.matricula.toUpperCase() +
            '</td>' +
            '<td class="td_nombre">' +
            odontologo.nombre.toUpperCase() +
            '</td>' +
            '<td class="td_apellido">' +
            odontologo.apellido.toUpperCase() +
            '</td>' +
            '<td>' +
            deleteButton +
            updateActionButton +
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
