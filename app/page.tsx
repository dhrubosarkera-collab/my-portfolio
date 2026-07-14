"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  BrainCircuit,
  ChevronDown,
  Command,
  Download,
  ExternalLink,
  Mail,
  Maximize2,
  Menu,
  Radar,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";

/* ============================================================================
   DATA
   ========================================================================== */

const LOGO_URL =
  "https://res.cloudinary.com/oiqiiqca/image/upload/v1783744697/ChatGPT_Image_Jul_11_2026_10_17_49_AM_r4a8uk.png";

const PROFILE = {
  name: "Dhrubo Sarker Avroo",
  shortName: "Avroo",
  tagline: "Future Cybersecurity Founder · AI Architect · Cultural Analytics Researcher",
  bio: "I am a Class 9 Science student at Cantonment Public School and College, Lalmonirhat. Through intense participation in diverse competitive platforms, I have built strong critical thinking, analytical logic, and leadership skill sets. Currently leading a long-term academic research project exploring youth identity and modern digital lifestyles, alongside pursuing architectures in AI frameworks and cybersecurity solutions.",
  grade: "Class 9 · Science",
  school: "Cantonment Public School and College, Lalmonirhat",
  location: "Lalmonirhat, Bangladesh",
  email: "dhrubosarkera@gmail.com",
  photoUrl:
    "https://res.cloudinary.com/oiqiiqca/image/upload/v1783744697/ChatGPT_Image_Jul_11_2026_10_17_49_AM_r4a8uk.png",
  roles: [
    "Cybersecurity Researcher",
    "AI Framework Architect",
    "OSINT Specialist",
    "Data Intelligence Specialist",
  ],
};

interface SocialConfig {
  label: string;
  url: string;
  color: string;
  svg: ReactNode;
}

const SOCIALS: Record<string, SocialConfig> = {
  github: {
    label: "GitHub",
    url: "https://github.com/dhrubosarkera-collab",
    color: "#a855f7",
    svg: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.061.069-.061 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"
        />
      </svg>
    ),
  },
  linkedin: {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/dhrubo-sarker-avroo-895b66418",
    color: "#3b82f6",
    svg: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  facebook: {
    label: "Facebook",
    url: "https://www.facebook.com/share/1CdBJBUrTC/",
    color: "#2563eb",
    svg: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  instagram: {
    label: "Instagram",
    url: "https://www.instagram.com/dhrv.0x",
    color: "#ec4899",
    svg: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  x: {
    label: "X",
    url: "https://x.com/dhrubo_exe",
    color: "#e2e8f0",
    svg: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  threads: {
    label: "Threads",
    url: "https://www.threads.net/@dhrv.0x",
    color: "#e2e8f0",
    svg: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.586 2.25c-5.452 0-9.454 3.738-9.454 9.38 0 5.424 4.08 9.548 9.537 9.548 3.123 0 5.485-.98 7.03-2.525l-1.528-1.488c-1.155 1.135-2.923 1.833-5.502 1.833-4.321 0-7.234-3.136-7.234-7.368 0-4.336 2.924-7.203 7.152-7.203 3.653 0 6.002 2.115 6.002 5.568 0 2.052-.962 3.12-2.183 3.12-.663 0-1.176-.407-1.176-1.222V7.12H12.72v.305c-.495-.315-1.173-.498-2.02-.498-2.22 0-3.955 1.874-3.955 4.383 0 2.454 1.706 4.322 3.905 4.322 1.011 0 1.767-.323 2.193-.842.457.702 1.25 1.055 2.378 1.055 2.302 0 4.174-1.92 4.174-5.32 0-4.66-3.32-7.575-8.809-7.575zm-1.895 5.556c1.233 0 2.146.994 2.146 2.368 0 1.343-.884 2.368-2.13 2.368-1.225 0-2.153-.994-2.153-2.368 0-1.353.914-2.368 2.137-2.368z" />
      </svg>
    ),
  },
  hackerrank: {
    label: "HackerRank",
    url: "https://www.hackerrank.com/profile/dhrubosarkera",
    color: "#22c55e",
    svg: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.05 4.8a3.15 3.15 0 00-3.15-3.15H5.1A3.15 3.15 0 001.95 4.8v14.4A3.15 3.15 0 005.1 22.35h13.8a3.15 3.15 0 003.15-3.15V4.8zM14.4 15.6h-4.8v-1.2h4.8v1.2zm0-2.4h-4.8v-1.2h4.8v1.2zm0-2.4h-4.8V9.6h4.8v1.2zm1.8-2.4H7.8V6.6h8.4V8.4z" />
      </svg>
    ),
  },
  discord: {
    label: "Discord",
    url: "https://discord.com/users/915865243553415178",
    color: "#6366f1",
    svg: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.093 13.093 0 01-1.873-.894.077.077 0 01-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 01.077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.099.246.195.373.289a.077.077 0 01-.006.127 12.298 12.298 0 01-1.873.894.077.077 0 01-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
      </svg>
    ),
  },
  telegram: {
    label: "Telegram",
    url: "https://t.me/dhrv_0x",
    color: "#06b6d4",
    svg: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0C5.344 0 0 5.344 0 12s5.344 12 11.944 12c6.6 0 12-5.344 12-12S18.544 0 11.944 0zm5.513 8.156l-1.925 9.062c-.144.65-.531.806-1.075.5l-2.938-2.162-1.419 1.369c-.156.156-.288.288-.594.288l.213-3.013 5.488-4.962c.238-.213-.05-.331-.369-.119L7.581 13.15l-2.919-.912c-.638-.2-.65-.638.131-.944l11.406-4.4c.531-.2 1 .112.738 1.262z" />
      </svg>
    ),
  },
  whatsapp: {
    label: "WhatsApp",
    url: "https://wa.me/8801717676292",
    color: "#10b981",
    svg: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  gmail: {
    label: "Gmail",
    url: "mailto:dhrubosarkera@gmail.com",
    color: "#ef4444",
    svg: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 5.457v13.086c0 .804-.652 1.457-1.457 1.457h-3.371V9.543L12 13.913 4.829 9.543v10.457H1.457C.652 20 0 19.348 0 18.543V5.457c0-.584.346-1.109.877-1.339.531-.23 1.15-.1 1.558.333L12 11.232l9.565-6.781c.408-.433 1.027-.563 1.558-.333.531.23.877.755.877 1.339z" />
      </svg>
    ),
  },
};

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#journey", label: "Journey" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];
const SECTION_IDS = NAV_LINKS.map((link) => link.href.replace("#", ""));

interface SkillItem {
  name: string;
  level: number;
  category: string;
}

const SKILLS: SkillItem[] = [
  { name: "Analytical Geography & Logic Grid", level: 95, category: "Core Intelligence" },
  { name: "Python Scripting Core", level: 90, category: "Engineering" },
  { name: "AI Prompt Architecture", level: 85, category: "AI Exploration" },
  { name: "Frontend Architecture (React/Next.js)", level: 80, category: "Engineering" },
  { name: "OSINT & Digital Tracing", level: 75, category: "Security" },
  { name: "Cybersecurity Fundamentals", level: 70, category: "Security" },
];

interface TimelineItem {
  year: string;
  title: string;
  desc: string;
}

const TIMELINE: TimelineItem[] = [
  {
    year: "2026",
    title: "Global Platforms & Research Mesh",
    desc: "Secured Diamond at GELOSEA and Silver at FISO Math. Initiated a 7-month comprehensive research deployment on youth cultural trends.",
  },
  {
    year: "2025",
    title: "The Champion Era (ISOC & Quiz)",
    desc: "Emerged as the Overall Champion of ISOC 7.0 with 4 medals. Led team to 5th place globally at the DUQS International Quiz Fest.",
  },
  {
    year: "2024",
    title: "BdJSO Camp & Structural Logic",
    desc: "Selected for the high-stakes National Camp pipeline in the Bangladesh Junior Science Olympiad.",
  },
  {
    year: "2023",
    title: "Genesis Foundations",
    desc: "Initiated systematic tracking of core AI workflows, foundational scripting architectures, and localized competitive arenas.",
  },
];

interface Project {
  name: string;
  desc: string;
  tech: string[];
  icon: "radar" | "shield" | "sparkles";
}

const PROJECTS: Project[] = [
  {
    name: "Youth Culture & Digital Footprints",
    desc: "An active, 7-month extensive analytical research project tracking youth culture, localized social shifts, systemic identity patterns, and the direct impact of modern digital ecosystems in Bangladesh.",
    tech: ["Data Analysis", "Field Research", "Social Metrics"],
    icon: "radar",
  },
  {
    name: "Project Sentinel Node",
    desc: "A conceptual cybersecurity dashboard designed to map regional vulnerability paradigms and safe architecture models.",
    tech: ["Next.js", "Tailwind CSS", "Research Concept"],
    icon: "shield",
  },
  {
    name: "Sovereign AI Academic Guide",
    desc: "Exploratory logic arrays prioritizing data-safety guardrails on open, localized LLMs for teen education.",
    tech: ["AI Models", "Data Optimization"],
    icon: "sparkles",
  },
];

type AchievementTag = "International" | "National" | "Regional";

interface Achievement {
  title: string;
  event: string;
  tag: AchievementTag;
  technical?: boolean;
  /** Direct, embeddable image (Cloudinary) — renders inline + opens in the lightbox */
  image?: string;
  /** External page only (e.g. ibb.co share page) — opens in a new tab, can't be embedded */
  fileUrl?: string;
  /** Official third-party verification / registry link */
  verifyUrl?: string;
}

const ACHIEVEMENTS: Achievement[] = [
  { title: "Gold Medalist — Geography", event: "International Science Olympiad Contest (ISOC 7.0) 2025, held by PT Pateron Edukasi Indonesia", tag: "International", fileUrl: "https://ibb.co.com/7JrWpGZ7" },
  { title: "Silver Medalist — Mathematics", event: "International Science Olympiad Contest (ISOC 7.0) 2025, held by PT Pateron Edukasi Indonesia", tag: "International", fileUrl: "https://ibb.co.com/whGdGRh7Z" },
  { title: "Silver Medalist — Science", event: "International Science Olympiad Contest (ISOC 7.0) 2025, held by PT Pateron Edukasi Indonesia", tag: "International", image: "https://res.cloudinary.com/oiqiiqca/image/upload/v1783743815/isoc-7-science.jpg_ta5bql.png" },
  { title: "English Finalist", event: "International Science Olympiad Contest (ISOC 7.0) 2025, held by PT Pateron Edukasi Indonesia", tag: "International", image: "https://res.cloudinary.com/oiqiiqca/image/upload/v1783743816/isoc-7-english.jpg_rekrls.png" },
  { title: "Verified Winner — ISOC 9.0", event: "International Science Olympiad Contest (ISOC 9.0) 2026 — listed on the official winners registry", tag: "International", verifyUrl: "https://isoc-olympiad.com/winner/" },
  { title: "Finalist (5th Internationally)", event: "1st DUQS International Quiz Fest 2025 — led Team 'Perfect'", tag: "International", image: "https://res.cloudinary.com/oiqiiqca/image/upload/v1783743806/duqs-quiz-fest-finalist_epmkho.jpg" },
  { title: "Diamond Award Winner & Nationalist", event: "Global English Language Olympiad of Southeast Asia (GELOSEA) 2026", tag: "International", fileUrl: "https://ibb.co.com/ccSzmRpt" },
  { title: "International Round Qualifier", event: "Conquest International IQ Olympiad (2026)", tag: "International" },
  { title: "International Chemistry Competition Participant", event: "IChC (International Chemistry Competition) 2026 — global participation round", tag: "International", fileUrl: "https://ibb.co.com/X6rstrV" },
  { title: "Global Scouting Participant", event: "Jamboree On The Air (JOTA-JOTI) — Certificate of Participation", tag: "International", fileUrl: "https://ibb.co.com/ZrTQsvX" },
  { title: "Silver Award Winner", event: "Future Intelligence Students Olympiad (FISO) 2026 — National Round (Math)", tag: "National", fileUrl: "https://ibb.co.com/ccYvFXXv" },
  { title: "Divisional Topper", event: "National Earth Olympiad (NEO) 2025 — organised by BYEI", tag: "National", image: "https://res.cloudinary.com/oiqiiqca/image/upload/v1783743813/neo-2025-divisional-topper_n3os5v.jpg" },
  { title: "National Champion", event: "Bangladesh General Knowledge Olympiad 2025", tag: "National", fileUrl: "https://ibb.co.com/B5rnGhYL" },
  { title: "Second Runner-Up (Junior)", event: "National IQ Olympiad 2025 — MFH Science Club", tag: "National", fileUrl: "https://ibb.co.com/0jgr5VkW" },
  { title: "National Round Winner (Senior)", event: "Mind Marathon — organised by Nextgen Learns", tag: "National", fileUrl: "https://ibb.co.com/PGZvVVrn" },
  { title: "National Round Winner", event: "Creative Olympiad 2025", tag: "National", fileUrl: "https://ibb.co.com/Df0t2D0C" },
  { title: "5th Place Nationwide", event: "SchoolBid 2025 — powered by Bai Borno AI & BD Advocate Association", tag: "National", fileUrl: "https://ibb.co.com/27mGMDBZ" },
  { title: "Top 10 Nationwide Finalist", event: "National Achievement Program — Top 10 country-wide finalist", tag: "National", image: "https://res.cloudinary.com/oiqiiqca/image/upload/v1783743804/avroo-top10-certificate_pyd8fk.jpg" },
  { title: "1st Place Winner", event: "World No Tobacco Day Quiz 2025 — organised by Nutrition Club BSJA", tag: "National", fileUrl: "https://ibb.co.com/vCt7dx08" },
  { title: "Semi-Final Round Winner", event: "ICT Olympiad Bangladesh 2025", tag: "National", technical: true, fileUrl: "https://ibb.co.com/8gm5ywnw" },
  { title: "Preliminary Winner & Nationalist", event: "Bangladesh Artificial Intelligence Olympiad (BDAIO) 2025", tag: "National", technical: true, fileUrl: "https://ibb.co.com/S7Gbsw7z" },
  { title: "National Innovation Program — Preliminary Participant", event: "National Innovation Olympiad — Preliminary Certificate", tag: "National", fileUrl: "https://ibb.co.com/pr1Yhbtn" },
];

interface Certificate {
  title: string;
  issuer: string;
  image?: string;
  fileUrl?: string;
  /** true if this entry is new since the last audit and needs a title/date check */
  needsReview?: boolean;
}

const CERTIFICATES: Certificate[] = [
  { title: "Hour of AI Certified", issuer: "code.org — Certificate of Completion for The Hour of A.I., demonstrating an understanding of basic AI concepts", image: "https://res.cloudinary.com/oiqiiqca/image/upload/v1783743809/codeorg-certificate.jpg_dvumdg.jpg" },
  { title: "Coding Fundamentals Certified", issuer: "Coding Fundamentals with Python — Certificate of Completion, 28 October 2025", image: "https://res.cloudinary.com/oiqiiqca/image/upload/v1783743816/python-coding-fundamentals_sr6tat.jpg" },
  { title: "Web Design Certified", issuer: "Website Design with HTML, CSS & JavaScript — Certificate of Completion, 31 March 2026", image: "https://res.cloudinary.com/oiqiiqca/image/upload/v1783743804/website-design-html-css-js_gabyeq.jpg" },
  { title: "Code for Language 2026 Certified", issuer: "Code for Language 2026 — Certificate of Completion", fileUrl: "https://ibb.co.com/Swh8LSfg" },
  { title: "Data Analytics Quiz Completion", issuer: "Athena Global Education — Executive Diploma in Data Analytics, Business Data Quiz", image: "https://res.cloudinary.com/oiqiiqca/image/upload/v1783743804/athena-data-analytics-quiz_amkcmg.jpg" },
  { title: "Convention on the Rights of the Child — e-Learning Certificate", issuer: "e-Learning certificate on the Convention on the Rights of the Child", image: "https://res.cloudinary.com/oiqiiqca/image/upload/v1783743804/unece-elearning_c6tetr.jpg", needsReview: true },
  { title: "Academic English Grammar Certified", issuer: "10 Minute School — Academic English Grammar Course", image: "https://res.cloudinary.com/oiqiiqca/image/upload/f_auto,q_auto/academic-english-grammar_hzowhx" },
  { title: "Spoken English Certified", issuer: "Lingual Academy — Spoken English Course, Certificate of Completion 2025", fileUrl: "https://ibb.co.com/TBZXxFCt" },
  { title: "Leadership Certificate", issuer: "Leadership training — Certificate of Completion", image: "https://res.cloudinary.com/oiqiiqca/image/upload/v1783743811/leadership-certificate_wtqzod.jpg", needsReview: true },
  { title: "Leadership Certificate II", issuer: "Leadership training — Certificate of Completion", image: "https://res.cloudinary.com/oiqiiqca/image/upload/v1783743813/leadership-certificate-2_enlqhy.jpg", needsReview: true },
  { title: "NIQF — Preliminary Certificate", issuer: "Preliminary round certificate, NIQF", image: "https://res.cloudinary.com/oiqiiqca/image/upload/v1783743814/niqf-preliminary-certificate_xtccca.jpg", needsReview: true },
];

/**
 * Images you sent that don't have a confident match to any title/event
 * already in this file. Rather than guess and risk mislabeling a real
 * certificate, they're intentionally left out of CERTIFICATES/ACHIEVEMENTS
 * above — drop them in once you confirm what each one is:
 *
 * - https://res.cloudinary.com/oiqiiqca/image/upload/v1783756006/Screenshot_2026-07-11_134626_v6trru.png
 * - https://res.cloudinary.com/oiqiiqca/image/upload/v1783744780/IMG-20260314-WA0001_1_ad8nva.jpg
 * - https://res.cloudinary.com/oiqiiqca/image/upload/v1783744777/1039337408450916_g8klxd.jpg
 * - https://res.cloudinary.com/oiqiiqca/image/upload/v1783744789/PDFReader_20260705_1420_05_xbgu9r.png
 * - https://res.cloudinary.com/oiqiiqca/image/upload/v1783743818/isoc-7-chemistry.jpg_nrgrwe.png
 *   (likely ISOC 7.0 Geography or Mathematics medal — confirm which)
 */

interface SearchEntry {
  label: string;
  sublabel: string;
  href: string;
}

function buildSearchIndex(): SearchEntry[] {
  const nav = NAV_LINKS.map((n) => ({ label: n.label, sublabel: "Section", href: n.href }));
  const achievements = ACHIEVEMENTS.map((a) => ({ label: a.title, sublabel: a.event, href: "#achievements" }));
  const certificates = CERTIFICATES.map((c) => ({ label: c.title, sublabel: c.issuer, href: "#certificates" }));
  const projects = PROJECTS.map((p) => ({ label: p.name, sublabel: p.desc, href: "#projects" }));
  const skills = SKILLS.map((s) => ({ label: s.name, sublabel: s.category, href: "#skills" }));
  return [...nav, ...achievements, ...certificates, ...projects, ...skills];
}

const SEARCH_INDEX = buildSearchIndex();

interface LightboxItem {
  src: string;
  alt: string;
}

/* ============================================================================
   MOTION VARIANTS
   ========================================================================== */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const reducedFadeUp: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

const viewportOnce = { once: true, margin: "-80px" } as const;

function pickVariants(base: Variants, reduced: boolean): Variants {
  return reduced ? reducedFadeUp : base;
}

/* ============================================================================
   HOOKS
   ========================================================================== */

function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  const ratios = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.current.set(entry.target.id, entry.intersectionRatio);
        });
        let bestId = active;
        let bestRatio = 0;
        ratios.current.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        if (bestRatio > 0) setActive(bestId);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "-15% 0px -55% 0px" }
    );

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(",")]);

  return active;
}

function usePointerGlow<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia?.("(pointer: coarse)").matches) return;

    const handleMove = (e: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    const handleLeave = () => setPos(null);

    node.addEventListener("pointermove", handleMove);
    node.addEventListener("pointerleave", handleLeave);
    return () => {
      node.removeEventListener("pointermove", handleMove);
      node.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return { ref, pos };
}

/* ============================================================================
   UI PRIMITIVES
   ========================================================================== */

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <div className={`mb-10 sm:mb-14 ${isCenter ? "text-center mx-auto max-w-2xl" : ""}`}>
      <div className={`flex items-center gap-2 mb-3 ${isCenter ? "justify-center" : ""}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
        <span className="font-mono-ui text-[11px] font-semibold uppercase tracking-[0.3em] text-teal-400">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">{description}</p>
      )}
    </div>
  );
}

interface RevealProps {
  children: ReactNode;
  variants?: Variants;
  delay?: number;
  className?: string;
}

function Reveal({ children, variants = fadeUp, delay = 0, className }: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={pickVariants(variants, Boolean(reduced))}
      transition={{ delay: reduced ? 0 : delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function RotatingWord({ words, intervalMs = 2800 }: { words: string[]; intervalMs?: number }) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || words.length <= 1) return;
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % words.length), intervalMs);
    return () => clearInterval(timer);
  }, [words.length, intervalMs, reduced]);

  return (
    <span className="relative inline-flex h-[1.4em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -14 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

function SpotlightCard({ children, className = "", glowColor = "45,212,191" }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: ReactMouseEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    node.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      style={{ ["--spot-color" as string]: glowColor }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-colors duration-300 hover:border-white/20 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(500px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(var(--spot-color), 0.12), transparent 65%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ============================================================================
   SECTIONS
   ========================================================================== */

function Navbar({ onOpenSearch }: { onOpenSearch: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-[#0E1522]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
        <a href="#about" className="flex items-center gap-2.5">
          <img
            src={LOGO_URL}
            alt={`${PROFILE.name} logo`}
            width={36}
            height={36}
            loading="eager"
            decoding="async"
            className="h-8 w-8 rounded-lg object-cover ring-1 ring-white/10 sm:h-9 sm:w-9"
          />
          <span className="font-heading text-base font-bold tracking-wide text-white sm:text-lg">
            {PROFILE.shortName}
            <span className="text-teal-400">.dev</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                className={`font-mono-ui relative py-1 text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors ${
                  isActive ? "text-teal-400" : "text-slate-400 hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-teal-400"
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-white/20 hover:bg-white/10 sm:px-3.5 sm:py-2"
            aria-label="Open search (Command K)"
          >
            <Command className="h-3.5 w-3.5 opacity-60" />
            <span className="font-mono-ui hidden sm:inline">K</span>
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-xl p-2 text-slate-300 hover:text-white lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/5 bg-[#0E1522]/95 backdrop-blur-xl lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono-ui block rounded-xl px-3 py-3 text-sm font-semibold uppercase tracking-wider text-slate-300 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const { ref, pos } = usePointerGlow<HTMLElement>();

  return (
    <section
      id="hero"
      ref={ref}
      className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8 lg:pt-40"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
        style={{
          opacity: pos ? 1 : 0,
          background: pos
            ? `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(45,212,191,0.08), transparent 70%)`
            : undefined,
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 lg:order-1 lg:col-span-7"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/5 px-3 py-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-400" />
            </span>
            <span className="font-mono-ui text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-300">
              {PROFILE.grade} Student · {PROFILE.location}
            </span>
          </div>

          <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {PROFILE.name}
          </h1>

          <div className="mt-3 flex items-center gap-2 text-lg font-semibold text-amber-400 sm:text-xl">
            <span className="font-mono-ui text-teal-500">//</span>
            <RotatingWord words={PROFILE.roles} />
          </div>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">{PROFILE.bio}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-transform active:scale-[0.98] hover:bg-teal-400"
            >
              See my work
              <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition-colors hover:bg-white/10"
            >
              <Mail className="h-4 w-4" />
              Get in touch
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2.5 border-t border-white/5 pt-6">
            {Object.entries(SOCIALS).map(([key, social]) => (
              <a
                key={key}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
                style={{ ["--glow" as string]: social.color }}
                className="social-icon flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:text-white"
              >
                {social.svg}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 flex justify-center lg:order-2 lg:col-span-5"
        >
          <div className="group relative w-full max-w-[300px] overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-xl sm:max-w-[360px]">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/5 bg-slate-950">
              <img
                src={PROFILE.photoUrl}
                alt={PROFILE.name}
                width={480}
                height={480}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-16 hidden justify-center sm:flex"
      >
        <a href="#about" aria-hidden="true" className="text-slate-600 transition-colors hover:text-teal-400">
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}

const FOCUS_AREAS = [
  { icon: ShieldCheck, label: "Cybersecurity" },
  { icon: BrainCircuit, label: "AI Frameworks" },
  { icon: Radar, label: "OSINT Investigation" },
  { icon: TerminalSquare, label: "Software Development" },
];

function About() {
  const internationalWins = ACHIEVEMENTS.filter((a) => a.tag === "International").length;
  const nationalWins = ACHIEVEMENTS.filter((a) => a.tag === "National").length;
  const stats = [
    { value: `${internationalWins}+`, label: "International Recognitions" },
    { value: `${nationalWins}+`, label: "National Recognitions" },
    { value: `${CERTIFICATES.length}`, label: "Certifications Earned" },
  ];

  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <SectionHeading eyebrow="// Profile" title="About" />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">{PROFILE.bio}</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
            {PROFILE.tagline}. Based in {PROFILE.location} — currently in {PROFILE.grade} at {PROFILE.school}.
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {FOCUS_AREAS.map((area) => (
              <span
                key={area.label}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-slate-300"
              >
                <area.icon className="h-3.5 w-3.5 text-teal-400" />
                {area.label}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl sm:p-6">
                <div className="font-heading text-3xl font-bold text-white sm:text-4xl">{stat.value}</div>
                <div className="font-mono-ui mt-1 text-[11px] uppercase tracking-[0.15em] text-slate-500">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function groupSkillsByCategory() {
  const map = new Map<string, SkillItem[]>();
  for (const skill of SKILLS) {
    const list = map.get(skill.category) ?? [];
    list.push(skill);
    map.set(skill.category, list);
  }
  return Array.from(map.entries());
}

function Skills() {
  const groups = groupSkillsByCategory();

  return (
    <section id="skills" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <SectionHeading eyebrow="// Capabilities" title="Skills" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map(([category, skills], groupIndex) => (
          <Reveal
            key={category}
            delay={groupIndex * 0.08}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl sm:p-6"
          >
            <div className="font-mono-ui mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-400">
              {category}
            </div>
            <div className="space-y-5">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-1.5 flex items-baseline justify-between gap-3">
                    <span className="text-sm font-medium text-slate-200">{skill.name}</span>
                    <span className="font-mono-ui shrink-0 text-xs font-semibold text-amber-400">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={viewportOnce}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section id="journey" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <SectionHeading eyebrow="// Timeline" title="Journey" />

      <div className="relative space-y-8 border-l-2 border-white/10 pl-6 sm:space-y-10 sm:pl-10">
        {TIMELINE.map((item, index) => (
          <Reveal key={item.year} variants={slideFromLeft} delay={index * 0.08} className="relative">
            <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-teal-400 bg-[#0E1522] sm:-left-[47px]">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            </span>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
              <span className="font-mono-ui shrink-0 self-start rounded-md bg-white/5 px-2.5 py-0.5 text-sm font-bold text-teal-400">
                {item.year}
              </span>
              <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl transition-colors hover:border-white/20 sm:p-5">
                <h3 className="font-heading text-sm font-semibold text-slate-100 sm:text-base">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">{item.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const PROJECT_ICONS: Record<Project["icon"], LucideIcon> = {
  radar: Radar,
  shield: ShieldCheck,
  sparkles: Sparkles,
};

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <SectionHeading
        eyebrow="// Selected Work"
        title="Projects"
        description="Independent research and technical builds spanning cultural analytics, cybersecurity concepts, and applied AI."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, index) => {
          const Icon = PROJECT_ICONS[project.icon];
          return (
            <Reveal key={project.name} delay={index * 0.1}>
              <SpotlightCard className="flex h-full flex-col p-5 sm:p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-teal-500/20 bg-teal-500/10">
                  <Icon className="h-6 w-6 text-teal-400" />
                </div>
                <h3 className="font-heading mt-5 text-lg font-bold text-white">{project.name}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-400">{project.desc}</p>
                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/5 pt-4">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono-ui rounded-md bg-white/5 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-amber-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

const TAG_ORDER: AchievementTag[] = ["International", "National", "Regional"];

const TAG_STYLES: Record<AchievementTag, string> = {
  International: "bg-teal-500/15 text-teal-300",
  National: "bg-amber-500/15 text-amber-300",
  Regional: "bg-indigo-500/15 text-indigo-300",
};

function Achievements({ onOpenLightbox }: { onOpenLightbox: (item: LightboxItem) => void }) {
  const availableTags = useMemo(
    () => TAG_ORDER.filter((tag) => ACHIEVEMENTS.some((a) => a.tag === tag)),
    []
  );
  const [activeTab, setActiveTab] = useState<"All" | AchievementTag>("All");

  const filtered =
    activeTab === "All" ? ACHIEVEMENTS : ACHIEVEMENTS.filter((a) => a.tag === activeTab);

  return (
    <section id="achievements" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <SectionHeading
        eyebrow="// Record"
        title="Achievements"
        description="Verified competition results across international and national platforms."
      />

      <div className="mb-6 flex flex-wrap gap-2 border-b border-white/5 pb-5">
        {(["All", ...availableTags] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-mono-ui rounded-lg px-3 py-2 text-[11px] font-semibold uppercase tracking-wider transition-all ${
              activeTab === tab
                ? "bg-teal-500 text-slate-950"
                : "border border-white/10 bg-white/5 text-slate-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, index) => (
          <Reveal key={`${item.title}-${index}`} delay={(index % 9) * 0.04}>
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl transition-colors hover:border-white/20 sm:p-5">
              <div className="mb-3 flex items-center justify-between gap-2">
                <span
                  className={`font-mono-ui rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${TAG_STYLES[item.tag]}`}
                >
                  {item.tag}
                </span>
                {item.technical && (
                  <span className="flex items-center gap-1 text-slate-500" title="Technical / STEM competition">
                    <ShieldCheck className="h-3.5 w-3.5" />
                  </span>
                )}
              </div>
              <h3 className="font-heading text-sm font-bold leading-snug text-slate-100 sm:text-base">
                {item.title}
              </h3>
              <p className="mt-1.5 flex-1 text-xs leading-relaxed text-slate-400">{item.event}</p>

              {(item.image || item.fileUrl || item.verifyUrl) && (
                <div className="mt-4 flex items-center gap-2 border-t border-white/5 pt-3">
                  {item.image && (
                    <button
                      onClick={() => onOpenLightbox({ src: item.image!, alt: item.title })}
                      className="font-mono-ui flex items-center gap-1.5 text-[11px] font-semibold text-teal-400 hover:text-teal-300"
                    >
                      <Maximize2 className="h-3 w-3" />
                      View certificate
                    </button>
                  )}
                  {!item.image && item.fileUrl && (
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono-ui flex items-center gap-1.5 text-[11px] font-semibold text-teal-400 hover:text-teal-300"
                    >
                      <ExternalLink className="h-3 w-3" />
                      View certificate
                    </a>
                  )}
                  {item.verifyUrl && (
                    <a
                      href={item.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono-ui ml-auto flex items-center gap-1.5 text-[11px] font-semibold text-amber-400 hover:text-amber-300"
                    >
                      Verify <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Certificates({ onOpenLightbox }: { onOpenLightbox: (item: LightboxItem) => void }) {
  return (
    <section id="certificates" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <SectionHeading
        eyebrow="// Credentials"
        title="Certificates"
        description="Course completions and skill credentials, separated from competition results above."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATES.map((cert, index) => (
          <Reveal key={cert.title} delay={(index % 6) * 0.06}>
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-colors hover:border-white/20">
              {cert.image ? (
                <button
                  onClick={() => onOpenLightbox({ src: cert.image!, alt: cert.title })}
                  className="group relative aspect-[4/3] w-full overflow-hidden border-b border-white/5 bg-slate-950"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/0 opacity-0 transition-all duration-300 group-hover:bg-slate-950/40 group-hover:opacity-100">
                    <span className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                      <Maximize2 className="h-3.5 w-3.5" />
                      View full size
                    </span>
                  </div>
                </button>
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center border-b border-white/5 bg-gradient-to-br from-slate-900 to-slate-950">
                  <span className="font-mono-ui text-[11px] uppercase tracking-widest text-slate-600">
                    No preview available
                  </span>
                </div>
              )}
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="font-heading text-sm font-bold leading-snug text-slate-100">{cert.title}</h3>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-slate-400">{cert.issuer}</p>
                {!cert.image && cert.fileUrl && (
                  <a
                    href={cert.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono-ui mt-3 flex items-center gap-1.5 border-t border-white/5 pt-3 text-[11px] font-semibold text-teal-400 hover:text-teal-300"
                  >
                    <ExternalLink className="h-3 w-3" />
                    View certificate
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    try {
      const response = await fetch("https://formspree.io/f/xvggpzee", {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Request failed");
      setSuccess(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/60 to-transparent" />

          <div className="mb-7 text-center">
            <span className="font-mono-ui text-[11px] font-semibold uppercase tracking-[0.3em] text-teal-400">
              // Contact
            </span>
            <h2 className="font-heading mt-2 text-2xl font-bold text-white sm:text-3xl">Let's talk</h2>
            <p className="mt-2 text-sm text-slate-400">
              Have a competition, project, or opportunity in mind? Send a message and I'll get back to you.
            </p>
          </div>

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-teal-500/20 bg-teal-500/10 p-6 text-center text-sm text-teal-300"
            >
              Message sent — thanks! I'll reply as soon as I can.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-medium text-slate-400">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/60 p-3 text-sm text-slate-100 shadow-inner transition-colors placeholder:text-slate-600 focus:border-teal-400 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-medium text-slate-400">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/60 p-3 text-sm text-slate-100 shadow-inner transition-colors placeholder:text-slate-600 focus:border-teal-400 focus:outline-none"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-medium text-slate-400">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="What would you like to talk about?"
                  className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/60 p-3 text-sm text-slate-100 shadow-inner transition-colors placeholder:text-slate-600 focus:border-teal-400 focus:outline-none"
                />
              </div>
              {error && (
                <p className="text-xs text-red-400">
                  Something went wrong sending that — please try again, or email me directly below.
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 py-3.5 text-sm font-semibold text-slate-950 transition-all hover:bg-teal-400 active:scale-[0.99] disabled:opacity-50"
              >
                {submitting ? (
                  "Sending…"
                ) : (
                  <>
                    Send message <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-6 flex items-center justify-center gap-2 border-t border-white/5 pt-6 text-sm text-slate-400">
            <Mail className="h-4 w-4 text-teal-400" />
            <a href={`mailto:${PROFILE.email}`} className="hover:text-teal-400">
              {PROFILE.email}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="font-mono-ui text-xs text-slate-500">
          © {new Date().getFullYear()} <span className="font-semibold text-slate-300">{PROFILE.name}</span>
        </p>
        <a
          href="#hero"
          className="font-mono-ui flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-teal-400"
        >
          Back to top
          <ArrowUp className="h-3.5 w-3.5" />
        </a>
      </div>
    </footer>
  );
}

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (open) window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  const q = query.trim().toLowerCase();
  const results =
    q === ""
      ? []
      : SEARCH_INDEX.filter(
          (item) => item.label.toLowerCase().includes(q) || item.sublabel.toLowerCase().includes(q)
        ).slice(0, 20);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-start justify-center bg-slate-950/80 px-4 pt-[12vh] backdrop-blur-md"
        >
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0E1522]/95 shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
              <Search className="h-4 w-4 shrink-0 text-teal-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search projects, achievements, skills…"
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />
              <kbd className="font-mono-ui hidden shrink-0 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-400 sm:block">
                ESC
              </kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto p-2">
              {q === "" && (
                <li className="px-3 py-6 text-center text-xs text-slate-500">
                  Start typing to search the whole site
                </li>
              )}
              {q !== "" && results.length === 0 && (
                <li className="px-3 py-6 text-center text-xs text-slate-500">No matches for "{query}"</li>
              )}
              {results.map((item, idx) => (
                <li key={`${item.href}-${idx}`}>
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="flex flex-col gap-0.5 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/5"
                  >
                    <span className="truncate text-sm font-medium text-slate-100">{item.label}</span>
                    <span className="truncate text-xs text-slate-500">{item.sublabel}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Lightbox({ item, onClose }: { item: LightboxItem | null; onClose: () => void }) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (item) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={item.alt}
            className="flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0E1522] shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
              <span className="truncate text-xs font-medium text-slate-300">{item.alt}</span>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={item.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] font-medium text-slate-300 hover:bg-white/10"
                >
                  <Download className="h-3.5 w-3.5" />
                  Original
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-300 hover:bg-white/10"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <div className="flex max-h-[70vh] items-center justify-center overflow-auto bg-slate-950/60 p-4 sm:p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                className="max-h-[62vh] max-w-full rounded-lg object-contain shadow-lg"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================================
   PAGE
   ========================================================================== */

export default function Home() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
      if (e.key === "Escape") setCommandOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Navbar onOpenSearch={() => setCommandOpen(true)} />
      <Hero />
      <About />
      <Skills />
      <Journey />
      <Projects />
      <Achievements onOpenLightbox={setLightbox} />
      <Certificates onOpenLightbox={setLightbox} />
      <Contact />
      <Footer />
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
      <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
    </>
  );
}