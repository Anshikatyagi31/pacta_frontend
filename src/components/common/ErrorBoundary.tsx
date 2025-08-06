import { useState } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ErrorBoundary = ({ children, fallback }: ErrorBoundaryProps) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return fallback || (
      <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
        <div className="text-red-500 text-xl mb-4">⚠️ Something went wrong</div>
        <button
          onClick={() => setHasError(false)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
