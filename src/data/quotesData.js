// 30 curated quotes tailored to Shri Prajith S
// Centered around: discipline, engineering excellence, 12LPA goal,
// parents' dream house, and the future hill farm tribal school.

export const QUOTES = [
  {
    quote: "A quiet room, deep focus, and an honest day's work. That is how the hill farm gets built.",
    author: "Personal North Star"
  },
  {
    quote: "Every LeetCode problem you conquer today buys a brick for your parents' new house.",
    author: "Daily Reminder"
  },
  {
    quote: "Discipline is choosing between what you want now and what you want most.",
    author: "Abraham Lincoln"
  },
  {
    quote: "The tribal children waiting for your school will need a founder who never quit on hard days.",
    author: "Vision Anchor"
  },
  {
    quote: "ServiceNow, Zoho, Freshworks don't hire luck. They hire relentless consistency.",
    author: "Career Mantra"
  },
  {
    quote: "Hostel life is temporary; the pride in your parents' eyes when you hit 12LPA is forever.",
    author: "Prajith's Drive"
  },
  {
    quote: "Harry Potter conquered Voldemort one Horcrux at a time. Conquer your syllabus one topic at a time.",
    author: "The Wizard's Mindset"
  },
  {
    quote: "When 9:30 PM arrives and the phone is locked away, true engineering begins.",
    author: "Deep Work Rule"
  },
  {
    quote: "You don't need motivation when you have a 4-year pact with your future self.",
    author: "AIML 2024–2028"
  },
  {
    quote: "Consistency is an algorithm with exponential compounding returns.",
    author: "Engineering Wisdom"
  },
  {
    quote: "Sweat in the gym at 5:30 AM so your mind stays razor sharp at the coding desk at night.",
    author: "Iron & Code"
  },
  {
    quote: "The best time to learn Japanese and Master DSA was yesterday. The next best time is right now.",
    author: "Proverb Adapted"
  },
  {
    quote: "The hill farm needs a leader of strong health, sharp mind, and generous wealth.",
    author: "The Vision"
  },
  {
    quote: "Great software architects are built in ordinary hostel rooms during quiet hours.",
    author: "VSB Engineer"
  },
  {
    quote: "Do not negotiate with your alarm clock. The 5:30 AM workout is a non-negotiable MUST.",
    author: "Prajith's Standard"
  },
  {
    quote: "A ₹6,000 course is worthless if uncompleted, but priceless when mastered into production skills.",
    author: "Execution Over Purchase"
  },
  {
    quote: "Master JavaScript thoroughly today, and React, ServiceNow, and backend APIs will feel like second nature.",
    author: "Foundations First"
  },
  {
    quote: "Your parents worked tirelessly so you could stand at VSB Karur. Make their sacrifices legendary.",
    author: "Family Gratitude"
  },
  {
    quote: "When you feel like skipping the gym or the DSA problem, remember: the tribal school needs you strong.",
    author: "Purpose Over Comfort"
  },
  {
    quote: "One LeetCode Easy today prepares you for the Mediums that unlock ServiceNow tomorrow.",
    author: "SDE Roadmap"
  },
  {
    quote: "Simplicity and focus are the greatest competitive advantages in college.",
    author: "Hostel Philosophy"
  },
  {
    quote: "The phone submitted at 9:30 PM is not a restriction; it is your ticket to supreme focus.",
    author: "Deep Work Protocol"
  },
  {
    quote: "Knowledge of ServiceNow ITSM and Scripting sets you apart from 95% of freshers.",
    author: "Strategic Edge"
  },
  {
    quote: "Speak English every day with confidence. Fluency is just calibrated practice.",
    author: "Communication Goal"
  },
  {
    quote: "Every page of Japanese Hiragana & Katakana is proof that you can master any unfamiliar territory.",
    author: "Timothy G. Stout"
  },
  {
    quote: "Small disciplines repeated with consistency every day lead to great achievements gained slowly over time.",
    author: "John C. Maxwell"
  },
  {
    quote: "Don't measure your progress against others in hostel. Measure it against your hill farm vision.",
    author: "Internal Compass"
  },
  {
    quote: "The 10-minute WhatsApp timer keeps you in control of your time, not the algorithms.",
    author: "Digital Discipline"
  },
  {
    quote: "You are not just learning to code. You are engineering the financial freedom of your family.",
    author: "12LPA Target"
  },
  {
    quote: "Sleep at 11:00 PM with the satisfaction of a day thoroughly won.",
    author: "Rest Well"
  }
];

export function getDailyQuote() {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  return QUOTES[dayOfYear % QUOTES.length];
}
