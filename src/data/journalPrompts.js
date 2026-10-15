// 30 rotating reflective prompts for Shri Prajith S
export const JOURNAL_PROMPTS = [
  "What is one technical concept you understood today that felt confusing yesterday?",
  "Write one vivid sentence about what your future hill farm and tribal school look like on a misty morning.",
  "How did today's coding or gym session make you feel stronger and more capable?",
  "What is one thing your parents did for you that you are deeply grateful for today?",
  "If you had to explain today's LeetCode or DSA problem in simple Tamil/English to a friend, how would you explain it?",
  "Did you submit your phone promptly at 9:30 PM? How did the silence of deep work treat you?",
  "What was the most challenging obstacle today, and how did you handle it?",
  "Write down one new English word or Japanese character you picked up today and use it in a sentence.",
  "How is your preparation for ServiceNow or product companies progressing? What needs more attention tomorrow?",
  "What was the highlight of your Harry Potter reading with morning coffee today?",
  "Look ahead 3 years: you've received your 12LPA+ offer letter. What do you say to your parents when you hand it over?",
  "Did you fuel your body well today with 95g protein and good water? How was your energy in the gym?",
  "What is one bad habit or distraction you successfully resisted today?",
  "Write down a key takeaway from your ServiceNow PDI or JavaScript coding block.",
  "Who is one person at VSB Engineering College or in hostel who inspired or helped you today?",
  "What would you tell yourself if you started feeling overwhelmed by college workload?",
  "Describe the exact feeling of stepping out of the gym after completing your sets.",
  "Which Japanese Katakana or Hiragana character looks coolest to write, and why?",
  "What is one micro-win from college or studies today that nobody else noticed but you?",
  "How did your 10-minute parents call go tonight? What made them smile?",
  "If your future self from 2028 visited your hostel room right now, what advice would he whisper to you?",
  "What is one bug or error you encountered today, and what did fixing it teach you?",
  "Write down 3 things you are genuinely looking forward to accomplishing tomorrow.",
  "Did you stick to your 10-minute WhatsApp timer at 5:30 PM? How did it protect your focus?",
  "What does 'owning a house for parents' truly represent to you emotionally?",
  "What is one question you want to research or solve in tomorrow morning's study slot?",
  "Reflect on your current streak: how has showing up every day changed your self-respect?",
  "How can you make tomorrow's college lectures more engaging or productive for your own goals?",
  "Write a note of gratitude to your body for sustaining hard training, college hours, and late-night coding.",
  "Before you turn off the light at 11:00 PM: did you give today your honest best?"
];

export function getDailyPrompt() {
  const dayOfMonth = new Date().getDate();
  return JOURNAL_PROMPTS[(dayOfMonth - 1) % JOURNAL_PROMPTS.length];
}
