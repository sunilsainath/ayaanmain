// Real Ayaan campus, results and event photographs.
//
// Files live in /public/gallery and are committed with the repo, so the
// gallery never depends on an external image host. Keep `width`/`height`
// accurate: the grid uses them to reserve space and avoid layout shift.
export type GalleryCategory = "Campus Life" | "Achievements" | "Awards & Events";

export type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  category: GalleryCategory;
  width: number;
  height: number;
  featured?: boolean;
};

const img = (name: string) => `/gallery/${name}`;

export const GALLERY: GalleryItem[] = [
  {
    src: img("campus-assembly.jpg"),
    alt: "Ayaan students lined up in the campus courtyard for morning assembly",
    title: "Morning assembly",
    caption: "The full campus lines up before the first study session.",
    category: "Campus Life",
    width: 1125,
    height: 1350,
    featured: true,
  },
  {
    src: img("morning-run.jpg"),
    alt: "Ayaan aspirants running together during morning physical training",
    title: "Morning run",
    caption: "Daily endurance work on the campus ground, whatever the weather.",
    category: "Campus Life",
    width: 1125,
    height: 1241,
    featured: true,
  },
  {
    src: img("exam-hall.jpg"),
    alt: "Students writing a test in the Ayaan exam hall",
    title: "Daily test in progress",
    caption: "An exam-hall test every evening, followed by explanation.",
    category: "Campus Life",
    width: 1125,
    height: 1000,
    featured: true,
  },
  {
    src: img("classroom-session.jpg"),
    alt: "Girls attending an academic class at Ayaan",
    title: "Academic class",
    caption: "Subject-wise classes by senior faculty — Telugu and English.",
    category: "Campus Life",
    width: 1125,
    height: 1472,
    featured: true,
  },
  {
    src: img("commandos-group.jpg"),
    alt: "Group photograph of Ayaan students selected as TS Constables in 2023",
    title: "Some of our commandos",
    caption: "TS Constable 2023 selections from the residential academy.",
    category: "Achievements",
    width: 1290,
    height: 1189,
    featured: true,
  },
  {
    src: img("constable-183-selections.jpg"),
    alt: "Ayaan TS Constable 2023 results poster showing 183 plus selections",
    title: "183+ TS Constable selections",
    caption: "Still counting — Ayaan's 2023 constable results.",
    category: "Achievements",
    width: 1080,
    height: 1080,
    featured: true,
  },
  {
    src: img("courtyard-assembly.jpg"),
    alt: "Ayaan students standing in formation in the academy courtyard",
    title: "Campus assembly",
    caption: "Discipline starts with the morning line-up.",
    category: "Campus Life",
    width: 1125,
    height: 1090,
  },
  {
    src: img("endurance-run.jpg"),
    alt: "Ayaan aspirants on a long-distance run",
    title: "Endurance training",
    caption: "Long-distance blocks timed against the official qualifying standard.",
    category: "Campus Life",
    width: 1124,
    height: 2000,
  },
  {
    src: img("assembly-ground.jpg"),
    alt: "Students gathered in the Ayaan academy courtyard",
    title: "Assembly ground",
    caption: "Students gather in the academy courtyard before training.",
    category: "Campus Life",
    width: 1125,
    height: 615,
  },
  {
    src: img("students-assembly-portrait.jpg"),
    alt: "Ayaan residential students standing outside the campus building",
    title: "Students on campus",
    caption: "Residential aspirants at the Bollikunta campus.",
    category: "Campus Life",
    width: 1125,
    height: 1980,
  },
  {
    src: img("sai-krishna-145.jpg"),
    alt: "G. Sai Krishna Reddy, TS Constable 2023 topper with 145 out of 200 marks",
    title: "G. Sai Krishna Reddy — 145/200",
    caption: "TS Constable 2023 highest marks, TS State topper.",
    category: "Achievements",
    width: 2000,
    height: 1500,
  },
  {
    src: img("changuna-96-068.jpg"),
    alt: "Changuna, TS Constable 2023 events topper with 96.068 out of 100",
    title: "Changuna — 96.068/100",
    caption: "Events highest marks, TS State topper, TS Constable 2023.",
    category: "Achievements",
    width: 1080,
    height: 1080,
  },
  {
    src: img("subhadra-100.jpg"),
    alt: "T. Subhadra, TS Constable 2023 events topper with 100 out of 100",
    title: "T. Subhadra — 100/100",
    caption: "Events highest marks, TS State topper, TS Constable 2023.",
    category: "Achievements",
    width: 1080,
    height: 1080,
  },
  {
    src: img("results-100-and-145.jpg"),
    alt: "Ayaan results poster showing 100 out of 100 in events and 145 out of 200 in the exam",
    title: "100/100 events • 145/200 exam",
    caption: "Ayaan's TS Constable 2023 results with 183+ selections.",
    category: "Achievements",
    width: 1080,
    height: 1080,
  },
  {
    src: img("sravani-135.jpg"),
    alt: "Sravani, selected as TS Constable 2023 with 135 out of 200 marks",
    title: "Sravani — 135/200",
    caption: "Selected as Constable 2023 from the residential academy.",
    category: "Achievements",
    width: 1080,
    height: 1080,
  },
  {
    src: img("naveen-96-601.jpg"),
    alt: "R. Naveen, TS Constable 2023 events topper with 96.601 out of 100",
    title: "R. Naveen — 96.601/100",
    caption: "Events TS State topper, TS Constable 2023.",
    category: "Achievements",
    width: 1080,
    height: 1080,
  },
  {
    src: img("sravani-95-068.jpg"),
    alt: "T. Sravani, TS Constable 2023 events topper with 95.068 out of 100",
    title: "T. Sravani — 95.068/100",
    caption: "Events TS State topper, TS Constable 2023.",
    category: "Achievements",
    width: 1080,
    height: 1080,
  },
  {
    src: img("commandos-poster.jpg"),
    alt: "Ayaan commandos result poster for TS Constable 2023",
    title: "Some of our commandos",
    caption: "TS Constable 2023 — Ayaan Police Academy.",
    category: "Achievements",
    width: 1080,
    height: 1080,
  },
  {
    src: img("cp-warangal-awards-2018.jpg"),
    alt: "Warangal Police Commissioner presenting awards to Ayaan students in 2018",
    title: "CP Warangal awards Ayaan students",
    caption: "Police Commemoration Week, 2018 — cheques presented to Ayaan achievers.",
    category: "Awards & Events",
    width: 2000,
    height: 1289,
  },
  {
    src: img("district-felicitation.jpg"),
    alt: "Ayaan student being felicitated at a district-level event",
    title: "District felicitation",
    caption: "Ayaan student honoured at a district-level cultural event.",
    category: "Awards & Events",
    width: 2000,
    height: 1031,
  },
  {
    src: img("jyothi-prajwalana-2017.jpg"),
    alt: "Dr. Md Anwar lighting the lamp as special guest at Spring Fire 2017",
    title: "Spring Fire 2017 — SVS Group of Colleges",
    caption: "Dr. Md Anwar as special guest for Jyothi Prajwalana.",
    category: "Awards & Events",
    width: 2000,
    height: 1500,
  },
  {
    src: img("news-coverage.jpg"),
    alt: "Telugu newspaper article about Ayaan Foundation and its training",
    title: "Telugu daily coverage",
    caption: "Newspaper feature on Ayaan's coaching and achievements.",
    category: "Awards & Events",
    width: 2000,
    height: 1500,
  },
];

export const FEATURED_GALLERY = GALLERY.filter((g) => g.featured);
export const GALLERY_CATEGORIES: GalleryCategory[] = ["Campus Life", "Achievements", "Awards & Events"];
