import React from 'react';
import { ClerkProvider, SignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { Flag } from 'lucide-react';
import { Chat } from './components/Chat';

// Replace this with your actual Clerk publishable key
const CLERK_PUBLISHABLE_KEY = process.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_••••••••••••••••••••••••••••••••••';

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key');
}

function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <SignedOut>
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-md">
              <div className="mb-8 text-center">
                <Flag className="mx-auto h-12 w-12 text-red-500" />
                <h1 className="mt-4 text-3xl font-bold text-white">Red Flag Finder</h1>
                <p className="mt-2 text-gray-400">Sign in to start analyzing</p>
              </div>
              <SignIn />
            </div>
          </div>
        </SignedOut>
        
        <SignedIn>
          <Chat />
        </SignedIn>
      </div>
    </ClerkProvider>
  );
}

export default App;