"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, Ticket, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

const CANCELLATION_RULES = [
  { label: "More than 3 hours before show", refund: "100% refund", color: "text-green-400" },
  { label: "1 – 3 hours before show", refund: "50% refund", color: "text-yellow-400" },
  { label: "Less than 1 hour before show", refund: "No refund", color: "text-red-400" },
];

export default function CancellationPage() {
  const router = useRouter();
  const [step, setStep] = useState<"confirm" | "success">("confirm");
  const [loading, setLoading] = useState(false);

  const booking = {
    id: "BK-1204",
    movie: "Interstellar: The IMAX Experience",
    show: "Today • 07:30 PM",
    theatre: "PVR: Director's Cut, Ambience Mall",
    seats: "B-5, B-6 (Platinum)",
    total: 1175,
    refundAmount: 1175,
    refundPercent: 100,
  };

  const handleCancel = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    setStep("success");
  };

  if (step === "success") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6">
          <Ticket className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Cancellation Successful</h1>
        <p className="text-white/60 max-w-md mb-2">
          Your booking <span className="font-mono text-white">{booking.id}</span> has been cancelled.
        </p>
        <p className="text-green-400 font-medium mb-8">
          ₹{booking.refundAmount} will be refunded within 5-7 business days.
        </p>
        <Button onClick={() => router.push("/")} size="lg">Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-4 py-12">
      <div className="w-full max-w-lg">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-6 gap-2 text-white/60 hover:text-white">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>

        <h1 className="text-3xl font-bold mb-8">Cancel Booking</h1>

        {/* Booking Card */}
        <div className="glass p-6 rounded-2xl border border-white/10 mb-6">
          <h2 className="text-lg font-bold mb-1">{booking.movie}</h2>
          <div className="space-y-1.5 text-sm text-white/60 mb-4">
            <p className="flex items-center gap-2"><Clock className="w-4 h-4" />{booking.show}</p>
            <p>{booking.theatre}</p>
            <p className="font-medium text-white/90">Seats: {booking.seats}</p>
          </div>
          <div className="border-t border-white/10 pt-4 flex justify-between font-bold">
            <span>Amount Paid</span>
            <span className="font-mono">₹{booking.total}</span>
          </div>
        </div>

        {/* Refund Info */}
        <div className="glass p-6 rounded-2xl border border-white/10 mb-6">
          <h3 className="font-bold mb-4">Refund Policy</h3>
          <div className="space-y-3">
            {CANCELLATION_RULES.map((rule) => (
              <div key={rule.label} className="flex justify-between items-center text-sm">
                <span className="text-white/60">{rule.label}</span>
                <span className={`font-medium ${rule.color}`}>{rule.refund}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
            <p className="text-green-400 font-semibold text-sm">
              You are eligible for a <span className="text-lg font-bold">100% refund</span>
            </p>
            <p className="text-green-300/60 text-xs mt-0.5">Show starts in more than 3 hours</p>
          </div>
        </div>

        {/* Warning */}
        <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl mb-8 text-sm text-yellow-300">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>This action cannot be undone. Once cancelled, your seats will be released for others to book.</p>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" className="flex-1" onClick={() => router.back()}>
            Keep Booking
          </Button>
          <Button
            className="flex-1 bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/20"
            onClick={handleCancel}
            disabled={loading}
          >
            {loading ? "Cancelling..." : `Cancel & Refund ₹${booking.refundAmount}`}
          </Button>
        </div>
      </div>
    </div>
  );
}
