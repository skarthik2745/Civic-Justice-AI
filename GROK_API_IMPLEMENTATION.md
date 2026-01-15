# Grok API Implementation Guide

## Overview
This civic awareness platform uses the Grok API (x.ai) to power AI-driven guidance across all tabs. The API key is configured via environment variables and used through the `GrokService` class.

---

## API Configuration

### Environment Setup
```env
VITE_GROK_API_KEY=your_grok_api_key_here
```

### Service Architecture
- **File**: `src/services/grokService.ts`
- **API Endpoint**: `https://api.x.ai/v1/chat/completions`
- **Model**: `grok-beta`
- **Temperature**: `0.7` (balanced creativity and consistency)

---

## Tab-by-Tab API Usage

### 1️⃣ Home Tab
**Component**: `src/components/Home.tsx`

**API Usage**: Optional/Future Enhancement
- Currently displays static welcome content
- **Potential Enhancement**: Use Grok API to generate:
  - Dynamic welcome messages based on time of day
  - Latest civic awareness tips
  - Trending civic issues
  - Personalized recommendations

**Implementation Suggestion**:
```typescript
async getWelcomeContent(): Promise<string> {
  const systemPrompt = `Generate a friendly, informative welcome message for a civic awareness platform.
  Include a helpful tip about citizen rights or civic engagement.`;
  return this.sendMessage(systemPrompt, 'Generate welcome content');
}
```

---

### 2️⃣ Legal Guidance Tab
**Component**: `src/components/LegalGuidance.tsx`

**API Method**: `grokService.getLegalGuidance(query, category)`

**Purpose**:
- Interpret user legal/procedural queries
- Simplify complex legal procedures into step-by-step explanations
- Identify relevant authorities
- Draft document checklists for awareness

**System Prompt Rules**:
- Use simple, non-technical language
- Never give legal advice or verdicts
- Never claim authority
- Always encourage lawful, peaceful action
- State that this is informational guidance only
- Simplify legal procedures
- Identify relevant authorities
- Explain citizen rights clearly

**Categories Supported**:
- General
- Police & Law Enforcement
- Civic & Municipal
- Consumer Rights
- Public Safety

**Example Query**: "What are my rights if stopped by police?"

---

### 3️⃣ Civic Issue Reporting Tab
**Component**: `src/components/CivicReporting.tsx`

**API Method**: `grokService.categorizeCivicIssue(description, location)`

**Purpose**:
- Analyze user-described civic issues
- Categorize issue type (water, electricity, roads, sanitation, etc.)
- Map issue to responsible authority
- Draft formal complaint text
- Suggest next follow-up steps

**System Prompt Rules**:
- Identify the issue type clearly
- Suggest the responsible civic authority
- Generate a polite, formal complaint draft
- Suggest standard follow-up actions
- Be supportive and encouraging
- Use simple language
- Promote peaceful and lawful resolution

**Issue Categories**:
- Water Supply
- Electricity
- Roads & Infrastructure
- Sanitation & Waste
- Public Safety
- Pollution
- Other (auto-detect)

**Example Input**: "Street light not working in Sector 12 for 2 weeks"

---

### 4️⃣ Complaint Guidance Tab
**Component**: `src/components/ComplaintGuidance.tsx`

**API Method**: `grokService.getComplaintGuidance(question, issueType)`

**Purpose**:
- Explain complaint submission process
- Suggest escalation path if unresolved
- Give step-by-step follow-up instructions
- Keep tone neutral and supportive

**System Prompt Rules**:
- Explain complaint process clearly step-by-step
- Suggest escalation paths when needed
- Explain timelines and expectations
- Encourage documentation and follow-up
- Maintain neutral and supportive tone
- Use simple language
- Never claim authority

**Topics Covered**:
- General Query
- Escalation Process
- Timeline & Follow-up
- Documentation Required
- Complainant Rights

**Example Query**: "How do I escalate if my complaint is not resolved?"

---

### 5️⃣ Awareness & Rights Tab
**Component**: `src/components/AwarenessRights.tsx`

**API Method**: `grokService.getAwarenessInfo(topic, question)`

**Purpose**:
- Explain citizen rights
- Explain responsibilities and civic rules
- Provide educational content in simple language
- Maintain neutrality and ethical awareness

**System Prompt Rules**:
- Provide educational content
- Use simple, clear language
- Avoid political or biased opinions
- Promote civic responsibility
- Explain institutional roles
- Encourage peaceful and ethical engagement
- Be respectful and informative

**Topics Available**:
- Fundamental Rights
- Civic Duties & Responsibilities
- Government Services
- Public Participation
- Institutional Roles
- Grievance Redressal Systems

**Example Query**: "What are my fundamental rights as a citizen?"

---

### 6️⃣ About & Ethics Tab
**Component**: `src/components/About.tsx`

**API Usage**: Optional/Future Enhancement
- Currently displays static content about mission, SDG alignment, and ethical disclaimers
- **Potential Enhancement**: Use Grok API to:
  - Generate clear, trustworthy transparency text
  - Explain platform vision dynamically
  - Provide context-aware ethical guidance
  - Answer questions about responsible AI usage

**Implementation Suggestion**:
```typescript
async getEthicsExplanation(topic: string): Promise<string> {
  const systemPrompt = `Explain ethical AI principles and responsible usage in the context of civic awareness.
  Be transparent, clear, and build trust.`;
  return this.sendMessage(systemPrompt, topic);
}
```

---

## API Request Flow

### Standard Request Structure
```typescript
{
  messages: [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userMessage }
  ],
  model: 'grok-beta',
  temperature: 0.7
}
```

### Response Handling
```typescript
const data = await response.json();
return data.choices[0]?.message?.content || 'No response received';
```

### Error Handling
- Network errors caught and logged
- User-friendly error messages displayed
- Graceful degradation if API unavailable

---

## Security & Best Practices

### API Key Security
✅ **DO**:
- Store API key in `.env` file
- Add `.env` to `.gitignore`
- Use environment variables (`import.meta.env.VITE_GROK_API_KEY`)
- Never commit API keys to version control

❌ **DON'T**:
- Hardcode API keys in source code
- Share API keys publicly
- Commit `.env` file to repository

### Rate Limiting
- Implement loading states to prevent duplicate requests
- Disable submit buttons during API calls
- Consider implementing request throttling for production

### Privacy
- No conversation history stored
- No personal data retained
- All processing happens in real-time

---

## Usage Statistics by Tab

| Tab | API Calls | Purpose | Critical? |
|-----|-----------|---------|-----------|
| Home | 0 (optional) | Dynamic content | No |
| Legal Guidance | Per query | Legal interpretation | Yes |
| Civic Reporting | Per report | Issue categorization | Yes |
| Complaint Guidance | Per question | Process guidance | Yes |
| Awareness & Rights | Per topic | Education | Yes |
| About & Ethics | 0 (optional) | Transparency | No |

---

## Testing the Integration

### 1. Set up API Key
```bash
# Copy example env file
copy .env.example .env

# Edit .env and add your Grok API key
VITE_GROK_API_KEY=xai-your-actual-key-here
```

### 2. Run Development Server
```bash
npm install
npm run dev
```

### 3. Test Each Tab
- Navigate to each tab
- Submit test queries
- Verify AI responses are relevant and ethical
- Check error handling with invalid inputs

---

## Ethical AI Safeguards

All API calls include system prompts that enforce:
- ✓ No legal advice (informational only)
- ✓ No authority claims
- ✓ Promotion of lawful, peaceful action
- ✓ Simple, accessible language
- ✓ Political neutrality
- ✓ Respectful and supportive tone
- ✓ Transparency about AI limitations

---

## Future Enhancements

### Potential Improvements
1. **Conversation History**: Add context-aware multi-turn conversations
2. **Caching**: Cache common queries to reduce API calls
3. **Multilingual Support**: Detect and respond in user's language
4. **Voice Input**: Add speech-to-text for accessibility
5. **Feedback Loop**: Allow users to rate AI responses
6. **Analytics**: Track common queries to improve guidance
7. **Offline Mode**: Provide basic guidance without API

### Advanced Features
- Document generation (complaint letters, RTI applications)
- Authority contact information lookup
- Case status tracking integration
- Community forum for shared experiences
- Expert verification of AI responses

---

## Troubleshooting

### Common Issues

**Issue**: "API request failed: 401 Unauthorized"
- **Solution**: Check API key is correct in `.env` file
- Verify environment variable is loaded (`import.meta.env.VITE_GROK_API_KEY`)

**Issue**: "Failed to get AI response"
- **Solution**: Check internet connection
- Verify Grok API endpoint is accessible
- Check API rate limits

**Issue**: Slow responses
- **Solution**: Normal for AI processing (5-15 seconds)
- Consider adding progress indicators
- Implement request timeout handling

---

## API Cost Optimization

### Strategies to Reduce Costs
1. **Input Validation**: Reject empty or invalid queries before API call
2. **Response Caching**: Cache common queries and responses
3. **Rate Limiting**: Prevent abuse with request throttling
4. **Prompt Optimization**: Keep system prompts concise
5. **Error Handling**: Avoid retry loops on permanent failures

---

## Compliance & Legal

### Disclaimers Implemented
- ⚠️ "This is informational guidance only. Not legal advice."
- ⚠️ "Consult a qualified legal professional for your specific situation."
- ⚠️ "We do not represent any authority or make legal decisions."

### Data Privacy
- No personal data stored
- No conversation logs retained
- API calls are stateless
- Compliant with privacy best practices

---

## Support & Resources

### Documentation
- [Grok API Documentation](https://docs.x.ai/)
- [React + TypeScript Guide](https://react.dev/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

### Contact
For issues or questions about this implementation, refer to the project repository or documentation.

---

**Last Updated**: 2024
**Version**: 1.0
**Status**: Production Ready ✅
