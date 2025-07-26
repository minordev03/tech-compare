import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { Link } from "wouter";
import { useDebounce } from "@/hooks/use-debounce";
import type { SearchResult } from "@shared/schema";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  const { data: searchResults, isLoading } = useQuery<SearchResult[]>({
    queryKey: ["/api/search", { q: debouncedQuery }],
    enabled: debouncedQuery.length > 2,
    staleTime: 30000
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigate to search results page or handle search
      console.log("Search for:", query);
      setIsOpen(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search comparisons..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(e.target.value.length > 0);
            }}
            onFocus={() => setIsOpen(query.length > 0)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg search-focus"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--neutral-600)] w-4 h-4" />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && (query.length > 2) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-[var(--neutral-600)]">
              <i className="fas fa-spinner fa-spin mr-2" />
              Searching...
            </div>
          ) : searchResults && searchResults.length > 0 ? (
            <div className="py-2">
              {searchResults.slice(0, 8).map((result) => (
                <Link
                  key={result.id}
                  href={`/comparison/${result.id}`}
                  className="block px-4 py-3 hover:bg-[var(--neutral-50)] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="text-sm font-medium text-[var(--neutral-900)]">{result.title}</div>
                  <div className="text-xs text-[var(--neutral-600)]">{result.category}</div>
                </Link>
              ))}
              {searchResults.length > 8 && (
                <div className="px-4 py-2 text-xs text-[var(--neutral-600)] border-t">
                  Showing first 8 results. Refine your search for more specific results.
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-center text-[var(--neutral-600)]">
              No comparisons found for "{query}"
            </div>
          )}
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
