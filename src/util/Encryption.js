'use server'

import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';

const createKey = () => {
  return crypto.createHash('sha256').update(process.env.JWT_SECRET).digest();
};

const createIV = () => {
  return crypto.createHash('md5').update(process.env.JWT_SECRET).digest();
};

export async function encrypt(text) {
  const key = createKey();
  const iv = createIV();

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  return encrypted;
}

export async function decrypt(encryptedText) {
  const key = createKey();
  const iv = createIV();

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}
