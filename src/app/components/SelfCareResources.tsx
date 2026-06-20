// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { handlePlatformExit } from "../../lib/navigation";
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
  ChevronRight,
  Sparkles,
  Users,
  Target,
  Scale,
  Baby,
  RefreshCcw,
  HandHeart,
  Mail,
  PenLine,
  UserMinus,
  Flame as FlameIcon,
  UserX,
  Crosshair,
} from "lucide-react";

type Tone = "rose" | "sage" | "lavender" | "sand" | "sky";

const toneStyles: Record<Tone, string> = {
  rose: "bg-[#FFF0FA] text-[#A2347A]",
  sage: "bg-[#EBF7F2] text-[#2E7D5C]",
  lavender: "bg-[#F3E8FF] text-[#7C3AED]",
  sand: "bg-[#FEF3C7] text-[#D97706]",
  sky: "bg-[#E0F2FE] text-[#0284C7]",
};

const toneGradients: Record<Tone, string> = {
  rose: "from-[#FFF0FA] to-[#FFFFFF]",
  sage: "from-[#EBF7F2] to-[#FFFFFF]",
  lavender: "from-[#F3E8FF] to-[#FFFFFF]",
  sand: "from-[#FEF3C7] to-[#FFFFFF]",
  sky: "from-[#E0F2FE] to-[#FFFFFF]",
};

const toneIconCard: Record<Tone, string> = {
  rose: "bg-white text-[#A2347A]",
  sage: "bg-white text-[#2E7D5C]",
  lavender: "bg-white text-[#7C3AED]",
  sand: "bg-white text-[#D97706]",
  sky: "bg-white text-[#0284C7]",
};

const toneBlob: Record<Tone, string> = {
  rose: "bg-[#A2347A]/15",
  sage: "bg-[#2E7D5C]/15",
  lavender: "bg-[#7C3AED]/15",
  sand: "bg-[#D97706]/15",
  sky: "bg-[#0284C7]/15",
};

const toneStripe: Record<Tone, string> = {
  rose: "bg-[#A2347A]",
  sage: "bg-[#2E7D5C]",
  lavender: "bg-[#7C3AED]",
  sand: "bg-[#D97706]",
  sky: "bg-[#0284C7]",
};

const toneRing: Record<Tone, string> = {
  rose: "ring-[#A2347A]/20",
  sage: "ring-[#2E7D5C]/20",
  lavender: "ring-[#7C3AED]/20",
  sand: "ring-[#D97706]/20",
  sky: "ring-[#0284C7]/20",
};

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

const prefetchTool = (id: string) => {
  const prefetchMap: Record<string, () => Promise<any>> = {
    "a-letter-to-self": () => import("../../features/a_letter_to_self"),
    "affirmations": () => import("../../features/affirmations"),
    "know-your-values": () => import("../../features/know_your_values"),
    "gratitude-tracker": () => import("../../features/gratitude_tracker"),
    "care-tracker": () => import("../../features/care_tracker"),
    "personal-mission-statement": () => import("../../features/personal_mission_statement"),
  };
  if (prefetchMap[id]) prefetchMap[id]();
};

function CardLink({
  href,
  children,
  className,
  onMouseEnter,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onMouseEnter?: () => void;
}) {
  const isExternal = href.startsWith("http");
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onMouseEnter={onMouseEnter}
      >
        {children}
      </a>
    );
  }
  const cleanHref = href.startsWith("/couple_module")
    ? href.replace("/couple_module", "")
    : href;
  return (
    <Link to={cleanHref} className={className} onMouseEnter={onMouseEnter}>
      {children}
    </Link>
  );
}

export function SelfCareResources() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const scrollY = useParallaxScroll();

  useEffect(() => {
    const handlePopState = () => {
      handlePlatformExit();
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleMouseEnter = (href: string) => {
    if (!href.startsWith("http")) {
      const slug = href.split("/").pop();
      if (slug) prefetchTool(slug);
    }
  };

  return (
    <div
      className="group/page min-h-screen relative overflow-hidden font-sans"
      style={{
        background:
          "linear-gradient(160deg, #A2347A 0%, #D9468B 35%, #F06292 65%, #F48FB1 100%)",
      }}
    >
      {/* Top lightness fade */}
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

      {/* Animated floating orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out group-has-[a:hover]/page:opacity-30 group-has-[button:hover]/page:opacity-30"
      >
        <div
          className="absolute -left-20 top-[15%] h-80 w-80 rounded-full bg-rose-400/25 blur-[80px] animate-float-slow will-change-transform"
          style={{ transform: `translate3d(${scrollY * 0.04}px, ${scrollY * -0.18}px, 0)` }}
        />
        <div
          className="absolute right-[-5%] top-[40%] h-96 w-96 rounded-full bg-purple-300/20 blur-[90px] animate-float-medium will-change-transform"
          style={{ transform: `translate3d(${scrollY * -0.05}px, ${scrollY * -0.1}px, 0)` }}
        />
        <div
          className="absolute bottom-[10%] left-[10%] h-72 w-72 rounded-full bg-sky-300/20 blur-[70px] animate-float-slow will-change-transform"
          style={{ transform: `translate3d(${scrollY * 0.06}px, ${scrollY * -0.25}px, 0)` }}
        />
        <div
          className="absolute bottom-[25%] right-[5%] h-64 w-64 rounded-full bg-emerald-300/22 blur-[75px] animate-float-medium will-change-transform"
          style={{ transform: `translate3d(${scrollY * -0.03}px, ${scrollY * -0.15}px, 0)` }}
        />
      </div>

      {/* Noise overlay */}
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
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 pt-6 sm:px-8 sm:pt-8">
          <button
            onClick={handlePlatformExit}
            className="group inline-flex items-center gap-2 rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-md px-4 py-1.5 text-sm font-semibold text-slate-800 border border-white/20 transition-all shadow-sm"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back
          </button>
        </header>

        <main className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
          {/* Relationship Tools section */}
          <RelationshipTools onHover={handleMouseEnter} />

          {/* Emotional Connection and Trust section */}
          <EmotionalConnection onHover={handleMouseEnter} />

          {/* Communication and Partnership Alignment section */}
          <CommunicationAlignment onHover={handleMouseEnter} />

          {/* Guided Series section */}
          <GuidedSeries onHover={handleMouseEnter} />

          {/* Resource Library section */}
          <ResourceLibrary onHover={handleMouseEnter} />
        </main>
      </div>
    </div>
  );
}

/* ------------------------- Components ------------------------- */

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
        <h2 className="font-display text-2xl font-semibold text-slate-900 sm:text-3xl">
          {title}
        </h2>
        {desc && (
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-700">{desc}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function RelationshipTools({ onHover }: { onHover: (href: string) => void }) {
  const toolsList: { icon: React.ReactNode; title: string; desc: string; tone: Tone; href: string }[] = [
    {
      icon: <Heart className="h-5 w-5" />,
      title: "Relationship Check-In",
      desc: "Track emotional connection and satisfaction together.",
      tone: "rose",
      href: "/guided-series/relationship",
    },
    {
      icon: <Star className="h-5 w-5" />,
      title: "Daily Appreciation Practice",
      desc: "Build the habit of noticing and naming the good.",
      tone: "sand",
      href: "/trackers/a-pause-for-appreciation",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Connection Tracker",
      desc: "Monitor closeness, intimacy, and warmth over time.",
      tone: "sage",
      href: "/trackers/care-tracker",
    },
    {
      icon: <Compass className="h-5 w-5" />,
      title: "Shared Vision Builder",
      desc: "Align your future goals, values, and dreams.",
      tone: "lavender",
      href: "/tools/personal-mission-statement",
    },
  ];

  return (
    <section className="relative -mx-5 mt-4 overflow-hidden px-5 pt-4 pb-2 sm:-mx-8 sm:mt-6 sm:px-8 sm:pt-6 sm:pb-4">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/4 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-pink-100/30 blur-3xl opacity-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-[24rem] w-[24rem] rounded-full bg-teal-100/20 blur-3xl opacity-30"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-1 sm:mb-10">
          <h2 className="font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
            Relationship Tools
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-800">
            Four therapist-designed rituals to deepen your connection, one day at a time.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {toolsList.map((t) => (
            <CardLink
              key={t.title}
              href={t.href}
              onMouseEnter={() => onHover(t.href)}
              className={`group relative isolate overflow-hidden rounded-[28px] border border-slate-200/60 bg-gradient-to-br ${toneGradients[t.tone]} p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 block`}
            >
              <span
                aria-hidden
                className={`pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full ${toneBlob[t.tone]} blur-3xl`}
              />
              <div className="flex items-start justify-between">
                <div className="relative">
                  <span
                    aria-hidden
                    className={`absolute inset-0 -m-1 rounded-2xl ${toneStripe[t.tone]} opacity-10 blur-md`}
                  />
                  <div
                    className={`relative inline-flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm ${toneIconCard[t.tone]}`}
                  >
                    {t.icon}
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-950 px-3.5 py-1.5 text-xs font-semibold text-white transition-transform group-hover:scale-105">
                  Start <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
              <h4 className="mt-6 font-display text-xl font-semibold text-slate-900">
                {t.title}
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">
                {t.desc}
              </p>
            </CardLink>
          ))}
        </div>
      </div>
    </section>
  );
}

function ActivityCard({
  icon,
  title,
  desc,
  tone,
  href,
  onHover,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tone: Tone;
  href: string;
  onHover: (href: string) => void;
}) {
  return (
    <CardLink
      href={href}
      onMouseEnter={() => onHover(href)}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
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
        <ArrowRight className="mt-2 h-5 w-5 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-slate-800" />
      </div>
      <h4 className="relative mt-6 font-display text-lg font-semibold text-slate-900">{title}</h4>
      <p className="relative mt-1 flex-1 text-sm leading-relaxed text-slate-700">
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
  href,
  onHover,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tone: Tone;
  href: string;
  onHover: (href: string) => void;
}) {
  return (
    <CardLink
      href={href}
      onMouseEnter={() => onHover(href)}
      className="group relative flex gap-4 overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-5 pl-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-5 -z-10 rounded-[1.75rem] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
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
        className={`mt-0.5 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-slate-100 ${toneStyles[tone]}`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-display text-lg font-semibold text-slate-900">{title}</h4>
          <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-800" />
        </div>
        <p className="mt-1 text-sm leading-relaxed text-slate-700">
          {desc}
        </p>
      </div>
    </CardLink>
  );
}

function EmotionalConnection({ onHover }: { onHover: (href: string) => void }) {
  const items = [
    {
      icon: <Heart className="h-5 w-5" />,
      title: "Emotional Check-In Ritual",
      desc: "A daily moment to share what you're feeling and what you need.",
      tone: "rose" as Tone,
      href: "https://app.mantracare.org/couple/emotional-connection-t1/",
    },
    {
      icon: <HandHeart className="h-5 w-5" />,
      title: "Forgiveness Corner and Apology Exchange",
      desc: "Offer and receive heartfelt apologies in a safe, guided space.",
      tone: "lavender" as Tone,
      href: "https://app.mantracare.org/couple/forgiveness-t2/",
    },
    {
      icon: <RefreshCcw className="h-5 w-5" />,
      title: "Rupture and Repair Work",
      desc: "Move through hard moments together and come back closer.",
      tone: "sage" as Tone,
      href: "https://app.mantracare.org/couple/repair-t1/",
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Trust Rebuilding Repair Plan",
      desc: "A step-by-step plan to restore safety and rebuild trust.",
      tone: "sand" as Tone,
      href: "https://app.mantracare.org/couple/trust-t4/",
    },
  ];

  return (
    <Section
      title="Emotional Connection and Trust"
      desc="Strengthen emotional connection, rebuild trust, and learn healthy relationship repair."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((i) => (
          <ActivityCard key={i.title} {...i} onHover={onHover} />
        ))}
      </div>
    </Section>
  );
}

function CommunicationAlignment({ onHover }: { onHover: (href: string) => void }) {
  const items = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: "Conflict Reframing Exercise",
      desc: "Turn recurring arguments into shared understanding.",
      tone: "sage" as Tone,
      href: "https://app.mantracare.org/couple/conflict-t1/",
    },
    {
      icon: <Compass className="h-5 w-5" />,
      title: "Goals and Dreams Alignment",
      desc: "Map the future you both want and the steps to get there.",
      tone: "lavender" as Tone,
      href: "https://app.mantracare.org/couple/pre-marital-t1/",
    },
    {
      icon: <Scale className="h-5 w-5" />,
      title: "Money Values and Goal Alignment",
      desc: "Align on spending, saving, and financial priorities together.",
      tone: "sand" as Tone,
      href: "https://app.mantracare.org/couple/money-t1/",
    },
    {
      icon: <Baby className="h-5 w-5" />,
      title: "Co-Parenting Alignment Matrix",
      desc: "Build a united approach to parenting decisions and routines.",
      tone: "rose" as Tone,
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
          <AlignmentCard key={i.title} {...i} onHover={onHover} />
        ))}
      </div>
    </Section>
  );
}

function GuidedSeries({ onHover }: { onHover: (href: string) => void }) {
  const groups = [
    {
      heading: "Know Your Patterns",
      items: [
        {
          icon: <Users className="h-5 w-5" />,
          title: "Relationship Patterns Unpacked",
          desc: "Explore recurring conflict cycles and emotional reactions.",
          tone: "rose" as Tone,
          href: "/tools/relationship-patterns-unpacked",
        },
        {
          icon: <Crosshair className="h-5 w-5" />,
          title: "Relationship Boundaries",
          desc: "Explore emotional boundaries and expectations in your relationship.",
          tone: "lavender" as Tone,
          href: "/tools/redraw-your-circle",
        },
        {
          icon: <Heart className="h-5 w-5" />,
          title: "Emotional Needs Mapping",
          desc: "Understand what helps you feel emotionally safe.",
          tone: "sand" as Tone,
          href: "/tools/what-do-i-need",
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
          tone: "sky" as Tone,
          href: "/tools/the-unsent-letter",
        },
        {
          icon: <PenLine className="h-5 w-5" />,
          title: "A Letter to Self",
          desc: "Reflect on your patterns and grow toward healthier responses.",
          tone: "lavender" as Tone,
          href: "/tools/a-letter-to-self",
        },
        {
          icon: <HandHeart className="h-5 w-5" />,
          title: "Repair and Reconnect",
          desc: "Rebuild trust and emotional safety after conflict.",
          tone: "rose" as Tone,
          href: "/tools/repair-and-reconnect",
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
          tone: "sand" as Tone,
          href: "/relationship-guidance/growing-apart",
        },
        {
          icon: <FlameIcon className="h-5 w-5" />,
          title: "Why Small Fights Become Big",
          desc: "Understand escalation patterns in couple conflicts.",
          tone: "rose" as Tone,
          href: "/relationship-guidance/small-fights",
        },
        {
          icon: <UserX className="h-5 w-5" />,
          title: "Feeling Lonely in Love",
          desc: "Navigate emotional loneliness within a loving relationship.",
          tone: "sage" as Tone,
          href: "/relationship-guidance/lonely-love",
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
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-800">
              {g.heading}
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((i) => (
                <SeriesRow key={i.title} {...i} onHover={onHover} />
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
  href,
  onHover,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tone: Tone;
  href: string;
  onHover: (href: string) => void;
}) {
  return (
    <CardLink
      href={href}
      onMouseEnter={() => onHover(href)}
      className="group relative flex items-center gap-4 overflow-hidden rounded-xl border border-slate-200/60 bg-white p-4 pl-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-4 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
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
        <div className="truncate text-sm font-bold text-slate-800">
          {title}
        </div>
        <div className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-slate-500">
          {desc}
        </div>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-800" />
    </CardLink>
  );
}

function ResourceLibrary({ onHover }: { onHover: (href: string) => void }) {
  const resourcesList = [
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Articles",
      tone: "sand" as Tone,
      href: "/resources/relationship/articles",
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: "Therapist Tips",
      tone: "sky" as Tone,
      href: "/resources/relationship/tips",
    },
    {
      icon: <HeartHandshake className="h-5 w-5" />,
      title: "Real Couple Stories",
      tone: "lavender" as Tone,
      href: "/resources/relationship/stories",
    },
    {
      icon: <Brain className="h-5 w-5" />,
      title: "Relationship Myths",
      tone: "sage" as Tone,
      href: "/resources/relationship/myths",
    },
  ];

  return (
    <Section
      title="Read and Reflect"
      desc="Curated articles, stories, and insights to grow closer together."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {resourcesList.map((r) => (
          <CardLink
            key={r.title}
            href={r.href}
            onMouseEnter={() => onHover(r.href)}
            className={`group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-gradient-to-br ${toneGradients[r.tone]} p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5`}
          >
            <div className="flex items-start justify-between">
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm ${toneIconCard[r.tone]}`}
              >
                {r.icon}
              </div>
            </div>
            <h4 className="mt-5 font-display text-2xl font-semibold text-slate-900">
              {r.title}
            </h4>
            <div className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-slate-800">
              Explore{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </CardLink>
        ))}
      </div>
    </Section>
  );
}
