import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  teamId: z.string(),
  teamName: z.string().optional(),
  eventId: z.number().min(101).max(110),
  name: z.string(),
  email: z.string().email(),
});

export default async function GET(req: NextRequest) {
  const body = await req.json();
  const parsedBody = bodySchema.safeParse(body);
  if (!parsedBody.success) {
    console.log("Invalid body", parsedBody.error);
    return NextResponse.json(
      {
        error: "Invalid body",
        details: parsedBody.error.format(),
      },
      { status: 400 }
    );
  }

  const { teamId, teamName, eventId, name, email } = parsedBody.data;
  try {
    await prisma.team.create({
      data: {
        teamId,
        teamName,
        eventId,
        name,
        email,
      },
    });
    return NextResponse.json(
      {
        message: "Team created successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error creating team", error);
    return NextResponse.json(
      {
        error: "Error creating team",
        details: error,
      },
      { status: 500 }
    );
  }
}
