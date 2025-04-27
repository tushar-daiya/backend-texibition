import EventsSelector from "@/components/EventsSelect";
import EventsTable from "@/components/eventsTable/eventsTable";
import TableSkeleton from "@/components/eventsTable/TableSkeleton";
import IsCheckedInSelect from "@/components/isCheckedInSelect";
import SearchInput from "@/components/SearchInput";
import SignoutButton from "@/components/Signout";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    eventId?: string;
    ischeckedin?: string;
  }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  if (session.user?.username !== "admin") {
    redirect("/");
  }

  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const eventId = Number(searchParams?.eventId) || undefined;
  const isCheckedIn =
    searchParams?.ischeckedin === "true"
      ? true
      : searchParams?.ischeckedin === "false"
      ? false
      : undefined;

  return (
    <div>
      <div className="h-20 flex items-center justify-between px-10 border-b">
        <p className="text-2xl font-bold">
          Welcome <span className="text-primary">{session?.user?.name}</span>
        </p>
        <SignoutButton />
      </div>
      <div className="w-full max-w-5xl mx-auto p-4">
        <div className="flex items-center justify-between mb-4 gap-10">
          <SearchInput />
          <EventsSelector />
          <IsCheckedInSelect />
        </div>
        <Suspense key={query + currentPage} fallback={<TableSkeleton />}>
          <EventsTable
            currentPage={currentPage}
            eventId={eventId}
            query={query}
            isCheckedIn={isCheckedIn}
          />
        </Suspense>
      </div>
    </div>
  );
}
