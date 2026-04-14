interface AdvisorAvatarProps {
  className?: string;
}

export function AdvisorAvatar({ className = "" }: AdvisorAvatarProps) {
  return (
    <div
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(135deg,#1f3d77_0%,#2c6acb_50%,#7db6ff_100%)] text-xs font-black tracking-wide text-white shadow-[0_10px_24px_rgba(24,44,87,0.36)] ${className}`}
      aria-hidden
    >
      VA
    </div>
  );
}
