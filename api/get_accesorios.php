<?php
header('Content-Type: application/json');
require_once '../includes/db.php';

$stmt = $pdo->query("SELECT * FROM productos WHERE categoria = 'Accesorio'");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>