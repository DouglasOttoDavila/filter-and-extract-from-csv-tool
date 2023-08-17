const fs = require('fs');

const files = fs.readdirSync(__dirname);

files.forEach(file => {
  if (file.endsWith('.csv')) {
    if (!file.startsWith('feed_')) {
      const newFileName = file.replace('', 'feed_');
      fs.renameSync(file, newFileName);
      console.log(`Renamed ${file} to ${newFileName}`);
    } else {
      const newFileName = file.replace('feed_', '');
      fs.renameSync(file, newFileName);
      console.log(`Renamed ${file} to ${newFileName}`);
    }
  }
});

console.log('File renaming complete.');