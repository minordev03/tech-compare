import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ComparisonCard from "@/components/comparison-card";
import AdZone from "@/components/ad-zone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "wouter";
import type { Comparison, Category } from "@shared/schema";

export default function Home() {
  const { data: featuredComparisons, isLoading: featuredLoading } = useQuery<Comparison[]>({
    queryKey: ["/api/comparisons/featured"]
  });

  const { data: recentComparisons, isLoading: recentLoading } = useQuery<Comparison[]>({
    queryKey: ["/api/comparisons/recent"]
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"]
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="tech-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Compare Products & Services
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90 text-balance">
            Make informed decisions with comprehensive side-by-side comparisons of software, electronics, and appliances.
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="What would you like to compare today?"
                className="w-full px-6 py-4 text-lg rounded-xl border-0 text-neutral-900 shadow-lg pr-24"
              />
              <Button className="absolute right-2 top-2 bg-[var(--tech-blue-dark)] hover:bg-[var(--tech-blue-dark)]/90 text-white px-6 py-2 rounded-lg">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

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
            {/* Featured Comparisons */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-8">Featured Comparisons</h2>
              {featuredLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-80"></div>
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredComparisons?.map((comparison) => (
                    <ComparisonCard key={comparison.id} comparison={comparison} />
                  ))}
                </div>
              )}
            </section>

            {/* Category Navigation */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>
              {categoriesLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-32"></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories?.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.id}`}
                      className="group bg-[var(--neutral-50)] category-hover p-6 rounded-xl text-center transition-colors"
                    >
                      <i className={`${category.icon} text-2xl mb-3 group-hover:text-white`} />
                      <h3 className="font-semibold">{category.name}</h3>
                      <p className="text-sm opacity-75">{category.comparisonCount} comparisons</p>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            {/* Recent Comparisons */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-8">Recent Comparisons</h2>
              {recentLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-24"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {recentComparisons?.slice(0, 5).map((comparison) => (
                    <article key={comparison.id} className="bg-white p-6 rounded-xl shadow-lg card-hover flex items-center">
                      <div className="w-16 h-16 bg-[var(--neutral-50)] rounded-lg flex items-center justify-center mr-4">
                        <i className="fas fa-balance-scale text-primary text-xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">{comparison.title}</h3>
                        <p className="text-[var(--neutral-600)] text-sm mb-2">{comparison.categoryPath}</p>
                        <p className="text-[var(--neutral-600)] text-sm">
                          Updated {new Date(comparison.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Link
                        href={`/comparison/${comparison.id}`}
                        className="text-primary font-medium hover:text-[var(--tech-blue-dark)]"
                      >
                        View →
                      </Link>
                    </article>
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
