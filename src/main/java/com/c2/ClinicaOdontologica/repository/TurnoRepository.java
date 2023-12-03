package com.c2.ClinicaOdontologica.repository;

import com.c2.ClinicaOdontologica.dto.FechaHoraDTO;
import com.c2.ClinicaOdontologica.entity.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TurnoRepository extends JpaRepository<Turno, Long> {

  @Query("SELECT h.fechaTurno,h.horaTurno FROM Turno h WHERE h.odontologo.id = :odontologo_id")
  List<Turno> findTurnoByOdontologoId(@Param("odontologo_id")Long odontologo_id);
}
