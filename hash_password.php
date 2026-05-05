<?php/*
    require_once 'includes/db.php';

    // EJECUCIÓN DE UNA SOLA VEZ
    $usuario = 'admin';
    $plainPassword = '1234';
    $hash = password_hash($plainPassword, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("UPDATE usuarios SET password = ? WHERE usuario = ?");
    $stmt->execute([$hash, $usuario]);

    if ($stmt->rowCount() > 0) {
        echo "Contraseña de 'admin' actualizada a hash correctamente.<br>";
        echo "Hash generado: " . $hash;
    } else {
        echo "Usuario 'admin' no encontrado. Asegúrate de que existe en la tabla usuarios.";
    }*/
?>