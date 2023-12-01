package com.c2.ClinicaOdontologica.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;
import lombok.Setter;

@Data
//POJO
public class TurnoDTO {

  private Long id;
  private LocalDate fechaTurno;
  private LocalTime horaTurno;
  private Long pacienteId;
  private Long odontologoId;
}
