import { Brain, Rocket, Shield, Zap, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  selectedModel: string;
  onModelSelect: (model: string) => void;
}

const models = [
  { id: "t20-pro", name: "T20-CLASSIC Pro", icon: Rocket },
  { id: "t20-standard", name: "T20-CLASSIC Standard", icon: Shield },
  { id: "t20-turbo", name: "T20-CLASSIC Turbo", icon: Zap },
];

const capabilities = [
  "Natural Conversations",
  "Code Generation",
  "Content Creation",
  "Problem Solving",
];

export const ChatSidebar = ({ selectedModel, onModelSelect }: ChatSidebarProps) => {
  return (
    <div className="w-64 bg-sidebar-bg border-r border-border/50 flex flex-col p-6">
      <div className="text-center mb-8 pb-6 border-b border-border/30">
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
          <Brain className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl font-bold gradient-text tracking-wide">T20-CLASSIC</h1>
        <p className="text-xs text-muted-foreground mt-1 tracking-[0.15em] uppercase">
          AI Assistant
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-semibold text-primary mb-3 uppercase tracking-wider">
          AI Models
        </h3>
        <div className="space-y-2">
          {models.map((model) => {
            const Icon = model.icon;
            return (
              <button
                key={model.id}
                onClick={() => onModelSelect(model.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm",
                  "hover:bg-secondary/50",
                  selectedModel === model.id
                    ? "bg-secondary border-l-2 border-primary"
                    : "bg-transparent"
                )}
              >
                <Icon className="w-4 h-4 text-primary" />
                <span className="text-foreground/90">{model.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="glass-effect rounded-xl p-4">
        <h3 className="text-xs font-semibold text-primary mb-3 uppercase tracking-wider">
          Capabilities
        </h3>
        <div className="space-y-2 text-sm">
          {capabilities.map((capability) => (
            <div key={capability} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-accent" />
              <span className="text-foreground/80">{capability}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
