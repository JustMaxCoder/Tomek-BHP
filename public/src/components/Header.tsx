import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X, ChevronDown, Package, Footprints, Hand, HardHat } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState, useRef, useEffect } from "react";

export function Header({ cartItemCount = 0 }: { cartItemCount?: number }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { href: "/", label: "Strona główna" },
    { href: "/o-nas", label: "O nas" },
    { href: "/kontakt", label: "Kontakt" },
  ];

  const categories = [
    {
      name: "Odzież robocza",
      slug: "odziez-robocza",
      description: "Profesjonalne ubrania robocze",
      icon: Package,
    },
    {
      name: "Obuwie BHP",
      slug: "obuwie",
      description: "Bezpieczne buty robocze",
      icon: Footprints,
    },
    {
      name: "Rękawice",
      slug: "rekawice",
      description: "Rękawice ochronne",
      icon: Hand,
    },
    {
      name: "Ochrona głowy",
      slug: "ochrona-glowy",
      description: "Kaski i ochraniacze",
      icon: HardHat,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === href;
    return location.startsWith(href);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" data-testid="link-home">
            <div className="text-2xl font-bold">
              Sklep <span className="text-primary">BHP</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <Button
                variant="ghost"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="px-4 py-2 text-white font-medium hover:text-primary transition-colors hover-elevate active-elevate-2"
                data-testid="button-categories"
              >
                Kategorie
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
              </Button>
              
              {categoriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-black/95 backdrop-blur-lg border-2 border-primary/20 rounded-lg shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/sklep?category=${category.slug}`}
                      className="flex items-start gap-3 p-3 cursor-pointer hover:bg-primary/10 transition-colors group border-b border-white/5 last:border-0"
                      onClick={() => setCategoriesOpen(false)}
                      data-testid={`dropdown-category-${category.slug}`}
                    >
                      <div className="bg-primary rounded-md p-2 group-hover:scale-110 transition-transform">
                        <category.icon className="h-5 w-5 text-black" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white group-hover:text-primary transition-colors">
                          {category.name}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          {category.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                  <Link
                    href="/sklep"
                    className="flex items-center justify-center p-3 mt-1 border-t border-primary/20 cursor-pointer hover:bg-primary/10 transition-colors font-semibold text-primary"
                    onClick={() => setCategoriesOpen(false)}
                    data-testid="dropdown-all-products"
                  >
                    Zobacz wszystkie produkty →
                  </Link>
                </div>
              )}
            </div>

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-md font-medium transition-colors hover-elevate active-elevate-2 ${
                  isActive(item.href) ? "text-primary" : "text-white"
                }`}
                data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.label}
                {isActive(item.href) && (
                  <div className="h-0.5 bg-primary mt-1 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-2">
            <Link href="/koszyk" data-testid="link-cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-white hover:text-primary"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-black text-xs font-bold"
                    data-testid="badge-cart-count"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/10 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Mobile Categories */}
            <div className="mb-4">
              <div className="px-4 py-2 text-sm font-semibold text-primary">
                Kategorie
              </div>
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/sklep?category=${category.slug}`}
                  className="flex items-center gap-3 px-4 py-4 text-white active:bg-white/10 transition-colors rounded-md mx-2 touch-manipulation"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`mobile-category-${category.slug}`}
                >
                  <div className="bg-primary rounded-md p-2">
                    <category.icon className="h-5 w-5 text-black" />
                  </div>
                  <div className="text-base font-medium">{category.name}</div>
                </Link>
              ))}
            </div>

            {/* Mobile Nav Items */}
            <div className="border-t border-white/10 pt-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-4 rounded-md font-medium transition-colors touch-manipulation ${
                    isActive(item.href)
                      ? "text-primary bg-white/5"
                      : "text-white"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
