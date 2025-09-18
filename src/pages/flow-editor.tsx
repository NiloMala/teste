import { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  BackgroundVariant,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MessageSquare, 
  Image, 
  Zap, 
  GitBranch, 
  Globe, 
  Variable,
  Clock,
  Users,
  Save,
  Play,
  Plus
} from "lucide-react";

// Tipos de nós personalizados
const nodeTypes = [
  { type: 'trigger', icon: Zap, label: 'Trigger', color: 'bg-primary' },
  { type: 'message', icon: MessageSquare, label: 'Mensagem', color: 'bg-blue-500' },
  { type: 'media', icon: Image, label: 'Mídia', color: 'bg-purple-500' },
  { type: 'condition', icon: GitBranch, label: 'Condição', color: 'bg-yellow-500' },
  { type: 'http', icon: Globe, label: 'HTTP Request', color: 'bg-green-500' },
  { type: 'variable', icon: Variable, label: 'Variável', color: 'bg-orange-500' },
  { type: 'wait', icon: Clock, label: 'Aguardar', color: 'bg-gray-500' },
  { type: 'human', icon: Users, label: 'Humano', color: 'bg-red-500' },
];

const initialNodes = [
  {
    id: '1',
    type: 'input',
    position: { x: 250, y: 25 },
    data: { label: 'Início do Fluxo' },
    style: { 
      background: 'hsl(var(--primary))', 
      color: 'white',
      border: '1px solid hsl(var(--primary))',
      borderRadius: '8px'
    },
  },
];

const initialEdges: Edge[] = [];

export default function FlowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeType, setSelectedNodeType] = useState<string | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const addNode = (type: string) => {
    const newNode = {
      id: `${Date.now()}`,
      type: 'default',
      position: { 
        x: Math.random() * 400 + 100, 
        y: Math.random() * 400 + 100 
      },
      data: { 
        label: nodeTypes.find(n => n.type === type)?.label || 'Novo Nó'
      },
      style: {
        background: 'hsl(var(--card))',
        border: '1px solid hsl(var(--border))',
        borderRadius: '8px',
        color: 'hsl(var(--foreground))'
      }
    };
    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div className="flex h-full">
      {/* Sidebar com nós */}
      <div className="w-64 border-r border-border bg-card shadow-card">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Componentes</h2>
          <p className="text-sm text-muted-foreground">
            Arraste para criar fluxos
          </p>
        </div>
        
        <div className="p-4 space-y-3">
          {nodeTypes.map((nodeType) => (
            <div
              key={nodeType.type}
              className="flex items-center space-x-3 p-3 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition-smooth"
              onClick={() => addNode(nodeType.type)}
            >
              <div className={`p-2 rounded-lg ${nodeType.color}`}>
                <nodeType.icon className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-foreground">
                {nodeType.label}
              </span>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border">
          <div className="space-y-2">
            <Button variant="hero" size="sm" className="w-full">
              <Save className="h-4 w-4" />
              Salvar Fluxo
            </Button>
            <Button variant="success" size="sm" className="w-full">
              <Play className="h-4 w-4" />
              Testar Fluxo
            </Button>
          </div>
        </div>
      </div>

      {/* Editor principal */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          style={{ background: 'hsl(var(--background))' }}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        >
          <Controls />
          <MiniMap 
            style={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))'
            }}
            maskColor="hsl(var(--muted) / 0.6)"
          />
          <Background 
            variant={BackgroundVariant.Dots} 
            gap={12} 
            size={1} 
            color="hsl(var(--muted-foreground) / 0.3)"
          />
          
          <Panel position="top-right" className="space-x-2">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4" />
              Novo Fluxo
            </Button>
            <Button variant="hero" size="sm">
              <Play className="h-4 w-4" />
              Deploy
            </Button>
          </Panel>
        </ReactFlow>

        {/* Painel de propriedades (quando um nó estiver selecionado) */}
        {selectedNodeType && (
          <div className="absolute right-4 top-4 w-80">
            <Card className="gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Propriedades</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Configure as propriedades do nó selecionado aqui.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}