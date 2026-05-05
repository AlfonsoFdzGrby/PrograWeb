<?php
    header('Content-Type: application/json');
    require_once '../includes/db.php';

    $data = json_decode(file_get_contents('php://input'), true);

    $nombre   = trim($data['nombre'] ?? '');
    $email    = trim($data['email'] ?? '');
    $telefono = trim($data['telefono'] ?? '');
    $asunto   = trim($data['asunto'] ?? '');
    $mensaje  = trim($data['mensaje'] ?? '');

    $errors = [];
    if (!$nombre) $errors['nombre'] = 'Nombre obligatorio';
    if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Email válido requerido';
    if (!$telefono) $errors['telefono'] = 'Teléfono obligatorio';
    if (!$asunto) $errors['asunto'] = 'Selecciona un asunto';
    if (!$mensaje) $errors['mensaje'] = 'Mensaje obligatorio';

    if ($errors) {
        http_response_code(400);
        echo json_encode(['success' => false, 'errors' => $errors]);
        exit;
    }

    $sql = "INSERT INTO contactos (nombre, email, telefono, asunto, mensaje) VALUES (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$nombre, $email, $telefono, $asunto, $mensaje]);

    echo json_encode(['success' => true]);
?>