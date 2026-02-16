const pdf = require('pdf-parse');
console.log('Type of pdf:', typeof pdf);
console.log('Keys:', Object.keys(pdf));
if (typeof pdf === 'function') {
    console.log('Direct function call works');
} else if (pdf.default && typeof pdf.default === 'function') {
    console.log('Use pdf.default instead');
} else if (Object.values(pdf).find(v => typeof v === 'function')) {
    console.log('Found a function in exports:', Object.entries(pdf).find(([k, v]) => typeof v === 'function')[0]);
} else {
    console.log('No function found');
}
