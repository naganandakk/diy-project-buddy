import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InfluencerVideo } from "@/components/InfluencerVideo";
import { ProductCard, Product } from "@/components/ProductCard";
import { ShoppingBasket, Clock, Users, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-workspace.jpg";

const mockProducts: Product[] = [
  {
    id: "1",
    name: "DEWALT 20V MAX Cordless Drill",
    price: 89.99,
    image: "/placeholder.svg",
    category: "tool",
    rating: 4.8,
    inStock: true,
  },
  {
    id: "2", 
    name: "Measuring Tape 25ft",
    price: 12.99,
    image: "/placeholder.svg",
    category: "tool",
    rating: 4.5,
    inStock: true,
  },
  {
    id: "3",
    name: "Wood Screws (100 pack)",
    price: 8.49,
    image: "/placeholder.svg",
    category: "material",
    rating: 4.3,
    inStock: true,
  },
  {
    id: "4",
    name: "Safety Glasses",
    price: 15.99,
    image: "/placeholder.svg",
    category: "safety",
    rating: 4.6,
    inStock: true,
  },
  {
    id: "5",
    name: "Level 24-inch",
    price: 24.99,
    image: "/placeholder.svg",
    category: "tool",
    rating: 4.7,
    inStock: true,
  },
  {
    id: "6",
    name: "Sandpaper Assortment",
    price: 18.99,
    image: "/placeholder.svg",
    category: "material",
    rating: 4.4,
    inStock: false,
  },
];

export default function InfluencerPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCreateBasket = () => {
    // Add all required products to basket with default quantity of 1
    const basketProducts = mockProducts
      .filter(product => product.inStock)
      .map(product => ({ ...product, quantity: 1 }));
    
    if (basketProducts.length === 0) {
      toast({
        title: "No products available",
        description: "All required products are currently out of stock.",
        variant: "destructive",
      });
      return;
    }

    // Store basket in localStorage for the basket page
    localStorage.setItem('projectBasket', JSON.stringify(basketProducts));
    
    toast({
      title: "Project basket created!",
      description: `Added ${basketProducts.length} required items to your basket.`,
    });
    
    navigate('/basket');
  };

  const totalCost = mockProducts
    .filter(product => product.inStock)
    .reduce((sum, product) => sum + product.price, 0);

  const availableProductsCount = mockProducts.filter(product => product.inStock).length;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">DIY Project Buddy</h1>
            <Button variant="outline" onClick={() => navigate('/basket')}>
              <ShoppingBasket className="h-4 w-4 mr-2" />
              View Basket
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Project Header */}
        <div className="mb-8">
          <Badge className="mb-4 bg-construction-blue text-white">Featured Project</Badge>
          <h1 className="text-4xl font-bold mb-4">Building a Floating Shelf</h1>
          <div className="flex items-center gap-6 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>2-3 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Beginner friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>4.8/5 rating</span>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <InfluencerVideo
              title="How to Build a Floating Shelf - Complete Tutorial"
              influencer="Mike the Builder"
              duration="12:45"
              thumbnail={heroImage}
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Project Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">What you'll learn:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Measuring and marking</li>
                  <li>• Drilling proper holes</li>
                  <li>• Installing floating brackets</li>
                  <li>• Finishing techniques</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Skill Level:</h4>
                <Badge variant="secondary">Beginner</Badge>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Estimated Cost:</h4>
                <p className="text-lg font-bold text-primary">${totalCost.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">{availableProductsCount} required items</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tools & Materials Section */}
        <section className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-4">Required Tools & Materials</h2>
            <Button variant="construction" onClick={handleCreateBasket}>
              Create Project Basket ({availableProductsCount} items)
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                // No onAddToBasket prop - removes the "Add to basket" button
              />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-construction-orange to-warning-amber text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Building?</h3>
            <p className="text-lg mb-6 opacity-90">
              Create your project basket with all the required tools and materials to get started!
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={handleCreateBasket}
            >
              Create Project Basket - ${totalCost.toFixed(2)}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}