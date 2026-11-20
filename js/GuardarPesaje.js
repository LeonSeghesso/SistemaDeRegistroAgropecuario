$(document).ready(function() {
    $('#formPesaje').on('submit', function(e){
        e.preventDefault();

        const datos = {
            id_animal: $('#animal_pesaje').val(),
            peso: $('#peso_pesaje').val(),
            fecha_pesaje: $('#fecha_pesaje').val()
        };

        $.ajax({
            url: 'php/guardar_pesaje.php',
            type: 'POST',
            data: datos,
            dataType: 'json',

            success: function(response){
                if (response.exito){
                    $("#resultadoPesaje").html('<div class="alert alert-success">Pesaje registrado (ID: ' + response.id + ')</div>');
                    $('#formPesaje')[0].reset();
                    window.cargarListado(); // refresca el listado con el peso actualizado
                } else {
                    $("#resultadoPesaje").html('<div class="alert alert-danger">Error: ' + response.mensaje + '</div>');
                }
            },
            error: function(){
                console.log("Se produjo un error");
                $("#resultadoPesaje").html('<div class="alert alert-danger">Error al guardar el pesaje.</div>');
            },
            complete: function(){
                console.log("Proceso Finalizado.");
            }
        });
    });
});
