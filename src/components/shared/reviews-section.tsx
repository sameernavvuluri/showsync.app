"use client";

import { useState } from "react";
import { Star, ThumbsUp, MoreVertical, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
  likes: number;
  isVerified: boolean;
}

const DUMMY_REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Rahul S.",
    rating: 5,
    date: "2 days ago",
    content: "Absolutely mind-blowing experience in IMAX! The visuals and sound design are unparalleled. A must-watch for any sci-fi fan.",
    likes: 124,
    isVerified: true,
  },
  {
    id: "r2",
    author: "Priya M.",
    rating: 4,
    date: "1 week ago",
    content: "Great movie, pacing was a bit slow in the second act but the climax makes up for it entirely. The 3D was decent.",
    likes: 56,
    isVerified: true,
  },
  {
    id: "r3",
    author: "Karan D.",
    rating: 5,
    date: "2 weeks ago",
    content: "Nolan does it again. I've watched it twice already.",
    likes: 312,
    isVerified: false,
  },
];

export function ReviewsSection() {
  const [filter, setFilter] = useState<"top" | "recent">("top");

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Reviews & Ratings</h2>
        <div className="flex bg-white/5 rounded-lg p-1">
          <button 
            onClick={() => setFilter("top")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === "top" ? "bg-white/10 text-white" : "text-white/50 hover:text-white"}`}
          >
            Top
          </button>
          <button 
            onClick={() => setFilter("recent")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === "recent" ? "bg-white/10 text-white" : "text-white/50 hover:text-white"}`}
          >
            Recent
          </button>
        </div>
      </div>

      {/* Aggregate Score */}
      <div className="flex items-center gap-8 mb-10 p-6 glass rounded-2xl border border-white/10">
        <div className="text-center shrink-0">
          <div className="text-5xl font-bold text-white mb-1">4.6</div>
          <div className="flex items-center justify-center gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className={`w-4 h-4 ${s <= 4 ? "fill-yellow-400 text-yellow-400" : s === 5 ? "fill-yellow-400/30 text-yellow-400" : "text-white/20"}`} />
            ))}
          </div>
          <div className="text-xs text-white/50">24.5K Ratings</div>
        </div>
        
        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((star, idx) => (
            <div key={star} className="flex items-center gap-3 text-sm">
              <span className="w-2 font-medium text-white/60">{star}</span>
              <Star className="w-3 h-3 text-white/40" />
              <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-400 rounded-full" 
                  style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 5 : 2}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {DUMMY_REVIEWS.map((review) => (
          <div key={review.id} className="border-b border-white/10 pb-6 last:border-0">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{review.author}</span>
                    {review.isVerified && (
                      <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                        Verified Ticket
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-white/50 flex items-center gap-2">
                    {review.date}
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`w-3 h-3 ${s <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-white/20"}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <button className="text-white/40 hover:text-white transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              {review.content}
            </p>
            
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 text-xs font-medium text-white/50 hover:text-white transition-colors">
                <ThumbsUp className="w-3.5 h-3.5" />
                {review.likes}
              </button>
              <button className="text-xs font-medium text-white/50 hover:text-white transition-colors">
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full mt-6 text-white/60 hover:text-white border-white/10">
        View All 24.5K Reviews
      </Button>
    </div>
  );
}
