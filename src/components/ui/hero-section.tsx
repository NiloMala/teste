import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export function HeroSection({ 
  title, 
  subtitle, 
  primaryAction, 
  secondaryAction 
}: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden rounded-xl gradient-card shadow-elegant">
      <div className="absolute inset-0">
        <img 
          src={heroImage}
          alt="BotBuilder Dashboard"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 gradient-subtle" />
      </div>
      
      <div className="relative px-8 py-12 lg:px-12 lg:py-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-foreground lg:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground lg:text-xl">
            {subtitle}
          </p>
          
          {(primaryAction || secondaryAction) && (
            <div className="mt-8 flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              {primaryAction && (
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={primaryAction.onClick}
                  className="text-base"
                >
                  {primaryAction.label}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
              {secondaryAction && (
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={secondaryAction.onClick}
                  className="text-base"
                >
                  <Play className="mr-2 h-4 w-4" />
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}