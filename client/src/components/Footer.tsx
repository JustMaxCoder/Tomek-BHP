import { Link } from "wouter";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Sklep <span className="text-primary">BHP</span>
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Profesjonalna odzież robocza i środki ochrony osobistej najwyższej jakości.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Nowy Dwór Mazowiecki, Poland</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Szybkie linki</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary transition-colors text-sm" data-testid="link-footer-home">
                  Strona główna
                </Link>
              </li>
              <li>
                <Link href="/sklep" className="text-gray-400 hover:text-primary transition-colors text-sm" data-testid="link-footer-shop">
                  Sklep
                </Link>
              </li>
              <li>
                <Link href="/o-nas" className="text-gray-400 hover:text-primary transition-colors text-sm" data-testid="link-footer-about">
                  O nas
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-400 hover:text-primary transition-colors text-sm" data-testid="link-footer-contact">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Kategorie</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/sklep?category=odziez-robocza" className="text-gray-400 hover:text-primary transition-colors text-sm" data-testid="link-category-workwear">
                  Odzież robocza
                </Link>
              </li>
              <li>
                <Link href="/sklep?category=obuwie" className="text-gray-400 hover:text-primary transition-colors text-sm" data-testid="link-category-footwear">
                  Obuwie BHP
                </Link>
              </li>
              <li>
                <Link href="/sklep?category=rekawice" className="text-gray-400 hover:text-primary transition-colors text-sm" data-testid="link-category-gloves">
                  Rękawice ochronne
                </Link>
              </li>
              <li>
                <Link href="/sklep?category=ochrona-glowy" className="text-gray-400 hover:text-primary transition-colors text-sm" data-testid="link-category-safety">
                  Ochrona głowy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Kontakt</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="h-4 w-4 text-primary" />
                <span>+48 123 456 789</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="h-4 w-4 text-primary" />
                <span>kontakt@sklepbhp.pl</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Sklep BHP. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}
