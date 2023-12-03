package com.c2.ClinicaOdontologica.controller;

import com.c2.ClinicaOdontologica.entity.Odontologo;
import com.c2.ClinicaOdontologica.exception.ResorceNotFoundException;
import com.c2.ClinicaOdontologica.service.OdontologoService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/odontologo")
public class OdontologoController {

  // relacion de asociacion con el servicio
  @Autowired
  private OdontologoService odontologoService;

  @PutMapping
  public ResponseEntity<String> actualizarOdontologo(
    @RequestBody Odontologo odontologo
  ) {
    Optional<Odontologo> odontologoBuscado = odontologoService.buscarPorId(
      odontologo.getId()
    );

    if (odontologoBuscado.isPresent()) {
      odontologoService.actualizarOdontologo(odontologo);

      return ResponseEntity.ok("Odontologo actualizado");
    } else {
      return ResponseEntity.badRequest().body("Odontologo no encontrado");
    }
  }

  @GetMapping("/{id}")
  public ResponseEntity<Optional<Odontologo>> buscarPorID(
    @PathVariable Long id
  ) {
    return ResponseEntity.ok(odontologoService.buscarPorId(id));
  }

  @GetMapping("/busqueda/{matricula}")
  public ResponseEntity<Optional<Odontologo>> buscarPorMatricula(
    @PathVariable String matricula
  ) {
    return ResponseEntity.ok(odontologoService.buscarPorMatricula(matricula));
  }

  @GetMapping("/todos")
  public ResponseEntity<List<Odontologo>> buscarTodos() {

    return ResponseEntity.ok(odontologoService.listarTodos());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> eliminarOdontologo(@PathVariable Long id)
    throws ResorceNotFoundException {
    Optional<Odontologo> odontologoBuscado = odontologoService.buscarPorId(id);

    if (odontologoBuscado.isEmpty()) {
      throw new ResorceNotFoundException(
        "No se pudo eliminar el odontologo, debido a que no existe"
      );
    } else {
      odontologoService.eliminarOdontologo(id);

      return ResponseEntity.ok("Se elmino con exito");
    }
  }

  @PostMapping
  public ResponseEntity<Odontologo> registrarOdontologo(
    @RequestBody Odontologo odontologo
  ) {
    return ResponseEntity.ok(odontologoService.registrarOdontologo(odontologo));
  }
}
