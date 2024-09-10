"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import { importCSVAction, incrementTeamScoreAction, decrementTeamScoreAction } from "./actions"

import { Leaderboard } from "@/components/leaderboard"
import { getTeams } from "@/lib/db"

import { useQuery } from "@tanstack/react-query"
import { useState, useEffect } from "react"

export default function Admin() {
    const [id, setId] = useState<number>(0);
    const {data, refetch} = useQuery({ queryKey: ["teams"], queryFn: () => getTeams() })
    
    useEffect(() => {
        refetch();
    }, [id])

    return (
        <div className="flex flex-col gap-3 p-5">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className="w-fit">Import CSV</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                    <AlertDialogTitle>Import from CSV table</AlertDialogTitle>
                    <form action={importCSVAction} className="flex flex-col gap-3">
                        <Label>Upload File</Label>
                        <Input type="file" name="file" />
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button type='submit'>Import</Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>
            <Leaderboard teams={data ?? []} title="Teams" incrementScore={(team) => {
                incrementTeamScoreAction(team)
                setId((id) => id+1);
            }} decrementScore={(team) => {
                decrementTeamScoreAction(team)
                setId((id) => id+1);
            }} admin />
        </div>
    )
}