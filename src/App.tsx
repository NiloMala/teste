import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/main-layout";
import Dashboard from "./pages/dashboard";
import FlowEditor from "./pages/flow-editor";
import Instances from "./pages/instances";
import Logs from "./pages/logs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          } />
          <Route path="/editor" element={
            <MainLayout>
              <FlowEditor />
            </MainLayout>
          } />
          <Route path="/instances" element={
            <MainLayout>
              <Instances />
            </MainLayout>
          } />
          <Route path="/logs" element={
            <MainLayout>
              <Logs />
            </MainLayout>
          } />
          <Route path="/analytics" element={
            <MainLayout>
              <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold">Analytics</h1>
                <p className="text-muted-foreground mt-2">Em desenvolvimento...</p>
              </div>
            </MainLayout>
          } />
          <Route path="/users" element={
            <MainLayout>
              <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold">Usuários</h1>
                <p className="text-muted-foreground mt-2">Em desenvolvimento...</p>
              </div>
            </MainLayout>
          } />
          <Route path="/billing" element={
            <MainLayout>
              <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold">Planos</h1>
                <p className="text-muted-foreground mt-2">Em desenvolvimento...</p>
              </div>
            </MainLayout>
          } />
          <Route path="/settings" element={
            <MainLayout>
              <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold">Configurações</h1>
                <p className="text-muted-foreground mt-2">Em desenvolvimento...</p>
              </div>
            </MainLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
