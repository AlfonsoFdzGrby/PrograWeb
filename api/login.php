<?php
    session_start();
    header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Método no permitido']);
        exit;
    }

    require_once '../includes/db.php';

    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
        exit;
    }

    $usuario = trim($input['usuario'] ?? '');
    $password = trim($input['password'] ?? '');

    if ($usuario === '' || $password === '') {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Usuario y contraseña requeridos']);
        exit;
    }

    // Busca el usuario en la base de datos
    $stmt = $pdo->prepare("SELECT id, usuario, password FROM usuarios WHERE usuario = ?");
    $stmt->execute([$usuario]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Verifica el hash con password_verify (el hash está en $user['password'])
    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['admin'] = $user['id'];
        $_SESSION['usuario'] = $user['usuario'];
        echo json_encode(['success' => true]);
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrectos']);
    }
?>