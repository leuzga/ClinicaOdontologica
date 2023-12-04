package com.c2.ClinicaOdontologica.security;

import com.c2.ClinicaOdontologica.entity.Usuario;
import com.c2.ClinicaOdontologica.entity.UsuarioRole;
import com.c2.ClinicaOdontologica.repository.UsuarioRepository;
import com.c2.ClinicaOdontologica.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DatosInicialesSecurity implements ApplicationRunner {
    @Autowired
    UsuarioRepository usuarioRepository;


    @Override
    public void run(ApplicationArguments args) throws Exception {
        //crear un usuario como si fuese real

        BCryptPasswordEncoder cifrador= new BCryptPasswordEncoder();
        String passSinCifrar= "leuzga";
        String passCifrado= cifrador.encode(passSinCifrar);
        System.out.println("password: "+passCifrado);
/*      Usuario usuarioInsertar= new Usuario("Lenin","leuzga","leuzga@gmail.com",passCifrado, UsuarioRole.ROLE_ADMIN);
        usuarioRepository.save(usuarioInsertar);
        Usuario usuarioInsertar= new Usuario("Cleidy","cleidy","clidy@gmail.com",passCifrado, UsuarioRole.ROLE_USER);
        usuarioRepository.save(usuarioInsertar);*/

    }
}
