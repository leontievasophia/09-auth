"use client";

import { useEffect, type ReactNode } from "react";
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

interface Props {
  children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  useEffect(() => {
    let active = true;

    const verifyAuth = async () => {
      try {
        const isValid = await checkSession();

        if (!isValid) {
          if (active) clearIsAuthenticated();
          return;
        }

        const user = await getMe();

        if (active) setUser(user);
      } catch {
        if (active) clearIsAuthenticated();
      }
    };

    verifyAuth();

    return () => {
      active = false;
    };
  }, [setUser, clearIsAuthenticated]);

  return <>{children}</>;
}
