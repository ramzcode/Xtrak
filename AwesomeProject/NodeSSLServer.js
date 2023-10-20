const https = require('https');
const fs = require('fs');
const WebSocket = require('ws');

// Read SSL/TLS certificate files
const privateKey = fs.readFileSync('path/to/private-key.pem', 'utf8');
const certificate = fs.readFileSync('path/to/certificate.pem', 'utf8');
const ca = fs.readFileSync('path/to/ca.pem', 'utf8'); // Optional: If you have a certificate authority bundle

const credentials = { key: privateKey, cert: certificate, ca: ca };
const httpsServer = https.createServer(credentials, (req, res) => {
  // Handle HTTPS requests if necessary
});

const wss = new WebSocket.Server({ server: httpsServer });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    // Convert the binary data to a string
    const receivedMessage = message.toString();
    console.log('Received message:', receivedMessage);
    // You can process the received message (receivedMessage) here as a string
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const PORT = 443; // Port for HTTPS (default HTTPS port)
httpsServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

