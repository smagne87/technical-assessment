let app = require('./app');
let debug = require('debug')('technicalAssessment:server');
let http = require('http');
let configEnv = require('./config.env');

const port = configEnv.portServer;
const ipaddress = configEnv.urlServer;

app.set('port', port);
app.set('ip', ipaddress);

/**
 * Create HTTP server.
 */

let server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, ipaddress);
server.on('error', onError);
server.on('listening', onListening);


//Handling error when creating server
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

//Handling onListening event to log success server creation
function onListening() {
    console.log('connected');
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
