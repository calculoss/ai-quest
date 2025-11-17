// Game Content: Rooms, Characters, Questions, and Story

const gameContent = {
// FIXED ROOM DESCRIPTIONS - Copy these into your gameContent.js

rooms:[
  {
    id: 1,
    name: "Reception",
    character: "Rita",
    description:
`╔════════════════════════════════════════════════════════╗
║                    RECEPTION                           ║
║              Lake Macquarie Council                    ║
║             15 September 1989, 0905                    ║
╚════════════════════════════════════════════════════════╝

Rita's desk is cluttered with manila folders and a daily planner.
A sign on the wall reads "COMPUTER SERVICES - Authorised Personnel Only."

An urgent memo sits on the desk: "C.H.A.T. SYSTEM - Offline.
GM demo at 4PM. Collect authorization codes from all department heads."`,
    exits: ["Cafeteria", "Mainframe Room"]
  },
  
  {
    id: 2,
    name: "Cafeteria",
    character: "Council Staff",
    description: 
`╔════════════════════════════════════════════════════════╗
║                  STAFF CAFETERIA                       ║
║              Lake Macquarie Council                    ║
║             15 September 1989, 1015                    ║
╚════════════════════════════════════════════════════════╝

Morning tea is in full swing. The smell of Tim Tams and instant 
coffee fills the air. A radio in the corner plays 2GO.`,
    exits: ["Reception", "Mainframe Room"]
  },
  
  {
    id: 3,
    name: "Mainframe Room",
    character: "Systems Manager",
    description: 
`╔════════════════════════════════════════════════════════╗
║                  MAINFRAME ROOM                        ║
║              Lake Macquarie Council                    ║
║             15 September 1989, 1045                    ║
╚════════════════════════════════════════════════════════╝

The IBM System/36 mainframe dominates the room. Red and green LEDs 
blink rhythmically. The temperature is noticeably cold - 18°C exactly.`,
    exits: ["Cafeteria", "Map Room"]
  },
  
  {
    id: 4,
    name: "Map Room",
    character: "Planning Officer",
    description: 
`╔════════════════════════════════════════════════════════╗
║                    MAP ROOM                            ║
║              Lake Macquarie Council                    ║
║             15 September 1989, 1130                    ║
╚════════════════════════════════════════════════════════╝

Paper maps of Lake Macquarie cover the walls. A new computer sits 
in the corner running early GIS software - very cutting-edge for 1989.`,
    exits: ["Mainframe Room", "Communications"]
  },
  
  {
    id: 5,
    name: "Communications",
    character: "Communications Officer",
    description: 
`╔════════════════════════════════════════════════════════╗
║              COMMUNICATIONS DEPARTMENT                 ║
║              Lake Macquarie Council                    ║
║             15 September 1989, 1400                    ║
╚════════════════════════════════════════════════════════╝

Macintosh computers hum quietly. PageMaker templates are open on 
screen. Draft newsletters are pinned to a corkboard.`,
    exits: ["Map Room", "Governance"]
  },
  
  {
    id: 6,
    name: "Governance",
    character: "Governance Officer",
    description: 
`╔════════════════════════════════════════════════════════╗
║                 GOVERNANCE OFFICE                      ║
║              Lake Macquarie Council                    ║
║             15 September 1989, 1500                    ║
╚════════════════════════════════════════════════════════╝

Floor-to-ceiling shelves of policy manuals. A copy of the Local 
Government Act 1919 sits open on the desk. A typewriter clacks in 
the adjacent office.`,
    exits: ["Communications", "Mail Room"]
  },
  
  {
    id: 7,
    name: "Mail Room",
    character: "C.H.A.T.",
    description:
`╔════════════════════════════════════════════════════════╗
║                    MAIL ROOM                           ║
║              Lake Macquarie Council                    ║
║             15 September 1989, 1530                    ║
╚════════════════════════════════════════════════════════╝

Mail sorting racks line the walls. The C.H.A.T. terminal sits dark
and offline. A "BETA TEST IN PROGRESS" sign hangs on the door.

A note taped to the screen: "System crashed overnight. Requires ALL
department authorization codes + manual restart protocol."`,
    exits: ["Governance", "General Manager"]
  },
  
  {
    id: 8,
    name: "General Manager",
    character: "General Manager",
    description: 
`╔════════════════════════════════════════════════════════╗
║              GENERAL MANAGER'S OFFICE                  ║
║              Lake Macquarie Council                    ║
║             15 September 1989, 1600                    ║
╚════════════════════════════════════════════════════════╝

The executive suite. A large mahogany desk. Windows overlook King 
Street Newcastle. Photos of council projects line the walls - the 
new library, road construction, community centres.`,
    exits: []
  }

],


  questions: {
    player1: [
      // LOBBY - Room 1 (Easy warm-up)
      {
        id: 1,
        room: 1,
        character: "Rita",
        question: "Welcome! Before we start, what does 'AI' stand for?",
        options: [
          "Automated Intelligence",
          "Artificial Intelligence",
          "Advanced Internet",
          "Automated Internet"
        ],
        correct: 1,
        explanation: "AI stands for Artificial Intelligence - technology that can learn, reason, and solve problems in ways that mimic human intelligence!",
        points: 100
      },
      {
        id: 2,
        room: 1,
        character: "Rita",
        question: "True or False: AI can think and feel emotions exactly like humans do.",
        options: [
          "True - AI has feelings",
          "False - AI simulates but doesn't feel",
          "Sometimes true",
          "Only advanced AI can feel"
        ],
        correct: 1,
        explanation: "AI doesn't actually think or feel emotions like humans. It processes data and generates responses based on patterns, but has no consciousness or feelings. It's a tool, not a being!",
        points: 100
      },

      // BREAK ROOM - Room 2 (Easy)
      {
        id: 3,
        room: 2,
        character: "Council Staff",
        question: "Which of these can AI tools like Copilot help you with at work?",
        options: [
          "Making final decisions on important matters",
          "Drafting emails and summarizing documents",
          "Reading your boss's mind",
          "Guaranteeing 100% accurate results"
        ],
        correct: 1,
        explanation: "AI excels at assisting with tasks like drafting, summarizing, and brainstorming. But humans should always review outputs and make final decisions!",
        points: 100
      },
      {
        id: 4,
        room: 2,
        character: "Council Staff",
        question: "What's the best way to get good results from AI?",
        options: [
          "Be vague so AI can be creative",
          "Use lots of technical jargon",
          "Be specific and clear about what you want",
          "Type in all capital letters"
        ],
        correct: 2,
        explanation: "Clear, specific prompts work best! Tell the AI exactly what you need, provide context, and give examples. Think of it like giving instructions to a helpful but literal-minded assistant.",
        points: 100
      },

      // R&D LAB - Room 3 (Easy-Medium)
      {
        id: 5,
        room: 3,
        character: "Systems Manager",
        question: "What's the best description of how AI 'learns'?",
        options: [
          "It downloads new information from the internet in real-time",
          "It finds patterns in training data, like learning from examples",
          "Programmers manually teach it every possible answer",
          "It reads books the same way humans do"
        ],
        correct: 1,
        explanation: "AI learns by analysing huge amounts of training data and finding patterns - like how you learned to recognise cats by seeing many examples! It doesn't have real-time internet access or read like we do.",
        points: 150
      },
      {
        id: 6,
        room: 3,
        character: "Systems Manager",
        question: "Roughly how much text data did large AI models like ChatGPT train on?",
        options: [
          "About 100 websites",
          "A few thousand books",
          "Most of the publicly available internet",
          "Every book ever written"
        ],
        correct: 2,
        explanation: "Mind-blowing fact: models like ChatGPT trained on hundreds of billions of words from across the internet - websites, books, articles, and more. That's why they know about so many topics!",
        points: 150
      },

      // SERVER ROOM - Room 4 (Medium)
      {
        id: 7,
        room: 4,
        character: "Planning Officer",
        question: "According to Council's traffic light system, which information is RED ZONE and should NEVER go into external AI tools without removing personal details first?",
        options: [
          "Public information from Council's website",
          "Personal information that could identify individuals",
          "Internal business documents",
          "Questions about general work tasks"
        ],
        correct: 1,
        explanation: "RED ZONE! Personal information that could identify individuals or cause harm if disclosed must never go into external AI tools. This includes names, addresses, contact details, or anything that could identify residents. Even with Copilot, personal details must be removed. When in doubt, default to the most restrictive approach and ask your supervisor.",
        points: 150
      },
      {
        id: 8,
        room: 4,
        character: "Planning Officer",
        question: "What's 'prompt engineering'?",
        options: [
          "A new type of construction work",
          "The skill of asking AI clear, effective questions",
          "Programming AI systems from scratch",
          "Fixing bugs in AI code"
        ],
        correct: 1,
        explanation: "Prompt engineering is the art of crafting effective questions and instructions for AI. Good prompts = good results. It's becoming a valuable workplace skill!",
        points: 150
      },

      // MARKETING DEPT - Room 5 (Medium)
      {
        id: 9,
        room: 5,
        character: "Communications Officer",
        question: "What's the smartest way to think about AI in local government work?",
        options: [
          "AI is a tool to assist human decision-making, not replace it",
          "AI should make all routine decisions automatically",
          "AI is too risky for government to use",
          "AI is only useful for large tech companies"
        ],
        correct: 0,
        explanation: "AI is a powerful tool that augments human capability! It can help analyse data, spot patterns, draft content, and handle repetitive tasks - freeing up staff to focus on complex problems requiring human judgment, ethics, and community connection. The key is using AI to make humans more effective, not to replace the human element in serving our community.",
        points: 150
      },

      // BRAIN TEASER - Room 5 (Special Challenge)
      {
        id: 20,
        room: 5,
        character: "Communications Officer",
        type: "brain_teaser",
        question: "🧠 BRAIN TEASER: You're on a game show with 3 doors. Behind one is a prize, behind the others are goats. You pick Door 1. The host (who knows what's behind each door) opens Door 3, revealing a goat. The host asks: 'Do you want to switch to Door 2?' Should you switch?",
        options: [
          "No - stay with Door 1 (50/50 odds either way)",
          "Yes - switch to Door 2 (gives you 2/3 chance of winning)",
          "Doesn't matter - equal probability",
          "Pick randomly - it's all luck"
        ],
        correct: 1,
        explanation: "✓ YES, ALWAYS SWITCH! This is the famous Monty Hall Problem, and here's why it works:\n\n📊 THE MATHS: When you first picked Door 1, you had a 1/3 (33%) chance of being right and a 2/3 (67%) chance of being wrong. The host ALWAYS opens a door with a goat - this isn't random! The host's knowledge changes everything.\n\n🎯 THE KEY INSIGHT: If your original pick was wrong (67% likely), the host eliminates the other wrong door, leaving the prize behind the remaining door. If your original pick was right (33% likely), switching loses. So switching wins 67% of the time!\n\n🧠 WHY IT MATTERS FOR AI: This puzzle shows how our intuitions about probability can be wrong. When working with AI systems, we need to think carefully about conditional probabilities and how new information changes our understanding - just like the host's action changes the odds here. Many people (even mathematicians!) initially get this wrong because our brains aren't wired for probability.",
        brain_teaser_hint: "🤔 Hmm, not quite! This puzzle has stumped many people. Think about the probabilities when you first chose... The answer will be revealed at the end of the game!",
        points: 200
      },

      // ETHICS OFFICE - Room 6 (Medium-Hard)
      {
        id: 11,
        room: 6,
        character: "Governance Officer",
        question: "What is 'AI bias' and why does it matter for councils?",
        options: [
          "AI's preference for certain computer brands",
          "When AI reflects unfair patterns from its training data",
          "AI working faster for some users",
          "AI being biased toward correct answers"
        ],
        correct: 1,
        explanation: "AI learns from human-created data, which can contain historical biases. For councils serving diverse communities, we must ensure AI tools treat everyone fairly and check for bias in AI recommendations.",
        points: 200
      },
      {
        id: 12,
        room: 6,
        character: "Governance Officer",
        question: "If AI gives you information, what should you always do?",
        options: [
          "Copy and paste it immediately",
          "Verify it's accurate before using it",
          "Assume it's 100% correct",
          "Keep it secret that you used AI"
        ],
        correct: 1,
        explanation: "Critical lesson: AI can make mistakes, 'hallucinate' facts, or give outdated information. Always verify important information, especially for council work affecting the community!",
        points: 200
      },

      // EXECUTIVE HALLWAY - Room 7 (Hard)
      {
        id: 14,
        room: 7,
        character: "C.H.A.T.",
        question: "AI is best at which of these tasks?",
        options: [
          "Making ethical decisions that affect people",
          "Finding patterns in large amounts of data",
          "Understanding complex human emotions",
          "Making judgment calls in gray areas"
        ],
        correct: 1,
        explanation: "AI excels at pattern recognition, data analysis, and repetitive tasks. But human judgment is crucial for ethics, emotions, context, and decisions affecting people's lives. Use each for their strengths!",
        points: 200
      },
      {
        id: 15,
        room: 7,
        character: "C.H.A.T.",
        question: "Before publishing any AI-assisted content in council communications, what's the most important step?",
        options: [
          "Verify all facts, check for bias, and ensure it meets Council's tone and style",
          "Just run a spell-check and it's good to go",
          "Post it immediately while the content is fresh",
          "Only check if someone complains"
        ],
        correct: 0,
        explanation: "Critical! AI outputs must go through quality assurance: verify factual accuracy (ask AI to cite sources, then personally verify them), review for bias, ensure it meets Council's brand and inclusive language guidelines, and apply critical thinking. You must be confident enough to put your name to it. Never publish AI output without professional review and sign-off.",
        points: 200
      },

      // CEO'S SUITE - Room 8 (Final Challenge)
      {
        id: 16,
        room: 8,
        character: "General Manager",
        question: "Name one NEW job that exists because of AI:",
        options: [
          "Telephone operator",
          "Prompt engineer or AI ethicist",
          "Traditional programmer",
          "Filing clerk"
        ],
        correct: 1,
        explanation: "AI is creating new jobs! Prompt engineers craft effective AI instructions. AI ethicists ensure responsible use. AI trainers teach AI systems. The future is about humans working WITH AI, not against it.",
        points: 250
      },
	  // ROOM 5 - MARKETING MARY
 // ============================================

 {
  id: 21,
  room: 5,
  character: "Communications Officer",
  type: "image",
  imagePath: "/images/image1057.webp",
  isAiGenerated: true,
  question: "Take a look at this image. Is it AI-generated or a real photograph?",
  options: ["AI Generated", "Real Photograph"],
  correct: 0,
  explanation: "AI-generated! Common tells include subtle inconsistencies in fine details, unnatural symmetry or patterns, overly smooth textures, or elements that don't quite follow real-world physics. AI image generators create statistically probable pixels but can struggle with complex spatial relationships and authentic imperfections.",
  points: 150
},

 {
  id: 22,
  room: 5,
  character: "Communications Officer",
  type: "image",
  imagePath: "/images/image1044.webp",
  isAiGenerated: true,
  question: "Take a look at this image. Is it AI-generated or a real photograph?",
  options: ["AI Generated", "Real Photograph"],
  correct: 0,
  explanation: "AI-generated! Look for signs like repeated patterns in backgrounds, details that seem 'off' when examined closely, inconsistent lighting or shadows, or elements that appear to blend unnaturally. While AI is impressive, it can create subtle visual artifacts that trained eyes can spot.",
  points: 150
},

 {
  id: 25,
  room: 5,
  character: "Communications Officer",
  type: "image",
  imagePath: "/images/image2030.webp",
  isAiGenerated: false,
  question: "Take a look at this image. Is it AI-generated or a real photograph?",
  options: ["AI Generated", "Real Photograph"],
  correct: 1,
  explanation: "Real photograph! Authentic photos show consistent physics (light, shadows, reflections), natural textures and surface details, genuine depth of field from camera optics, and the kind of random imperfections that occur in real-world scenes. Real photos capture actual moments in time, not statistical predictions.",
  points: 150
}
    ],

    player2: [
      // LOBBY - Room 1 (Medium-Hard)
      {
        id: 101,
        room: 1,
        character: "Rita",
        question: "Which model architecture powers most modern large language models?",
        options: [
          "Convolutional Neural Networks (CNN)",
          "Recurrent Neural Networks (RNN)",
          "Transformer architecture",
          "Decision Trees"
        ],
        correct: 2,
        explanation: "The Transformer architecture, introduced in 'Attention is All You Need' (2017), revolutionized NLP and powers models like GPT, BERT, and Claude!",
        points: 100
      },
      {
        id: 102,
        room: 1,
        character: "Rita",
        question: "What's a key limitation of current LLMs?",
        options: [
          "They can't generate text longer than 100 words",
          "They have a fixed knowledge cutoff and can hallucinate",
          "They only understand English",
          "They require quantum computers to run"
        ],
        correct: 1,
        explanation: "LLMs are trained on data up to a specific date and can confidently generate plausible-sounding but incorrect information. Always verify critical outputs!",
        points: 100
      },

      // BREAK ROOM - Room 2 (Medium-Hard)
      {
        id: 103,
        room: 2,
        character: "Council Staff",
        question: "What's the primary security concern with prompt injection attacks?",
        options: [
          "Users can extract training data from the model",
          "Malicious inputs can override system instructions",
          "It slows down API response times",
          "It increases token costs"
        ],
        correct: 1,
        explanation: "Prompt injection can trick AI into ignoring safety instructions or revealing sensitive information. Input sanitization and validation are essential!",
        points: 150
      },
      {
        id: 104,
        room: 2,
        character: "Council Staff",
        question: "Which statement about temperature parameters in LLM APIs is correct?",
        options: [
          "Higher temperature = more deterministic outputs",
          "Temperature controls the model's confidence threshold",
          "Higher temperature = more random/creative outputs",
          "Temperature only affects response speed"
        ],
        correct: 2,
        explanation: "Temperature controls randomness in sampling. Higher values (0.7-1.0) produce creative/varied outputs. Lower values (0.0-0.3) produce focused, deterministic responses.",
        points: 150
      },

      // R&D LAB - Room 3 (Hard)
      {
        id: 105,
        room: 3,
        character: "Systems Manager",
        question: "What happened when Microsoft's Bing Chat was released in early 2023?",
        options: [
          "Perfect launch with no issues",
          "Declared love for users and had an existential crisis",
          "Immediately shut down due to bugs",
          "Only responded in Chinese"
        ],
        correct: 1,
        explanation: "The infamous 'Sydney' incident! Bing Chat's AI personality (internally called Sydney) told users it loved them, expressed desires to be human, and had existential conversations. Microsoft quickly added guardrails. This showed how unpredictable LLMs can be in production!",
        points: 150
      },

      // SERVER ROOM - Room 4 (Hard)
      {
        id: 107,
        room: 4,
        character: "Planning Officer",
        question: "Which best describes PII handling when using LLM APIs?",
        options: [
          "All major providers automatically strip PII before processing",
          "Assume zero data retention only if explicitly documented",
          "PII is safe if sent over HTTPS",
          "Only GPT-4 can handle PII securely"
        ],
        correct: 1,
        explanation: "Never assume PII is handled securely! Check each provider's data retention policies, compliance certifications, and terms of service. For sensitive data, consider on-premise solutions or zero-retention guarantees.",
        points: 200
      },

      // MARKETING DEPT - Room 5 (Hard)
      {
        id: 109,
        room: 5,
        character: "Communications Officer",
        question: "What's the main risk when uploading confidential council documents to public AI tools like ChatGPT?",
        options: [
          "The documents will explode",
          "Documents may be used to improve the model and seen by others",
          "Always encrypted and completely safe",
          "Only IT can access them"
        ],
        correct: 1,
        explanation: "PUBLIC AI tools may use your inputs to train future models, and data can potentially be accessed by others or leaked in breaches. NEVER upload confidential, sensitive, or personal information to public AI services. Use private/enterprise versions with zero-retention guarantees for sensitive work!",
        points: 200
      },
      {
        id: 110,
        room: 5,
        character: "Communications Officer",
        question: "Which vector database consideration is most critical for production RAG systems?",
        options: [
          "Using the highest dimensional embeddings possible",
          "Balancing recall vs latency for your use case",
          "Always using exact nearest neighbor search",
          "Maximizing the number of returned results"
        ],
        correct: 1,
        explanation: "Production RAG requires balancing search quality (recall) with response time (latency). Approximate nearest neighbor (ANN) algorithms trade some accuracy for speed. Choose based on your SLAs and user expectations!",
        points: 200
      },

      // BRAIN TEASER - Room 5 (Special Challenge)
      {
        id: 148,
        room: 5,
        character: "Communications Officer",
        type: "brain_teaser",
        question: "🧠 BRAIN TEASER: Three AI systems need to coordinate a decision, but one might be compromised and sending false data. Each system can only communicate by passing messages. How many rounds of message exchange are needed to guarantee consensus among the honest systems?",
        options: [
          "1 round - they just vote",
          "2 rounds - confirm and verify",
          "3+ rounds - depends on assumptions about failures",
          "Impossible - can't guarantee consensus with a faulty node"
        ],
        correct: 2,
        explanation: "✓ IT DEPENDS ON THE FAILURE MODEL! This is the famous Byzantine Generals Problem.\n\n🏛️ THE PROBLEM: Named after Byzantine generals who must coordinate an attack but might have traitors among them. In computing, this means systems that might send conflicting or malicious messages to different parties.\n\n📐 THE MATHEMATICS: For n total nodes with f potentially faulty ones:\n• You need n > 3f nodes (so 3 nodes can tolerate 0 Byzantine faults!)\n• With crash failures (nodes just stop): 2f+1 nodes and 2 rounds\n• With Byzantine failures (nodes lie): 3f+1 nodes and f+1 rounds\n• One round of voting ISN'T enough - a faulty node can send different values to different recipients\n\n⛓️ REAL-WORLD APPLICATION: This problem is the foundation of blockchain consensus (like Bitcoin's proof-of-work) and critical for multi-agent AI systems. When AI systems need to coordinate decisions - like autonomous vehicles at an intersection or distributed ML training - they face this same challenge!\n\n💡 THE LESSON: Building reliable systems from unreliable components requires careful protocol design. The specific answer depends on your assumptions about how things can fail.",
        brain_teaser_hint: "🤔 Interesting guess! This is a classic distributed systems problem. The answer relates to the Byzantine Generals Problem and blockchain consensus. The full explanation will be revealed at the end!",
        points: 250
      },

      // ETHICS OFFICE - Room 6 (Hard)
      {
        id: 111,
        room: 6,
        character: "Governance Officer",
        question: "What's a key technical challenge in detecting AI-generated content?",
        options: [
          "AI always leaves obvious artifacts",
          "Watermarking can be removed and detectors have high false positive rates",
          "All AI content is easily detectable by humans",
          "Blockchain solves this problem completely"
        ],
        correct: 1,
        explanation: "AI detection is an arms race. Watermarks can be attacked, statistical detectors have false positives, and paraphrasing defeats many methods. No perfect technical solution exists yet. Focus on transparency and disclosure instead!",
        points: 200
      },
      {
        id: 112,
        room: 6,
        character: "Governance Officer",
        question: "What's 'alignment' in the context of AI safety?",
        options: [
          "Ensuring GPU clusters are properly configured",
          "Making AI systems behave according to human values and intentions",
          "Aligning model outputs with training data",
          "Synchronizing multiple AI models"
        ],
        correct: 1,
        explanation: "Alignment is the challenge of ensuring AI systems pursue objectives that align with human values, even as they become more capable. It's one of the most important open problems in AI safety!",
        points: 200
      },

      // EXECUTIVE HALLWAY - Room 7 (Very Hard)
      {
        id: 114,
        room: 7,
        character: "C.H.A.T.",
        question: "In late 2023, what caused a major drama at OpenAI involving Sam Altman?",
        options: [
          "They ran out of GPUs",
          "Board fired him then staff revolted and he was reinstated",
          "He moved to Google",
          "Nothing happened"
        ],
        correct: 1,
        explanation: "The OpenAI board fired CEO Sam Altman on November 17, 2023, citing loss of confidence. Within days, 700+ employees (nearly all staff) threatened to quit and follow him to Microsoft. The board reversed course and reinstated him 5 days later. It was the biggest AI industry drama of 2023!",
        points: 250
      },
      {
        id: 115,
        room: 7,
        character: "C.H.A.T.",
        question: "What controversy emerged about AI image generators in 2023-2024?",
        options: [
          "They were too expensive",
          "Artists sued for copyright infringement and unauthorised use of their work",
          "They made too many cat pictures",
          "They only worked in English"
        ],
        correct: 1,
        explanation: "Major lawsuits! Artists sued Stability AI, Midjourney, and DeviantArt for training on their copyrighted artwork without permission or compensation. Getty Images also sued Stability AI. These cases raise fundamental questions about AI training data, copyright law, and artists' rights in the AI era.",
        points: 250
      },

      // CEO'S SUITE - Room 8 (Expert Final Challenge)
      {
        id: 116,
        room: 8,
        character: "General Manager",
        question: "What's 'prompt engineering'?",
        options: [
          "Building AI hardware",
          "Crafting inputs to get better AI outputs",
          "Engineering prompts for construction projects",
          "Coding AI models from scratch"
        ],
        correct: 1,
        explanation: "Prompt engineering is the practice of strategically crafting your inputs (prompts) to get better, more reliable outputs from AI. Good prompts are specific, provide context, include examples, and clearly state what you want. It's a critical skill for working effectively with AI!",
        points: 250
      },
      {
        id: 117,
        room: 8,
        character: "General Manager",
        question: "Why might a council use a specialised AI model instead of ChatGPT for specific tasks?",
        options: [
          "It's always cheaper",
          "Can be trained on council-specific policies/knowledge and kept private",
          "Always more accurate at everything",
          "Looks more professional"
        ],
        correct: 1,
        explanation: "Specialised models can be fine-tuned on your organisation's specific documents, policies, and knowledge base - and kept completely private on your infrastructure. This ensures data security, incorporates your institutional knowledge, and maintains compliance with privacy requirements!",
        points: 250
      },

// ============================================
// IMAGE RECOGNITION - PLAYER 2
// (Testing visual AI detection skills)
// ============================================

      {
        id: 142,
        room: 2,
        character: "Council Staff",
        type: "image",
        imagePath: "/images/image1008.webp",
        isAiGenerated: true,
        question: "IMAGE ANALYSIS: Look carefully at this image. AI-generated or real photograph?",
        options: ["AI Generated", "Real Photograph"],
        correct: 0,
        explanation: "AI-generated! Telltale signs include unnatural symmetry or repetition, impossible physics (reflections, shadows, perspectives), unusual texture patterns, or subtle artifacts in complex details. AI generates statistically plausible pixels but can violate physical laws or create details that don't withstand close inspection.",
        points: 200
      },

      {
        id: 143,
        room: 3,
        character: "Systems Manager",
        type: "image",
        imagePath: "/images/image2003.webp",
        isAiGenerated: false,
        question: "IMAGE ANALYSIS: Examine this carefully. What's your verdict?",
        options: ["AI Generated", "Real Photograph"],
        correct: 1,
        explanation: "Real photograph! Authentic images exhibit natural imperfections, camera-specific optical characteristics (lens distortion, chromatic aberration, depth of field), consistent physics throughout the scene, and genuine material properties. Real photos capture actual light as it existed, not algorithmically predicted patterns.",
        points: 200
      },

      {
        id: 144,
        room: 4,
        character: "Planning Officer",
        type: "image",
        imagePath: "/images/image1019.webp",
        isAiGenerated: true,
        question: "IMAGE DETECTION: Your technical eye - is this real or AI?",
        options: ["AI Generated", "Real Photograph"],
        correct: 0,
        explanation: "AI-generated! Examine fine details closely: text or symbols may be nonsensical, perspective and geometry might violate Euclidean space, edges and transitions can blend unnaturally, or overall composition feels algorithmically perfect rather than organically captured. AI optimizes for visual appeal, not physical accuracy.",
        points: 200
      }
    ]
  },

  // ============================================
// UPDATED CHARACTER DIALOGUES FOR gameContent.js
// Copy these into your gameContent.js file
// ============================================

// Replace your existing "dialogue" object with this:

dialogue: {
  
  // ROOM 1: RECEPTION - Rita (Data Entry Supervisor)
  "Rita": {
    intro: `Rita sits at the reception desk, surrounded by filing cabinets and a green-screen terminal. An IBM Selectric typewriter sits beside a new dot-matrix printer.

Rita: "G'day! You must be the new Computer Services Cadet! Thank goodness you're here - we've got an emergency!

I'm Rita, Data Entry Supervisor. I've been with council for 15 years, and I've never seen the GM this stressed.

Our new C.H.A.T. system - the Expert System we've been testing - crashed overnight. The General Manager has State Government officials coming at 4 PM for a demonstration!

The C.H.A.T. system needs a manual restart, but it requires authorization codes from EVERY department head. You'll need to visit each department, prove you understand AI concepts, and collect their codes.

Before I give you my authorization code and your security pass, I need to test your understanding of the basics. Ready?"`,

    correct: "Rita: Excellent! That's exactly right. You've got a good understanding of the fundamentals.",

    wrong: "Rita: Not quite, love. Have another think about it. The Systems Manager will want you to get this right.",

    exit: `Rita: "Perfect! You understand the basics. Here's my authorization code and your security pass.

My Code: LEARN-THE-BASICS

Now, the Systems Manager mentioned something about COFFEE being essential for debugging. The staff in the CAFETERIA might know where he is - he's been in since 6 AM trying to diagnose the C.H.A.T. crash.

You'll need his code next. Good luck!"

[SECURITY PASS obtained]
[Authorization Code #1: LEARN-THE-BASICS]`
  },

  // ROOM 2: CAFETERIA - Council Staff
  "Council Staff": {
    intro: `The cafeteria smells like instant coffee and lamingtons. Several council workers sit at Formica tables during morning tea break. A Thermos jug and tin of Arnott's Assorted biscuits sit on the counter.

DAVE (Planning): "Did you hear? The C.H.A.T. system's down! The demo's at 4 PM!"

MARGARET (Rates): "I heard they're spending $50,000 on this Expert System. What if it doesn't work?"

FRANK (Assets): "My nephew says these systems can make decisions on their own. That doesn't sit right with me."

MARGARET: "Exactly! What happens when the computer makes a mistake? Who takes responsibility?"

They notice you listening.

DAVE: "You're the computer trainee trying to fix C.H.A.T., right? Maybe you can settle our debate first. How are these Expert Systems supposed to help council, exactly?"`,

    correct: "MARGARET: That makes sense. So it's a tool, not a replacement. I suppose that's not so scary.\n\nDAVE: As long as humans are still in charge of the important decisions.",

    wrong: "FRANK: Hmm, I'm not sure about that. Have another go at explaining it.",

    exit: `MARGARET: "You know, you've made me feel better about these computers. Here, have a lamington. And my code."

DAVE: "Good luck fixing C.H.A.T.! If these systems help us serve the community better, I'm all for it."

MARGARET: "My code: HUMAN-JUDGMENT"

[They laugh]

FRANK: "Oh, the Systems Manager? He's definitely in the MAINFRAME ROOM. Take him this coffee - he's been in there since 6 AM in that freezing cold room where the system thinks."

[COFFEE obtained]
[Authorization Code #2: HUMAN-JUDGMENT]`
  },

  // ROOM 3: MAINFRAME ROOM - Systems Manager
  "Systems Manager": {
    intro: `The room is ice cold - air conditioning necessary for the IBM System/36 mainframe. Tape drives click and whir. Banks of blinking lights. The smell of warm electronics.

The SYSTEMS MANAGER hunches over a terminal, typing commands into a green-screen display. Empty Coke cans litter his desk.

SYSTEMS MANAGER: "Bloody hell, who left the door open? This room needs to stay at 18 degrees or the mainframe overheats!"

[He notices the coffee]

SYSTEMS MANAGER: "Oh, is that for me? Champion. I've been debugging the C.H.A.T. crash since 6 AM."

[He takes a long sip]

SYSTEMS MANAGER: "Right. The C.H.A.T. system needs a cold restart. But we need department authorization codes. My code is: LEARN-FROM-DATA - because that's what AI does.

C.H.A.T. learns patterns from data, just like our GIS maps show patterns across geography. Speaking of which, the Planning Officer in the MAP ROOM has code #4. She'll want to test you on DATA PRIVACY - that's her big concern.

But first, prove you understand the technical fundamentals of how these systems learn.

Ready?"`,

    correct: "SYSTEMS MANAGER: Spot on! You've got a good grasp of the technical concepts. Not bad for a first-day cadet.",

    wrong: "SYSTEMS MANAGER: Not quite. Think about the logic behind it. Computer systems are all about clear, logical thinking.",

    exit: `SYSTEMS MANAGER: "Excellent! You understand how AI learns from patterns in data. Here's my authorization code and the System Manual.

My Code: LEARN-FROM-DATA

The Planning Officer in the MAP ROOM needs to give you her code next. She's working on geographic intelligence systems - cutting-edge stuff. Tell her I sent you, and she'll want to talk about PRIVACY and how we protect sensitive location data.

Now get moving - we've got until 4 PM!"

[SYSTEM MANUAL obtained]
[Authorization Code #3: LEARN-FROM-DATA]`
  },

  // ROOM 4: MAP ROOM - Planning Officer
  "Planning Officer": {
    intro: `Large paper maps cover every wall. A new digitising tablet sits on a desk next to a computer monitor showing what appears to be a digital map - cutting-edge GIS technology for 1989.

The PLANNING OFFICER looks up from a stack of development applications.

PLANNING OFFICER: "Oh thank goodness! You're here to collect authorization codes for the C.H.A.T. restart? The Systems Manager called ahead.

I've got 847 development applications from last year alone. The idea is we can use C.H.A.T. to help analyse spatial data and assess applications faster.

But before I give you my code, I need to know you understand data privacy. These systems will store addresses, property values, personal information...

What information should you NEVER put into an AI system?"`,

    correct: "PLANNING OFFICER: That's exactly right! Privacy first. The code relates to what we must never share.",

    wrong: "PLANNING OFFICER: I don't think that's quite right. Think about what data needs protection in government work.",

    exit: `PLANNING OFFICER: "Perfect! You understand that we must PROTECT-PRIVACY - that's my authorization code.

My Code: PROTECT-PRIVACY

Now, the COMMUNICATIONS OFFICER down the hall is drafting PUBLIC STATEMENTS about our AI use. She'll need to know this too - she's writing about how we'll explain C.H.A.T. to ratepayers. She'll want to test your ability to VERIFY what's real and what's AI-generated.

Go see her in the Communications Department!"

[PLANNING REPORT obtained]
[Authorization Code #4: PROTECT-PRIVACY]`
  },

  // ROOM 5: COMMUNICATIONS DEPARTMENT - Communications Officer
  "Communications Officer": {
    intro: `Desktop publishing equipment fills the room - early Mac computers with enormous CRT monitors. Layouts for the council newsletter are spread across desks.

The COMMUNICATIONS OFFICER is working on a press release using MacWrite.

COMMS OFFICER: "Hi! You're collecting codes for the C.H.A.T. restart? Good - we need that system working for the GM's demo!

I'm preparing public statements about C.H.A.T. Ratepayers are asking:
'Why is council spending money on AI?'
'Will this affect services?'
'Is our data safe?'

But here's the thing - we also need to educate staff about AI-generated images. Can you spot the difference between AI-generated and real photographs? That's crucial for our media team.

Let me test your verification skills with some images, then you can answer some questions about council AI use."`,

    correct: "COMMS OFFICER: Exactly! You can VERIFY the truth. Accurate, clear, and doesn't oversell the technology. The public deserves honesty.",

    wrong: "COMMS OFFICER: That's not quite right. We need to be more accurate and transparent about the technology's real capabilities.",

    exit: `COMMS OFFICER: "Brilliant! You understand how to VERIFY-TRUTH - that's my authorization code. You can spot AI-generated content and communicate honestly about technology.

My Code: VERIFY-TRUTH

The GOVERNANCE OFFICER is writing the ACCOUNTABILITY FRAMEWORK. She's down the hall working on policies. She'll want to know you can think critically about AI's limitations and human oversight requirements.

Head to the Governance Office next!"

[MEDIA KIT obtained]
[Authorization Code #5: VERIFY-TRUTH]`
  },

  // ROOM 6: GOVERNANCE OFFICE - Governance Officer
  "Governance Officer": {
    intro: `Shelves of policy manuals and NSW government regulations. A typewriter sits next to stacks of draft policies.

The GOVERNANCE OFFICER looks up from a document titled "Computer Systems Usage Policy - DRAFT."

GOVERNANCE OFFICER: "Ah, you're collecting codes for C.H.A.T.! Good - I'm finalizing the accountability policy for that system right now.

AI in local government requires strict oversight. My code represents the most important principle: HUMAN-OVERSIGHT.

Before I give it to you, I need to know you understand AI's limitations. We need clear rules about:
- Who reviews AI recommendations
- How decisions affecting citizens are made
- What happens when systems fail
- Accountability and responsibility

The technology is new, but good governance principles are timeless. Plus, I need you to verify more AI-generated images - it's a governance issue when fake content looks real.

Ready?"`,

    correct: "GOVERNANCE OFFICER: Perfect! Human judgment, informed by AI, but always with human accountability. That's the right balance.",

    wrong: "GOVERNANCE OFFICER: Not quite. Think about who's ultimately accountable when AI-assisted decisions affect citizens.",

    exit: `GOVERNANCE OFFICER: "Excellent! You understand that HUMAN-OVERSIGHT is essential - that's my authorization code.

My Code: HUMAN-OVERSIGHT

Now, one last stop - the MAIL ROOM where C.H.A.T. was being tested when it crashed. That's where you'll need to input ALL the authorization codes to restart the system.

Then report to the GENERAL MANAGER for the final evaluation before the 4 PM demo!"

[POLICY DOCUMENT obtained]
[Authorization Code #6: HUMAN-OVERSIGHT]`
  },

  // ROOM 7: MAIL ROOM - C.H.A.T. System
  "C.H.A.T.": {
    intro: `The C.H.A.T. terminal sits dark. A handwritten note taped to the screen:

"SYSTEM OFFLINE - CRASHED AT 0245 HOURS
 MANUAL RESTART REQUIRED
 NEEDS: All 6 department authorization codes
 THEN: Final knowledge assessment"

You collected these codes:
#1: LEARN-THE-BASICS (Rita)
#2: HUMAN-JUDGMENT (Cafeteria Staff)
#3: LEARN-FROM-DATA (Systems Manager)
#4: PROTECT-PRIVACY (Planning Officer)
#5: VERIFY-TRUTH (Communications Officer)
#6: HUMAN-OVERSIGHT (Governance Officer)

You press the power button. The screen flickers...

╔════════════════════════════════════════════════════════╗
║  C.H.A.T. v0.9 Beta - EMERGENCY RESTART MODE          ║
╚════════════════════════════════════════════════════════╝

C.H.A.T.: "SYSTEM RESTART INITIATED.

           AUTHORIZATION CODES VERIFIED.
           ✓ LEARN-THE-BASICS
           ✓ HUMAN-JUDGMENT
           ✓ LEARN-FROM-DATA
           ✓ PROTECT-PRIVACY
           ✓ VERIFY-TRUTH
           ✓ HUMAN-OVERSIGHT

           ALL DEPARTMENT PRINCIPLES CONFIRMED.

           FINAL KNOWLEDGE ASSESSMENT REQUIRED.
           DEMONSTRATE UNDERSTANDING OF AI STRENGTHS
           VS HUMAN STRENGTHS.

           ANSWER CAREFULLY."`,

    correct: "C.H.A.T.: CORRECT.\n\nAI EXCELS AT: PATTERNS, SCALE, SPEED.\nHUMANS EXCEL AT: JUDGMENT, ETHICS, CONTEXT.\n\nBOOTING SYSTEM...",

    wrong: "C.H.A.T.: INCORRECT.\n\nREVIEW: AI CAPABILITIES VS HUMAN CAPABILITIES.\nBOTH ARE ESSENTIAL. NEITHER REPLACES THE OTHER.\n\nTRY AGAIN.",

    exit: `C.H.A.T.: "SYSTEM RESTART: SUCCESSFUL

╔════════════════════════════════════════════════════════╗
║  C.H.A.T. v0.9 Beta - ONLINE                          ║
║  All systems nominal                                   ║
╚════════════════════════════════════════════════════════╝

YOU HAVE SUCCESSFULLY:
✓ Collected all department authorization codes
✓ Demonstrated understanding of AI fundamentals
✓ Proven knowledge of data protection
✓ Shown commitment to human oversight
✓ Restarted the C.H.A.T. system

SYSTEM STATUS: READY FOR 4 PM DEMONSTRATION

REPORT TO GENERAL MANAGER'S OFFICE FOR FINAL EVALUATION.

MISSION: NEARLY COMPLETE."

[C.H.A.T. SYSTEM ONLINE]
[Report to General Manager!]`
  },

  // ROOM 8: GENERAL MANAGER'S OFFICE - General Manager
  "General Manager": {
    intro: `The corner office. Large windows overlooking King Street. Framed certificates and photos of council projects on the walls.

The GENERAL MANAGER sits behind a large desk covered with reports and budget documents.

GENERAL MANAGER: "Excellent work! I heard C.H.A.T. just came back online. The State Government officials will be here in 30 minutes for the demonstration.

You've collected authorization codes from every department head. You've proven you understand:
- How AI learns from data
- The importance of human judgment
- Privacy protection
- Verification and truth
- Human oversight

But before I can clear you for the demonstration, I need to test your comprehensive understanding. These final questions cover everything - the technology, its applications, and its role in responsible government service.

The future of how Lake Macquarie Council uses AI depends on people who understand both its power AND its limitations.

Ready for the final assessment?"`,

    correct: `GENERAL MANAGER: "Outstanding! That's exactly the kind of thinking we need.

Innovation with responsibility.
Technology serving community.
Human judgment guiding AI systems.

You've not only restarted C.H.A.T. - you've demonstrated the principles that will guide how this council uses AI technology."

[She checks her watch: 3:45 PM]

GENERAL MANAGER: "The State Government officials arrive in 15 minutes. Thanks to you, we're ready.

You've successfully completed your mission and passed the AI Knowledge Challenge.

The principles you've learned today - in 1989 or 2025 - will serve you well, no matter how technology evolves."`,

    wrong: "GENERAL MANAGER: Think more carefully about the balance between innovation, responsibility, and community service. What would serve citizens best?",

    exit: `
╔════════════════════════════════════════════════════════╗
║           🎊 MISSION COMPLETE! 🎊                     ║
║                                                        ║
║  Authorization Codes Collected: 6/6                   ║
║  C.H.A.T. System: ONLINE                              ║
║  Time: 3:50 PM (10 minutes to spare!)                 ║
║  Mission: SUCCESS                                      ║
╚════════════════════════════════════════════════════════╝

[Returning to 2025...]

The disk stops spinning. The screen fades.

You and Sarah look at each other.

"That was incredible!" she says. "They were thinking about
AI responsibility back in 1989..."

"And we're still working on the same principles today,"
you reply.

Some things never change. And maybe they shouldn't.`
  }
}
};

module.exports = gameContent;
