import { cn } from '../../utils/cn';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-white/10', className)}
      {...props}
    />
  );
};

export const MetricCardSkeleton = () => (
  <div className="flex flex-col p-4 rounded-xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm border border-white/10">
    <Skeleton className="h-4 w-24 mb-4" />
    <Skeleton className="h-8 w-32 mb-2" />
    <Skeleton className="h-3 w-20" />
    <div className="h-24 mt-4">
      <Skeleton className="w-full h-full" />
    </div>
  </div>
);

export const AnalyticsSkeleton = () => (
  <div className="w-full">
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="rounded-xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm border border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-8 w-48" />
          </div>
          <Skeleton className="h-10 w-48" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <MetricCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  </div>
);
