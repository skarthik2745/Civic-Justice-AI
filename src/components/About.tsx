import { Info, Target, Heart, Shield, Globe, AlertTriangle } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-[#0f172a] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Info className="w-12 h-12 text-[#38bdf8] mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-[#e5e7eb] mb-2">About & Ethics</h1>
          <p className="text-[#94a3b8]">
            Our mission, values, and commitment to responsible AI
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-[#1e293b] rounded-xl p-8 shadow-lg border border-[#334155]">
            <div className="flex items-start gap-4">
              <Target className="w-8 h-8 text-[#38bdf8] flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold text-[#e5e7eb] mb-3">Our Mission</h2>
                <p className="text-[#94a3b8] leading-relaxed">
                  To empower citizens with accessible knowledge about their rights, responsibilities,
                  and civic processes. We believe that informed citizens are the foundation of a
                  healthy democracy. Our platform uses AI technology responsibly to break down
                  complex legal and civic information into simple, actionable guidance.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#1e293b] rounded-xl p-8 shadow-lg border border-[#334155]">
            <div className="flex items-start gap-4">
              <Globe className="w-8 h-8 text-[#22c55e] flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold text-[#e5e7eb] mb-3">SDG Alignment</h2>
                <p className="text-[#94a3b8] leading-relaxed mb-4">
                  This platform aligns with the United Nations Sustainable Development Goals:
                </p>
                <div className="space-y-2 text-[#94a3b8]">
                  <p>• <span className="text-[#22c55e] font-medium">SDG 16</span> - Peace, Justice and Strong Institutions</p>
                  <p>• <span className="text-[#22c55e] font-medium">SDG 10</span> - Reduced Inequalities</p>
                  <p>• <span className="text-[#22c55e] font-medium">SDG 11</span> - Sustainable Cities and Communities</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1e293b] rounded-xl p-8 shadow-lg border border-[#334155]">
            <div className="flex items-start gap-4">
              <Heart className="w-8 h-8 text-[#38bdf8] flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold text-[#e5e7eb] mb-3">Responsible AI Principles</h2>
                <div className="space-y-3 text-[#94a3b8]">
                  <div className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-1">✓</span>
                    <p><span className="font-medium text-[#e5e7eb]">Transparency:</span> We clearly state when AI is being used and its limitations</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-1">✓</span>
                    <p><span className="font-medium text-[#e5e7eb]">No Legal Advice:</span> We provide educational guidance, not legal counsel</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-1">✓</span>
                    <p><span className="font-medium text-[#e5e7eb]">Ethical Boundaries:</span> We promote only lawful and peaceful civic engagement</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-1">✓</span>
                    <p><span className="font-medium text-[#e5e7eb]">Privacy:</span> We do not store personal data or conversation history</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-1">✓</span>
                    <p><span className="font-medium text-[#e5e7eb]">Neutrality:</span> We maintain political neutrality and avoid bias</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1e293b] rounded-xl p-8 shadow-lg border border-[#f59e0b]">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-[#f59e0b] flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold text-[#e5e7eb] mb-3">Important Disclaimers</h2>
                <div className="space-y-3 text-[#94a3b8]">
                  <p>
                    <span className="font-medium text-[#f59e0b]">Not Legal Advice:</span> This platform
                    provides general informational guidance only. It does not constitute legal advice,
                    and should not be relied upon as such. Always consult qualified legal professionals
                    for your specific legal matters.
                  </p>
                  <p>
                    <span className="font-medium text-[#f59e0b]">No Authority Representation:</span> We
                    do not represent, act on behalf of, or have any affiliation with government
                    authorities, law enforcement, or judicial bodies.
                  </p>
                  <p>
                    <span className="font-medium text-[#f59e0b]">AI Limitations:</span> While we strive
                    for accuracy, AI systems can make mistakes. Always verify important information
                    through official channels.
                  </p>
                  <p>
                    <span className="font-medium text-[#f59e0b]">Responsibility:</span> Users are solely
                    responsible for their actions and decisions. This platform serves as an educational
                    tool to help you understand processes, not to make decisions for you.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1e293b] rounded-xl p-8 shadow-lg border border-[#334155]">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-[#22c55e] flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold text-[#e5e7eb] mb-3">Our Commitment</h2>
                <p className="text-[#94a3b8] leading-relaxed">
                  We are committed to building a platform that promotes civic awareness, empowers
                  citizens, and strengthens democratic participation. We will continuously improve
                  our services while maintaining the highest ethical standards and transparency.
                  Our goal is not to replace legal or civic institutions, but to help citizens
                  better understand and engage with them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
