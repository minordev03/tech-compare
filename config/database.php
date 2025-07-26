<?php
// Database configuration
$host = $_ENV['PGHOST'] ?? 'localhost';
$dbname = $_ENV['PGDATABASE'] ?? 'tech_compare';
$username = $_ENV['PGUSER'] ?? 'postgres';
$password = $_ENV['PGPASSWORD'] ?? '';
$port = $_ENV['PGPORT'] ?? '5432';

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
?>