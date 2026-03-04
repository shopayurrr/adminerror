import React from 'react';

interface AlertBannerProps {
  message?: string;
}

export function AlertBanner({ message = "You're viewing a secure area. Please ensure you sign off when finished." }: AlertBannerProps) {
  return (
    <div className="bg-wf-red text-white py-2 relative">
      <div className="container mx-auto px-4 flex items-center">
        <span className="material-symbols-outlined me-2">info</span>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}
