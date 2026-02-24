import { useState, useRef } from "react";
import { Menu } from "lucide-react";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatMessage } from "@/components/ChatMessage";
import { TypingIndicator } from "@/components/TypingIndicator";
import { ChatInput } from "@/components/ChatInput";
import { useIsMobile } from "@/hooks/use-mobile";
import { streamChat, type ChatMsg } from "@/lib/streamChat";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  isError?: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your T20-CLASSIC AI assistant. How can I help you today?",
      isUser: false,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState("t20-pro");
  const [modelName, setModelName] = useState("T20-CLASSIC Pro");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    const modelNames: Record<string, string> = {
      "t20-pro": "T20-CLASSIC Pro",
      "t20-standard": "T20-CLASSIC Standard",
      "t20-turbo": "T20-CLASSIC Turbo",
    };
    const name = modelNames[model];
    setModelName(name);
    
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        content: `Model switched to: ${name}`,
        isUser: false,
      },
    ]);
    if (isMobile) setSidebarOpen(false);
  };

  const chatHistoryRef = useRef<ChatMsg[]>([]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    chatHistoryRef.current = [...chatHistoryRef.current, { role: "user", content }];
    const assistantId = (Date.now() + 1).toString();
    let assistantContent = "";

    await streamChat({
      messages: chatHistoryRef.current,
      onDelta: (chunk) => {
        assistantContent += chunk;
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last && !last.isUser && last.id === assistantId) {
            return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m);
          }
          return [...prev, { id: assistantId, content: assistantContent, isUser: false }];
        });
        setIsTyping(false);
      },
      onDone: () => {
        chatHistoryRef.current = [...chatHistoryRef.current, { role: "assistant", content: assistantContent }];
        setIsTyping(false);
      },
      onError: (err) => {
        toast.error(err);
        setIsTyping(false);
      },
    });
  };

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 transition-opacity duration-200"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          ${isMobile ? "fixed inset-y-0 left-0 z-40" : "relative"}
          transition-all duration-200 ease-out
          ${sidebarOpen ? (isMobile ? "translate-x-0" : "w-64") : (isMobile ? "-translate-x-full" : "w-0")}
          overflow-hidden flex-shrink-0
        `}
      >
        <div className="w-64 h-full">
          <ChatSidebar selectedModel={selectedModel} onModelSelect={handleModelSelect} />
        </div>
      </div>
      
      <div className="flex-1 flex flex-col min-w-0">
        <div className="bg-card/50 backdrop-blur-sm border-b border-border/50 flex items-center py-4 px-5 gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-secondary/50 transition-colors duration-150 text-muted-foreground hover:text-foreground"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="text-center flex-1">
            <h1 className="text-xl font-semibold gradient-text">
              T20-CLASSIC AI Assistant
            </h1>
            <p className="text-xs text-muted-foreground">
              Advanced AI powered by cutting-edge technology
            </p>
          </div>
          <div className="w-9" /> {/* Spacer for centering */}
        </div>

        <div className="flex-1 overflow-y-auto chat-scroll p-6 flex flex-col gap-5">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              isUser={message.isUser}
              isError={message.isError}
            />
          ))}
          {isTyping && <TypingIndicator />}
        </div>

        <div className="border-t border-border/50 bg-card/30 px-5 py-3 flex justify-between text-xs text-muted-foreground">
          <span>
            Model: <span className="text-primary font-medium">{modelName}</span>
          </span>
          <span>
            Status: <span className="text-accent font-medium">{isTyping ? "Thinking..." : "Ready"}</span>
          </span>
        </div>

        <ChatInput onSend={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
};

export default Index;
