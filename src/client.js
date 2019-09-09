clientApi = {};

(function () {
    const socket = require('socket.io-client')();

    clientApi.emit = (eventName, data) => {
        socket.emit(eventName, data);
    };

    socket.on('testRoom', (data) => {
        console.log(data)
    });

})();

// setInterval(() => {
//     clientApi.emit('testRoom', new Date());
// }, 5000);
