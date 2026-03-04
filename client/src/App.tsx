import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import Home from "@/pages/Home";
import AdminPanel from "@/pages/AdminPanel";

function Router() {
  const [location, setLocation] = useLocation();

  // Redirect to login if not at a valid route
  useEffect(() => {
    const isValidRoute = ["/", "/login", "/profile", "/admin"].includes(location);
    
    if (!isValidRoute) {
      // Don't redirect if already at not-found
      if (location !== "/not-found") {
        setLocation("/");
      }
    }
  }, [location, setLocation]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={Profile} />
      <Route path="/admin" component={AdminPanel} />
      <Route path="/not-found" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
