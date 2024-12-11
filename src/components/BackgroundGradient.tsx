interface BackgroundGradientProps {
  className?: string;
}

export function BackgroundGradient({ className = '' }: BackgroundGradientProps) {
  return (
    <>
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-slate-100/[0.04] bg-[size:20px_20px]" />
      <div className="absolute inset-0">
        {/* Mobile-specific gradients with smoother transitions */}
        <div className="sm:hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 transition-all duration-[3000ms] ease-in-out animate-blob-slow"></div>
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 transition-all duration-[3000ms] ease-in-out animate-blob-slow animation-delay-2000"></div>
          <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 transition-all duration-[3000ms] ease-in-out animate-blob-slow animation-delay-4000"></div>
        </div>
        
        {/* Desktop gradients remain unchanged */}
        <div className="hidden sm:block">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-emerald-50/30 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/[0.07] to-blue-500/[0.07] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,rgba(16,185,129,0.1),transparent)]" />
    </>
  );
}
