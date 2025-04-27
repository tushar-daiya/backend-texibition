"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  totalPages,
  currentPage,
  total,
}: {
  totalPages: number;
  currentPage: number;
  total: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  return (
    <div className="flex items-center justify-end mt-4 divide-x-2 gap-4">
      <p className="text-end px-4">Total Participants - {total}</p>
      <Button
        disabled={currentPage === 1 || totalPages === 0}
        onClick={() => {
          const params = new URLSearchParams(searchParams.toString());
          params.set("page", (currentPage - 1).toString());
          replace(`${pathname}?${params}`);
        }}
        variant={"outline"}
      >
        <ChevronLeft />
      </Button>
      <Button
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => {
          const params = new URLSearchParams(searchParams.toString());
          params.set("page", (currentPage + 1).toString());
          replace(`${pathname}?${params}`);
        }}
        variant={"outline"}
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
