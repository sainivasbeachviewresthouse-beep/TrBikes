import * as jose from "jose";

interface JwtPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}

// Convert your secret string to a Uint8Array for Web Crypto
const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret");

/**
 * Verify JWT token using jose
 * @param token JWT token string
 * @returns JwtPayload if valid, otherwise null
 */
export async function verifyAdminToken(token?: string): Promise<JwtPayload | null> {
  try {
    if (!token) return null;

    const { payload } = await jose.jwtVerify(token, secret);
    return payload as JwtPayload;
  } catch (err) {
    console.error("Invalid or expired token:", err);
    return null;
  }
}
