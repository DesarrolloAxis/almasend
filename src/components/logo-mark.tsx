import Image from "next/image";

import logo from "../../public/almasend-logo.png";

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src={logo}
      alt="Almasend"
      priority
      className={className ?? "h-8 w-auto"}
    />
  );
}
