const express = require('express');
const { ExpressPeerServer } = require('peer');
const path = require('path');

// Create an Express application
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML file for the client
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Create an HTTP server
const server = require('http').createServer(app);

// Create a PeerServer instance
const peerServer = ExpressPeerServer(server, {
  debug: true
});

// Mount PeerServer on the '/peerjs' path
app.use('/peerjs', peerServer);

// Use the PORT environment variable or default to port 3000
const port = process.env.PORT || 3000;

// Start the server
server.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
