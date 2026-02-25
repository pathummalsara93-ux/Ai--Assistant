import { Bot } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="max-w-[80%] self-start animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-1 shadow-md shadow-primary/15">
          <Bot className="w-4 h-4 text-primary-foreground" />
        </div>
        <div className="glass-effect rounded-2xl rounded-bl-md px-5 py-4">
          <span className="text-[9px] font-bold text-primary/80 uppercase tracking-[0.2em] mb-2 block">
            T20-CLASSIC AI
          </span>
          <div className="flex gap-1.5">
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
            <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0.15s]" />
            <span className="w-2 h-2 bg-primary/35 rounded-full animate-bounce [animation-delay:0.3s]" />
          </div>
        </div>
      </div>
    </div>
  );
};
