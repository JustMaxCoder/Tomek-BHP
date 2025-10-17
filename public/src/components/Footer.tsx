import { Link } from "wouter";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold mb-3 sm:mb-4">
              Sklep <span className="text-primary">BHP</span>
            </h3>
            <p className="text-gray-400 text-sm mb-3 sm:mb-4">
              Profesjonalna odzież robocza i środki ochrony osobistej najwyższej jakości.
            </p>
            <div className="flex items-start gap-2 text-sm text-gray-400 mb-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <span>Bohaterów Modlina 17, 05-100 Nowy Dwór Mazowiecki</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Szybkie linki</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary active:text-primary transition-colors text-sm touch-manipulation inline-block py-1" data-testid="link-footer-home">
                  Strona główna
                </Link>
              </li>
              <li>
                <Link href="/sklep" className="text-gray-400 hover:text-primary active:text-primary transition-colors text-sm touch-manipulation inline-block py-1" data-testid="link-footer-shop">
                  Sklep
                </Link>
              </li>
              <li>
                <Link href="/o-nas" className="text-gray-400 hover:text-primary active:text-primary transition-colors text-sm touch-manipulation inline-block py-1" data-testid="link-footer-about">
                  O nas
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-400 hover:text-primary active:text-primary transition-colors text-sm touch-manipulation inline-block py-1" data-testid="link-footer-contact">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Kategorie</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/sklep?category=odziez-robocza" className="text-gray-400 hover:text-primary active:text-primary transition-colors text-sm touch-manipulation inline-block py-1" data-testid="link-category-workwear">
                  Odzież robocza
                </Link>
              </li>
              <li>
                <Link href="/sklep?category=obuwie" className="text-gray-400 hover:text-primary active:text-primary transition-colors text-sm touch-manipulation inline-block py-1" data-testid="link-category-footwear">
                  Obuwie BHP
                </Link>
              </li>
              <li>
                <Link href="/sklep?category=rekawice" className="text-gray-400 hover:text-primary active:text-primary transition-colors text-sm touch-manipulation inline-block py-1" data-testid="link-category-gloves">
                  Rękawice ochronne
                </Link>
              </li>
              <li>
                <Link href="/sklep?category=ochrona-glowy" className="text-gray-400 hover:text-primary active:text-primary transition-colors text-sm touch-manipulation inline-block py-1" data-testid="link-category-safety">
                  Ochrona głowy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Kontakt</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="tel:+48123456789" className="hover:text-primary transition-colors touch-manipulation">+48 123 456 789</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="mailto:kontakt@sklepbhp.pl" className="hover:text-primary transition-colors touch-manipulation break-all">kontakt@sklepbhp.pl</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center space-y-2">
          <p className="text-gray-400 text-sm px-4">
            &copy; {currentYear} Sklep BHP Perfekt. Wszelkie prawa zastrzeżone.
          </p>
          <p className="text-gray-500 text-xs px-4" data-testid="text-credits">
            Created by: <span className="text-primary">Maksym Martynovych</span> — Owner: <span className="text-primary">Tomek Tomasz Burzykowski</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
