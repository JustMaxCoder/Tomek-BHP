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

  const handleAddToCart = () => {
    onAddToCart?.(product);
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group border-2 border-gray-100 hover:border-primary/50 flex flex-col"
      data-testid={`card-product-${product.id}`}
    >
      <Link href={`/produkt/${product.id}`} className="block">
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 aspect-square flex items-center justify-center border-b-2 border-gray-200 group-hover:from-gray-100 group-hover:to-gray-50 transition-all">
          <div className="text-gray-300 group-hover:text-primary/40 transition-colors group-hover:scale-110 duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-28 w-28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <Badge
            className="absolute top-3 right-3 bg-black/70 text-white text-xs font-medium px-3 py-1 rounded-full"
            data-testid={`badge-category-${product.id}`}
          >
            {product.category}
          </Badge>
        </div>
      </Link>

      <div className="p-6 flex-1 flex flex-col" data-testid={`product-card-${product.id}`}>
        <Link href={`/produkt/${product.id}`}>
          <h3
            className="font-bold text-xl mb-3 text-black group-hover:text-primary transition-colors line-clamp-2"
            data-testid={`text-product-name-${product.id}`}
          >
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4" data-testid={`text-product-description-${product.id}`}>
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className={`h-2.5 w-2.5 rounded-full ${
                inStock ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="text-sm font-medium" data-testid={`text-stock-${product.id}`}>
              {inStock ? "В наличии" : "Нет в наличии"}
            </span>
          </div>
        </div>

        <p className="text-3xl font-black text-black mb-6 mt-auto">
          {price.toFixed(2)} ₽
        </p>

        <Button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-primary to-yellow-300 text-black hover:from-yellow-300 hover:to-primary font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
          data-testid={`button-add-to-cart-${product.id}`}
          disabled={!inStock}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Добавить
        </Button>
      </div>
    </div>
  );
}