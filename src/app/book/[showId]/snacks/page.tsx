"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Coffee, Plus, Minus, Info } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock snacks data
const SNACKS_MENU = [
  { id: '1', name: 'Large Popcorn (Salted)', price: 350, category: 'Popcorn', desc: 'Classic salted popcorn, freshly popped.' },
  { id: '2', name: 'Caramel Popcorn', price: 420, category: 'Popcorn', desc: 'Sweet and crunchy caramel coated popcorn.' },
  { id: '3', name: 'Nachos with Cheese', price: 280, category: 'Snacks', desc: 'Crispy tortillas with melted jalapeño cheese.' },
  { id: '4', name: 'Combo 1 (Popcorn + Coke)', price: 550, category: 'Combos', desc: 'Large Salted Popcorn with 2 Medium Cokes.' },
  { id: '5', name: 'Cold Coffee', price: 200, category: 'Beverages', desc: 'Chilled creamy coffee.' },
  { id: '6', name: 'Fountain Coke', price: 180, category: 'Beverages', desc: 'Refreshing large fountain cola.' },
];

export default function SnacksPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Record<string, number>>({});
  
  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }
      return { ...prev, [id]: next };
    });
  };

  const totalItems = Object.values(cart).reduce((sum, q) => sum + q, 0);
  const totalAmount = Object.entries(cart).reduce((sum, [id, q]) => {
    const item = SNACKS_MENU.find(s => s.id === id);
    return sum + ((item?.price || 0) * q);
  }, 0);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="glass sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-bold">Grab a Bite!</h1>
              <p className="text-xs text-white/60">Pre-book your snacks to skip the queue</p>
            </div>
          </div>
          <Button variant="ghost" className="text-white/60" onClick={() => router.push('/checkout')}>
            Skip
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full p-4 md:p-8 flex flex-col md:flex-row gap-8">
        
        {/* Menu Grid */}
        <div className="flex-1 pb-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SNACKS_MENU.map((snack) => {
              const qty = cart[snack.id] || 0;
              return (
                <div key={snack.id} className="glass p-4 rounded-2xl flex flex-col justify-between hover:bg-white/5 transition-colors">
                  <div className="mb-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mb-3 text-primary">
                      <Coffee className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-lg">{snack.name}</h3>
                    <p className="text-white/60 text-sm mt-1 mb-2 line-clamp-2">{snack.desc}</p>
                    <span className="font-mono font-bold text-lg">₹{snack.price}</span>
                  </div>
                  
                  {qty > 0 ? (
                    <div className="flex items-center justify-between bg-primary/20 rounded-full border border-primary/50 p-1 w-32">
                      <button onClick={() => updateQuantity(snack.id, -1)} className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/80">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold text-primary w-8 text-center">{qty}</span>
                      <button onClick={() => updateQuantity(snack.id, 1)} className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 text-white">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <Button variant="outline" className="w-fit" onClick={() => updateQuantity(snack.id, 1)}>
                      Add to Cart
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="hidden md:block w-[350px] shrink-0 pb-32">
          <div className="glass p-6 rounded-2xl sticky top-24">
            <h2 className="font-bold text-xl mb-4 border-b border-white/10 pb-4">Order Summary</h2>
            
            {totalItems === 0 ? (
              <div className="text-white/40 text-sm flex flex-col items-center py-8 text-center">
                <Coffee className="w-12 h-12 mb-4 opacity-20" />
                No snacks selected
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(cart).map(([id, q]) => {
                  const item = SNACKS_MENU.find(s => s.id === id)!;
                  return (
                    <div key={id} className="flex justify-between items-start text-sm">
                      <div>
                        <div className="font-medium text-white/90">{item.name}</div>
                        <div className="text-white/50 text-xs">₹{item.price} x {q}</div>
                      </div>
                      <div className="font-mono font-bold">₹{item.price * q}</div>
                    </div>
                  );
                })}
                
                <div className="border-t border-white/10 pt-4 mt-4 flex justify-between items-center font-bold text-lg">
                  <span>Total</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile/Sticky Footer */}
      {(totalItems > 0) && (
        <div className="fixed bottom-0 left-0 right-0 glass border-t border-white/10 p-4 animate-in slide-in-from-bottom-full z-40">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold shadow-lg shadow-primary/20">
                {totalItems}
              </div>
              <div className="md:hidden">
                <p className="text-sm text-white/60 mb-0.5">Total Amount</p>
                <p className="text-xl font-bold">₹{totalAmount}</p>
              </div>
              <div className="hidden md:block text-sm text-white/60 ml-2">
                <Info className="w-4 h-4 inline mr-1 mb-0.5" />
                Snacks will be delivered to your seat.
              </div>
            </div>
            
            <Button size="lg" className="px-8 shadow-lg shadow-primary/25" onClick={() => router.push('/checkout')}>
              Proceed <span className="hidden md:inline">&nbsp;to Pay ₹{totalAmount}</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
