<?php
// Database configuration
$host = $_ENV['DB_HOST'] ?? 'localhost';
$dbname = $_ENV['DB_DATABASE'] ?? 'tech_compare';
$username = $_ENV['DB_USERNAME'] ?? 'user';
$password = $_ENV['DB_PASSWORD'] ?? '';
$port = $_ENV['DB_PORT'] ?? '3306';

try {
    $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
?>