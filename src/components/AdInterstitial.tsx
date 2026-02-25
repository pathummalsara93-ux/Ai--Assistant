import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";

interface AdInterstitialProps {
  open: boolean;
  onClose: () => void;
  message?: string;
}

const AD_URL = "https://omg10.com/4/9599187";

export const AdInterstitial = ({ open, onClose, message = "Loading..." }: AdInterstitialProps) => {
  const [countdown, setCountdown] = useState(5);
  const [canClose, setCanClose] = useState(false);
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (!open) {
      setCountdown(5);
      setCanClose(false);
      setRedirected(false);
      return;
    }
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [open]);

  useEffect(() => {
    if (open && countdown === 0 && !redirected) {
      setRedirected(true);
      window.open(AD_URL, "_blank", "noopener,noreferrer");
      setCanClose(true);
    }
  }, [open, countdown, redirected]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-sm mx-4 rounded-2xl border border-border/30 glass-effect p-7 shadow-2xl glow-md">
        {/* Close */}
        <button
          onClick={canClose ? onClose : undefined}
          disabled={!canClose}
          className="absolute top-3.5 right-3.5 p-1.5 rounded-lg border border-border/30 text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
          aria-label="Close ad"
        >
          {canClose ? (
            <X className="w-4 h-4" />
          ) : (
            <span className="text-xs font-mono w-4 h-4 flex items-center justify-center text-primary font-bold">{countdown}</span>
          )}
        </button>

        {/* Content */}
        <div className="text-center space-y-5">
          <span className="text-[8px] text-muted-foreground/60 uppercase tracking-[0.3em] font-medium">Sponsored</span>
          <p className="text-sm text-foreground/70 font-medium">{message}</p>
          {!canClose && (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-xs text-muted-foreground">Redirecting in <span className="text-primary font-semibold">{countdown}s</span></p>
            </div>
          )}
          {canClose && (
            <p className="text-xs text-accent font-semibold">✅ You can now close this</p>
          )}
        </div>
      </div>
    </div>
  );
};
