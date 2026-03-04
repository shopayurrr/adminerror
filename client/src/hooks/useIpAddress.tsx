import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/queryClient';

export function useIpAddress() {
  const [ipAddress, setIpAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await apiRequest('GET', '/api/ip', undefined);
        const data = await response.json();
        
        if (data && data.ip) {
          setIpAddress(data.ip);
        } else {
          setError('Failed to fetch IP address');
        }
      } catch (err) {
        setError('Error fetching IP address');
        console.error('Error fetching IP address:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIpAddress();
  }, []);

  return { ipAddress, isLoading, error };
}
