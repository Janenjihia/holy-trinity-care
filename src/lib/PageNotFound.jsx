import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-md w-full text-center">
        <h1 className="font-display text-8xl text-accent/30 mb-4">404</h1>
        <div className="h-0.5 w-16 bg-border mx-auto mb-8" />
        <h2 className="font-display text-2xl text-foreground mb-3">Page Not Found</h2>
        <p className="font-body text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-body font-semibold rounded-full px-8 min-h-[48px]">
            <Home className="mr-2 w-4 h-4" /> Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}