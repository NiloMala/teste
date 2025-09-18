import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LayoutDashboard, 
  GitBranch, 
  Database, 
  ScrollText, 
  Settings, 
  Bot,
  Users,
  CreditCard,
  Activity
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { UserProfile } from "./user-profile";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Editor", href: "/editor", icon: GitBranch },
  { name: "Instâncias", href: "/instances", icon: Database },
  { name: "Logs", href: "/logs", icon: ScrollText },
  { name: "Analytics", href: "/analytics", icon: Activity },
  { name: "Usuários", href: "/users", icon: Users },
  { name: "Planos", href: "/billing", icon: CreditCard },
  { name: "Configurações", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col border-r border-border bg-sidebar shadow-card">
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">BotBuilder</h1>
            <p className="text-xs text-sidebar-foreground/60">Evolution API</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-smooth",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-glow"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </ScrollArea>

      <div className="border-t border-sidebar-border p-4">
        <UserProfile />
      </div>
    </div>
  );
}