// Public institute/branch copy shared by the About and Contact pages.
// Branch records store only name/address/phone, so the remaining details live here.
export type Branch = { id: string; name: string; address: string; phone?: string };

export const FALLBACK_BRANCHES: Branch[] = [
  { id: "warangal", name: "Warangal — Residential Academy", address: "Don Bosco School, Opp. Vaagdevi College, Bollikunta, Warangal 506005", phone: "+91 88866 67222" },
  { id: "hanamkonda", name: "Hanamkonda", address: "2nd Floor, Mayuri Mall, Kishanpura, Hanamkonda, Warangal 506001", phone: "+91 88866 67222" },
  { id: "hyderabad", name: "Hyderabad — Dilsukhnagar", address: "Chenna Complex, Near Metro Pillar 1542, Dilsukhnagar, Hyderabad", phone: "+91 88866 67222" },
];

export const BRANCH_DETAILS: Record<string, { about: string; timings: string; tags: string[] }> = {
  warangal: {
    about: "Our 25-acre residential academy — classrooms, three-level grounds, separate hostels and a 24×7 study hall inside one campus.",
    timings: "Open daily • 9:00 am – 8:00 pm",
    tags: ["Residential", "25-acre campus", "Hostel"],
  },
  hanamkonda: {
    about: "The day-scholar institute in the heart of Hanamkonda, with hostel support for outstation aspirants.",
    timings: "Open daily • 9:00 am – 8:00 pm",
    tags: ["Day scholar", "Hostel option", "Telugu & English"],
  },
  hyderabad: {
    about: "Our Hyderabad institute at Dilsukhnagar — same faculty, same test schedule, with online backup for missed classes.",
    timings: "Open daily • 9:00 am – 8:00 pm",
    tags: ["Offline", "Online backup", "Weekend batches"],
  },
};

export function detailsFor(b: Branch) {
  const key = `${b.id} ${b.name}`.toLowerCase();
  if (key.includes("warangal") || key.includes("residential") || key.includes("bollikunta")) return BRANCH_DETAILS.warangal;
  if (key.includes("hanamkonda")) return BRANCH_DETAILS.hanamkonda;
  if (key.includes("hyderabad") || key.includes("dilsukh")) return BRANCH_DETAILS.hyderabad;
  return {
    about: "Ayaan coaching institute with the same written, academic and physical training method followed across every campus.",
    timings: "Open daily • 9:00 am – 8:00 pm",
    tags: ["Offline", "Telugu & English"],
  };
}
