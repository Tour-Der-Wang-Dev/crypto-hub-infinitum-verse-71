
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/marketplace";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="card-glass overflow-hidden rounded-lg flex flex-col h-full transition-transform hover:scale-[1.02] hover:shadow-lg" data-testid="product-card">
      <div className="h-48 bg-gradient-to-br from-infi-dark-blue/70 to-infi-dark overflow-hidden relative">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-4xl">{product.emoji || '🖼️'}</span>
          </div>
        )}
        
        {product.featuredBadge && (
          <div className="absolute top-2 right-2 bg-infi-gold text-black text-xs py-1 px-2 rounded-md">
            {product.featuredBadge}
          </div>
        )}
      </div>
      
      <CardHeader className="p-4 pb-2">
        <div className="mb-2">
          <span className="inline-block px-2 py-1 text-xs bg-infi-dark border border-infi-gold/30 rounded-md text-infi-gold-light" data-testid="product-category">
            {product.category}
          </span>
        </div>
        <h3 className="text-lg font-semibold mb-1 line-clamp-1" data-testid="product-title">{product.title}</h3>
        <p className="text-sm text-gray-400">Seller: {product.seller}</p>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 text-sm">
        <div className="text-gray-300 line-clamp-2 h-10" data-testid="product-description">
          {product.description || "No description available for this product."}
        </div>
        
        {product.rating && (
          <div className="flex items-center mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg 
                key={i}
                className={`w-4 h-4 ${i < product.rating ? "text-infi-gold" : "text-gray-600"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                data-testid={i < product.rating ? "star-filled" : "star-empty"}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-xs text-gray-400" data-testid="product-reviews">({product.reviews || 0} reviews)</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 mt-auto">
        <div className="w-full">
          <div className="flex items-center justify-between mb-3">
            <p className="text-infi-gold font-bold" data-testid="product-price">{product.price}</p>
            {product.originalPrice && (
              <p className="text-gray-500 line-through text-sm" data-testid="product-original-price">{product.originalPrice}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button className="gold-gradient w-full text-xs" data-testid="add-to-cart-button">
              Add to Cart
            </Button>
            <Button variant="outline" className="border-infi-gold/30 hover:bg-infi-gold/10 px-2" data-testid="add-to-wishlist-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
