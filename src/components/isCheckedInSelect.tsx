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

const SELECTOPTIONS = [
  {
    value: "both",
    label: "Both",
  },
  {
    value: "true",
    label: "Checked In",
  },
  {
    value: "false",
    label: "Not Checked In",
  },
];

export default function IsCheckedInSelect() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value !== "both") {
      params.set("ischeckedin", value);
      params.delete("page");
    } else {
      params.delete("ischeckedin");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      defaultValue={
        searchParams.get("ischeckedin")?.toString()
          ? searchParams.get("ischeckedin")?.toString()
          : "both"
      }
      onValueChange={(value) => handleChange(value)}
    >
      <SelectTrigger className="w-[300px] text-foreground">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {SELECTOPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
