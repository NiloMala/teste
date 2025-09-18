import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  MessageSquare,
  Send,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

const mockLogs = [
  {
    id: "log_001",
    timestamp: "2024-01-15 14:30:25",
    direction: "inbound",
    instance: "WhatsApp Principal",
    contact: "+55 11 99999-1234",
    message: "Olá, preciso de ajuda com meu pedido",
    status: "success",
    flowName: "Atendimento Geral",
    processingTime: "120ms"
  },
  {
    id: "log_002", 
    timestamp: "2024-01-15 14:30:28",
    direction: "outbound",
    instance: "WhatsApp Principal",
    contact: "+55 11 99999-1234",
    message: "Olá! Como posso ajudá-lo hoje?",
    status: "success",
    flowName: "Atendimento Geral",
    processingTime: "80ms"
  },
  {
    id: "log_003",
    timestamp: "2024-01-15 14:29:15",
    direction: "inbound",
    instance: "Suporte Técnico",
    contact: "+55 11 88888-5678",
    message: "Meu sistema não está funcionando",
    status: "failed",
    flowName: "Suporte Técnico",
    processingTime: "2.5s",
    error: "Timeout na API externa"
  },
  {
    id: "log_004",
    timestamp: "2024-01-15 14:28:45",
    direction: "outbound",
    instance: "Vendas",
    contact: "+55 11 77777-9012",
    message: "Obrigado pelo interesse! Vou te enviar nossa proposta.",
    status: "pending",
    flowName: "Vendas - Proposta",
    processingTime: "45ms"
  }
];

export default function Logs() {
  const [logs] = useState(mockLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDirection, setFilterDirection] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return (
          <Badge variant="outline" className="bg-success/20 text-success border-success/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            Sucesso
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="outline" className="bg-destructive/20 text-destructive border-destructive/30">
            <AlertCircle className="h-3 w-3 mr-1" />
            Falha
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="bg-warning/20 text-warning border-warning/30">
            <Clock className="h-3 w-3 mr-1" />
            Pendente
          </Badge>
        );
      default:
        return null;
    }
  };

  const getDirectionIcon = (direction: string) => {
    return direction === 'inbound' ? 
      <MessageSquare className="h-4 w-4 text-blue-500" /> : 
      <Send className="h-4 w-4 text-green-500" />;
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.contact.includes(searchTerm) ||
                         log.instance.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDirection = filterDirection === "all" || log.direction === filterDirection;
    const matchesStatus = filterStatus === "all" || log.status === filterStatus;
    
    return matchesSearch && matchesDirection && matchesStatus;
  });

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Logs de Mensagens</h1>
          <p className="text-muted-foreground">
            Histórico completo de mensagens processadas pelo sistema
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
          <Button variant="hero">
            <Download className="h-4 w-4" />
            Exportar CSV
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card className="gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filtros</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Mensagem, contato ou instância..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Direção</label>
              <Select value={filterDirection} onValueChange={setFilterDirection}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="inbound">Recebidas</SelectItem>
                  <SelectItem value="outbound">Enviadas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Status</label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="success">Sucesso</SelectItem>
                  <SelectItem value="failed">Falha</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Período</label>
              <Select defaultValue="today">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="week">Última semana</SelectItem>
                  <SelectItem value="month">Último mês</SelectItem>
                  <SelectItem value="custom">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de logs */}
      <Card className="gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Registros ({filteredLogs.length})</CardTitle>
          <CardDescription>
            Últimas mensagens processadas pelo sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div 
                key={log.id} 
                className="border border-border rounded-lg p-4 bg-muted/30 hover:bg-muted/50 transition-smooth"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="mt-1">
                      {getDirectionIcon(log.direction)}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-foreground">
                          {log.contact}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          via {log.instance}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {log.timestamp}
                        </span>
                      </div>
                      
                      <p className="text-sm text-foreground bg-background/50 rounded p-2 border">
                        {log.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-xs text-muted-foreground">
                            Fluxo: {log.flowName}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Tempo: {log.processingTime}
                          </span>
                        </div>
                        
                        {getStatusBadge(log.status)}
                      </div>
                      
                      {log.error && (
                        <div className="bg-destructive/10 border border-destructive/20 rounded p-2">
                          <p className="text-xs text-destructive">{log.error}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground">Nenhum log encontrado</h3>
              <p className="text-muted-foreground">
                Ajuste os filtros para ver diferentes resultados
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}