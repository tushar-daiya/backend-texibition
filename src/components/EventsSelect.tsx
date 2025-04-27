"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const EVENTS = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "101",
    label: "FreeFire",
  },
  {
    value: "102",
    label: "BGMI",
  },
  {
    value: "103",
    label: "Valorant",
  },
  {
    value: "104",
    label: "PES",
  },
  {
    value: "105",
    label: "Blitz",
  },
  {
    value: "106",
    label: "Bluster",
  },
  {
    value: "107",
    label: "XiBit",
  },
  {
    value: "108",
    label: "Architect",
  },
  {
    value: "109",
    label: "Prompters",
  },
  {
    value: "110",
    label: "NextGen",
  },
];

export default function EventsSelector() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value !== "all") {
      params.set("eventId", value);
      params.delete("page");
      params.delete("query");
    } else {
      params.delete("eventId");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      defaultValue={
        searchParams.get("eventId")?.toString()
          ? searchParams.get("eventId")?.toString()
          : "all"
      }
      onValueChange={(value) => handleChange(value)}
    >
      <SelectTrigger className="w-[300px] text-foreground">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {EVENTS.map((event) => (
            <SelectItem key={event.value} value={event.value}>
              {event.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
