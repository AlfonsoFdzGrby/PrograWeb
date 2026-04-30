<?php
header('Content-Type: application/json');
require_once '../../includes/db.php';
require_once '../../includes/auth.php';

$data = json_decode(file_get_contents('php://input'), true);
$nombre = $data['nombre'];
$descripcion = $data['descripcion'] ?? '';
$precio = $data['precio'];
$img = $data['img'];
$categoria = $data['categoria'];
$subcategoria = $data['subcategoria'] ?? null;

$sql = "INSERT INTO productos (nombre, descripcion, precio, img, categoria, subcategoria) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $pdo->prepare($sql);
$stmt->execute([$nombre, $descripcion, $precio, $img, $categoria, $subcategoria]);

echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
?>