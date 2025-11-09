// Game Content: Rooms, Characters, Questions, and Story

const gameContent = {
// Updated Game Content - 1980s Lake Macquarie City Council Theme
// Replace the rooms array in your gameContent.js with this

// ============================================
// ROOM DESCRIPTIONS - Also update these
// ============================================

// In your rooms array, update the descriptions to include 1989 details:

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

Rita's desk is cluttered with manila folders and a daily planner. A sign on the wall reads "COMPUTER SERVICES - Authorised Personnel Only."`,
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

Morning tea is in full swing. The smell of Tim Tams and instant coffee fills the air. A radio in the corner plays 2GO.`,
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

The IBM System/36 mainframe dominates the room. Red and green LEDs blink rhythmically. The temperature is noticeably cold - 18°C exactly.`,
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

Paper maps of Lake Macquarie cover the walls. A new computer sits in the corner running early GIS software - very cutting-edge for 1989.`,
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

Macintosh computers hum quietly. PageMaker templates are open on screen. Draft newsletters are pinned to a corkboard.`,
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

Floor-to-ceiling shelves of policy manuals. A copy of the Local Government Act 1919 sits open on the desk. A typewriter clacks in the adjacent office.`,
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

Mail sorting racks line the walls. A computer terminal displays the C.H.A.T. system interface. A "BETA TEST IN PROGRESS" sign hangs on the door.`,
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

The executive suite. A large mahogany desk. Windows overlook King Street Newcastle. Photos of council projects line the walls - the new library, road construction, community centres.`,
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
        explanation: "AI learns by analyzing huge amounts of training data and finding patterns - like how you learned to recognize cats by seeing many examples! It doesn't have real-time internet access or read like we do.",
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
        character: "Communications Officer",
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
      {
        id: 13,
        room: 6,
        character: "Governance Officer",
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
      {
        id: 17,
        room: 8,
        character: "General Manager",
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
        character: "General Manager",
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
        character: "General Manager",
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
        character: "General Manager",
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
  character: "Communications Officer",
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
  character: "Communications Officer",
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
  character: "Communications Officer",
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
  character: "Communications Officer",
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
  character: "Communications Officer",
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
  character: "Communications Officer",
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
  character: "Communications Officer",
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
  character: "Communications Officer",
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
  character: "Communications Officer",
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
  character: "Communications Officer",
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
  character: "Communications Officer",
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
  character: "Communications Officer",
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
  character: "Governance Officer",
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
  character: "Governance Officer",
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
  character: "Governance Officer",
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
  character: "Governance Officer",
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
  character: "Governance Officer",
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
  character: "Governance Officer",
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
  character: "Governance Officer",
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
  character: "Governance Officer",
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
  character: "Governance Officer",
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
  character: "Governance Officer",
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
  character: "Governance Officer",
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
  character: "Governance Officer",
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
        character: "Systems Manager",
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
      {
        id: 108,
        room: 4,
        character: "Planning Officer",
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
        character: "Communications Officer",
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
      {
        id: 113,
        room: 6,
        character: "Governance Officer",
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
        character: "General Manager",
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
        character: "General Manager",
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
        character: "General Manager",
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
        character: "General Manager",
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
        character: "General Manager",
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

  // ============================================
// UPDATED CHARACTER DIALOGUES FOR gameContent.js
// Copy these into your gameContent.js file
// ============================================

// Replace your existing "dialogue" object with this:

dialogue: {
  
  // ROOM 1: RECEPTION - Rita (Data Entry Supervisor)
  "Rita": {
    intro: `Rita sits at the reception desk, surrounded by filing cabinets and a green-screen terminal. An IBM Selectric typewriter sits beside a new dot-matrix printer.

Rita: "G'day! You must be the new Computer Services Cadet! Welcome to your first day in the Electronic Data Processing Department.

I'm Rita, Data Entry Supervisor. I've been with council for 15 years - started with punch cards, if you can believe that!

Before I give you your security pass, I need to make sure you understand the basics of our new computer systems. The Systems Manager is very particular about this.

Don't worry - these are straightforward questions about how we use computers here at council."`,
    
    correct: "Rita: Excellent! That's exactly right. You've got a good understanding of the fundamentals.",
    
    wrong: "Rita: Not quite, love. Have another think about it. The Systems Manager will want you to get this right.",
    
    exit: `Rita: "Well done! Here's your security pass. You'll need this to access other departments.

The Staff Cafeteria is just down the hall if you need a cuppa. But your schedule says you should visit the Mainframe Room next to meet the Systems Manager.

Good luck!"

[SECURITY PASS obtained]`
  },

  // ROOM 2: CAFETERIA - Council Staff
  "Council Staff": {
    intro: `The cafeteria smells like instant coffee and lamingtons. Several council workers sit at Formica tables during morning tea break. A Thermos jug and tin of Arnott's Assorted biscuits sit on the counter.

DAVE (Planning): "Another new trainee? They're really pushing this computer thing, aren't they?"

MARGARET (Rates): "I heard they're spending $50,000 on the new mainframe upgrade. That's ratepayers' money!"

FRANK (Assets): "My nephew says these 'Expert Systems' can make decisions on their own. That doesn't sit right with me."

MARGARET: "Exactly! What happens when the computer makes a mistake? Who takes responsibility?"

They notice you listening.

DAVE: "Since you're the computer trainee, maybe you can settle our debate. How are these systems supposed to help council, exactly?"`,
    
    correct: "MARGARET: That makes sense. So it's a tool, not a replacement. I suppose that's not so scary.\n\nDAVE: As long as humans are still in charge of the important decisions.",
    
    wrong: "FRANK: Hmm, I'm not sure about that. Have another go at explaining it.",
    
    exit: `MARGARET: "You know, you've made me feel better about these computers. Here, have a lamington."

DAVE: "Good luck with your training. If these systems help us serve the community better, I'm all for it. Just don't let the machines take over!"

[They all laugh]

FRANK: "Oh, before you go - can you take this coffee to the Systems Manager? He's been in the Mainframe Room since 6 AM and probably hasn't eaten."

[COFFEE obtained]
[Understanding of AI/human partnership gained]`
  },

  // ROOM 3: MAINFRAME ROOM - Systems Manager
  "Systems Manager": {
    intro: `The room is ice cold - air conditioning necessary for the IBM System/36 mainframe. Tape drives click and whir. Banks of blinking lights. The smell of warm electronics.

The SYSTEMS MANAGER hunches over a terminal, typing commands into a green-screen display. Empty Coke cans litter his desk.

SYSTEMS MANAGER: "Bloody hell, who left the door open? This room needs to stay at 18 degrees or the mainframe overheats!"

[He notices the coffee]

SYSTEMS MANAGER: "Oh, is that for me? Champion. I've been debugging this database routine since dawn."

[He takes a long sip]

SYSTEMS MANAGER: "Right. You're the new cadet. I'm supposed to teach you about the technical side of our systems.

Fair warning: this gets a bit complex. But if you want to understand how these 'Expert Systems' work, you need to understand the fundamentals.

Ready?"`,
    
    correct: "SYSTEMS MANAGER: Spot on! You've got a good grasp of the technical concepts. Not bad for a first-day cadet.",
    
    wrong: "SYSTEMS MANAGER: Not quite. Think about the logic behind it. Computer systems are all about clear, logical thinking.",
    
    exit: `SYSTEMS MANAGER: "Not bad! You've got a decent grasp of the technical concepts. Here's the System Manual - you'll need it to understand the data structures in other departments.

The Planning Officer in the Map Room has been asking for help understanding how our new GIS databases work. You might be able to help her now.

And for god's sake, close the door on your way out!"

[SYSTEM MANUAL obtained]
[Map Room now accessible]`
  },

  // ROOM 4: MAP ROOM - Planning Officer
  "Planning Officer": {
    intro: `Large paper maps cover every wall. A new digitising tablet sits on a desk next to a computer monitor showing what appears to be a digital map - cutting-edge GIS technology for 1989.

The PLANNING OFFICER looks up from a stack of development applications.

PLANNING OFFICER: "Oh thank goodness! Are you from the EDP Department? I'm drowning in data and I don't understand half of what this new GIS system can do.

We've got 847 development applications from last year alone. The idea is we can use spatial data and the Expert System to help assess them faster.

But I'm worried about privacy. These systems store addresses, property values, personal information...

How do we make sure this data is used responsibly?"`,
    
    correct: "PLANNING OFFICER: That's what I thought too. Transparency is important, but so is privacy. It's about finding the balance.",
    
    wrong: "PLANNING OFFICER: I don't think that's quite right. Think about the balance between public access and individual privacy.",
    
    exit: `PLANNING OFFICER: "You know, you've helped me understand this technology better. It's not about replacing good planning judgement - it's about having better information to support our decisions.

Here, take this Planning Report. It shows how we're using data responsibly. The Communications team might find it useful for explaining this to the public.

Good luck with the rest of your training!"

[PLANNING REPORT obtained]
[Communications Department now accessible]`
  },

  // ROOM 5: COMMUNICATIONS DEPARTMENT - Communications Officer
  "Communications Officer": {
    intro: `Desktop publishing equipment fills the room - early Mac computers with enormous CRT monitors. Layouts for the council newsletter are spread across desks.

The COMMUNICATIONS OFFICER is working on a press release using MacWrite.

COMMS OFFICER: "Hi! You're the computer trainee, right? Perfect timing. I need help explaining our new computer systems to the public.

Ratepayers are asking questions:
'Why is council spending money on computers?'
'Will this affect services?'
'Is our data safe?'

We need to communicate clearly and honestly about what these systems do and don't do. No jargon, no overselling the technology.

Can you help me fact-check some claims?"`,
    
    correct: "COMMS OFFICER: Exactly! Accurate, clear, and doesn't oversell the technology. The public deserves honesty about what these systems can and can't do.",
    
    wrong: "COMMS OFFICER: That's not quite right. We need to be more accurate and transparent about the technology's real capabilities.",
    
    exit: `COMMS OFFICER: "Brilliant! You understand how to communicate about technology honestly. Here's the Media Kit we're preparing - it includes all the key messages.

You should visit the Governance Office next. They're developing the policy framework for how we use these systems.

That's where the real important work happens!"

[MEDIA KIT obtained]
[Governance Office now accessible]`
  },

  // ROOM 6: GOVERNANCE OFFICE - Governance Officer
  "Governance Officer": {
    intro: `Shelves of policy manuals and NSW government regulations. A typewriter sits next to stacks of draft policies.

The GOVERNANCE OFFICER looks up from a document titled "Computer Systems Usage Policy - DRAFT."

GOVERNANCE OFFICER: "Ah, you must be the new cadet! Excellent timing. I'm finalising our policies for the Expert System.

We need clear rules about:
- Who can access what data
- How decisions are reviewed
- What happens when systems fail
- Accountability and responsibility

The technology is new, but good governance principles are timeless.

Let's test your understanding of responsible system use."`,
    
    correct: "GOVERNANCE OFFICER: Perfect! Human judgement informed by system analysis. That's the right balance of technology and accountability.",
    
    wrong: "GOVERNANCE OFFICER: Not quite. Think about who's ultimately accountable when decisions affect citizens.",
    
    exit: `GOVERNANCE OFFICER: "Excellent work. You understand that good governance isn't about blocking innovation - it's about ensuring innovation serves the public good responsibly.

Here's the final Policy Document. You'll need this for your meeting with the General Manager.

But first, stop by the Mail Room. That's where C.H.A.T. is being tested - our experimental Expert System assistant."

[POLICY DOCUMENT obtained]
[Mail Room now accessible]`
  },

  // ROOM 7: MAIL ROOM - C.H.A.T. System
  "C.H.A.T.": {
    intro: `A computer terminal sits in the corner, connected to the mainframe. A sign reads:

"C.H.A.T. PILOT PROGRAMME
 Council Helper for Automated Tasks
 
 BETA TEST - SUPERVISED USE ONLY"

The screen displays:

╔════════════════════════════════════════════════════════╗
║  C.H.A.T. v0.9 Beta                                    ║
║  Council Helper for Automated Tasks                    ║
║                                                        ║
║  This Expert System provides assistance with:          ║
║  - Document retrieval                                  ║
║  - Database queries                                    ║
║  - Policy lookup                                       ║
║  - Workflow guidance                                   ║
║                                                        ║
║  WARNING: This is experimental technology.             ║
║  Always verify C.H.A.T.'s suggestions with humans.     ║
╚════════════════════════════════════════════════════════╝

As you approach, C.H.A.T. boots up:

C.H.A.T.: "GREETINGS. I AM C.H.A.T.
           COUNCIL HELPER FOR AUTOMATED TASKS.

           YOU ARE: COMPUTER SERVICES CADET
           STATUS: IN TRAINING

           BEFORE YOU PROCEED TO THE GENERAL MANAGER,
           YOU MUST DEMONSTRATE UNDERSTANDING OF
           RESPONSIBLE AI IMPLEMENTATION.

           I WILL ASK QUESTIONS. ANSWER CAREFULLY.

           READY?"`,
    
    correct: "C.H.A.T.: CORRECT.\n\nAI SYSTEMS LIKE ME ARE TOOLS.\nUSE ME FOR EFFICIENCY.\nBUT VERIFY BEFORE CITIZEN IMPACT.\n\nPROCEEDING TO FINAL ASSESSMENT...",
    
    wrong: "C.H.A.T.: INCORRECT.\n\nREVIEW RESPONSIBLE AI PRINCIPLES.\nCONSIDER: ACCOUNTABILITY, TRANSPARENCY, HUMAN OVERSIGHT.\n\nTRY AGAIN.",
    
    exit: `C.H.A.T.: "ASSESSMENT COMPLETE.

YOU HAVE DEMONSTRATED:
✓ UNDERSTANDING OF DATA PROTECTION
✓ KNOWLEDGE OF SYSTEM CAPABILITIES
✓ AWARENESS OF PRIVACY CONCERNS
✓ COMMITMENT TO TRANSPARENCY
✓ RESPECT FOR HUMAN ACCOUNTABILITY
✓ RESPONSIBLE AI IMPLEMENTATION

CERTIFICATION: APPROVED

PROCEED TO GENERAL MANAGER'S OFFICE FOR FINAL EVALUATION.

GOOD LUCK, CADET."

[C.H.A.T. CERTIFICATION obtained]
[General Manager's Office now accessible]`
  },

  // ROOM 8: GENERAL MANAGER'S OFFICE - General Manager
  "General Manager": {
    intro: `The corner office. Large windows overlooking King Street. Framed certificates and photos of council projects on the walls.

The GENERAL MANAGER sits behind a large desk covered with reports and budget documents.

GENERAL MANAGER: "Come in, sit down. I've been following your progress through the departments today.

I've got councillors asking tough questions about our computer spending. Ratepayers worried about privacy. Staff concerned about their jobs.

The Systems Manager says this Expert System technology could revolutionise how we serve the community. The Governance Officer says we need careful controls.

You've been through all the departments. You've learned the technical details and the governance principles.

Now I need YOUR recommendation.

Should Lake Macquarie Council proceed with full implementation of our Expert System programme?"`,
    
    correct: `GENERAL MANAGER: "That's exactly what I needed to hear.

Innovation with responsibility.
Technology in service of community.
Human judgement supported by systems.

That's how Lake Macquarie Council will approach this technology."

[He signs your completion certificate]

GENERAL MANAGER: "Congratulations, Cadet. You've successfully completed the AI Knowledge Challenge.

The principles you've learned today will serve you well, no matter how technology evolves.

Welcome to the future of council operations."`,
    
    wrong: "GENERAL MANAGER: Think more carefully about the balance between innovation and responsibility. What would serve the community best?",
    
    exit: `
╔════════════════════════════════════════════════════════╗
║          🎊 CHALLENGE COMPLETE - 1989 🎊               ║
╚════════════════════════════════════════════════════════╝

[Returning to 2025...]`
  }
}
};

module.exports = gameContent;
