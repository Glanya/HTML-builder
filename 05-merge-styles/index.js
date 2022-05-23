const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist');


async function mergeStyles() {
  try {
    const files = await fs.promises.readdir(stylesPath, { withFileTypes: true });
    const writeStream = fs.createWriteStream(path.join(bundlePath, 'bundle.css'), 'utf-8');
    files.forEach(file => {
      if(file.isFile() && path.extname(path.join(stylesPath, file.name)) === '.css') {
        const readStream = fs.createReadStream(path.join(stylesPath, file.name), 'utf-8');
        readStream.pipe(writeStream);
      }
    });
  } catch(error) {
    console.log('Error: ', error);
  }
}
mergeStyles();