const fs = require('fs');
const path = require('path');
const { stdin: input, stdout: output } = require('process');

const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');

output.write('Приветствую!\nВвод текста:\n');
input.on('data', (input) => {
  if (input.toString().trim() === 'exit') {
    process.exit();
  } else {
    writeStream.write(`${input}`, error => {
      if (error) {
        throw error;
      }
    });
  }
});

process.on('exit', () => {
  output.write('До свидания!');
});
process.on('SIGINT', () => process.exit());
