import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  HeartHandshake,
  MessageCircle,
  ShieldCheck,
  Compass,
  Star,
  TrendingUp,
  BookOpen,
  Lightbulb,
  Brain,
  Flame,
  ChevronRight,
  Sparkles,
  Users,
  Target,
  Scale,
  Baby,
  RefreshCcw,
  HandHeart,
  Wrench,
  Mail,
  PenLine,
  UserMinus,
  Flame as FlameIcon,
  UserX,
  Crosshair,
  CircleDot,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Couple Therapy: A Guided Relationship Journey" },
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

function useParallaxScroll() {
  const [y, setY] = useState(0);
  const target = useRef(0);
  const current = useRef(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const tick = () => {
      // Smooth easing toward target for "slow-motion" feel
      current.current += (target.current - current.current) * 0.08;
      setY(current.current);
      if (Math.abs(target.current - current.current) > 0.1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        raf.current = null;
      }
    };

    const onScroll = () => {
      target.current = window.scrollY;
      if (raf.current == null) raf.current = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, []);

  return y;
}

function CoupleTherapyPage() {
  const scrollY = useParallaxScroll();

  return (
    <div
      className="group/page min-h-screen relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #A2347A 0%, #D9468B 35%, #F06292 65%, #F48FB1 100%)",
      }}
    >
      {/* Strong top lightness fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,240,250,0.82) 0%, rgba(255,225,240,0.45) 25%, rgba(255,210,235,0.15) 55%, transparent 85%)",
        }}
      />
      {/* Mid-section lightness band — softens Communication & Guided Series */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, transparent 28%, rgba(255,238,248,0.42) 42%, rgba(255,235,247,0.5) 58%, rgba(255,238,248,0.35) 72%, rgba(255,236,246,0.25) 82%, transparent 95%)",
        }}
      />
      {/* Bottom lightness — mirrors the top fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(255,240,250,0.82) 0%, rgba(255,225,240,0.45) 25%, rgba(255,210,235,0.15) 55%, transparent 85%)",
        }}
      />
      {/* Soft pink center glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 10%, rgba(255,215,235,0.55), transparent 50%)",
        }}
      />

      {/* Animated floating orbs with gentle parallax — dim when a card/CTA is hovered */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out group-has-[a:hover]/page:opacity-30 group-has-[button:hover]/page:opacity-30"
      >
        <div
          className="absolute -left-20 top-[15%] h-80 w-80 rounded-full bg-rose/25 blur-[80px] animate-float-slow will-change-transform"
          style={{ transform: `translate3d(${scrollY * 0.04}px, ${scrollY * -0.18}px, 0)` }}
        />
        <div
          className="absolute right-[-5%] top-[40%] h-96 w-96 rounded-full bg-lavender/20 blur-[90px] animate-float-medium will-change-transform"
          style={{ transform: `translate3d(${scrollY * -0.05}px, ${scrollY * -0.1}px, 0)` }}
        />
        <div
          className="absolute bottom-[10%] left-[10%] h-72 w-72 rounded-full bg-sky/20 blur-[70px] animate-float-slow will-change-transform"
          style={{ transform: `translate3d(${scrollY * 0.06}px, ${scrollY * -0.25}px, 0)` }}
        />
        <div
          className="absolute bottom-[25%] right-[5%] h-64 w-64 rounded-full bg-sage/22 blur-[75px] animate-float-medium will-change-transform"
          style={{ transform: `translate3d(${scrollY * -0.03}px, ${scrollY * -0.15}px, 0)` }}
        />
      </div>

      {/* Subtle mesh overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative z-10">
        <TopBar />

        <main className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
          <JourneyProgress />
          <RelationshipTools />
          <EmotionalConnection />
          <CommunicationAlignment />
          <GuidedSeries />
          <ResourceLibrary />
          <Footer />
        </main>
      </div>
    </div>
  );
}

/* ----------------------------- Journey Progress -------------------------- */

function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current || inView) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [inView, threshold]);
  return { ref, inView };
}

function useCountUp(target: number, run: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return value;
}

function JourneyProgress() {
  const scrollY = useParallaxScroll();
  const { ref, inView } = useInView<HTMLDivElement>(0.35);

  const targetPct = 72;
  const targetStreak = 14;
  const targetCheckIns = 28;

  const pct = useCountUp(targetPct, inView, 1500);
  const streak = useCountUp(targetStreak, inView, 1300);
  const checkIns = useCountUp(targetCheckIns, inView, 1600);

  // Ring geometry
  const size = 132;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - pct / 100);

  // Gentle scroll-reactive lift/tilt
  const lift = Math.min(8, scrollY * 0.02);
  const flameWiggle = Math.sin(scrollY * 0.01) * 4;

  return (
    <section
      ref={ref}
      className="relative mt-10 sm:mt-12"
      aria-label="Your shared progress"
    >
      <div
        className="group relative overflow-hidden rounded-[28px] border border-border bg-card/95 p-6 shadow-card backdrop-blur-sm transition-all duration-700 sm:p-8"
        style={{
          transform: `translate3d(0, ${-lift}px, 0)`,
          opacity: inView ? 1 : 0,
          transitionProperty: "opacity, transform, box-shadow",
        }}
      >
        {/* Soft focus halo */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,255,255,0.7), rgba(255,210,232,0.35) 55%, transparent 80%)",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-rose/25 blur-3xl"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-lavender/20 blur-3xl"
        />

        <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          {/* Progress ring */}
          <div className="flex items-center gap-5">
            <div
              className="relative shrink-0"
              style={{ width: size, height: size }}
            >
              <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="-rotate-90"
              >
                <defs>
                  <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="oklch(0.7 0.22 350)" />
                    <stop offset="100%" stopColor="oklch(0.65 0.22 310)" />
                  </linearGradient>
                </defs>
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={r}
                  fill="none"
                  stroke="oklch(0.94 0.03 340)"
                  strokeWidth={stroke}
                />
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={r}
                  fill="none"
                  stroke="url(#ringGrad)"
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  style={{
                    transition:
                      "stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className="font-display text-3xl text-foreground tabular-nums"
                  style={{ transition: "color 0.3s ease" }}
                >
                  {pct}%
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Complete
                </span>
              </div>
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-xl text-foreground sm:text-2xl">
                Your Shared Journey
              </h3>
              <p className="mt-1 max-w-xs text-sm leading-relaxed text-muted-foreground">
                You and your partner are making steady progress this month.
              </p>
            </div>
          </div>

          {/* Streak + check-ins */}
          <div className="grid w-full grid-cols-2 gap-3 sm:w-auto">
            <StatPill
              icon={
                <FlameIcon
                  className="h-5 w-5"
                  style={{
                    transform: `rotate(${flameWiggle}deg)`,
                    transition: "transform 0.4s ease-out",
                  }}
                />
              }
              value={streak}
              suffix="day"
              label="Current streak"
              tone="rose"
              pulse={inView}
            />
            <StatPill
              icon={<HeartHandshake className="h-5 w-5" />}
              value={checkIns}
              label="Check-ins"
              tone="lavender"
              pulse={inView}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatPill({
  icon,
  value,
  label,
  suffix,
  tone,
  pulse,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  tone: Tone;
  pulse: boolean;
}) {
  const [bump, setBump] = useState(false);
  const prev = useRef(value);
  useEffect(() => {
    if (value !== prev.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 350);
      prev.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <div
      className={`group/stat relative flex items-center gap-3 rounded-2xl border border-border bg-card/90 p-3 pr-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card ${
        pulse ? "animate-fade-in" : "opacity-0"
      }`}
    >
      <div
        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${toneStyles[tone]}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <div
          className="font-display text-xl text-foreground tabular-nums leading-none"
          style={{
            transform: bump ? "scale(1.12)" : "scale(1)",
            transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
            transformOrigin: "left center",
          }}
        >
          {value}
          {suffix ? (
            <span className="ml-1 text-xs font-medium text-muted-foreground">
              {suffix}
            </span>
          ) : null}
        </div>
        <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
      </div>
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
      <div className="flex items-center gap-2" />
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

/* ------------------------- Activity Card (shared) ------------------------- */

type Tone = "rose" | "sage" | "lavender" | "sand" | "sky";
const toneStyles: Record<Tone, string> = {
  rose: "bg-rose-soft text-rose",
  sage: "bg-sage-soft text-sage",
  lavender: "bg-lavender-soft text-lavender",
  sand: "bg-sand-soft text-sand",
  sky: "bg-sky-soft text-sky",
};

const toneGradients: Record<Tone, string> = {
  rose: "from-rose-soft to-card",
  sage: "from-sage-soft to-card",
  lavender: "from-lavender-soft to-card",
  sand: "from-sand-soft to-card",
  sky: "from-sky-soft to-card",
};

const toneIconCard: Record<Tone, string> = {
  rose: "bg-card text-rose",
  sage: "bg-card text-sage",
  lavender: "bg-card text-lavender",
  sand: "bg-card text-sand",
  sky: "bg-card text-sky",
};

const toneBlob: Record<Tone, string> = {
  rose: "bg-rose/30",
  sage: "bg-sage/30",
  lavender: "bg-lavender/30",
  sand: "bg-sand/30",
  sky: "bg-sky/30",
};

const toneStripe: Record<Tone, string> = {
  rose: "bg-rose",
  sage: "bg-sage",
  lavender: "bg-lavender",
  sand: "bg-sand",
  sky: "bg-sky",
};

const toneRing: Record<Tone, string> = {
  rose: "ring-rose/40",
  sage: "ring-sage/40",
  lavender: "ring-lavender/40",
  sand: "ring-sand/40",
  sky: "ring-sky/40",
};

/* Section 2 style: warm card with a decorative blurred blob + ringed icon */
function ActivityCard({
  icon,
  title,
  desc,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tone: Tone;
}) {
  return (
    <a
      href="#"
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card hover:ring-1 hover:ring-primary/30"
    >
      {/* Focus glow halo */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.7), rgba(255,210,232,0.35) 55%, transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl transition-opacity duration-500 ${toneBlob[tone]} opacity-60 group-hover:opacity-100`}
      />
      <div className="relative flex items-start justify-between">
        <div
          className={`inline-flex h-14 w-14 items-center justify-center rounded-full ring-8 ${toneRing[tone]} ${toneStyles[tone]}`}
        >
          {icon}
        </div>
        <ArrowRight className="mt-2 h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-foreground" />
      </div>
      <h4 className="relative mt-6 font-display text-lg text-foreground">{title}</h4>
      <p className="relative mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">
        {desc}
      </p>
    </a>
  );
}

/* Section 3 style: clean card with a vertical accent stripe on the left */
function AlignmentCard({
  icon,
  title,
  desc,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tone: Tone;
}) {
  return (
    <a
      href="#"
      className="group relative flex gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 pl-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card hover:ring-1 hover:ring-primary/30"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-5 -z-10 rounded-[1.75rem] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.65), rgba(255,210,232,0.3) 55%, transparent 80%)",
        }}
      />
      <span
        aria-hidden
        className={`absolute left-0 top-0 h-full w-1.5 ${toneStripe[tone]} transition-all group-hover:w-2`}
      />
      <div
        className={`mt-0.5 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-current/20 ${toneStyles[tone]}`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-display text-lg text-foreground">{title}</h4>
          <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
        </div>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {desc}
        </p>
      </div>
    </a>
  );
}



/* ---------------------- Section 1: Emotional Connection ---------------------- */

function EmotionalConnection() {
  const items: { icon: React.ReactNode; title: string; desc: string; tone: Tone }[] = [
    {
      icon: <Heart className="h-5 w-5" />,
      title: "Emotional Check-In Ritual",
      desc: "A daily moment to share what you're feeling and what you need.",
      tone: "rose",
    },
    {
      icon: <HandHeart className="h-5 w-5" />,
      title: "Forgiveness Corner and Apology Exchange",
      desc: "Offer and receive heartfelt apologies in a safe, guided space.",
      tone: "lavender",
    },
    {
      icon: <RefreshCcw className="h-5 w-5" />,
      title: "Rupture and Repair Work",
      desc: "Move through hard moments together and come back closer.",
      tone: "sage",
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Trust Rebuilding Repair Plan",
      desc: "A step-by-step plan to restore safety and rebuild trust.",
      tone: "sand",
    },
  ];

  return (
    <Section
      title="Emotional Connection and Trust"
      desc="Strengthen emotional connection, rebuild trust, and learn healthy relationship repair."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((i) => (
          <ActivityCard key={i.title} {...i} />
        ))}
      </div>
    </Section>
  );
}

/* -------------------- Section 2: Communication and Alignment -------------------- */

function CommunicationAlignment() {
  const items: { icon: React.ReactNode; title: string; desc: string; tone: Tone }[] = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: "Conflict Reframing Exercise",
      desc: "Turn recurring arguments into shared understanding.",
      tone: "sage",
    },
    {
      icon: <Compass className="h-5 w-5" />,
      title: "Goals and Dreams Alignment",
      desc: "Map the future you both want and the steps to get there.",
      tone: "lavender",
    },
    {
      icon: <Scale className="h-5 w-5" />,
      title: "Money Values and Goal Alignment",
      desc: "Align on spending, saving, and financial priorities together.",
      tone: "sand",
    },
    {
      icon: <Baby className="h-5 w-5" />,
      title: "Co-Parenting Alignment Matrix",
      desc: "Build a united approach to parenting decisions and routines.",
      tone: "rose",
    },
  ];

  return (
    <Section
      title="Communication and Partnership Alignment"
      desc="Communicate with clarity and build a shared vision for life together."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((i) => (
          <AlignmentCard key={i.title} {...i} />
        ))}
      </div>
    </Section>
  );
}

/* ----------------------------- Guided Series ----------------------------- */

function GuidedSeries() {
  const groups: {
    heading: string;
    items: { icon: React.ReactNode; title: string; desc: string; tone: Tone }[];
  }[] = [
    {
      heading: "Know Your Patterns",
      items: [
        {
          icon: <Users className="h-5 w-5" />,
          title: "Relationship Patterns Unpacked",
          desc: "Explore recurring conflict cycles and emotional reactions.",
          tone: "rose",
        },
        {
          icon: <Crosshair className="h-5 w-5" />,
          title: "Relationship Boundaries",
          desc: "Explore emotional boundaries and expectations in your relationship.",
          tone: "lavender",
        },
        {
          icon: <Heart className="h-5 w-5" />,
          title: "Emotional Needs Mapping",
          desc: "Understand what helps you feel emotionally safe.",
          tone: "sand",
        },
      ],
    },
    {
      heading: "Express and Heal",
      items: [
        {
          icon: <Mail className="h-5 w-5" />,
          title: "The Unsent Letter",
          desc: "Express unresolved feelings in a safe, private space.",
          tone: "sky",
        },
        {
          icon: <PenLine className="h-5 w-5" />,
          title: "A Letter to Self",
          desc: "Reflect on your patterns and grow toward healthier responses.",
          tone: "lavender",
        },
        {
          icon: <HandHeart className="h-5 w-5" />,
          title: "Repair and Reconnect",
          desc: "Rebuild trust and emotional safety after conflict.",
          tone: "rose",
        },
      ],
    },
    {
      heading: "Common Relationship Issues",
      items: [
        {
          icon: <UserMinus className="h-5 w-5" />,
          title: "Growing Apart",
          desc: "Explore signs and solutions when partners drift apart.",
          tone: "sand",
        },
        {
          icon: <FlameIcon className="h-5 w-5" />,
          title: "Why Small Fights Become Big",
          desc: "Understand escalation patterns in couple conflicts.",
          tone: "rose",
        },
        {
          icon: <UserX className="h-5 w-5" />,
          title: "Feeling Lonely in Love",
          desc: "Navigate emotional loneliness within a loving relationship.",
          tone: "sage",
        },
      ],
    },
  ];

  return (
    <Section
      title="Guided Series"
      desc="Therapist-led journeys grouped by what you and your partner are working through."
    >
      <div className="space-y-10">
        {groups.map((g) => (
          <div key={g.heading}>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-foreground/80">
              {g.heading}
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((i) => (
                <SeriesRow key={i.title} {...i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function SeriesRow({
  icon,
  title,
  desc,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tone: Tone;
}) {
  return (
    <a
      href="#"
      className="group relative flex items-center gap-4 overflow-hidden rounded-xl border border-border bg-card p-4 pl-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-card hover:ring-1 hover:ring-primary/30"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-4 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.6), rgba(255,210,232,0.28) 55%, transparent 80%)",
        }}
      />
      <span
        aria-hidden
        className={`absolute left-0 top-0 h-full w-0 ${toneStripe[tone]} transition-all duration-300 group-hover:w-1.5`}
      />
      <div
        className={`relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${toneStyles[tone]}`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold text-foreground">
          {title}
        </div>
        <div className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {desc}
        </div>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
    </a>
  );
}

/* ----------------------------- Relationship Tools ------------------------- */

const tools: { icon: React.ReactNode; title: string; desc: string; tone: Tone }[] = [
  {
    icon: <Heart className="h-5 w-5" />,
    title: "Relationship Check-In",
    desc: "Track emotional connection and satisfaction together.",
    tone: "rose",
  },
  {
    icon: <Star className="h-5 w-5" />,
    title: "Daily Appreciation Practice",
    desc: "Build the habit of noticing and naming the good.",
    tone: "sand",
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Connection Tracker",
    desc: "Monitor closeness, intimacy, and warmth over time.",
    tone: "sage",
  },
  {
    icon: <Compass className="h-5 w-5" />,
    title: "Shared Vision Builder",
    desc: "Align your future goals, values, and dreams.",
    tone: "lavender",
  },
];

function RelationshipTools() {
  return (
    <section className="relative -mx-5 mt-14 overflow-hidden px-5 pt-14 pb-2 sm:-mx-8 sm:mt-20 sm:px-8 sm:pt-14 sm:pb-4">
      {/* Soft full-width background blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/4 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-rose-soft blur-3xl opacity-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-[24rem] w-[24rem] rounded-full bg-sage-soft blur-3xl opacity-30"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-1 sm:mb-10">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">
            Start Your Journey Together
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Four therapist-designed rituals to deepen your connection, one day at a time.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map((t) => (
            <div
              key={t.title}
              className={`group relative isolate overflow-hidden rounded-[28px] border border-border bg-gradient-to-br ${toneGradients[t.tone]} p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card sm:p-7`}
            >
              <span
                aria-hidden
                className={`pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full ${toneBlob[t.tone]} blur-3xl`}
              />
              <div className="flex items-start justify-between">
                <div className="relative">
                  <span
                    aria-hidden
                    className={`absolute inset-0 -m-1 rounded-2xl ${toneStripe[t.tone]} opacity-20 blur-md`}
                  />
                  <div
                    className={`relative inline-flex h-12 w-12 items-center justify-center rounded-2xl shadow-soft ${toneIconCard[t.tone]}`}
                  >
                    {t.icon}
                  </div>
                </div>
                <button className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-1.5 text-xs font-semibold text-background transition-transform group-hover:scale-105">
                  Start <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
              <h4 className="mt-6 font-display text-xl text-foreground">
                {t.title}
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {t.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Resource Library --------------------------- */

const resources = [
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Articles",
    tone: "sand",
  },
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: "Therapist Tips",
    tone: "sky",
  },
  {
    icon: <HeartHandshake className="h-5 w-5" />,
    title: "Real Couple Stories",
    tone: "lavender",
  },
  {
    icon: <Brain className="h-5 w-5" />,
    title: "Relationship Myths",
    tone: "sage",
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
    <Section
      title="Read and Reflect"
      desc="Curated articles, stories, and insights to grow closer together."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {resources.map((r) => (
          <a
            key={r.title}
            href="#"
            className={`group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${tones[r.tone]} p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card`}
          >
            <div className="flex items-start justify-between">
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl shadow-soft ${iconTones[r.tone]}`}
              >
                {r.icon}
              </div>
            </div>
            <h4 className="mt-5 font-display text-2xl text-foreground">
              {r.title}
            </h4>
            <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground">
              Explore{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}

/* --------------------------------- Footer --------------------------------- */

function Footer() {
  return null;
}

/* ------------------------------ Section helper ---------------------------- */

function Section({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14 sm:mt-20">
      <div className="mb-6 flex flex-col gap-1">
        <h2 className="font-display text-2xl text-foreground sm:text-3xl">
          {title}
        </h2>
        {desc && (
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{desc}</p>
        )}
      </div>
      {children}
    </section>
  );
}
