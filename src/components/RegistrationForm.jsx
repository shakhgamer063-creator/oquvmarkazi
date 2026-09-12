import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { COURSES } from "../data/courses.js";
import { BRANCHES } from "../data/branches.js";
import Reveal from "./Reveal.jsx";

const LEVELS = ["Beginner", "Pre-Intermediate", "Intermediate", "Upper-Intermediate", "Advanced"];
const TIMES = ["Ertalabki (08:00–10:00)", "Kunduzgi (10:00–14:00)", "Kechki (16:00–20:00)"];

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400";
const labelClass = "text-sm font-medium text-slate-600";

export default function RegistrationForm({ prefill, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    age: "",
    course: COURSES[0].title,
    level: "Beginner",
    branch: BRANCHES[0].name,
    time: "Kunduzgi (10:00–14:00)",
    comment: "",
  });

  useEffect(() => {
    if (prefill) setForm((f) => ({ ...f, ...prefill }));
  }, [prefill]);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    onSuccess();
  };

  return (
    <section id="aloqa" className="bg-slate-50 py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight">Qabulga yozilish</h2>
          <p className="text-slate-500 mt-3">Formani to'ldiring, administratorimiz siz bilan bog'lanadi.</p>
        </Reveal>

        <Reveal delay={100}>
          <form onSubmit={submit} className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Ism</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={fieldClass}
                  placeholder="Ism familiya"
                />
              </div>
              <div>
                <label className={labelClass}>Telefon</label>
                <input
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={fieldClass}
                  placeholder="+998 90 123 45 67"
                />
              </div>
              <div>
                <label className={labelClass}>Yosh</label>
                <input
                  type="number"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                  className={fieldClass}
                  placeholder="18"
                />
              </div>
              <div>
                <label className={labelClass}>Kurs</label>
                <select value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} className={fieldClass}>
                  {COURSES.map((c) => (
                    <option key={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Daraja</label>
                <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className={fieldClass}>
                  {LEVELS.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Filial</label>
                <select value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} className={fieldClass}>
                  {BRANCHES.map((b) => (
                    <option key={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Qulay vaqt</label>
                <select value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className={fieldClass}>
                  {TIMES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Izoh</label>
                <textarea
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  rows={3}
                  className={fieldClass}
                  placeholder="Qo'shimcha ma'lumot (ixtiyoriy)"
                />
              </div>
            </div>
            <button className="w-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-indigo-950 font-semibold py-3.5 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-transform duration-200">
              Arizani yuborish <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
