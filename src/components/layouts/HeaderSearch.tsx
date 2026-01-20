import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router";

export default function HeaderSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = searchParams.get("q") ?? "";
  const [value, setValue] = useState(initial);

  useEffect(() => {
    setValue(initial);
  }, [initial]);

  useEffect(() => {
    const id = setTimeout(() => {
      if (value && value.trim() !== "") {
        setSearchParams({ q: value.trim() });
      } else {
        // clear params when empty
        setSearchParams({});
      }
    }, 300);

    return () => clearTimeout(id);
  }, [value, setSearchParams]);

  return (
    <div className="relative max-w-lg">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <Search size={18} />
      </div>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search orders, drivers, partners..."
        className="w-full rounded-xl pl-10 pr-4 py-3"
      />
    </div>
  );
}
