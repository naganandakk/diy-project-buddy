import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, Minus, X } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "tool" | "material" | "safety";
  rating: number;
  inStock: boolean;
  quantity?: number;
}

interface ProductCardProps {
  product: Product;
  onAddToBasket?: (product: Product) => void;
  onUpdateQuantity?: (productId: string, quantity: number) => void;
  onRemove?: (productId: string) => void;
  isInBasket?: boolean;
}

export const ProductCard = ({ 
  product, 
  onAddToBasket, 
  onUpdateQuantity, 
  onRemove, 
  isInBasket = false 
}: ProductCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "tool": return "bg-construction-blue text-white";
      case "material": return "bg-construction-green text-white";
      case "safety": return "bg-warning-amber text-black";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="relative">
        <div className="aspect-square bg-tool-gray flex items-center justify-center p-4">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>
        <Badge className={`absolute top-2 left-2 ${getCategoryColor(product.category)}`}>
          {product.category}
        </Badge>
        {isInBasket && onRemove && (
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={() => onRemove(product.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <CardContent className="flex-1 p-4">
        <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 fill-warning-amber text-warning-amber" />
          <span className="text-sm text-muted-foreground">{product.rating}</span>
        </div>
        <p className="font-bold text-lg text-primary">${product.price}</p>
        <p className={`text-sm ${product.inStock ? 'text-construction-green' : 'text-destructive'}`}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {isInBasket ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => onUpdateQuantity?.(product.id, Math.max(0, (product.quantity || 1) - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">{product.quantity || 1}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => onUpdateQuantity?.(product.id, (product.quantity || 1) + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="font-bold">${((product.quantity || 1) * product.price).toFixed(2)}</p>
          </div>
        ) : (
          <Button 
            variant="construction" 
            className="w-full"
            onClick={() => onAddToBasket?.(product)}
            disabled={!product.inStock}
          >
            Add to Basket
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};