import { useState } from 'react';
import { Camera, Upload, Send, Loader2, MapPin, Shield } from 'lucide-react';
import { GrokService } from '../services/grokService';
import OfficialConnect from './OfficialConnect';

interface CivicLensProps {
  grokService: GrokService;
}

interface Complaint {
  id: string;
  image: string;
  title: string;
  description: string;
  location: string;
  category: string;
  authority: string;
  status: string;
}

export default function CivicLens({ grokService }: CivicLensProps) {
  const [image, setImage] = useState<string>('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [authority, setAuthority] = useState('');
  const [customAuthority, setCustomAuthority] = useState('');
  const [loading, setLoading] = useState(false);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [showOfficialConnect, setShowOfficialConnect] = useState(false);
  const [selectedOfficial, setSelectedOfficial] = useState<any>(null);

  const categories = [
    { value: 'garbage', label: 'Garbage Dumping', color: 'border-green-500' },
    { value: 'drainage', label: 'Open Drainage', color: 'border-blue-500' },
    { value: 'roads', label: 'Damaged Roads', color: 'border-yellow-500' },
    { value: 'streetlight', label: 'Broken Streetlights', color: 'border-yellow-500' },
    { value: 'water', label: 'Water Leakage', color: 'border-blue-500' },
    { value: 'safety', label: 'Public Safety Hazard', color: 'border-red-500' }
  ];

  const authorities = [
    'Municipal Corporation',
    'Panchayat Office',
    'Sanitation Department',
    'Water Board',
    'Electricity Board',
    'Local Civic Body',
    'Public Works Department',
    'Other'
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAISuggestion = async () => {
    if (!description || !location) return;

    setLoading(true);
    try {
      const systemPrompt = `You are a civic issue assistant analyzing complaints to suggest appropriate authorities.

Rules:
- Analyze the issue description and location
- Suggest the most appropriate authority/department
- Suggest issue category if not selected
- Be brief and direct
- Format: "Suggested Authority: [name] | Category: [type] | Reason: [brief explanation]"

Location: ${location}`;

      const result = await grokService.sendMessage(systemPrompt, `Issue: ${description}`);
      setAiSuggestion(result);
    } catch (error) {
      setAiSuggestion('Unable to generate suggestion. Please select manually.');
    } finally {
      setLoading(false);
    }
  };

  const handleReportToOfficial = (official: any) => {
    setSelectedOfficial(official);
    setAuthority(official.department);
    setShowOfficialConnect(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image || !description || !location || !authority) return;

    const newComplaint: Complaint = {
      id: Date.now().toString(),
      image,
      title: categories.find(c => c.value === category)?.label || 'Civic Issue',
      description,
      location,
      category: category || 'general',
      authority: authority === 'Other' ? customAuthority : authority,
      status: 'Submitted'
    };

    setComplaints([newComplaint, ...complaints]);
    
    // Reset form
    setImage('');
    setDescription('');
    setLocation('');
    setCategory('');
    setAuthority('');
    setCustomAuthority('');
    setAiSuggestion('');
  };

  const getCategoryColor = (cat: string) => {
    return categories.find(c => c.value === cat)?.color || 'border-gray-500';
  };

  return (
    <div className="min-h-screen bg-[#0f172a] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Camera className="w-12 h-12 text-[#38bdf8] mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-[#e5e7eb] mb-2">Civic Lens</h1>
          <p className="text-[#38bdf8] font-medium mb-2">
            See Issues. Report Responsibly.
          </p>
          <p className="text-[#94a3b8] text-lg">
            AI-powered visual issue reporting with direct official connections for sustainable urban development.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setShowOfficialConnect(false)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                !showOfficialConnect ? 'bg-[#38bdf8] text-white' : 'bg-[#334155] text-[#94a3b8] hover:bg-[#475569]'
              }`}
            >
              Report Issue
            </button>
            <button
              onClick={() => setShowOfficialConnect(true)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                showOfficialConnect ? 'bg-[#38bdf8] text-white' : 'bg-[#334155] text-[#94a3b8] hover:bg-[#475569]'
              }`}
            >
              Official Connect
            </button>
          </div>
        </div>

        <div className="bg-[#1e293b] rounded-xl p-6 shadow-lg border border-[#38bdf8] mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-[#22c55e]" />
            <p className="text-[#22c55e] font-semibold">
              Your identity is protected. This platform values citizen safety.
            </p>
          </div>
        </div>

        <div className="bg-[#1e293b] rounded-xl p-8 shadow-lg border border-[#334155] mb-8">
          {showOfficialConnect ? (
            <OfficialConnect onReportToOfficial={handleReportToOfficial} />
          ) : (
            <>
              <h3 className="text-[#38bdf8] font-bold text-xl mb-6">Report Civic Issue</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#e5e7eb] font-medium mb-3">
                Upload Image (Required)
              </label>
              <div className="border-2 border-dashed border-[#334155] rounded-lg p-8 text-center hover:border-[#38bdf8] transition-colors">
                {image ? (
                  <div className="relative">
                    <img src={image} alt="Issue" className="max-h-64 mx-auto rounded-lg" />
                    <button
                      type="button"
                      onClick={() => setImage('')}
                      className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <Upload className="w-12 h-12 text-[#94a3b8] mx-auto mb-3" />
                    <p className="text-[#94a3b8] mb-2">Click to upload image</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[#e5e7eb] font-medium mb-2">
                Issue Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#0f172a] text-[#e5e7eb] border border-[#334155] rounded-lg px-4 py-3 focus:outline-none focus:border-[#38bdf8] transition-colors"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#e5e7eb] font-medium mb-2">
                Issue Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the civic issue in detail..."
                className="w-full bg-[#0f172a] text-[#e5e7eb] border border-[#334155] rounded-lg px-4 py-3 focus:outline-none focus:border-[#38bdf8] transition-colors resize-none h-32"
                required
              />
            </div>

            <div>
              <label className="block text-[#e5e7eb] font-medium mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location (Area/City/State)
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Sector 12, Chandigarh, Punjab"
                className="w-full bg-[#0f172a] text-[#e5e7eb] border border-[#334155] rounded-lg px-4 py-3 focus:outline-none focus:border-[#38bdf8] transition-colors"
                required
              />
            </div>

            {description && location && (
              <button
                type="button"
                onClick={handleAISuggestion}
                disabled={loading}
                className="w-full bg-[#22c55e] hover:bg-[#16a34a] disabled:bg-[#334155] text-white font-medium py-3 rounded-lg transition-colors duration-200"
              >
                {loading ? 'Analyzing...' : '🤖 Get AI Authority Suggestion'}
              </button>
            )}

            {aiSuggestion && (
              <div className="bg-[#0f172a] rounded-lg p-4 border border-[#22c55e]">
                <p className="text-[#22c55e] font-semibold mb-2">AI Suggestion:</p>
                <p className="text-[#94a3b8] text-sm">{aiSuggestion}</p>
              </div>
            )}

            <div>
              <label className="block text-[#e5e7eb] font-medium mb-2">
                Select Authority/Department
              </label>
              <select
                value={authority}
                onChange={(e) => setAuthority(e.target.value)}
                className="w-full bg-[#0f172a] text-[#e5e7eb] border border-[#334155] rounded-lg px-4 py-3 focus:outline-none focus:border-[#38bdf8] transition-colors"
                required
              >
                <option value="">Select authority</option>
                {authorities.map((auth) => (
                  <option key={auth} value={auth}>
                    {auth}
                  </option>
                ))}
              </select>
              {authority === 'Other' && (
                <input
                  type="text"
                  value={customAuthority}
                  onChange={(e) => setCustomAuthority(e.target.value)}
                  placeholder="Please specify the authority"
                  className="w-full bg-[#0f172a] text-[#e5e7eb] border border-[#334155] rounded-lg px-4 py-3 focus:outline-none focus:border-[#38bdf8] transition-colors mt-3"
                  required
                />
              )}
            </div>

            <button
              type="submit"
              disabled={!image || !description || !location || !authority || (authority === 'Other' && !customAuthority)}
              className="w-full bg-[#38bdf8] hover:bg-[#0ea5e9] disabled:bg-[#334155] text-white font-medium py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Submit Complaint
            </button>
              </form>
            </>
          )}
        </div>

        {complaints.length > 0 && (
          <div>
            <h3 className="text-[#e5e7eb] font-bold text-2xl mb-6">Reported Issues</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {complaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className={`bg-[#1e293b] rounded-xl overflow-hidden shadow-lg border-2 ${getCategoryColor(complaint.category)}`}
                >
                  <img
                    src={complaint.image}
                    alt={complaint.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-[#e5e7eb] font-bold text-lg">{complaint.title}</h4>
                      <span className="bg-[#38bdf8] text-white text-xs px-3 py-1 rounded-full">
                        {complaint.status}
                      </span>
                    </div>
                    <p className="text-[#94a3b8] text-sm mb-3">{complaint.description}</p>
                    <div className="space-y-2 text-sm">
                      <p className="text-[#94a3b8]">
                        <span className="text-[#e5e7eb] font-semibold">Location:</span> {complaint.location}
                      </p>
                      <p className="text-[#94a3b8]">
                        <span className="text-[#e5e7eb] font-semibold">Department:</span> {complaint.authority}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
