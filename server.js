#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('Starting Tech-Compare PHP Server...');

// Start PHP development server
const phpServer = spawn('php', ['-S', '0.0.0.0:3000', '-t', '.'], {
    cwd: __dirname,
    stdio: 'inherit'
});

phpServer.on('close', (code) => {
    console.log(`PHP server exited with code ${code}`);
    process.exit(code);
});

phpServer.on('error', (err) => {
    console.error('Failed to start PHP server:', err);
    process.exit(1);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down PHP server...');
    phpServer.kill('SIGINT');
});

process.on('SIGTERM', () => {
    console.log('\nShutting down PHP server...');
    phpServer.kill('SIGTERM');
});