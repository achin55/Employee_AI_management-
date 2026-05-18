import React from 'react';
import { InboxIcon } from 'lucide-react';

export const EmptyState = ({ title = 'No data found', message = 'Try adjusting your filters' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 text-center">
      <InboxIcon size={48} className="text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-600 mb-2">{title}</h3>
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default EmptyState;
