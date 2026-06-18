import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Sparkles,
  TrendingUp,
  Target,
  Flame,
  CheckCircle2,
  Lock,
  Play,
  BookOpen,
  Lightbulb,
  HeartHandshake,
  Brain,
  Award,
  Trophy,
  MessageCircle,
  Compass,
  Star,
  ShieldCheck,
  Clock,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Couple Therapy — A Guided Relationship Journey" },
      {
        name: "description",
        content:
          "Therapist-guided tools, pathways, and insights to deepen connection, communication, and emotional intimacy together.",
      },
    ],
  }),
  component: CoupleTherapyPage,
});

/* ---------------------------------- Page ---------------------------------- */

function CoupleTherapyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Ambient warm background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-rose-soft blur-3xl opacity-70" />
        <div className="absolute top-40 -right-32 h-[32rem] w-[32rem] rounded-full bg-sage-soft blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-lavender-soft blur-3xl opacity-50" />
      </div>

      <TopBar />

      <main className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
        <Hero />
        <ContinueJourney />
        <Roadmap />
        <NextSteps />
        <RelationshipTools />
        <Insights />
        <ResourceLibrary />
        <Milestones />
        <TherapistCorner />
        <Footer />
      </main>
    </div>
  );
}

/* --------------------------------- TopBar --------------------------------- */

function TopBar() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 pt-6 sm:px-8 sm:pt-8">
      <button className="group inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back
      </button>
      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur sm:inline-flex">
          <ShieldCheck className="h-3.5 w-3.5 text-sage" />
          Therapist-approved
        </div>
        <div className="flex -space-x-2">
          <Avatar tone="rose" label="A" />
          <Avatar tone="sage" label="J" />
        </div>
      </div>
    </header>
  );
}

function Avatar({ tone, label }: { tone: "rose" | "sage"; label: string }) {
  const cls =
    tone === "rose"
      ? "bg-rose-soft text-rose ring-background"
      : "bg-sage-soft text-sage ring-background";
  return (
    <div
      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ring-2 ${cls}`}
    >
      {label}
    </div>
  );
}

/* ---------------------------------- Hero ---------------------------------- */

function Hero() {
  return (
    <section className="mt-8 sm:mt-12">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card/60 p-6 shadow-card backdrop-blur-xl sm:p-10">
        <div
          aria-hidden
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sage-soft blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-rose-soft blur-3xl"
        />

        <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-sage-soft px-3 py-1 text-xs font-medium text-sage">
              <Sparkles className="h-3.5 w-3.5" />
              Personalized for Alex & Jordan
            </div>
            <h1 className="mt-5 text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-[3.5rem]">
              Couple <em className="font-normal italic text-sage">Therapy</em>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Strengthen communication, deepen emotional intimacy, and build a
              healthier relationship together — guided by evidence-based
              therapy.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-all hover:opacity-90 hover:shadow-lg">
                Continue Journey
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                Explore Resources
              </button>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-3 sm:max-w-md">
              <Stat icon={<Flame className="h-4 w-4" />} label="Day streak" value="14" tone="rose" />
              <Stat icon={<CheckCircle2 className="h-4 w-4" />} label="Activities" value="12" tone="sage" />
              <Stat icon={<TrendingUp className="h-4 w-4" />} label="Growth" value="86" tone="lavender" />
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <ProgressRing percent={72} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "rose" | "sage" | "lavender";
}) {
  const tones: Record<string, string> = {
    rose: "bg-rose-soft text-rose",
    sage: "bg-sage-soft text-sage",
    lavender: "bg-lavender-soft text-lavender",
  };
  return (
    <div className="rounded-2xl border border-border bg-card/80 p-3 backdrop-blur">
      <div className={`mb-2 inline-flex h-7 w-7 items-center justify-center rounded-lg ${tones[tone]}`}>
        {icon}
      </div>
      <div className="font-display text-xl text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function ProgressRing({ percent }: { percent: number }) {
  const size = 220;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;

  return (
    <div className="relative">
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.7 0.1 20)" />
            <stop offset="100%" stopColor="oklch(0.62 0.07 155)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="oklch(0.92 0.015 70)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-display text-5xl text-foreground">{percent}%</div>
        <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Pathway complete
        </div>
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-sage-soft px-2.5 py-1 text-[11px] font-semibold text-sage">
          <Sparkles className="h-3 w-3" />
          Phase 3 of 5
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Continue Journey --------------------------- */

function ContinueJourney() {
  return (
    <SectionHeader
      eyebrow="Pick up where you left off"
      title="Continue your journey"
      desc="A short session today keeps the momentum going."
    >
      <div className="mt-6 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="group relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-sage-soft via-card to-rose-soft p-6 shadow-card transition-all hover:shadow-lg sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-card/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-sage backdrop-blur">
                <Play className="h-3 w-3 fill-sage" /> Session 8
              </div>
              <h3 className="mt-4 font-display text-2xl text-foreground sm:text-3xl">
                The Art of Active Listening
              </h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                A 12-minute guided practice to help you truly hear each other
                without defensiveness.
              </p>

              <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> 12 min
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <HeartHandshake className="h-3.5 w-3.5" /> Together
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Brain className="h-3.5 w-3.5" /> Gottman-based
                </span>
              </div>
            </div>

            <button className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-transform group-hover:scale-105">
              <Play className="h-5 w-5 translate-x-0.5 fill-background" />
            </button>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
              <span>Phase progress</span>
              <span className="text-foreground">8 of 12 sessions</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-card">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-sage to-rose" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-soft text-sky">
            <MessageCircle className="h-5 w-5" />
          </div>
          <h4 className="mt-4 font-display text-lg text-foreground">
            Tonight's check-in
          </h4>
          <p className="mt-1 text-sm text-muted-foreground">
            5 thoughtful prompts. Just before bed.
          </p>
          <button className="mt-5 inline-flex w-full items-center justify-between rounded-full bg-secondary px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background">
            Start check-in
            <ArrowRight className="h-4 w-4" />
          </button>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-sand text-sand" />
            Loved by 94% of couples
          </div>
        </div>
      </div>
    </SectionHeader>
  );
}

/* --------------------------------- Roadmap -------------------------------- */

const phases = [
  { n: 1, title: "Building Awareness", duration: "1 week", activities: 6, status: "done" },
  { n: 2, title: "Communication Skills", duration: "2 weeks", activities: 10, status: "done" },
  { n: 3, title: "Conflict Resolution", duration: "2 weeks", activities: 12, status: "current" },
  { n: 4, title: "Emotional Connection", duration: "3 weeks", activities: 14, status: "locked" },
  { n: 5, title: "Long-Term Growth", duration: "Ongoing", activities: 18, status: "locked" },
] as const;

function Roadmap() {
  return (
    <SectionHeader
      eyebrow="Your guided pathway"
      title="A relationship journey, in five phases"
      desc="Each phase builds on the last, designed with licensed therapists."
    >
      <div className="mt-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="relative flex min-w-max gap-4">
          {/* connecting line */}
          <div
            aria-hidden
            className="absolute left-6 right-6 top-10 -z-0 h-px bg-gradient-to-r from-sage via-rose to-border"
          />
          {phases.map((p) => (
            <PhaseCard key={p.n} {...p} />
          ))}
        </div>
      </div>
    </SectionHeader>
  );
}

function PhaseCard({
  n,
  title,
  duration,
  activities,
  status,
}: {
  n: number;
  title: string;
  duration: string;
  activities: number;
  status: "done" | "current" | "locked";
}) {
  const isCurrent = status === "current";
  const isDone = status === "done";
  const isLocked = status === "locked";

  return (
    <div
      className={`relative z-10 w-64 shrink-0 rounded-2xl border p-5 transition-all ${
        isCurrent
          ? "border-sage/40 bg-card shadow-card ring-1 ring-sage/30"
          : isDone
            ? "border-border bg-card shadow-soft"
            : "border-dashed border-border bg-card/50"
      }`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
            isDone
              ? "bg-sage text-primary-foreground"
              : isCurrent
                ? "bg-rose-soft text-rose ring-4 ring-rose/15"
                : "bg-muted text-muted-foreground"
          }`}
        >
          {isDone ? <CheckCircle2 className="h-4 w-4" /> : isLocked ? <Lock className="h-3.5 w-3.5" /> : n}
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
            isCurrent
              ? "bg-rose-soft text-rose"
              : isDone
                ? "bg-sage-soft text-sage"
                : "bg-muted text-muted-foreground"
          }`}
        >
          {isDone ? "Complete" : isCurrent ? "In progress" : "Locked"}
        </span>
      </div>

      <div className="mt-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Phase {n}
      </div>
      <h4 className="mt-1 font-display text-lg text-foreground">{title}</h4>

      <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3 w-3" /> {duration}
        </span>
        <span>·</span>
        <span>{activities} activities</span>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${
            isDone ? "w-full bg-sage" : isCurrent ? "w-2/3 bg-gradient-to-r from-sage to-rose" : "w-0"
          }`}
        />
      </div>
    </div>
  );
}

/* -------------------------------- NextSteps ------------------------------- */

const nextSteps = [
  {
    icon: <Heart className="h-4 w-4" />,
    title: "Appreciation Exercise",
    time: "5 min",
    priority: "Top pick",
    tone: "rose",
    desc: "Share three things you noticed today.",
  },
  {
    icon: <MessageCircle className="h-4 w-4" />,
    title: "Communication Reflection",
    time: "8 min",
    priority: "For your phase",
    tone: "sage",
    desc: "Replay this week's hardest conversation with new tools.",
  },
  {
    icon: <Target className="h-4 w-4" />,
    title: "Shared Goal Review",
    time: "10 min",
    priority: "Weekly",
    tone: "lavender",
    desc: "Revisit the vision you're building together.",
  },
] as const;

function NextSteps() {
  return (
    <SectionHeader
      eyebrow="Recommended for today"
      title="Your next steps"
      desc="Personalized by your check-ins and current phase."
    >
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {nextSteps.map((s) => {
          const tones: Record<string, string> = {
            rose: "bg-rose-soft text-rose",
            sage: "bg-sage-soft text-sage",
            lavender: "bg-lavender-soft text-lavender",
          };
          return (
            <div
              key={s.title}
              className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
            >
              <div className="flex items-center justify-between">
                <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${tones[s.tone]}`}>
                  {s.icon}
                </div>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {s.priority}
                </span>
              </div>
              <h4 className="mt-4 font-display text-lg text-foreground">{s.title}</h4>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{s.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {s.time}
                </span>
                <button className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-sage">
                  Begin <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </SectionHeader>
  );
}

/* ----------------------------- Relationship Tools ------------------------- */

const tools = [
  {
    icon: <Heart className="h-5 w-5" />,
    title: "Relationship Check-In",
    desc: "Track emotional connection and satisfaction together.",
    last: "Yesterday",
    progress: 80,
    tone: "rose",
  },
  {
    icon: <Star className="h-5 w-5" />,
    title: "Daily Appreciation Practice",
    desc: "Build the habit of noticing and naming the good.",
    last: "2 days ago",
    progress: 65,
    tone: "sand",
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Connection Tracker",
    desc: "Monitor closeness, intimacy, and warmth over time.",
    last: "Today",
    progress: 92,
    tone: "sage",
  },
  {
    icon: <Compass className="h-5 w-5" />,
    title: "Shared Vision Builder",
    desc: "Align your future goals, values, and dreams.",
    last: "Last week",
    progress: 40,
    tone: "lavender",
  },
] as const;

function RelationshipTools() {
  const tones: Record<string, { wrap: string; bar: string }> = {
    rose: { wrap: "bg-rose-soft text-rose", bar: "bg-rose" },
    sage: { wrap: "bg-sage-soft text-sage", bar: "bg-sage" },
    sand: { wrap: "bg-sand-soft text-sand", bar: "bg-sand" },
    lavender: { wrap: "bg-lavender-soft text-lavender", bar: "bg-lavender" },
  };
  return (
    <SectionHeader
      eyebrow="Relationship growth tools"
      title="Daily practices, designed together"
      desc="Small rituals that compound into a stronger partnership."
    >
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {tools.map((t) => {
          const tone = tones[t.tone];
          return (
            <div
              key={t.title}
              className="group rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card sm:p-6"
            >
              <div className="flex items-start justify-between">
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${tone.wrap}`}>
                  {t.icon}
                </div>
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <h4 className="mt-5 font-display text-xl text-foreground">{t.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>

              <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                <span>Last used · {t.last}</span>
                <span className="font-medium text-foreground">{t.progress}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className={`h-full rounded-full ${tone.bar}`} style={{ width: `${t.progress}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </SectionHeader>
  );
}

/* -------------------------------- Insights -------------------------------- */

const insights = [
  { label: "Connection", value: 86, trend: "+12%", tone: "rose", data: [30, 42, 38, 55, 60, 70, 86] },
  { label: "Communication", value: 78, trend: "+8%", tone: "sage", data: [40, 45, 50, 48, 60, 70, 78] },
  { label: "Appreciation", value: 91, trend: "+15%", tone: "sand", data: [50, 55, 65, 70, 75, 82, 91] },
  { label: "Conflict Recovery", value: 68, trend: "+5%", tone: "lavender", data: [55, 58, 50, 60, 62, 65, 68] },
] as const;

function Insights() {
  const tones: Record<string, { wrap: string; stroke: string; fill: string }> = {
    rose: { wrap: "text-rose", stroke: "oklch(0.7 0.1 20)", fill: "oklch(0.7 0.1 20 / 0.15)" },
    sage: { wrap: "text-sage", stroke: "oklch(0.62 0.07 155)", fill: "oklch(0.62 0.07 155 / 0.15)" },
    sand: { wrap: "text-sand", stroke: "oklch(0.78 0.07 75)", fill: "oklch(0.78 0.07 75 / 0.2)" },
    lavender: { wrap: "text-lavender", stroke: "oklch(0.65 0.09 295)", fill: "oklch(0.65 0.09 295 / 0.15)" },
  };

  return (
    <SectionHeader
      eyebrow="Relationship insights"
      title="How you're growing this week"
      desc="Patterns from your check-ins, journals, and shared activities."
    >
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {insights.map((i) => {
          const t = tones[i.tone];
          return (
            <div key={i.label} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {i.label}
                </div>
                <span className={`inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold ${t.wrap}`}>
                  <TrendingUp className="h-3 w-3" /> {i.trend}
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-display text-4xl text-foreground">{i.value}</span>
                <span className="text-sm text-muted-foreground">/100</span>
              </div>
              <Sparkline data={[...i.data]} stroke={t.stroke} fill={t.fill} />
            </div>
          );
        })}
      </div>
    </SectionHeader>
  );
}

function Sparkline({ data, stroke, fill }: { data: number[]; stroke: string; fill: string }) {
  const w = 220;
  const h = 60;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  const points = data.map((v, i) => [i * step, h - ((v - min) / range) * (h - 8) - 4] as const);
  const path = points.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const area = `${path} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-4 w-full">
      <path d={area} fill={fill} />
      <path d={path} fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ----------------------------- Resource Library --------------------------- */

const resources = [
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Articles",
    count: "42 articles",
    time: "5–8 min read",
    tone: "sand",
    trending: true,
  },
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: "Therapist Tips",
    count: "28 quick tips",
    time: "2 min read",
    tone: "sky",
    trending: false,
  },
  {
    icon: <HeartHandshake className="h-5 w-5" />,
    title: "Real Couple Stories",
    count: "16 stories",
    time: "8–12 min read",
    tone: "lavender",
    trending: true,
  },
  {
    icon: <Brain className="h-5 w-5" />,
    title: "Relationship Myths",
    count: "12 myths debunked",
    time: "3 min read",
    tone: "sage",
    trending: false,
  },
] as const;

function ResourceLibrary() {
  const tones: Record<string, string> = {
    sand: "from-sand-soft to-card",
    sky: "from-sky-soft to-card",
    lavender: "from-lavender-soft to-card",
    sage: "from-sage-soft to-card",
  };
  const iconTones: Record<string, string> = {
    sand: "bg-card text-sand",
    sky: "bg-card text-sky",
    lavender: "bg-card text-lavender",
    sage: "bg-card text-sage",
  };
  return (
    <SectionHeader
      eyebrow="Resource library"
      title="Read, listen, and reflect"
      desc="Hand-picked by therapists and updated every week."
    >
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {resources.map((r) => (
          <a
            key={r.title}
            href="#"
            className={`group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${tones[r.tone]} p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card`}
          >
            <div className="flex items-start justify-between">
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl shadow-soft ${iconTones[r.tone]}`}>
                {r.icon}
              </div>
              {r.trending && (
                <span className="inline-flex items-center gap-1 rounded-full bg-foreground/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-background">
                  <Flame className="h-3 w-3" /> Trending
                </span>
              )}
            </div>
            <h4 className="mt-5 font-display text-2xl text-foreground">{r.title}</h4>
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              <span>{r.count}</span>
              <span>·</span>
              <span>{r.time}</span>
            </div>
            <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground">
              Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </a>
        ))}
      </div>
    </SectionHeader>
  );
}

/* ------------------------------- Milestones ------------------------------- */

const milestones = [
  { icon: <CheckCircle2 className="h-5 w-5" />, label: "First Week Completed", earned: true, tone: "sage" },
  { icon: <MessageCircle className="h-5 w-5" />, label: "Communication Champion", earned: true, tone: "sky" },
  { icon: <Star className="h-5 w-5" />, label: "Gratitude Builder", earned: true, tone: "sand" },
  { icon: <Award className="h-5 w-5" />, label: "Conflict Navigator", earned: false, tone: "lavender" },
  { icon: <Trophy className="h-5 w-5" />, label: "Connection Master", earned: false, tone: "rose" },
] as const;

function Milestones() {
  const tones: Record<string, string> = {
    sage: "bg-sage-soft text-sage",
    sky: "bg-sky-soft text-sky",
    sand: "bg-sand-soft text-sand",
    lavender: "bg-lavender-soft text-lavender",
    rose: "bg-rose-soft text-rose",
  };
  return (
    <SectionHeader
      eyebrow="Milestones"
      title="Celebrate every step"
      desc="Small wins are how lasting change happens."
    >
      <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {milestones.map((m) => (
            <div key={m.label} className="flex flex-col items-center text-center">
              <div
                className={`relative flex h-20 w-20 items-center justify-center rounded-full ${
                  m.earned ? tones[m.tone] : "bg-muted text-muted-foreground/60"
                }`}
              >
                {m.earned ? m.icon : <Lock className="h-5 w-5" />}
                {m.earned && (
                  <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background ring-4 ring-card">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </span>
                )}
              </div>
              <div className="mt-3 text-sm font-medium text-foreground">{m.label}</div>
              <div className="text-xs text-muted-foreground">
                {m.earned ? "Earned" : "Locked"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionHeader>
  );
}

/* ----------------------------- Therapist Corner --------------------------- */

const therapists = [
  { name: "Dr. Maya Chen", role: "LMFT · Gottman Method", initials: "MC", tone: "sage" },
  { name: "Dr. Idris Rahman", role: "PsyD · EFT Specialist", initials: "IR", tone: "rose" },
  { name: "Sofia Alvarez", role: "LCSW · Attachment Focus", initials: "SA", tone: "lavender" },
] as const;

function TherapistCorner() {
  const tones: Record<string, string> = {
    sage: "bg-sage-soft text-sage",
    rose: "bg-rose-soft text-rose",
    lavender: "bg-lavender-soft text-lavender",
  };
  return (
    <SectionHeader
      eyebrow="Therapist corner"
      title="Guided by licensed experts"
      desc="Every exercise is built on evidence-based relationship science."
    >
      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-sage-soft via-card to-lavender-soft p-6 shadow-soft sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-card/80 px-3 py-1 text-xs font-semibold text-sage backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5" /> Therapist-approved
          </div>
          <h4 className="mt-5 font-display text-2xl text-foreground">
            Evidence-based, never generic
          </h4>
          <p className="mt-2 text-sm text-muted-foreground">
            Our pathways draw from the Gottman Method, Emotionally Focused
            Therapy, and Attachment Theory — translated into practices that
            fit real life.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Gottman", "EFT", "Attachment", "CBT"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium text-foreground backdrop-blur"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <h4 className="font-display text-xl text-foreground">Meet your guides</h4>
          <div className="mt-5 space-y-3">
            {therapists.map((t) => (
              <div
                key={t.name}
                className="flex items-center justify-between rounded-2xl border border-border bg-secondary/40 p-3 transition-colors hover:bg-secondary"
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-full font-semibold ${tones[t.tone]}`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
                <button className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground hover:text-background">
                  Read insights
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionHeader>
  );
}

/* --------------------------------- Footer --------------------------------- */

function Footer() {
  return (
    <div className="mt-20 flex flex-col items-center gap-2 text-center text-xs text-muted-foreground">
      <div className="inline-flex items-center gap-2">
        <Heart className="h-3.5 w-3.5 text-rose" />
        Made with care for couples growing together
      </div>
      <div>This is wellness content — not a substitute for professional therapy.</div>
    </div>
  );
}

/* ------------------------------ Section helper ---------------------------- */

function SectionHeader({
  eyebrow,
  title,
  desc,
  children,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14 sm:mt-20">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-sage">
          {eyebrow}
        </span>
        <h2 className="font-display text-2xl text-foreground sm:text-3xl">{title}</h2>
        {desc && <p className="mt-1 max-w-xl text-sm text-muted-foreground">{desc}</p>}
      </div>
      {children}
    </section>
  );
}
