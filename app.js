const http = require('http');
const PORT = process.env.PORT || 3000;
const { parseUrl } = require('./libs');
const EventEmiter = require('events');
const ws = require('ws');

const eventEmiter = new EventEmiter();
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('data transmitted');
    eventEmiter.emit('request', JSON.stringify(parseUrl(req.url)))
})

const wsServer = new ws.Server({ server });

wsServer.on('connection', (wsInstanse) => {
    wsInstanse.send('websocket connection oppened');
    eventEmiter.on('request', (query) => {
        wsServer.clients.forEach(client => {
            if (client.readyState === ws.OPEN) {
                client.send(query)
            }
        });
    })
})
server.listen(PORT, () => {
    console.log('server started');
})
