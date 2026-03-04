import React from 'react';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About Wells Fargo</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Investor Relations</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">News</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Security Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Fraud Information</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Site Map</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Privacy & Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Privacy, Cookies, Security</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Online Access Agreement</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Additional Disclosures</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-700">
          <p className="text-sm text-gray-400 text-center">© {new Date().getFullYear()} Wells Fargo Bank, N.A. All rights reserved. Equal Housing Lender.</p>
        </div>
      </div>
    </footer>
  );
}
