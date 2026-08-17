import { notFound } from "next/navigation";
import {
  getRound,
  nextRoundInTrack,
  roundIndexInTrack,
  roundPath,
} from "@/lib/lessons";
import { InterviewRoundClient } from "@/components/LessonClient";
import { SessionHeartbeat } from "@/components/SessionHeartbeat";

type Props = { params: Promise<{ track: string; slug: string }> };

/** On-demand: 320 tracks × 30 questions would SSG ~10k pages and blow the build. */
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

export default async function ScenarioPage({ params }: Props) {
  const { track, slug } = await params;
  const round = getRound(track, slug);
  if (!round) notFound();

  const { index, total } = roundIndexInTrack(track, slug);
  const next = nextRoundInTrack(track, slug);

  return (
    <>
      <SessionHeartbeat />
      <InterviewRoundClient
        slug={round.slug}
        trackSlug={round.trackSlug}
        role={round.role}
        setting={round.setting}
        stage={round.stage}
        title={round.title}
        minutes={round.minutes}
        scenario={round.scenario}
        interviewer={round.interviewer}
        playbook={round.playbook}
        debrief={round.debrief}
        canTrack={true}
        roundIndex={index}
        roundTotal={total}
        nextHref={next ? roundPath(next) : null}
      />
    </>
  );
}
