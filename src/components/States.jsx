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
        <a
          href={cta.to}
          className="btn-primary inline-flex mt-4"
        >
          {cta.label}
        </a>
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

function SkeletonList({ count = 3 }) {
  return (
    <ul className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <li
          key={i}
          className="card flex items-center gap-4 animate-pulse"
        >
          <div className="size-12 bg-surface-2" />
          <div className="flex-1 space-y-2">
            <div className="h-3.5 w-1/3 bg-surface-2 rounded" />
            <div className="h-3 w-2/3 bg-surface-2 rounded" />
          </div>
        </li>
      ))}
    </ul>
  );
}

/*
  Card-shaped placeholder that mirrors UserCard's dimensions so the layout
  doesn't jump when the real card arrives. Uses `bg-surface-2` for the bars
  (same convention as SkeletonList) and Tailwind's built-in `animate-pulse`.
*/
function UserCardSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading profiles"
      className="card max-w-100 mx-auto p-0 overflow-hidden animate-pulse"
    >
      {/* photo area */}
      <div className="h-[220px] w-full bg-surface-2" />
      {/* info section */}
      <div className="p-5 space-y-3">
        <div className="space-y-2">
          <div className="h-5 w-2/3 bg-surface-2 rounded" />
          <div className="h-3.5 w-1/4 bg-surface-2 rounded" />
        </div>
        <div className="flex gap-1.5">
          <div className="h-5 w-14 bg-surface-2 rounded-sm" />
          <div className="h-5 w-16 bg-surface-2 rounded-sm" />
        </div>
        <div className="space-y-1.5">
          <div className="h-3 w-full bg-surface-2 rounded" />
          <div className="h-3 w-11/12 bg-surface-2 rounded" />
          <div className="h-3 w-2/3 bg-surface-2 rounded" />
        </div>
        <div className="flex gap-2 pt-2">
          <div className="h-10 flex-1 bg-surface-2 rounded" />
          <div className="h-10 flex-1 bg-surface-2 rounded" />
        </div>
      </div>
    </div>
  );
}

export { Spinner, EmptyState, ErrorState, SkeletonList, UserCardSkeleton };
