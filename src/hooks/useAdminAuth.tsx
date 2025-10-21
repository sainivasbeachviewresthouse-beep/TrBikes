"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface JwtPayload { id: string; email: string; exp: number; }

interface UseAdminAuthOptions {
  redirectIfLoggedIn?: boolean;
  redirectPath?: string;
  loginPath?: string;
}

export default function useAdminAuth(options?: UseAdminAuthOptions) {
  const router = useRouter();
  const { redirectIfLoggedIn = false, redirectPath = "/admin", loginPath = "/admin/login" } = options || {};

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      if (!redirectIfLoggedIn) router.replace(loginPath);
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem("adminToken");
        router.replace(loginPath);
      } else if (redirectIfLoggedIn) {
        router.replace(redirectPath);
      }
    } catch {
      localStorage.removeItem("adminToken");
      router.replace(loginPath);
    }
  }, [router, redirectIfLoggedIn, redirectPath, loginPath]);
}
