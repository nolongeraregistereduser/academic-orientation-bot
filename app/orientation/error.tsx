"use client";

interface OrientationErrorProps {
  error: Error;
  reset: () => void;
}

export default function OrientationError({
  error,
  reset,
}: OrientationErrorProps) {
  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
      <h2 className="text-xl font-black">Orientation flow failed</h2>
      <p className="mt-2 text-sm">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 rounded-full border border-red-400 px-4 py-2 text-sm font-semibold"
      >
        Try again
      </button>
    </div>
  );
}
