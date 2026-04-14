interface StudentAvatarProps {
  className?: string;
}

export function StudentAvatar({ className = "" }: StudentAvatarProps) {
  return (
    <div
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(140deg,#161b28_0%,#475071_100%)] text-xs font-black tracking-wide text-white shadow-[0_10px_24px_rgba(18,24,42,0.3)] ${className}`}
      aria-hidden
    >
      YOU
    </div>
  );
}
