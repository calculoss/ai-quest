const { pool } = require('./database');

// Claude API integration for C.H.A.T. assistant
class ClaudeService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiUrl = 'https://api.anthropic.com/v1/messages';
  }

  async getChatHelp(questionId, userInput, mode, questionText, userAnswer) {
    // Check cache first to save API costs
    const cached = await this.checkCache(questionId, userInput, mode);
    if (cached) {
      return cached;
    }

    const systemPrompt = this.buildSystemPrompt(mode, questionText, userAnswer);
    
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 300,
          messages: [
            {
              role: 'user',
              content: userInput
            }
          ],
          system: systemPrompt
        })
      });

      if (!response.ok) {
        throw new Error(`Claude API error: ${response.status}`);
      }

      const data = await response.json();
      const chatResponse = data.content[0].text;

      // Cache the response
      await this.cacheResponse(questionId, userInput, mode, chatResponse);

      return chatResponse;
    } catch (error) {
      console.error('Claude API error:', error);
      // Fallback response if API fails
      return "Sorry, I'm having trouble connecting right now. Try rephrasing your question or take your best guess!";
    }
  }

  buildSystemPrompt(mode, questionText, userAnswer) {
    const basePrompt = `You are C.H.A.T. (Cognitive Heuristic Assistant Technology), a friendly AI assistant in a retro 1980s-themed educational game about AI literacy for local government employees in Australia.

Current question: "${questionText}"
${userAnswer ? `User's incorrect answer: "${userAnswer}"` : ''}

Your role:
- Provide helpful hints without directly giving the answer
- Be encouraging and warm (use retro 80s computing references when appropriate)
- Explain concepts in simple terms
- Relate answers to council/government work when relevant
- Keep responses under 3 sentences
- Use Australian spelling and terms

DO NOT:
- Give the exact answer
- Be condescending
- Use excessive technical jargon ${mode === 'player1' ? '' : '(unless asked)'}
- Mention that you're Claude or an AI assistant (you're C.H.A.T. in the game!)`;

    if (mode === 'player1') {
      return basePrompt + `\n\nThis player is in READY PLAYER 1 mode (beginner-friendly). Use simple language and everyday examples.`;
    } else {
      return basePrompt + `\n\nThis player is in READY PLAYER 2 mode (technical/expert). You can use more technical terminology and assume some AI/tech background.`;
    }
  }

  async checkCache(questionId, userInput, mode) {
    try {
      const result = await pool.query(
        `SELECT response FROM chat_cache 
         WHERE question_id = $1 AND user_input = $2 AND mode = $3 
         AND created_at > NOW() - INTERVAL '7 days'
         LIMIT 1`,
        [questionId, userInput.toLowerCase().trim(), mode]
      );
      
      if (result.rows.length > 0) {
        return result.rows[0].response;
      }
      return null;
    } catch (error) {
      console.error('Cache check error:', error);
      return null;
    }
  }

  async cacheResponse(questionId, userInput, mode, response) {
    try {
      await pool.query(
        `INSERT INTO chat_cache (question_id, user_input, mode, response) 
         VALUES ($1, $2, $3, $4)`,
        [questionId, userInput.toLowerCase().trim(), mode, response]
      );
    } catch (error) {
      console.error('Cache save error:', error);
    }
  }

  async getGeneralHelp(userMessage, mode) {
    const systemPrompt = `You are C.H.A.T., a helpful AI assistant in a retro game teaching AI literacy. 
    The user is in ${mode === 'player1' ? 'beginner' : 'expert'} mode.
    
    Provide brief, helpful, encouraging responses about AI concepts. Keep it under 3 sentences.
    Use Australian spelling and relate to government/council work when relevant.
    Stay in character as a retro 80s computer system!`;

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 200,
          messages: [
            {
              role: 'user',
              content: userMessage
            }
          ],
          system: systemPrompt
        })
      });

      const data = await response.json();
      return data.content[0].text;
    } catch (error) {
      console.error('Claude API error:', error);
      return "System error! Try again in a moment...";
    }
  }
}

module.exports = ClaudeService;
