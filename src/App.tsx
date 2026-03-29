import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DashboardPreview from './components/DashboardPreview';

export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-white font-sans">
      <Navbar />
      <main className="w-full flex flex-col items-center">
        <Hero />
        <DashboardPreview />
      </main>
    </div>
  );
}
