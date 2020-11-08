'use strict';

const EventEmitter = require('events');

class ggod extends EventEmitter.EventEmitter {
log(message) {
    this.emit('message', `${message} ${Date.now()}`)
}
}

const logger = new ggod();
logger.on('message', data => {
 console.log(data)
});

logger.log('hello');