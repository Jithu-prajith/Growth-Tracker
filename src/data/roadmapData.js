// Striver's SDE Sheet inspired curriculum for Shri Prajith S
// Generous time estimates, direct high-quality resources, and progressive unlocking.

export const ROADMAP_PHASES = [
  {
    id: 'phase-1',
    phaseNumber: 1,
    title: 'Phase 1: Foundations',
    subtitle: 'Month 1–2: Master Modern JavaScript & Web Layouts from scratch',
    unlockRequirement: null, // Always unlocked
    modules: [
      {
        id: 'p1-m1',
        name: 'JavaScript Core (Complete Beginner to Solid Intermediate)',
        resource: 'javascript.info & Namaste JavaScript (Akshay Saini, YouTube)',
        resourceUrl: 'https://javascript.info',
        topics: [
          { id: 'p1-t1', name: 'Variables, data types, and operators', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'p1-t2', name: 'Functions, scope, execution context & closures', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '' },
          { id: 'p1-t3', name: 'Arrays & essential methods (map, filter, reduce)', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '' },
          { id: 'p1-t4', name: 'Objects, prototypes & prototype inheritance', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'p1-t5', name: 'DOM manipulation & element traversal', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '' },
          { id: 'p1-t6', name: 'Events, event bubbling, capture & delegation', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'p1-t7', name: 'Promises, async/await & modern Fetch API', estTime: '4 hrs', estHours: 4, completed: false, loggedHours: 0, notes: '' },
          { id: 'p1-t8', name: 'ES6+ features (arrow functions, destructuring, spread/rest)', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'p1-t9', name: 'Error handling with try/catch & custom errors', estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
        ]
      },
      {
        id: 'p1-m2',
        name: 'HTML & CSS Refresh',
        resource: 'Kevin Powell (YouTube, free)',
        resourceUrl: 'https://www.youtube.com/@KevinPowell',
        topics: [
          { id: 'p1-t10', name: 'Semantic HTML & accessibility basics', estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
          { id: 'p1-t11', name: 'Flexbox — 1D layout mastery', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'p1-t12', name: 'CSS Grid — 2D complex interfaces', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'p1-t13', name: 'Responsive design & mobile-first media queries', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
        ]
      }
    ]
  },
  {
    id: 'phase-2',
    phaseNumber: 2,
    title: 'Phase 2: DSA in Python',
    subtitle: 'Month 2–5: 1 problem/day — Striver A2Z & NeetCode',
    unlockRequirement: { phaseId: 'phase-1', threshold: 70, description: 'Complete 70% of Phase 1 to unlock' },
    modules: [
      {
        id: 'p2-m1',
        name: 'Arrays & Strings Patterns',
        resource: "Striver's A2Z DSA Sheet + NeetCode",
        resourceUrl: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2',
        topics: [
          { id: 'p2-t1', name: "Two Pointers Pattern (3 weeks)", estTime: '10 hrs', estHours: 10, completed: false, loggedHours: 0, notes: '' },
          { id: 'p2-t2', name: "Sliding Window Pattern", estTime: '8 hrs', estHours: 8, completed: false, loggedHours: 0, notes: '' },
          { id: 'p2-t3', name: "Prefix Sum & Range Queries", estTime: '6 hrs', estHours: 6, completed: false, loggedHours: 0, notes: '' },
          { id: 'p2-t4', name: "Kadane's Algorithm (Max Subarray)", estTime: '4 hrs', estHours: 4, completed: false, loggedHours: 0, notes: '' },
        ]
      },
      {
        id: 'p2-m2',
        name: 'Linear Data Structures',
        resource: 'NeetCode 150 (YouTube & NeetCode.io)',
        resourceUrl: 'https://neetcode.io',
        topics: [
          { id: 'p2-t5', name: 'HashMaps & Sets (1 week)', estTime: '7 hrs', estHours: 7, completed: false, loggedHours: 0, notes: '' },
          { id: 'p2-t6', name: 'Stacks & Queues (1 week)', estTime: '7 hrs', estHours: 7, completed: false, loggedHours: 0, notes: '' },
          { id: 'p2-t7', name: 'Linked Lists — Singly, Doubly & Cycles (1 week)', estTime: '7 hrs', estHours: 7, completed: false, loggedHours: 0, notes: '' },
          { id: 'p2-t8', name: 'Binary Search & Search Space Reduction (1 week)', estTime: '8 hrs', estHours: 8, completed: false, loggedHours: 0, notes: '' },
        ]
      },
      {
        id: 'p2-m3',
        name: 'Hierarchical & Advanced Algorithms',
        resource: 'takeuforward.org (Striver SDE Sheet)',
        resourceUrl: 'https://takeuforward.org',
        topics: [
          { id: 'p2-t9', name: 'Recursion & Backtracking (Subsets, Permutations - 2 weeks)', estTime: '12 hrs', estHours: 12, completed: false, loggedHours: 0, notes: '' },
          { id: 'p2-t10', name: 'Trees (Binary Tree, BST) — BFS & DFS Traversals', estTime: '10 hrs', estHours: 10, completed: false, loggedHours: 0, notes: '' },
          { id: 'p2-t11', name: 'Tree Properties — Height, Diameter & LCA (2 weeks)', estTime: '8 hrs', estHours: 8, completed: false, loggedHours: 0, notes: '' },
          { id: 'p2-t12', name: 'Graphs (Basics) — BFS, DFS & Connected Components (2 weeks)', estTime: '12 hrs', estHours: 12, completed: false, loggedHours: 0, notes: '' },
          { id: 'p2-t13', name: 'Dynamic Programming (Intro) — Fibonacci & 0/1 Knapsack', estTime: '10 hrs', estHours: 10, completed: false, loggedHours: 0, notes: '' },
          { id: 'p2-t14', name: 'Dynamic Programming — Longest Common Subsequence (2 weeks)', estTime: '8 hrs', estHours: 8, completed: false, loggedHours: 0, notes: '' },
        ]
      }
    ]
  },
  {
    id: 'phase-3',
    phaseNumber: 3,
    title: 'Phase 3: ServiceNow Platform',
    subtitle: 'Month 3–6: ITSM, Platform Architecture, Scripting & CSA Certification',
    unlockRequirement: { phaseId: 'phase-1', threshold: 50, description: 'Complete 50% of Phase 1 to unlock' },
    modules: [
      {
        id: 'p3-m1',
        name: 'ITSM Concepts',
        resource: 'Now Learning (nowlearning.servicenow.com)',
        resourceUrl: 'https://nowlearning.servicenow.com',
        topics: [
          { id: 'p3-t1', name: 'What is ITSM & ITIL framework', estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
          { id: 'p3-t2', name: 'Incident Management lifecycle', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'p3-t3', name: 'Problem Management & Root Cause Analysis', estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
          { id: 'p3-t4', name: 'Change Management & CAB approvals', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'p3-t5', name: 'Service Catalog & Request Fulfillment', estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
        ]
      },
      {
        id: 'p3-m2',
        name: 'ServiceNow Platform Basics',
        resource: 'ServiceNow PDI (Personal Developer Instance)',
        resourceUrl: 'https://developer.servicenow.com',
        topics: [
          { id: 'p3-t6', name: 'Navigating the platform & Next Experience UI', estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
          { id: 'p3-t7', name: 'Tables and records (Sys_id, Schema Map)', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'p3-t8', name: 'Forms and lists customization', estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
          { id: 'p3-t9', name: 'Filters, breadcrumbs, and conditions', estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
          { id: 'p3-t10', name: 'User administration, groups & roles', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
        ]
      },
      {
        id: 'p3-m3',
        name: 'ServiceNow Scripting (JavaScript)',
        resource: 'Now Learning & YouTube "ServiceNow Guru"',
        resourceUrl: 'https://developer.servicenow.com',
        topics: [
          { id: 'p3-t11', name: 'Client Scripts (onLoad, onChange, onSubmit, onCellEdit)', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '' },
          { id: 'p3-t12', name: 'Business Rules (before, after, async, display)', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '' },
          { id: 'p3-t13', name: 'Script Includes & GlideAjax calls', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'p3-t14', name: 'UI Policies and UI Actions', estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
          { id: 'p3-t15', name: 'Flow Designer (No-code enterprise automation)', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '' },
        ]
      },
      {
        id: 'p3-m4',
        name: 'ServiceNow Integrations & CSA Prep',
        resource: 'Developer PDI & CSA Exam Specs',
        resourceUrl: 'https://developer.servicenow.com',
        topics: [
          { id: 'p3-t16', name: 'REST API basics in ServiceNow (REST API Explorer)', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '' },
          { id: 'p3-t17', name: 'Scripted REST APIs creation', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'p3-t18', name: 'Import sets & Transform Maps', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'p3-t19', name: 'CSA Exam Prep: Mock tests practice', estTime: '5 hrs', estHours: 5, completed: false, loggedHours: 0, notes: '' },
          { id: 'p3-t20', name: 'CSA Exam Prep: Flashcards & Core Revision', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '' },
        ]
      }
    ]
  },
  {
    id: 'phase-4',
    phaseNumber: 4,
    title: 'Phase 4: Web Development Stack',
    subtitle: 'Month 4–7: React.js, Node.js, Express & MongoDB (Full MERN)',
    unlockRequirement: { phaseId: 'phase-1', threshold: 80, description: 'Complete 80% of Phase 1 to unlock' },
    modules: [
      {
        id: 'p4-m1',
        name: 'React.js Mastery',
        resource: 'Chai aur Code (Hitesh Choudhary, YouTube, free)',
        resourceUrl: 'https://www.youtube.com/@chaiaurcode',
        topics: [
          { id: 'p4-t1', name: 'Deep dive into hooks (useState, useEffect, useContext)', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '' },
          { id: 'p4-t2', name: 'React Router DOM (Nested routes & loaders)', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'p4-t3', name: 'State management basics & Context API', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'p4-t4', name: 'API calls, Axios & TanStack Query patterns', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'p4-t5', name: 'Building a full MERN production project', estTime: '10 hrs', estHours: 10, completed: false, loggedHours: 0, notes: '' },
        ]
      },
      {
        id: 'p4-m2',
        name: 'Node.js + Express.js Backend',
        resource: 'Chai aur Code backend series',
        resourceUrl: 'https://www.youtube.com/@chaiaurcode',
        topics: [
          { id: 'p4-t6', name: 'Routing & Express server architecture', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'p4-t7', name: 'Middleware pipeline & error handling', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'p4-t8', name: 'RESTful API design best practices & JWT auth', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '' },
          { id: 'p4-t9', name: 'MongoDB + Mongoose models, schemas & aggregation', estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '' },
        ]
      }
    ]
  },
  {
    id: 'phase-5',
    phaseNumber: 5,
    title: 'Phase 5: System Design Basics',
    subtitle: 'Month 8–10: High-Level Architecture & Scalability Principles',
    unlockRequirement: { phaseId: 'phase-4', threshold: 60, description: 'Complete 60% of Phase 4 to unlock' },
    modules: [
      {
        id: 'p5-m1',
        name: 'Core System Design Concepts',
        resource: 'Gaurav Sen & ByteByteGo (YouTube, free)',
        resourceUrl: 'https://www.youtube.com/@gkcs',
        topics: [
          { id: 'p5-t1', name: 'What is system design & scalability fundamentals', estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
          { id: 'p5-t2', name: 'Client-server model & HTTP/WebSocket protocols', estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
          { id: 'p5-t3', name: 'REST vs GraphQL comparison & trade-offs', estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
          { id: 'p5-t4', name: 'Databases: SQL vs NoSQL, ACID vs BASE', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
          { id: 'p5-t5', name: 'Caching basics (Redis, eviction policies)', estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
          { id: 'p5-t6', name: 'Load balancing strategies (Round Robin, Least Conn)', estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
          { id: 'p5-t7', name: 'Designing a URL shortener (Classic beginner problem)', estTime: '2 hrs', estHours: 2, completed: false, loggedHours: 0, notes: '' },
        ]
      }
    ]
  },
  {
    id: 'phase-6',
    phaseNumber: 6,
    title: 'Phase 6: Japanese Language',
    subtitle: 'Timothy G. Stout — Tuttle Publishing (226 Pages) + College Course',
    unlockRequirement: null, // Ongoing in parallel
    bookMeta: {
      title: "Japanese Hiragana & Katakana for Beginners",
      author: "Timothy G. Stout",
      publisher: "Tuttle Publishing",
      totalPages: 226
    },
    modules: [
      {
        id: 'p6-m1',
        name: 'HIRAGANA (Tuttle Publishing, pp. 13–99)',
        resource: 'Book: Timothy G. Stout + Genki I + JapanesePod101',
        resourceUrl: 'https://www.japanesepod101.com',
        topics: [
          { id: 'p6-t1', name: 'Section 1: The Basic 46 Hiragana Characters', page: 'p. 13', pageNum: 13, estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '' },
          { id: 'p6-t2', name: 'Reading Practice 1: あ ~ そ', page: 'p. 29', pageNum: 29, estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
          { id: 'p6-t3', name: 'Reading Practice 2: た ~ ほ', page: 'p. 45', pageNum: 45, estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
          { id: 'p6-t4', name: 'Reading Practice 3: ま ~ ん', page: 'p. 62', pageNum: 62, estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
          { id: 'p6-t5', name: 'Section 2: Usage Rules — Rule 1: Tenten and Maru', page: 'p. 64', pageNum: 64, estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
          { id: 'p6-t6', name: 'Section 2: Usage Rules — Rule 2: Combined Characters', page: 'p. 74', pageNum: 74, estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
          { id: 'p6-t7', name: 'Section 2: Usage Rules — Rule 3: Long Vowels', page: 'p. 82', pageNum: 82, estTime: '30 min', estHours: 0.5, completed: false, loggedHours: 0, notes: '' },
          { id: 'p6-t8', name: 'Section 2: Usage Rules — Rule 4: Double Consonants', page: 'p. 90', pageNum: 90, estTime: '30 min', estHours: 0.5, completed: false, loggedHours: 0, notes: '' },
        ]
      },
      {
        id: 'p6-m2',
        name: 'KATAKANA (Tuttle Publishing, pp. 100–180)',
        resource: 'Book: Timothy G. Stout',
        resourceUrl: 'https://www.japanesepod101.com',
        topics: [
          { id: 'p6-t9', name: 'Section 4: The Basic 46 Katakana Characters', page: 'p. 100', pageNum: 100, estTime: '3 hrs', estHours: 3, completed: false, loggedHours: 0, notes: '' },
          { id: 'p6-t10', name: 'Reading Practice 1: ア ~ ソ', page: 'p. 116', pageNum: 116, estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
          { id: 'p6-t11', name: 'Reading Practice 2: タ ~ ホ', page: 'p. 132', pageNum: 132, estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
          { id: 'p6-t12', name: 'Reading Practice 3: マ ~ ン', page: 'p. 149', pageNum: 149, estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
          { id: 'p6-t13', name: 'Section 5: Katakana Usage Rules — Rule 1: Tenten and Maru', page: 'p. 150', pageNum: 150, estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
          { id: 'p6-t14', name: 'Section 5: Katakana Usage Rules — Rule 2: Combined Characters', page: 'p. 162', pageNum: 162, estTime: '1 hr', estHours: 1, completed: false, loggedHours: 0, notes: '' },
        ]
      },
      {
        id: 'p6-m3',
        name: 'Grammar, N5 Vocab & College Recorded Sessions',
        resource: 'Genki I & VSB College Recorded Sessions',
        resourceUrl: 'https://jlptsensei.com',
        topics: [
          { id: 'p6-t15', name: 'Basic Grammar Particles (は、が、を、に、で)', page: 'Genki I', pageNum: 185, estTime: '4 hrs', estHours: 4, completed: false, loggedHours: 0, notes: '' },
          { id: 'p6-t16', name: 'N5 Essential Vocabulary (800 words mastery)', page: 'Anki/Deck', pageNum: 205, estTime: '15 hrs', estHours: 15, completed: false, loggedHours: 0, notes: '' },
          { id: 'p6-t17', name: 'College Course Recorded Session 1–5 Watched', page: 'LMS/Portal', pageNum: 215, estTime: '5 hrs', estHours: 5, completed: false, loggedHours: 0, notes: '' },
          { id: 'p6-t18', name: 'College Course Recorded Session 6–10 Watched', page: 'LMS/Portal', pageNum: 226, estTime: '5 hrs', estHours: 5, completed: false, loggedHours: 0, notes: '' },
        ]
      }
    ]
  },
  {
    id: 'phase-7',
    phaseNumber: 7,
    title: 'Phase 7: Communication Skills',
    subtitle: 'Daily Micro-Habits (5–10 min) & Placement Interview Readiness',
    unlockRequirement: null, // Ongoing in parallel
    modules: [
      {
        id: 'p7-m1',
        name: 'Daily & Weekly Speaking Habits',
        resource: 'BBC Learning English (free) + Speak Confidently',
        resourceUrl: 'https://www.bbc.co.uk/learningenglish',
        topics: [
          { id: 'p7-t1', name: 'Read 1 article from BBC Learning English / The Hindu (Daily)', estTime: '10 min/day', estHours: 0.2, completed: false, loggedHours: 0, notes: '' },
          { id: 'p7-t2', name: 'Write 3 sentences about what you learned today (Daily)', estTime: '5 min/day', estHours: 0.1, completed: false, loggedHours: 0, notes: '' },
          { id: 'p7-t3', name: 'Learn 1 new English professional word with usage (Daily)', estTime: '5 min/day', estHours: 0.1, completed: false, loggedHours: 0, notes: '' },
          { id: 'p7-t4', name: 'Record yourself speaking for 2 minutes on any tech topic & listen back (Weekly)', estTime: '15 min/wk', estHours: 0.25, completed: false, loggedHours: 0, notes: '' },
          { id: 'p7-t5', name: 'Draft a mock cold email to a ServiceNow/Zoho engineering manager (Monthly)', estTime: '30 min', estHours: 0.5, completed: false, loggedHours: 0, notes: '' },
          { id: 'p7-t6', name: 'Record 1 mock interview answering "Tell me about yourself" (Monthly)', estTime: '45 min', estHours: 0.75, completed: false, loggedHours: 0, notes: '' },
        ]
      }
    ]
  }
];
