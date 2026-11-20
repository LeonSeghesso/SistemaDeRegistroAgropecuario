<?php
    $host = getenv("DB_HOST") ?: "localhost";
    $user = getenv("DB_USER") ?: "root";
    $pass = getenv("DB_PASS") ?: "";
    $baseDeDatos = getenv("DB_NAME") ?: "agro";

    $conn = mysqli_connect($host, $user, $pass, $baseDeDatos);

    if (!$conn) {
        die(json_encode(['error' => 'Error de conexión: ' . mysqli_connect_error()]));
    }

    mysqli_set_charset($conn, "utf8mb4");
?>