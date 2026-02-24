import { Brain, Rocket, Shield, Zap, Check, Sparkles, Globe, ImageIcon, Code } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  selectedModel: string;
  onModelSelect: (model: string) => void;
}

const models = [
  { id: "t20-pro", name: "T20-CLASSIC Pro", icon: Rocket, desc: "Most capable" },
  { id: "t20-standard", name: "T20-CLASSIC Standard", icon: Shield, desc: "Balanced" },
  { id: "t20-turbo", name: "T20-CLASSIC Turbo", icon: Zap, desc: "Fastest" },
];

const capabilities = [
  { label: "Multilingual Chat", icon: Globe },
  { label: "Image Generation", icon: ImageIcon },
  { label: "Code Generation", icon: Code },
  { label: "Problem Solving", icon: Sparkles },
];

export const ChatSidebar = ({ selectedModel, onModelSelect }: ChatSidebarProps) => {
  return (
    <div className="w-64 bg-sidebar-bg border-r border-border/30 flex flex-col p-5 overflow-y-auto">
      {/* Logo */}
      <div className="text-center mb-7 pb-5 border-b border-border/20">
        <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25 rotate-3 hover:rotate-0 transition-transform duration-300">
          <Brain className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-xl font-bold gradient-text tracking-wide">T20-CLASSIC</h1>
        <p className="text-[10px] text-muted-foreground mt-0.5 tracking-[0.2em] uppercase font-medium">
          AI Assistant
        </p>
      </div>

      {/* Models */}
      <div className="mb-5">
        <h3 className="text-[10px] font-bold text-muted-foreground mb-2.5 uppercase tracking-[0.15em]">
          Models
        </h3>
        <div className="space-y-1">
          {models.map((model) => {
            const Icon = model.icon;
            const active = selectedModel === model.id;
            return (
              <button
                key={model.id}
                onClick={() => onModelSelect(model.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm",
                  active
                    ? "bg-primary/15 border border-primary/30 shadow-sm"
                    : "hover:bg-secondary/60 border border-transparent"
                )}
              >
                <div className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center",
                  active ? "bg-primary/20" : "bg-secondary/80"
                )}>
                  <Icon className={cn("w-3.5 h-3.5", active ? "text-primary" : "text-muted-foreground")} />
                </div>
                <div className="text-left">
                  <span className={cn("text-xs font-medium block", active ? "text-foreground" : "text-foreground/70")}>{model.name}</span>
                  <span className="text-[10px] text-muted-foreground">{model.desc}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Capabilities */}
      <div className="bg-secondary/30 rounded-xl p-3.5 border border-border/20">
        <h3 className="text-[10px] font-bold text-muted-foreground mb-2.5 uppercase tracking-[0.15em]">
          Capabilities
        </h3>
        <div className="space-y-2">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div key={cap.label} className="flex items-center gap-2.5">
                <Icon className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                <span className="text-xs text-foreground/70">{cap.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 text-center">
        <p className="text-[9px] text-muted-foreground/50 uppercase tracking-widest">by T20 STARBOY</p>
      </div>
    </div>
  );
};
