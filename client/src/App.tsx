import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NotFound from "@/pages/not-found";

// Pages
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Volunteers from "@/pages/Volunteers";
import Organizations from "@/pages/Organizations";
import About from "@/pages/About";
import News from "@/pages/News";
import Team from "@/pages/Team";
import Contact from "@/pages/Contact";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects" component={Projects} />
      <Route path="/projects/:id" component={ProjectDetail} />
      <Route path="/volunteers" component={Volunteers} />
      <Route path="/organizations" component={Organizations} />
      <Route path="/about" component={About} />
      <Route path="/news" component={News} />
      <Route path="/news/:id" component={News} />
      <Route path="/team" component={Team} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
