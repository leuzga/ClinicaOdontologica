package com.c2.ClinicaOdontologica.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import javax.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "turnos")
public class Turno {


  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "paciente_id", referencedColumnName = "id")
  private Paciente paciente;

  @ManyToOne
  @JoinColumn(name = "odontologo_id", referencedColumnName = "id")
  private Odontologo odontologo;

  @Column
  private LocalDate fechaTurno;

  @Column
  private LocalTime horaTurno;
  public Turno() {}

  public Turno(
    Long id,
    Paciente paciente,
    Odontologo odontologo,
    LocalDate fechaTurno,
    LocalTime horaTurno
  ) {
    this.id = id;
    this.paciente = paciente;
    this.odontologo = odontologo;
    this.fechaTurno = fechaTurno;
    this.horaTurno = horaTurno;
  }

  public Turno(LocalTime horaTurno, Paciente paciente, Odontologo odontologo, LocalDate fechaTurno) {
    this.horaTurno = horaTurno;
    this.paciente = paciente;
    this.odontologo = odontologo;
    this.fechaTurno = fechaTurno;
  }

  public LocalTime getHoraTurno() {
    return horaTurno;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Paciente getPaciente() {
    return paciente;
  }

  public void setPaciente(Paciente paciente) {
    this.paciente = paciente;
  }

  public Odontologo getOdontologo() {
    return odontologo;
  }

  public void setOdontologo(Odontologo odontologo) {
    this.odontologo = odontologo;
  }

  public LocalDate getFechaTurno() {
    return fechaTurno;
  }

  public void setFechaTurno(LocalDate fechaTurno) {
    this.fechaTurno = fechaTurno;
  }

  @Override
  public String toString() {
    return "Turno{" +
      "horaTurno=" + horaTurno +
      ", id=" + id +
      ", paciente=" + paciente +
      ", odontologo=" + odontologo +
      ", fechaTurno=" + fechaTurno +
      '}';
  }
}
