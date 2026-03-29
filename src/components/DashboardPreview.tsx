import React from 'react';

export default function DashboardPreview() {
  return (
    <section className="relative w-full pt-16 pb-32 flex flex-col items-center">
      {/* The gradient background */}
      <div className="absolute top-24 left-0 w-full h-[800px] mesh-gradient -z-10"></div>
      
      <div className="w-full max-w-6xl mx-auto px-4 flex flex-col items-center">
        {/* Tabs */}
        <div className="bg-white rounded-full p-1.5 shadow-sm flex items-center space-x-1 mb-10 z-10 border border-gray-100">
          <button className="bg-gray-100 text-gray-900 px-6 py-2 rounded-full text-sm font-medium">Dashboard</button>
          <button className="text-gray-500 hover:text-gray-900 px-6 py-2 rounded-full text-sm font-medium transition-colors">Profiles</button>
          <button className="text-gray-500 hover:text-gray-900 px-6 py-2 rounded-full text-sm font-medium transition-colors">Funnels</button>
          <button className="text-gray-500 hover:text-gray-900 px-6 py-2 rounded-full text-sm font-medium transition-colors">Performance</button>
          <button className="text-gray-500 hover:text-gray-900 px-6 py-2 rounded-full text-sm font-medium transition-colors">Realtime</button>
        </div>

        {/* Dashboard Mockup */}
        <div className="w-full bg-white rounded-t-3xl shadow-2xl overflow-hidden min-h-[600px] p-8 md:p-12 relative">
          {/* Mockup Header */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full border-[3px] border-gray-900 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-gray-900 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                <span className="text-sm font-medium text-gray-700">Endless</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 ml-1">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-inner"></div>
          </div>

          {/* Mockup Content */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm">
                <span className="text-sm font-medium text-gray-700">Today</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 ml-1">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="12" x2="20" y2="12"></line>
                  <line x1="4" y1="6" x2="20" y2="6"></line>
                  <line x1="4" y1="18" x2="20" y2="18"></line>
                </svg>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mb-16">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs font-medium text-gray-500">People</span>
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">2,369</div>
                <div className="text-xs font-medium text-red-500">-30%</div>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs font-medium text-gray-500">Revenue</span>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">$390</div>
                <div className="text-xs font-medium text-red-500">-32%</div>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs font-medium text-gray-500">Views</span>
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">9,102</div>
                <div className="text-xs font-medium text-red-500">-33%</div>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs font-medium text-gray-500">CR</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">100%</div>
                <div className="text-xs font-medium text-gray-400">0%</div>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs font-medium text-gray-500">Bounced</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">33.3%</div>
                <div className="text-xs font-medium text-green-500">+100%</div>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs font-medium text-gray-500">Duration</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">10m 53s</div>
                <div className="text-xs font-medium text-green-500">+252%</div>
              </div>
            </div>

            {/* Chart Placeholder Area */}
            <div className="w-full h-64 relative mt-12">
               {/* Decorative grid lines */}
               <div className="absolute top-0 left-0 w-full h-px bg-gray-100"></div>
               <div className="absolute top-1/2 left-0 w-full h-px bg-gray-50"></div>
               <div className="absolute bottom-0 left-0 w-full h-px bg-gray-100"></div>
               
               {/* Decorative nodes/points */}
               <div className="absolute bottom-4 left-0 w-6 h-6 bg-gray-900 rounded-md flex items-center justify-center text-white text-[10px]">
                 X
               </div>
               <div className="absolute bottom-12 left-1/2 w-6 h-6 bg-white border border-gray-200 shadow-sm rounded-full flex items-center justify-center text-gray-400">
                 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
               </div>
               <div className="absolute bottom-8 right-1/4 w-6 h-6 bg-white border border-gray-200 shadow-sm rounded-full flex items-center justify-center text-gray-400">
                 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
