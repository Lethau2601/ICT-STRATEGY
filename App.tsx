
import React, { useState } from 'react';
import Layout from './components/Layout';
import SignalLab from './pages/SignalLab';
import StrategyHub from './pages/StrategyHub';
import History from './pages/History';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('signals');

  const renderContent = () => {
    switch (activeTab) {
      case 'signals':
        return <SignalLab />;
      case 'strategy':
        return <StrategyHub />;
      case 'history':
        return <History />;
      default:
        return <SignalLab />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="animate-in fade-in duration-500">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
