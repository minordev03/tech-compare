import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ComparisonCard from "@/components/comparison-card";
import AdZone from "@/components/ad-zone";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Link } from "wouter";
import type { Comparison, Category } from "@shared/schema";

export default function CategoryPage() {
  const [match, params] = useRoute("/category/:categoryId");
  const categoryId = params?.categoryId;

  const { data: category, isLoading: categoryLoading } = useQuery<Category>({
    queryKey: ["/api/categories", categoryId],
    enabled: !!categoryId
  });

  const { data: comparisons, isLoading: comparisonsLoading } = useQuery<Comparison[]>({
    queryKey: ["/api/categories", categoryId, "comparisons"],
    enabled: !!categoryId
  });

  if (categoryLoading || comparisonsLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-12 w-3/4" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-80" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Category not found. Please check the URL and try again.
            </AlertDescription>
          </Alert>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* Left Ad Zone */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <AdZone size="300x600" />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="mb-8">
              <nav className="text-sm text-[var(--neutral-600)] mb-4">
                <Link href="/" className="hover:text-primary">Home</Link>
                <span> &gt; </span>
                <span className="text-[var(--neutral-900)]">{category.name}</span>
              </nav>
              
              <div className="flex items-center mb-4">
                <i className={`${category.icon} text-3xl text-primary mr-4`} />
                <div>
                  <h1 className="text-4xl font-bold">{category.name}</h1>
                  <p className="text-[var(--neutral-600)]">
                    {category.comparisonCount} comparisons available
                  </p>
                </div>
              </div>
            </div>

            {/* Comparisons Grid */}
            <section>
              {!comparisons || comparisons.length === 0 ? (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    No comparisons found in this category yet. Check back soon for new content!
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {comparisons.map((comparison) => (
                    <ComparisonCard key={comparison.id} comparison={comparison} />
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right Ad Zone */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <AdZone size="300x600" />
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile Ad Banner */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[var(--neutral-50)] border-t border-gray-300 p-4 z-40">
        <AdZone size="320x50" mobile />
      </div>

      <Footer />
    </div>
  );
}
