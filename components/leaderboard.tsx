"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { updateScore } from "@/lib/db";

type Player = {
  id: number;
  name: string;
  score: number;
};

type LeaderboardProps = {
  teams: Player[];
  title: string;
  admin?: boolean;
  incrementScore?: (team: string) => void;
  decrementScore?: (team: string) => void;
};

export function Leaderboard({
  teams,
  title,
  admin = false,
}: // incrementScore,
// decrementScore,
LeaderboardProps) {
  const sortedPlayers = [...teams].sort((a, b) => b.score - a.score);

  const handleScoreChange = async (player: Player, newScore: number) => {
    try {
      // Ensure newScore is a valid number
      if (isNaN(newScore)) return;
      // Update the score in the database
      await updateScore(player.name, newScore);
    } catch (error) {
      console.error("Failed to update score:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rank</TableHead>
            <TableHead>Name</TableHead>
            {admin && (
              <>
                <TableHead className="text-right">Score</TableHead>
                <TableHead>Actions</TableHead>
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPlayers.map((player, index) => (
            <TableRow
              key={player.id}
              className="hover:bg-muted/50 transition-colors"
            >
              <TableCell className="font-medium">
                {index === 0 && <Badge className="bg-yellow-500">1st</Badge>}
                {index === 1 && <Badge className="bg-gray-400">2nd</Badge>}
                {index === 2 && <Badge className="bg-amber-600">3rd</Badge>}
                {index > 2 && `${index + 1}th`}
              </TableCell>
              <TableCell>{player.name}</TableCell>
              {/* {admin && (
                <>
                  <TableCell className="text-right">{player.score}</TableCell>
                  <TableCell className="flex flex-row gap-2 w-fit">
                    <Input
                      type="number"
                      defaultValue={player.score}
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value, 10);
                        handleScoreChange(player, newValue);
                      }}
                    />
                  </TableCell>
                </>
              )} */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
