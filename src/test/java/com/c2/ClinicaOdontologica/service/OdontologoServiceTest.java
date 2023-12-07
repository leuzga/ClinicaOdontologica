package com.c2.ClinicaOdontologica.service;


import com.c2.ClinicaOdontologica.entity.Odontologo;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
public class OdontologoServiceTest {

    @Autowired
    private OdontologoService odontologoService;

    @Test
    @Order(1)
    public void guardarOdontologo(){
        //que necesitamos para guardar un odontologo
        Odontologo odontologo= new Odontologo("12345", "Cleidy","Canelon");
        odontologoService.registrarOdontologo(odontologo);
        assertEquals(1L,odontologo.getId());
    }
    @Test
    @Order(2)
    public void buscarOdontologoPorId(){
        Long id=1L;
        Optional<Odontologo> odontologoBuscado= odontologoService.buscarPorId(id);
        assertNotNull(odontologoBuscado);
    }
    @Test
    @Order(3)
    public void buscarodontologosTest(){
        List<Odontologo> odontologos= odontologoService.listarTodos();
        assertEquals(1,odontologos.size());
    }
    @Test
    @Order(4)
    public void actualizarodontologo(){
        Odontologo odontologoActualizar= new Odontologo("54321", "Maria","Canelon");
        odontologoService.actualizarOdontologo(odontologoActualizar);
        Optional<Odontologo> odontologoBuscado= odontologoService.buscarPorId(1L);
        assertEquals("Maria",odontologoBuscado.get().getNombre());
    }

    @Test
    @Order(5)
    public void eliminarodontologo(){
        Long idEliminar= 1L;
        odontologoService.eliminarOdontologo(1L);
        Optional<Odontologo> eliminado= odontologoService.buscarPorId(1L);
        assertFalse(eliminado.isPresent());

    }
}
