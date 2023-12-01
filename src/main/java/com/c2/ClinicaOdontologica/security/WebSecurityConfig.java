package com.c2.ClinicaOdontologica.security;

import com.c2.ClinicaOdontologica.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
  @Autowired
  private UsuarioService usuarioService;
  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;

  @Bean
  public DaoAuthenticationProvider daoAuthenticationProvider() {
    DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
    provider.setPasswordEncoder(bCryptPasswordEncoder);
    provider.setUserDetailsService(usuarioService);
    return provider;


  }

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.authenticationProvider(daoAuthenticationProvider());

  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
/*    http
      .csrf().disable()
      .authorizeRequests()
      .antMatchers("/get_pacientes.html", "/post_pacientes.html", "/index.html").hasRole("ADMIN")
      .antMatchers("/get_odontologos.html", "/post_odontologos.html").hasRole("ADMIN")
      .antMatchers("/get_turnos.html", "/post_turnos.html").hasRole("ADMIN")
      .antMatchers("/odontologo", "/odontologo/{id}", "/odontologo/busqueda/{matricula}", "/odontologo/todos").hasRole("ADMIN")
      .antMatchers("/paciente", "/paciente/{id}", "/paciente/busqueda/{email}", "/paciente/todos").hasRole("ADMIN")
      .antMatchers("/turnos", "/turnos/{id}", "/turnos/buscar/{email}", "/turnos/todos").hasRole("ADMIN")
      .antMatchers("/css/**", "/js/**", "/assets/**").permitAll()
      .antMatchers("/h2-console/**").permitAll()
      .anyRequest().denyAll()
      .and()
      .formLogin()
      .and()
      .logout();*/

      http
        .authorizeRequests()
        .antMatchers("/**").permitAll()  // Permitir todas las solicitudes sin autenticación
        .and()
        .csrf().disable();  // Deshabilitar CSRF (puede ser necesario según tu configuración)


    http
      .headers().frameOptions().sameOrigin();

  }
}
