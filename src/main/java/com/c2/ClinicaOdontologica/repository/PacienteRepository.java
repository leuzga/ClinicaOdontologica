package com.c2.ClinicaOdontologica.repository;

import com.c2.ClinicaOdontologica.entity.Paciente;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {
  Optional<Paciente> findByEmail(String email);
}
