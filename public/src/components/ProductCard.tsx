import { Link } from "wouter";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ShoppingCart } from "lucide-react";
import type { Product } from "../../../shared/schema";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const inStock = parseInt(product.stock.toString()) > 0;
  const price = parseFloat(product.price.toString());

  return (
    <div
      className="group bg-white rounded-md overflow-hidden transition-all duration-200 border border-gray-200 hover:shadow-lg"
      data-testid={`card-product-${product.id}`}
    >
      <Link href={`/produkt/${product.id}`} className="block">
        <div className="relative bg-white aspect-square flex items-center justify-center p-2 sm:p-3">
          <div className="text-gray-300 text-3xl sm:text-5xl">📦</div>
          <Badge
            className="absolute top-1 left-1 bg-primary text-black text-[9px] px-1.5 py-0.5 font-semibold"
            data-testid={`badge-category-${product.id}`}
          >
            {product.category}
          </Badge>
        </div>
      </Link>

      <div className="p-2 sm:p-3 border-t border-gray-100">
        <Link href={`/produkt/${product.id}`}>
          <h3
            className="font-normal text-xs sm:text-sm leading-snug mb-1.5 sm:mb-2 line-clamp-2 hover:text-primary transition-colors min-h-[2rem] sm:min-h-[2.5rem]"
            data-testid={`text-product-name-${product.id}`}
          >
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-1.5 sm:mb-2">
          <div
            className={`h-1.5 w-1.5 rounded-full ${
              inStock ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span className="text-[10px] sm:text-[11px] text-gray-600" data-testid={`text-stock-${product.id}`}>
            {inStock ? "Dostępny" : "Niedostępny"}
          </span>
        </div>

        <div className="flex items-end justify-between gap-1.5 sm:gap-2 mt-2 sm:mt-3">
          <div className="flex flex-col">
            <span className="text-base sm:text-xl font-bold text-gray-900" data-testid={`text-price-${product.id}`}>
              {price.toFixed(2)} zł
            </span>
          </div>
          <Button
            variant="default"
            size="sm"
            className="bg-primary text-black hover:bg-primary/90 font-semibold text-[10px] sm:text-xs px-2 sm:px-3 h-7 sm:h-8 rounded-md"
            onClick={() => onAddToCart?.(product)}
            disabled={!inStock}
            data-testid={`button-add-to-cart-${product.id}`}
          >
            <ShoppingCart className="h-3 w-3 sm:h-3.5 sm:w-3.5 sm:mr-1.5" />
            <span className="hidden sm:inline">Kup</span>
          </Button>
        </div>
      </div>
    </div>
  );
}