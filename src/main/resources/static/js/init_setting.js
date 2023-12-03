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
      const hora = String(j + 7).padStart(2, '0') + ':00:00';
      return hora;
    });

    asignacionesPorDia.push({
      fechaTurno: formatDate(fecha),
      horaTurno: horasDisponibles,
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
        (fh) => asignacion.fechaTurno === fh.fechaTurno
      );

      if (coincideFecha) {
        asignacion.horaTurno = asignacion.horaTurno.filter((h) => {
          return !fechasHoras.some(
            (fh) => fh.fechaTurno === asignacion.fechaTurno && fh.horaTurno === h
          );
        });

        if (asignacion.horaTurno.length === 0) {
          return filteredAsignaciones;
        }
      }

      return [...filteredAsignaciones, asignacion];
    },
    []
  );

  return resultado;
}

