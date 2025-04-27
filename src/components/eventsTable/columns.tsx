"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Participant = {
  id: number;
  name: string;
  email: string;
  teamId: string;
  eventId: number;
  isCheckedIn: boolean;
  checkedInBy: string|null;
};

const events: Record<string, string> = {
  "101": "FreeFire",
  "102": "BGMI",
  "103": "Valorant",
  "104": "PES",
  "105": "Blitz",
  "106": "Bluster",
  "107": "XiBit",
  "108": "Architect",
  "109": "Prompters",
  "110": "NextGen",
};

export const columns: ColumnDef<Participant>[] = [
  {
    accessorKey: "teamId",
    header: "Team ID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "eventId",
    header: "Event",
    cell: ({ row }) => {
      const eventId = row.original.eventId.toString();
      return events[eventId] ?? "—";
    },
  },
  {
    accessorKey: "isCheckedIn",
    header: "Is CheckedIn",
  },
  {
    accessorKey: "checkedInBy",
    header: "CheckIn By",
    cell: ({ row }) => row.original.checkedInBy ?? "—",
  },
];
