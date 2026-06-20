import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import {
  Heart, HandHeart, RefreshCcw, ShieldCheck, MessageCircle, Compass, Scale, Baby,
  Users, Crosshair, Mail, PenLine, UserMinus, FlameIcon, UserX,
  Star, TrendingUp, BookOpen, Lightbulb, HeartHandshake, Brain,
  ArrowLeft, ArrowRight, ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/couple_module" });
  },
});
