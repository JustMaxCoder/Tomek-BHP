import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState } from "react";

export function Header({ cartItemCount = 0 }: { cartItemCount?: number }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Strona główna", hasDropdown: true },
    { href: "/o-nas", label: "O nas" },
    { href: "/kontakt", label: "Kontakt" },
  ];

  const categories = [
    { name: "Odzież robocza", slug: "odziez-robocza", icon: "👔" },
    { name: "Obuwie BHP", slug: "obuwie", icon: "👞" },
    { name: "Rękawice", slug: "rekawice", icon: "🧤" },
    { name: "Ochrona głowy", slug: "ochrona-glowy", icon: "⛑️" },
    { name: "Ochrona słuchu", slug: "ochrona-sluchu", icon: "🎧" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === href;
    return location.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover-elevate active-elevate-2 px-2 py-1 rounded-md transition-colors" data-testid="link-home">
            <div className="text-2xl font-bold">
              Sklep <span className="text-primary">BHP</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              item.hasDropdown ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setCategoriesOpen(true)}
                  onMouseLeave={() => setCategoriesOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={`px-4 py-2 rounded-md font-medium transition-colors hover-elevate active-elevate-2 flex items-center gap-1 ${
                      isActive(item.href) ? "text-primary" : "text-white"
                    }`}
                    data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
                    {isActive(item.href) && (
                      <div className="h-0.5 bg-primary mt-1 rounded-full absolute bottom-0 left-4 right-4" />
                    )}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {categoriesOpen && (
                    <div className="absolute top-full left-0 mt-2 w-80 backdrop-blur-md bg-black/90 rounded-xl shadow-2xl border border-primary/30 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="bg-gradient-to-r from-primary to-yellow-300 p-4">
                        <h3 className="font-bold text-black text-base">🛡️ Kategorie produktów</h3>
                      </div>
                      <div className="p-3">
                        {categories.map((category) => (
                          <Link
                            key={category.slug}
                            href={`/sklep?category=${category.slug}`}
                            className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-primary/20 hover:backdrop-blur-lg transition-all duration-200 group border border-transparent hover:border-primary/50"
                            data-testid={`dropdown-category-${category.slug}`}
                            onClick={() => setCategoriesOpen(false)}
                          >
                            <span className="text-3xl group-hover:scale-110 transition-transform">{category.icon}</span>
                            <span className="text-white font-semibold group-hover:text-primary transition-colors">
                              {category.name}
                            </span>
                          </Link>
                        ))}
                        <div className="border-t border-primary/30 mt-3 pt-3">
                          <Link
                            href="/sklep"
                            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-yellow-300 text-black hover:from-yellow-300 hover:to-primary font-bold transition-all duration-200 shadow-lg hover:shadow-primary/50"
                          >
                            ⚡ Zobacz wszystkie produkty
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
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
              )
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
          <nav className="md:hidden py-4 border-t border-white/10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 rounded-md font-medium transition-colors hover-elevate ${
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
          </nav>
        )}
      </div>
    </header>
  );
}
