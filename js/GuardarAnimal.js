$(document).ready(function() {
    let listadoVisible = false;

    $("#btn_obtener").click(function(){
        if (listadoVisible) {
            $("#listado").fadeOut(300, function(){
                $(this).empty();
            });
            $("#btn_obtener").text("Mostrar Registros");
            listadoVisible = false;
        } else {
            cargarListado(true);
            $("#btn_obtener").text("Ocultar Registros");
            listadoVisible = true;
        }
    });

    // mostrarTabla=true arma y muestra la tabla; false solo actualiza el select de animales
    function cargarListado(mostrarTabla){
        $.ajax({
            url: 'php/datos.php',
            dataType: 'json',

            success: function(response){
                console.log(response);

                let opcionesAnimal = '<option value="" selected disabled>Seleccione un animal</option>';
                response.forEach(function(animal){
                    opcionesAnimal += `<option value="${animal.id}">#${animal.id} - ${animal.raza}</option>`;
                });
                $("#animal_pesaje").html(opcionesAnimal);

                if (!mostrarTabla) return;

                if (!response.length) {
                    $("#listado").html('<p class="text-muted">No hay animales registrados.</p>').hide().fadeIn(500);
                    return;
                }

                let contenido = `
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Raza</th>
                                <th>Peso Inicial</th>
                                <th>Peso Actual</th>
                                <th>Último Pesaje</th>
                                <th>Fecha Nacimiento</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>`;

                response.forEach(function(animal){
                    contenido += `<tr>
                        <td>${animal.id}</td>
                        <td>${animal.raza}</td>
                        <td>${animal.peso_inicial}</td>
                        <td>${animal.peso_actual}</td>
                        <td>${animal.fecha_ultimo_pesaje ?? '-'}</td>
                        <td>${animal.fecha_nacimiento}</td>
                        <td>
                            <button class="btn btn-sm btn-outline-secondary btn-historial" data-id="${animal.id}" data-raza="${animal.raza}">
                                Ver Historial
                            </button>
                            <button class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${animal.id}" data-raza="${animal.raza}">
                                Eliminar
                            </button>
                        </td>
                    </tr>`;
                });

                contenido += '</tbody></table>';

                $("#listado").hide();
                $("#listado").html(contenido);
                $("#listado").fadeIn(500);
            },
            error: function(){
                console.log("Se produjo un error al obtener los datos");
                $("#listado").html('<p class="text-danger">Error al cargar los datos.</p>').hide().fadeIn(500);
            },
            complete: function(){
                console.log("Proceso Finalizado.");
            }
        });
    }

    // Al abrir la página, solo poblamos el select de animales
    cargarListado(false);

    // Delegado porque las filas se generan dinámicamente
    $(document).on('click', '.btn-historial', function(){
        const idAnimal = $(this).data('id');
        const raza = $(this).data('raza');

        $("#contenidoHistorial").html('Cargando...');
        bootstrap.Modal.getOrCreateInstance(document.getElementById('modalHistorial')).show();

        $.ajax({
            url: 'php/obtener_pesajes.php',
            data: { id_animal: idAnimal },
            dataType: 'json',
            success: function(response){
                if (!response.length) {
                    $("#contenidoHistorial").html('<p class="text-muted">Sin pesajes registrados para el animal #' + idAnimal + ' (' + raza + ').</p>');
                    return;
                }

                let tabla = `
                    <p><strong>Animal #${idAnimal} - ${raza}</strong></p>
                    <table class="table table-sm">
                        <thead>
                            <tr><th>Fecha</th><th>Peso</th></tr>
                        </thead>
                        <tbody>`;

                response.forEach(function(p){
                    tabla += `<tr><td>${p.fecha_pesaje}</td><td>${p.peso}</td></tr>`;
                });

                tabla += '</tbody></table>';
                $("#contenidoHistorial").html(tabla);
            },
            error: function(){
                $("#contenidoHistorial").html('<p class="text-danger">Error al cargar el historial.</p>');
            }
        });
    });

    // Eliminar animal (borrado lógico: el registro queda en la base, solo deja de mostrarse)
    $(document).on('click', '.btn-eliminar', function(){
        const idAnimal = $(this).data('id');
        const raza = $(this).data('raza');

        if (!confirm('¿Eliminar el animal #' + idAnimal + ' (' + raza + ')?')) {
            return;
        }

        $.ajax({
            url: 'php/eliminar_animal.php',
            type: 'POST',
            data: { id: idAnimal },
            dataType: 'json',
            success: function(response){
                if (response.exito) {
                    window.cargarListado();
                } else {
                    alert('No se pudo eliminar: ' + response.mensaje);
                }
            },
            error: function(){
                alert('Error al eliminar el animal.');
            }
        });
    });

    // Exponer para que otros scripts (Listados.js, GuardarPesaje.js) refresquen tras guardar
    window.cargarListado = function(){
        cargarListado(listadoVisible);
    };
});