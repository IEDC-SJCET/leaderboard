"use client"
import { Leaderboard } from "@/components/leaderboard";
import { StagePositions } from "@/components/stage-positions";
import { useQuery } from "@tanstack/react-query";
import { getTeams } from "@/lib/db";

export default function Home() {
  const {data} = useQuery({ queryKey: ["teams"], queryFn: () => getTeams(), refetchInterval: 1500 })
  return (
    <div>
      {
        data && 
        <StagePositions positions={data.sort((a, b) => a.score - b.score)}/>
      }
      <Leaderboard teams={data ?? []} title="Smart India Hackathon"/>
    </div>
  );
}