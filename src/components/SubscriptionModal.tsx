import React from 'react';
import { X } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Upgrade Required</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-4">
          <p className="text-gray-300">
            File analysis is available with our premium subscription. Upgrade now to unlock:
          </p>
          <ul className="mt-4 space-y-2 text-gray-300">
            <li className="flex items-center">
              • Document and PDF analysis
            </li>
            <li className="flex items-center">
              • Batch processing
            </li>
            <li className="flex items-center">
              • Priority support
            </li>
          </ul>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            Maybe Later
          </button>
          <button
            onClick={onClose}
            className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}