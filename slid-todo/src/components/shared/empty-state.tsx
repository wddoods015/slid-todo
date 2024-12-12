// components/shared/empty-state.tsx
interface EmptyStateProps {
  message: string;
  className?: string;
}

const EmptyState = ({ message, className = "" }: EmptyStateProps) => {
  return (
    <div
      className={`w-full h-full flex items-center justify-center text-muted-foreground ${className}`}
    >
      {message}
    </div>
  );
};

export default EmptyState;
