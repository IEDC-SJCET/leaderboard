"use server";

import { populateTeams } from "@/lib/db";

export async function importCSVAction(formData: FormData) {
  await populateTeams(await (formData.get("file") as File).text());
}

// export async function incrementTeamScoreAction(team: string){
//     incrementTeamScore(team);
// }

// export async function decrementTeamScoreAction(team: string){
//     decrementTeamScore(team);
// }
