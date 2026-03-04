import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { getTimeBasedGreeting, getFromSession } from '@/lib/utils';
import { WellsFargoLogo } from './WellsFargoSvg';

interface HeaderProps {
  isLoggedIn?: boolean;
  username?: string;
  onSignOffClick?: () => void;
}

export function Header({ isLoggedIn = false, username = '', onSignOffClick }: HeaderProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [greeting, setGreeting] = useState('Welcome');
  
  // Get the user from session if available
  const user = getFromSession('user', null);
  const displayName = username || (user ? user.firstName : '');
  
  // Update greeting based on time of day
  useEffect(() => {
    setGreeting(getTimeBasedGreeting());
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSignOffClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onSignOffClick) {
      onSignOffClick();
    }
  };

  return (
    <header>
      {/* Hero Banner Image */}
      <div className="w-full h-24 md:h-36 overflow-hidden relative">
        <img 
          src="https://images.unsplash.com/photo-1483664852095-d6cc6870702d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=400" 
          alt="Winter landscape with mountains and lake" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <WellsFargoLogo className="h-6" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                type="button" 
                className="text-gray-700 hover:text-wf-red focus:outline-none"
                onClick={toggleMobileMenu}
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              <a href="#" className="text-gray-700 hover:text-wf-red flex items-center">
                <span className="material-symbols-outlined">search</span>
              </a>
              
              {isLoggedIn ? (
                <>
                  <a 
                    href="#" 
                    className="text-gray-700 hover:text-wf-red flex items-center space-x-1"
                    onClick={handleSignOffClick}
                  >
                    <span className="material-symbols-outlined">lock</span>
                    <span>Sign Off</span>
                  </a>
                  <div className="relative group">
                    <a href="#" className="text-gray-700 hover:text-wf-red flex items-center space-x-1">
                      <span className="material-symbols-outlined">person</span>
                      <span>{greeting}, {displayName.toUpperCase()}</span>
                      <span className="material-symbols-outlined">arrow_drop_down</span>
                    </a>
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 w-48 bg-white shadow-lg py-2 mt-1 rounded-md hidden group-hover:block z-10">
                      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Profile Settings
                      </Link>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Security Center
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Messages
                      </a>
                      <a 
                        href="#" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleSignOffClick}
                      >
                        Sign Off
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <Link href="/login" className="text-gray-700 hover:text-wf-red flex items-center space-x-1">
                  <span className="material-symbols-outlined">login</span>
                  <span>Sign On</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-white pb-4 px-4 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <a href="#" className="block py-2 text-gray-700">Search</a>
          
          {isLoggedIn ? (
            <>
              <a 
                href="#" 
                className="block py-2 text-gray-700"
                onClick={handleSignOffClick}
              >
                Sign Off
              </a>
              <p className="block py-2 text-gray-700">{greeting}, {displayName.toUpperCase()}</p>
            </>
          ) : (
            <Link href="/login" className="block py-2 text-gray-700">
              Sign On
            </Link>
          )}
        </div>

        {/* Sub Navigation */}
        <div className="bg-gray-100 border-t border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto py-2 space-x-6 text-sm no-scrollbar">
              <button className="whitespace-nowrap text-gray-700 hover:text-wf-red flex items-center">
                Accounts
                <span className="material-symbols-outlined text-sm ml-1">arrow_drop_down</span>
              </button>
              <button className="whitespace-nowrap text-gray-700 hover:text-wf-red">Brokerage</button>
              <button className="whitespace-nowrap text-gray-700 hover:text-wf-red flex items-center">
                Transfer & Pay
                <span className="material-symbols-outlined text-sm ml-1">arrow_drop_down</span>
              </button>
              <button className="whitespace-nowrap text-gray-700 hover:text-wf-red flex items-center">
                Plan & Learn
                <span className="material-symbols-outlined text-sm ml-1">arrow_drop_down</span>
              </button>
              <button className="whitespace-nowrap text-gray-700 hover:text-wf-red flex items-center">
                Security & Support
                <span className="material-symbols-outlined text-sm ml-1">arrow_drop_down</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumbs */}
      {isLoggedIn && (
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center text-sm">
              <Link href="/profile" className="text-gray-600 hover:text-wf-red flex items-center">
                <span className="material-symbols-outlined text-sm mr-1">home</span>
                <span>Account Summary</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
