package com.c2.ClinicaOdontologica.dto;

import java.time.LocalDate;
import lombok.Data;
import lombok.Setter;

@Data
//POJO
public class TurnoDTO {

  private Long id;
  private LocalDate fechaTurno;
  private Long pacienteId;
  private Long odontologoId;
}
