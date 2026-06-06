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

export { Spinner, EmptyState, ErrorState, SkeletonList };
