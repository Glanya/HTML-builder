const fs = require('fs/promises');
const path = require('path');

const folder = path.join(__dirname, 'files');
const folderCopy = path.join(__dirname, 'files-copy');

async function copyDir() {
  try {
    await fs.rm(folderCopy, { recursive: true, force: true });
    await fs.mkdir(folderCopy, { recursive: true });

    const files = await fs.readdir(folder, { withFileTypes: true });
    files.filter(file => file.isFile());
    files.forEach(file => {
      fs.copyFile(path.join(folder, file.name), path.join(folderCopy, file.name));
    });
  } catch (error) {
    console.log('Error: ', error);
  }
}
copyDir();





