"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit2, Trash2, Coffee } from "lucide-react";

export default function AdminSnacks() {
  const snacks = [
    { id: "1", name: "Large Popcorn (Salted)", category: "Popcorn", price: 350, available: true },
    { id: "2", name: "Caramel Popcorn", category: "Popcorn", price: 420, available: true },
    { id: "3", name: "Nachos with Cheese", category: "Snacks", price: 280, available: true },
    { id: "4", name: "Combo 1 (Popcorn + Coke)", category: "Combos", price: 550, available: true },
    { id: "5", name: "Cold Coffee", category: "Beverages", price: 200, available: false },
    { id: "6", name: "Fountain Coke", category: "Beverages", price: 180, available: true },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Manage Snacks</h1>
          <p className="text-white/60">Add, edit, or toggle availability of food & beverage items.</p>
        </div>
        <Button className="gap-2 shrink-0"><Plus className="w-4 h-4" /> Add Item</Button>
      </div>

      <div className="glass rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-4 border-b border-white/10 flex gap-4 justify-between items-center bg-black/20">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input className="pl-9 bg-black/40 border-white/10" placeholder="Search menu items..." />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-white/40 uppercase bg-black/40">
              <tr>
                <th className="px-6 py-4">Item</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {snacks.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <Coffee className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-semibold">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white/60">{item.category}</td>
                  <td className="px-6 py-4 font-mono">₹{item.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.available ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/60'
                    }`}>
                      {item.available ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white/60 hover:text-white">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white/60 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
