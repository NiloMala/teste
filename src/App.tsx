import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import { ProtectedRoute } from "./components/auth/protected-route";
import { MainLayout } from "./components/layout/main-layout";
import Dashboard from "./pages/dashboard";
import FlowEditor from "./pages/flow-editor";
import Instances from "./pages/instances";
import Logs from "./pages/logs";
import Auth from "./pages/auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/editor" element={
              <ProtectedRoute>
                <MainLayout>
                  <FlowEditor />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/instances" element={
              <ProtectedRoute>
                <MainLayout>
                  <Instances />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/logs" element={
              <ProtectedRoute>
                <MainLayout>
                  <Logs />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <MainLayout>
                  <div className="flex-1 p-6">
                    <h1 className="text-3xl font-bold">Analytics</h1>
                    <p className="text-muted-foreground mt-2">Em desenvolvimento...</p>
                  </div>
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/users" element={
              <ProtectedRoute>
                <MainLayout>
                  <div className="flex-1 p-6">
                    <h1 className="text-3xl font-bold">Usuários</h1>
                    <p className="text-muted-foreground mt-2">Em desenvolvimento...</p>
                  </div>
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/billing" element={
              <ProtectedRoute>
                <MainLayout>
                  <div className="flex-1 p-6">
                    <h1 className="text-3xl font-bold">Planos</h1>
                    <p className="text-muted-foreground mt-2">Em desenvolvimento...</p>
                  </div>
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <MainLayout>
                  <div className="flex-1 p-6">
                    <h1 className="text-3xl font-bold">Configurações</h1>
                    <p className="text-muted-foreground mt-2">Em desenvolvimento...</p>
                  </div>
                </MainLayout>
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
