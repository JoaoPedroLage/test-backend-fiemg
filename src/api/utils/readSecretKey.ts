import fs from 'fs';

const filePath = './secret.key';

function readSecretKey() {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(data.trim());
    });
  });
}

export default readSecretKey;
