// @ts-nocheck
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import FloatingHearts from "@/features/the_unsent_letter/components/FloatingHearts";
import { dbRequest } from "@/lib/db";
import { toast } from "sonner";
import {
  Mail, ArrowLeft, Clock, Send, Feather, BookOpen,
  Sparkles, CheckCircle, Trash2, Calendar
} from "lucide-react";
import { format } from "date-fns";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

export interface Letter {
  id: string;
  content: string;
  date: Date;
  recipient?: string;
}

const pageVariants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

type Screen = "intro" | "writing" | "reflection" | "history";

const Index = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [screen, setScreen] = useState<Screen>("intro");
  const [letterContent, setLetterContent] = useState("");
  const [recipient, setRecipient] = useState("");
  const [savedLetters, setSavedLetters] = useState<Letter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const userId = sessionStorage.getItem("user_id");

  const fetchLetters = useCallback(async () => {
    if (!userId) return;
    try {
      setIsLoading(true);
      const results = await dbRequest(
        `SELECT id, content, recipient, created_at 
         FROM unsent_letters 
         WHERE user_id = $1 
         ORDER BY created_at DESC`,
        [userId]
      );
      setSavedLetters(
        results.map((r: any) => ({
          id: r.id,
          content: r.content,
          recipient: r.recipient,
          date: new Date(r.created_at),
        }))
      );
    } catch (error) {
      console.error("Failed to fetch letters:", error);
      toast.error("Failed to load your letters.");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchLetters();
  }, [fetchLetters]);

  const saveLetter = useCallback(async () => {
    if (!letterContent.trim()) {
      toast.error("Please write something before saving.");
      return;
    }
    if (!userId) {
      toast.error("Session not found. Please refresh.");
      return;
    }
    try {
      setIsSaving(true);
      await dbRequest(
        `INSERT INTO unsent_letters (user_id, content, recipient)
         VALUES ($1, $2, $3)`,
        [userId, letterContent.trim(), recipient.trim() || null]
      );
      toast.success("Your letter has been saved. ✨");
      setLetterContent("");
      setRecipient("");
      await fetchLetters();
      setScreen("history");
    } catch (error) {
      console.error("Failed to save letter:", error);
      toast.error("Failed to save your letter. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }, [letterContent, recipient, userId, fetchLetters]);

  const deleteLetter = useCallback(async (id: string) => {
    try {
      await dbRequest(
        `DELETE FROM unsent_letters WHERE id = $1 AND user_id = $2`,
        [id, userId]
      );
      setSavedLetters((prev) => prev.filter((l) => l.id !== id));
      toast.success("Letter deleted.");
    } catch (err) {
      toast.error("Failed to delete letter.");
    }
  }, [userId]);

  const getTitle = () => {
    switch (screen) {
      case "writing": return "Write Your Letter";
      case "reflection": return "Take a Breath";
      case "history": return "Saved Letters";
      default: return "The Unsent Letter";
    }
  };

  return (
    <PremiumLayout
      title={getTitle()}
      subtitle="Express and Heal"
      icon={<Mail size={24} />}
      onBack={screen !== "intro" ? () => setScreen("intro") : () => navigate("/")}
    >
      <div className="w-full max-w-lg mx-auto relative z-10 font-sans">
        <FloatingHearts />
        
        <AnimatePresence mode="wait">

          {/* ─── INTRO ─── */}
          {screen === "intro" && (
            <motion.div key="intro" variants={pageVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-8">
              <div className="text-center pt-6 space-y-4">
                <div className="w-20 h-20 rounded-[2.5rem] mx-auto flex items-center justify-center shadow-xl bg-gradient-to-br from-primary via-primary/80 to-[#F48FB1]/80">
                  <Feather className="w-9 h-9 text-white" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 leading-tight">The Unsent Letter</h2>
                <p className="text-slate-500 font-bold leading-relaxed max-w-sm mx-auto text-base">
                  Write the words you've been holding inside — to your partner, your past self, or anyone you need to reach.
                </p>
              </div>

              <div className="rounded-3xl p-8 space-y-3 bg-white border-2 border-slate-100 shadow-sm">
                {[
                  { icon: "✍️", text: "Express feelings you struggle to say aloud" },
                  { icon: "🕊️", text: "Release emotional weight through writing" },
                  { icon: "💛", text: "Find clarity, healing, and acceptance" },
                ].map((item) => (
                  <motion.div
                    whileHover={{ x: 4 }}
                    key={item.text}
                    className="flex items-start gap-4 p-2 rounded-2xl hover:bg-slate-50/80 transition-all duration-200"
                  >
                    <span className="text-2xl shrink-0">{item.icon}</span>
                    <p className="text-sm font-bold text-slate-600 pt-0.5 leading-relaxed">{item.text}</p>
                  </motion.div>
                ))}
              </div>

              <p className="text-center text-xs text-slate-400 italic font-bold">
                Your letter is private and saved only for you. It will never be sent.
              </p>

              <div className="space-y-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setScreen("writing")}
                  className="w-full py-5 rounded-[2rem] font-black text-lg text-white shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all flex items-center justify-center gap-3 bg-gradient-to-r from-primary via-[#E05AAA] to-[#F48FB1] hover:brightness-110"
                >
                  <Feather className="w-5 h-5" />
                  Begin Writing
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ─── WRITING ─── */}
          {screen === "writing" && (
            <motion.div key="writing" variants={pageVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-slate-900 leading-tight">Write Your Letter</h2>
                <p className="text-sm font-bold text-slate-400">Let your feelings flow freely — no judgement here.</p>
              </div>

              {/* Recipient */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">To (optional)</label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="e.g. My partner, Past self, Mom..."
                  className="w-full px-6 py-4 rounded-2xl text-base font-bold text-slate-700 placeholder:text-slate-300 outline-none transition-all border-2 border-slate-100 focus:border-primary/30 focus:bg-white bg-slate-50 shadow-inner"
                />
              </div>

              {/* Prompt chips */}
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-4">Quick Prompts</p>
                <div className="flex flex-wrap gap-2 px-1">
                  {["I've been wanting to tell you...", "What I wish you knew...", "I forgive you for...", "Thank you for..."].map((p) => (
                    <button
                      key={p}
                      onClick={() => setLetterContent((prev) => prev + (prev ? " " : "") + p)}
                      className="px-5 py-2.5 rounded-full text-xs font-bold transition-all hover:scale-105 bg-primary/10 text-primary border border-primary/20 shadow-sm"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea */}
              <div className="relative space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Your message</label>
                <textarea
                  value={letterContent}
                  onChange={(e) => setLetterContent(e.target.value)}
                  placeholder="Dear..."
                  rows={10}
                  className="w-full px-6 py-5 rounded-[2rem] text-base leading-relaxed text-slate-700 placeholder:text-slate-300 resize-none outline-none transition-all border-2 border-slate-100 focus:border-primary/30 focus:bg-white bg-slate-50 shadow-inner min-h-[260px]"
                />
                <div className="absolute bottom-4 right-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                  {letterContent.length} chars
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => letterContent.trim() ? setScreen("reflection") : toast.error("Please write something first.")}
                className={`w-full py-5 rounded-[2rem] font-black text-lg transition-all flex items-center justify-center gap-3 ${
                  letterContent.trim()
                    ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:shadow-2xl"
                    : "bg-slate-100 text-slate-300 cursor-not-allowed shadow-none"
                }`}
                disabled={!letterContent.trim()}
              >
                <Send className="w-5 h-5 opacity-70" />
                Continue to Reflection
              </motion.button>
            </motion.div>
          )}

          {/* ─── REFLECTION ─── */}
          {screen === "reflection" && (
            <motion.div key="reflection" variants={pageVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-8">
              <div className="text-center pt-6 space-y-4">
                <div className="w-20 h-20 rounded-[2.5rem] mx-auto flex items-center justify-center shadow-xl bg-gradient-to-br from-indigo-500 to-primary">
                  <Sparkles className="w-9 h-9 text-white animate-pulse" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 leading-tight">Take a Breath</h2>
                <p className="text-slate-500 font-bold leading-relaxed max-w-sm mx-auto text-base">
                  Writing this letter took courage. Before you save it, notice what's shifted inside you.
                </p>
              </div>

              <div className="rounded-3xl p-8 space-y-4 bg-white border-2 border-slate-100 shadow-sm text-left">
                {[
                  "Did something feel lighter as you wrote?",
                  "What emotion is present with you right now?",
                  "Is there something you'd like to carry forward?",
                ].map((q, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0 mt-0.5 bg-gradient-to-br from-primary to-[#F48FB1]">
                      {i + 1}
                    </div>
                    <p className="text-sm font-bold text-slate-600 leading-relaxed">{q}</p>
                  </div>
                ))}
              </div>

              <p className="text-center text-xs font-bold italic text-slate-400">
                Your letter will be stored privately, visible only to you.
              </p>

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={saveLetter}
                  disabled={isSaving}
                  className="w-full py-5 rounded-[2rem] font-black text-lg text-primary-foreground shadow-xl shadow-primary/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 bg-primary"
                >
                  {isSaving ? (
                    <div className="w-6 h-6 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <CheckCircle className="w-5 h-5" />
                  )}
                  {isSaving ? "Saving..." : "Save My Letter"}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                  onClick={() => { setLetterContent(""); setRecipient(""); setScreen("intro"); }}
                  className="w-full py-5 rounded-[2rem] font-black text-base text-slate-400 hover:text-slate-600 transition"
                >
                  Don't save, start over
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ─── HISTORY ─── */}
          {screen === "history" && (
            <motion.div key="history" variants={pageVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 leading-tight">My Letters</h2>
                  <p className="text-xs font-bold text-slate-400 mt-1">{savedLetters.length} letter{savedLetters.length !== 1 ? "s" : ""} written</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => { setLetterContent(""); setRecipient(""); setScreen("writing"); }}
                  className="flex items-center gap-1.5 px-5 py-3 rounded-2xl font-black text-xs text-primary-foreground shadow-md bg-primary uppercase tracking-widest"
                >
                  <Feather className="w-4.5 h-4.5" />
                  Write New
                </motion.button>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-10 h-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                </div>
              ) : savedLetters.length === 0 ? (
                <div className="text-center py-20 space-y-6 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-100">
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto text-slate-200 shadow-sm">
                    <Mail className="w-9 h-9" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-black text-slate-500 text-base">No letters yet</p>
                    <p className="text-sm text-slate-400 font-bold px-8">Your private saved letters will appear here.</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setScreen("writing")}
                    className="mx-auto flex items-center gap-2 px-8 py-4.5 rounded-[2rem] font-black text-sm text-primary-foreground shadow-lg bg-primary uppercase tracking-widest"
                  >
                    <Feather className="w-4.5 h-4.5" />
                    Write Your First Letter
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedLetters.map((letter, i) => (
                    <motion.div
                      key={letter.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="rounded-[2.5rem] p-8 group relative overflow-hidden bg-white border-2 border-slate-100 shadow-sm text-left hover:border-primary/25 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-4 mb-4 border-b border-slate-50 pb-4">
                        <div>
                          {letter.recipient ? (
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#A2347A] mb-1">
                              To {letter.recipient}
                            </p>
                          ) : (
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-350 mb-1">
                              Private Letter
                            </p>
                          )}
                          <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                            <Calendar className="w-3.5 h-3.5" />
                            {format(letter.date, "MMMM d, yyyy · h:mm a")}
                          </div>
                        </div>
                        <button
                          onClick={() => deleteLetter(letter.id)}
                          className="opacity-0 group-hover:opacity-100 p-2.5 rounded-xl text-slate-300 hover:text-red-500 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-base leading-relaxed text-slate-650 whitespace-pre-wrap font-bold">
                        {letter.content}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
};

export default Index;
