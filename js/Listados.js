$(document).ready(function() {
    $('#formAnimal').on('submit', function(e){
        e.preventDefault();

        const datos = {
            raza: $('#raza').val(),
            peso: $('#peso').val(),
            fecha_nacimiento: $('#fecha_nacimiento').val()
        };

        $.ajax({
            url: 'php/guardar_animal.php',
            type: 'POST',
            data: datos,
            dataType: 'json',

            success: function(response){
                if (response.exito){
                    $("#resultado").html('<div class="alert alert-success">Animal guardado con ID: ' + response.id + '</div>');
                    $('#formAnimal')[0].reset();
                    window.cargarListado(); // refresca el listado y el select de pesajes
                } else {
                    $("#resultado").html('<div class="alert alert-danger">Error: ' + response.mensaje + '</div>');
                }
            },
            error: function(){
                console.log("Se produjo un error");
                $("#resultado").html('<div class="alert alert-danger">Error al guardar.</div>');
            },
            complete: function(){
                console.log("Proceso Finalizado.");
            }
        });
    });
});
