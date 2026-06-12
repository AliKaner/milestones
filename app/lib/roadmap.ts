import type { FunctionReturnType } from "convex/server";
import type { api } from "@/convex/_generated/api";

/** roadmap.getTree query'sinin döndürdüğü iç içe yapı için tipler. */
export type RoadmapTree = FunctionReturnType<typeof api.roadmap.getTree>;
export type TrackData = RoadmapTree[number];
export type LevelData = TrackData["levels"][number];
export type StepData = LevelData["steps"][number];
export type TaskData = StepData["tasks"][number];

export type SubmissionStatus = "pending" | "approved" | "rejected";
