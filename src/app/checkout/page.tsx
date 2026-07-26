"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, Ticket, Coffee, ShieldCheck, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Script from "next/script";

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Mock summary data
  const amount = {
    tickets: 700,
    snacks: 350,
    taxes: 125,
    total: 1175
  };

  const handlePayment = async () => {
    setLoading(true);
    
    // Simulate API call and Razorpay initialization
    setTimeout(() => {
      // Assuming payment success -> redirect to ticket
      const ticketId = "TXN-" + Math.floor(Math.random() * 1000000);
      router.push(`/ticket/${ticketId}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-4 py-12">
      {/* Razorpay Script - ready for real integration */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <div className="w-full max-w-2xl">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-6 gap-2 text-white/60 hover:text-white">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Order Summary */}
          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl">
              <h2 className="text-lg font-bold mb-4 border-b border-white/10 pb-4">Booking Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <Ticket className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold text-white/90">Interstellar: IMAX</p>
                      <p className="text-sm text-white/60">2 Tickets (B-5, B-6)</p>
                    </div>
                  </div>
                  <span className="font-mono">₹{amount.tickets}</span>
                </div>

                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <Coffee className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold text-white/90">Food & Beverages</p>
                      <p className="text-sm text-white/60">Large Popcorn</p>
                    </div>
                  </div>
                  <span className="font-mono">₹{amount.snacks}</span>
                </div>

                <div className="border-t border-dashed border-white/20 pt-4 mt-4 flex justify-between items-center text-white/60 text-sm">
                  <span>Convenience Fee & Taxes</span>
                  <span className="font-mono">₹{amount.taxes}</span>
                </div>
              </div>

              <div className="border-t border-white/10 mt-4 pt-4 flex justify-between items-center bg-primary/10 -mx-6 -mb-6 p-6 rounded-b-2xl">
                <span className="font-bold text-lg">Total Payable</span>
                <span className="font-bold text-2xl font-mono">₹{amount.total}</span>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl">
              <h2 className="text-lg font-bold mb-4">Payment Method</h2>
              
              <div className="space-y-3 mb-6">
                <div className="border border-primary bg-primary/10 rounded-xl p-4 flex items-center gap-3 cursor-pointer">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <span className="font-medium">Credit / Debit Card</span>
                </div>
                <div className="border border-white/10 bg-black/40 hover:bg-white/5 rounded-xl p-4 flex items-center gap-3 cursor-pointer transition-colors">
                  <div className="w-5 h-5 flex items-center justify-center font-bold text-white/60 text-xs border border-white/40 rounded">UPI</div>
                  <span className="font-medium text-white/80">UPI / QR Code</span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-green-500/10 text-green-400 p-4 rounded-xl text-sm mb-6 border border-green-500/20">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <p>Safe and secure payments. 100% Authentic transactions.</p>
              </div>

              <Button size="lg" className="w-full text-lg shadow-lg shadow-primary/25" onClick={handlePayment} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...
                  </>
                ) : (
                  `Pay ₹${amount.total}`
                )}
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
