const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080,host: '192.168.0.200' });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        // Reenviar el mensaje a todos los demás clientes
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

console.log('Servidor de señalización corriendo en el puerto 8080');