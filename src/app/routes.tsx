// @ts-nocheck
import React, { Suspense } from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { SelfCareResources } from "./components/SelfCareResources";
import { CoupleTherapyPage } from "./pages/CoupleTherapyPage";
import { StaticContentViewer } from "../components/StaticContentViewer";
import { AuthGuard } from "../components/AuthGuard";
import { useTranslation } from "react-i18next";

// Static Imports
import ALetterToSelf from "../features/a_letter_to_self";
import Affirmations from "../features/affirmations";
import DiffusionTechnique from "../features/diffusion_technique";
import KnowYourValues from "../features/know_your_values";
import GratitudeTracker from "../features/gratitude_tracker";
import CareTracker from "../features/care_tracker";
import PersonalMissionStatement from "../features/personal_mission_statement";
import Resources from "../features/resources";
import GuidedSeries from "./pages/GuidedSeries";
import GuidedActivity from "./pages/GuidedActivity";
import RelationshipPatternsUnpacked from "../features/relationship_patterns_unpacked";
import RedrawYourCircle from "../features/redraw_your_circle";
import WhatDoINeed from "../features/what_do_i_need";
import TheUnsentLetter from "../features/the_unsent_letter";
import RepairAndReconnect from "../features/repair_and_reconnect";
import APauseForAppreciation from "../features/a_pause_for_appreciation";
import { IframeWrapper } from "../components/shared/IframeWrapper";

function ProtectedLayout() {
  const { t } = useTranslation();
  return (
    <AuthGuard>
      <Outlet />
    </AuthGuard>
  );
}

import { TopLoader } from "../components/TopLoader";

const LoadingFallback = () => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-[2px]">
      <TopLoader />
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" aria-hidden="true"></div>
        <p className="text-sm font-medium text-slate-500 animate-pulse">
          {(typeof t !== "undefined" ? t : (k) => k)("loading")}
        </p>
      </div>
    </div>
  );
};

const withLoading = (element: React.ReactNode) => <Suspense fallback={<LoadingFallback />}>{element}</Suspense>;

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <CoupleTherapyPage /> },
      { path: "topics/:topicId", element: <SelfCareResources /> },
      { path: "guided-series/:concern", element: <GuidedSeries /> },
      { path: "guided-series/:concern/:activityName", element: <GuidedActivity /> },
      { path: "relationship-guidance/:activityName", element: <GuidedActivity /> },
      { path: "concerns/:concern/:type", element: <StaticContentViewer /> },

      {
        element: <ProtectedLayout />,
        children: [
          { path: "tools/a-letter-to-self/*", element: <div className="couple-module-container feature-a-letter-to-self min-h-screen bg-[#F6F8FB]"><ALetterToSelf /></div> },
          { path: "tools/affirmations/*", element: <div className="couple-module-container feature-affirmations min-h-screen bg-[#F6F8FB]"><Affirmations /></div> },
          { path: "exercises/diffusion-technique/*", element: <div className="couple-module-container feature-diffusion-technique min-h-screen bg-[#F6F8FB]"><DiffusionTechnique /></div> },
          { path: "tools/know-your-values/*", element: <div className="couple-module-container feature-know-your-values min-h-screen bg-[#F6F8FB]"><KnowYourValues /></div> },
          { path: "trackers/gratitude-tracker/*", element: <div className="couple-module-container feature-gratitude-tracker min-h-screen bg-[#F6F8FB]"><GratitudeTracker /></div> },
          { path: "trackers/relationship-connection-tracker/*", element: <div className="couple-module-container feature-care-tracker min-h-screen bg-[#F6F8FB]"><CareTracker /></div> },
          { path: "tools/shared-relationship-vision/*", element: <div className="couple-module-container feature-personal-mission-statement min-h-screen bg-[#F6F8FB]"><PersonalMissionStatement /></div> },
          { path: "resources/:concern/:type/*", element: <div className="couple-module-container feature-resources min-h-screen bg-[#F6F8FB]"><Resources /></div> },
          { path: "tools/relationship-patterns-unpacked/*", element: <div className="couple-module-container feature-relationship-patterns-unpacked min-h-screen bg-[#F6F8FB]"><RelationshipPatternsUnpacked /></div> },
          { path: "tools/redraw-your-circle/*", element: <div className="couple-module-container feature-redraw-your-circle min-h-screen bg-[#F6F8FB]"><RedrawYourCircle /></div> },
          { path: "tools/what-do-i-need/*", element: <div className="couple-module-container feature-what-do-i-need min-h-screen bg-[#F6F8FB]"><WhatDoINeed /></div> },
          { path: "tools/the-unsent-letter/*", element: <div className="couple-module-container feature-the-unsent-letter min-h-screen bg-[#F6F8FB]"><TheUnsentLetter /></div> },
          { path: "tools/repair-and-reconnect/*", element: <div className="couple-module-container feature-repair-and-reconnect min-h-screen bg-[#F6F8FB]"><RepairAndReconnect /></div> },
          { path: "trackers/a-pause-for-appreciation/*", element: <div className="couple-module-container feature-a-pause-for-appreciation min-h-screen bg-[#F6F8FB]"><APauseForAppreciation /></div> },
          { path: "trackers/vibe-tracker/*", element: <div className="couple-module-container feature-vibe-tracker min-h-screen bg-[#F6F8FB]"><IframeWrapper src="https://platform.mantracare.com/therapy/trackers/vibe-tracker" title="Vibe Tracker" /></div> }
        ]
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ]
  }
], { basename: "/couple_module" });
