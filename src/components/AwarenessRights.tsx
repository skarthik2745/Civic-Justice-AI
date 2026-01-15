import { useState } from 'react';
import { BookOpen, Send, Loader2 } from 'lucide-react';
import { GrokService } from '../services/grokService';
import { awarenessQueriesService } from '../services/databaseService';
import { AwarenessQuery } from '../types';

interface AwarenessRightsProps {
  grokService: GrokService;
}

export default function AwarenessRights({ grokService }: AwarenessRightsProps) {
  const [topic, setTopic] = useState('fundamental-rights');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const topics = [
    { value: 'fundamental-rights', label: 'Fundamental Rights' },
    { value: 'civic-duties', label: 'Civic Duties & Responsibilities' },
    { value: 'government-services', label: 'Government Services' },
    { value: 'public-participation', label: 'Public Participation' },
    { value: 'institutional-roles', label: 'Institutional Roles' },
    { value: 'grievance-redressal', label: 'Grievance Redressal Systems' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      // Save to database
      const queryData: Omit<AwarenessQuery, 'id'> = {
        topic,
        query: question || `General information about ${topic}`,
        user_type: 'General'
      };
      
      const { data, error } = await awarenessQueriesService.create(queryData);
      
      const result = await grokService.getAwarenessInfo(topic, question);
      
      if (data && !error) {
        setResponse(result + '\n\n✅ Your awareness query has been recorded with ID: ' + data[0].id);
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
          <BookOpen className="w-12 h-12 text-[#38bdf8] mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-[#e5e7eb] mb-2">Awareness & Rights</h1>
          <p className="text-[#38bdf8] font-medium mb-2">
            Learn Rights. Embrace Responsibilities.
          </p>
          <p className="text-[#94a3b8]">
            AI-powered civic education on fundamental rights, duties, and institutional roles for informed citizenship.
          </p>
        </div>

        <div className="bg-[#1e293b] rounded-xl p-8 shadow-lg border border-[#334155] mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#e5e7eb] font-medium mb-2">
                Select Topic
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-[#0f172a] text-[#e5e7eb] border border-[#334155] rounded-lg px-4 py-3 focus:outline-none focus:border-[#38bdf8] transition-colors"
              >
                {topics.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#e5e7eb] font-medium mb-2">
                Specific Question (Optional)
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a specific question about this topic, or leave blank for general information..."
                className="w-full bg-[#0f172a] text-[#e5e7eb] border border-[#334155] rounded-lg px-4 py-3 focus:outline-none focus:border-[#38bdf8] transition-colors resize-none h-24"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#38bdf8] hover:bg-[#0ea5e9] disabled:bg-[#334155] text-white font-medium py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Learn More
                </>
              )}
            </button>
          </form>
        </div>

        {response && (
          <div className="bg-[#1e293b] rounded-xl p-8 shadow-lg border border-[#22c55e]">
            <h3 className="text-[#22c55e] font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Educational Content
            </h3>
            <div className="text-[#e5e7eb] leading-relaxed whitespace-pre-wrap">
              {response}
            </div>
            <div className="mt-6 pt-6 border-t border-[#334155]">
              <div className="bg-[#0f172a] rounded-lg p-4">
                <h4 className="text-[#38bdf8] font-medium mb-2">Remember:</h4>
                <p className="text-[#94a3b8] text-sm">
                  With rights come responsibilities. Civic engagement should always be peaceful,
                  lawful, and respectful. Active and informed participation strengthens democracy
                  and improves communities.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-[#1e293b] rounded-xl p-8 border border-[#334155]">
            <h3 className="text-[#38bdf8] font-bold text-lg mb-4">Fundamental Rights (India)</h3>
            <ul className="text-[#94a3b8] space-y-3 text-base leading-relaxed">
              <li>• Right to Equality (Articles 14-18)</li>
              <li>• Right to Freedom (Articles 19-22)</li>
              <li>• Right against Exploitation (Articles 23-24)</li>
              <li>• Right to Freedom of Religion (Articles 25-28)</li>
              <li>• Cultural and Educational Rights (Articles 29-30)</li>
              <li>• Right to Constitutional Remedies (Article 32)</li>
            </ul>
          </div>

          <div className="bg-[#1e293b] rounded-xl p-8 border border-[#334155]">
            <h3 className="text-[#38bdf8] font-bold text-lg mb-4">Fundamental Duties</h3>
            <ul className="text-[#94a3b8] space-y-3 text-base leading-relaxed">
              <li>• Respect Constitution and National Symbols</li>
              <li>• Protect sovereignty and integrity of India</li>
              <li>• Promote harmony and brotherhood</li>
              <li>• Preserve cultural heritage</li>
              <li>• Protect environment and wildlife</li>
              <li>• Develop scientific temper</li>
            </ul>
          </div>

          <div className="bg-[#1e293b] rounded-xl p-8 border border-[#334155]">
            <h3 className="text-[#38bdf8] font-bold text-lg mb-4">Consumer Rights</h3>
            <ul className="text-[#94a3b8] space-y-3 text-base leading-relaxed">
              <li>• Right to Safety</li>
              <li>• Right to be Informed</li>
              <li>• Right to Choose</li>
              <li>• Right to be Heard</li>
              <li>• Right to Seek Redressal</li>
              <li>• Right to Consumer Education</li>
            </ul>
          </div>

          <div className="bg-[#1e293b] rounded-xl p-8 border border-[#334155]">
            <h3 className="text-[#38bdf8] font-bold text-lg mb-4">Right to Information (RTI)</h3>
            <div className="text-[#94a3b8] space-y-3 text-base leading-relaxed">
              <p>• Access government information</p>
              <p>• File RTI application for ₹10</p>
              <p>• Response within 30 days</p>
              <p>• Appeal if denied</p>
              <p>• Promotes transparency and accountability</p>
            </div>
          </div>

          <div className="bg-[#1e293b] rounded-xl p-8 border border-[#334155]">
            <h3 className="text-[#38bdf8] font-bold text-lg mb-4">Women's Rights</h3>
            <ul className="text-[#94a3b8] space-y-3 text-base leading-relaxed">
              <li>• Equal pay for equal work</li>
              <li>• Protection from domestic violence</li>
              <li>• Right to property</li>
              <li>• Maternity benefits</li>
              <li>• Protection from harassment at workplace</li>
              <li>• Right to education</li>
            </ul>
          </div>

          <div className="bg-[#1e293b] rounded-xl p-8 border border-[#334155]">
            <h3 className="text-[#38bdf8] font-bold text-lg mb-4">Legal Rights</h3>
            <ul className="text-[#94a3b8] space-y-3 text-base leading-relaxed">
              <li>• Right to legal representation</li>
              <li>• Right to fair trial</li>
              <li>• Right to bail (in bailable offenses)</li>
              <li>• Right to remain silent</li>
              <li>• Protection from self-incrimination</li>
              <li>• Free legal aid for poor</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
