import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ComparisonTable from "@/components/comparison-table";
import AdZone from "@/components/ad-zone";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Link } from "wouter";
import type { Comparison } from "@shared/schema";

export default function ComparisonPage() {
  const [match, params] = useRoute("/comparison/:id");
  const id = params?.id;

  const { data: comparison, isLoading, error } = useQuery<Comparison>({
    queryKey: ["/api/comparisons", id],
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !comparison) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Comparison not found. Please check the URL and try again.
            </AlertDescription>
          </Alert>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryPath = comparison.categoryPath.split(" > ");

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
            <section className="mb-12 bg-[var(--neutral-50)] p-8 rounded-xl">
              <div className="mb-6">
                <nav className="text-sm text-[var(--neutral-600)] mb-4">
                  <Link href="/" className="hover:text-primary">Home</Link>
                  {categoryPath.map((segment, index) => (
                    <span key={index}>
                      {" > "}
                      <span className={index === categoryPath.length - 1 ? "text-[var(--neutral-900)]" : "hover:text-primary cursor-pointer"}>
                        {segment}
                      </span>
                    </span>
                  ))}
                </nav>
                <h1 className="text-4xl font-bold mb-4">{comparison.title}</h1>
                <p className="text-lg text-[var(--neutral-600)] mb-6">
                  {comparison.introduction}
                </p>
              </div>

              {/* Comparison Table */}
              <ComparisonTable comparison={comparison} />

              {/* Product Images */}
              {comparison.media?.images && comparison.media.images.length > 0 && (
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {comparison.items.map((item, index) => (
                    <div key={item.name} className="text-center">
                      <h4 className="text-xl font-semibold mb-4">{item.name}</h4>
                      {comparison.media?.images?.[index] && (
                        <img
                          src={comparison.media.images[index]}
                          alt={item.name}
                          className="w-full rounded-lg shadow-lg"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Disclaimer */}
              {comparison.disclaimer && (
                <Alert className="bg-yellow-50 border-yellow-200">
                  <Info className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-sm text-[var(--neutral-600)]">
                    <strong>Disclaimer:</strong> {comparison.disclaimer}
                  </AlertDescription>
                </Alert>
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
