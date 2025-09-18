import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/ui/hero-section";
import { 
  MessageSquare, 
  Users, 
  Zap, 
  TrendingUp, 
  Plus,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Hero Section */}
      <HeroSection
        title="Bem-vindo ao BotBuilder"
        subtitle="Crie chatbots inteligentes com nosso editor drag-and-drop integrado ao Evolution API. Automatize conversas e transforme seu atendimento."
        primaryAction={{
          label: "Criar Primeiro Fluxo",
          onClick: () => navigate("/editor")
        }}
        secondaryAction={{
          label: "Ver Tutorial",
          onClick: () => console.log("Tutorial")
        }}
      />

      {/* Métricas principais */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Mensagens Hoje"
          value="2,847"
          description="Total de mensagens processadas"
          icon={MessageSquare}
          trend={{ value: "12%", isPositive: true }}
        />
        <MetricCard
          title="Usuários Ativos"
          value="1,245"
          description="Usuários únicos este mês"
          icon={Users}
          trend={{ value: "8%", isPositive: true }}
        />
        <MetricCard
          title="Automações"
          value="18"
          description="Fluxos ativos"
          icon={Zap}
        />
        <MetricCard
          title="Taxa de Sucesso"
          value="98.5%"
          description="Mensagens entregues"
          icon={TrendingUp}
          trend={{ value: "2.1%", isPositive: true }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Instâncias Ativas */}
        <Card className="gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span>Instâncias Evolution</span>
            </CardTitle>
            <CardDescription>
              Status das suas conexões com a Evolution API
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "WhatsApp Principal", status: "online", messages: 1247 },
              { name: "Suporte Técnico", status: "online", messages: 892 },
              { name: "Vendas", status: "offline", messages: 0 }
            ].map((instance, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center space-x-3">
                  <div className={`h-3 w-3 rounded-full ${
                    instance.status === 'online' ? 'bg-success' : 'bg-destructive'
                  }`} />
                  <div>
                    <p className="font-medium text-foreground">{instance.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {instance.messages} mensagens hoje
                    </p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  instance.status === 'online' 
                    ? 'bg-success/20 text-success' 
                    : 'bg-destructive/20 text-destructive'
                }`}>
                  {instance.status === 'online' ? 'Online' : 'Offline'}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Atividade Recente */}
        <Card className="gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Atividade Recente</span>
            </CardTitle>
            <CardDescription>
              Últimas ações realizadas no sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { 
                action: "Fluxo 'Boas-vindas' foi implantado", 
                time: "5 min atrás",
                type: "success"
              },
              { 
                action: "Nova instância conectada: 'Marketing'", 
                time: "12 min atrás",
                type: "info"
              },
              { 
                action: "Erro na instância 'Vendas'", 
                time: "1h atrás",
                type: "error"
              },
              { 
                action: "100 mensagens processadas", 
                time: "2h atrás",
                type: "success"
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                <div className={`h-2 w-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-success' :
                  activity.type === 'error' ? 'bg-destructive' : 'bg-primary'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Acesse rapidamente as funcionalidades mais utilizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Plus className="h-6 w-6" />
              <span>Criar Fluxo</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Zap className="h-6 w-6" />
              <span>Conectar Instância</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <MessageSquare className="h-6 w-6" />
              <span>Ver Logs</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <TrendingUp className="h-6 w-6" />
              <span>Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}