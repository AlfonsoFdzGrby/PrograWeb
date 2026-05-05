<?php
    header('Content-Type: application/json');
    require_once '../../includes/db.php';
    require_once '../../includes/auth.php';

    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];
    $nombre = $data['nombre'];
    $descripcion = $data['descripcion'] ?? '';
    $precio = $data['precio'];
    $img = $data['img'];
    $categoria = $data['categoria'];
    $subcategoria = $data['subcategoria'] ?? null;

    $sql = "UPDATE productos SET nombre=?, descripcion=?, precio=?, img=?, categoria=?, subcategoria=? WHERE id=?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$nombre, $descripcion, $precio, $img, $categoria, $subcategoria, $id]);

    echo json_encode(['success' => true]);
?>