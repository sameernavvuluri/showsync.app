"use client";

import { useState } from "react";
import { MapPin, Star, ThumbsUp, Map, Navigation, Car, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Theatre Data
const theatre = {
  name: "PVR: Director's Cut, Ambience Mall",
  location: "Ambience Mall, Vasant Kunj, New Delhi",
  distance: "2.4 km away",
  rating: 4.8,
  totalReviews: 1240,
  facilities: ["Parking Available", "Food Court", "Wheelchair Accessible", "Recliner Seats", "Dolby Atmos"],
  gallery: {
    inside: [
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop",
    ],
    outside: [
      "https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  reviews: [
    { id: 1, user: "Rahul S.", rating: 5, date: "2 days ago", text: "Amazing sound quality and the recliner seats are incredibly comfortable. Best IMAX experience in the city!" },
    { id: 2, user: "Priya M.", rating: 4, date: "1 week ago", text: "Great theatre, clean washrooms. The food is a bit overpriced but the service to the seat is fast." },
    { id: 3, user: "Amit K.", rating: 5, date: "2 weeks ago", text: "Perfect family outing. The 3D glasses were clean and the screen brightness was perfect." }
  ]
};

export default function TheatreDetails() {
  const [activeTab, setActiveTab] = useState<'info' | 'reviews'>('info');
  const [galleryView, setGalleryView] = useState<'inside' | 'outside'>('inside');

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      
      {/* Gallery Header */}
      <div className="relative w-full flex flex-col">
        <div className="relative h-[40vh] md:h-[50vh] w-full flex overflow-x-auto snap-x scrollbar-hide">
          {theatre.gallery[galleryView].map((img, idx) => (
            <div key={idx} className="min-w-full h-full snap-start relative">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
              <img src={img} alt={`Theatre Gallery ${galleryView}`} className="w-full h-full object-cover" />
            </div>
          ))}
          
          {/* View Toggle */}
          <div className="absolute top-6 right-6 z-20 flex bg-black/50 backdrop-blur-md rounded-lg p-1 border border-white/10">
            <button 
              onClick={() => setGalleryView('inside')}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors ${galleryView === 'inside' ? 'bg-primary text-white' : 'text-white/60 hover:text-white'}`}
            >
              Inside
            </button>
            <button 
              onClick={() => setGalleryView('outside')}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors ${galleryView === 'outside' ? 'bg-primary text-white' : 'text-white/60 hover:text-white'}`}
            >
              Outside
            </button>
          </div>
          
          {/* Theatre Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-20 max-w-5xl mx-auto px-4 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-2">{theatre.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {theatre.location}</span>
                <span className="flex items-center gap-1 text-primary"><Star className="w-4 h-4 fill-primary" /> {theatre.rating}/5</span>
              </div>
            </div>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(theatre.location)}`} target="_blank" rel="noreferrer">
              <Button className="gap-2 shrink-0"><Navigation className="w-4 h-4" /> Get Directions</Button>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-8">
        
        {/* Tabs */}
        <div className="flex gap-8 border-b border-white/10 mb-8">
          <button 
            className={`pb-4 text-sm font-medium transition-colors ${activeTab === 'info' ? 'text-primary border-b-2 border-primary' : 'text-white/60 hover:text-white'}`}
            onClick={() => setActiveTab('info')}
          >
            Info & Map
          </button>
          <button 
            className={`pb-4 text-sm font-medium transition-colors ${activeTab === 'reviews' ? 'text-primary border-b-2 border-primary' : 'text-white/60 hover:text-white'}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({theatre.totalReviews})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'info' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              {/* About & Facilities */}
              <section>
                <h2 className="text-xl font-bold mb-4">Facilities</h2>
                <div className="flex flex-wrap gap-3">
                  {theatre.facilities.map((facility, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm">
                      {facility.includes('Park') && <Car className="w-4 h-4 text-primary" />}
                      {facility.includes('Food') && <Coffee className="w-4 h-4 text-primary" />}
                      {facility}
                    </div>
                  ))}
                </div>
              </section>

              {/* Map Integration */}
              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Map className="w-5 h-5 text-primary" /> Location & Directions
                </h2>
                <div className="w-full h-[350px] bg-white/5 rounded-2xl border border-white/10 overflow-hidden relative group">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    loading="lazy" 
                    allowFullScreen 
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(theatre.location)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  />
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="glass p-6 rounded-2xl">
                <h3 className="font-bold mb-2">Distance</h3>
                <p className="text-white/60 text-sm mb-4">{theatre.distance} from your location</p>
                
                <h3 className="font-bold mb-2">Cancellation Policy</h3>
                <p className="text-white/60 text-sm space-y-1">
                  <span className="block">• 100% refund up to 3 hours before</span>
                  <span className="block">• 50% refund 1-3 hours before</span>
                  <span className="block">• No refund &lt; 1 hour</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Reviews Section */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">User Reviews</h2>
                <p className="text-white/60 text-sm">Only verified attendees can write a review.</p>
              </div>
              <Button variant="outline">Write a Review</Button>
            </div>

            <div className="grid gap-4">
              {theatre.reviews.map((review) => (
                <div key={review.id} className="glass p-6 rounded-2xl border border-white/10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                        {review.user.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{review.user}</div>
                        <div className="text-xs text-white/40">{review.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded text-sm">
                      <Star className="w-3 h-3 fill-primary text-primary" /> {review.rating}
                    </div>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed mb-4">"{review.text}"</p>
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1 text-xs text-white/40 hover:text-primary transition-colors">
                      <ThumbsUp className="w-3 h-3" /> Helpful
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
