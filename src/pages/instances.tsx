import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Database, 
  Settings, 
  Trash2, 
  CheckCircle, 
  XCircle,
  Zap,
  Edit
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const mockInstances = [
  {
    id: 1,
    name: "WhatsApp Principal",
    instanceId: "main-whatsapp-001",
    status: "connected",
    lastSeen: "2 min atrás",
    messagesCount: 1247,
    webhook: "https://yourapp.com/webhook/main-whatsapp-001"
  },
  {
    id: 2,
    name: "Suporte Técnico",
    instanceId: "support-tech-002",
    status: "connected",
    lastSeen: "5 min atrás",
    messagesCount: 892,
    webhook: "https://yourapp.com/webhook/support-tech-002"
  },
  {
    id: 3,
    name: "Vendas",
    instanceId: "sales-team-003",
    status: "disconnected",
    lastSeen: "2h atrás",
    messagesCount: 0,
    webhook: "https://yourapp.com/webhook/sales-team-003"
  }
];

export default function Instances() {
  const [instances, setInstances] = useState(mockInstances);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    if (status === 'connected') {
      return (
        <Badge variant="outline" className="bg-success/20 text-success border-success/30">
          <CheckCircle className="h-3 w-3 mr-1" />
          Conectado
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="bg-destructive/20 text-destructive border-destructive/30">
        <XCircle className="h-3 w-3 mr-1" />
        Desconectado
      </Badge>
    );
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Instâncias Evolution</h1>
          <p className="text-muted-foreground">
            Gerencie suas conexões com a Evolution API
          </p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="hero" size="lg">
              <Plus className="h-4 w-4" />
              Nova Instância
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Criar Nova Instância</DialogTitle>
              <DialogDescription>
                Conecte uma nova instância da Evolution API ao seu bot builder.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome da Instância</Label>
                <Input
                  id="name"
                  placeholder="Ex: WhatsApp Marketing"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="instance-id">Instance ID</Label>
                <Input
                  id="instance-id"
                  placeholder="Ex: marketing-001"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="auth-token">Token de Autenticação</Label>
                <Input
                  id="auth-token"
                  type="password"
                  placeholder="Token da Evolution API"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="api-url">URL da API</Label>
                <Input
                  id="api-url"
                  placeholder="https://api.evolutionapi.com"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button variant="hero">
                <Zap className="h-4 w-4" />
                Conectar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de instâncias */}
      <div className="grid gap-6">
        {instances.map((instance) => (
          <Card key={instance.id} className="gradient-card shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{instance.name}</CardTitle>
                    <CardDescription className="flex items-center space-x-2">
                      <span>ID: {instance.instanceId}</span>
                      <span>•</span>
                      <span>Última atividade: {instance.lastSeen}</span>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(instance.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Mensagens Processadas</p>
                  <p className="text-2xl font-bold text-foreground">{instance.messagesCount.toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Webhook URL</p>
                  <div className="flex items-center space-x-2">
                    <code className="text-xs bg-muted/50 px-2 py-1 rounded flex-1 truncate">
                      {instance.webhook}
                    </code>
                    <Button variant="outline" size="sm">
                      Copiar
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Ações</p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                      Config
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Teste de conexão */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`h-2 w-2 rounded-full ${
                      instance.status === 'connected' ? 'bg-success' : 'bg-destructive'
                    }`} />
                    <span className="text-sm text-muted-foreground">
                      {instance.status === 'connected' ? 'Conexão ativa' : 'Sem conexão'}
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Zap className="h-4 w-4" />
                    Testar Conexão
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Card de informações */}
      <Card className="gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-primary" />
            <span>Como conectar uma instância</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-foreground mb-2">1. Obtenha as credenciais</h4>
              <p className="text-sm text-muted-foreground">
                Na sua instalação da Evolution API, obtenha o Instance ID e o token de autenticação.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">2. Configure o webhook</h4>
              <p className="text-sm text-muted-foreground">
                O sistema configurará automaticamente o webhook na sua instância Evolution.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}