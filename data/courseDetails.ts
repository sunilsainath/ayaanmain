export type CourseDetail = {
  slug: string;
  title: string;
  tag: string;
  desc: string;
duration: string;
  fee: string;
  mode: string[];
  image: string; // dummy seeded — replace via Admin → Courses
  prerequisites: string[];
  notificationDate: string; // e.g. "Expected Jan 2027"
  syllabus: { subject: string; topics: string[] }[];
  highlights: string[];
  eligibility: string;
  ageLimit: string;
};

export const courseDetails: CourseDetail[] = [
  {
    slug: "si-pc",
    title: "SI PC",
    tag: "Sub-Inspector + Police Constable",
    desc: "TS Police SI Sub-Inspector and Constable (PC) in one track. Written syllabus, daily testing and full physical ground training — pick your final target at the end of the course.",
    duration: "3-4 Months + Continuous Revision",
    mode: ["Residential", "Offline", "Online"],
    fee: "₹35,000 (Residential) • ₹25,000 Offline • ₹15,000 Online",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
    eligibility: "SI — Graduation (any degree) from a recognised university. Constable (PC) — Intermediate (10+2) pass, any group.",
    ageLimit: "SI 21-25 years • Constable 18-22 years (relaxation as per notification)",
    prerequisites: [
      "SI track: 10+2+3 with 50%+ preferred, any stream",
      "PC track: 10+2 Intermediate with 45%+",
      "Physical fitness — 1600m baseline 7:30 min (boys), 800m for girls",
      "Telugu reading & Arithmetic basics",
      "Medical: Eye 6/6, no flat foot, height 167.6cm (men) / 152.5cm (women) as per category",
    ],
    notificationDate: "SI — Expected TSLPRB SI Notification, Jan 2027 (last: Aug 2022). PC — Expected Mar 2027 (last: Apr 2022).",
    syllabus: [
      { subject: "Quantitative Aptitude", topics: ["Number System", "Percentages", "Ratio & Proportion", "Profit & Loss", "Time & Work", "Time & Distance", "Mensuration", "Algebra", "Data Interpretation"] },
      { subject: "Reasoning & Intelligence", topics: ["Coding-Decoding", "Analogy", "Syllogism", "Blood Relations", "Direction Sense", "Seating Arrangement", "Non-Verbal Reasoning", "Logical Venn"] },
      { subject: "General Knowledge", topics: ["Indian History & Culture", "Telangana History & Movement", "Indian Polity & Constitution", "Indian Economy & RBI", "Geography (India & Telangana)", "Science & Technology", "Current Affairs (daily)"] },
      { subject: "English & Language", topics: ["Comprehension", "Grammar (Tenses, Voice)", "Vocabulary", "Precis & Essay"] },
      { subject: "Physical Events", topics: ["1600m Run (7:15 qual.)", "Long Jump (3.80m+ / 9ft)", "High Jump (1.20m)", "100m / 200m / 400m sprints", "Shot Put", "Pull-ups & rope climbing"] },
    ],
    highlights: ["One batch, two eligible targets — SI and Constable syllabus taught together", "Daily 4am study + Evening test + Explanation", "Weekly Grand + Monthly Physical Assessment", "Director-led ground training across 3 levels"],
  },
    {
    slug: "groups",
    title: "Group 1 • 2 • 3 • 4",
    tag: "State Services",
    desc: "TSPSC Groups — Prelims + Mains. Updated content, current affairs focus, answer writing.",
    duration: "4-6 Months (Mains incl.)",
    mode: ["Offline", "Online"],
    fee: "₹32,000 (Groups 1/2) • ₹22,000 (Groups 3/4)",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
    eligibility: "Graduation for Gr 1/2; Intermediate for Gr 4",
    ageLimit: "18 – 44 years (TSPSC general)",
    prerequisites: [
      "Graduation for Gr 1/2, 10+2 for Gr 4",
      "Telugu writing practice, Essay & Precis",
      "Current affairs daily reading habit",
      "Answer writing — 150 words in 8 min",
    ],
    notificationDate: "Expected: TSPSC Groups — Jun 2027 (Notification cycle annual)",
    syllabus: [
      { subject: "Prelims — Paper 1", topics: ["General Science", "Current Affairs (National & Telangana)", "World & Indian Geography", "History & Culture", "Polity & Governance", "Economy", "Mental Ability (Reasoning, Data Interpretation)"] },
      { subject: "Mains — Papers", topics: ["Paper I: General Essay", "Paper II: History, Culture, Geography", "Paper III: Indian Society, Constitution, Governance", "Paper IV: Economy & Development", "Paper V: Science, Tech & Data Interpretation", "Paper VI: Telangana Movement & State Formation"] },
      { subject: "Interview", topics: ["Personality Test", "Telangana Issues", "Bio-data based questions"] },
    ],
    highlights: ["Grand tests & Paper discussions", "Daily Current Affairs + Monthly Magazine", "Interview guidance by ex-officers"],
  },
  {
    slug: "ssc-gd",
    title: "SSC GD",
    tag: "Central Armed Forces",
    desc: "SSC GD Constable — CAPFs + Assam Rifles. Written + PST/PET + Medical.",
    duration: "3 Months",
    mode: ["Offline", "Online"],
    fee: "₹18,000 Offline • ₹12,000 Online",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=800&auto=format&fit=crop",
    eligibility: "10th Pass (SSC)",
    ageLimit: "18 – 23 years",
    prerequisites: [
      "SSC (10th) pass",
      "5km run in 24 min (preparation target)",
      "Basic Hindi/English + Arithmetic",
      "Height 170cm / 157cm, Chest 80/85cm (men)",
    ],
    notificationDate: "Expected: SSC GD — Sep 2026 (Released annually Nov)",
    syllabus: [
      { subject: "General Intelligence & Reasoning", topics: ["Analogies", "Series", "Coding-Decoding", "Syllogism"] },
      { subject: "General Knowledge", topics: ["History", "Geography", "Polity", "Economy", "Science", "Current Affairs"] },
      { subject: "Elementary Mathematics", topics: ["Number System", "Mensuration", "Geometry", "Trigonometry"] },
      { subject: "English/Hindi", topics: ["Grammar", "Comprehension", "Vocabulary", "Error Spotting"] },
      { subject: "Physical", topics: ["1600m/800m", "Long Jump", "High Jump", "PET/PST Standards"] },
    ],
    highlights: ["Hindi/English support", "Full mocks + Physical at L1-L3", "Medical tips + Document verification guidance"],
  },
  {
    slug: "army",
    title: "Army / Navy / Airforce",
    tag: "Defence Entry",
    desc: "Agniveer, GD, Tradesman, Navy MR/SSR, Airforce X/Y. Written, medical, physical guidance.",
    duration: "3 Months + Physical Till Selection",
    mode: ["Residential", "Offline"],
    fee: "₹25,000 Residential • ₹18,000 Offline",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    eligibility: "10th/10+2 as per post (Army GD: 10th 45%, Navy SSR: 10+2 PCM 50%)",
    ageLimit: "17.5 – 21 years (Army GD), 17-20 (Navy/Airforce)",
    prerequisites: [
      "10th/Intermediate with required %",
      "1600m in 6:30 target, Beam (6-10), 9ft Ditch, Zig-Zag",
      "Medical: No knock knee, flat foot, eye 6/6",
      "Height 166cm+ (Army), 157cm+ (Navy)",
    ],
    notificationDate: "Agniveer: Apr & Oct every year • Navy: May/Nov • Airforce: Jan/Jul",
    syllabus: [
      { subject: "General Knowledge", topics: ["History", "Geography", "Polity", "Current Affairs (Defence)"] },
      { subject: "General Science", topics: ["Physics (Mechanics, Optics)", "Chemistry", "Biology"] },
      { subject: "Maths (Agniveer GD)", topics: ["Algebra", "Geometry", "Mensuration", "Trigonometry"] },
      { subject: "Physical + Medical", topics: ["1600m (7:15→6:00)", "Pull-ups, Dips, Rope", "Medical screening tips", "Document prep"] },
    ],
    highlights: ["Ground practice 3 levels daily", "3000+ Defence placements", "Daily running + Strength + Events"],
  },
  {
    slug: "upsc",
    title: "UPSC Civil Services",
    tag: "Premium • Prelims+Mains+Interview",
    desc: "CSE Prelims + Mains + Personality Test. GS 1-4, Essay, CSAT, Optional. Daily answer writing.",
    duration: "12 Months (Foundation) + Test Series",
    mode: ["Offline", "Online"],
    fee: "₹65,000 Foundation • ₹25,000 Test Series",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop",
    eligibility: "Graduation in any discipline",
    ageLimit: "21 – 32 years (Gen), +5 SC/ST, +3 OBC",
    prerequisites: [
      "Graduation + Strong reading habit (2 Newspapers daily)",
      "NCERT 6-12 basics — History, Geography, Polity",
      "Essay & Ethics writing practice",
      "CSAT: Comprehension + Time management",
    ],
    notificationDate: "UPSC CSE 2027 — Feb 2027 Notification, Prelims May 2027",
    syllabus: [
      { subject: "Prelims — GS Paper 1", topics: ["History (Ancient/Medieval/Modern)", "Geography (World/India)", "Polity & Governance", "Economy", "Environment & Ecology", "Science & Tech", "Current Affairs (18 months)"] },
      { subject: "Prelims — CSAT Paper 2", topics: ["Comprehension", "Logical Reasoning", "Analytical Ability", "Decision Making", "Basic Numeracy", "Data Interpretation"] },
      { subject: "Mains — GS 1-4 + Essay", topics: ["GS1: History, Society, Geography", "GS2: Polity, Governance, IR", "GS3: Economy, Security, Disaster, Environment", "GS4: Ethics, Integrity, Aptitude", "Essay: 2 Topics (1000-1200 words)"] },
      { subject: "Optional (1 Subject)", topics: ["History / Geography / PSIR / Sociology / Anthropology / Telugu Literature etc. — 2 Papers × 250 marks"] },
      { subject: "Interview (275 marks)", topics: ["DAF-based questions", "Current Affairs depth", "Mock interviews with ex-bureaucrats"] },
    ],
    highlights: ["NCERT foundation + Standard books (Laxmikanth, Spectrum)", "Daily Current Affairs + Weekly Test + Monthly Revision", "Answer writing + Essay correction within 48h"],
  },
  {
    slug: "online",
    title: "Online Coaching",
    tag: "Live + Recorded",
    desc: "Same offline faculty, unlimited rewatch, offline download. Since 2018 on ClassPlus.",
    duration: "Same as Offline (3-4 Months)",
    mode: ["Online"],
    fee: "60% of Offline — e.g., SI Online ₹18,000",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    eligibility: "Same as chosen course (10th/Intermediate/Graduation)",
    ageLimit: "Same as course",
    prerequisites: [
      "Smartphone + 2GB data/day + Earphones",
      "ClassPlus App: co.classplus.ayaan",
      "Pro Fitness App for physical: com.user.ayaanprofitness",
      "Discipline: Attend live 6am/7pm, rewatch same day",
    ],
    notificationDate: "Batches start 1st & 15th every month — immediate enrollment",
    syllabus: [
      { subject: "Live Classes", topics: ["Same offline faculty live", "Unlimited forward/reverse rewatch", "Offline download (7 days)", "PDF notes & DPPs"] },
      { subject: "Tests", topics: ["Daily Quiz (₹20-30 via Razorpay)", "Weekly Grand, Monthly Mock", "Instant explanation + Rank"] },
      { subject: "Doubts & Support", topics: ["In-app doubts chat", "Weekly Zoom doubt session with faculty", "Telegram current affairs"] },
    ],
    highlights: ["Since 2018 — 50K+ app downloads", "Forward/reverse unlimited", "Offline + Online switch allowed (pay difference)"],
  },
  ];
