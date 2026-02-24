import { Bot } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="max-w-[85%] self-start animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-1 shadow-md shadow-primary/20">
          <Bot className="w-4 h-4 text-primary-foreground" />
        </div>
        <div className="bg-card border border-border/40 rounded-2xl rounded-bl-sm px-5 py-4 shadow-md">
          <span className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-2 block">
            T20-CLASSIC AI
          </span>
          <div className="flex gap-1.5">
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
            <span className="w-2 h-2 bg-primary/70 rounded-full animate-bounce [animation-delay:0.15s]" />
            <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:0.3s]" />
          </div>
        </div>
      </div>
    </div>
  );
};
