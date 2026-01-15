# 🏛️ Civic Awareness Platform

AI-powered civic engagement platform empowering citizens with legal awareness, civic issue reporting, complaint guidance, and rights education.

![Platform Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?logo=typescript)

## 🎯 Overview

Bridges the gap between citizens and civic authorities through:
- **Legal Awareness**: Simplified legal procedures and rights information
- **Civic Issue Reporting**: Report and track civic problems
- **Complaint Guidance**: Step-by-step complaint filing assistance
- **Rights Education**: Learn about fundamental rights and duties
- **Visual Reporting**: Image-based civic issue documentation
- **AI Assistance**: Powered by Groq AI for intelligent guidance

**Mission**: Empower citizens with accessible knowledge about their rights, responsibilities, and civic processes through responsible AI technology.

## ✨ Key Features

### 🏠 Home Tab
- Welcome dashboard with platform overview and quick navigation

### ⚖️ Legal Guidance Tab
- AI-powered legal query assistance
- Category-based information (Police, Civic, Consumer, Safety)
- Emergency helpline numbers and basic citizen rights

### 🚨 Civic Issue Reporting Tab
- Report civic problems with location tracking
- AI-assisted authority identification
- Issue categorization (Water, Electricity, Roads, Sanitation, Safety, Pollution)

### 🛡️ Complaint Guidance Tab
- General complaint process explanations
- AI Contact Finder for authority suggestions
- **20+ Indian helpline numbers** with click-to-call functionality
  - Emergency: 112, 108, 101
  - Police: 181, 1930, 1098, 14567
  - Civic: 1969
  - Consumer: 1915, 8800001915
  - Mental Health: 1800-599-0019

### 📚 Awareness & Rights Tab
- AI-powered explanations of fundamental rights and civic duties
- Static information on RTI, consumer rights, women's rights

### 📸 Civic Lens Tab
- **Image-based reporting** with privacy protection
- AI authority suggestions
- Category color coding (Green: Garbage, Blue: Water, Yellow: Electricity, Red: Safety)

### ℹ️ About & Ethics Tab
- Platform mission, SDG alignment, and responsible AI principles

## 🛠️ Technology Stack

**Frontend**: React 18.3.1, TypeScript 5.5.3, Vite 5.4.2, Tailwind CSS 3.4.1
**Backend**: Groq AI API (llama-3.1-8b-instant), Supabase 2.57.4
**Tools**: ESLint, PostCSS, Autoprefixer

## 📦 Prerequisites

- Node.js (v18+)
- npm/yarn
- Groq API Key ([groq.com](https://groq.com))
- Supabase Account (optional)
- Modern web browser

## 🚀 Installation

```bash
# Clone repository
git clone https://github.com/yourusername/civic-awareness-platform.git
cd civic-awareness-platform

# Install dependencies
npm install

# Create .env file
echo "VITE_GROQ_API_KEY=your_groq_api_key_here" > .env
echo "VITE_SUPABASE_URL=your_supabase_url" >> .env
echo "VITE_SUPABASE_ANON_KEY=your_supabase_anon_key" >> .env

# Start development server
npm run dev
# Available at http://localhost:5173

# Build for production
npm run build
npm run preview
```

## ⚙️ Configuration

### Groq API Setup
1. Create account at [groq.com](https://groq.com)
2. Generate API key
3. Add to `.env` as `VITE_GROQ_API_KEY`

### Supabase Setup (Optional)
1. Create project at [supabase.com](https://supabase.com)
2. Run SQL schema from `complete-supabase-schema.sql`
3. Add URL and anon key to `.env`

**Database Tables**: officials, civic_issues, legal_queries, complaint_guidance, awareness_queries, civic_lens_reports, user_feedback, system_logs

## 📖 Usage

### For Citizens
1. Navigate tabs for different services
2. Ask legal questions in simple language
3. Report civic issues with location details
4. Use filterable helpline directory
5. Learn about fundamental rights
6. Upload photos of civic issues

### For Developers
```typescript
import { GrokService } from './services/grokService';
const grokService = new GrokService('your-api-key');

// Get legal guidance
const response = await grokService.getLegalGuidance(
  'What are my rights during police questioning?', 'police'
);

// Categorize civic issue
const suggestion = await grokService.categorizeCivicIssue(
  'Broken streetlight on Main Street', 'Mumbai, Maharashtra'
);
```

## 🤖 AI Integration

**Groq AI Features**:
1. Legal query interpretation
2. Civic issue analysis and categorization
3. Authority suggestion
4. Complaint guidance
5. Rights education

**AI Safety Measures**:
- Never provides legal advice (informational only)
- Never claims authority
- Promotes lawful, peaceful action
- Uses simple, accessible language
- Maintains political neutrality
- Respects user privacy

## 🔒 Security & Privacy

**Data Protection**:
- No personal data stored without consent
- No conversation history retained
- Anonymous civic reporting
- Identity protection in Civic Lens
- Secure API key management

**Disclaimers**:
- **Legal**: Provides general information only, not legal advice
- **Authority**: No affiliation with government bodies
- **AI**: Systems can make mistakes, verify important information

## 📡 API Methods

```typescript
// GrokService Methods
getLegalGuidance(query: string, category?: string): Promise<string>
categorizeCivicIssue(description: string, location?: string): Promise<string>
getComplaintGuidance(question: string, issueType?: string): Promise<string>
getAwarenessInfo(topic: string, question?: string): Promise<string>
sendMessage(systemPrompt: string, userMessage: string): Promise<string>
```

## 🎨 Design System

**Colors**: Dark theme (#0f172a background, #1e293b cards, #38bdf8 primary)
**Features**: Responsive design, WCAG 2.1 compliant, hover effects, loading states
**Browser Support**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

## 🧪 Testing & Performance

```bash
npm run lint      # Code linting
npm run typecheck # Type checking
npm run build     # Build test
```

**Optimizations**: Code splitting, lazy loading, optimized images, fast AI responses (5-15s)

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

**Guidelines**: Follow TypeScript best practices, maintain code style, add comments, update docs

## 🗺️ Roadmap

- [ ] Multi-language support (Hindi, regional languages)
- [ ] Voice input for accessibility
- [ ] SMS-based reporting
- [ ] Real-time status tracking
- [ ] Mobile app (React Native)
- [ ] Offline mode

## 🌟 Key Highlights

- **20+ Helpline Numbers** integrated
- **AI-Powered** guidance across all tabs
- **Privacy Protected** civic reporting
- **Image-Based** issue documentation
- **Mobile Responsive** design
- **Zero Personal Data** exposure
- **Ethical AI** implementation

## 💡 Best Practices

**For Users**:
1. Verify AI suggestions with official sources
2. Keep complaint numbers
3. Use emergency numbers (112) for urgent matters

**For Developers**:
1. Never commit API keys
2. Use environment variables
3. Follow TypeScript strict mode

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Groq AI for language models
- Supabase for backend infrastructure
- React and TypeScript communities
- Citizens who inspired this platform

## 📞 Support

- **GitHub Issues**: [Create issue](https://github.com/yourusername/civic-awareness-platform/issues)
- **Email**: support@civicplatform.example

---

**Built with ❤️ for empowering citizens and strengthening democracy**

*Last Updated: January 2024*
