import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { ProductCard } from "../components/ProductCard";
import { MapComponent } from "../components/MapComponent";
import { ArrowRight, Shield, Truck, Award, HeadphonesIcon } from "lucide-react";
import type { Product } from "../../../shared/schema";

export default function Home({
  onAddToCart,
}: {
  onAddToCart: (product: Product) => void;
}) {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const featuredProducts = products?.slice(0, 8) || [];

  const categories = [
    {
      name: "Odzież robocza",
      slug: "odziez-robocza",
      description: "Profesjonalne ubrania robocze",
    },
    {
      name: "Obuwie BHP",
      slug: "obuwie",
      description: "Bezpieczne buty robocze",
    },
    {
      name: "Rękawice",
      slug: "rekawice",
      description: "Rękawice ochronne",
    },
    {
      name: "Ochrona głowy",
      slug: "ochrona-glowy",
      description: "Kaski i ochraniacze",
    },
  ];

  const trustBadges = [
    {
      icon: Truck,
      title: "Szybka dostawa",
      description: "Wysyłka w 24h",
    },
    {
      icon: Shield,
      title: "Certyfikowane produkty",
      description: "Zgodne z normami UE",
    },
    {
      icon: Award,
      title: "Najwyższa jakość",
      description: "Sprawdzeni producenci",
    },
    {
      icon: HeadphonesIcon,
      title: "Wsparcie klienta",
      description: "Pomoc 24/7",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/70 z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920')] bg-cover bg-center opacity-30" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 py-24 md:py-40">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tight">
              <span className="text-primary">BHP</span> Perfect
            </h1>
            <p className="text-2xl md:text-3xl text-gray-200 mb-12 font-light">
              Bezpieczeństwo w najlepszym wydaniu
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href="/sklep" data-testid="button-shop-now">
                <Button
                  size="lg"
                  className="bg-primary text-black font-bold px-12 py-7 text-xl hover:bg-yellow-300 transition-all shadow-2xl shadow-primary/30 rounded-xl"
                >
                  Sklep <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/kontakt" data-testid="button-contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="backdrop-blur-md bg-white/5 border-2 border-primary/50 text-white hover:bg-primary hover:text-black px-12 py-7 text-xl font-bold rounded-xl transition-all"
                >
                  Kontakt
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-16 text-black">
            Kategorie
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/sklep?category=${category.slug}`}
                className="group relative bg-gradient-to-br from-black to-gray-900 rounded-2xl p-8 shadow-2xl hover:shadow-primary/20 transition-all duration-300 overflow-hidden border border-primary/20 hover:border-primary/60"
                data-testid={`card-category-${category.slug}`}
              >
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors relative z-10">{category.name}</h3>
                <div className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all relative z-10">
                  Zobacz <ArrowRight className="h-5 w-5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-5xl md:text-6xl font-black">
              Produkty
            </h2>
            <Link href="/sklep" data-testid="link-view-all">
              <Button variant="outline" className="hidden md:flex border-2 border-black hover:bg-black hover:text-white font-bold px-6 py-3 rounded-xl">
                Wszystkie <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 animate-pulse rounded-lg h-96"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-20 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-primary/30 group"
                data-testid={`trust-badge-${index}`}
              >
                <div className="bg-gradient-to-br from-primary to-yellow-300 rounded-2xl p-5 mb-6 group-hover:scale-110 transition-transform">
                  <badge.icon className="h-10 w-10 text-black" />
                </div>
                <h3 className="font-bold text-xl mb-1 text-black">{badge.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-16">
            Lokalizacja
          </h2>
          <div className="max-w-4xl mx-auto">
            <MapComponent />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-black mb-8">
            Potrzebujesz pomocy?
          </h2>
          <Link href="/kontakt" data-testid="button-cta-contact">
            <Button
              size="lg"
              className="bg-primary text-black border-2 border-primary hover:bg-transparent hover:text-primary font-bold px-16 py-8 text-2xl rounded-xl transition-all shadow-2xl shadow-primary/30"
            >
              Kontakt <ArrowRight className="ml-3 h-7 w-7" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
