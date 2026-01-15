import { useState, useEffect } from 'react';
import { User, Shield, Upload, Send, UserCheck } from 'lucide-react';
import { officialsService } from '../services/databaseService';
import { Official } from '../types';

interface OfficialConnectProps {
  onReportToOfficial: (official: Official) => void;
}

export default function OfficialConnect({ onReportToOfficial }: OfficialConnectProps) {
  const [showRegistration, setShowRegistration] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    department: '',
    jurisdiction: '',
    phone: '',
    email: '',
    description: '',
    idProof: ''
  });

  const [officials, setOfficials] = useState<Official[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOfficials();
  }, []);

  const loadOfficials = async () => {
    const { data, error } = await officialsService.getAll();
    if (data && !error) {
      setOfficials(data.filter(official => official.verified));
    }
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, idProof: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await officialsService.create({
      name: formData.name,
      designation: formData.designation,
      department: formData.department,
      jurisdiction: formData.jurisdiction,
      phone: formData.phone,
      email: formData.email,
      description: formData.description,
      id_proof_url: formData.idProof,
      verified: false
    });
    
    if (data && !error) {
      alert('Registration submitted for verification. You will be contacted within 3-5 business days.');
      setFormData({
        name: '',
        designation: '',
        department: '',
        jurisdiction: '',
        phone: '',
        email: '',
        description: '',
        idProof: ''
      });
      setShowRegistration(false);
    } else {
      alert('Error submitting registration. Please try again.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-[#1e293b] rounded-xl p-6 border border-[#38bdf8]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-[#38bdf8]" />
            <h3 className="text-[#38bdf8] font-bold text-xl">Verified Civic Officials</h3>
          </div>
          <button
            onClick={() => setShowRegistration(!showRegistration)}
            className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            {showRegistration ? 'View Officials' : 'Register as Official'}
          </button>
        </div>
        <p className="text-[#94a3b8] text-sm">
          Connect directly with verified government officials for faster issue resolution
        </p>
      </div>

      {showRegistration ? (
        <div className="bg-[#1e293b] rounded-xl p-8 border border-[#334155]">
          <h4 className="text-[#e5e7eb] font-bold text-lg mb-6">Official Registration</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full Name *"
                className="bg-[#0f172a] text-[#e5e7eb] border border-[#334155] rounded-lg px-4 py-3 focus:outline-none focus:border-[#38bdf8]"
                required
              />
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                placeholder="Official Designation *"
                className="bg-[#0f172a] text-[#e5e7eb] border border-[#334155] rounded-lg px-4 py-3 focus:outline-none focus:border-[#38bdf8]"
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="bg-[#0f172a] text-[#e5e7eb] border border-[#334155] rounded-lg px-4 py-3 focus:outline-none focus:border-[#38bdf8]"
                required
              >
                <option value="">Select Department *</option>
                <option value="Municipal Corporation">Municipal Corporation</option>
                <option value="Panchayat Office">Panchayat Office</option>
                <option value="Sanitation Department">Sanitation Department</option>
                <option value="Water Board">Water Board</option>
                <option value="Electricity Board">Electricity Board</option>
                <option value="Public Works Department">Public Works Department</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="text"
                name="jurisdiction"
                value={formData.jurisdiction}
                onChange={handleInputChange}
                placeholder="Jurisdiction Area *"
                className="bg-[#0f172a] text-[#e5e7eb] border border-[#334155] rounded-lg px-4 py-3 focus:outline-none focus:border-[#38bdf8]"
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Office Contact Number"
                className="bg-[#0f172a] text-[#e5e7eb] border border-[#334155] rounded-lg px-4 py-3 focus:outline-none focus:border-[#38bdf8]"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Official Email ID"
                className="bg-[#0f172a] text-[#e5e7eb] border border-[#334155] rounded-lg px-4 py-3 focus:outline-none focus:border-[#38bdf8]"
              />
            </div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Role Description (max 2 lines) *"
              className="w-full bg-[#0f172a] text-[#e5e7eb] border border-[#334155] rounded-lg px-4 py-3 focus:outline-none focus:border-[#38bdf8] resize-none h-20"
              required
            />
            <div>
              <label className="block text-[#e5e7eb] font-medium mb-2">Upload Official ID Proof *</label>
              <div className="border-2 border-dashed border-[#334155] rounded-lg p-4 text-center">
                {formData.idProof ? (
                  <div className="text-[#22c55e]">✓ ID Proof Uploaded</div>
                ) : (
                  <label className="cursor-pointer">
                    <Upload className="w-8 h-8 text-[#94a3b8] mx-auto mb-2" />
                    <p className="text-[#94a3b8] text-sm">Click to upload ID proof</p>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      required
                    />
                  </label>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#38bdf8] hover:bg-[#0ea5e9] text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Submit for Verification
            </button>
          </form>
        </div>
      ) : (
        loading ? (
          <div className="text-center text-[#94a3b8] py-8">Loading officials...</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {officials.map((official) => (
              <div key={official.id} className="bg-[#1e293b] rounded-xl p-6 border border-[#334155] text-center">
                <div className="w-20 h-20 bg-[#38bdf8] rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h4 className="text-[#e5e7eb] font-bold">{official.name}</h4>
                  <UserCheck className="w-4 h-4 text-[#22c55e]" />
                </div>
                <p className="text-[#38bdf8] font-medium text-sm mb-1">{official.designation}</p>
                <p className="text-[#94a3b8] text-sm mb-2">{official.department}</p>
                <p className="text-[#94a3b8] text-xs mb-3">{official.jurisdiction}</p>
                <p className="text-[#94a3b8] text-xs mb-4">{official.description}</p>
                <button
                  onClick={() => onReportToOfficial(official)}
                  className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white py-2 rounded-lg font-medium transition-colors"
                >
                  Report Issue
                </button>
              </div>
            ))}
          </div>
        )
      )}

      <div className="bg-[#0f172a] rounded-xl p-6 border border-[#334155]">
        <h4 className="text-[#38bdf8] font-bold mb-3">Important Information</h4>
        <ul className="text-[#94a3b8] text-sm space-y-2">
          <li>• Officials are verified internally before being listed</li>
          <li>• Only official role-based information is displayed publicly</li>
          <li>• CivicLens does not guarantee response timelines</li>
          <li>• This feature is voluntary and opt-in for officials</li>
        </ul>
      </div>
    </div>
  );
}