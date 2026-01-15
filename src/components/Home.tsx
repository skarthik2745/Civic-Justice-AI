import { useState, useEffect } from 'react';
import { Scale, Shield, Users, BookOpen, AlertCircle, Info, Sparkles } from 'lucide-react';
import { GrokService } from '../services/grokService';

interface HomeProps {
  onNavigate: (tab: string) => void;
  grokService?: GrokService;
}

export default function Home({ onNavigate, grokService }: HomeProps) {
  const [welcomeContent, setWelcomeContent] = useState<string>('');
  const [loadingWelcome, setLoadingWelcome] = useState(false);

  useEffect(() => {
    if (grokService) {
      loadWelcomeContent();
    }
  }, [grokService]);

  const loadWelcomeContent = async () => {
    if (!grokService) return;
    
    setLoadingWelcome(true);
    try {
      const content = await grokService.getWelcomeContent();
      setWelcomeContent(content);
    } catch (error) {
      console.error('Failed to load welcome content:', error);
    } finally {
      setLoadingWelcome(false);
    }
  };
  const features = [
    {
      icon: Scale,
      title: 'Legal Guidance',
      description: 'Understand legal procedures and your rights in simple language',
      tab: 'legal'
    },
    {
      icon: AlertCircle,
      title: 'Civic Issue Reporting',
      description: 'Report civic issues and get guidance on proper channels',
      tab: 'civic'
    },
    {
      icon: Shield,
      title: 'Complaint Guidance',
      description: 'Learn how to proceed with complaints and escalations',
      tab: 'complaint'
    },
    {
      icon: BookOpen,
      title: 'Awareness & Rights',
      description: 'Educate yourself about civic responsibilities and basic rights',
      tab: 'awareness'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Users className="w-16 h-16 text-[#38bdf8]" />
          </div>
          <h1 className="text-5xl font-bold text-[#e5e7eb] mb-4">
            Civic Justice AI
          </h1>
          <p className="text-xl text-[#38bdf8] font-semibold mb-2">
            Empowering Citizens. Strengthening Institutions.
          </p>
          <p className="text-lg text-[#94a3b8] mb-6 max-w-3xl mx-auto">
            AI-powered civic awareness and responsible issue reporting for sustainable cities and justice.
          </p>
          
          {grokService && (
            <div className="bg-[#1e293b] border border-[#38bdf8] rounded-lg p-6 mb-6 max-w-2xl mx-auto">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-[#38bdf8] flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="text-[#38bdf8] font-semibold mb-2">Today's Civic Awareness</h3>
                  {loadingWelcome ? (
                    <div className="text-[#94a3b8] animate-pulse">Loading personalized content...</div>
                  ) : welcomeContent ? (
                    <p className="text-[#e5e7eb] leading-relaxed">{welcomeContent}</p>
                  ) : (
                    <p className="text-[#94a3b8]">Welcome! Explore our platform to learn about your civic rights and responsibilities.</p>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="inline-block bg-[#1e293b] border border-[#38bdf8] rounded-lg px-6 py-3">
            <p className="text-[#38bdf8] text-sm font-medium">
              ✓ Privacy-First Design • ✓ Responsible AI • ✓ SDG 11 & 16 Aligned
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature) => (
            <button
              key={feature.tab}
              onClick={() => onNavigate(feature.tab)}
              className="bg-[#1e293b] rounded-xl p-8 hover:bg-[#334155] transition-all duration-300 shadow-lg hover:shadow-xl border border-[#334155] hover:border-[#38bdf8] text-left group"
            >
              <feature.icon className="w-12 h-12 text-[#38bdf8] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-[#e5e7eb] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#94a3b8]">{feature.description}</p>
            </button>
          ))}
        </div>

        <div className="bg-[#1e293b] rounded-xl p-8 border border-[#334155]">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-[#f59e0b] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-[#e5e7eb] mb-2">
                Important Notice
              </h3>
              <p className="text-[#94a3b8] leading-relaxed">
                Civic Justice AI provides informational guidance only. We do not provide legal advice,
                represent any authority, or make legal decisions. All suggestions encourage lawful,
                peaceful, and ethical civic engagement. This platform serves as a bridge between
                citizens and institutions while maintaining privacy-first principles.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('about')}
            className="text-[#38bdf8] hover:text-[#22c55e] transition-colors duration-200 font-medium"
          >
            Learn more about our mission and ethics →
          </button>
        </div>
      </div>
    </div>
  );
}
