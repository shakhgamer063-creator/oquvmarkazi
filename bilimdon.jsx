import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Menu, X, Phone, MapPin, Clock, Star, ChevronDown, ChevronRight,
  Search, Award, Users, BookOpen, GraduationCap, TrendingUp,
  CheckCircle2, ArrowRight, Instagram, Send, Sparkles, Target,
  Layers, BarChart3, ShieldCheck, Compass, Navigation, PhoneCall,
  Quote, PlayCircle
} from "lucide-react";

/* ============================================================
   MOCK DATA — /data/*.ts fayllariga ko'chirishga tayyor struktura
   ============================================================ */

const COURSES = [
  {
    id: "ielts",
    category: "til",
    title: "IELTS Intensiv",
    tagline: "8.0 balga yo'l",
    desc: "Speaking, Writing, Listening va Reading bo'yicha maqsadli tayyorgarlik. Haqiqiy imtihon formatida mock testlar.",
    duration: "4 oy",
    weekly: "Haftasiga 4 kun, 90 daqiqa",
    price: "890 000",
    level: "Intermediate — Advanced",
    students: 412,
    book: "Cambridge IELTS 17-19",
    teacher: "Madina Yusupova",
    program: [
      "Diagnostik test va individual reja",
      "Academic Writing Task 1-2 strategiyalari",
      "Speaking uchun haftalik mock-intervyu",
      "Listening va Reading tezlik texnikalari",
      "Yakuniy full mock exam",
    ],
  },
  {
    id: "english-general",
    category: "til",
    title: "Ingliz tili (Umumiy)",
    tagline: "Nol darajadan erkin muloqotgacha",
    desc: "Kundalik muloqot, grammatika va lug'at boyligini bosqichma-bosqich oshiruvchi kurs.",
    duration: "8 oy",
    weekly: "Haftasiga 3 kun, 80 daqiqa",
    price: "590 000",
    level: "Beginner — Upper-Intermediate",
    students: 1240,
    book: "English File 4th Edition",
    teacher: "Sardor Aliyev",
    program: [
      "Grammatika asoslari va amaliyot",
      "Har darsda speaking club",
      "Lug'at boyitish va tinglab tushunish",
      "Har oyda progress-test",
    ],
  },
  {
    id: "math",
    category: "aniq",
    title: "Matematika",
    tagline: "Maktab va OTM imtihonlariga",
    desc: "Algebra, geometriya va mantiqiy fikrlashni chuqurlashtiruvchi amaliy kurs.",
    duration: "6 oy",
    weekly: "Haftasiga 3 kun, 90 daqiqa",
    price: "520 000",
    level: "8-11 sinf",
    students: 356,
    book: "Matematika Praktikum, 3-nashr",
    teacher: "Jasur Tojiboyev",
    program: [
      "Asosiy mavzularni tizimlashtirish",
      "Test topshirish strategiyalari",
      "Haftalik nazorat ishlari",
      "Individual xatolar ustida ishlash",
    ],
  },
  {
    id: "russian",
    category: "til",
    title: "Rus tili",
    tagline: "Amaliy muloqot kursi",
    desc: "Grammatika va jonli muloqot mashqlari orqali rus tilini tez o'zlashtirish.",
    duration: "6 oy",
    weekly: "Haftasiga 3 kun, 80 daqiqa",
    price: "480 000",
    level: "Beginner — Intermediate",
    students: 298,
    book: "Rus tili Grammatikasi, Praktikum",
    teacher: "Nilufar Rashidova",
    program: [
      "Fonetika va asosiy grammatika",
      "Kundalik muloqot mavzulari",
      "Yozma va og'zaki mashqlar",
      "Madaniy kontekst darslari",
    ],
  },
  {
    id: "it-basics",
    category: "it",
    title: "IT — Dasturlash asoslari",
    tagline: "Python bilan boshlang'ich qadam",
    desc: "Dasturlash mantig'i, Python asoslari va kichik loyihalar ustida amaliy ish.",
    duration: "5 oy",
    weekly: "Haftasiga 3 kun, 100 daqiqa",
    price: "750 000",
    level: "Boshlang'ich",
    students: 187,
    book: "Python Crash Course",
    teacher: "Otabek Nazarov",
    program: [
      "Dasturlash asoslari va sintaksis",
      "Algoritmik fikrlash mashqlari",
      "Kichik konsol loyihalar",
      "Portfolio uchun yakuniy loyiha",
    ],
  },
  {
    id: "native",
    category: "til",
    title: "Ona tili va Adabiyot",
    tagline: "Bitiruv va DTM imtihonlariga",
    desc: "Imlo qoidalari, nutq madaniyati va adabiy tahlil ko'nikmalarini mustahkamlash.",
    duration: "4 oy",
    weekly: "Haftasiga 2 kun, 90 daqiqa",
    price: "420 000",
    level: "9-11 sinf",
    students: 210,
    book: "Ona tili Grammatikasi, Amaliyot",
    teacher: "Gulnora Sattorova",
    program: [
      "Imlo va punktuatsiya qoidalari",
      "Insho yozish texnikalari",
      "Adabiy asarlar tahlili",
      "DTM formatidagi testlar",
    ],
  },
];

const BOOKS = [
  { id: "b1", title: "English File 4th Edition", author: "Clive Oxenden", level: "A1–B2", course: "Ingliz tili (Umumiy)", duration: "8 oy", price: "180 000" },
  { id: "b2", title: "Headway Intermediate", author: "John & Liz Soars", level: "B1–B2", course: "Ingliz tili (Umumiy)", duration: "6 oy", price: "165 000" },
  { id: "b3", title: "Cambridge IELTS 17-19", author: "Cambridge ESOL", level: "B2–C1", course: "IELTS Intensiv", duration: "4 oy", price: "220 000" },
  { id: "b4", title: "Solutions Upper-Intermediate", author: "Tim Falla", level: "B2", course: "IELTS Intensiv", duration: "5 oy", price: "190 000" },
  { id: "b5", title: "English Grammar in Use", author: "Raymond Murphy", level: "A2–C1", course: "Barcha til kurslari", duration: "—", price: "140 000" },
  { id: "b6", title: "Matematika Praktikum", author: "T. Yusupov", level: "8-11 sinf", course: "Matematika", duration: "6 oy", price: "95 000" },
  { id: "b7", title: "Python Crash Course", author: "Eric Matthes", level: "Boshlang'ich", course: "IT — Dasturlash asoslari", duration: "5 oy", price: "210 000" },
  { id: "b8", title: "Rus tili Grammatikasi", author: "O. Petrova", level: "A1–B1", course: "Rus tili", duration: "6 oy", price: "110 000" },
];

const RESULTS = [
  { id: "r1", name: "Ali Valiyev", type: "IELTS", prev: "6.0", result: "8.0", initials: "AV" },
  { id: "r2", name: "Madina Karimova", type: "IELTS", prev: "5.5", result: "7.5", initials: "MK" },
  { id: "r3", name: "Azizbek Hasanov", type: "CEFR", prev: "B1", result: "C1", initials: "AH" },
  { id: "r4", name: "Dilnoza Yoqubova", type: "Matematika", prev: "62%", result: "94%", initials: "DY" },
  { id: "r5", name: "Sardor Rustamov", type: "IELTS", prev: "5.0", result: "7.0", initials: "SR" },
  { id: "r6", name: "Kamola Nosirova", type: "Boshqa sertifikatlar", prev: "A2", result: "B2 (Rus tili)", initials: "KN" },
];

const TEACHERS = [
  { id: "t1", name: "Madina Yusupova", subject: "IELTS / Ingliz tili", exp: "9 yil tajriba", cert: "CELTA, IELTS 8.5", bio: "1000+ o'quvchini IELTS imtihoniga tayyorlagan, Writing bo'yicha mutaxassis." },
  { id: "t2", name: "Sardor Aliyev", subject: "Ingliz tili", exp: "6 yil tajriba", cert: "TESOL sertifikati", bio: "Kommunikativ metodika bo'yicha ixtisoslashgan, boshlang'ich guruhlar ustozi." },
  { id: "t3", name: "Jasur Tojiboyev", subject: "Matematika", exp: "11 yil tajriba", cert: "Respublika olimpiada murabbiyi", bio: "DTM va OTM qabul imtihonlariga tayyorlashda katta tajribaga ega." },
  { id: "t4", name: "Otabek Nazarov", subject: "IT / Dasturlash", exp: "5 yil tajriba", cert: "Google IT Certificate", bio: "Amaliy loyihalar orqali o'rgatish uslubi bilan tanilgan dasturchi-ustoz." },
];

const BRANCHES = [
  { id: "br1", name: "Chilonzor filiali", isMain: true, address: "Chilonzor tumani, Bunyodkor shoh ko'chasi, 12-uy", phone: "+998 71 200 10 10", hours: "Dush–Shan: 09:00–20:00" },
  { id: "br2", name: "Yunusobod filiali", isMain: false, address: "Yunusobod tumani, Amir Temur ko'chasi, 45-uy", phone: "+998 71 200 20 20", hours: "Dush–Shan: 09:00–20:00" },
  { id: "br3", name: "Sergeli filiali", isMain: false, address: "Sergeli tumani, Sergeli ko'chasi, 8-uy", phone: "+998 71 200 30 30", hours: "Dush–Shan: 10:00–19:00" },
];

const FAQS = [
  { q: "Kurs narxlari qancha?", a: "Narxlar kursga qarab 420 000 so'mdan 890 000 so'mgacha o'zgaradi. Har bir kurs kartasida aniq narxni ko'rishingiz mumkin." },
  { q: "Darajam qanday aniqlanadi?", a: "\"Darajangizni aniqlang\" bo'limida qisqa test topshirasiz, natija asosida sizga mos daraja va guruh tavsiya etiladi." },
  { q: "Kurs qancha davom etadi?", a: "Kursga qarab 4 oydan 8 oygacha davom etadi. Har bir kurs sahifasida aniq davomiylik ko'rsatilgan." },
  { q: "Qaysi kitob asosida o'qitiladi?", a: "Xalqaro tan olingan darsliklar — English File, Headway, Cambridge IELTS va boshqalar asosida o'qitamiz." },
  { q: "Sinov darsi bormi?", a: "Ha, har bir yo'nalish bo'yicha bepul sinov darsiga yozilishingiz mumkin. Ariza formasida buni belgilang." },
  { q: "Bir guruhda nechta o'quvchi bo'ladi?", a: "Guruhlar 8–12 nafar o'quvchidan iborat bo'lib, individual e'tibor saqlanadi." },
  { q: "Filiallar qayerda?", a: "Chilonzor, Yunusobod va Sergeli tumanlarida filiallarimiz mavjud. \"Filiallar\" bo'limida to'liq manzillarni ko'ring." },
];

const LEVEL_QUESTIONS = [
  { q: "She ___ to school every day.", options: ["go", "goes", "going", "gone"], correct: 1 },
  { q: "I have ___ this book before.", options: ["read", "readed", "reads", "reading"], correct: 0 },
  { q: "If I ___ rich, I would travel a lot.", options: ["am", "was", "were", "will be"], correct: 2 },
  { q: "By next year, she ___ her studies.", options: ["will finish", "will have finished", "finishes", "finished"], correct: 1 },
  { q: "He speaks English ___ than his brother.", options: ["good", "well", "better", "best"], correct: 2 },
];

const STATS = [
  { label: "O'quvchi", value: 5000, suffix: "+", icon: Users },
  { label: "IELTS natijasi", value: 300, suffix: "+", icon: Award },
  { label: "Yuqori ball", value: 100, suffix: "+", icon: TrendingUp },
  { label: "Kurs yo'nalishi", value: 20, suffix: "+", icon: Layers },
];

const NAV_LINKS = [
  { id: "hero", label: "Bosh sahifa" },
  { id: "kurslar", label: "Kurslar" },
  { id: "kitoblar", label: "Kitoblar" },
  { id: "natijalar", label: "Natijalar" },
  { id: "ustozlar", label: "Ustozlar" },
  { id: "filiallar", label: "Filiallar" },
  { id: "aloqa", label: "Aloqa" },
];

/* ============================================================
   YORDAMCHI HOOK: scroll bo'yicha element ko'rinishga kirganda true qaytaradi
   ============================================================ */
function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ============================================================
   NAVBAR
   ============================================================ */
function Navbar({ onRegisterClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-md shadow-indigo-950/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 sm:h-20">
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollToId("hero"); }}
          className="flex items-center gap-2 shrink-0"
        >
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </span>
          <span className={`font-semibold text-lg tracking-tight ${scrolled ? "text-indigo-950" : "text-indigo-950"}`}>
            Bilimdon
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => { e.preventDefault(); scrollToId(l.id); }}
              className="text-sm font-medium text-slate-600 hover:text-indigo-700 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button
            onClick={onRegisterClick}
            className="rounded-full bg-indigo-950 text-white text-sm font-semibold px-5 py-2.5 hover:bg-indigo-900 transition-colors"
          >
            Qabulga yozilish
          </button>
        </div>

        <button className="lg:hidden p-2 text-indigo-950" onClick={() => setOpen((o) => !o)} aria-label="Menyu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-5 py-4 space-y-1 shadow-lg">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => { e.preventDefault(); scrollToId(l.id); setOpen(false); }}
              className="block py-2.5 text-slate-700 font-medium border-b border-slate-50 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => { onRegisterClick(); setOpen(false); }}
            className="w-full mt-3 rounded-full bg-indigo-950 text-white text-sm font-semibold px-5 py-3"
          >
            Qabulga yozilish
          </button>
        </div>
      )}
    </header>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function Hero({ onRegisterClick }) {
  return (
    <section id="hero" className="relative overflow-hidden bg-indigo-950 pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* gradient blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-violet-600/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3.5 py-1.5 text-xs font-medium text-indigo-100 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            2013-yildan buyon natijaga xizmat qilamiz
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] font-semibold text-white tracking-tight">
            Bilimingizni natijaga aylantiring.
          </h1>
          <p className="mt-6 text-lg text-indigo-200 max-w-lg leading-relaxed">
            Zamonaviy ta'lim, kuchli ustozlar va real natijalar bilan kelajagingizni quring.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button
              onClick={onRegisterClick}
              className="rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-indigo-950 font-semibold px-6 py-3.5 flex items-center gap-2 hover:brightness-105 transition-all shadow-lg shadow-amber-500/20"
            >
              Qabulga yozilish <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToId("daraja")}
              className="rounded-full bg-white/10 border border-white/20 text-white font-semibold px-6 py-3.5 hover:bg-white/15 transition-colors"
            >
              Darajamni aniqlash
            </button>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
            {[
              { icon: Users, text: "5000+ o'quvchi" },
              { icon: Award, text: "300+ sertifikat" },
              { icon: TrendingUp, text: "100+ yuqori natija" },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-indigo-200 text-sm">
                <t.icon className="w-4 h-4 text-amber-400" /> {t.text}
              </div>
            ))}
          </div>
        </div>

        {/* Illustration composition — no stock photos, built from cards */}
        <div className="relative h-80 sm:h-96 lg:h-[26rem] hidden sm:block">
          <div className="absolute top-4 right-2 w-56 rounded-2xl bg-white/95 backdrop-blur shadow-2xl p-5">
            <div className="flex items-center gap-2 text-indigo-950">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span className="font-semibold text-sm">IELTS Speaking</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Bugungi dars: Part 2 — Cue Card</p>
            <div className="mt-3 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-indigo-600 rounded-full" />
            </div>
          </div>

          <div className="absolute top-40 left-0 w-48 rounded-2xl bg-white/95 backdrop-blur shadow-2xl p-5">
            <div className="flex items-center gap-2 text-indigo-950">
              <Award className="w-5 h-5 text-amber-500" />
              <span className="font-semibold text-sm">Sertifikat</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Ali V. — IELTS 8.0</p>
          </div>

          <div className="absolute bottom-4 right-8 w-44 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-2xl p-5 text-white">
            <div className="text-2xl font-semibold">94%</div>
            <p className="text-xs text-indigo-100 mt-1">O'rtacha progress oshishi</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   STATS
   ============================================================ */
function Counter({ value, suffix }) {
  const [ref, inView] = useInView(0.4);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min((t - start) / duration, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);
  return (
    <span ref={ref} className="tabular-nums">
      {n}{suffix}
    </span>
  );
}

function Stats() {
  return (
    <section className="bg-white py-14 sm:py-16 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <div key={i} className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-indigo-600 mb-2">
              <s.icon className="w-5 h-5" />
            </div>
            <div className="text-3xl sm:text-4xl font-semibold text-indigo-950">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="text-sm text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   KURSLAR
   ============================================================ */
const COURSE_FILTERS = [
  { id: "barcha", label: "Barchasi" },
  { id: "til", label: "Til kurslari" },
  { id: "aniq", label: "Aniq fanlar" },
  { id: "it", label: "IT" },
];

function CourseCard({ course, onOpen }) {
  return (
    <div className="group rounded-2xl border border-slate-100 bg-white hover:shadow-xl hover:shadow-indigo-950/5 transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="h-32 bg-gradient-to-br from-indigo-600 to-violet-600 relative flex items-end p-4">
        <span className="text-white/90 text-xs font-medium bg-white/15 rounded-full px-2.5 py-1">{course.level}</span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-indigo-950 text-lg">{course.title}</h3>
        <p className="text-xs text-indigo-600 font-medium mt-0.5">{course.tagline}</p>
        <p className="text-sm text-slate-500 mt-3 leading-relaxed flex-1">{course.desc}</p>
        <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
          <span className="font-semibold text-indigo-950">{course.price} so'm</span>
        </div>
        <button
          onClick={() => onOpen(course)}
          className="mt-4 w-full rounded-full border border-indigo-200 text-indigo-700 font-semibold text-sm py-2.5 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors flex items-center justify-center gap-1.5"
        >
          Batafsil <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function Courses({ onOpenCourse }) {
  const [filter, setFilter] = useState("barcha");
  const filtered = useMemo(
    () => (filter === "barcha" ? COURSES : COURSES.filter((c) => c.category === filter)),
    [filter]
  );
  return (
    <section id="kurslar" className="bg-slate-50 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight">Bizning kurslarimiz</h2>
            <p className="text-slate-500 mt-3 max-w-md">Har bir yo'nalish aniq dastur, tajribali ustoz va o'lchanadigan natija bilan.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {COURSE_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  filter === f.id ? "bg-indigo-950 text-white" : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <CourseCard key={c.id} course={c} onOpen={onOpenCourse} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseDetailModal({ course, onClose, onRegister }) {
  if (!course) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-indigo-950/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white w-full sm:max-w-2xl sm:rounded-3xl rounded-t-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-36 bg-gradient-to-br from-indigo-600 to-violet-600 relative rounded-t-3xl sm:rounded-t-3xl flex items-end p-6">
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white">
            <X className="w-5 h-5" />
          </button>
          <div>
            <span className="text-white/90 text-xs font-medium bg-white/15 rounded-full px-2.5 py-1">{course.level}</span>
            <h3 className="text-white text-2xl font-semibold mt-2">{course.title}</h3>
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <p className="text-slate-600 leading-relaxed">{course.desc}</p>

          <div className="grid sm:grid-cols-2 gap-4 mt-6 text-sm">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-slate-400 text-xs">Davomiyligi</div>
              <div className="font-semibold text-indigo-950 mt-0.5">{course.duration}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-slate-400 text-xs">Haftalik darslar</div>
              <div className="font-semibold text-indigo-950 mt-0.5">{course.weekly}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-slate-400 text-xs">Ishlatiladigan kitob</div>
              <div className="font-semibold text-indigo-950 mt-0.5">{course.book}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-slate-400 text-xs">Ustoz</div>
              <div className="font-semibold text-indigo-950 mt-0.5">{course.teacher}</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="font-semibold text-indigo-950 mb-3">Kurs dasturi</div>
            <ul className="space-y-2">
              {course.program.map((p, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" /> {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex items-center justify-between flex-wrap gap-4 border-t border-slate-100 pt-6">
            <div>
              <div className="text-xs text-slate-400">Kurs narxi</div>
              <div className="text-2xl font-semibold text-indigo-950">{course.price} so'm<span className="text-sm text-slate-400 font-normal"> /oy</span></div>
            </div>
            <button
              onClick={() => { onRegister(course.title); onClose(); }}
              className="rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-indigo-950 font-semibold px-6 py-3 flex items-center gap-2"
            >
              Qabulga yozilish <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   KITOBLAR
   ============================================================ */
function BookCard({ book, onOpen }) {
  return (
    <div className="group rounded-2xl border border-slate-100 bg-white hover:shadow-xl hover:shadow-indigo-950/5 transition-shadow overflow-hidden">
      <div className="h-36 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
        <BookOpen className="w-10 h-10 text-indigo-300" />
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-indigo-950 text-sm leading-snug">{book.title}</h4>
        <p className="text-xs text-slate-400 mt-1">{book.author}</p>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-[11px] font-medium bg-indigo-50 text-indigo-700 rounded-full px-2 py-0.5">{book.level}</span>
        </div>
        <button
          onClick={() => onOpen(book)}
          className="mt-4 w-full text-xs font-semibold text-indigo-700 flex items-center justify-center gap-1 py-2 border border-indigo-100 rounded-full hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors"
        >
          Batafsil <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function Books({ onOpenBook }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () => BOOKS.filter((b) => b.title.toLowerCase().includes(q.toLowerCase())),
    [q]
  );
  return (
    <section id="kitoblar" className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight">Bizning kitoblarimiz</h2>
            <p className="text-slate-500 mt-3 max-w-md">Kurslarimizda foydalaniladigan xalqaro tan olingan darsliklar katalogi.</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Kitob nomini qidiring..."
              className="w-full rounded-full border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
            />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((b) => (
            <BookCard key={b.id} book={b} onOpen={onOpenBook} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-slate-400 py-10">Hech qanday kitob topilmadi.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function BookDetailModal({ book, onClose }) {
  if (!book) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-indigo-950/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="h-28 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative">
          <BookOpen className="w-10 h-10 text-indigo-300" />
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-3">
          <h3 className="text-xl font-semibold text-indigo-950">{book.title}</h3>
          <p className="text-sm text-slate-400">{book.author}</p>
          <div className="grid grid-cols-2 gap-3 text-sm pt-2">
            <div><div className="text-slate-400 text-xs">Daraja</div><div className="font-medium text-indigo-950">{book.level}</div></div>
            <div><div className="text-slate-400 text-xs">Muddat</div><div className="font-medium text-indigo-950">{book.duration}</div></div>
            <div className="col-span-2"><div className="text-slate-400 text-xs">Qaysi kursda ishlatiladi</div><div className="font-medium text-indigo-950">{book.course}</div></div>
            <div className="col-span-2"><div className="text-slate-400 text-xs">Kurs narxi</div><div className="font-medium text-indigo-950">{book.price} so'm</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   NATIJALAR
   ============================================================ */
const RESULT_FILTERS = ["Barchasi", "IELTS", "CEFR", "Matematika", "Boshqa sertifikatlar"];

function ResultCard({ r }) {
  return (
    <div className="rounded-2xl bg-indigo-950 p-6 relative overflow-hidden">
      <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-violet-600/30 blur-2xl" />
      <div className="flex items-center gap-3 relative">
        <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold text-sm">
          {r.initials}
        </div>
        <div>
          <div className="text-white font-semibold text-sm">{r.name}</div>
          <div className="text-indigo-300 text-xs">{r.type}</div>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-3 relative">
        <span className="text-indigo-300 text-sm line-through">{r.prev}</span>
        <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
        <span className="text-amber-400 text-2xl font-semibold">{r.result}</span>
      </div>
    </div>
  );
}

function Results() {
  const [filter, setFilter] = useState("Barchasi");
  const filtered = useMemo(
    () => (filter === "Barchasi" ? RESULTS : RESULTS.filter((r) => r.type === filter)),
    [filter]
  );
  return (
    <section id="natijalar" className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight">Natijalarimiz gapirsin</h2>
          <div className="flex flex-wrap gap-2">
            {RESULT_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  filter === f ? "bg-indigo-950 text-white" : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-indigo-300"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((r) => <ResultCard key={r.id} r={r} />)}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   USTOZLAR
   ============================================================ */
function TeacherCard({ t }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 hover:shadow-lg hover:shadow-indigo-950/5 transition-shadow">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-indigo-700 font-semibold text-xl">
        {t.name.split(" ").map((n) => n[0]).join("")}
      </div>
      <h3 className="font-semibold text-indigo-950 mt-4">{t.name}</h3>
      <p className="text-sm text-indigo-600 font-medium">{t.subject}</p>
      <p className="text-xs text-slate-400 mt-2">{t.exp} · {t.cert}</p>
      <p className="text-sm text-slate-500 mt-3 leading-relaxed">{t.bio}</p>
    </div>
  );
}

function Teachers() {
  return (
    <section id="ustozlar" className="bg-slate-50 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight">O'quv markazi ustozlari</h2>
        <p className="text-slate-500 mt-3 max-w-md">Har biri o'z sohasida sertifikatlangan va yillar davomida natija bergan mutaxassislar.</p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEACHERS.map((t) => <TeacherCard key={t.id} t={t} />)}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   DARAJANI ANIQLASH — LevelTest (reusable component)
   ============================================================ */
function LevelTest({ onGoRegister }) {
  const [step, setStep] = useState("intro"); // intro -> quiz -> result
  const [form, setForm] = useState({ name: "", phone: "", course: COURSES[0].title });
  const [answers, setAnswers] = useState([]);
  const [qIndex, setQIndex] = useState(0);

  const score = useMemo(() => {
    const correct = answers.filter((a, i) => a === LEVEL_QUESTIONS[i].correct).length;
    return Math.round((correct / LEVEL_QUESTIONS.length) * 100);
  }, [answers]);

  const level = score >= 80 ? "Upper-Intermediate" : score >= 55 ? "Intermediate" : "Beginner — Pre-Intermediate";
  const next = score >= 80 ? "Advanced" : score >= 55 ? "Upper-Intermediate" : "Intermediate";

  const startQuiz = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setStep("quiz");
  };

  const answer = (idx) => {
    const na = [...answers, idx];
    setAnswers(na);
    if (qIndex + 1 < LEVEL_QUESTIONS.length) {
      setQIndex(qIndex + 1);
    } else {
      setStep("result");
    }
  };

  const restart = () => {
    setStep("intro");
    setAnswers([]);
    setQIndex(0);
  };

  return (
    <section id="daraja" className="bg-indigo-950 py-20 sm:py-28 relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 relative">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">Darajangizni aniqlang</h2>
          <p className="text-indigo-300 mt-3">3 daqiqada joriy darajangizni bilib oling va mos kursni tanlang.</p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl">
          {step === "intro" && (
            <form onSubmit={startQuiz} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-slate-600">Ism</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                    placeholder="Ismingiz"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Telefon</label>
                  <input
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                    placeholder="+998 90 123 45 67"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Kurs</label>
                <select
                  value={form.course}
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                >
                  {COURSES.map((c) => <option key={c.id}>{c.title}</option>)}
                </select>
              </div>
              <button className="w-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-indigo-950 font-semibold py-3.5 flex items-center justify-center gap-2">
                Testni boshlash <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === "quiz" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-medium text-slate-400">Savol {qIndex + 1} / {LEVEL_QUESTIONS.length}</span>
                <div className="h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all"
                    style={{ width: `${((qIndex) / LEVEL_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>
              <h3 className="text-lg font-medium text-indigo-950 mb-5">{LEVEL_QUESTIONS[qIndex].q}</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {LEVEL_QUESTIONS[qIndex].options.map((o, i) => (
                  <button
                    key={i}
                    onClick={() => answer(i)}
                    className="text-left rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "result" && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mx-auto">
                <Award className="w-8 h-8 text-indigo-600" />
              </div>
              <p className="text-slate-500 mt-4">Natijangiz</p>
              <div className="text-5xl font-semibold text-indigo-950 mt-1">{score}%</div>
              <div className="mt-6 grid sm:grid-cols-2 gap-4 text-left">
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="text-xs text-slate-400">Tavsiya etilgan daraja</div>
                  <div className="font-semibold text-indigo-950 mt-0.5">{level}</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="text-xs text-slate-400">Keyingi bosqich</div>
                  <div className="font-semibold text-indigo-950 mt-0.5">{next}</div>
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onGoRegister(form.course, form.name, form.phone)}
                  className="flex-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-indigo-950 font-semibold py-3.5 flex items-center justify-center gap-2"
                >
                  Ushbu kursga yozilish <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={restart} className="rounded-full border border-slate-200 text-slate-600 font-medium py-3.5 px-6">
                  Qayta topshirish
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   QABULGA YOZILISH — RegistrationForm
   ============================================================ */
function RegistrationForm({ prefill, onSuccess }) {
  const [form, setForm] = useState({
    name: "", phone: "", age: "", course: COURSES[0].title, level: "Beginner",
    branch: BRANCHES[0].name, time: "Kunduzgi (10:00–14:00)", comment: "",
  });

  useEffect(() => {
    if (prefill) setForm((f) => ({ ...f, ...prefill }));
  }, [prefill]);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    onSuccess();
  };

  const field = "mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 bg-white";
  const label = "text-sm font-medium text-slate-600";

  return (
    <section id="aloqa" className="bg-slate-50 py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight">Qabulga yozilish</h2>
          <p className="text-slate-500 mt-3">Formani to'ldiring, administratorimiz siz bilan bog'lanadi.</p>
        </div>
        <form onSubmit={submit} className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={label}>Ism</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} placeholder="Ism familiya" />
            </div>
            <div>
              <label className={label}>Telefon</label>
              <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={field} placeholder="+998 90 123 45 67" />
            </div>
            <div>
              <label className={label}>Yosh</label>
              <input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className={field} placeholder="18" />
            </div>
            <div>
              <label className={label}>Kurs</label>
              <select value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} className={field}>
                {COURSES.map((c) => <option key={c.id}>{c.title}</option>)}
              </select>
            </div>
            <div>
              <label className={label}>Daraja</label>
              <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className={field}>
                {["Beginner", "Pre-Intermediate", "Intermediate", "Upper-Intermediate", "Advanced"].map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className={label}>Filial</label>
              <select value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} className={field}>
                {BRANCHES.map((b) => <option key={b.id}>{b.name}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={label}>Qulay vaqt</label>
              <select value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className={field}>
                {["Ertalabki (08:00–10:00)", "Kunduzgi (10:00–14:00)", "Kechki (16:00–20:00)"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={label}>Izoh</label>
              <textarea value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} rows={3} className={field} placeholder="Qo'shimcha ma'lumot (ixtiyoriy)" />
            </div>
          </div>
          <button className="w-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-indigo-950 font-semibold py-3.5 flex items-center justify-center gap-2">
            Arizani yuborish <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

function SuccessModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-indigo-950/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center" onClick={(e) => e.stopPropagation()}>
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h3 className="text-xl font-semibold text-indigo-950 mt-5">Arizangiz qabul qilindi!</h3>
        <p className="text-slate-500 mt-2 text-sm leading-relaxed">Tez orada administratorimiz siz bilan bog'lanadi.</p>
        <button onClick={onClose} className="mt-6 w-full rounded-full bg-indigo-950 text-white font-semibold py-3">
          Yopish
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   FILIALLAR
   ============================================================ */
function BranchCard({ b }) {
  return (
    <div className={`rounded-2xl p-6 border ${b.isMain ? "border-amber-300 bg-amber-50/40" : "border-slate-100 bg-white"} relative`}>
      {b.isMain && (
        <span className="absolute -top-3 left-6 bg-amber-400 text-indigo-950 text-[11px] font-semibold rounded-full px-3 py-1">
          Asosiy filial
        </span>
      )}
      <h3 className="font-semibold text-indigo-950 text-lg mt-1">{b.name}</h3>
      <div className="mt-4 space-y-2.5 text-sm text-slate-600">
        <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" /> {b.address}</div>
        <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-indigo-700">
          <Phone className="w-4 h-4 text-indigo-500 shrink-0" /> {b.phone}
        </a>
        <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-indigo-500 shrink-0" /> {b.hours}</div>
      </div>
      <a
        href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(b.address)}`}
        target="_blank" rel="noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-700 hover:text-indigo-900"
      >
        Xaritada ko'rish <Navigation className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

function Branches() {
  return (
    <section id="filiallar" className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight">Bizning filiallarimiz</h2>
        <p className="text-slate-500 mt-3 max-w-md">Sizga eng qulay filialni tanlang.</p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BRANCHES.map((b) => <BranchCard key={b.id} b={b} />)}
        </div>
        <div className="mt-8 rounded-2xl border border-dashed border-slate-200 h-56 flex items-center justify-center text-slate-400 text-sm bg-slate-50">
          <div className="flex items-center gap-2"><Compass className="w-5 h-5" /> Interaktiv xarita shu yerda joylashadi (OpenStreetMap / Google Maps iframe)</div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   NEGA BIZ?
   ============================================================ */
const ADVANTAGES = [
  { icon: GraduationCap, title: "Tajribali ustozlar", desc: "Har biri o'z sohasida sertifikatlangan mutaxassis." },
  { icon: TrendingUp, title: "Real natijalar", desc: "1000+ o'quvchi tasdiqlagan isbotlangan metodika." },
  { icon: Sparkles, title: "Zamonaviy metodika", desc: "Interaktiv va amaliyotga yo'naltirilgan darslar." },
  { icon: Layers, title: "Daraja bo'yicha guruhlar", desc: "Har bir o'quvchi o'z darajasiga mos guruhda o'qiydi." },
  { icon: MapPin, title: "Qulay filiallar", desc: "Shahar bo'ylab 3 ta filial, uyingizga yaqin joyni tanlang." },
  { icon: BarChart3, title: "Doimiy monitoring", desc: "Har oylik progress-testlar va ota-onalarga hisobot." },
];

function WhyUs() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight">Nega aynan biz?</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ADVANTAGES.map((a, i) => (
            <div key={i} className="rounded-2xl bg-white border border-slate-100 p-6">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                <a.icon className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-indigo-950 mt-4">{a.title}</h3>
              <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   O'QISH JARAYONI — timeline
   ============================================================ */
const PROCESS_STEPS = [
  { title: "Ro'yxatdan o'tish", desc: "Ariza formasini to'ldirasiz, administrator siz bilan bog'lanadi." },
  { title: "Darajani aniqlash", desc: "Qisqa test orqali joriy darajangiz aniqlanadi." },
  { title: "Mos guruhga joylashish", desc: "Darajangiz va qulay vaqtga mos guruh tanlab beriladi." },
  { title: "O'qishni boshlash", desc: "Birinchi darsdan boshlab ustoz bilan reja asosida ilgarilaysiz." },
];

function Process() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight text-center">O'qish jarayoni</h2>
        <div className="mt-14 grid sm:grid-cols-4 gap-8 relative">
          <div className="hidden sm:block absolute top-5 left-[12%] right-[12%] h-px bg-slate-200" />
          {PROCESS_STEPS.map((s, i) => (
            <div key={i} className="relative text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-indigo-950 text-white flex items-center justify-center font-semibold text-sm mx-auto sm:mx-0 relative z-10">
                {i + 1}
              </div>
              <h3 className="font-semibold text-indigo-950 mt-4">{s.title}</h3>
              <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FAQ
   ============================================================ */
function FAQItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-slate-100 py-5">
      <button onClick={onToggle} className="w-full flex items-center justify-between text-left gap-4">
        <span className="font-medium text-indigo-950">{item.q}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="text-sm text-slate-500 mt-3 leading-relaxed pr-8">{item.a}</p>}
    </div>
  );
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight text-center">Ko'p so'raladigan savollar</h2>
        <div className="mt-10 bg-white rounded-3xl border border-slate-100 px-6 sm:px-8">
          {FAQS.map((f, i) => (
            <FAQItem key={i} item={f} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PASTKI CTA
   ============================================================ */
function BottomCTA({ onRegisterClick }) {
  return (
    <section className="bg-indigo-950 py-20 sm:py-24 relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-violet-600/20 blur-3xl" />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center relative">
        <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">Bugunoq o'qishni boshlang.</h2>
        <p className="text-indigo-300 mt-4">Bilimingizni rivojlantirish uchun birinchi qadamni hoziroq tashlang.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={onRegisterClick} className="rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-indigo-950 font-semibold px-6 py-3.5 flex items-center gap-2">
            Qabulga yozilish <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={() => scrollToId("daraja")} className="rounded-full bg-white/10 border border-white/20 text-white font-semibold px-6 py-3.5 hover:bg-white/15 transition-colors">
            Darajamni aniqlash
          </button>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer className="bg-indigo-950 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </span>
            <span className="font-semibold text-lg text-white">Bilimdon</span>
          </div>
          <p className="text-sm text-indigo-300 mt-4 leading-relaxed">Zamonaviy ta'lim markazi — bilimni natijaga aylantiramiz.</p>
          <div className="flex gap-3 mt-5">
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"><Send className="w-4 h-4" /></a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Menyu</h4>
          <div className="space-y-2.5">
            {NAV_LINKS.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); scrollToId(l.id); }} className="block text-sm text-indigo-300 hover:text-white">
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Kurslar</h4>
          <div className="space-y-2.5">
            {COURSES.slice(0, 5).map((c) => (
              <a key={c.id} href="#kurslar" onClick={(e) => { e.preventDefault(); scrollToId("kurslar"); }} className="block text-sm text-indigo-300 hover:text-white">
                {c.title}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Aloqa</h4>
          <div className="space-y-2.5 text-sm text-indigo-300">
            <a href="tel:+998712001010" className="flex items-center gap-2 hover:text-white"><Phone className="w-4 h-4" /> +998 71 200 10 10</a>
            <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /> Chilonzor tumani, Bunyodkor shoh ko'chasi, 12</div>
            <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> Dush–Shan: 09:00–20:00</div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-12 pt-6 border-t border-white/5 text-xs text-indigo-400">
        © {new Date().getFullYear()} Bilimdon o'quv markazi. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
}

/* ============================================================
   ASOSIY APP
   ============================================================ */
export default function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [prefill, setPrefill] = useState(null);

  const goRegister = (course, name, phone) => {
    setPrefill({ course: course || COURSES[0].title, name: name || "", phone: phone || "" });
    scrollToId("aloqa");
  };

  return (
    <div className="font-sans text-slate-900 bg-white [font-family:'Inter',ui-sans-serif,system-ui]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        h1, h2, h3, .display { font-family: 'Space Grotesk', ui-sans-serif, system-ui; }
      `}</style>

      <Navbar onRegisterClick={() => scrollToId("aloqa")} />
      <Hero onRegisterClick={() => scrollToId("aloqa")} />
      <Stats />
      <Courses onOpenCourse={setSelectedCourse} />
      <Books onOpenBook={setSelectedBook} />
      <Results />
      <Teachers />
      <LevelTest onGoRegister={goRegister} />
      <RegistrationForm prefill={prefill} onSuccess={() => setShowSuccess(true)} />
      <Branches />
      <WhyUs />
      <Process />
      <FAQ />
      <BottomCTA onRegisterClick={() => scrollToId("aloqa")} />
      <Footer />

      <CourseDetailModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onRegister={(title) => goRegister(title)}
      />
      <BookDetailModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
    </div>
  );
}
