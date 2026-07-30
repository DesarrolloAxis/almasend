"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();

  async function onClick() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick}>
      Cerrar sesión
    </Button>
  );
}
