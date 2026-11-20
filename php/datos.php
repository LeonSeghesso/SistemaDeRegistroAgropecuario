<?php
    header('Content-Type: application/json');
    include("conexion.php");

    $query = "
        SELECT
            a.id,
            a.raza,
            a.peso AS peso_inicial,
            a.fecha_nacimiento,
            COALESCE(up.peso, a.peso) AS peso_actual,
            up.fecha_pesaje AS fecha_ultimo_pesaje
        FROM animales a
        LEFT JOIN (
            SELECT p1.id_animal, p1.peso, p1.fecha_pesaje
            FROM pesajes p1
            INNER JOIN (
                SELECT id_animal, MAX(fecha_pesaje) AS max_fecha
                FROM pesajes
                GROUP BY id_animal
            ) p2 ON p1.id_animal = p2.id_animal AND p1.fecha_pesaje = p2.max_fecha
        ) up ON up.id_animal = a.id
        WHERE a.deleted_at IS NULL
        ORDER BY a.id
    ";

    $result = mysqli_query($conn, $query);

    if (!$result) {
        die(json_encode(['error' => 'Query failed: ' . mysqli_error($conn)]));
    }

    $datos = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $datos[] = array(
            "id" => $row["id"],
            "raza" => $row["raza"],
            "peso_inicial" => $row["peso_inicial"],
            "fecha_nacimiento" => $row["fecha_nacimiento"],
            "peso_actual" => $row["peso_actual"],
            "fecha_ultimo_pesaje" => $row["fecha_ultimo_pesaje"]
        );
    }

    echo json_encode($datos, JSON_UNESCAPED_UNICODE);

    mysqli_close($conn);
?>
