import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProductCard, Product } from "@/components/ProductCard";
import { ArrowLeft, ShoppingCart, Truck, Shield, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const recommendedProducts: Product[] = [
  {
    id: "r1",
    name: "Wood Stain - Natural Oak",
    price: 16.99,
    image: "/placeholder.svg",
    category: "material",
    rating: 4.6,
    inStock: true,
  },
  {
    id: "r2",
    name: "Work Gloves",
    price: 9.99,
    image: "/placeholder.svg", 
    category: "safety",
    rating: 4.4,
    inStock: true,
  },
  {
    id: "r3",
    name: "Dust Mask (10 pack)",
    price: 7.99,
    image: "/placeholder.svg",
    category: "safety", 
    rating: 4.5,
    inStock: true,
  },
];

export default function BasketPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [basketProducts, setBasketProducts] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('projectBasket');
    if (saved) {
      setBasketProducts(JSON.parse(saved));
    }
  }, []);

  const updateBasket = (products: Product[]) => {
    setBasketProducts(products);
    localStorage.setItem('projectBasket', JSON.stringify(products));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveProduct(productId);
      return;
    }
    
    const updated = basketProducts.map(product =>
      product.id === productId ? { ...product, quantity } : product
    );
    updateBasket(updated);
  };

  const handleRemoveProduct = (productId: string) => {
    const updated = basketProducts.filter(product => product.id !== productId);
    updateBasket(updated);
    toast({
      title: "Product removed",
      description: "The product has been removed from your basket.",
    });
  };

  const handleAddRecommended = (product: Product) => {
    const existing = basketProducts.find(p => p.id === product.id);
    if (existing) {
      handleUpdateQuantity(product.id, (existing.quantity || 1) + 1);
    } else {
      updateBasket([...basketProducts, { ...product, quantity: 1 }]);
    }
    
    toast({
      title: "Added to basket",
      description: `${product.name} has been added to your basket.`,
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout successful!",
      description: "Your order has been placed. You'll receive a confirmation email shortly.",
    });
    localStorage.removeItem('projectBasket');
    navigate('/');
  };

  const subtotal = basketProducts.reduce((sum, product) => 
    sum + (product.price * (product.quantity || 1)), 0
  );
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (basketProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-16 text-center">
          <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-4">Your project basket is empty</h1>
          <p className="text-muted-foreground mb-8">
            Start by selecting a project and adding the required tools and materials.
          </p>
          <Button variant="construction" onClick={() => navigate('/')}>
            Browse Projects
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
            <h1 className="text-2xl font-bold">Project Basket</h1>
            <div></div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Basket Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Building a Floating Shelf - Required Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {basketProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveProduct}
                      isInBasket={true}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommended Products */}
            <Card>
              <CardHeader>
                <CardTitle>You might also need</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToBasket={handleAddRecommended}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({basketProducts.length} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-2 text-sm text-construction-green">
                    <Truck className="h-4 w-4" />
                    <span>Free shipping on orders over $50</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>30-day return policy</span>
                  </div>
                </div>

                <Button 
                  variant="construction" 
                  className="w-full" 
                  size="lg"
                  onClick={handleCheckout}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Checkout - ${total.toFixed(2)}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Project:</strong> Building a Floating Shelf</p>
                  <p><strong>Difficulty:</strong> Beginner</p>
                  <p><strong>Time:</strong> 2-3 hours</p>
                  <p><strong>Rating:</strong> 4.8/5 stars</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}