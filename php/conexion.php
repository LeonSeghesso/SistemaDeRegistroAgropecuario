<?php
    $baseDeDatos = "agro";

    $conn = mysqli_connect("localhost", "root", "", $baseDeDatos);

    if (!$conn) {
        die("Error de conexión: " . mysqli_connect_error());
    }

    mysqli_set_charset($conn, "utf8mb4");
?>
