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
    type: 'http',
    position: { x: 250, y: 25 },
    data: {
      label: 'Webhook (Evolution API)',
      httpUrl: 'https://api.evolution.com/webhook',
      httpMethod: 'POST',
      httpPayload: '{ "event": "mensagem_recebida", "dados": {} }',
    },
    style: {
      background: '#dcfce7',
      color: '#222',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
    },
  },
];

const initialEdges: Edge[] = [];

export default function FlowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // Seleção de nó
  const onNodeClick = useCallback((event: React.MouseEvent, node: any) => {
    setSelectedNodeId(node.id);
  }, []);

  // Atualizar label do nó selecionado
  const updateSelectedNodeLabel = (label: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNodeId ? { ...node, data: { ...node.data, label } } : node
      )
    );
  };

  const addNode = (type: string) => {
    let data: any = { label: nodeTypes.find(n => n.type === type)?.label || 'Novo Nó' };
    switch (type) {
      case 'trigger':
        data.event = '';
        break;
      case 'message':
        data.message = '';
        break;
      case 'media':
        data.mediaUrl = '';
        break;
      case 'condition':
        data.options = [
          { id: 1, label: 'Opção 1' },
          { id: 2, label: 'Opção 2' },
        ];
        break;
      case 'http':
        data.httpUrl = '';
        data.httpMethod = 'GET';
        data.httpPayload = '';
        break;
      case 'variable':
        data.varName = '';
        data.varValue = '';
        break;
      case 'wait':
        data.waitTime = 1;
        break;
      case 'human':
        data.instruction = '';
        break;
      default:
        break;
    }
    const newNode = {
      id: `${Date.now()}`,
      type: type,
      position: { 
        x: Math.random() * 400 + 100, 
        y: Math.random() * 400 + 100 
      },
      data,
      style: {
        background: 'hsl(var(--card))',
        border: '1px solid hsl(var(--border))',
        borderRadius: '8px',
        color: 'hsl(var(--foreground))'
      }
    };
    setNodes((nds) => nds.concat(newNode));
    setSelectedNodeId(newNode.id);
  };

  // Encontrar nó selecionado
  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

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
          nodes={nodes.map(node => ({
            ...node,
            draggable: node.id === selectedNodeId,
            style: {
              ...node.style,
              background:
                node.type === 'trigger' ? '#e0e7ff' :
                node.type === 'message' ? '#dbeafe' :
                node.type === 'media' ? '#ede9fe' :
                node.type === 'condition' ? '#fef9c3' :
                node.type === 'http' ? '#dcfce7' :
                node.type === 'variable' ? '#ffedd5' :
                node.type === 'wait' ? '#f3f4f6' :
                node.type === 'human' ? '#fee2e2' :
                '#fff',
              color: '#222',
              border: '2px solid #e5e7eb',
            },
          }))}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          style={{ background: '#fff' }}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        >
          <Controls style={{ color: '#000' }} />
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
          <Panel position="top-left" className="space-x-2">
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
        {selectedNode && (
          <div className="absolute right-4 top-4 w-56 z-50">
            <Card className="gradient-card shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Propriedades do Nó</CardTitle>
                <button
                  className="ml-2 px-2 py-1 rounded text-foreground hover:bg-muted/50"
                  title="Fechar"
                  onClick={() => setSelectedNodeId(null)}
                >✕</button>
              </CardHeader>
              <CardContent>
                {/* Label comum a todos */}
                <label className="block text-sm font-medium mb-1">Label</label>
                <input
                  className="w-full rounded border px-2 py-1 text-foreground bg-background mb-3"
                  value={selectedNode.data.label}
                  onChange={e => updateSelectedNodeLabel(e.target.value)}
                />

                {/* Campos específicos por tipo de nó */}
                {selectedNode.type === 'trigger' && (
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Evento/Palavra-chave</label>
                    <input
                      className="w-full rounded border px-2 py-1 text-foreground bg-background"
                      value={'event' in selectedNode.data ? String(selectedNode.data.event ?? '') : ''}
                      onChange={e => {
                        const value = e.target.value;
                        setNodes(nds => nds.map(node => node.id === selectedNode.id ? { ...node, data: { ...node.data, event: value } } : node));
                      }}
                    />
                  </div>
                )}
                {selectedNode.type === 'message' && (
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Mensagem</label>
                    <textarea
                      className="w-full rounded border px-2 py-1 text-foreground bg-background"
                      rows={3}
                      value={'message' in selectedNode.data ? String(selectedNode.data.message ?? '') : ''}
                      onChange={e => {
                        const value = e.target.value;
                        setNodes(nds => nds.map(node => node.id === selectedNode.id ? { ...node, data: { ...node.data, message: value } } : node));
                      }}
                    />
                  </div>
                )}
                {selectedNode.type === 'media' && (
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">URL da Mídia</label>
                    <input
                      className="w-full rounded border px-2 py-1 text-foreground bg-background"
                      value={'mediaUrl' in selectedNode.data ? String(selectedNode.data.mediaUrl ?? '') : ''}
                      onChange={e => {
                        const value = e.target.value;
                        setNodes(nds => nds.map(node => node.id === selectedNode.id ? { ...node, data: { ...node.data, mediaUrl: value } } : node));
                      }}
                    />
                  </div>
                )}
                {selectedNode.type === 'condition' && (
                  <div className="mb-3 space-y-2">
                    <label className="block text-sm font-medium mb-1">Opções de Condição</label>
                    {('options' in selectedNode.data && Array.isArray((selectedNode.data as any).options) ? (selectedNode.data as any).options : []).map((opt: any, idx: number) => (
                      <div key={opt.id} className="flex items-center gap-2 mb-1">
                        <input
                          className="flex-1 rounded border px-2 py-1 text-foreground bg-background"
                          value={opt.label}
                          onChange={e => {
                            const value = e.target.value;
                            setNodes(nds => nds.map(node => {
                              if (node.id !== selectedNode.id) return node;
                              const optionsArr = ('options' in node.data && Array.isArray((node.data as any).options)) ? (node.data as any).options : [];
                              const newOptions = optionsArr.map((o: any, i: number) => i === idx ? { ...o, label: value } : o);
                              return { ...node, data: { ...node.data, options: newOptions } };
                            }));
                          }}
                        />
                        {('options' in selectedNode.data && (selectedNode.data as any).options.length > 2) && (
                          <button
                            type="button"
                            className="text-destructive px-2 py-1 rounded hover:bg-destructive/10"
                            onClick={() => {
                              setNodes(nds => nds.map(node => {
                                if (node.id !== selectedNode.id) return node;
                                const optionsArr = ('options' in node.data && Array.isArray((node.data as any).options)) ? (node.data as any).options : [];
                                const newOptions = optionsArr.filter((_: any, i: number) => i !== idx);
                                return { ...node, data: { ...node.data, options: newOptions } };
                              }));
                            }}
                          >Remover</button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      className="mt-2 px-3 py-1 rounded bg-primary text-white hover:bg-primary/80"
                      onClick={() => {
                        setNodes(nds => nds.map(node => {
                          if (node.id !== selectedNode.id) return node;
                          const optionsArr = ('options' in node.data && Array.isArray((node.data as any).options)) ? (node.data as any).options : [];
                          const nextId = optionsArr.length > 0 ? Math.max(...optionsArr.map((o: any) => o.id)) + 1 : 1;
                          return { ...node, data: { ...node.data, options: [...optionsArr, { id: nextId, label: `Opção ${nextId}` }] } };
                        }));
                      }}
                    >Adicionar Opção</button>
                    <p className="text-xs text-muted-foreground mt-2">Conecte cada opção a um fluxo diferente arrastando a seta do nó.</p>
                  </div>
                )}
                {selectedNode.type === 'http' && (
                  <div className="mb-3 space-y-2">
                    <label className="block text-sm font-medium mb-1">URL</label>
                    <input
                      className="w-full rounded border px-2 py-1 text-foreground bg-background"
                      value={'httpUrl' in selectedNode.data ? String(selectedNode.data.httpUrl ?? '') : ''}
                      onChange={e => {
                        const value = e.target.value;
                        setNodes(nds => nds.map(node => node.id === selectedNode.id ? { ...node, data: { ...node.data, httpUrl: value } } : node));
                      }}
                    />
                    <label className="block text-sm font-medium mb-1">Método</label>
                    <select
                      className="w-full rounded border px-2 py-1 text-foreground bg-background"
                      value={'httpMethod' in selectedNode.data ? String(selectedNode.data.httpMethod ?? 'GET') : 'GET'}
                      onChange={e => {
                        const value = e.target.value;
                        setNodes(nds => nds.map(node => node.id === selectedNode.id ? { ...node, data: { ...node.data, httpMethod: value } } : node));
                      }}
                    >
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="DELETE">DELETE</option>
                    </select>
                    <label className="block text-sm font-medium mb-1">Payload (JSON)</label>
                    <textarea
                      className="w-full rounded border px-2 py-1 text-foreground bg-background"
                      rows={2}
                      value={'httpPayload' in selectedNode.data ? String(selectedNode.data.httpPayload ?? '') : ''}
                      onChange={e => {
                        const value = e.target.value;
                        setNodes(nds => nds.map(node => node.id === selectedNode.id ? { ...node, data: { ...node.data, httpPayload: value } } : node));
                      }}
                    />
                  </div>
                )}
                {selectedNode.type === 'variable' && (
                  <div className="mb-3 space-y-2">
                    <label className="block text-sm font-medium mb-1">Nome da Variável</label>
                    <input
                      className="w-full rounded border px-2 py-1 text-foreground bg-background"
                      value={'varName' in selectedNode.data ? String(selectedNode.data.varName ?? '') : ''}
                      onChange={e => {
                        const value = e.target.value;
                        setNodes(nds => nds.map(node => node.id === selectedNode.id ? { ...node, data: { ...node.data, varName: value } } : node));
                      }}
                    />
                    <label className="block text-sm font-medium mb-1">Valor</label>
                    <input
                      className="w-full rounded border px-2 py-1 text-foreground bg-background"
                      value={'varValue' in selectedNode.data ? String(selectedNode.data.varValue ?? '') : ''}
                      onChange={e => {
                        const value = e.target.value;
                        setNodes(nds => nds.map(node => node.id === selectedNode.id ? { ...node, data: { ...node.data, varValue: value } } : node));
                      }}
                    />
                  </div>
                )}
                {selectedNode.type === 'wait' && (
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Tempo de espera (segundos)</label>
                    <input
                      type="number"
                      min={1}
                      className="w-full rounded border px-2 py-1 text-foreground bg-background"
                      value={'waitTime' in selectedNode.data ? Number(selectedNode.data.waitTime ?? 1) : 1}
                      onChange={e => {
                        const value = Number(e.target.value);
                        setNodes(nds => nds.map(node => node.id === selectedNode.id ? { ...node, data: { ...node.data, waitTime: value } } : node));
                      }}
                    />
                  </div>
                )}
                {selectedNode.type === 'human' && (
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Instrução para Operador</label>
                    <textarea
                      className="w-full rounded border px-2 py-1 text-foreground bg-background"
                      rows={2}
                      value={'instruction' in selectedNode.data ? String(selectedNode.data.instruction ?? '') : ''}
                      onChange={e => {
                        const value = e.target.value;
                        setNodes(nds => nds.map(node => node.id === selectedNode.id ? { ...node, data: { ...node.data, instruction: value } } : node));
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}