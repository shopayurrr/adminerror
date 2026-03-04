import React, { useState } from 'react';
import { Link } from 'wouter';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertBanner } from '@/components/AlertBanner';

export default function Home() {
  const [isAccordionOpen, setIsAccordionOpen] = useState<{ [key: string]: boolean }>({
    personalBanking: false,
    smallBusiness: false,
    commercial: false,
  });

  const toggleAccordion = (section: string) => {
    setIsAccordionOpen({
      ...isAccordionOpen,
      [section]: !isAccordionOpen[section]
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative">
        <div className="w-full h-[400px] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1483664852095-d6cc6870702d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=400" 
            alt="Winter landscape with mountains and lake" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Banking Made Simple</h1>
                <p className="text-xl text-white mb-6">Manage your finances with ease using Wells Fargo Online Banking</p>
                <Link href="/login">
                  <Button className="bg-wf-red hover:bg-wf-dark-red text-white px-6 py-3 rounded text-lg">
                    Sign On Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Featured Cards */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Everyday Checking</CardTitle>
                <CardDescription>Simple and convenient checking for your daily needs</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-wf-red mr-2">check_circle</span>
                    <span>$0 monthly service fee options</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-wf-red mr-2">check_circle</span>
                    <span>Access to 13,000+ ATMs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-wf-red mr-2">check_circle</span>
                    <span>Mobile deposit convenience</span>
                  </li>
                </ul>
                <Button className="w-full bg-wf-red hover:bg-wf-dark-red">Learn More</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Active Cash® Card</CardTitle>
                <CardDescription>Unlimited 2% cash rewards on purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-wf-red mr-2">check_circle</span>
                    <span>2% cash rewards on purchases</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-wf-red mr-2">check_circle</span>
                    <span>$200 cash rewards bonus offer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-wf-red mr-2">check_circle</span>
                    <span>$0 annual fee</span>
                  </li>
                </ul>
                <Button className="w-full bg-wf-red hover:bg-wf-dark-red">Apply Now</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Premier Savings</CardTitle>
                <CardDescription>Earn more with relationship rates</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-wf-red mr-2">check_circle</span>
                    <span>Higher interest rates with linked checking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-wf-red mr-2">check_circle</span>
                    <span>No minimum opening deposit</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-wf-red mr-2">check_circle</span>
                    <span>FDIC insured</span>
                  </li>
                </ul>
                <Button className="w-full bg-wf-red hover:bg-wf-dark-red">Open Account</Button>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Banking Categories */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Banking Solutions</h2>
          
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <button 
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100"
                onClick={() => toggleAccordion('personalBanking')}
              >
                <h3 className="text-lg font-semibold">Personal Banking</h3>
                <span className="material-symbols-outlined">
                  {isAccordionOpen.personalBanking ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              
              {isAccordionOpen.personalBanking && (
                <div className="p-4 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Accounts</h4>
                      <ul className="space-y-1">
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Checking Accounts</a></li>
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Savings Accounts</a></li>
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">CDs & IRAs</a></li>
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Credit Cards</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Loans & Credit</h4>
                      <ul className="space-y-1">
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Mortgage</a></li>
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Home Equity</a></li>
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Personal Loans</a></li>
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Auto Loans</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Investing & Retirement</h4>
                      <ul className="space-y-1">
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Retirement Planning</a></li>
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Brokerage Account</a></li>
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Financial Advisors</a></li>
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Wealth Management</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <button 
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100"
                onClick={() => toggleAccordion('smallBusiness')}
              >
                <h3 className="text-lg font-semibold">Small Business</h3>
                <span className="material-symbols-outlined">
                  {isAccordionOpen.smallBusiness ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              
              {isAccordionOpen.smallBusiness && (
                <div className="p-4 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Business Banking</h4>
                      <ul className="space-y-1">
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Business Checking</a></li>
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Business Savings</a></li>
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Business Credit Cards</a></li>
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Merchant Services</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Business Financing</h4>
                      <ul className="space-y-1">
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Business Loans</a></li>
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Lines of Credit</a></li>
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">SBA Loans</a></li>
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Commercial Real Estate</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Business Services</h4>
                      <ul className="space-y-1">
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Payroll Services</a></li>
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Payment Processing</a></li>
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Business Insurance</a></li>
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Treasury Management</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <button 
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100"
                onClick={() => toggleAccordion('commercial')}
              >
                <h3 className="text-lg font-semibold">Commercial Banking</h3>
                <span className="material-symbols-outlined">
                  {isAccordionOpen.commercial ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              
              {isAccordionOpen.commercial && (
                <div className="p-4 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Corporate Banking</h4>
                      <ul className="space-y-1">
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Corporate Accounts</a></li>
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Treasury Management</a></li>
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Global Banking</a></li>
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Investment Banking</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Commercial Financing</h4>
                      <ul className="space-y-1">
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Commercial Lending</a></li>
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Asset-Based Lending</a></li>
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Equipment Financing</a></li>
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Real Estate Capital</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Industry Expertise</h4>
                      <ul className="space-y-1">
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Healthcare</a></li>
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Technology</a></li>
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Food & Agriculture</a></li>
                        <li><a href="#" className="text-wf-red hover:text-wf-dark-red">Government & Institutions</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
