import { Bot, User, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  isError?: boolean;
  images?: string[];
}

export const ChatMessage = ({ content, isUser, isError = false, images }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "max-w-[85%] animate-fade-in group",
        isUser ? "self-end" : "self-start"
      )}
    >
      <div className="flex items-start gap-3">
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-1 shadow-md shadow-primary/20">
            <Bot className="w-4 h-4 text-primary-foreground" />
          </div>
        )}
        <div
          className={cn(
            "rounded-2xl px-5 py-4 shadow-md transition-shadow group-hover:shadow-lg",
            isUser
              ? "bg-gradient-to-br from-primary to-[hsl(199,89%,38%)] text-primary-foreground rounded-br-sm"
              : isError
              ? "bg-destructive/15 text-destructive border border-destructive/20 rounded-bl-sm"
              : "bg-card border border-border/40 rounded-bl-sm"
          )}
        >
          {!isUser && !isError && (
            <span className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-1 block">
              T20-CLASSIC AI
            </span>
          )}
          {isUser && (
            <span className="text-[10px] font-semibold text-primary-foreground/70 uppercase tracking-widest mb-1 block">
              You
            </span>
          )}

          {/* Images */}
          {images && images.length > 0 && (
            <div className="mb-3 space-y-2">
              {images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="AI generated image"
                  className="rounded-xl max-w-full w-full shadow-lg border border-border/20"
                  loading="lazy"
                />
              ))}
            </div>
          )}

          {content && (
            <div className={cn(
              "text-sm leading-relaxed prose prose-sm max-w-none",
              isUser ? "prose-invert" : "prose-invert"
            )}>
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>
        {isUser && (
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1 border border-border/50">
            <User className="w-4 h-4 text-foreground" />
          </div>
        )}
      </div>
    </div>
  );
};
