import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import type { Comparison } from "@shared/schema";

interface ComparisonCardProps {
  comparison: Comparison;
}

export default function ComparisonCard({ comparison }: ComparisonCardProps) {
  const categoryName = comparison.categoryPath.split(" > ")[0];
  const updatedDate = new Date(comparison.updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
      {comparison.media?.images?.[0] && (
        <img
          src={comparison.media.images[0]}
          alt={comparison.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <Badge variant="secondary" className="mb-3 bg-[var(--tech-blue-light)]/10 text-[var(--tech-blue-light)]">
          {categoryName}
        </Badge>
        <h3 className="text-xl font-semibold mb-3 text-balance">
          {comparison.title}
        </h3>
        <p className="text-[var(--neutral-600)] mb-4 text-sm line-clamp-3">
          {comparison.introduction}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--neutral-600)]">Updated {updatedDate}</span>
          <Link
            href={`/comparison/${comparison.id}`}
            className="text-primary font-medium hover:text-[var(--tech-blue-dark)] transition-colors"
          >
            View Comparison →
          </Link>
        </div>
      </div>
    </article>
  );
}
