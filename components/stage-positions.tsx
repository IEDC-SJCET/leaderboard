'use client'

import { Trophy } from "lucide-react"
import { type Player } from "@/lib/db"
import { cn } from "@/lib/utils"

export function Position({ team, position }:{team: string, position: number}) {
  let positionText = "";
  switch(position){
    case 1:
      positionText = "1st";
      break;
    case 2:
      positionText = "2nd";
      break;
    case 3:
      positionText = "3rd";
      break;
  }
  return (
    <div className="flex flex-col items-center">
      <div className={cn("rounded-t-lg w-40 flex items-center justify-center", 
        position == 1 ? "bg-yellow-400 h-48": "", 
        position == 2 ? "bg-gray-300 h-40" : "",
        position == 3 ? "bg-orange-400 h-32" : ""  
      )}>
        <Trophy className={cn("w-12 h-12",
          position == 1 ? "text-yellow-600": "", 
          position == 2 ? "text-gray-700" : "",
          position == 3 ? "text-orange-700" : ""
        )} />
      </div>
      <div className={cn("w-full h-12 font-bold text-center text-2xl",
        position == 1 ? "bg-yellow-400 text-yellow-600": "", 
        position == 2 ? "bg-gray-300 text-gray-700" : "",
        position == 3 ? "bg-orange-400 text-orange-700" : ""  
      )}>
        {positionText}
      </div>
      <div className="w-full py-2 text-center font-bold bg-white text-gray-800 border-t border-gray-200 rounded-b-lg">
        {team}
      </div>
    </div>
  )
}

export function StagePositions({ positions }: { positions: Player[] }) {

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-8">Podium Standings</h2>
      <div className="flex justify-center items-end space-x-4">
        <Position position={2} team={positions[1].name}/>
        <Position position={1} team={positions[0].name}/>
        <Position position={3} team={positions[2].name}/>
      </div>
    </div>
  )
}