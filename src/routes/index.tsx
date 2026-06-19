import { createFileRoute } from "@tanstack/react-router";
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

function CoupleTherapyPage() {
  return (
    <div className="min-h-screen bg-background">
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
        <EmotionalConnection />
        <CommunicationAlignment />
        <GuidedSeries />
        <RelationshipTools />
        <ResourceLibrary />
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

/* ------------------------- Activity Card (shared) ------------------------- */

type Tone = "rose" | "sage" | "lavender" | "sand" | "sky";
const toneStyles: Record<Tone, string> = {
  rose: "bg-rose-soft text-rose",
  sage: "bg-sage-soft text-sage",
  lavender: "bg-lavender-soft text-lavender",
  sand: "bg-sand-soft text-sand",
  sky: "bg-sky-soft text-sky",
};

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
      className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
    >
      <div className="flex items-start justify-between">
        <div
          className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${toneStyles[tone]}`}
        >
          {icon}
        </div>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <h4 className="mt-5 font-display text-lg text-foreground">{title}</h4>
      <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">
        {desc}
      </p>
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
      title: "Forgiveness Corner & Apology Exchange",
      desc: "Offer and receive heartfelt apologies in a safe, guided space.",
      tone: "lavender",
    },
    {
      icon: <RefreshCcw className="h-5 w-5" />,
      title: "Rupture & Repair Work",
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
      title="Emotional Connection & Trust"
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

/* -------------------- Section 2: Communication & Alignment -------------------- */

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
      title: "Goals & Dreams Alignment",
      desc: "Map the future you both want and the steps to get there.",
      tone: "lavender",
    },
    {
      icon: <Scale className="h-5 w-5" />,
      title: "Money Values & Goal Alignment",
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
      title="Communication & Partnership Alignment"
      desc="Communicate with clarity and build a shared vision for life together."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((i) => (
          <ActivityCard key={i.title} {...i} />
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
          icon: <Users className="h-4 w-4" />,
          title: "Relationship Patterns Unpacked",
          desc: "Explore recurring conflict cycles and emotional reactions.",
          tone: "rose",
        },
        {
          icon: <Crosshair className="h-4 w-4" />,
          title: "Relationship Boundaries",
          desc: "Explore emotional boundaries and expectations in your relationship.",
          tone: "lavender",
        },
        {
          icon: <Heart className="h-4 w-4" />,
          title: "Emotional Needs Mapping",
          desc: "Understand what helps you feel emotionally safe.",
          tone: "sand",
        },
      ],
    },
    {
      heading: "Express & Heal",
      items: [
        {
          icon: <Mail className="h-4 w-4" />,
          title: "The Unsent Letter",
          desc: "Express unresolved feelings in a safe, private space.",
          tone: "sky",
        },
        {
          icon: <PenLine className="h-4 w-4" />,
          title: "A Letter to Self",
          desc: "Reflect on your patterns and grow toward healthier responses.",
          tone: "lavender",
        },
        {
          icon: <HandHeart className="h-4 w-4" />,
          title: "Repair & Reconnect",
          desc: "Rebuild trust and emotional safety after conflict.",
          tone: "rose",
        },
      ],
    },
    {
      heading: "Common Relationship Issues",
      items: [
        {
          icon: <UserMinus className="h-4 w-4" />,
          title: "Growing Apart",
          desc: "Explore signs and solutions when partners drift apart.",
          tone: "sand",
        },
        {
          icon: <FlameIcon className="h-4 w-4" />,
          title: "Why Small Fights Become Big",
          desc: "Understand escalation patterns in couple conflicts.",
          tone: "rose",
        },
        {
          icon: <UserX className="h-4 w-4" />,
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
      className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
    >
      <div
        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${toneStyles[tone]}`}
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
    <Section
      title="Daily practices, designed together"
      desc="Small rituals that compound into a stronger partnership."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {tools.map((t) => (
          <div
            key={t.title}
            className="group rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card sm:p-6"
          >
            <div className="flex items-start justify-between">
              <div
                className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${toneStyles[t.tone]}`}
              >
                {t.icon}
              </div>
              <button className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <h4 className="mt-5 font-display text-xl text-foreground">
              {t.title}
            </h4>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {t.desc}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ----------------------------- Resource Library --------------------------- */

const resources = [
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Articles",
    count: "42 articles",
    time: "5 to 8 min read",
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
    time: "8 to 12 min read",
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
    <Section
      title="Read, listen, and reflect"
      desc="Hand-picked by therapists and updated every week."
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
              {r.trending && (
                <span className="inline-flex items-center gap-1 rounded-full bg-foreground/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-background">
                  <Flame className="h-3 w-3" /> Trending
                </span>
              )}
            </div>
            <h4 className="mt-5 font-display text-2xl text-foreground">
              {r.title}
            </h4>
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              <span>{r.count}</span>
              <span>·</span>
              <span>{r.time}</span>
            </div>
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
  return (
    <div className="mt-20 flex flex-col items-center gap-2 text-center text-xs text-muted-foreground">
      <div className="inline-flex items-center gap-2">
        <Heart className="h-3.5 w-3.5 text-rose" />
        Made with care for couples growing together
      </div>
      <div>
        This is wellness content, not a substitute for professional therapy.
      </div>
    </div>
  );
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
