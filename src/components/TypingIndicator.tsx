import { Bot } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="max-w-[80%] self-start animate-fade-in">
      <div className="bg-chat-bot text-foreground border border-border/30 rounded-2xl rounded-bl-md px-5 py-4 shadow-lg">
        <div className="flex items-center gap-2 mb-2 opacity-80">
          <Bot className="w-4 h-4" />
          <span className="text-xs font-medium">T20-CLASSIC AI</span>
        </div>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" />
          <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce [animation-delay:0.15s]" />
          <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce [animation-delay:0.3s]" />
        </div>
      </div>
    </div>
  );
};
