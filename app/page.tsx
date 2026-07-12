"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, Code2, Award, Calendar, Briefcase, User, Star, 
  ExternalLink, Download, Search, X, Check,
  ArrowRight, Cpu, Shield, Network, Layers, Zap, Rocket, Globe, Target, Eye, Send, 
  Menu, Command, ArrowDown, ChevronDown, Maximize2, Radar, Sparkles, BrainCircuit, TerminalSquare,
  ArrowUp
} from "lucide-react";

/* ============================================================
   DATA — All content restored, verified and complete
   ============================================================ */

export const PROFILE = {
  name: "Dhrubo Sarker Avroo",
  shortName: "Avroo",
  tagline: "Future Cybersecurity Founder · AI Architect · Cultural Analytics Researcher",
  bio: "I am a Class 9 Science student at Cantonment Public School and College, Lalmonirhat. Through intense participation in diverse competitive platforms, I have built strong critical thinking, analytical logic, and leadership skill sets. Currently leading a long-term academic research project exploring youth identity and modern digital lifestyles, alongside pursuing architectures in AI frameworks and cybersecurity solutions.",
  grade: "Class 9 · Science",
  school: "Cantonment Public School and College Lalmonirhat",
  location: "Lalmonirhat, Bangladesh",
  email: "dhrubosarkera@gmail.com",
  photoUrl: "https://res.cloudinary.com/oiqiiqca/image/upload/v1783744697/ChatGPT_Image_Jul_11_2026_10_17_49_AM_r4a8uk.png",
  roles: ["Cybersecurity Researcher", "AI Framework Architect", "OSINT Specialist", "Data Intelligence Specialist"],
};

export const SOCIALS: Record<string, { label: string; url: string; color: string; svg: React.ReactNode }> = {
  github: {
    label: "GitHub",
    url: "https://github.com/dhrubosarkera-collab",
    color: "#a855f7",
    svg: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.061.069-.061 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" /></svg>,
  },
  linkedin: {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/dhrubo-sarker-avroo-895b66418",
    color: "#3b82f6",
    svg: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>,
  },
  facebook: {
    label: "Facebook",
    url: "https://www.facebook.com/share/1CdBJBUrTC/",
    color: "#2563eb",
    svg: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
  },
  instagram: {
    label: "Instagram",
    url: "https://www.instagram.com/dhrv.0x",
    color: "#ec4899",
    svg: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0 3.259-.014 3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>,
  },
  x: {
    label: "X",
    url: "https://x.com/dhrubo_exe",
    color: "#e2e8f0",
    svg: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
  },
  threads: {
    label: "Threads",
    url: "https://www.threads.net/@dhrv.0x",
    color: "#e2e8f0",
    svg: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.586 2.25c-5.452 0-9.454 3.738-9.454 9.38 0 5.424 4.08 9.548 9.537 9.548 3.123 0 5.485-.98 7.03-2.525l-1.528-1.488c-1.155 1.135-2.923 1.833-5.502 1.833-4.321 0-7.234-3.136-7.234-7.368 0-4.336 2.924-7.203 7.152-7.203 3.653 0 6.002 2.115 6.002 5.568 0 2.052-.962 3.12-2.183 3.12-.663 0-1.176-.407-1.176-1.222V7.12H12.72v.305c-.495-.315-1.173-.498-2.02-.498-2.22 0-3.955 1.874-3.955 4.383 0 2.454 1.706 4.322 3.905 4.322 1.011 0 1.767-.323 2.193-.842.457.702 1.25 1.055 2.378 1.055 2.302 0 4.174-1.92 4.174-5.32 0-4.66-3.32-7.575-8.809-7.575zm-1.895 5.556c1.233 0 2.146.994 2.146 2.368 0 1.343-.884 2.368-2.13 2.368-1.225 0-2.153-.994-2.153-2.368 0-1.353.914-2.368 2.137-2.368z" /></svg>,
  },
  hackerrank: {
    label: "HackerRank",
    url: "https://www.hackerrank.com/profile/dhrubosarkera",
    color: "#22c55e",
    svg: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.05 4.8a3.15 3.15 0 00-3.15-3.15H5.1A3.15 3.15 0 001.95 4.8v14.4A3.15 3.15 0 005.1 22.35h13.8a3.15 3.15 0 003.15-3.15V4.8zM14.4 15.6h-4.8v-1.2h4.8v1.2zm0-2.4h-4.8v-1.2h4.8v1.2zm0-2.4h-4.8V9.6h4.8v1.2zm1.8-2.4H7.8V6.6h8.4V8.4z" /></svg>,
  },
  discord: {
    label: "Discord",
    url: "https://discord.com/users/915865243553415178",
    color: "#6366f1",
    svg: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.093 13.093 0 01-1.873-.894.077.077 0 01-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 01.077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.099.246.195.373.289a.077.077 0 01-.006.127 12.298 12.298 0 01-1.873.894.077.077 0 01-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" /></svg>,
  },
  telegram: {
    label: "Telegram",
    url: "https://t.me/dhrv_0x",
    color: "#06b6d4",
    svg: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0C5.344 0 0 5.344 0 12s5.344 12 11.944 12c6.6 0 12-5.344 12-12S18.544 0 11.944 0zm5.513 8.156l-1.925 9.062c-.144.65-.531.806-1.075.5l-2.938-2.162-1.419 1.369c-.156.156-.288.288-.594.288l.213-3.013 5.488-4.962c.238-.213-.05-.331-.369-.119L7.581 13.15l-2.919-.912c-.638-.2-.65-.638.131-.944l11.406-4.4c.531-.2 1 .112.738 1.262z" /></svg>,
  },
  whatsapp: {
    label: "WhatsApp",
    url: "https://wa.me/8801717676292",
    color: "#10b981",
    svg: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>,
  },
  gmail: {
    label: "Gmail",
    url: "mailto:dhrubosarkera@gmail.com",
    color: "#ef4444",
    svg: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 5.457v13.086c0 .804-.652 1.457-1.457 1.457h-3.371V9.543L12 13.913 4.829 9.543v10.457H1.457C.652 20 0 19.348 0 18.543V5.457c0-.584.346-1.109.877-1.339.531-.23 1.15-.1 1.558.333L12 11.232l9.565-6.781c.408-.433 1.027-.563 1.558-.333.531.23.877.755.877 1.339z" /></svg>,
  },
};

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#journey", label: "Journey" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

export const SKILLS = [
  { name: "Analytical Geography & Logic Grid", level: 95, category: "Core Intelligence" },
  { name: "Python Scripting Core", level: 90, category: "Engineering" },
  { name: "AI Prompt Architecture", level: 85, category: "AI Exploration" },
  { name: "Frontend Architecture (React/Next.js)", level: 80, category: "Engineering" },
  { name: "OSINT & Digital Tracing", level: 75, category: "Security" },
  { name: "Cybersecurity Fundamentals", level: 70, category: "Security" },
];

export const TIMELINE = [
  { year: "2026", title: "Global Platforms & Research Mesh", desc: "Secured Diamond at GELOSEA and Silver at FISO Math. Initiated a 7-month comprehensive research deployment on youth cultural trends." },
  { year: "2025", title: "The Champion Era (ISOC & Quiz)", desc: "Emerged as the Overall Champion of ISOC 7.0 with 4 medals. Led team to 5th place globally at the DUQS International Quiz Fest." },
  { year: "2024", title: "BdJSO Camp & Structural Logic", desc: "Selected for the high-stakes National Camp pipeline in the Bangladesh Junior Science Olympiad." },
  { year: "2023", title: "Genesis Foundations", desc: "Initiated systematic tracking of core AI workflows, foundational scripting architectures, and localized competitive arenas." },
];

export const PROJECTS = [
  { name: "Youth Culture & Digital Footprints", desc: "An active, 7-month extensive analytical research project tracking youth culture, localized social shifts, systemic identity patterns, and the direct impact of modern digital ecosystems in Bangladesh.", tech: ["Data Analysis", "Field Research", "Social Metrics"], icon: "radar" },
  { name: "Project Sentinel Node", desc: "A conceptual cybersecurity dashboard designed to map regional vulnerability paradigms and safe architecture models.", tech: ["Next.js", "Tailwind CSS", "Research Concept"], icon: "shield" },
  { name: "Sovereign AI Academic Guide", desc: "Exploratory logic arrays prioritizing data-safety guardrails on open, localized LLMs for teen education.", tech: ["AI Models", "Data Optimization"], icon: "sparkles" },
];

export type AchievementTag = "International" | "National" | "Regional";
export const ACHIEVEMENTS: { title: string; event: string; tag: AchievementTag; technical?: boolean; image?: string; fileUrl?: string; verifyUrl?: string }[] = [
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

export const CERTIFICATES: { title: string; issuer: string; image?: string; fileUrl?: string }[] = [
  { title: "Hour of AI Certified", issuer: "code.org — Certificate of Completion for The Hour of A.I.", image: "https://res.cloudinary.com/oiqiiqca/image/upload/v1783743809/codeorg-certificate.jpg_dvumdg.jpg" },
  { title: "Coding Fundamentals Certified", issuer: "Coding Fundamentals with Python — Certificate of Completion, 28 October 2025", image: "https://res.cloudinary.com/oiqiiqca/image/upload/v1783743816/python-coding-fundamentals_sr6tat.jpg" },
  { title: "Web Design Certified", issuer: "Website Design with HTML, CSS & JavaScript — Certificate of Completion, 31 March 2026", image: "https://res.cloudinary.com/oiqiiqca/image/upload/v1783743804/website-design-html-css-js_gabyeq.jpg" },
  { title: "Code for Language 2026 Certified", issuer: "Code for Language 2026 — Certificate of Completion", fileUrl: "https://ibb.co.com/Swh8LSfg" },
  { title: "Data Analytics Quiz Completion", issuer: "Athena Global Education — Executive Diploma in Data Analytics, Business Data Quiz", image: "https://res.cloudinary.com/oiqiiqca/image/upload/v1783743804/athena-data-analytics-quiz_amkcmg.jpg" },
  { title: "Convention on the Rights of the Child — e-Learning Certificate", issuer: "e-Learning certificate on the Convention on the Rights of the Child", image: "https://res.cloudinary.com/oiqiiqca/image/upload/v1783743804/unece-elearning_c6tetr.jpg" },
  { title: "Academic English Grammar Certified", issuer: "10 Minute School — Academic English Grammar Course", image: "https://res.cloudinary.com/oiqiiqca/image/upload/f_auto,q_auto/academic-english-grammar_hzowhx" },
  { title: "Spoken English Certified", issuer: "Lingual Academy — Spoken English Course, Certificate of Completion 2025", fileUrl: "https://ibb.co.com/TBZXxFCt" },
  { title: "Leadership Training Certified", issuer: "Leadership training — Certificate of Completion", image: "https://res.cloudinary.com/oiqiiqca/image/upload/v1783743811/leadership-certificate_wtqzod.jpg" },
  { title: "Leadership Certificate II", issuer: "Leadership training — Certificate of Completion", image: "https://res.cloudinary.com/oiqiiqca/image/upload/v1783743813/leadership-certificate-2_enlqhy.jpg" },
  { title: "NIQF — Preliminary Certificate", issuer: "Preliminary round certificate, NIQF", image: "https://res.cloudinary.com/oiqiiqca/image/upload/v1783743814/niqf-preliminary-certificate_xtccca.jpg" },
];

/* ============================================================
   ANIMATION & UTILS COMPONENTS
   ============================================================ */

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// Custom Hook: useActiveSection for Navigation Tracking
const useActiveSection = (links: typeof NAV_LINKS) => {
  const [active, setActive] = useState("#about");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const link of links) {
        const el = document.getElementById(link.href.substring(1));
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActive(link.href);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [links]);

  return active;
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */

export default function PortfolioPage() {
  const activeSection = useActiveSection(NAV_LINKS);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [achievementFilter, setAchievementFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Contact Form State
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Filtered Achievements based on Tag and Search Query
  const filteredAchievements = useMemo(() => {
    return ACHIEVEMENTS.filter((ach) => {
      const matchesTag = achievementFilter === "All" || ach.tag === achievementFilter;
      const matchesSearch = ach.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            ach.event.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTag && matchesSearch;
    });
  }, [achievementFilter, searchQuery]);

  // Form Submission Handler
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;
    setSubmitting(true);
    // Mimic secure server API latency
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSubmitting(false);
    setSubmitted(true);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-teal-500/20 selection:text-teal-300 font-sans antialiased relative overflow-x-hidden">
      
      {/* Background Premium Cyberpunk Cyber Grids & Ambient Lights */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[120vh] right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* --- HEADER & NAVIGATION --- */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/70 border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <motion.a 
            href="#about"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 font-mono text-teal-400 font-bold tracking-wider text-lg"
          >
            <TerminalSquare className="h-5 w-5" />
            <span>{PROFILE.shortName.toUpperCase()}.EXE</span>
          </motion.a>

          {/* Desktop Nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                  activeSection === link.href 
                    ? "text-teal-400 bg-teal-500/10 border border-teal-500/20 font-medium" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="p-2 text-slate-400 hover:text-slate-200 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Mesh Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-16 left-0 w-full bg-slate-950/95 backdrop-blur-lg border-b border-white/5 px-4 py-6 flex flex-col gap-3 md:hidden"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-mono transition-all ${
                    activeSection === link.href ? "text-teal-400 bg-teal-500/15 font-bold" : "text-slate-400"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- HERO / INTRO SECTION --- */}
      <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-32 md:pb-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 text-teal-400 px-3 py-1 rounded-full text-xs font-mono mb-6 w-fit"
            >
              <Cpu className="h-3.5 w-3.5 animate-pulse" />
              <span>System Operational // {PROFILE.grade}</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4"
            >
              Hi, I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-purple-400 font-black">{PROFILE.name}</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl font-mono text-slate-300 mb-6 border-l-2 border-teal-500/30 pl-4"
            >
              {PROFILE.tagline}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-3 flex-wrap mt-4"
            >
              <a href="#contact" className="px-6 py-2.5 rounded-xl bg-teal-500 text-slate-950 font-semibold text-sm transition-all hover:bg-teal-400 shadow-lg shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98]">
                Secure Node Connect
              </a>
              <a href="#achievements" className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white text-sm font-medium transition-all hover:bg-white/10">
                Explore Core Metrics
              </a>
            </motion.div>

            {/* Complete Social Links Grid */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-2.5 mt-8 border-t border-white/5 pt-6"
            >
              {Object.entries(SOCIALS).map(([key, data]) => (
                <a
                  key={key}
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900 border border-white/5 hover:border-white/10 transition-all text-slate-400 hover:scale-110 duration-200"
                  style={{ '--hover-color': data.color } as any}
                  title={data.label}
                  onMouseEnter={(e) => e.currentTarget.style.color = data.color}
                  onMouseLeave={(e) => e.currentTarget.style.color = ""}
                >
                  {data.svg}
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center relative"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border border-teal-500/20 bg-slate-900 shadow-2xl group">
              {/* Profile Photo */}
              <img 
                src={PROFILE.photoUrl} 
                alt={PROFILE.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            </div>
            
            {/* Absolute Cyber Hologram Badge overlays */}
            <div className="absolute -bottom-4 -right-2 bg-slate-900/90 backdrop-blur-md border border-purple-500/30 rounded-xl p-3 shadow-xl flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-400" />
              <div className="text-left">
                <p className="text-[10px] font-mono text-slate-400">OSINT COMPLIANT</p>
                <p className="text-xs font-bold text-slate-200">Secured Node</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="text-xs font-mono text-teal-400 uppercase tracking-widest mb-2">// IDENTITY SPEC</h2>
              <p className="text-3xl font-bold text-white tracking-tight">Core Dossier</p>
            </div>
            <div className="lg:col-span-8 flex flex-col gap-6">
              <p className="text-slate-300 text-base leading-relaxed">
                {PROFILE.bio}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-white/5">
                  <p className="text-xs font-mono text-slate-500">INSTITUTION</p>
                  <p className="text-sm font-semibold text-slate-200 mt-1">{PROFILE.school}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-white/5">
                  <p className="text-xs font-mono text-slate-500">LOCATION ARCHIVE</p>
                  <p className="text-sm font-semibold text-slate-200 mt-1">{PROFILE.location}</p>
                </div>
              </div>

              {/* Roles Badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                {PROFILE.roles.map((role, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-slate-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* --- SKILLS INTEL SECTION --- */}
      <section id="skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="text-xs font-mono text-teal-400 uppercase tracking-widest mb-2">// ARCHITECTURES</h2>
              <p className="text-3xl font-bold text-white tracking-tight">Technical Matrix</p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {SKILLS.map((skill, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-slate-900 border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between group">
                  <div>
                    <span className="text-[10px] font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">
                      {skill.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-200 mt-3 group-hover:text-white transition-colors">
                      {skill.name}
                    </h3>
                  </div>
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
                      <span>Capability Match</span>
                      <span className="text-slate-200 font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full" 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* --- TIMELINE JOURNEY SECTION --- */}
      <section id="journey" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="text-xs font-mono text-teal-400 uppercase tracking-widest mb-2">// LOG NODE PIPELINE</h2>
              <p className="text-3xl font-bold text-white tracking-tight">Timeline Analytics</p>
            </div>
            <div className="lg:col-span-8 relative border-l border-white/10 pl-6 ml-2 space-y-10">
              {TIMELINE.map((node, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Glow Anchor */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-teal-500 group-hover:bg-teal-400 transition-colors duration-300" />
                  <span className="text-xs font-mono text-teal-400 font-bold">{node.year}</span>
                  <h3 className="text-base font-bold text-slate-200 mt-1">{node.title}</h3>
                  <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">{node.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* --- PROJECTS EXPLORER --- */}
      <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
        <Reveal>
          <div className="mb-10">
            <h2 className="text-xs font-mono text-teal-400 uppercase tracking-widest mb-2">// FUNCTIONAL DEPLOYMENTS</h2>
            <p className="text-3xl font-bold text-white tracking-tight">Core Research & Dev Modules</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECTS.map((proj, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-slate-900 border border-white/5 hover:border-teal-500/20 transition-all flex flex-col justify-between group">
                <div>
                  <div className="p-2 rounded-lg bg-slate-950 border border-white/5 text-teal-400 w-fit mb-4 group-hover:bg-teal-500/10 transition-colors">
                    {proj.icon === "radar" && <Radar className="h-5 w-5" />}
                    {proj.icon === "shield" && <Shield className="h-5 w-5" />}
                    {proj.icon === "sparkles" && <Sparkles className="h-5 w-5" />}
                  </div>
                  <h3 className="text-base font-bold text-slate-200 group-hover:text-white">{proj.name}</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{proj.desc}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {proj.tech.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-950 border border-white/5 text-[10px] font-mono text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* --- ACHIEVEMENTS GRID (Advanced Filterable Stack) --- */}
      <section id="achievements" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h2 className="text-xs font-mono text-teal-400 uppercase tracking-widest mb-2">// COMPETITIVE PLATFORMS</h2>
              <p className="text-3xl font-bold text-white tracking-tight">Verified Achievements ({ACHIEVEMENTS.length})</p>
            </div>

            {/* Live Search and Tag Filters bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search metadata..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-900 text-xs border border-white/5 rounded-lg pl-9 pr-4 py-2 w-full sm:w-48 focus:outline-none focus:border-teal-500/40 text-slate-300"
                />
              </div>
              <div className="flex items-center gap-1 bg-slate-900 border border-white/5 p-1 rounded-lg">
                {["All", "International", "National"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setAchievementFilter(tag)}
                    className={`px-3 py-1 rounded-md text-[11px] font-mono transition-all ${
                      achievementFilter === tag 
                        ? "bg-teal-500/10 text-teal-400 border border-teal-500/20 font-bold" 
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid Layout rendering the full 21 items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAchievements.map((ach, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:bg-slate-900 hover:border-white/10 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-semibold ${
                      ach.tag === 'International' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {ach.tag}
                    </span>
                    {ach.technical && (
                      <span className="text-[9px] font-mono bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded">
                        Technical
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-100 mt-3 group-hover:text-teal-400 transition-colors">
                    {ach.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {ach.event}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-end gap-3 text-xs font-mono text-slate-500">
                  {ach.verifyUrl && (
                    <a href={ach.verifyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-teal-400 hover:underline">
                      Verify registry <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {ach.fileUrl && (
                    <a href={ach.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-400 hover:text-slate-200">
                      View Asset <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {ach.image && (
                    <a href={ach.image} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-400 hover:text-slate-200">
                      View Attachment <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          {filteredAchievements.length === 0 && (
            <div className="text-center py-12 border border-dashed border-white/5 rounded-xl text-xs font-mono text-slate-500">
              No parameters match current search metrics.
            </div>
          )}
        </Reveal>
      </section>

      {/* --- CERTIFICATES TRACK --- */}
      <section id="certificates" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
        <Reveal>
          <div className="mb-10">
            <h2 className="text-xs font-mono text-teal-400 uppercase tracking-widest mb-2">// SPECIALIZED TRAINING</h2>
            <p className="text-3xl font-bold text-white tracking-tight">Verified Qualifications ({CERTIFICATES.length})</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTIFICATES.map((cert, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/10 hover:bg-slate-900 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="p-1.5 rounded bg-slate-950 border border-white/5 text-slate-400 w-fit group-hover:text-teal-400 transition-colors">
                    <Award className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-200 mt-3">{cert.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{cert.issuer}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex justify-end">
                  {cert.image && (
                    <a href={cert.image} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-teal-400 hover:underline flex items-center gap-1">
                      Credentials Link <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {cert.fileUrl && (
                    <a href={cert.fileUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-teal-400 hover:underline flex items-center gap-1">
                      Credentials Link <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* --- CONTACT MESH SECURE NODE --- */}
      <section id="contact" className="max-w-3xl mx-auto px-4 sm:px-6 py-20 border-t border-white/5">
        <Reveal>
          <div className="text-center mb-8">
            <h2 className="text-xs font-mono text-teal-400 uppercase tracking-widest mb-2">// TELEMETRY ROUTER</h2>
            <p className="text-3xl font-bold text-white tracking-tight">Establish Handshake</p>
          </div>

          <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 sm:p-8 relative">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 flex flex-col items-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-slate-200">Handshake Successful</h3>
                <p className="text-xs font-mono text-slate-400">Message successfully packeted and securely dispatched.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Node Name</label>
                    <input 
                      type="text" 
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Ident" 
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-teal-500/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Return Address *</label>
                    <input 
                      type="email" 
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="address@domain.com" 
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-teal-500/40"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Payload Packet *</label>
                  <textarea 
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Enter message text..." 
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-teal-500/40 resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-50 transition-all font-mono font-bold text-xs text-slate-950 flex items-center justify-center gap-2 tracking-wide"
                >
                  {submitting ? "Transmitting..." : <>Dispatch Signal <Send className="h-3.5 w-3.5" /></>}
                </button>
              </form>
            )}

            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-teal-400" />
                <a href={`mailto:${PROFILE.email}`} className="text-slate-400 hover:text-teal-400 transition-colors">
                  {PROFILE.email}
                </a>
              </div>
              <span>LALMONIRHAT.NET // SECURE NODE</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/5 py-8 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {new Date().getFullYear()} <span className="text-slate-400 font-semibold">{PROFILE.name}</span>. All rights reserved.</p>
          <a href="#hero" className="flex items-center gap-1 hover:text-teal-400 transition-colors">
            Return to top <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </footer>
    </div>
  );
}