'use client'

import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

type Player = {
  id: number
  name: string
  score: number
}

const players: Player[] = [
  { id: 1, name: "Alice", score: 1000 },
  { id: 2, name: "Bob", score: 850 },
  { id: 3, name: "Charlie", score: 900 },
  { id: 4, name: "David", score: 750 },
  { id: 5, name: "Eve", score: 950 },
]

export function Leaderboard({teams, title}: {teams: Player[], title: string}) {
  const sortedPlayers = [...teams].sort((a, b) => b.score - a.score)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPlayers.map((player, index) => (
            <TableRow key={player.id} className="hover:bg-muted/50 transition-colors">
              <TableCell className="font-medium">
                {index === 0 && <Badge className="bg-yellow-500">1st</Badge>}
                {index === 1 && <Badge className="bg-gray-400">2nd</Badge>}
                {index === 2 && <Badge className="bg-amber-600">3rd</Badge>}
                {index > 2 && `${index + 1}th`}
              </TableCell>
              <TableCell>{player.name}</TableCell>
              <TableCell className="text-right">{player.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}