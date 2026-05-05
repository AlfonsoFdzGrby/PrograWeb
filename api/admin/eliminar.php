<?php
    header('Content-Type: application/json');
    require_once '../../includes/db.php';
    require_once '../../includes/auth.php';

    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];

    $stmt = $pdo->prepare("DELETE FROM productos WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode(['success' => true]);
?>