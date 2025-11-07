// Game Content: Rooms, Characters, Questions, and Story

const gameContent = {
// Updated Game Content - 1980s Lake Macquarie City Council Theme
// Replace the rooms array in your gameContent.js with this

  rooms: [
    {
      id: 1,
      name: "RECEPTION",
      description: "You stand in the reception area of Lake Macquarie City Council. Wood-panelled walls display community notices. A bulky IBM terminal glows green on the curved desk. RECEPTIONIST RITA adjusts her headset, the switchboard blinking behind her.",
      background: "lobby",
      character: "RITA",
      exits: ["CAFETERIA", "MAINFRAME ROOM"]
    },
    {
      id: 2,
      name: "CAFETERIA",
      description: "The staff cafeteria smells of instant coffee and lamingtons. A vintage pie warmer hums in the corner. COUNCIL STAFF huddle around a table discussing the new computer system over their smoko break. A Newcastle Herald lies open on the counter.",
      background: "breakroom",
      character: "EMPLOYEES",
      exits: ["RECEPTION", "MAINFRAME ROOM"]
    },
    {
      id: 3,
      name: "MAINFRAME ROOM",
      description: "The council's computing heart - a magnificent IBM System/36 mainframe fills half the room, tape drives whirring. THE SYSTEMS ADMIN monitors blinking lights and adjusts dials. The air conditioning battles against the heat. A sign warns: 'AUTHORISED PERSONNEL ONLY'.",
      background: "lab",
      character: "SYSTEMS ADMIN",
      exits: ["RECEPTION", "MAP ROOM"]
    },
    {
      id: 4,
      name: "MAP ROOM",
      description: "Floor-to-ceiling cabinets hold yellowed planning maps and blueprints of Lake Macquarie. THE PLANNING OFFICER hunches over a drafting table, calculator and ruler in hand. A massive wall map shows every suburb from Swansea to Morisset. Microfiche readers line one wall.",
      background: "server",
      character: "PLANNING OFFICER",
      exits: ["MAINFRAME ROOM", "COMMUNICATIONS"]
    },
    {
      id: 5,
      name: "COMMUNICATIONS",
      description: "Posters promoting council services cover the walls - 'Rates Due March 31!' and 'Report Potholes Here'. THE COMMS OFFICER reviews draft press releases on a word processor. A Gestetner duplicator sits ready to run off copies for the local papers.",
      background: "marketing",
      character: "COMMS OFFICER",
      exits: ["MAP ROOM", "GOVERNANCE"]
    },
    {
      id: 6,
      name: "GOVERNANCE",
      description: "A quiet office lined with binders labelled 'Local Government Act 1919' and council policies. THE GOVERNANCE OFFICER reviews bylaws and regulations, ensuring everything follows proper procedure. A framed photo of the Premier hangs on the wall. 'Serving the Community with Integrity' reads a plaque.",
      background: "ethics",
      character: "GOVERNANCE OFFICER",
      exits: ["COMMUNICATIONS", "MAIL ROOM"]
    },
    {
      id: 7,
      name: "MAIL ROOM",
      description: "The nerve centre of council communications. Pneumatic tubes connect to other departments. Pigeonholes overflow with inter-office memos. C.H.A.T. (Council's Helpful Automated Terminal) sits on a trolley, its green screen offering assistance. Mail stamps and date stampers line the bench.",
      background: "hallway",
      character: "C.H.A.T.",
      exits: ["GOVERNANCE", "GENERAL MANAGER"]
    },
    {
      id: 8,
      name: "GENERAL MANAGER",
      description: "The General Manager's office overlooks Lake Macquarie through venetian blinds. A polished jarrah desk holds neat stacks of reports and a heavy Bakelite telephone. THE GENERAL MANAGER's chair slowly turns to face you. Behind them, certificates and civic awards line the wall.",
      background: "ceo",
      character: "GENERAL MANAGER",
      exits: []
    }
  ],


  questions: {
    player1: [
      // LOBBY - Room 1 (Easy warm-up)
      {
        id: 1,
        room: 1,
        character: "RITA",
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
        character: "RITA",
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
        character: "EMPLOYEES",
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
        character: "EMPLOYEES",
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
        character: "DR. NEURON",
        question: "What's the best description of how AI 'learns'?",
        options: [
          "It downloads new information from the internet in real-time",
          "It finds patterns in training data, like learning from examples",
          "Programmers manually teach it every possible answer",
          "It reads books the same way humans do"
        ],
        correct: 1,
        explanation: "AI learns by analyzing huge amounts of training data and finding patterns - like how you learned to recognize cats by seeing many examples! It doesn't have real-time internet access or read like we do.",
        points: 150
      },
      {
        id: 6,
        room: 3,
        character: "DR. NEURON",
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
        character: "HACKER HAL",
        question: "What information should you NEVER put into any AI tool?",
        options: [
          "Questions about your work projects",
          "Citizens' personal details or confidential data",
          "Requests to help write documents",
          "Public information from your council website"
        ],
        correct: 1,
        explanation: "Crucial for council work! Never input personal information, confidential data, or anything covered by privacy laws. Assume AI providers might see what you type. When in doubt, leave it out!",
        points: 150
      },
      {
        id: 8,
        room: 4,
        character: "HACKER HAL",
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
        character: "MARKETING MARY",
        question: "What's one way councils around Australia are using AI?",
        options: [
          "Analyzing community survey responses and feedback",
          "Making final decisions on development applications",
          "Replacing elected councillors",
          "Predicting lottery numbers for revenue"
        ],
        correct: 0,
        explanation: "Many councils use AI to analyze community feedback quickly, spot trends in service requests, and improve customer service. AI assists - humans decide!",
        points: 150
      },
      {
        id: 10,
        room: 5,
        character: "MARKETING MARY",
        question: "In what year did AI first beat a human world champion at chess?",
        options: [
          "1985",
          "1997",
          "2005",
          "2016"
        ],
        correct: 1,
        explanation: "In 1997, IBM's Deep Blue defeated world champion Garry Kasparov! People thought it was the end of chess. Instead, chess became more popular than ever, and humans + AI together play the best chess!",
        points: 150
      },

      // ETHICS OFFICE - Room 6 (Medium-Hard)
      {
        id: 11,
        room: 6,
        character: "ETHICS EDGAR",
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
        character: "ETHICS EDGAR",
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
      {
        id: 13,
        room: 6,
        character: "ETHICS EDGAR",
        question: "When should you mention that AI helped create something?",
        options: [
          "Never - keep it secret",
          "Only if someone asks directly",
          "When transparency matters (reports, public docs, etc.)",
          "Only for creative writing"
        ],
        correct: 2,
        explanation: "For council work, transparency builds trust! It's good practice to acknowledge when AI assisted with drafting, especially for public-facing documents. You're still responsible for the final content.",
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
        question: "What should you check before using AI-generated images in council materials?",
        options: [
          "Copyright, licensing, and accuracy",
          "Only if it looks aesthetically pleasing",
          "Just that it loads properly",
          "Your manager's birthday"
        ],
        correct: 0,
        explanation: "Important! AI-generated images can have licensing restrictions, may contain errors, or might depict things that don't exist. Always check rights, accuracy, and appropriateness before publishing.",
        points: 200
      },

      // CEO'S SUITE - Room 8 (Final Challenge)
      {
        id: 16,
        room: 8,
        character: "CEO CYPHER",
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
      {
        id: 17,
        room: 8,
        character: "CEO CYPHER",
        question: "If AI gives you a wrong answer, whose responsibility is it?",
        options: [
          "Entirely the AI's - it failed",
          "Entirely yours - you asked poorly",
          "Shared - you're responsible for reviewing and using it correctly",
          "The AI company's - sue them"
        ],
        correct: 2,
        explanation: "You're responsible for how you use AI outputs! Like any tool, you must use it appropriately, verify results, and make final decisions. AI assists, humans are accountable.",
        points: 250
      },
      {
        id: 18,
        room: 8,
        character: "CEO CYPHER",
        question: "How might AI help council planners in 5 years?",
        options: [
          "Replace all human planners entirely",
          "Analyze trends, simulate scenarios, draft reports faster",
          "Make final DA decisions automatically",
          "Eliminate the need for community consultation"
        ],
        correct: 1,
        explanation: "AI's future in councils: faster data analysis, better trend spotting, automated routine tasks, and enhanced decision support. But human judgment, community connection, and accountability remain essential!",
        points: 250
      },
      {
        id: 19,
        room: 8,
        character: "CEO CYPHER",
        question: "What's the key difference between AI and traditional automation?",
        options: [
          "There is no difference - same thing",
          "AI can learn and adapt, automation follows fixed rules",
          "Automation is always smarter",
          "AI is only for big companies"
        ],
        correct: 1,
        explanation: "Great question! Traditional automation follows rigid 'if-this-then-that' rules. AI can learn from data, recognize patterns, and handle situations it wasn't explicitly programmed for. Both are useful!",
        points: 250
      },
      {
        id: 20,
        room: 8,
        character: "CEO CYPHER",
        question: "Complete this: 'AI is a tool that works best when...'",
        options: [
          "Left alone to make all decisions independently",
          "Combined with human judgment and oversight",
          "Given control of important matters",
          "Used without any human review"
        ],
        correct: 1,
        explanation: "🏆 Perfect! AI + humans = best results. AI handles scale, speed, and patterns. Humans provide judgment, ethics, context, and accountability. Together, we can do amazing things for our communities!",
        points: 250
      },
	  // ROOM 5 - MARKETING MARY
 // ============================================

 {
  id: 21,
  room: 5,
  character: "MARKETING MARY",
  type: "image",
  imagePath: "/images/image1057.webp",
  isAiGenerated: true,
  question: "Take a look at this image. Is it AI-generated or a real photograph?",
  options: ["AI Generated", "Real Photograph"],
  correct: 0,
  explanation: "AI-generated! Look closely at the hands - notice any extra or missing fingers? AI often struggles with hand anatomy.",
  points: 150
},

 {
  id: 22,
  room: 5,
  character: "MARKETING MARY",
  type: "image",
  imagePath: "/images/image1044.webp",
  isAiGenerated: true,
  question: "Take a look at this image. Is it AI-generated or a real photograph?",
  options: ["AI Generated", "Real Photograph"],
  correct: 0,
  explanation: "AI-generated! Check the background - see any repeated patterns or inconsistent details? Classic AI tells.",
  points: 150
},

 {
  id: 23,
  room: 5,
  character: "MARKETING MARY",
  type: "image",
  imagePath: "/images/image1029.webp",
  isAiGenerated: true,
  question: "Take a look at this image. Is it AI-generated or a real photograph?",
  options: ["AI Generated", "Real Photograph"],
  correct: 0,
  explanation: "AI-generated! Notice the unnatural smoothness and overly perfect features? AI creates an uncanny valley effect.",
  points: 150
},

 {
  id: 24,
  room: 5,
  character: "MARKETING MARY",
  type: "image",
  imagePath: "/images/image1028.webp",
  isAiGenerated: true,
  question: "Take a look at this image. Is it AI-generated or a real photograph?",
  options: ["AI Generated", "Real Photograph"],
  correct: 0,
  explanation: "AI-generated! Look at any text in the image - is it gibberish or distorted? AI can't handle text properly yet.",
  points: 150
},

 {
  id: 25,
  room: 5,
  character: "MARKETING MARY",
  type: "image",
  imagePath: "/images/image2030.webp",
  isAiGenerated: false,
  question: "Take a look at this image. Is it AI-generated or a real photograph?",
  options: ["AI Generated", "Real Photograph"],
  correct: 1,
  explanation: "Real photograph! The skin texture, natural lighting, and authentic details are consistent with camera capture.",
  points: 150
},

 {
  id: 26,
  room: 5,
  character: "MARKETING MARY",
  type: "image",
  imagePath: "/images/image2000.webp",
  isAiGenerated: false,
  question: "Take a look at this image. Is it AI-generated or a real photograph?",
  options: ["AI Generated", "Real Photograph"],
  correct: 1,
  explanation: "Real photograph! Notice how all elements fit together naturally - real photos have authentic coherence.",
  points: 150
},

 {
  id: 27,
  room: 5,
  character: "MARKETING MARY",
  type: "image",
  imagePath: "/images/image2038.webp",
  isAiGenerated: false,
  question: "Take a look at this image. Is it AI-generated or a real photograph?",
  options: ["AI Generated", "Real Photograph"],
  correct: 1,
  explanation: "Real photograph! The imperfections and genuine moments captured show this is real photography, not AI.",
  points: 150
},

 {
  id: 28,
  room: 5,
  character: "MARKETING MARY",
  type: "image",
  imagePath: "/images/image2007.webp",
  isAiGenerated: false,
  question: "Take a look at this image. Is it AI-generated or a real photograph?",
  options: ["AI Generated", "Real Photograph"],
  correct: 1,
  explanation: "Real photograph! Camera sensor characteristics and optical properties visible in the image prove authenticity.",
  points: 150
},

 {
  id: 29,
  room: 5,
  character: "MARKETING MARY",
  type: "image",
  imagePath: "/images/image1049.webp",
  isAiGenerated: true,
  question: "Take a look at this image. Is it AI-generated or a real photograph?",
  options: ["AI Generated", "Real Photograph"],
  correct: 0,
  explanation: "AI-generated! Check reflections and mirrors - do they make physical sense? AI struggles with accurate reflections.",
  points: 150
},

 {
  id: 30,
  room: 5,
  character: "MARKETING MARY",
  type: "image",
  imagePath: "/images/image1024.webp",
  isAiGenerated: true,
  question: "Take a look at this image. Is it AI-generated or a real photograph?",
  options: ["AI Generated", "Real Photograph"],
  correct: 0,
  explanation: "AI-generated! For portraits, look at eyes and teeth - unnatural patterns reveal synthetic generation.",
  points: 150
},

 {
  id: 31,
  room: 5,
  character: "MARKETING MARY",
  type: "image",
  imagePath: "/images/image1061.webp",
  isAiGenerated: true,
  question: "Take a look at this image. Is it AI-generated or a real photograph?",
  options: ["AI Generated", "Real Photograph"],
  correct: 0,
  explanation: "AI-generated! Look closely at the hands - notice any extra or missing fingers? AI often struggles with hand anatomy.",
  points: 150
},

{
  id: 32,
  room: 5,
  character: "MARKETING MARY",
  type: "image",
  imagePath: "/images/image1015.webp",
  isAiGenerated: true,
  question: "Take a look at this image. Is it AI-generated or a real photograph?",
  options: ["AI Generated", "Real Photograph"],
  correct: 0,
  explanation: "AI-generated! Check the background - see any repeated patterns or inconsistent details? Classic AI tells.",
  points: 150
},

 // ============================================
 // ROOM 6 - ETHICS EDGAR
 // ============================================

 {
  id: 33,
  room: 6,
  character: "ETHICS EDGAR",
  type: "image",
  imagePath: "/images/image1031.webp",
  isAiGenerated: true,
  question: "Another image to analyse. What do you think?",
  options: ["AI Generated", "Real Photograph"],
  correct: 0,
  explanation: "AI-generated! Notice asymmetrical features or impossible geometries? AI sometimes creates surreal inconsistencies.",
  points: 150
},

 {
  id: 34,
  room: 6,
  character: "ETHICS EDGAR",
  type: "image",
  imagePath: "/images/image2011.webp",
  isAiGenerated: false,
  question: "Another image to analyse. What do you think?",
  options: ["AI Generated", "Real Photograph"],
  correct: 1,
  explanation: "Real photograph! Notice how all elements fit together naturally - real photos have authentic coherence.",
  points: 150
},

 {
  id: 35,
  room: 6,
  character: "ETHICS EDGAR",
  type: "image",
  imagePath: "/images/image2002.webp",
  isAiGenerated: false,
  question: "Another image to analyse. What do you think?",
  options: ["AI Generated", "Real Photograph"],
  correct: 1,
  explanation: "Real photograph! The imperfections and genuine moments captured show this is real photography, not AI.",
  points: 150
},

 {
  id: 36,
  room: 6,
  character: "ETHICS EDGAR",
  type: "image",
  imagePath: "/images/image2005.webp",
  isAiGenerated: false,
  question: "Another image to analyse. What do you think?",
  options: ["AI Generated", "Real Photograph"],
  correct: 1,
  explanation: "Real photograph! Camera sensor characteristics and optical properties visible in the image prove authenticity.",
  points: 150
},

 {
  id: 37,
  room: 6,
  character: "ETHICS EDGAR",
  type: "image",
  imagePath: "/images/image2012.webp",
  isAiGenerated: false,
  question: "Another image to analyse. What do you think?",
  options: ["AI Generated", "Real Photograph"],
  correct: 1,
  explanation: "Real photograph! Notice the natural imperfections, authentic lighting, and camera characteristics like grain and lens effects.",
  points: 150
},

 {
  id: 38,
  room: 6,
  character: "ETHICS EDGAR",
  type: "image",
  imagePath: "/images/image1070.webp",
  isAiGenerated: true,
  question: "Another image to analyse. What do you think?",
  options: ["AI Generated", "Real Photograph"],
  correct: 0,
  explanation: "AI-generated! Look closely at the hands - notice any extra or missing fingers? AI often struggles with hand anatomy.",
  points: 150
},

 {
  id: 39,
  room: 6,
  character: "ETHICS EDGAR",
  type: "image",
  imagePath: "/images/image2025.webp",
  isAiGenerated: false,
  question: "Another image to analyse. What do you think?",
  options: ["AI Generated", "Real Photograph"],
  correct: 1,
  explanation: "Real photograph! Check the natural expressions and authentic context - everything makes physical sense.",
  points: 150
},

 {
  id: 40,
  room: 6,
  character: "ETHICS EDGAR",
  type: "image",
  imagePath: "/images/image1032.webp",
  isAiGenerated: true,
  question: "Another image to analyse. What do you think?",
  options: ["AI Generated", "Real Photograph"],
  correct: 0,
  explanation: "AI-generated! Notice the unnatural smoothness and overly perfect features? AI creates an uncanny valley effect.",
  points: 150
},

 {
  id: 41,
  room: 6,
  character: "ETHICS EDGAR",
  type: "image",
  imagePath: "/images/image2059.webp",
  isAiGenerated: false,
  question: "Another image to analyse. What do you think?",
  options: ["AI Generated", "Real Photograph"],
  correct: 1,
  explanation: "Real photograph! The skin texture, natural lighting, and authentic details are consistent with camera capture.",
  points: 150
},

 {
  id: 42,
  room: 6,
  character: "ETHICS EDGAR",
  type: "image",
  imagePath: "/images/image1054.webp",
  isAiGenerated: true,
  question: "Another image to analyse. What do you think?",
  options: ["AI Generated", "Real Photograph"],
  correct: 0,
  explanation: "AI-generated! Check the lighting and shadows - are they physically consistent? AI often gets physics wrong.",
  points: 150
},

 {
  id: 43,
  room: 6,
  character: "ETHICS EDGAR",
  type: "image",
  imagePath: "/images/image1047.webp",
  isAiGenerated: true,
  question: "Another image to analyse. What do you think?",
  options: ["AI Generated", "Real Photograph"],
  correct: 0,
  explanation: "AI-generated! Notice asymmetrical features or impossible geometries? AI sometimes creates surreal inconsistencies.",
  points: 150
},

 {
  id: 44,
  room: 6,
  character: "ETHICS EDGAR",
  type: "image",
  imagePath: "/images/image1063.webp",
  isAiGenerated: true,
  question: "Final image challenge! Can you identify this one?",
  options: ["AI Generated", "Real Photograph"],
  correct: 0,
  explanation: "AI-generated! Look for subtle artifacts around complex objects. AI blends and hallucinates details.",
  points: 150
},
    ],

    player2: [
      // LOBBY - Room 1 (Medium-Hard)
      {
        id: 101,
        room: 1,
        character: "RITA",
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
        character: "RITA",
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
        character: "EMPLOYEES",
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
        character: "EMPLOYEES",
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
        character: "DR. NEURON",
        question: "In the context of machine learning, what does 'overfitting' mean?",
        options: [
          "Model performs too well on training data but poorly on new data",
          "Model is too large for production deployment",
          "Training takes too long to complete",
          "Model requires too much GPU memory"
        ],
        correct: 0,
        explanation: "Overfitting occurs when a model memorizes training data instead of learning generalizable patterns. It performs well on training data but fails on unseen data. Regularization and validation sets help prevent this!",
        points: 150
      },
      {
        id: 106,
        room: 3,
        character: "DR. NEURON",
        question: "What's the primary advantage of few-shot learning over fine-tuning?",
        options: [
          "Few-shot is always more accurate",
          "Few-shot doesn't require modifying model weights",
          "Few-shot works without any examples",
          "Few-shot is always cheaper"
        ],
        correct: 1,
        explanation: "Few-shot learning uses examples in the prompt to guide behavior without updating model parameters. It's faster to implement and doesn't require training infrastructure, though fine-tuning can achieve better performance for specific tasks.",
        points: 150
      },

      // SERVER ROOM - Room 4 (Hard)
      {
        id: 107,
        room: 4,
        character: "HACKER HAL",
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
      {
        id: 108,
        room: 4,
        character: "HACKER HAL",
        question: "What's a critical production consideration when deploying AI services?",
        options: [
          "Always use the largest model available",
          "Implement rate limiting, monitoring, and fallback mechanisms",
          "Store API keys in frontend code for faster access",
          "Disable error logging to reduce overhead"
        ],
        correct: 1,
        explanation: "Production AI services need robust infrastructure: rate limiting prevents abuse, monitoring catches issues, fallbacks handle API failures, and proper secrets management protects credentials. Don't treat AI as magic - treat it as critical infrastructure!",
        points: 200
      },

      // MARKETING DEPT - Room 5 (Hard)
      {
        id: 109,
        room: 5,
        character: "MARKETING MARY",
        question: "What's the primary limitation of RAG (Retrieval Augmented Generation)?",
        options: [
          "It can't work with unstructured text data",
          "Quality depends heavily on retrieval accuracy and relevance",
          "It requires fine-tuning the base model",
          "It only works with small datasets"
        ],
        correct: 1,
        explanation: "RAG's effectiveness depends on retrieving the RIGHT documents. Poor retrieval = irrelevant context = poor outputs. Vector similarity doesn't guarantee semantic relevance. Hybrid search and reranking can help!",
        points: 200
      },
      {
        id: 110,
        room: 5,
        character: "MARKETING MARY",
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

      // ETHICS OFFICE - Room 6 (Hard)
      {
        id: 111,
        room: 6,
        character: "ETHICS EDGAR",
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
        character: "ETHICS EDGAR",
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
      {
        id: 113,
        room: 6,
        character: "ETHICS EDGAR",
        question: "Which statement about bias in AI training data is most accurate?",
        options: [
          "More data always reduces bias",
          "Bias in training data can lead to discriminatory outputs even with technical debiasing",
          "Bias can be completely eliminated through preprocessing",
          "Only small models exhibit bias"
        ],
        correct: 1,
        explanation: "Bias is deeply embedded in training data reflecting historical inequities. Technical debiasing helps but can't fully solve social problems. Diverse teams, careful evaluation, and human oversight are essential, especially for public sector use!",
        points: 200
      },

      // EXECUTIVE HALLWAY - Room 7 (Very Hard)
      {
        id: 114,
        room: 7,
        character: "C.H.A.T.",
        question: "What's the primary advantage of mixture-of-experts (MoE) architectures?",
        options: [
          "They always produce more accurate results",
          "They can achieve better efficiency by activating only relevant experts",
          "They eliminate the need for training data",
          "They work without any transformer blocks"
        ],
        correct: 1,
        explanation: "MoE models route inputs to specialized 'expert' networks, activating only a subset for each input. This allows huge parameter counts while keeping inference costs manageable. Used in models like GPT-4 and Mixtral!",
        points: 250
      },
      {
        id: 115,
        room: 7,
        character: "C.H.A.T.",
        question: "What's a key challenge in evaluating LLM performance?",
        options: [
          "LLMs always score 100% on benchmarks",
          "Benchmarks can be gamed and may not reflect real-world use",
          "Evaluation is computationally free",
          "All benchmarks measure the same capabilities"
        ],
        correct: 1,
        explanation: "LLM evaluation is hard! Models can memorize benchmarks, benchmarks may not capture nuanced capabilities, and correlation with human preferences is imperfect. Use multiple evaluation methods and real-world testing!",
        points: 250
      },

      // CEO'S SUITE - Room 8 (Expert Final Challenge)
      {
        id: 116,
        room: 8,
        character: "CEO CYPHER",
        question: "What's the primary difference between RLHF and supervised fine-tuning?",
        options: [
          "RLHF uses human feedback as a reward signal during training",
          "Supervised fine-tuning is always more expensive",
          "RLHF doesn't require any training data",
          "They're the same thing with different names"
        ],
        correct: 0,
        explanation: "RLHF (Reinforcement Learning from Human Feedback) trains a reward model from human preferences, then uses RL to optimize the language model. Supervised fine-tuning directly trains on demonstration examples. RLHF often produces more aligned outputs!",
        points: 250
      },
      {
        id: 117,
        room: 8,
        character: "CEO CYPHER",
        question: "Why might smaller, specialized models outperform larger general models?",
        options: [
          "Smaller models are always better",
          "They can be optimized for specific domains with less overhead",
          "Larger models can't learn specialized knowledge",
          "Size is the only factor that matters"
        ],
        correct: 1,
        explanation: "Domain-specific models trained or fine-tuned on relevant data often outperform general models on specialized tasks while being faster and cheaper to run. Right tool for the right job!",
        points: 250
      },
      {
        id: 118,
        room: 8,
        character: "CEO CYPHER",
        question: "What's a critical consideration for AI system observability in production?",
        options: [
          "Only log successful requests",
          "Track token usage, latency, error rates, and output quality metrics",
          "Observability is only needed during development",
          "Never log prompts due to privacy concerns"
        ],
        correct: 1,
        explanation: "Production AI needs comprehensive monitoring: costs (tokens), performance (latency), reliability (errors), and quality (output metrics). Balance privacy concerns with debugging needs. You can't improve what you don't measure!",
        points: 250
      },
      {
        id: 119,
        room: 8,
        character: "CEO CYPHER",
        question: "What's the main trade-off when choosing context window size?",
        options: [
          "Larger contexts are always better with no downsides",
          "Larger contexts enable more information but increase cost and latency",
          "Context size doesn't affect performance",
          "Smaller contexts always produce better outputs"
        ],
        correct: 1,
        explanation: "Larger context windows let you include more information but increase token costs and processing time. Many models also show 'lost in the middle' effects. Include relevant context, but don't waste tokens!",
        points: 250
      },
      {
        id: 120,
        room: 8,
        character: "CEO CYPHER",
        question: "What's the most important principle for responsible AI deployment in government?",
        options: [
          "Use the most advanced model available",
          "Maintain human oversight, transparency, and accountability",
          "Automate all decisions for efficiency",
          "Keep AI usage hidden from the public"
        ],
        correct: 1,
        explanation: "🏆 Exactly! For government AI: humans make final decisions, explain how AI was used, maintain accountability, test for bias, protect privacy, and serve all citizens fairly. Technical excellence + ethical responsibility!",
        points: 250
      }
    ],
    
    player2: [
      // Player 2 (technical) questions
      // Add your advanced/technical questions here
      // For now, this is empty but properly structured
    ]
  },

  dialogue: {
    RITA: {
      intro: "G'day! Welcome to SYNAPSE SYSTEMS INC. You must be the new recruit! Before you explore, I need to test your AI knowledge. Don't worry - if you get stuck, C.H.A.T. can help!",
      correct: "Brilliant! You're a quick learner!",
      wrong: "Not quite! Have another go, or ask C.H.A.T. for a hint!"
    },
    EMPLOYEES: {
      intro: "Hey there! We were just discussing AI at work. Want to join the conversation? Answer a question or two!",
      correct: "Exactly! You get it!",
      wrong: "Hmm, not quite. Think it through or check with C.H.A.T.!"
    },
    "DR. NEURON": {
      intro: "Ah! A curious mind enters my laboratory! Before you proceed, prove you understand the fundamentals of artificial intelligence!",
      correct: "Excellent! Your neural pathways are firing correctly!",
      wrong: "Interesting hypothesis, but incorrect! Recalibrate and try again!"
    },
    "HACKER HAL": {
      intro: "Hold up! The server room isn't for amateurs. Answer this correctly and I'll grant you access.",
      correct: "Not bad! You've earned passage.",
      wrong: "Access denied! Try again or talk to C.H.A.T.!"
    },
    "MARKETING MARY": {
      intro: "Perfect timing! I'm preparing a presentation about AI's real-world impact. Help me verify these facts!",
      correct: "Yes! That's going straight into my presentation!",
      wrong: "Oops, that won't work! Let me clarify..."
    },
    "ETHICS EDGAR": {
      intro: "Welcome to the Ethics Office. Here we consider AI's impact on society. These questions matter for responsible use.",
      correct: "Wise answer. You understand the responsibility.",
      wrong: "Consider the implications more carefully. What does this mean for citizens?"
    },
    "C.H.A.T.": {
      intro: "I am C.H.A.T. - the company's AI system. Ironic that you need to understand AI to reach the CEO who created me. One final test!",
      correct: "Logical. You may proceed.",
      wrong: "Error in reasoning. Recalculate."
    },
    "CEO CYPHER": {
      intro: "You've made it to my office. Impressive. But can you truly understand what AI means for our future? These final questions will reveal the truth...",
      correct: "Fascinating. You truly understand.",
      wrong: "Interesting perspective, but reconsider..."
    }
  }
};

module.exports = gameContent;
