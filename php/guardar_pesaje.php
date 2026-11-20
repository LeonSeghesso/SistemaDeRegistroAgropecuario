<?php
header('Content-Type: application/json');
include("conexion.php");

$id_animal = $_POST['id_animal'] ?? '';
$peso = $_POST['peso'] ?? '';
$fecha_pesaje = $_POST['fecha_pesaje'] ?? '';

if (empty($id_animal) || empty($peso) || empty($fecha_pesaje)) {
    echo json_encode(['exito' => false, 'mensaje' => 'Campos vacíos']);
    exit;
}

$stmt = $conn->prepare("INSERT INTO pesajes (id_animal, peso, fecha_pesaje) VALUES (?, ?, ?)");
$stmt->bind_param("ids", $id_animal, $peso, $fecha_pesaje);

if ($stmt->execute()) {
    echo json_encode(['exito' => true, 'id' => $stmt->insert_id, 'mensaje' => 'Pesaje registrado!']);
} else {
    echo json_encode(['exito' => false, 'mensaje' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
