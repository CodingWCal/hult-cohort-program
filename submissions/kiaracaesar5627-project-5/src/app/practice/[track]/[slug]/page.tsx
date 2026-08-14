import { notFound } from "next/navigation";
import {
  getRound,
  JOB_TRACKS,
  nextRoundInTrack,
  roundIndexInTrack,
  roundPath,
} from "@/lib/lessons";
import { InterviewRoundClient } from "@/components/LessonClient";
import { SessionHeartbeat } from "@/components/SessionHeartbeat";

type Props = { params: Promise<{ track: string; slug: string }> };

export function generateStaticParams() {
  return JOB_TRACKS.flatMap((t) =>
    t.scenarios.map((s) => ({ track: t.slug, slug: s.slug })),
  );
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
