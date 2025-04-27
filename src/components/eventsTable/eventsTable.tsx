import { prisma } from "@/lib/prisma";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import Pagination from "../Pagination";

export default async function EventsTable({
  query,
  currentPage,
  eventId,
  isCheckedIn,
}: {
  query: string;
  currentPage: number;
  eventId?: number;
  isCheckedIn?: boolean;
}) {
  console.log(isCheckedIn)
  const participants = await prisma.team.findMany({
    where: {
      eventId: eventId,
      isCheckedIn: isCheckedIn,
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    skip: (currentPage - 1) * 10,
    take: 10,
    select: {
      id: true,
      name: true,
      teamId: true,
      email: true,
      eventId: true,
      isCheckedIn: true,
      checkedInBy: true,
    },
  });
  const total = await prisma.team.count({
    where: {
      eventId: eventId,
      isCheckedIn: isCheckedIn,
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });
  console.log(total);
  console.log(participants)
  const totalPages = Math.ceil(total / 10);
  console.log(totalPages);
  return (
    <div>
      <DataTable columns={columns} data={participants} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        total={total}
      />
    </div>
  );
}
