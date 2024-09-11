// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  // doc,
  collection,
  query,
  where,
  and,
  getDocs,
  // addDoc,
  doc,
  setDoc,
  updateDoc,
  // setDoc,
} from "firebase/firestore";
import crypto from "crypto";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "sih-leaderboard.firebaseapp.com",
  projectId: "sih-leaderboard",
  storageBucket: "sih-leaderboard.appspot.com",
  messagingSenderId: "497319770825",
  appId: "1:497319770825:web:c95ec37d47dc4b0ad06b18",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export type User = {
  id: string;
  email: string;
  password: string;
};

export type Player = {
  id: number;
  lead: string;
  name: string;
  score: number;
  history: number[];
};

export function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = process.env.SALT as string;
    crypto.pbkdf2(password, salt, 100000, 64, "sha512", (err, key) => {
      if (err) reject(err);

      resolve(key.toString("hex"));
    });
  });
}

export async function login(email: string, password: string) {
  const usersRef = collection(db, "users");
  const passwordHash = await hashPassword(password);

  const userQuery = query(
    usersRef,
    and(where("email", "==", email), where("password", "==", passwordHash))
  );
  const userSnapshot = await getDocs(userQuery);

  if (userSnapshot.empty) {
    return undefined;
  } else {
    return userSnapshot.docs[0].id;
  }
}

export async function populateTeams(rawCSV: string) {
  const rows = rawCSV
    .split("\n")
    .slice(1)
    .map((row) => {
      const fields = row.split(",");
      return {
        name: fields[0],
        lead: fields[2],
        score: fields[7],
        history: [],
      };
    });

  for (const row of rows) {
    const teamRef = doc(db, "teams", row.name);
    //console.log(row)
    await setDoc(teamRef, row);
  }
}

export async function getTeams() {
  const teamRef = collection(db, "teams");
  const teamQuery = query(teamRef);

  const teamSnapshot = await getDocs(teamQuery);

  const teams: Player[] = [];
  for (const teamData of teamSnapshot.docs) {
    teams.push(teamData.data() as Player);
  }

  return teams;
}

export async function updateScore(team: string, score: number) {
  const teamRef = doc(db, "teams", team);
  try {
    await updateDoc(teamRef, { score });
  } catch (error) {
    console.error("Failed to update score:", error);
    throw new Error("Error updating score");
  }
}
// export async function incrementTeamScore(team: string) {
//   const teamRef = collection(db, "teams");
//   const teamQuery = query(teamRef, where("name", "==", team));

//   const teamSnapshot = await getDocs(teamQuery);

//   if (teamSnapshot.empty) {
//     throw new Error("No team found");
//   } else {
//     const id = teamSnapshot.docs[0].id;

//     const teamData = teamSnapshot.docs[0].data() as Player;

//     await setDoc(doc(db, "teams", id), {
//       score: teamData.score + 10,
//       history: teamData.history.concat(10),
//       name: teamData.name,
//       lead: teamData.lead,
//     });
//   }
// }

// export async function decrementTeamScore(team: string) {
//   const teamRef = collection(db, "teams");
//   const teamQuery = query(teamRef, where("name", "==", team));

//   const teamSnapshot = await getDocs(teamQuery);

//   if (teamSnapshot.empty) {
//     throw new Error("No team found");
//   } else {
//     const id = teamSnapshot.docs[0].id;

//     const teamData = teamSnapshot.docs[0].data() as Player;

//     await setDoc(doc(db, "teams", id), {
//       score: teamData.score - 10,
//       history: teamData.history.concat(-10),
//       name: teamData.name,
//       lead: teamData.lead,
//     });
//   }
// }
