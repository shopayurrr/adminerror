import React from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';
import { clearSession } from '@/lib/utils';

interface SignOffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignOffModal({ isOpen, onClose }: SignOffModalProps) {
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const handleSignOff = async () => {
    try {
      await apiRequest('POST', '/api/logout', undefined);
      
      // Clear session storage
      clearSession();
      
      // Close modal
      onClose();
      
      // Show success toast
      toast({
        title: "Signed Off Successfully",
        description: "You have been signed off from your account.",
        variant: "default",
      });
      
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Error signing off:', error);
      
      // Show error toast
      toast({
        title: "Sign Off Failed",
        description: "There was an error signing off. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Sign Off Confirmation</h3>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <p className="mb-6">Are you sure you want to sign off from your online banking session?</p>
        <div className="flex justify-end space-x-3">
          <button 
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 bg-wf-red text-white rounded hover:bg-wf-dark-red"
            onClick={handleSignOff}
          >
            Sign Off
          </button>
        </div>
      </div>
    </div>
  );
}
