'use strict';
const user = { 
    name: 'Vadim',
    age: 24
};

module.exports = {
    user: user,
    sayHello() {
        console.log("Hello");
    }
};

(function(require, module, exports, __filename, __dirname) {
    const user = { 
        name: 'Vadim',
        age: 24
    };
})();