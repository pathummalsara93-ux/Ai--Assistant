import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  isError?: boolean;
}

export const ChatMessage = ({ content, isUser, isError = false }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "max-w-[80%] animate-fade-in",
        isUser ? "self-end" : "self-start"
      )}
    >
      <div
        className={cn(
          "rounded-2xl px-5 py-4 shadow-lg",
          isUser
            ? "bg-chat-user text-white rounded-br-md"
            : isError
            ? "bg-destructive/20 text-destructive border border-destructive/30 rounded-bl-md"
            : "bg-chat-bot text-foreground border border-border/30 rounded-bl-md"
        )}
      >
        <div className="flex items-center gap-2 mb-2 opacity-80">
          {isUser ? (
            <User className="w-4 h-4" />
          ) : (
            <Bot className="w-4 h-4" />
          )}
          <span className="text-xs font-medium">
            {isUser ? "You" : "T20-CLASSIC AI"}
          </span>
        </div>
        <div className="text-sm leading-relaxed prose prose-sm prose-invert max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
