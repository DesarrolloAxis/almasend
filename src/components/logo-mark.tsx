import { cn } from "@/lib/utils";

// TODO: swap for the real Almasend logo asset once available (see public/).
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block size-8 rounded-full bg-[conic-gradient(from_180deg,#e94fb3,#f5a623,#4fc3f7,#e94fb3)]",
        className
      )}
      aria-hidden
    />
  );
}
