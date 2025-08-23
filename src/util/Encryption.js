'use server';

// Utility functions for Edge Runtime compatible encryption/decryption
const encoder = new TextEncoder();
const decoder = new TextDecoder();

// Convert ArrayBuffer to base64
function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Convert base64 to ArrayBuffer
function base64ToArrayBuffer(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

// Create SHA-256 hash (equivalent to createKey)
async function createKey() {
  const data = encoder.encode(process.env.JWT_SECRET);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return hashBuffer;
}

// Create MD5-like hash for IV (using first 16 bytes of SHA-256)
async function createIV() {
  const data = encoder.encode(process.env.JWT_SECRET);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  // Take first 16 bytes for IV (MD5 equivalent)
  return hashBuffer.slice(0, 16);
}

export async function encrypt(text) {
  try {
    const keyBuffer = await createKey();
    const ivBuffer = await createIV();

    // Import the key for AES-CBC
    const key = await crypto.subtle.importKey(
      'raw',
      keyBuffer,
      { name: 'AES-CBC' },
      false,
      ['encrypt'],
    );

    // Encrypt the text
    const dataBuffer = encoder.encode(text);
    const encryptedBuffer = await crypto.subtle.encrypt(
      {
        name: 'AES-CBC',
        iv: ivBuffer,
      },
      key,
      dataBuffer,
    );

    // Convert to base64
    return arrayBufferToBase64(encryptedBuffer);
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
}

export async function decrypt(encryptedText) {
  try {
    const keyBuffer = await createKey();
    const ivBuffer = await createIV();

    // Import the key for AES-CBC
    const key = await crypto.subtle.importKey(
      'raw',
      keyBuffer,
      { name: 'AES-CBC' },
      false,
      ['decrypt'],
    );

    // Convert base64 to ArrayBuffer
    const encryptedBuffer = base64ToArrayBuffer(encryptedText);

    // Decrypt the data
    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: 'AES-CBC',
        iv: ivBuffer,
      },
      key,
      encryptedBuffer,
    );

    // Convert back to string
    return decoder.decode(decryptedBuffer);
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
}
