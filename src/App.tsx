import { useState, useEffect } from 'react';
import { Scale, AlertCircle, Shield, BookOpen, Info, Home as HomeIcon, Camera } from 'lucide-react';
import { GrokService } from './services/grokService';
import { validateEnv } from './config/env';
import Home from './components/Home';
import LegalGuidance from './components/LegalGuidance';
import CivicReporting from './components/CivicReporting';
import ComplaintGuidance from './components/ComplaintGuidance';
import AwarenessRights from './components/AwarenessRights';
import CivicLens from './components/CivicLens';
import About from './components/About';
import { TabType } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [grokService, setGrokService] = useState<GrokService | null>(null);
  const [apiKeyError, setApiKeyError] = useState(false);

  useEffect(() => {
    const envValid = validateEnv();
    if (envValid) {
      setGrokService(new GrokService());
      setApiKeyError(false);
    } else {
      setApiKeyError(true);
    }
  }, []);

  const tabs = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'legal', label: 'Legal Guidance', icon: Scale },
    { id: 'civic', label: 'Civic Reporting', icon: AlertCircle },
    { id: 'complaint', label: 'Complaint Guidance', icon: Shield },
    { id: 'awareness', label: 'Awareness & Rights', icon: BookOpen },
    { id: 'civiclens', label: 'Civic Lens', icon: Camera },
    { id: 'about', label: 'About', icon: Info }
  ];

  const renderContent = () => {
    if (apiKeyError) {
      return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
          <div className="bg-[#1e293b] rounded-xl p-8 max-w-2xl border border-[#f59e0b]">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-[#f59e0b] flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-[#e5e7eb] mb-2">
                  API Configuration Required
                </h2>
                <p className="text-[#94a3b8] mb-4">
                  To use the AI-powered features, you need to configure your API keys.
                </p>
                <div className="bg-[#0f172a] rounded-lg p-4 mb-4">
                  <p className="text-[#e5e7eb] text-sm mb-2 font-medium">Setup Instructions:</p>
                  <ol className="text-[#94a3b8] text-sm space-y-1 list-decimal list-inside">
                    <li>Get your Groq API key from console.groq.com</li>
                    <li>Get your Supabase URL and anon key from your Supabase project</li>
                    <li>Create a .env file in the project root</li>
                    <li>Add the required environment variables (see .env.example)</li>
                    <li>Restart the development server</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'home':
        return <Home onNavigate={(tab) => setActiveTab(tab as TabType)} grokService={grokService || undefined} />;
      case 'legal':
        return grokService ? <LegalGuidance grokService={grokService} /> : null;
      case 'civic':
        return grokService ? <CivicReporting grokService={grokService} /> : null;
      case 'complaint':
        return grokService ? <ComplaintGuidance grokService={grokService} /> : null;
      case 'awareness':
        return grokService ? <AwarenessRights grokService={grokService} /> : null;
      case 'civiclens':
        return grokService ? <CivicLens grokService={grokService} /> : null;
      case 'about':
        return <About />;
      default:
        return <Home onNavigate={(tab) => setActiveTab(tab as TabType)} grokService={grokService || undefined} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <nav className="bg-[#1e293b] border-b border-[#334155] sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-[#38bdf8] p-2 rounded-lg">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <button
                onClick={() => setActiveTab('home')}
                className="text-xl font-bold text-[#38bdf8] hover:text-[#0ea5e9] transition-colors cursor-pointer"
              >
                Civic Justice AI
              </button>
            </div>
            <div className="hidden md:flex items-center gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                      activeTab === tab.id
                        ? 'bg-[#38bdf8] text-white shadow-md'
                        : 'text-[#94a3b8] hover:text-[#e5e7eb] hover:bg-[#334155]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden xl:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="md:hidden">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as TabType)}
                className="bg-[#0f172a] text-[#e5e7eb] border border-[#334155] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#38bdf8]"
              >
                {tabs.map((tab) => (
                  <option key={tab.id} value={tab.id}>
                    {tab.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </nav>
      {renderContent()}
    </div>
  );
}

export default App;
