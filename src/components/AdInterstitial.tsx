import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface AdInterstitialProps {
  open: boolean;
  onClose: () => void;
  message?: string;
}

const AD_URL = "https://omg10.com/4/9599187";

export const AdInterstitial = ({ open, onClose, message = "Loading..." }: AdInterstitialProps) => {
  const [countdown, setCountdown] = useState(3);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (!open) {
      setCountdown(3);
      setCanClose(false);
      return;
    }
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          setCanClose(true);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm mx-4 rounded-2xl border border-border/40 bg-card p-6 shadow-2xl shadow-primary/10">
        {/* Close */}
        <button
          onClick={canClose ? onClose : undefined}
          disabled={!canClose}
          className="absolute top-3 right-3 p-1.5 rounded-lg border border-border/40 text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Close ad"
        >
          {canClose ? <X className="w-4 h-4" /> : <span className="text-xs font-mono w-4 h-4 flex items-center justify-center">{countdown}</span>}
        </button>

        {/* Content */}
        <div className="text-center space-y-4">
          <span className="text-[9px] text-muted-foreground uppercase tracking-[0.2em]">Sponsored</span>
          <p className="text-sm text-muted-foreground">{message}</p>
          <a
            href={AD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
          >
            🔥 Check This Out
          </a>
          <p className="text-[10px] text-muted-foreground/50">Ad closes {canClose ? "now" : `in ${countdown}s`}</p>
        </div>
      </div>
    </div>
  );
};
