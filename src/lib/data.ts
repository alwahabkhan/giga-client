// All records below are fictional demonstration data for the Giga Group prototype.
import towers from "@/assets/photo-towers.jpg";
import towersWide from "@/assets/giga-skyline.jpg";
import mallFront from "@/assets/photo-mall-front.jpg";
import mallBridge from "@/assets/photo-mall-bridge.jpg";
import mallSign from "@/assets/photo-mall-sign.jpg";
import boutique from "@/assets/photo-boutique.jpg";
import aerialBlue from "@/assets/photo-aerial-blue.jpg";
import aerialCurve from "@/assets/photo-aerial-curve.jpg";

export const departments = ["Accounts", "Sales", "Finance", "Customer Care"] as const;

export const relatedProjects = [
  "Goldcrest Views",
  "Giga Mall Extension",
  "Goldcrest Breeze Overseas",
  "Other",
] as const;

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

export type Project = {
  id: string;
  name: string;
  location: string;
  ref: string;
  unit: string;
  type: string;
  total: number;
  paid: number;
  plan: string;
  bookingDate: string;
  image: string;
  frame?: string;
  demo?: boolean;
  update: ProjectUpdate;
};

export const projects: Project[] = [
  {
    id: "goldcrest-views",
    name: "Goldcrest Views",
    location: "DHA Phase II, Islamabad",
    ref: "GG-2026-00125",
    unit: "Tower B · Apartment 1204 · 3 Bed",
    type: "Residential Apartment",
    total: 5_000_000,
    paid: 2_000_000,
    plan: "5 Quarterly Installments",
    bookingDate: "12 Jan 2026",
    image: towers,
    update: {
      date: "17 Feb 2026",
      progress: 72,
      note: "Tower structure is up and the facade lighting is in place.",
      images: [towers, towersWide, aerialCurve],
    },
  },
  {
    id: "giga-mall",
    name: "Giga Mall Extension",
    location: "DHA Phase II, Islamabad",
    ref: "GG-2026-00311",
    unit: "Retail · Shop 214",
    type: "Commercial Retail",
    total: 8_500_000,
    paid: 1_700_000,
    plan: "10 Half-Yearly Installments",
    bookingDate: "03 Apr 2026",
    image: mallFront,
    demo: true,
    update: {
      date: "17 Feb 2026",
      progress: 84,
      note: "Mall frontage, bridge link and retail lighting are complete. Extension structure continues beside the mall.",
      images: [mallFront, mallSign, boutique],
    },
  },
  {
    id: "goldcrest-breeze",
    name: "Goldcrest Breeze Overseas",
    location: "Overseas Residences",
    ref: "GG-2026-00480",
    unit: "Block C · Apartment 806 · 2 Bed",
    type: "Overseas Apartment",
    total: 6_200_000,
    paid: 1_240_000,
    plan: "8 Quarterly Installments",
    bookingDate: "19 May 2026",
    image: aerialBlue,
    demo: true,
    update: {
      date: "17 Feb 2026",
      progress: 54,
      note: "The residential frame is rising beside the podium. Latest night shots show the current structure.",
      images: [aerialBlue, aerialCurve, mallBridge],
    },
  },
];

export type InstStatus = "Paid" | "Pending" | "Upcoming" | "Overdue";
export type Installment = {
  id: string;
  no: number;
  due: string;
  amount: number;
  paidOn?: string;
  status: InstStatus;
  verification: "Verified" | "Under Verification" | "Not Submitted";
  receipt?: string;
};

export const installments: Installment[] = [
  { id: "01", no: 1, due: "15 Jan 2026", amount: 1_000_000, paidOn: "12 Jan 2026", status: "Paid", verification: "Verified", receipt: "RCT-2026-0101" },
  { id: "02", no: 2, due: "15 Apr 2026", amount: 1_000_000, paidOn: "10 Apr 2026", status: "Paid", verification: "Verified", receipt: "RCT-2026-0214" },
  { id: "03", no: 3, due: "15 Jul 2026", amount: 1_000_000, paidOn: "14 Jul 2026", status: "Pending", verification: "Under Verification", receipt: "RCT-2026-0322" },
  { id: "04", no: 4, due: "15 Dec 2026", amount: 1_000_000, status: "Upcoming", verification: "Not Submitted" },
  { id: "05", no: 5, due: "15 Oct 2026", amount: 1_000_000, status: "Overdue", verification: "Not Submitted" },
];

export const receipts = installments.filter((i) => i.receipt);

export const statement = [
  { date: "12 Jan 2026", desc: "Booking & Installment 01", ref: "RCT-2026-0101", type: "Credit" as const, amount: 1_000_000 },
  { date: "10 Apr 2026", desc: "Installment 02", ref: "RCT-2026-0214", type: "Credit" as const, amount: 1_000_000 },
  { date: "14 Jul 2026", desc: "Installment 03 (under verification)", ref: "RCT-2026-0322", type: "Pending" as const, amount: 1_000_000 },
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
  { id: "n3", kind: "reminder", title: "Installment overdue", body: "Installment 05 of PKR 1,000,000 was due on 15 Oct 2026.", time: "01 Nov · 09:00 AM", read: false, to: "/installment/05" },
  { id: "n4", kind: "payment", title: "Payment verification in progress", body: "Your receipt RCT-2026-0322 is being verified.", time: "15 Jul · 02:30 PM", read: true, to: "/installment/03" },
  { id: "n5", kind: "query", title: "Query status changed", body: "GG-QRY-2026-0004 has been marked Resolved.", time: "12 Sep · 09:31 AM", read: true, to: "/inbox/GG-QRY-2026-0004" },
  { id: "n6", kind: "account", title: "Account activated", body: "Your Giga Group account review is complete. Full access enabled.", time: "05 Jan · 11:00 AM", read: true, to: "/profile" },
];

export const activity = [
  { title: "Query updated", body: "Finance replied on GG-QRY-2026-0012", time: "Today", kind: "query" as const },
  { title: "Approval status changed", body: "GG-APR-2026-0021 → Finance Review", time: "Yesterday", kind: "approval" as const },
  { title: "Payment receipt submitted", body: "RCT-2026-0322 · PKR 1,000,000", time: "14 Jul", kind: "payment" as const },
  { title: "Payment verification completed", body: "Installment 02 verified", time: "12 Apr", kind: "verified" as const },
];
