import { Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-semibold">Lumina Fact</span>
            <span>&copy; {new Date().getFullYear()} - All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}
