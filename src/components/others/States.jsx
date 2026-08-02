import { Link } from "react-router";

function Spinner({ className = "" }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`size-6 border-2 border-border border-t-primary rounded-full animate-spin ${className}`}
    />
  );
}

function EmptyState({ title, body, cta }) {
  return (
    <div className="text-center py-10 px-4">
      <div className="mx-auto size-12 rounded-md border border-border bg-surface-2 flex items-center justify-center text-fg-muted text-2xl mb-3">
        ⌂
      </div>
      <p className="text-base font-semibold text-fg">{title}</p>
      {body && <p className="text-sm text-fg-muted mt-1">{body}</p>}
      {cta && (
        <Link to={cta.to} className="btn-primary inline-flex mt-4">
          {cta.label}
        </Link>
      )}
    </div>
  );
}

function ErrorState({ onRetry, message = "Something went wrong" }) {
  return (
    <div className="text-center py-10 px-4">
      <p className="text-sm text-rose-500">{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn-ghost mt-3">
          Try again
        </button>
      )}
    </div>
  );
}

function SkeletonList({ count = 3, hasActions = false }) {
  return (
    <ul className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className="card flex items-center gap-4 animate-pulse">
          <div className="size-12 bg-surface-2 shrink-0 rounded" />
          <div className="flex-1 space-y-2 min-w-0">
            <div className="h-3.5 w-1/3 bg-surface-2 rounded" />
            <div className="h-3 w-2/3 bg-surface-2 rounded" />
          </div>
          {hasActions && (
            <div className="flex gap-2 shrink-0">
              <div className="h-10 w-[72px] bg-surface-2 rounded-lg" />
              <div className="h-10 w-[72px] bg-surface-2 rounded-lg" />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

function UserCardSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading profile"
      className="w-full max-w-86 mx-auto animate-pulse"
    >
      <div className="card relative p-0 overflow-hidden aspect-[3/4] shadow-xl">
        {/* photo area — background */}
        <div className="absolute inset-0 bg-surface-2" />

        {/* gradient overlay */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none z-0"
        />

        {/* info section overlaid at bottom */}
        <div className="absolute inset-x-0 bottom-0 p-5 pt-12 space-y-3 z-20">
          {/* Name skeleton */}
          <div className="h-6 w-2/3 bg-white/20 rounded" />

          {/* Meta info skeleton */}
          <div className="space-y-2">
            <div className="h-3.5 w-1/2 bg-white/20 rounded" />
            <div className="h-3.5 w-1/3 bg-white/20 rounded" />
          </div>

          {/* Skills skeleton */}
          <div className="flex gap-1.5 pt-1">
            <div className="h-5 w-12 bg-white/20 rounded-full" />
            <div className="h-5 w-16 bg-white/20 rounded-full" />
            <div className="h-5 w-14 bg-white/20 rounded-full" />
          </div>
        </div>
      </div>

      {/* Actions skeleton */}
      <div className="flex gap-4 mt-3">
        <div className="h-[46px] flex-1 bg-surface-2 rounded-lg" />
        <div className="h-[46px] flex-1 bg-surface-2 rounded-lg" />
      </div>
    </div>
  );
}

export { Spinner, EmptyState, ErrorState, SkeletonList, UserCardSkeleton };
