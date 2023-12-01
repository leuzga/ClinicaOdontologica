let isShow = false;
localStorage.setItem('isShow', JSON.stringify(isShow));
let showDomicilio = false;
localStorage.setItem('showDomicilio', JSON.stringify(showDomicilio));

/* Inicializar la disponibilidad horaria de turnos por defecto */
window.generarObjetoAsignaciones = function(){
  const asignacionesPorDia = [];
  const fechaActual = new Date();

  for (let i = 0; i < 7; i++) {
    const fecha = new Date();
    fecha.setDate(fechaActual.getDate() + i);
    const horasDisponibles = Array.from({ length: 10 }, (_, j) => {
      const hora = String(j + 7).padStart(2, '0') + ':00';
      return hora;
    });

    asignacionesPorDia.push({
      fecha: formatDate(fecha),
      horas: horasDisponibles,
    });
  }

  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  return asignacionesPorDia;
}

// Ejemplo de uso
//let asignaciones = generarObjetoAsignaciones();

window.filtrarAsignaciones = function(fechasHoras, arregloOriginal) {
  if (!fechasHoras || fechasHoras.length === 0) {
    return JSON.parse(JSON.stringify(arregloOriginal));
  }

  const copiaAsignaciones = JSON.parse(JSON.stringify(arregloOriginal));

  const resultado = copiaAsignaciones.reduce(
    (filteredAsignaciones, asignacion) => {
      const coincideFecha = fechasHoras.some(
        (fh) => asignacion.fecha === fh.fecha
      );

      if (coincideFecha) {
        asignacion.horas = asignacion.horas.filter((h) => {
          return !fechasHoras.some(
            (fh) => fh.fecha === asignacion.fecha && fh.hora === h
          );
        });

        if (asignacion.horas.length === 0) {
          return filteredAsignaciones;
        }
      }

      return [...filteredAsignaciones, asignacion];
    },
    []
  );

  return resultado;
}

window.actualizarHoras = function() {
  const fechaSeleccionada = document.getElementById('fechaTurno').value;
  const selectHoras = document.getElementById('horaTurno');

  // Encuentra el objeto correspondiente a la fecha seleccionada
  const objetoFecha = arregloDeFechas.find(obj => obj.fecha === fechaSeleccionada);

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
