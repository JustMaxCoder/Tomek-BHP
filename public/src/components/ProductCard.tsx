
import { Link } from "wouter";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ShoppingCart, CheckCircle, XCircle, Shield } from "lucide-react";
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
      className="group bg-white rounded-lg overflow-hidden transition-all duration-200 border border-gray-200 hover:shadow-xl hover:border-primary/50"
      data-testid={`card-product-${product.id}`}
    >
      <Link href={`/produkt/${product.id}`} className="block">
        <div className="relative bg-gray-50 aspect-square flex items-center justify-center p-3 sm:p-4">
          <div className="text-gray-300 text-4xl sm:text-6xl">📦</div>
          
          {/* Certified Badge */}
          <div className="absolute top-2 left-2 bg-green-600 text-white rounded-full p-1 sm:p-1.5">
            <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
          </div>
          
          {/* Category Badge */}
          <Badge
            className="absolute top-2 right-2 bg-primary text-black text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 font-semibold"
            data-testid={`badge-category-${product.id}`}
          >
            {product.category}
          </Badge>
        </div>
      </Link>

      <div className="p-2.5 sm:p-3 border-t border-gray-100">
        <Link href={`/produkt/${product.id}`}>
          <h3
            className="font-medium text-xs sm:text-sm leading-snug mb-2 line-clamp-2 hover:text-primary transition-colors min-h-[2rem] sm:min-h-[2.5rem]"
            data-testid={`text-product-name-${product.id}`}
          >
            {product.name}
          </h3>
        </Link>

        {/* Stock Status with Icon */}
        <div className={`flex items-center gap-1.5 mb-2 sm:mb-3 px-2 py-1 rounded-md ${
          inStock ? "bg-green-50" : "bg-red-50"
        }`}>
          {inStock ? (
            <CheckCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-green-600" />
          ) : (
            <XCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-red-600" />
          )}
          <span 
            className={`text-[10px] sm:text-xs font-medium ${
              inStock ? "text-green-700" : "text-red-700"
            }`} 
            data-testid={`text-stock-${product.id}`}
          >
            {inStock ? `W magazynie (${product.stock})` : "Niedostępny"}
          </span>
        </div>

        {/* Price and Cart Button */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold text-gray-900" data-testid={`text-price-${product.id}`}>
              {price.toFixed(2)} zł
            </span>
            <span className="text-[9px] sm:text-[10px] text-gray-500">+ VAT</span>
          </div>
          <Button
            variant="default"
            size="sm"
            className="bg-primary text-black hover:bg-primary/90 font-semibold text-[10px] sm:text-xs px-2.5 sm:px-3 h-8 sm:h-9 rounded-md transition-all hover:scale-105"
            onClick={() => onAddToCart?.(product)}
            disabled={!inStock}
            data-testid={`button-add-to-cart-${product.id}`}
          >
            <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4 sm:mr-1.5" />
            <span className="hidden sm:inline">Dodaj</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
