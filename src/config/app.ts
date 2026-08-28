/**
 * Centralized SnapCut AI configuration.
 * Everything tunable (limits, credits, pricing) lives here.
 */

const env = import.meta.env as Record<string, string | undefined>;

export const APP_NAME = env["VITE_APP_NAME"] ?? "SnapCut AI";

/** n8n Cloud webhook base URL. All AI + payment work is proxied through it. */
export const N8N_API_URL = (env["VITE_N8N_API_URL"] ?? "").replace(/\/$/, "");

/** Razorpay public key id (publishable, safe in the client). */
export const RAZORPAY_KEY_ID = env["VITE_RAZORPAY_KEY_ID"] ?? "";

export const MAX_FILE_SIZE = Number(env["VITE_MAX_FILE_SIZE"] ?? 10 * 1024 * 1024);

export const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
export const ACCEPTED_LABEL = "PNG, JPG, JPEG, WEBP";

export const CREDITS = {
  signupBonus: 10,
  guestFreeRuns: 2,
  costPerRemoval: 1,
};

export type Plan = {
  id: "free" | "pro" | "business";
  name: string;
  price: number;
  currency: string;
  period: string;
  credits: number;
  tagline: string;
  features: string[];
  popular?: boolean;
  cta: string;
};

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    currency: "₹",
    period: "forever",
    credits: 10,
    tagline: "Try SnapCut AI with no commitment.",
    features: [
      "10 free credits",
      "Standard processing",
      "Transparent PNG downloads",
      "Web based, no install",
    ],
    cta: "Start Free",
  },
  {
    id: "pro",
    name: "Pro",
    price: 499,
    currency: "₹",
    period: "month",
    credits: 300,
    tagline: "For creators and sellers shipping every day.",
    features: [
      "300 credits every month",
      "High quality edge refinement",
      "Faster priority processing",
      "PNG + JPG with custom background",
      "Email support",
    ],
    popular: true,
    cta: "Upgrade to Pro",
  },
  {
    id: "business",
    name: "Business",
    price: 1499,
    currency: "₹",
    period: "month",
    credits: 1500,
    tagline: "Bulk catalogues and team workflows.",
    features: [
      "1,500 credits every month",
      "Highest quality processing",
      "Priority queue",
      "Commercial usage rights",
      "Priority support",
    ],
    cta: "Upgrade to Business",
  },
];

export const CREDIT_PACKS = [
  { id: "pack-50", credits: 50, price: 199, currency: "₹" },
  { id: "pack-200", credits: 200, price: 599, currency: "₹" },
  { id: "pack-500", credits: 500, price: 1299, currency: "₹" },
];

export const FAQS = [
  {
    q: "Is SnapCut AI free?",
    a: "Yes. Every new account gets 10 free credits and you can try the tool without signing up. Paid plans add more credits, higher quality output and priority processing.",
  },
  {
    q: "What image formats are supported?",
    a: `We support ${ACCEPTED_LABEL} files up to ${Math.round(MAX_FILE_SIZE / (1024 * 1024))}MB each.`,
  },
  {
    q: "How long does processing take?",
    a: "Most images finish in a few seconds. Larger files or busy periods can take slightly longer, and Pro plans always run in the priority queue.",
  },
  {
    q: "Can I download transparent images?",
    a: "Yes. Results are delivered as transparent PNGs. You can also export JPG with a white, black or custom background colour.",
  },
  {
    q: "Do I need to install software?",
    a: "No. SnapCut AI runs entirely in your browser on desktop, tablet and mobile.",
  },
  {
    q: "What happens to my uploaded images?",
    a: "Images are only used to produce your result. They are not sold, shared or used for advertising, and processed files are removed from temporary storage automatically.",
  },
  {
    q: "How do credits work?",
    a: `One background removal uses ${CREDITS.costPerRemoval} credit. Credits refresh with your monthly plan, and you can top up any time with a credit pack.`,
  },
];
