<?php
    header('Content-Type: application/json');
    include("conexion.php");

    $id_animal = $_GET['id_animal'] ?? '';

    if (empty($id_animal)) {
        echo json_encode(['error' => 'Falta id_animal']);
        exit;
    }

    $stmt = $conn->prepare("SELECT peso, fecha_pesaje FROM pesajes WHERE id_animal = ? ORDER BY fecha_pesaje ASC");
    $stmt->bind_param("i", $id_animal);
    $stmt->execute();
    $result = $stmt->get_result();

    $datos = array();
    while ($row = $result->fetch_assoc()) {
        $datos[] = array(
            "peso" => $row["peso"],
            "fecha_pesaje" => $row["fecha_pesaje"]
        );
    }

    echo json_encode($datos, JSON_UNESCAPED_UNICODE);

    $stmt->close();
    $conn->close();
?>
