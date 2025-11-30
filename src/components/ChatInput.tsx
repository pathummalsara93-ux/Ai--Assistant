import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled = false }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 p-5 border-t border-border/50 bg-card/30">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask T20-CLASSIC AI anything..."
        disabled={disabled}
        className="flex-1 bg-secondary/70 border-primary/30 focus:border-primary text-foreground placeholder:text-muted-foreground h-14 px-5 text-base rounded-xl"
      />
      <Button
        type="submit"
        disabled={disabled || !input.trim()}
        className="h-14 w-14 bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 rounded-xl shadow-lg shadow-primary/30 transition-all hover:scale-105 disabled:opacity-50 disabled:scale-100"
      >
        <Send className="w-5 h-5" />
      </Button>
    </form>
  );
};
