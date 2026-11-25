// All records below are fictional demonstration data for the Giga Group prototype.
import towers from "@/assets/photo-towers.jpg";
import towersWide from "@/assets/giga-skyline.jpg";
import mallBridge from "@/assets/photo-mall-bridge.jpg";
import aerialBlue from "@/assets/photo-aerial-blue.jpg";
import aerialCurve from "@/assets/photo-aerial-curve.jpg";

export const departments = ["Accounts", "Sales", "Finance", "Customer Care"] as const;

export const relatedProjects = ["Goldcrest Views", "Giga Residential Project", "Other"] as const;

export const pkr = (n: number) => "PKR " + n.toLocaleString("en-PK");

export const client = {
  name: "Ahmed Khan",
  firstName: "Ahmed",
  email: "ahmed@example.com",
  phone: "+92 300 0000000",
  cnicMasked: "35202-•••••••-1",
  accountRef: "GG-2026-00125",
};

export type ProjectUpdate = {
  date: string;
  progress: number;
  note: string;
  images: string[];
};

export type InstStatus = "Paid" | "Partially Paid" | "Due" | "Upcoming" | "Overdue";
export type Installment = {
  id: string;
  no: number;
  due: string;
  amount: number;
  paidAmount: number;
  paidOn?: string;
  status: InstStatus;
  verification: "Verified" | "Under Verification" | "Not Submitted";
  receipt?: string;
};

export type Unit = {
  id: string;
  number: string;
  tower: string;
  bookingRef: string;
  bookingDate: string;
  installments: Installment[];
};

export type Project = {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  frame?: string;
  update: ProjectUpdate;
  units: Unit[];
};

function inst(
  booking: string,
  no: number,
  due: string,
  amount: number,
  paidAmount: number,
  status: InstStatus,
  extra: Partial<Pick<Installment, "paidOn" | "verification" | "receipt">> = {},
): Installment {
  return {
    id: `${booking}-${String(no).padStart(2, "0")}`,
    no,
    due,
    amount,
    paidAmount,
    status,
    verification: status === "Paid" ? "Verified" : "Not Submitted",
    ...extra,
  };
}

export const projects: Project[] = [
  {
    id: "goldcrest-views",
    name: "Goldcrest Views",
    location: "DHA Phase II, Islamabad",
    description: "Residential towers with apartment bookings across Tower A, Tower B and Tower D.",
    image: towers,
    update: {
      date: "17 Feb 2026",
      progress: 72,
      note: "Tower structure is up and the facade lighting is in place.",
      images: [towers, towersWide, aerialCurve],
    },
    units: [
      {
        id: "BK-1003422",
        number: "104",
        tower: "Tower-D",
        bookingRef: "BK-1003422",
        bookingDate: "2025-11-02",
        installments: [
          inst("BK-1003422", 1, "2026-01-15", 500_000, 500_000, "Paid", { paidOn: "2026-01-12", receipt: "RCT-2026-0101" }),
          inst("BK-1003422", 2, "2026-04-15", 500_000, 500_000, "Paid", { paidOn: "2026-04-10", receipt: "RCT-2026-0214" }),
          inst("BK-1003422", 3, "2026-07-15", 500_000, 500_000, "Paid", { paidOn: "2026-07-14" }),
          inst("BK-1003422", 4, "2026-10-15", 500_000, 0, "Overdue"),
          inst("BK-1003422", 5, "2027-01-15", 500_000, 0, "Upcoming"),
        ],
      },
      {
        id: "BK-1003423",
        number: "214",
        tower: "Tower-B",
        bookingRef: "BK-1003423",
        bookingDate: "2025-12-18",
        installments: [
          inst("BK-1003423", 1, "2026-02-15", 600_000, 600_000, "Paid", { paidOn: "2026-02-12", receipt: "RCT-2026-0410" }),
          inst("BK-1003423", 2, "2026-05-15", 600_000, 600_000, "Paid", { paidOn: "2026-05-14", receipt: "RCT-2026-0518" }),
          inst("BK-1003423", 3, "2026-08-15", 600_000, 150_000, "Partially Paid", { paidOn: "2026-08-20", verification: "Under Verification", receipt: "RCT-2026-0322" }),
          inst("BK-1003423", 4, "2027-02-15", 600_000, 0, "Upcoming"),
          inst("BK-1003423", 5, "2027-05-15", 600_000, 0, "Upcoming"),
        ],
      },
      {
        id: "BK-1003424",
        number: "3701",
        tower: "Tower-A",
        bookingRef: "BK-1003424",
        bookingDate: "2025-03-15",
        installments: [
          inst("BK-1003424", 1, "2026-03-15", 1_000_000, 1_000_000, "Paid", { paidOn: "2026-03-12", receipt: "RCT-2026-0612" }),
          inst("BK-1003424", 2, "2026-06-15", 1_000_000, 1_000_000, "Paid", { paidOn: "2026-06-10", receipt: "RCT-2026-0711" }),
          inst("BK-1003424", 3, "2026-09-15", 1_000_000, 1_000_000, "Paid", { paidOn: "2026-09-14", receipt: "RCT-2026-0819" }),
          inst("BK-1003424", 4, "2026-12-15", 250_000, 0, "Due"),
          inst("BK-1003424", 5, "2027-03-15", 750_000, 0, "Upcoming"),
        ],
      },
    ],
  },
  {
    id: "giga-residential",
    name: "Giga Residential Project",
    location: "Bahria Town, Rawalpindi",
    description: "A residential community with apartment bookings in Tower A and Tower C.",
    image: aerialBlue,
    update: {
      date: "17 Feb 2026",
      progress: 54,
      note: "The residential frame is rising beside the podium. Latest night shots show the current structure.",
      images: [aerialBlue, aerialCurve, mallBridge],
    },
    units: [
      {
        id: "BK-2004511",
        number: "120",
        tower: "Tower-C",
        bookingRef: "BK-2004511",
        bookingDate: "2025-06-04",
        installments: [
          inst("BK-2004511", 1, "2026-03-01", 1_000_000, 1_000_000, "Paid", { paidOn: "2026-02-26", receipt: "RCT-2026-0902" }),
          inst("BK-2004511", 2, "2026-06-01", 1_000_000, 1_000_000, "Paid", { paidOn: "2026-05-29", receipt: "RCT-2026-0908" }),
          inst("BK-2004511", 3, "2026-09-01", 1_000_000, 0, "Overdue"),
          inst("BK-2004511", 4, "2027-03-01", 1_000_000, 0, "Upcoming"),
          inst("BK-2004511", 5, "2027-06-01", 1_000_000, 0, "Upcoming"),
        ],
      },
      {
        id: "BK-2004512",
        number: "305",
        tower: "Tower-A",
        bookingRef: "BK-2004512",
        bookingDate: "2025-08-21",
        installments: [
          inst("BK-2004512", 1, "2026-04-01", 900_000, 900_000, "Paid", { paidOn: "2026-03-28", receipt: "RCT-2026-1004" }),
          inst("BK-2004512", 2, "2026-07-01", 900_000, 900_000, "Paid", { paidOn: "2026-06-30", receipt: "RCT-2026-1015" }),
          inst("BK-2004512", 3, "2026-10-01", 900_000, 450_000, "Partially Paid", { paidOn: "2026-10-06", verification: "Verified", receipt: "RCT-2026-1020" }),
          inst("BK-2004512", 4, "2027-04-01", 900_000, 0, "Upcoming"),
          inst("BK-2004512", 5, "2027-07-01", 900_000, 0, "Upcoming"),
        ],
      },
    ],
  },
];

export type ApprovalStage = { name: string; dept: string; status: "Completed" | "In Progress" | "Pending"; date?: string };
export type Approval = {
  id: string;
  ref: string;
  type: string;
  submitted: string;
  updated: string;
  stages: ApprovalStage[];
};

export const approvals: Approval[] = [
  {
    id: "GG-APR-2026-0021",
    ref: "GG-APR-2026-0021",
    type: "Account Documentation Approval",
    submitted: "02 Oct 2026",
    updated: "02 Nov 2026 · 04:15 PM",
    stages: [
      { name: "Request Submitted", dept: "Client", status: "Completed", date: "02 Oct 2026" },
      { name: "Initial Review", dept: "Client Services", status: "Completed", date: "08 Oct 2026" },
      { name: "Finance Review", dept: "Finance Department", status: "In Progress", date: "Started 20 Oct 2026" },
      { name: "Management Approval", dept: "Management", status: "Pending" },
      { name: "Final Approval", dept: "Approvals Office", status: "Pending" },
    ],
  },
  {
    id: "GG-APR-2026-0009",
    ref: "GG-APR-2026-0009",
    type: "Unit Allotment Letter",
    submitted: "14 Aug 2026",
    updated: "21 Sep 2026 · 11:02 AM",
    stages: [
      { name: "Request Submitted", dept: "Client", status: "Completed", date: "14 Aug 2026" },
      { name: "Initial Review", dept: "Client Services", status: "Completed", date: "18 Aug 2026" },
      { name: "Finance Review", dept: "Finance Department", status: "Completed", date: "02 Sep 2026" },
      { name: "Management Approval", dept: "Management", status: "Completed", date: "15 Sep 2026" },
      { name: "Final Approval", dept: "Approvals Office", status: "Completed", date: "21 Sep 2026" },
    ],
  },
];

export type QueryStatus = "New" | "In Progress" | "Awaiting Response" | "Resolved" | "Closed";
export type Message = { id: string; from: "client" | "rep" | "system"; text: string; time: string; attachment?: string };
export type Query = {
  id: string;
  subject: string;
  type: string;
  project: string;
  dept: string;
  status: QueryStatus;
  updated: string;
  rep: string;
  messages: Message[];
};

export const initialQueries: Query[] = [
  {
    id: "GG-QRY-2026-0012",
    subject: "March Installment Receipt Verification",
    type: "Payment",
    project: "Goldcrest Views",
    dept: "Finance",
    status: "In Progress",
    updated: "Today, 10:12 AM",
    rep: "Sara Malik",
    messages: [
      { id: "m1", from: "client", text: "Assalam-o-Alaikum. I uploaded the receipt for my 3rd installment. Could you confirm it has been received?", time: "Mon 09:20 AM", attachment: "bank-receipt-0322.pdf" },
      { id: "m2", from: "system", text: "Query assigned to Sara Malik · Finance", time: "Mon 11:00 AM" },
      { id: "m3", from: "rep", text: "Walaikum Assalam Mr. Ahmed. Thank you, we have received your receipt. It is currently being matched with our bank records.", time: "Mon 11:04 AM" },
      { id: "m4", from: "rep", text: "Verification usually takes 2–3 working days. We'll notify you once it's complete.", time: "Today 10:12 AM" },
    ],
  },
  {
    id: "GG-QRY-2026-0009",
    subject: "Possession timeline for Tower B",
    type: "Project Information",
    project: "Goldcrest Views",
    dept: "Sales",
    status: "Awaiting Response",
    updated: "28 Oct 2026",
    rep: "Bilal Ahmed",
    messages: [
      { id: "m1", from: "client", text: "Can you share the expected possession timeline for Tower B?", time: "26 Oct 03:40 PM" },
      { id: "m2", from: "rep", text: "Could you please confirm your unit number so we can share the exact schedule?", time: "28 Oct 10:15 AM" },
    ],
  },
  {
    id: "GG-QRY-2026-0004",
    subject: "Update contact number",
    type: "Account",
    project: "GG-2026-00125",
    dept: "Client Services",
    status: "Resolved",
    updated: "12 Sep 2026",
    rep: "Hina Raza",
    messages: [
      { id: "m1", from: "client", text: "Please update my mobile number on file.", time: "10 Sep 01:10 PM" },
      { id: "m2", from: "rep", text: "Your contact number has been updated successfully.", time: "12 Sep 09:30 AM" },
    ],
  },
];

export type Notice = { id: string; title: string; body: string; time: string; read: boolean; to: string; kind: "query" | "payment" | "approval" | "reminder" | "account" };

export const initialNotices: Notice[] = [
  { id: "n1", kind: "query", title: "New response on your query", body: "Sara Malik replied to GG-QRY-2026-0012.", time: "Today · 10:12 AM", read: false, to: "/inbox/GG-QRY-2026-0012" },
  { id: "n2", kind: "approval", title: "Approval moved to Finance Review", body: "GG-APR-2026-0021 is now with the Finance Department.", time: "Yesterday · 04:15 PM", read: false, to: "/approvals/GG-APR-2026-0021" },
  { id: "n3", kind: "reminder", title: "Installment overdue", body: "Unit 104 · Goldcrest Views · PKR 500,000 was due on 15 October 2026.", time: "01 Nov · 09:00 AM", read: false, to: "/installment/BK-1003422-04" },
  { id: "n4", kind: "payment", title: "Payment verification in progress", body: "Your receipt RCT-2026-0322 is being verified.", time: "20 Aug · 02:30 PM", read: true, to: "/installment/BK-1003423-03" },
  { id: "n5", kind: "query", title: "Query status changed", body: "GG-QRY-2026-0004 has been marked Resolved.", time: "12 Sep · 09:31 AM", read: true, to: "/inbox/GG-QRY-2026-0004" },
  { id: "n6", kind: "account", title: "Account activated", body: "Your Giga Group account review is complete. Full access enabled.", time: "05 Jan · 11:00 AM", read: true, to: "/profile" },
];

export const activity = [
  { title: "Query updated", body: "Finance replied on GG-QRY-2026-0012", time: "Today", kind: "query" as const },
  { title: "Approval status changed", body: "GG-APR-2026-0021 → Finance Review", time: "Yesterday", kind: "approval" as const },
  { title: "Payment receipt submitted", body: "RCT-2026-0322 · Unit 214 · PKR 150,000", time: "20 Aug", kind: "payment" as const },
  { title: "Payment verification completed", body: "Unit 104 · Installment 02 verified", time: "10 Apr", kind: "verified" as const },
];
