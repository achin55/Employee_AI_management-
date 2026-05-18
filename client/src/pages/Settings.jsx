import React from 'react';
import MainLayout from '../layouts/MainLayout';

export const Settings = () => {
  return (
    <MainLayout>
      <div className="space-y-6 fade-in">
        <h1 className="text-3xl font-bold">Settings</h1>

        <div className="card">
          <h3 className="text-lg font-bold mb-4">Application Settings</h3>
          <p className="text-gray-600">Settings features coming soon...</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
