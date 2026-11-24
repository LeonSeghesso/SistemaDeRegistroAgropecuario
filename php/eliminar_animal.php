<?php
header('Content-Type: application/json');
include("conexion.php");

$id = $_POST['id'] ?? '';

if (empty($id)) {
    echo json_encode(['exito' => false, 'mensaje' => 'Falta el id del animal']);
    exit;
}

// Borrado lógico: solo se marca la fecha de eliminación
$stmt = $conn->prepare("UPDATE animales SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(['exito' => true, 'mensaje' => 'Animal eliminado']);
    } else {
        echo json_encode(['exito' => false, 'mensaje' => 'El animal no existe o ya estaba eliminado']);
    }
} else {
    echo json_encode(['exito' => false, 'mensaje' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
