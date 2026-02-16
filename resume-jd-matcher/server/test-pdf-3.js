const pdf = require('pdf-parse');
for (let key in pdf) {
    if (typeof pdf[key] === 'function') {
        console.log(`Key: ${key} is a function`);
    }
}
console.log('Final check:');
console.log(pdf);
