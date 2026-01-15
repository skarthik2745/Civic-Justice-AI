import { useState } from 'react';
import { Shield, Send, Loader2, Phone, Filter } from 'lucide-react';
import { GrokService } from '../services/grokService';
import { complaintGuidanceService } from '../services/databaseService';
import { ComplaintGuidance as ComplaintGuidanceType } from '../types';

interface ComplaintGuidanceProps {
  grokService: GrokService;
}

export default function ComplaintGuidance({ grokService }: ComplaintGuidanceProps) {
  const [question, setQuestion] = useState('');
  const [location, setLocation] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [generalQuestion, setGeneralQuestion] = useState('');
  const [issueType, setIssueType] = useState('general');
  const [generalResponse, setGeneralResponse] = useState('');
  const [generalLoading, setGeneralLoading] = useState(false);

  const issueTypes = [
    { value: 'general', label: 'General Query' },
    { value: 'escalation', label: 'Escalation Process' },
    { value: 'timeline', label: 'Timeline & Follow-up' },
    { value: 'documentation', label: 'Documentation Required' },
    { value: 'rights', label: 'Complainant Rights' }
  ];

  const contacts = {
    emergency: [
      { name: 'Police', number: '112', desc: 'Emergency police assistance' },
      { name: 'Ambulance', number: '108', desc: 'Medical emergency' },
      { name: 'Fire', number: '101', desc: 'Fire emergency' },
      { name: 'Disaster Management', number: '108 / 112', desc: 'Natural disasters' }
    ],
    police: [
      { name: 'Women Helpline', number: '181', desc: 'Women in distress' },
      { name: 'Cyber Crime', number: '1930', desc: 'Online fraud, cyber crimes' },
      { name: 'Child Helpline', number: '1098', desc: 'Child abuse, protection' },
      { name: 'Senior Citizen', number: '14567', desc: 'Elderly assistance' }
    ],
    civic: [
      { name: 'Swachh Bharat', number: '1969', desc: 'Cleanliness complaints' },
      { name: 'Municipal Corporation', number: 'Local', desc: 'Civic issues (varies by city)' },
      { name: 'Water Supply', number: 'State Jal Board', desc: 'Water issues (varies by state)' },
      { name: 'Electricity', number: 'State DISCOM', desc: 'Power issues (varies by state)' }
    ],
    consumer: [
      { name: 'Consumer Helpline', number: '1915', desc: 'Consumer complaints' },
      { name: 'Consumer WhatsApp', number: '8800001915', desc: 'WhatsApp support' },
      { name: 'CPGRAMS', number: 'Online Portal', desc: 'Central govt grievances' }
    ],
    social: [
      { name: 'Mental Health (Kiran)', number: '1800-599-0019', desc: 'Mental health support' },
      { name: 'Suicide Prevention', number: '91-22-27546669', desc: 'Crisis intervention' }
    ]
  };

  const categories = [
    { value: 'all', label: 'All Categories', icon: '📋' },
    { value: 'emergency', label: 'Emergency Services', icon: '🚨' },
    { value: 'police', label: 'Police & Law', icon: '👮' },
    { value: 'civic', label: 'Civic & Municipal', icon: '🏙️' },
    { value: 'consumer', label: 'Consumer & Grievances', icon: '🧾' },
    { value: 'social', label: 'Mental Health & Social', icon: '🧠' }
  ];

  const getFilteredContacts = () => {
    if (filterCategory === 'all') {
      return Object.entries(contacts).flatMap(([cat, items]) => 
        items.map(item => ({ ...item, category: cat }))
      );
    }
    return contacts[filterCategory as keyof typeof contacts].map(item => ({ ...item, category: filterCategory }));
  };

  const handleGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!generalQuestion.trim()) return;

    setGeneralLoading(true);
    try {
      // Save to database
      const guidanceData: Omit<ComplaintGuidanceType, 'id'> = {
        issue_type: issueType,
        description: generalQuestion,
        urgency: 'Normal'
      };
      
      const { data, error } = await complaintGuidanceService.create(guidanceData);
      
      const result = await grokService.getComplaintGuidance(generalQuestion, issueType);
      
      if (data && !error) {
        setGeneralResponse(result + '\n\n✅ Your guidance request has been recorded with ID: ' + data[0].id);
      } else {
        setGeneralResponse(result);
      }
    } catch (error) {
      setGeneralResponse('Unable to process your request. Please try again.');
    } finally {
      setGeneralLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    try {
      const systemPrompt = `You are a complaint guidance assistant helping citizens find appropriate contact numbers and departments.

Rules:
- Analyze the problem and identify if it's: Emergency, Civic, Legal, Consumer, or Social support
- Suggest relevant contact numbers from Indian helplines
- Adapt suggestions based on location if provided
- ALWAYS mention: "If this is urgent, contact emergency services immediately (112)"
- Use simple language
- Never give unofficial numbers
- Never claim authority
- Explain escalation process clearly

Location: ${location || 'Not specified'}`;
      
      const result = await grokService.sendMessage(systemPrompt, question);
      setResponse(result);
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
          <Shield className="w-12 h-12 text-[#38bdf8] mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-[#e5e7eb] mb-2">Complaint Guidance</h1>
          <p className="text-[#38bdf8] font-medium mb-2">
            Navigate Processes. Escalate Effectively.
          </p>
          <p className="text-[#94a3b8]">
            AI-powered guidance on complaint procedures, escalation paths, and connecting with the right authorities.
          </p>
        </div>

        <div className="bg-[#1e293b] rounded-xl p-8 shadow-lg border border-[#334155] mb-6">
          <h3 className="text-[#38bdf8] font-bold text-lg mb-4">General Complaint Guidance</h3>
          <form onSubmit={handleGeneralSubmit} className="space-y-6">
            <div>
              <label className="block text-[#e5e7eb] font-medium mb-2">
                Topic
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full bg-[#0f172a] text-[#e5e7eb] border border-[#334155] rounded-lg px-4 py-3 focus:outline-none focus:border-[#38bdf8] transition-colors"
              >
                {issueTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#e5e7eb] font-medium mb-2">
                Your Question
              </label>
              <textarea
                value={generalQuestion}
                onChange={(e) => setGeneralQuestion(e.target.value)}
                placeholder="e.g., How do I escalate if my complaint is not resolved? What documents should I keep?"
                className="w-full bg-[#0f172a] text-[#e5e7eb] border border-[#334155] rounded-lg px-4 py-3 focus:outline-none focus:border-[#38bdf8] transition-colors resize-none h-32"
              />
            </div>

            <button
              type="submit"
              disabled={generalLoading || !generalQuestion.trim()}
              className="w-full bg-[#38bdf8] hover:bg-[#0ea5e9] disabled:bg-[#334155] text-white font-medium py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {generalLoading ? (
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

        {generalResponse && (
          <div className="bg-[#1e293b] rounded-xl p-8 shadow-lg border border-[#22c55e] mb-6">
            <h3 className="text-[#22c55e] font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Complaint Process Guidance
            </h3>
            <div className="text-[#e5e7eb] leading-relaxed whitespace-pre-wrap">
              {generalResponse}
            </div>
            <div className="mt-6 pt-6 border-t border-[#334155]">
              <div className="bg-[#0f172a] rounded-lg p-4">
                <h4 className="text-[#38bdf8] font-medium mb-2">Key Reminders:</h4>
                <ul className="text-[#94a3b8] text-sm space-y-1">
                  <li>• Always keep written records of all communications</li>
                  <li>• Note complaint reference numbers and dates</li>
                  <li>• Follow up within reasonable timelines</li>
                  <li>• Escalate through proper channels if needed</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="bg-[#1e293b] rounded-xl p-8 shadow-lg border border-[#334155] mb-6">
          <h3 className="text-[#38bdf8] font-bold text-lg mb-4">AI Contact Finder</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#e5e7eb] font-medium mb-2">
                Describe Your Issue
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g., I need to file a noise pollution complaint in my area"
                className="w-full bg-[#0f172a] text-[#e5e7eb] border border-[#334155] rounded-lg px-4 py-3 focus:outline-none focus:border-[#38bdf8] transition-colors resize-none h-32"
              />
            </div>

            <div>
              <label className="block text-[#e5e7eb] font-medium mb-2">
                Your Location (City/State)
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Mumbai, Maharashtra"
                className="w-full bg-[#0f172a] text-[#e5e7eb] border border-[#334155] rounded-lg px-4 py-3 focus:outline-none focus:border-[#38bdf8] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !question.trim()}
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
                  Get Contact Suggestions
                </>
              )}
            </button>
          </form>
        </div>

        {response && (
          <div className="bg-[#1e293b] rounded-xl p-8 shadow-lg border border-[#22c55e] mb-6">
            <h3 className="text-[#22c55e] font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              AI Guidance & Suggestions
            </h3>
            <div className="text-[#e5e7eb] leading-relaxed whitespace-pre-wrap">
              {response}
            </div>
          </div>
        )}

        <div className="bg-[#ef4444] rounded-xl p-6 shadow-lg border border-[#dc2626] mb-6">
          <p className="text-white font-semibold text-center">
            ⚠️ AI suggestions are for guidance only. For emergencies, call official helplines directly. Final responsibility lies with you.
          </p>
        </div>

        <div className="bg-[#1e293b] rounded-xl p-8 shadow-lg border border-[#38bdf8] mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[#38bdf8] font-bold text-xl flex items-center gap-2">
              <Phone className="w-6 h-6" />
              Important Contact Numbers
            </h3>
            <Filter className="w-5 h-5 text-[#94a3b8]" />
          </div>

          <div className="mb-6">
            <label className="block text-[#e5e7eb] font-medium mb-3">Filter by Category</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setFilterCategory(cat.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filterCategory === cat.value
                      ? 'bg-[#38bdf8] text-white'
                      : 'bg-[#0f172a] text-[#94a3b8] hover:bg-[#334155]'
                  }`}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {getFilteredContacts().map((contact, idx) => (
              <div key={idx} className="bg-[#0f172a] rounded-lg p-4 border border-[#334155]">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-[#e5e7eb] font-semibold text-lg">{contact.name}</h4>
                    <p className="text-[#94a3b8] text-sm mt-1">{contact.desc}</p>
                  </div>
                  <div className="text-right">
                    <a href={`tel:${contact.number}`} className="text-[#38bdf8] font-bold text-xl hover:text-[#22c55e] transition-colors">
                      {contact.number}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
