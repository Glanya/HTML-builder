const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

const folder = path.join(__dirname, 'secret-folder');

fs.readdir(folder, { withFileTypes: true }, (error, files) => {
  if (error) {
    throw error;
  } else {
    files.forEach(file => {
      if (file.isFile()) {
        const fileFolder = path.join(folder, file.name);
        const fileName = file.name.split('.')[0];
        const fileExt = path.extname(file.name);
        let fileSize = 0;
        fs.stat(fileFolder, (error, stats) => {
          if (error) {
            throw error;
          } else {
            fileSize += stats.size / 1024;
          }
          stdout.write(`${fileName} - ${fileExt} - ${fileSize}kb\n`);
        });
      }
    });
  }
});