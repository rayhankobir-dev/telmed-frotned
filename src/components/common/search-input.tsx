"use client";
import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";

function SearchInput() {
  const [keyword, setKeyword] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    redirect(`/medicines?keyword=${keyword}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-12 w-full md:max-w-xl flex items-center bg-primary/10 rounded-xl overflow-hidden border border-transparent focus-within:border-primary duration-200"
    >
      <Input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="h-full w-full items-center border-none shadow-none rounded-none outline-none rign-0 focus-visible:outline-none focus-visible:ring-0"
        placeholder="Search"
      />
      {keyword && (
        <button
          type="button"
          onClick={() => setKeyword("")}
          className="p-1 mr-2 text-primary bg-primary/20 rounded-full"
        >
          <X size={15} />
        </button>
      )}

      <button className="h-full px-3.5 bg-primary text-white">
        <Search />
      </button>
    </form>
  );
}

export default SearchInput;
