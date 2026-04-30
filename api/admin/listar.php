<?php
header('Content-Type: application/json');
require_once '../../includes/db.php';
require_once '../../includes/auth.php';

$stmt = $pdo->query("SELECT * FROM productos ORDER BY id DESC");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>