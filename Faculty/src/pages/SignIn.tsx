
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sparkles, LogIn } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading for demo
    setTimeout(() => {
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in to PyGenicArc.",
      });
      // Redirect to semester selector instead of dashboard
      navigate('/select-semester');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-edu-light via-white to-edu-gray-light flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-scale-in">
          <div className="p-8">
            <div className="mb-8 text-center">
              <div className="flex justify-center mb-2">
                <div className="h-12 w-12 rounded-full bg-edu-accent flex items-center justify-center text-white animate-float">
                  <Sparkles className="h-6 w-6" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">PyGenicArc</h1>
              <p className="text-edu-primary mt-1">Empowering Education with AI</p>
            </div>

            <h2 className="text-xl font-semibold text-center mb-6">Sign in to your account</h2>

            <form onSubmit={handleSignIn} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-edu-primary/30 focus-visible:ring-edu-primary transition-all duration-300 hover:border-edu-primary/50"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-sm font-medium text-edu-accent hover:text-edu-accent-light transition-colors">
                    Forgot password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password"
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-edu-primary/30 focus-visible:ring-edu-primary transition-all duration-300 hover:border-edu-primary/50"
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe} 
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)} 
                  className="data-[state=checked]:bg-edu-primary data-[state=checked]:border-edu-primary"
                />
                <Label htmlFor="remember" className="text-sm font-medium leading-none cursor-pointer">
                  Remember me for 30 days
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-edu-primary hover:bg-edu-dark flex items-center justify-center gap-2 h-11 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </>
                )}
              </Button>

              <div className="text-center mt-4">
                <span className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <a href="#" className="text-edu-accent hover:text-edu-accent-light font-medium transition-colors">
                    Sign up
                  </a>
                </span>
              </div>
            </form>
          </div>

          <div className="p-6 bg-edu-primary text-white">
            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-full bg-edu-accent/90 flex items-center justify-center">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-medium">AI-Powered Learning</h3>
                <p className="text-sm mt-1 text-white/90">
                  Experience intelligent course management with our AI assistant. Personalized insights for better teaching outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          By signing in, you agree to our{" "}
          <a href="#" className="font-medium text-edu-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="font-medium text-edu-primary">
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default SignIn;
