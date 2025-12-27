<?php
/**
 * Email Sender Script for Paula Dashboard
 * Uses IONOS SMTP via native PHP sockets
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Méthode non autorisée']);
    exit();
}

// IONOS SMTP Configuration (from environment variables)
define('SMTP_HOST', getenv('SMTP_HOST') ?: 'smtp.ionos.fr');
define('SMTP_PORT', getenv('SMTP_PORT') ?: 587);
define('SMTP_USER', getenv('SMTP_USER') ?: '');
define('SMTP_PASS', getenv('SMTP_PASS') ?: '');
define('SMTP_FROM', getenv('SMTP_FROM') ?: getenv('SMTP_USER'));
define('SMTP_FROM_NAME', getenv('SMTP_FROM_NAME') ?: 'Paula Mesuret');

// Check if credentials are configured
if (empty(SMTP_USER) || empty(SMTP_PASS)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'SMTP non configuré. Ajoutez SMTP_USER et SMTP_PASS dans Coolify.']);
    exit();
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (empty($input['to']) || empty($input['subject']) || empty($input['html'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Champs manquants']);
    exit();
}

$to = filter_var($input['to'], FILTER_VALIDATE_EMAIL);
if (!$to) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Email invalide']);
    exit();
}

$subject = $input['subject'];
$htmlContent = $input['html'];

// Send email via SMTP
function sendSmtpEmail($to, $subject, $body) {
    $socket = @fsockopen(SMTP_HOST, SMTP_PORT, $errno, $errstr, 30);
    if (!$socket) {
        return "Connexion SMTP échouée: $errstr ($errno)";
    }
    
    stream_set_timeout($socket, 30);
    
    // Read greeting
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) != '220') {
        fclose($socket);
        return "Erreur serveur: $response";
    }
    
    // EHLO
    fputs($socket, "EHLO paula.live.cercleonline.com\r\n");
    $response = '';
    while ($line = fgets($socket, 512)) {
        $response .= $line;
        if (substr($line, 3, 1) == ' ') break;
    }
    
    // STARTTLS
    fputs($socket, "STARTTLS\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) != '220') {
        fclose($socket);
        return "STARTTLS échoué: $response";
    }
    
    // Enable TLS
    if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
        fclose($socket);
        return "Erreur TLS";
    }
    
    // EHLO again after TLS
    fputs($socket, "EHLO paula.live.cercleonline.com\r\n");
    $response = '';
    while ($line = fgets($socket, 512)) {
        $response .= $line;
        if (substr($line, 3, 1) == ' ') break;
    }
    
    // AUTH LOGIN
    fputs($socket, "AUTH LOGIN\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) != '334') {
        fclose($socket);
        return "AUTH échoué: $response";
    }
    
    // Username
    fputs($socket, base64_encode(SMTP_USER) . "\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) != '334') {
        fclose($socket);
        return "User échoué: $response";
    }
    
    // Password
    fputs($socket, base64_encode(SMTP_PASS) . "\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) != '235') {
        fclose($socket);
        return "Auth refusée: $response";
    }
    
    // MAIL FROM
    fputs($socket, "MAIL FROM:<" . SMTP_FROM . ">\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) != '250') {
        fclose($socket);
        return "MAIL FROM échoué: $response";
    }
    
    // RCPT TO
    fputs($socket, "RCPT TO:<$to>\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) != '250') {
        fclose($socket);
        return "RCPT TO échoué: $response";
    }
    
    // DATA
    fputs($socket, "DATA\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) != '354') {
        fclose($socket);
        return "DATA échoué: $response";
    }
    
    // Email headers and body
    $headers = "From: " . SMTP_FROM_NAME . " <" . SMTP_FROM . ">\r\n";
    $headers .= "To: $to\r\n";
    $headers .= "Subject: $subject\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "\r\n";
    
    fputs($socket, $headers . $body . "\r\n.\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) != '250') {
        fclose($socket);
        return "Envoi échoué: $response";
    }
    
    // QUIT
    fputs($socket, "QUIT\r\n");
    fclose($socket);
    
    return true;
}

$result = sendSmtpEmail($to, $subject, $htmlContent);

if ($result === true) {
    echo json_encode(['success' => true, 'message' => 'Email envoyé avec succès à ' . $to]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $result]);
}
