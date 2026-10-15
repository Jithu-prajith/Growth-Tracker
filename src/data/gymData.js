// Hardcoded 6-day Push/Pull/Legs Split for Shri Prajith S
// With Home/Band backup versions & 95g Protein Vegetarian Diet Tracker

export const WORKOUT_PLAN = [
  // Day 1 (Monday)
  {
    dayNumber: 1,
    dayName: "Monday",
    type: "Push",
    title: "Push — Chest, Shoulders & Triceps",
    focus: "Chest pressing power & lateral delts",
    gymExercises: [
      { id: 'd1-1', name: "Barbell Chest Press", sets: "4", reps: "10-12", weight: "Bar + plates", completed: false },
      { id: 'd1-2', name: "Dumbbell Shoulder Press", sets: "3", reps: "12", weight: "6kg", completed: false },
      { id: 'd1-3', name: "Dips (Chest Focus)", sets: "3", reps: "Max", weight: "Bodyweight", completed: false },
      { id: 'd1-4', name: "Lateral Raise", sets: "3", reps: "15", weight: "6kg", completed: false },
      { id: 'd1-5', name: "Close-Grip Push-ups", sets: "3", reps: "15", weight: "Bodyweight", completed: false },
    ],
    homeExercises: [
      { id: 'd1h-1', name: "Resistance Band Chest Press", sets: "4", reps: "15-20", weight: "Heavy Band", completed: false },
      { id: 'd1h-2', name: "Standard & Decline Push-ups", sets: "4", reps: "15-20", weight: "Bodyweight", completed: false },
      { id: 'd1h-3', name: "Band Overhead Shoulder Press", sets: "3", reps: "15", weight: "Medium Band", completed: false },
      { id: 'd1h-4', name: "Band Lateral Raise", sets: "3", reps: "15-20", weight: "Light Band", completed: false },
      { id: 'd1h-5', name: "Diamond Push-ups (Triceps)", sets: "3", reps: "15", weight: "Bodyweight", completed: false },
    ]
  },
  // Day 2 (Tuesday)
  {
    dayNumber: 2,
    dayName: "Tuesday",
    type: "Pull",
    title: "Pull — Back, Biceps & Rear Delts",
    focus: "Back width, vertical pulling & arm thickness",
    gymExercises: [
      { id: 'd2-1', name: "Pull-ups", sets: "4", reps: "Max", weight: "Bodyweight", completed: false },
      { id: 'd2-2', name: "DB Bent-Over Row", sets: "4", reps: "12", weight: "6kg", completed: false },
      { id: 'd2-3', name: "DB Bicep Curl", sets: "3", reps: "15", weight: "6kg", completed: false },
      { id: 'd2-4', name: "Dips (Triceps Focus)", sets: "3", reps: "Max", weight: "Bodyweight", completed: false },
      { id: 'd2-5', name: "DB Hammer Curl", sets: "3", reps: "12", weight: "6kg", completed: false },
    ],
    homeExercises: [
      { id: 'd2h-1', name: "Doorframe/Towel Inverted Row", sets: "4", reps: "12-15", weight: "Bodyweight", completed: false },
      { id: 'd2h-2', name: "Band Bent-Over Rows", sets: "4", reps: "15", weight: "Heavy Band", completed: false },
      { id: 'd2h-3', name: "Banded Bicep Curls", sets: "3", reps: "18", weight: "Medium Band", completed: false },
      { id: 'd2h-4', name: "Chair/Bed Tricep Dips", sets: "3", reps: "20", weight: "Bodyweight", completed: false },
      { id: 'd2h-5', name: "Band Hammer Curls", sets: "3", reps: "15", weight: "Medium Band", completed: false },
    ]
  },
  // Day 3 (Wednesday)
  {
    dayNumber: 3,
    dayName: "Wednesday",
    type: "Legs+Core",
    title: "Legs & Core — Foundation & Stability",
    focus: "Quad hypertrophy, glute strength & core bracing",
    gymExercises: [
      { id: 'd3-1', name: "Bodyweight Squats", sets: "4", reps: "20", weight: "Bodyweight", completed: false },
      { id: 'd3-2', name: "Bulgarian Split Squat", sets: "3", reps: "12 / leg", weight: "Bodyweight / 6kg", completed: false },
      { id: 'd3-3', name: "Goblet Squat", sets: "3", reps: "15", weight: "6kg", completed: false },
      { id: 'd3-4', name: "Glute Bridge", sets: "3", reps: "20", weight: "Bodyweight", completed: false },
      { id: 'd3-5', name: "Plank Hold", sets: "3", reps: "45 sec", weight: "Bodyweight", completed: false },
    ],
    homeExercises: [
      { id: 'd3h-1', name: "Banded Bodyweight Squats", sets: "4", reps: "25", weight: "Loop Band", completed: false },
      { id: 'd3h-2', name: "Bulgarian Split Squat (Bed/Chair)", sets: "3", reps: "15 / leg", weight: "Bodyweight", completed: false },
      { id: 'd3h-3', name: "Band Good Mornings / RDLs", sets: "3", reps: "15", weight: "Medium Band", completed: false },
      { id: 'd3h-4', name: "Single-Leg Glute Bridge", sets: "3", reps: "15 / leg", weight: "Bodyweight", completed: false },
      { id: 'd3h-5', name: "Plank Hold + Shoulder Taps", sets: "3", reps: "45 sec", weight: "Bodyweight", completed: false },
    ]
  },
  // Day 4 (Thursday)
  {
    dayNumber: 4,
    dayName: "Thursday",
    type: "Push (progressive)",
    title: "Push (Progressive) — Power & Volume",
    focus: "Heavier barbell work & shoulder front delt density",
    gymExercises: [
      { id: 'd4-1', name: "Barbell Press (Progressive)", sets: "4", reps: "8-10", weight: "Progressive load", completed: false },
      { id: 'd4-2', name: "Wide Push-ups", sets: "4", reps: "20", weight: "Bodyweight", completed: false },
      { id: 'd4-3', name: "Front Raise", sets: "3", reps: "12", weight: "6kg", completed: false },
      { id: 'd4-4', name: "Weighted Dips", sets: "3", reps: "Max", weight: "Belt / +kg", completed: false },
      { id: 'd4-5', name: "Tricep Overhead Extension", sets: "3", reps: "15", weight: "6kg", completed: false },
    ],
    homeExercises: [
      { id: 'd4h-1', name: "Feet-Elevated Push-ups", sets: "4", reps: "15", weight: "Hostel Bed", completed: false },
      { id: 'd4h-2', name: "Archer Push-ups / Band Flyes", sets: "3", reps: "12 / side", weight: "Bodyweight / Band", completed: false },
      { id: 'd4h-3', name: "Pike Push-ups (Shoulder Power)", sets: "3", reps: "12", weight: "Bodyweight", completed: false },
      { id: 'd4h-4', name: "Hostel Chair Tricep Dips", sets: "4", reps: "20", weight: "Bodyweight", completed: false },
      { id: 'd4h-5', name: "Overhead Band Tricep Extension", sets: "3", reps: "15", weight: "Medium Band", completed: false },
    ]
  },
  // Day 5 (Friday)
  {
    dayNumber: 5,
    dayName: "Friday",
    type: "Pull (progressive)",
    title: "Pull (Progressive) — Width, Chin-ups & Face Pulls",
    focus: "Calisthenic pull endurance & posture correction",
    gymExercises: [
      { id: 'd5-1', name: "Pull-ups (Progressive)", sets: "4", reps: "Max + 1", weight: "Bodyweight", completed: false },
      { id: 'd5-2', name: "Single-Arm DB Row", sets: "4", reps: "12 / arm", weight: "6kg", completed: false },
      { id: 'd5-3', name: "Chin-ups (Underhand Grip)", sets: "3", reps: "Max", weight: "Bodyweight", completed: false },
      { id: 'd5-4', name: "Concentration Curl", sets: "3", reps: "15 / arm", weight: "6kg", completed: false },
      { id: 'd5-5', name: "Face Pulls", sets: "3", reps: "20", weight: "Band / Cable", completed: false },
    ],
    homeExercises: [
      { id: 'd5h-1', name: "Hostel Pull-up Bar / Door Row", sets: "4", reps: "Max", weight: "Bodyweight", completed: false },
      { id: 'd5h-2', name: "Band Single-Arm Row", sets: "4", reps: "15 / side", weight: "Heavy Band", completed: false },
      { id: 'd5h-3', name: "Band Lat Pulldowns Kneeling", sets: "3", reps: "15", weight: "Heavy Band", completed: false },
      { id: 'd5h-4', name: "Band Concentration Curl", sets: "3", reps: "15", weight: "Medium Band", completed: false },
      { id: 'd5h-5', name: "Band Face Pulls (High Anchor)", sets: "3", reps: "20", weight: "Band Anchor", completed: false },
    ]
  },
  // Day 6 (Saturday)
  {
    dayNumber: 6,
    dayName: "Saturday",
    type: "Legs+Core (harder)",
    title: "Legs & Core (Harder) — Plyo, Calves & Abs",
    focus: "Explosive leg drive & hanging abdominal control",
    gymExercises: [
      { id: 'd6-1', name: "Jump Squats", sets: "4", reps: "15", weight: "Bodyweight", completed: false },
      { id: 'd6-2', name: "Walking Lunges", sets: "3", reps: "20 paces", weight: "Bodyweight", completed: false },
      { id: 'd6-3', name: "Single-Leg Calf Raises", sets: "3", reps: "20 / leg", weight: "Bodyweight", completed: false },
      { id: 'd6-4', name: "Hanging Knee Raise", sets: "3", reps: "15", weight: "Pull-up bar", completed: false },
      { id: 'd6-5', name: "Ab Crunch + Leg Raise Superset", sets: "3", reps: "15", weight: "Bodyweight", completed: false },
    ],
    homeExercises: [
      { id: 'd6h-1', name: "Explosive Jump Squats", sets: "4", reps: "15", weight: "Bodyweight", completed: false },
      { id: 'd6h-2', name: "Hostel Corridor Walking Lunges", sets: "3", reps: "25 paces", weight: "Bodyweight", completed: false },
      { id: 'd6h-3', name: "Single-Leg Stair Calf Raises", sets: "4", reps: "20 / leg", weight: "Bodyweight", completed: false },
      { id: 'd6h-4', name: "Lying Leg Raises + Hip Thrust", sets: "3", reps: "18", weight: "Floor Mat", completed: false },
      { id: 'd6h-5', name: "Bicycle Crunches + Hollow Body", sets: "3", reps: "25", weight: "Floor Mat", completed: false },
    ]
  },
  // Day 7 (Sunday)
  {
    dayNumber: 0,
    dayName: "Sunday",
    type: "Rest/Active recovery",
    title: "Active Recovery & Mobility",
    focus: "Gentle restoration, blood flow & joint decompression",
    gymExercises: [
      { id: 'd7-1', name: "Morning Campus Walk", sets: "1", reps: "20-30 min", weight: "Self", completed: false },
      { id: 'd7-2', name: "Full Body Dynamic Stretching", sets: "1", reps: "15 min", weight: "Self", completed: false },
      { id: 'd7-3', name: "Deep Foam Rolling / Joint Mobility", sets: "1", reps: "10 min", weight: "Self", completed: false },
    ],
    homeExercises: [
      { id: 'd7h-1', name: "Light Hostel Stretches & Hamstrings", sets: "1", reps: "20 min", weight: "Self", completed: false },
      { id: 'd7h-2', name: "Thoracic Spine & Shoulder Mobility", sets: "1", reps: "15 min", weight: "Self", completed: false },
    ]
  }
];

export const VEGETARIAN_MEAL_PLAN = [
  {
    id: 'meal-1',
    time: '7:00 AM',
    title: 'Breakfast Power Fuel',
    items: 'Oats or idli/dosa + banana + groundnuts',
    protein: 18,
    calories: 480,
    completed: false
  },
  {
    id: 'meal-2',
    time: '10:00 AM',
    title: 'Mid-Morning Snack',
    items: 'Peanut butter 2tbsp + 2 whole wheat bread',
    protein: 14,
    calories: 360,
    completed: false
  },
  {
    id: 'meal-3',
    time: '1:00 PM',
    title: 'College Lunch (Protein Peak)',
    items: 'Soya chunks curry 50g + chapati/rice + dal',
    protein: 32,
    calories: 680,
    completed: false
  },
  {
    id: 'meal-4',
    time: '4:00 PM',
    title: 'Pre-Study Energy Bite',
    items: 'Roasted chana 40g + jaggery',
    protein: 10,
    calories: 260,
    completed: false
  },
  {
    id: 'meal-5',
    time: '7:00 PM',
    title: 'Dinner Recovery Meal',
    items: 'Rajma / chole / paneer / tofu + chapati + salad',
    protein: 21,
    calories: 520,
    completed: false
  }
];

export const NUTRITION_TARGETS = {
  proteinGoal: 95, // grams
  calorieGoal: 2300, // kcal
  waterGlasses: 8 // 8 glasses = ~3 Litres
};
