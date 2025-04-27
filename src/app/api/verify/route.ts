import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Team } from "../../../../generated/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let data;
  try {
    data = JSON.parse(atob(body.data));
  } catch (error) {
    console.error("Error parsing QR code data", error);
    return NextResponse.json(
      { message: "Invalid QR code format" },
      { status: 400 }
    );
  }
  const { teamId } = data;
  const coordinator = session.user.name;
  let team;
  try {
    team = await prisma.team.findUnique({
      where: {
        teamId: teamId,
      },
    });
  } catch (error) {
    console.error("Error fetching team data", error);
    return NextResponse.json(
      { message: "Error fetching team data" },
      { status: 500 }
    );
  }

  if (!team) {
    return NextResponse.json({ message: "Team not found" }, { status: 404 });
  }

  if (team.isCheckedIn) {
    return NextResponse.json(
      { message: getMessage(team.eventId, team) },
      { status: 400 }
    );
  }

  const message = getMessage(team.eventId, team);
  try {
    await prisma.team.update({
      where: {
        teamId: teamId,
      },
      data: {
        isCheckedIn: true,
        checkedInBy: coordinator,
      },
    });
  } catch (error) {
    console.error("Error updating team data", error);
    return NextResponse.json(
      { message: "Error updating team data" },
      { status: 500 }
    );
  }
  return NextResponse.json({ message: message }, { status: 200 });
}

function getMessage(eventId: number, team: Team) {
  if (
    eventId === 101 ||
    eventId === 102 ||
    eventId === 103 ||
    eventId === 104 ||
    eventId === 105 ||
    eventId === 109 ||
    eventId === 110
  ) {
    if (team.isCheckedIn) {
      return team.teamId + " is already checked in";
    } else {
      return team.teamId + " is checked in";
    }
  } else if (eventId === 106) {
    if (team.isCheckedIn) {
      return team.name + " is already checked in";
    } else {
      return team.name + " is checked in";
    }
  } else {
    if (team.isCheckedIn) {
      return team.teamName + " is already checked in";
    } else {
      return team.teamName + " is checked in";
    }
  }
}
