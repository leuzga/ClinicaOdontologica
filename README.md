# ClinicaOdontologica

## Tips para inicalizar la Aplicación

### Información General

1. La aplicacion posee dos roles que pueden ser creados usando los comandos que aparecen en el archivo DatosInicialesSecurity dentro de la carpeta security.
2. En la archivo de propiedades dentro de la carpeta resources, se encuentra el archivo application.properties, este contiene la configuracion basica para iniciar la base de datos H2 y el ORM Hibernate
   - hay 2 versiones para configurar h2 en memoria y h2 con respaldo a disco, solo se debe desmarcar el comentario de lo que se desea usar.
3. La aplicacion esta configurada para navegar de forma segura utilizando spring security, este está configurado en el archivo WebSecurityConfig que se encuentra en la carpeta security
   - hay 2 versiones navegar sin seguridad de ningun tipo, y navegacion con todos los url utilizados en la aplicacion de forma segura, solo el ROLE ADMIN podra hacer todo en la aplicacion
