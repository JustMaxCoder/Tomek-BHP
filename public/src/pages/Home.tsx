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

        <div className="relative z-20 max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Profesjonalna <span className="text-primary">odzież BHP</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Kompleksowe wyposażenie dla bezpieczeństwa w pracy. Wysoka jakość,
              konkurencyjne ceny.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/sklep" data-testid="button-shop-now">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground font-semibold px-8 py-6 text-lg hover:bg-primary/90"
                >
                  Zobacz produkty <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/kontakt" data-testid="button-contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="backdrop-blur-sm bg-white/10 border-2 border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg font-semibold"
                >
                  Skontaktuj się z nami
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-black">
            Kategorie produktów
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/sklep?category=${category.slug}`}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all hover-elevate active-elevate-2 border-2 border-gray-200 hover:border-primary group"
                data-testid={`card-category-${category.slug}`}
              >
                <h3 className="text-xl font-semibold mb-2 text-black group-hover:text-primary transition-colors">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {category.description}
                </p>
                <div className="text-primary font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  Przeglądaj <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">
              Polecane produkty
            </h2>
            <Link href="/sklep" data-testid="link-view-all">
              <Button variant="outline" className="hidden md:flex">
                Zobacz wszystkie <ArrowRight className="ml-2 h-4 w-4" />
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
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200"
                data-testid={`trust-badge-${index}`}
              >
                <div className="bg-primary rounded-full p-4 mb-4">
                  <badge.icon className="h-8 w-8 text-black" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-black">{badge.title}</h3>
                <p className="text-gray-600 text-sm">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Nasza lokalizacja
          </h2>
          <div className="max-w-4xl mx-auto">
            <MapComponent />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary text-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Potrzebujesz pomocy w wyborze?
          </h2>
          <p className="text-xl mb-8">
            Nasi specjaliści pomogą Ci dobrać odpowiednie środki ochrony
            osobistej.
          </p>
          <Link href="/kontakt" data-testid="button-cta-contact">
            <Button
              size="lg"
              variant="outline"
              className="bg-black text-white border-2 border-black hover:bg-white hover:text-black font-semibold px-8 py-6 text-lg"
            >
              Skontaktuj się z nami <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
