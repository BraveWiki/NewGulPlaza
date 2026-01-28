// src/components/SeedDatabaseButton.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { seedDatabase } from '@/data/seedDataUrdu';
import { toast } from 'sonner';
import { Loader2, Database } from 'lucide-react';

export function SeedDatabaseButton() {
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeed = async () => {
    if (!confirm('Are you sure you want to seed the database with Urdu data? This will add sample shops, products, and stories.')) {
      return;
    }

    setIsSeeding(true);
    try {
      const result = await seedDatabase();
      toast.success(`Database seeded successfully! Added ${result.shopCount} shops and ${result.productCount} products.`);
    } catch (error) {
      console.error('Seeding error:', error);
      toast.error('Failed to seed database. Check console for details.');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Button 
      onClick={handleSeed} 
      disabled={isSeeding}
      className="gap-2"
      variant="outline"
    >
      {isSeeding ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Seeding...
        </>
      ) : (
        <>
          <Database className="w-4 h-4" />
          Seed Urdu Data
        </>
      )}
    </Button>
  );
}
