import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { ProductCard } from "../components/ProductCard";
import { MapComponent } from "../components/MapComponent";
import { ArrowRight, Shield, Truck, Award, HeadphonesIcon } from "lucide-react";
import type { Product } from "../../../shared/schema";
import bhpBackground from "../assets/bhp-background.png";

export default function Home({
  onAddToCart,
}: {
  onAddToCart: (product: Product) => void;
}) {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const featuredProducts = products?.slice(0, 8) || [];

  const trustBadges = [
    {
      icon: Truck,
      title: "Szybka dostawa",
      description: "Wysyłka w 24h",
      text: "Zamów dziś, otrzymaj jutro! Gwarantujemy błyskawiczną realizację zamówień."
    },
    {
      icon: Shield,
      title: "Certyfikowane produkty",
      description: "Zgodne z normami UE",
      text: "Wszystkie produkty posiadają certyfikaty jakości i spełniają normy bezpieczeństwa."
    },
    {
      icon: Award,
      title: "Najwyższa jakość",
      description: "Sprawdzeni producenci",
      text: "Współpracujemy tylko z renomowanymi producentami znanych marek BHP."
    },
    {
      icon: HeadphonesIcon,
      title: "Wsparcie klienta",
      description: "Pomoc 24/7",
      text: "Nasz zespół doradców zawsze służy pomocą w doborze odpowiednich produktów."
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/70 z-10" />
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${bhpBackground})` }} />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight">
              <span className="text-primary">Sklep BHP</span> Perfect
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-4 sm:mb-6 md:mb-8">
              Twoje bezpieczeństwo - nasza pasja! Szeroki wybór produktów BHP w najlepszych cenach.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
              <Link href="/sklep" data-testid="button-shop-now" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary text-primary-foreground font-semibold px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg hover:bg-primary/90 touch-manipulation"
                >
                  Zobacz produkty <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
              <Link href="/kontakt" data-testid="button-contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto backdrop-blur-sm bg-white/10 border-2 border-white text-white hover:bg-white hover:text-black px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg font-semibold touch-manipulation"
                >
                  Skontaktuj się z nami
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 md:mb-12 gap-3 sm:gap-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              Polecane produkty
            </h2>
            <Link href="/sklep" data-testid="link-view-all">
              <Button variant="outline" className="hidden md:flex touch-manipulation">
                Zobacz wszystkie <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 animate-pulse rounded-md h-72"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
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
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-12">
            Dlaczego my?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-all border-2 border-gray-200 hover:border-primary touch-manipulation"
                data-testid={`trust-badge-${index}`}
              >
                <div className="bg-primary rounded-full p-2.5 sm:p-3 md:p-4 mb-2 sm:mb-3 md:mb-4">
                  <badge.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-black" />
                </div>
                <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-1.5 sm:mb-2 text-black">{badge.title}</h3>
                <p className="text-primary font-medium text-xs sm:text-sm mb-1.5 sm:mb-2 md:mb-3">
                  {badge.description}
                </p>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {badge.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-12">
            Nasza lokalizacja
          </h2>
        </div>
        <div className="w-full px-3 sm:px-4 md:px-8">
          <MapComponent />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-primary text-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">
            Potrzebujesz pomocy w wyborze?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4">
            Nasi specjaliści pomogą Ci dobrać odpowiednie środki ochrony
            osobistej.
          </p>
          <Link href="/kontakt" data-testid="button-cta-contact" className="inline-block w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-black text-white border-2 border-black hover:bg-white hover:text-black font-semibold px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg touch-manipulation"
            >
              Skontaktuj się z nami <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
