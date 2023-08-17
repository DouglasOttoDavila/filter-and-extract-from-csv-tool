const fs = require('fs');

const files = fs.readdirSync(__dirname);

files.forEach(file => {
  if (file.endsWith('.csv')) {
    fs.unlinkSync(file);
    console.log(`Removed ${file}`);
  }
});

console.log('CSV file removal complete.');