'use client'

import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from './ui/button'

import { Plus, Minus } from 'lucide-react'

type Player = {
  id: number
  name: string
  score: number
}

export function Leaderboard({teams, title, admin=false, incrementScore=() => {}, decrementScore=() => {}}: {
  teams: Player[], 
  title: string,
  admin?: boolean,
  incrementScore?: (team: string) => void,
  decrementScore?: (team: string) => void
}) {
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
            {
              admin && <TableHead>Actions</TableHead>
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPlayers.map((player, index) => (
            <TableRow key={player.id} className="hover:bg-muted/50 transition-colors">
              <TableCell key={player.id} className="font-medium">
                {index === 0 && <Badge className="bg-yellow-500">1st</Badge>}
                {index === 1 && <Badge className="bg-gray-400">2nd</Badge>}
                {index === 2 && <Badge className="bg-amber-600">3rd</Badge>}
                {index > 2 && `${index + 1}th`}
              </TableCell>
              <TableCell key={player.id}>{player.name}</TableCell>
              <TableCell className="text-right" key={player.id}>{player.score}</TableCell>
              {
                admin &&
                <TableCell className='flex flex-row gap-2 w-fit' key={player.id}>
                  <Button onClick={() => incrementScore(player.name)}>
                    <Plus/>
                  </Button>
                  <Button onClick={() => decrementScore(player.name)}>
                    <Minus/>
                  </Button>
                </TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}