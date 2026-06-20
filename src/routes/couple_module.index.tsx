import { createFileRoute } from "@tanstack/react-router";
import { CoupleTherapyPage } from "../app/pages/CoupleTherapyPage";

export const Route = createFileRoute("/couple_module/")({
  component: CoupleTherapyPage,
});
