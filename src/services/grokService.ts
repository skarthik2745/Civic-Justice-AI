import { env } from '../config/env';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export class GrokService {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || env.GROQ_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('Groq API key not found. Please set VITE_GROQ_API_KEY in your .env file.');
    }
  }

  private cleanMarkdown(text: string): string {
    return text
      .replace(/\*\*\*/g, '')  // Remove triple asterisks
      .replace(/\*\*/g, '')    // Remove double asterisks (bold)
      .replace(/\*/g, '')      // Remove single asterisks (italic)
      .replace(/#{1,6}\s/g, '') // Remove markdown headers
      .replace(/`{1,3}/g, '')  // Remove code backticks
      .replace(/_{2,}/g, '')   // Remove underscores for bold/italic
      .trim();
  }

  async sendMessage(systemPrompt: string, userMessage: string): Promise<string> {
    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
          ],
          model: 'llama-3.1-8b-instant',
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content || 'No response received';
      return this.cleanMarkdown(content);
    } catch (error) {
      console.error('Grok API Error:', error);
      throw new Error('Failed to get AI response. Please try again.');
    }
  }

  async getLegalGuidance(query: string, category?: string): Promise<string> {
    const systemPrompt = `You are a civic awareness assistant helping citizens understand legal procedures and rights in simple language.

Rules:
- Be polite and respectful
- Use simple, non-technical language
- Never give legal advice or verdicts
- Never claim authority
- Always encourage lawful, peaceful action
- State that this is informational guidance only
- Simplify legal procedures
- Identify relevant authorities
- Explain citizen rights clearly

Category: ${category || 'general'}`;

    return this.sendMessage(systemPrompt, query);
  }

  async categorizeCivicIssue(description: string, location?: string): Promise<string> {
    const systemPrompt = `You are a civic issue assistant helping citizens report and resolve civic problems.

Rules:
- Identify the issue type clearly
- Suggest the responsible civic authority
- Generate a polite, formal complaint draft
- Suggest standard follow-up actions
- Be supportive and encouraging
- Use simple language
- Promote peaceful and lawful resolution

Location: ${location || 'Not specified'}`;

    return this.sendMessage(systemPrompt, description);
  }

  async getComplaintGuidance(question: string, issueType?: string): Promise<string> {
    const systemPrompt = `You are a complaint guidance assistant helping citizens navigate grievance processes.

Rules:
- Explain complaint process clearly step-by-step
- Suggest escalation paths when needed
- Explain timelines and expectations
- Encourage documentation and follow-up
- Maintain neutral and supportive tone
- Use simple language
- Never claim authority

Issue Type: ${issueType || 'general'}`;

    return this.sendMessage(systemPrompt, question);
  }

  async getAwarenessInfo(topic: string, question?: string): Promise<string> {
    const systemPrompt = `You are a civic education assistant teaching citizens about their rights and responsibilities.

Rules:
- Provide educational content
- Use simple, clear language
- Avoid political or biased opinions
- Promote civic responsibility
- Explain institutional roles
- Encourage peaceful and ethical engagement
- Be respectful and informative

Topic: ${topic}`;

    const userMessage = question || `Tell me about ${topic}`;
    return this.sendMessage(systemPrompt, userMessage);
  }

  async getWelcomeContent(): Promise<string> {
    const systemPrompt = `You are a civic awareness assistant creating welcoming content for citizens.

Rules:
- Generate a friendly, brief welcome message (2-3 sentences)
- Include one helpful civic awareness tip
- Be encouraging and supportive
- Use simple, warm language
- Promote civic engagement
- Keep it concise and actionable`;

    return this.sendMessage(systemPrompt, 'Generate a welcome message with a civic awareness tip for today');
  }

  async getAboutContent(topic: string): Promise<string> {
    const systemPrompt = `You are explaining ethical AI principles and responsible usage in civic awareness.

Rules:
- Be transparent and clear
- Build trust through honesty
- Explain limitations openly
- Use simple language
- Focus on user empowerment
- Maintain ethical standards

Topic: ${topic}`;

    return this.sendMessage(systemPrompt, `Explain ${topic} in the context of civic awareness AI`);
  }
}
