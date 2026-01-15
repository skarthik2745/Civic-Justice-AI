import { useState } from 'react';
import { Scale, Send, Loader2 } from 'lucide-react';
import { GrokService } from '../services/grokService';
import { legalQueriesService } from '../services/databaseService';
import { LegalQuery } from '../types';

interface LegalGuidanceProps {
  grokService: GrokService;
}

export default function LegalGuidance({ grokService }: LegalGuidanceProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('general');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'police', label: 'Police & Law Enforcement' },
    { value: 'civic', label: 'Civic & Municipal' },
    { value: 'consumer', label: 'Consumer Rights' },
    { value: 'safety', label: 'Public Safety' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      // Save to database
      const queryData: Omit<LegalQuery, 'id'> = {
        query,
        category,
        urgency: 'Normal'
      };
      
      const { data, error } = await legalQueriesService.create(queryData);
      
      const result = await grokService.getLegalGuidance(query, category);
      
      if (data && !error) {
        setResponse(result + '\n\n✅ Your query has been recorded with ID: ' + data[0].id);
      } else {
        setResponse(result);
      }
    } catch (error) {
      setResponse('Unable to process your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Scale className="w-12 h-12 text-[#38bdf8] mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-[#e5e7eb] mb-2">Legal Guidance</h1>
          <p className="text-[#38bdf8] font-medium mb-2">
            Know Your Rights. Navigate Legal Procedures.
          </p>
          <p className="text-[#94a3b8]">
            AI-powered legal awareness to help you understand procedures, rights, and proper channels for justice.
          </p>
        </div>

        <div className="bg-[#1e293b] rounded-xl p-8 shadow-lg border border-[#334155] mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#e5e7eb] font-medium mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#0f172a] text-[#e5e7eb] border border-[#334155] rounded-lg px-4 py-3 focus:outline-none focus:border-[#38bdf8] transition-colors"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#e5e7eb] font-medium mb-2">
                Your Question
              </label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., What are my rights if stopped by police? How do I file an FIR?"
                className="w-full bg-[#0f172a] text-[#e5e7eb] border border-[#334155] rounded-lg px-4 py-3 focus:outline-none focus:border-[#38bdf8] transition-colors resize-none h-32"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="w-full bg-[#38bdf8] hover:bg-[#0ea5e9] disabled:bg-[#334155] text-white font-medium py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Get Guidance
                </>
              )}
            </button>
          </form>
        </div>

        {response && (
          <div className="bg-[#1e293b] rounded-xl p-8 shadow-lg border border-[#22c55e] mb-6">
            <h3 className="text-[#22c55e] font-semibold mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5" />
              Guidance Response
            </h3>
            <div className="text-[#e5e7eb] leading-relaxed whitespace-pre-wrap">
              {response}
            </div>
            <div className="mt-6 pt-6 border-t border-[#334155]">
              <p className="text-[#f59e0b] text-sm">
                ⚠️ This is informational guidance only. Not legal advice. Consult a qualified legal professional for your specific situation.
              </p>
            </div>
          </div>
        )}

        <div className="bg-[#1e293b] rounded-xl p-8 shadow-lg border border-[#f59e0b] mb-6">
          <h3 className="text-[#f59e0b] font-bold text-xl mb-6">⚠️ Important Information</h3>
          <ul className="text-[#94a3b8] space-y-3 text-base leading-relaxed">
            <li>• This platform provides general legal awareness only</li>
            <li>• It does not replace lawyers, police, courts, or government officials</li>
            <li>• Laws may vary based on state and situation</li>
            <li>• Always verify with official government sources</li>
            <li>• Never share sensitive personal details (Aadhaar, bank details, OTPs)</li>
            <li>• Emergency situations must be reported to official helplines immediately</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#1e293b] rounded-xl p-8 border border-[#334155]">
            <h3 className="text-[#38bdf8] font-bold text-lg mb-4">Types of Issues</h3>
            <div className="text-[#94a3b8] space-y-3 text-base leading-relaxed">
              <p><span className="text-[#e5e7eb] font-semibold">Civil:</span> Property disputes, contracts, family matters</p>
              <p><span className="text-[#e5e7eb] font-semibold">Criminal:</span> Theft, assault, fraud, serious offenses</p>
              <p><span className="text-[#e5e7eb] font-semibold">Civic/Municipal:</span> Local services, infrastructure, utilities</p>
            </div>
          </div>

          <div className="bg-[#1e293b] rounded-xl p-8 border border-[#334155]">
            <h3 className="text-[#38bdf8] font-bold text-lg mb-4">Your Basic Rights</h3>
            <ul className="text-[#94a3b8] space-y-3 text-base leading-relaxed">
              <li>• Right to file a complaint</li>
              <li>• Right to information (RTI Act)</li>
              <li>• Right to receive complaint number</li>
              <li>• Right to fair treatment</li>
              <li>• Right to legal representation</li>
            </ul>
          </div>

          <div className="bg-[#1e293b] rounded-xl p-8 border border-[#334155]">
            <h3 className="text-[#38bdf8] font-bold text-lg mb-4">Best Practices</h3>
            <ul className="text-[#94a3b8] space-y-3 text-base leading-relaxed">
              <li>• Always file written complaints</li>
              <li>• Keep copies and acknowledgements</li>
              <li>• Note dates, times, and reference numbers</li>
              <li>• Follow proper escalation channels</li>
              <li>• Maintain respectful communication</li>
            </ul>
          </div>

          <div className="bg-[#1e293b] rounded-xl p-8 border border-[#334155]">
            <h3 className="text-[#38bdf8] font-bold text-lg mb-4">Emergency Helplines</h3>
            <div className="text-[#94a3b8] space-y-3 text-base leading-relaxed">
              <p><span className="text-[#e5e7eb] font-semibold">Police:</span> 100</p>
              <p><span className="text-[#e5e7eb] font-semibold">Women Helpline:</span> 1091</p>
              <p><span className="text-[#e5e7eb] font-semibold">Child Helpline:</span> 1098</p>
              <p><span className="text-[#e5e7eb] font-semibold">Ambulance:</span> 102</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
