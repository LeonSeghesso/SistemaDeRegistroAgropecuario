<?php
header('Content-Type: application/json');
include("conexion.php");

$raza = $_POST['raza'] ?? '';
$peso = $_POST['peso'] ?? '';
$fecha_nacimiento = $_POST['fecha_nacimiento'] ?? '';

if (empty($raza) || empty($peso) || empty($fecha_nacimiento)) {
    echo json_encode(['exito' => false, 'mensaje' => 'Campos vacíos']);
    exit;
}

$stmt = $conn->prepare("INSERT INTO animales (raza, peso, fecha_nacimiento) VALUES (?, ?, ?)");
$stmt->bind_param("sds", $raza, $peso, $fecha_nacimiento);

if ($stmt->execute()) {
    echo json_encode(['exito' => true, 'id' => $stmt->insert_id, 'mensaje' => 'Guardado!']);
} else {
    echo json_encode(['exito' => false, 'mensaje' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
