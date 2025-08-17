import React from 'react';
import { Header, Sidebar, MainContent } from './components/layout';
import { NotificationContainer, ScrollToTop } from './components/ui';

function App() {
  return (
    <div className="min-h-screen bg-gray-300">
      <div 
        className="bg-gray-50 min-h-screen shadow-2xl"
        style={{ 
          maxWidth: '1600px', 
          margin: '0 auto',
          width: '100%'
        }}
      >
        <Header />
        <div className="flex min-h-screen">
          <Sidebar />
          <MainContent />
        </div>
      </div>
      <NotificationContainer />
      <ScrollToTop />
    </div>
  );
}

export default App;
