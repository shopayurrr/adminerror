import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { formatDate, formatCurrency, maskAccountNumber, getFromSession } from '@/lib/utils';
import { useIpAddress } from '@/hooks/useIpAddress';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AlertBanner } from '@/components/AlertBanner';
import { SignOffModal } from '@/components/SignOffModal';

export default function Profile() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isSignOffModalOpen, setIsSignOffModalOpen] = useState(false);
  const { ipAddress } = useIpAddress();
  
  // Get user info from session storage
  const user = getFromSession('user', null);
  const loginTime = getFromSession('loginTime', new Date().toISOString());
  
  // Create a dummy account data for display purposes
  const accounts = [
    {
      id: 1,
      accountType: 'Everyday Checking',
      accountNumber: '12349283',
      balance: '45382.67',
      icon: 'account_balance'
    },
    {
      id: 2,
      accountType: 'Way2Save Savings',
      accountNumber: '12344829',
      balance: '128456.93',
      icon: 'savings'
    },
    {
      id: 3,
      accountType: 'Active Cash Card',
      accountNumber: '12348273',
      balance: '5000.00',
      icon: 'credit_card'
    }
  ];
  
  // Calculate total available balance
  const totalBalance = accounts.reduce(
    (sum, account) => sum + parseFloat(account.balance), 
    0
  );

  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access this page.",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [user, navigate, toast]);

  const openSignOffModal = () => {
    setIsSignOffModalOpen(true);
  };

  const closeSignOffModal = () => {
    setIsSignOffModalOpen(false);
  };

  if (!user) {
    return null; // Don't render anything if not logged in
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AlertBanner />
      <Header 
        isLoggedIn={true} 
        username={user.firstName} 
        onSignOffClick={openSignOffModal} 
      />
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
                <h2 className="text-xl font-bold text-gray-800">Profile Information</h2>
                <button className="text-wf-red hover:text-wf-dark-red">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{user.firstName} {user.lastName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{user.dateOfBirth || 'Not provided'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Primary Phone</p>
                    <p className="font-medium">{user.primaryPhone || 'Not provided'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Secondary Phone</p>
                    <p className="font-medium">{user.secondaryPhone || 'Not provided'}</p>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{user.address || 'Not provided'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Permanent Email</p>
                    <p className="font-medium">{user.permanentEmail || user.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Temporary Email</p>
                    <p className="font-medium">{user.temporaryEmail || 'Not provided'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Social Security Number</p>
                    <p className="font-medium">{user.socialSecurityNumber ? `XXXX${user.socialSecurityNumber.slice(-4)}` : 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Login Information */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Security Information</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Login Time</p>
                    <p className="font-medium">
                      {formatDate(new Date(loginTime))}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Your IP Address</p>
                    <p className="font-medium">
                      {ipAddress || 'Loading...'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Summary */}
            <div className="bg-white rounded-lg shadow">
              <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
                <h2 className="text-xl font-bold text-gray-800">Account Summary</h2>
                <div className="flex space-x-3">
                  <button className="text-gray-600 hover:text-wf-red flex items-center text-sm">
                    <span className="material-symbols-outlined text-sm mr-1">settings</span>
                    <span>Customize</span>
                  </button>
                  <button className="text-gray-600 hover:text-wf-red">
                    <span className="material-symbols-outlined">list</span>
                  </button>
                </div>
              </div>
              
              {/* Available Balance Section */}
              <div className="p-6 mb-6 bg-gray-50 rounded-lg mx-6 mt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-800">Available Balance</h3>
                  <p className="text-xl font-bold text-wf-red">
                    {formatCurrency(totalBalance)}
                  </p>
                </div>
              </div>
              
              {/* Accounts Table */}
              <div className="overflow-x-auto px-6 pb-6">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="pb-3 font-semibold text-gray-600 text-sm">Account Type</th>
                      <th className="pb-3 font-semibold text-gray-600 text-sm">Account Number</th>
                      <th className="pb-3 font-semibold text-gray-600 text-sm text-right">Available Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts.map((account) => (
                      <tr key={account.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-4">
                          <div className="flex items-center">
                            <span className="material-symbols-outlined text-wf-red mr-2">{account.icon}</span>
                            <span>{account.accountType}</span>
                          </div>
                        </td>
                        <td className="py-4">{maskAccountNumber(account.accountNumber)}</td>
                        <td className="py-4 text-right">{formatCurrency(account.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="lg:col-span-1">
            {/* Quick Actions Card */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-800">Quick Actions</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <a href="#" className="flex items-center text-wf-red hover:text-wf-dark-red">
                    <span className="material-symbols-outlined mr-2">payments</span>
                    <span>Transfer Money</span>
                  </a>
                  <a href="#" className="flex items-center text-wf-red hover:text-wf-dark-red">
                    <span className="material-symbols-outlined mr-2">paid</span>
                    <span>Pay Bills</span>
                  </a>
                  <a href="#" className="flex items-center text-wf-red hover:text-wf-dark-red">
                    <span className="material-symbols-outlined mr-2">description</span>
                    <span>View Statements</span>
                  </a>
                  <a href="#" className="flex items-center text-wf-red hover:text-wf-dark-red">
                    <span className="material-symbols-outlined mr-2">local_atm</span>
                    <span>Find ATMs/Branches</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Special Offers Card */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-6 text-center">
                {/* Dollar sign stack image */}
                <div className="flex justify-center mb-3">
                  <span className="material-symbols-outlined text-4xl text-wf-gold">payments</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Enjoy a $2500 Bonus</h3>
                <p className="text-gray-600 mb-4">When you upgrade to Premier Checking.</p>
                <a href="#" className="inline-block bg-wf-red hover:bg-wf-dark-red text-white font-medium py-2 px-4 rounded transition-colors">
                  Learn how
                </a>
              </div>
            </div>

            {/* Security Tips Card */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-800">Security Tips</h2>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex">
                    <span className="material-symbols-outlined text-wf-red mr-2 flex-shrink-0">security</span>
                    <p className="text-sm text-gray-600">Always sign off when you finish your online session</p>
                  </li>
                  <li className="flex">
                    <span className="material-symbols-outlined text-wf-red mr-2 flex-shrink-0">password</span>
                    <p className="text-sm text-gray-600">Create strong, unique passwords and change them regularly</p>
                  </li>
                  <li className="flex">
                    <span className="material-symbols-outlined text-wf-red mr-2 flex-shrink-0">phone_android</span>
                    <p className="text-sm text-gray-600">Set up two-factor authentication for added security</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Sign Off Modal */}
      <SignOffModal 
        isOpen={isSignOffModalOpen}
        onClose={closeSignOffModal}
      />
    </div>
  );
}
