export function generateEncodedString(length = 16) {
  // Generate random bytes
  const randomBytes = new Uint8Array(length);
  crypto.getRandomValues(randomBytes);

  // Convert to Base64
  const base64String = btoa(String.fromCharCode(...randomBytes));

  // Encode for URL safety
  return encodeURIComponent(base64String);
}

export const waitAndReturnFalse = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(false);
    }, 600); // 2000ms = 2 seconds
  });
};
