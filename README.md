# Agro System

Sistema web para registrar animales y su historial de pesajes.
Hecho con PHP, MySQL, jQuery (AJAX) y Bootstrap.

## Requisitos
- XAMPP / WAMP / Laragon (Apache + PHP + MySQL)

## Instalación
1. Clonar o copiar la carpeta `agroSystem` dentro de `htdocs` (XAMPP) o `www` (WAMP).
2. Iniciar Apache y MySQL.
3. Importar la base de datos:
   - **phpMyAdmin:** pestaña *Importar* → elegir `database/agro.sql` → *Continuar*.
   - **Consola:** `mysql -u root -p < database/agro.sql`
4. Abrir `http://localhost/agroSystem/`.

Si tu MySQL tiene otro usuario o contraseña, definí las variables de entorno
`DB_HOST`, `DB_USER`, `DB_PASS` y `DB_NAME`, o editá `php/conexion.php`.

## Estructura
- `index.html`: interfaz
- `js/`: llamadas AJAX
- `php/`: endpoints que hablan con MySQL
- `database/agro.sql`: tablas `animales` y `pesajes` (+ datos de ejemplo)


## Créditos
- `Desarrollador`: Emmanuel León Seghesso
- `Asignatura`: Programacion III 
- `Carrera`: Tecnicatura en Analisis y Desarrollo de Software
- `Institucion`: Instituto Superior "Gapar L. Benavento"