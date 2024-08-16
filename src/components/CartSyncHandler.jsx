
'use client';

import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';

export function CartSyncHandler() {
  const { isSignedIn, user } = useAuth();

  useEffect(() => {
    const syncCart = async () => {
      if (isSignedIn && user) {
        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        
        if (cartItems.length > 0) {
          try {
            const response = await fetch('/api/sync-cart', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId: user.id,
                cartItems: cartItems
              }),
            });

            if (response.ok) {
              localStorage.removeItem('cart');
              console.log('Cart synced successfully');
            } else {
              console.error('Failed to sync cart');
            }
          } catch (error) {
            console.error('Error syncing cart:', error);
          }
        }
      }
    };

    syncCart();
  }, [isSignedIn, user]);

  return null; // This component doesn't render anything
}