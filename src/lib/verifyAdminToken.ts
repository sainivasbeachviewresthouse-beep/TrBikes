import * as jose from "jose";

interface JwtPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}

// ✅ Extend global type definitions (so TypeScript knows these can exist)
declare global {
  var JWT_SECRET: string | undefined;
}

// ✅ Support both Node (process.env) and Cloudflare (globalThis)
const jwtSecret =
  process.env.JWT_SECRET || globalThis.JWT_SECRET || "default_secret";

// Convert secret string to Uint8Array (Web Crypto compatible)
const secret = new TextEncoder().encode(jwtSecret);

/**
 * Verify JWT token using jose
 * @param token JWT token string
 * @returns JwtPayload if valid, otherwise null
 */
export async function verifyAdminToken(token?: string): Promise<JwtPayload | null> {
  try {
    if (!token) return null;

    const { payload } = await jose.jwtVerify(token, secret);
    const p = payload as unknown as Record<string, unknown>;

    if (typeof p.id === "string" && typeof p.email === "string") {
      return {
        id: p.id,
        email: p.email,
        iat: typeof p.iat === "number" ? p.iat : undefined,
        exp: typeof p.exp === "number" ? p.exp : undefined,
      };
    }

    return null;
  } catch (err) {
    console.error("Invalid or expired token:", err);
    return null;
  }
}
