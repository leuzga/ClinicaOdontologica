package com.c2.ClinicaOdontologica.repository;

import com.c2.ClinicaOdontologica.entity.Odontologo;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OdontologoRepository extends JpaRepository<Odontologo, Long> {
  Optional<Odontologo> findByMatricula(String matricula);
}
