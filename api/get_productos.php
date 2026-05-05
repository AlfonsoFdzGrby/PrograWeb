<?php
    header('Content-Type: application/json');
    require_once '../includes/db.php';

    $subcategoria = $_GET['subcategoria'] ?? '';
    $sql = "SELECT * FROM productos WHERE categoria = 'Vehículo'";
    if ($subcategoria) {
        $sql .= " AND subcategoria = :sub";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':sub' => $subcategoria]);
    } else {
        $stmt = $pdo->query($sql);
    }
    $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($productos);
?>