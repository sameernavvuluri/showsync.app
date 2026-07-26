export function SkeletonCard() {
  return (
    <div className="min-w-[280px] md:min-w-[320px]">
      <div className="aspect-[2/3] rounded-2xl bg-white/5 animate-pulse mb-4" />
      <div className="h-5 bg-white/5 animate-pulse rounded mb-2 w-3/4" />
      <div className="h-4 bg-white/5 animate-pulse rounded w-1/2" />
    </div>
  );
}

export function SkeletonEventCard() {
  return (
    <div className="glass p-4 rounded-2xl">
      <div className="aspect-video bg-white/5 animate-pulse rounded-xl mb-4" />
      <div className="h-5 bg-white/5 animate-pulse rounded mb-2 w-2/3" />
      <div className="h-4 bg-white/5 animate-pulse rounded w-1/2" />
    </div>
  );
}

export function SkeletonText({ className = "" }: { className?: string }) {
  return (
    <div className={`h-4 bg-white/5 animate-pulse rounded ${className}`} />
  );
}
