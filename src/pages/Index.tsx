import { useState, useRef, useEffect } from "react";
import { Menu, Plus } from "lucide-react";
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
  images?: string[];
}

const IMAGE_GEN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-image`;

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your **T20-CLASSIC AI** assistant. I can chat in any language and generate images. How can I help you today? 🚀",
      isUser: false,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState("t20-pro");
  const [modelName, setModelName] = useState("T20-CLASSIC Pro");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

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
      { id: Date.now().toString(), content: `Model switched to **${name}**`, isUser: false },
    ]);
    if (isMobile) setSidebarOpen(false);
  };

  const chatHistoryRef = useRef<ChatMsg[]>([]);

  const generateImage = async (prompt: string): Promise<{ text: string; images: string[] }> => {
    const resp = await fetch(IMAGE_GEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ prompt }),
    });
    if (!resp.ok) {
      const data = await resp.json().catch(() => ({}));
      throw new Error(data.error || "Image generation failed");
    }
    const data = await resp.json();
    const imageUrls = (data.images || []).map((img: any) => img.image_url?.url || img).filter(Boolean);
    return { text: data.text || "", images: imageUrls };
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = { id: Date.now().toString(), content, isUser: true };
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
      onDone: async () => {
        // Check if the AI requested image generation
        if (assistantContent.trim().startsWith("[IMAGE_REQUEST]")) {
          const imagePrompt = assistantContent.replace("[IMAGE_REQUEST]", "").trim();
          setMessages((prev) =>
            prev.map((m) => m.id === assistantId ? { ...m, content: "🎨 Generating image..." } : m)
          );
          setIsTyping(true);
          try {
            const result = await generateImage(imagePrompt);
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? { ...m, content: result.text || "Here's your generated image:", images: result.images }
                  : m
              )
            );
            chatHistoryRef.current = [...chatHistoryRef.current, { role: "assistant", content: `[Generated image: ${imagePrompt}]` }];
          } catch (err: any) {
            toast.error(err.message || "Image generation failed");
            setMessages((prev) =>
              prev.map((m) => m.id === assistantId ? { ...m, content: "Sorry, image generation failed. Please try again.", isError: true } : m)
            );
          }
        } else {
          chatHistoryRef.current = [...chatHistoryRef.current, { role: "assistant", content: assistantContent }];
        }
        setIsTyping(false);
      },
      onError: (err) => {
        toast.error(err);
        setIsTyping(false);
      },
    });
  };

  const handleNewChat = () => {
    chatHistoryRef.current = [];
    setMessages([
      { id: Date.now().toString(), content: "New conversation started. How can I help you? 🚀", isUser: false },
    ]);
  };

  return (
    <div className="flex h-screen overflow-hidden relative">
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

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
        {/* Header */}
        <div className="bg-card/60 backdrop-blur-md border-b border-border/30 flex items-center py-3 px-4 gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-secondary/60 transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-bold gradient-text">T20-CLASSIC AI</h1>
            <p className="text-[10px] text-muted-foreground tracking-wide">
              Multilingual • Image Generation • Code
            </p>
          </div>
          <button
            onClick={handleNewChat}
            className="p-2 rounded-lg hover:bg-secondary/60 transition-colors text-muted-foreground hover:text-foreground"
            aria-label="New chat"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto chat-scroll p-5 flex flex-col gap-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              isUser={message.isUser}
              isError={message.isError}
              images={message.images}
            />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Status bar */}
        <div className="border-t border-border/20 bg-card/40 px-4 py-2 flex justify-between text-[10px] text-muted-foreground">
          <span>
            Model: <span className="text-primary font-semibold">{modelName}</span>
          </span>
          <span>
            Status: <span className={isTyping ? "text-accent font-semibold" : "text-primary font-semibold"}>{isTyping ? "Thinking..." : "Ready"}</span>
          </span>
        </div>

        <ChatInput onSend={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
};

export default Index;
