import { useState } from "react";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatMessage } from "@/components/ChatMessage";
import { TypingIndicator } from "@/components/TypingIndicator";
import { ChatInput } from "@/components/ChatInput";

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
  };

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm a demo chatbot. To connect me to a real AI, please enable Lovable Cloud and integrate with an AI service!",
        isUser: false,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <ChatSidebar selectedModel={selectedModel} onModelSelect={handleModelSelect} />
      
      <div className="flex-1 flex flex-col">
        <div className="bg-card/50 backdrop-blur-sm border-b border-border/50 text-center py-6 px-5">
          <h1 className="text-2xl font-semibold gradient-text mb-1">
            T20-CLASSIC AI Assistant
          </h1>
          <p className="text-sm text-muted-foreground">
            Advanced AI powered by cutting-edge technology
          </p>
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
