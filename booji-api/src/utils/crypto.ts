const AES = require("crypto-js/aes");
const enc = require("crypto-js/enc-utf8");

const secretKey = "_zefdsuh123";

/**
 * 加密
 * @param password string
 * @returns string
 */
export function encrypt(password: string): string {
  return AES.encrypt(password, secretKey).toString();
}

/**
 * 验证
 * @param encryptString string
 * @param password string
 * @returns string
 */
export function verify(encryptString: string, password: string): boolean {
  const parsedString = AES.decrypt(encryptString, secretKey).toString(enc);
  return parsedString === password;
}
