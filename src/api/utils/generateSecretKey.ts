import { randomBytes } from 'crypto';
import { writeFileSync } from 'fs';

const generateSecretKey = () => {
  const secretKey = randomBytes(32).toString('hex');
  writeFileSync('secret.key', secretKey);

  return secretKey;
};

export default generateSecretKey;
