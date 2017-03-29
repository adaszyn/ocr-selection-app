export function generateUniqueKey (hashSize = 6) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < hashSize; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text
}