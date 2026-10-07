// Aspirant Corner gallery. Every URL was checked to return HTTP 200 with
// real JPEG bytes. All are Unsplash under the Unsplash License: free for
// commercial and non-commercial use, no permission needed, attribution
// appreciated but not required. No paid/stock-agency images are used.
export type AspirantImage = {
  src: string;
  title: string;
  caption: string;
  course: string;
};

const u = (id: string) => `https://images.unsplash.com/photo-${id}?q=80&w=900&auto=format&fit=crop`;

export const ASPIRANT_GALLERY: AspirantImage[] = [
  {
    src: u("1552674605-db6ffd4facb5"),
    title: "Morning Ground Session",
    caption: "4am group on the track before the heat builds. Every SI PC aspirant runs the same route.",
    course: "SI PC",
  },
  {
    src: u("1534438327276-14e5300c3a48"),
    title: "Strength & Conditioning",
    caption: "Gym and functional training built around the 1600m qualifying standard.",
    course: "SI PC",
  },
  {
    src: u("1541534741688-6078c6bfb5c5"),
    title: "Field Events",
    caption: "Long jump and high jump practice — 3.80m and 1.20m are the numbers we train to.",
    course: "SI PC",
  },
  {
    src: u("1517649763962-0c623066013b"),
    title: "Sprint Mechanics",
    caption: "Short sprints and sharp turns, coached by the Director himself.",
    course: "SI PC",
  },
  {
    src: u("1590419690008-905895e8fe0d"),
    title: "Uniform & Discipline",
    caption: "From day one you wear the uniform and stand to attention. That habit builds the rest.",
    course: "SI PC",
  },
  {
    src: u("1568515387631-8b650bbcdb90"),
    title: "Road & Endurance Work",
    caption: "Long-distance running blocks timed against the official qualifying time.",
    course: "SI PC",
  },
  {
    src: u("1594736797933-d0501ba2fe65"),
    title: "Defence Entry Parade",
    caption: "Agniveer and GD written rounds paired with the physical standard that follows.",
    course: "Army / Navy / Airforce",
  },
  {
    src: u("1544967082-d9d25d867d66"),
    title: "Service Selection Board Prep",
    caption: "Group and CDS entries need more than marks — SSB and interview are coached here too.",
    course: "Army / Navy / Airforce",
  },
  {
    src: u("1516939884455-1445c8652f83"),
    title: "Written Round Focus",
    caption: "GK, Science and Elementary Maths for Agniveer, SSR and Vayu.",
    course: "Army / Navy / Airforce",
  },
  {
    src: u("1524178232363-1fb2b075b655"),
    title: "Daily Teaching",
    caption: "Faculty panel from across both Telugu states, content updated to current standards.",
    course: "All courses",
  },
  {
    src: u("1521587760476-6c12a4b040da"),
    title: "24-Hour Library",
    caption: "Open all night through the exam season. Silence enforced, attendance optional.",
    course: "All courses",
  },
  {
    src: u("1481627834876-b7833e8f5570"),
    title: "Reference Shelf",
    caption: "Standard books, previous papers and current-affairs compilations in one place.",
    course: "All courses",
  },
  {
    src: u("1522202176988-66273c2fd55f"),
    title: "Group Discussion",
    caption: "Study groups form by themselves. Most selection stories start here.",
    course: "All courses",
  },
  {
    src: u("1450101499163-c8848c66ca85"),
    title: "Evening Test Ritual",
    caption: "Test, explanation, doubt-clarification. Every single evening, without exception.",
    course: "All courses",
  },
  {
    src: u("1555854877-bab0e564b8d5"),
    title: "Hostel Life",
    caption: "Dietary mess, 24-hour study hall and a timetable built for discipline.",
    course: "SI PC",
  },
  {
    src: u("1562774053-701939374585"),
    title: "Our Own Campus",
    caption: "15 acres at Bollikunta — classroom, hostel and grounds within 100 metres.",
    course: "All courses",
  },
  {
    src: u("1627556704302-624286467c65"),
    title: "Result Day",
    caption: "The only photograph that matters. This one is the reason for everything above.",
    course: "All courses",
  },
];