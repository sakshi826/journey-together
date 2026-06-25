import React, { useEffect, useRef, useState, createContext, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  HandHeart,
  HeartHandshake,
  ArrowLeft,
  ArrowRight,
  RefreshCcw,
  ShieldCheck,
  MessageCircle,
  Compass,
  Scale,
  Baby,
  Users,
  Crosshair,
  Mail,
  PenLine,
  UserMinus,
  Flame as FlameIcon,
  UserX,
  Star,
  TrendingUp,
  BookOpen,
  Lightbulb,
  Brain,
  ChevronRight,
  X,
  
  Loader2,
} from "lucide-react";

/* --------------------- Activity Frame (iframe modal) --------------------- */

type FrameTarget = { title: string; url: string } | null;
const ActivityFrameCtx = createContext<{ open: (t: NonNullable<FrameTarget>) => void }>({
  open: () => {},
});
export const useActivityFrame = () => useContext(ActivityFrameCtx);

function ActivityFrameProvider({ children }: { children: React.ReactNode }) {
  const [target, setTarget] = useState<FrameTarget>(null);
  const [loading, setLoading] = useState(false);

  const open = useCallback((t: NonNullable<FrameTarget>) => {
    setLoading(true);
    setTarget(t);
  }, []);
  const close = useCallback(() => setTarget(null), []);

  useEffect(() => {
    if (!target) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [target, close]);

  return (
    <ActivityFrameCtx.Provider value={{ open }}>
      {children}
      {target && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={target.title}
        >
          <button
            aria-label="Close"
            onClick={close}
            className="absolute inset-0 bg-gradient-to-br from-[#A2347A]/70 via-[#D9468B]/60 to-[#F48FB1]/60 backdrop-blur-md"
          />
          <div className="relative flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/40 bg-white shadow-2xl ring-1 ring-black/5">
            <div
              className="relative flex items-center gap-3 px-5 py-4 sm:px-7"
              style={{
                background:
                  "linear-gradient(135deg, #FFF1F7 0%, #FFE3EE 50%, #FFD3E4 100%)",
              }}
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/80 text-[#A2347A] ring-1 ring-[#A2347A]/15">
                <Heart className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#A2347A]/70">
                  Relationship Activity
                </p>
                <h3 className="truncate font-display text-base text-foreground sm:text-lg">
                  {target.title}
                </h3>
              </div>
              <button
                onClick={close}
                aria-label="Close activity"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-foreground ring-1 ring-black/5 transition hover:bg-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative flex-1 bg-[#FFF7FB]">
              <button
                type="button"
                aria-label="Back to relationship activities"
                title="Back to relationship activities"
                onClick={close}
                className="absolute left-4 top-4 z-20 h-12 w-12 rounded-xl bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A2347A] sm:left-5 sm:top-5"
              />
              {loading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-[#A2347A]">
                  <Loader2 className="h-7 w-7 animate-spin" />
                  <p className="text-sm font-medium">Loading activity…</p>
                </div>
              )}
              <iframe
                key={target.url}
                src={target.url}
                title={target.title}
                onLoad={() => setLoading(false)}
                className="h-full w-full border-0"
                allow="clipboard-write; fullscreen"
              />
            </div>
          </div>
        </div>
      )}
    </ActivityFrameCtx.Provider>
  );
}

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

export function CoupleTherapyPage() {
  const scrollY = useParallaxScroll();

  return (
    <ActivityFrameProvider>
    <div
      className="group/page min-h-screen relative overflow-hidden font-sans"
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
      {/* Mid-section lightness band */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, transparent 28%, rgba(255,238,248,0.42) 42%, rgba(255,235,247,0.5) 58%, rgba(255,238,248,0.35) 72%, rgba(255,236,246,0.25) 82%, transparent 95%)",
        }}
      />
      {/* Bottom lightness */}
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

      {/* Animated floating orbs with gentle parallax */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out group-has-[a:hover]/page:opacity-30 group-has-[button:hover]/page:opacity-30"
      >
        <div
          className="absolute -left-20 top-[15%] h-80 w-80 rounded-full bg-rose/25 blur-[80px] animate-float-slow will-change-transform"
          style={{ transform: `translate3d(${scrollY * 0.04}px, ${scrollY * -0.18}px, 0)` }}
        />
        <div
          className="absolute right-[-5%] top-[40%] h-96 w-96 rounded-full bg-rose/20 blur-[90px] animate-float-medium will-change-transform"
          style={{ transform: `translate3d(${scrollY * -0.05}px, ${scrollY * -0.1}px, 0)` }}
        />
        <div
          className="absolute bottom-[10%] left-[10%] h-72 w-72 rounded-full bg-rose/20 blur-[70px] animate-float-slow will-change-transform"
          style={{ transform: `translate3d(${scrollY * 0.06}px, ${scrollY * -0.25}px, 0)` }}
        />
        <div
          className="absolute bottom-[25%] right-[5%] h-64 w-64 rounded-full bg-rose/22 blur-[75px] animate-float-medium will-change-transform"
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
          <RelationshipTools />
          <EmotionalConnection />
          <CommunicationAlignment />
          <GuidedSeries />
          <ResourceLibrary />
          <Footer />
        </main>
      </div>
    </div>
    </ActivityFrameProvider>
  );
}

/* --------------------------------- TopBar --------------------------------- */

function TopBar() {
  const handleBack = () => {
    if (typeof window !== "undefined") {
      if (window.history.length > 1) window.history.back();
      else window.location.href = "/";
    }
  };
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 pt-6 sm:px-8 sm:pt-8">
      <button
        type="button"
        onClick={handleBack}
        className="group inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back
      </button>
      <div className="flex items-center gap-2" />
    </header>
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

function CardLink({
  href,
  onClick,
  children,
  className,
}: {
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const isExternal = href.startsWith("http") || href.startsWith("https");
  if (isExternal) {
    return (
      <a href={href} onClick={onClick} className={`${className || ""} no-underline`}>
        {children}
      </a>
    );
  }
  const cleanHref = href.startsWith("/couple_module")
    ? href.replace("/couple_module", "")
    : href;
  return (
    <Link to={cleanHref} onClick={onClick} className={`${className || ""} no-underline`}>
      {children}
    </Link>
  );
}

function ActivityCard({
  icon,
  title,
  desc,
  tone,
  href = "#",
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tone: Tone;
  href?: string;
}) {
  const isMantra = /app\.mantracare\.org/.test(href);
  const { open } = useActivityFrame();
  const onClick = (e: React.MouseEvent) => {
    if (isMantra) {
      e.preventDefault();
      open({ title, url: href });
    }
  };
  return (
    <CardLink
      href={href}
      onClick={onClick}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card hover:ring-1 hover:ring-primary/30 cursor-pointer"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.7), rgba(255,210,232,0.35) 55%, transparent 80%)",
        }}
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
      <p className="relative mt-1 flex-1 text-sm leading-relaxed text-foreground">
        {desc}
      </p>
    </CardLink>
  );
}

function AlignmentCard({
  icon,
  title,
  desc,
  tone,
  href = "#",
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tone: Tone;
  href?: string;
}) {
  const isMantra = /app\.mantracare\.org/.test(href);
  const { open } = useActivityFrame();
  const onClick = (e: React.MouseEvent) => {
    if (isMantra) {
      e.preventDefault();
      open({ title, url: href });
    }
  };
  return (
    <CardLink
      href={href}
      onClick={onClick}
      className="group relative flex gap-4 overflow-hidden rounded-2xl bg-card p-5 pl-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card hover:ring-1 hover:ring-primary/30 cursor-pointer"
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
        <p className="mt-1 text-sm leading-relaxed text-foreground">
          {desc}
        </p>
      </div>
    </CardLink>
  );
}

/* ---------------------- Section 1: Emotional Connection ---------------------- */
function EmotionalConnection() {
  const items: { icon: React.ReactNode; title: string; desc: string; tone: Tone; href?: string }[] = [
    {
      icon: <Heart className="h-5 w-5" />,
      title: "Emotional Check-In Ritual",
      desc: "A daily moment to share what you're feeling and what you need.",
      tone: "rose",
      href: "https://app.mantracare.org/couple/emotional-connection-t1/",
    },
    {
      icon: <HandHeart className="h-5 w-5" />,
      title: "Forgiveness Corner and Apology Exchange",
      desc: "Offer and receive heartfelt apologies in a safe, guided space.",
      tone: "lavender",
      href: "https://app.mantracare.org/couple/forgiveness-t2/",
    },
    {
      icon: <RefreshCcw className="h-5 w-5" />,
      title: "Rupture and Repair Work",
      desc: "Move through hard moments together and come back closer.",
      tone: "sage",
      href: "https://app.mantracare.org/couple/repair-t1/",
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Trust Rebuilding Repair Plan",
      desc: "A step-by-step plan to restore safety and rebuild trust.",
      tone: "sand",
      href: "https://app.mantracare.org/couple/trust-t4/",
    },
  ];
  return (
    <div
      className="relative -mx-5 rounded-[2rem] bg-white/30 px-5 py-10 backdrop-blur-[1px] sm:-mx-8 sm:px-8 sm:py-14"
      style={{ background: "rgba(255, 245, 252, 0.42)" }}
    >
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
    </div>
  );
}

/* -------------------- Section 2: Communication and Alignment -------------------- */

function CommunicationAlignment() {
  const items: { icon: React.ReactNode; title: string; desc: string; tone: Tone; href?: string }[] = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: "Conflict Reframing Exercise",
      desc: "Turn recurring arguments into shared understanding.",
      tone: "sage",
      href: "https://app.mantracare.org/couple/conflict-t1/",
    },
    {
      icon: <Compass className="h-5 w-5" />,
      title: "Goals and Dreams Alignment",
      desc: "Map the future you both want and the steps to get there.",
      tone: "lavender",
      href: "https://app.mantracare.org/couple/pre-marital-t1/",
    },
    {
      icon: <Scale className="h-5 w-5" />,
      title: "Money Values and Goal Alignment",
      desc: "Align on spending, saving, and financial priorities together.",
      tone: "sand",
      href: "https://app.mantracare.org/couple/money-t1/",
    },
    {
      icon: <Baby className="h-5 w-5" />,
      title: "Co-Parenting Alignment Matrix",
      desc: "Build a united approach to parenting decisions and routines.",
      tone: "rose",
      href: "https://app.mantracare.org/couple/parenting-together-t4/",
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
    items: { icon: React.ReactNode; title: string; desc: string; tone: Tone; href?: string }[];
  }[] = [
    {
      heading: "Know Your Patterns",
      items: [
        {
          icon: <Users className="h-5 w-5" />,
          title: "Relationship Patterns Unpacked",
          desc: "Explore recurring conflict cycles and emotional reactions.",
          tone: "rose",
          href: "/couple_module/tools/relationship-patterns-unpacked",
        },
        {
          icon: <Crosshair className="h-5 w-5" />,
          title: "Relationship Boundaries",
          desc: "Explore emotional boundaries and expectations in your relationship.",
          tone: "lavender",
          href: "/couple_module/tools/redraw-your-circle",
        },
        {
          icon: <Heart className="h-5 w-5" />,
          title: "Emotional Needs Mapping",
          desc: "Understand what helps you feel emotionally safe.",
          tone: "sand",
          href: "/couple_module/tools/what-do-i-need",
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
          href: "/couple_module/tools/the-unsent-letter",
        },
        {
          icon: <PenLine className="h-5 w-5" />,
          title: "A Letter to Self",
          desc: "Reflect on your patterns and grow toward healthier responses.",
          tone: "lavender",
          href: "/couple_module/tools/a-letter-to-self",
        },
        {
          icon: <HandHeart className="h-5 w-5" />,
          title: "Repair and Reconnect",
          desc: "Rebuild trust and emotional safety after conflict.",
          tone: "rose",
          href: "/couple_module/tools/repair-and-reconnect",
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
          href: "/couple_module/relationship-guidance/growing-apart",
        },
        {
          icon: <FlameIcon className="h-5 w-5" />,
          title: "Why Small Fights Become Big",
          desc: "Understand escalation patterns in couple conflicts.",
          tone: "rose",
          href: "/couple_module/relationship-guidance/small-fights",
        },
        {
          icon: <UserX className="h-5 w-5" />,
          title: "Feeling Lonely in Love",
          desc: "Navigate emotional loneliness within a loving relationship.",
          tone: "sage",
          href: "/couple_module/relationship-guidance/lonely-love",
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
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-rose-800" />
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-black whitespace-nowrap">
                {g.heading}
              </h3>
            </div>
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
  href = "#",
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tone: Tone;
  href?: string;
}) {
  return (
    <CardLink
      href={href}
      className="group relative flex items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_2px_10px_-2px_rgba(120,40,90,0.10)] ring-1 ring-black/[0.04] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-6px_rgba(120,40,90,0.18)]"
    >
      <div
        className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${toneStyles[tone]}`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[15px] font-semibold text-foreground">
          {title}
        </div>
        <div className="mt-1 line-clamp-2 text-[13px] leading-snug text-muted-foreground">
          {desc}
        </div>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/70 transition-transform group-hover:translate-x-0.5" />
    </CardLink>
  );
}

/* ----------------------------- Relationship Tools ------------------------- */

const tools: { icon: React.ReactNode; title: string; desc: string; tone: Tone; href?: string }[] = [
  {
    icon: <Heart className="h-5 w-5" />,
    title: "Relationship Values Check-In",
    desc: "Track emotional connection and satisfaction together.",
    tone: "rose",
    href: "/couple_module/tools/know-your-values",
  },
  {
    icon: <Star className="h-5 w-5" />,
    title: "Daily Appreciation Practice",
    desc: "Build the habit of noticing and naming the good.",
    tone: "sand",
    href: "/couple_module/trackers/gratitude-tracker",
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Relationship Connection Tracker",
    desc: "Monitor closeness, intimacy, and warmth over time.",
    tone: "sage",
    href: "/couple_module/trackers/relationship-connection-tracker",
  },
  {
    icon: <Compass className="h-5 w-5" />,
    title: "Shared Relationship Vision",
    desc: "Align your future goals, values, and dreams.",
    tone: "lavender",
    href: "/couple_module/tools/shared-relationship-vision",
  },
];

function RelationshipTools() {
  return (
    <section className="relative -mx-5 mt-4 overflow-hidden px-5 pt-4 pb-2 sm:-mx-8 sm:mt-6 sm:px-8 sm:pt-6 sm:pb-4">
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
            Relationship Tools
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-foreground">
            Four therapist-designed rituals to deepen your connection, one day at a time.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map((t) => (
            <CardLink
              key={t.title}
              href={t.href || "#"}
              className={`group relative isolate overflow-hidden rounded-[28px] bg-gradient-to-br ${toneGradients[t.tone]} p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card sm:p-7 block`}
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
                <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white transition-transform group-hover:scale-105">
                  Start <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
              <h4 className="mt-6 font-display text-xl text-foreground">
                {t.title}
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-foreground">
                {t.desc}
              </p>
            </CardLink>
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
    href: "/couple_module/resources/relationship/articles",
  },
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: "Therapist Tips",
    tone: "sky",
    href: "/couple_module/resources/relationship/tips",
  },
  {
    icon: <HeartHandshake className="h-5 w-5" />,
    title: "Real Couple Stories",
    tone: "lavender",
    href: "/couple_module/resources/relationship/stories",
  },
  {
    icon: <Brain className="h-5 w-5" />,
    title: "Relationship Myths",
    tone: "sage",
    href: "/couple_module/resources/relationship/myths",
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
          <CardLink
            key={r.title}
            href={r.href}
            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${tones[r.tone]} p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card`}
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
          </CardLink>
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
          <p className="mt-1 max-w-2xl text-sm text-foreground">{desc}</p>
        )}
      </div>
      {children}
    </section>
  );
}
