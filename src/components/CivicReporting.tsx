import { useState } from 'react';
import { AlertCircle, Send, Loader2, MapPin } from 'lucide-react';
import { GrokService } from '../services/grokService';
import { civicIssuesService } from '../services/databaseService';
import { CivicIssue } from '../types';

interface CivicReportingProps {
  grokService: GrokService;
}

export default function CivicReporting({ grokService }: CivicReportingProps) {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [authority, setAuthority] = useState('');
  const [customAuthority, setCustomAuthority] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: '', label: 'Auto-detect' },
    { value: 'water', label: 'Water Supply' },
    { value: 'electricity', label: 'Electricity' },
    { value: 'roads', label: 'Roads & Infrastructure' },
    { value: 'sanitation', label: 'Sanitation & Waste' },
    { value: 'public-safety', label: 'Public Safety' },
    { value: 'pollution', label: 'Pollution' },
    { value: 'other', label: 'Other' }
  ];

  const authorities = [
    { value: '', label: 'Select Authority' },
    { value: 'municipal', label: 'Municipal Corporation' },
    { value: 'water-board', label: 'Water Board' },
    { value: 'electricity-board', label: 'Electricity Board' },
    { value: 'traffic-police', label: 'Traffic Police' },
    { value: 'pollution-board', label: 'Pollution Board' },
    { value: 'other', label: 'Other (specify)' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    try {
      // Save to database
      const issueData: Omit<CivicIssue, 'id'> = {
        title: description.substring(0, 100) + (description.length > 100 ? '...' : ''),
        description,
        location: location || 'Not specified',
        category: category || 'Other',
        authority: authority === 'other' ? customAuthority : authority || 'Municipal Corporation'
      };
      
      const { data, error } = await civicIssuesService.create(issueData);
      
      if (data && !error) {
        const result = await grokService.categorizeCivicIssue(description, location);
        setResponse(result + '\n\n✅ Your issue has been recorded with ID: ' + data[0].id);
      } else {
        const result = await grokService.categorizeCivicIssue(description, location);
        setResponse(result);
      }
    } catch (error) {
      setResponse('Unable to process your report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <AlertCircle className="w-12 h-12 text-[#38bdf8] mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-[#e5e7eb] mb-2">Civic Issue Reporting</h1>
          <p className="text-[#38bdf8] font-medium mb-2">
            Report Responsibly. Drive Change.
          </p>
          <p className="text-[#94a3b8]">
            AI-guided civic issue reporting to connect you with the right authorities for effective resolution.
          </p>
        </div>

        <div className="bg-[#1e293b] rounded-xl p-8 shadow-lg border border-[#334155] mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#e5e7eb] font-medium mb-2">
                Issue Category
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
              <label className="block text-[#e5e7eb] font-medium mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location (Optional)
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Sector 12, Chandigarh"
                className="w-full bg-[#0f172a] text-[#e5e7eb] border border-[#334155] rounded-lg px-4 py-3 focus:outline-none focus:border-[#38bdf8] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#e5e7eb] font-medium mb-2">
                Responsible Authority
              </label>
              <select
                value={authority}
                onChange={(e) => setAuthority(e.target.value)}
                className="w-full bg-[#0f172a] text-[#e5e7eb] border border-[#334155] rounded-lg px-4 py-3 focus:outline-none focus:border-[#38bdf8] transition-colors"
              >
                {authorities.map((auth) => (
                  <option key={auth.value} value={auth.value}>
                    {auth.label}
                  </option>
                ))}
              </select>
              {authority === 'other' && (
                <input
                  type="text"
                  value={customAuthority}
                  onChange={(e) => setCustomAuthority(e.target.value)}
                  placeholder="Please specify the authority"
                  className="w-full bg-[#0f172a] text-[#e5e7eb] border border-[#334155] rounded-lg px-4 py-3 focus:outline-none focus:border-[#38bdf8] transition-colors mt-3"
                />
              )}
            </div>

            <div>
              <label className="block text-[#e5e7eb] font-medium mb-2">
                Describe the Issue
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the civic issue in detail..."
                className="w-full bg-[#0f172a] text-[#e5e7eb] border border-[#334155] rounded-lg px-4 py-3 focus:outline-none focus:border-[#38bdf8] transition-colors resize-none h-40"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !description.trim()}
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
                  Get Reporting Guidance
                </>
              )}
            </button>
          </form>
        </div>

        {response && (
          <div className="bg-[#1e293b] rounded-xl p-8 shadow-lg border border-[#22c55e] mb-6">
            <h3 className="text-[#22c55e] font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Reporting Guidance
            </h3>
            <div className="text-[#e5e7eb] leading-relaxed whitespace-pre-wrap">
              {response}
            </div>
            <div className="mt-6 pt-6 border-t border-[#334155]">
              <p className="text-[#94a3b8] text-sm">
                💡 Tip: Keep copies of all correspondence and follow up regularly on your complaint.
              </p>
            </div>
          </div>
        )}

        <div className="bg-[#1e293b] rounded-xl p-8 shadow-lg border border-[#38bdf8] mb-6">
          <h3 className="text-[#38bdf8] font-bold text-xl mb-6">📝 Reporting Guidelines</h3>
          <ul className="text-[#94a3b8] space-y-3 text-base leading-relaxed">
            <li>• Report civic issues politely and clearly</li>
            <li>• Always mention: exact location, nature of problem, duration</li>
            <li>• Avoid abusive language</li>
            <li>• Attach photos only if safe and legal</li>
            <li>• Follow up through official channels if unresolved</li>
            <li>• Keep complaint reference numbers for tracking</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#1e293b] rounded-xl p-8 border border-[#334155]">
            <h3 className="text-[#38bdf8] font-bold text-lg mb-4">Common Civic Issues</h3>
            <ul className="text-[#94a3b8] space-y-3 text-base leading-relaxed">
              <li>• Garbage accumulation</li>
              <li>• Road damage / potholes</li>
              <li>• Streetlight not working</li>
              <li>• Drainage overflow</li>
              <li>• Water supply issues</li>
              <li>• Noise pollution</li>
              <li>• Stray animal concerns</li>
              <li>• Illegal construction</li>
              <li>• Tree cutting/trimming needed</li>
              <li>• Public toilet maintenance</li>
            </ul>
          </div>

          <div className="bg-[#1e293b] rounded-xl p-8 border border-[#334155]">
            <h3 className="text-[#38bdf8] font-bold text-lg mb-4">Responsible Authorities</h3>
            <div className="text-[#94a3b8] space-y-3 text-base leading-relaxed">
              <p><span className="text-[#e5e7eb] font-semibold">Municipal Corporation:</span> Garbage, roads, streetlights</p>
              <p><span className="text-[#e5e7eb] font-semibold">Water Board:</span> Water supply, sewage</p>
              <p><span className="text-[#e5e7eb] font-semibold">Electricity Board:</span> Power supply issues</p>
              <p><span className="text-[#e5e7eb] font-semibold">Traffic Police:</span> Road safety, parking</p>
              <p><span className="text-[#e5e7eb] font-semibold">Pollution Board:</span> Air/water/noise pollution</p>
            </div>
          </div>

          <div className="bg-[#1e293b] rounded-xl p-8 border border-[#334155]">
            <h3 className="text-[#38bdf8] font-bold text-lg mb-4">What to Include</h3>
            <ul className="text-[#94a3b8] space-y-3 text-base leading-relaxed">
              <li>• Exact address/landmark</li>
              <li>• Clear description of issue</li>
              <li>• How long it's been happening</li>
              <li>• Impact on residents</li>
              <li>• Previous complaints (if any)</li>
              <li>• Your contact details</li>
            </ul>
          </div>

          <div className="bg-[#1e293b] rounded-xl p-8 border border-[#334155]">
            <h3 className="text-[#38bdf8] font-bold text-lg mb-4">Follow-up Tips</h3>
            <ul className="text-[#94a3b8] space-y-3 text-base leading-relaxed">
              <li>• Note complaint number and date</li>
              <li>• Follow up after 7-10 days</li>
              <li>• Escalate if no response in 30 days</li>
              <li>• Use RTI if needed</li>
              <li>• Contact local councillor/MLA</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
