
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import AITools from "./pages/AITools";
import Workspace from "./pages/Workspace";
import SubjectView from "./pages/SubjectView";
import AttendanceMark from "./pages/AttendanceMark";
import SemesterSelector from "./components/SemesterSelector";
import SubjectQuestionBank from "./pages/SubjectQuestionBank";
import Students from "./pages/Students";
import LiveClassroom from "./pages/LiveClassroom";
import VirtualClassroom from "./pages/VirtualClassroom";
import Assignments from "./pages/Assignments";
import Analytics from "./pages/Analytics";
import CalendarPage from "./pages/CalendarPage";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import { ThemeProvider } from "./components/ThemeProvider";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="system">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/select-semester" element={<SemesterSelector />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="/live-classroom" element={<LiveClassroom />} />
              <Route path="/live-classroom/:subjectId" element={<SubjectView />} />
              <Route path="/virtual-classroom" element={<VirtualClassroom />} />
              <Route path="/subjects/:subjectId/question-bank" element={<SubjectQuestionBank />} />
              <Route path="/students" element={<Students />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/ai-tools" element={<AITools />} />
              <Route path="/workspace" element={<Workspace />} />
              <Route path="/workspace/:subjectId" element={<SubjectView />} />
              <Route path="/workspace/attendance" element={<AttendanceMark />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
