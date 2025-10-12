import { Heart, Star, Users } from "lucide-react";

export default function ThankYouCard() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl p-10 mt-10 shadow-lg">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
      </div>
      
      <div className="relative z-10 text-center">
        {/* Logo placeholder */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <span className="text-2xl font-bold text-white">U</span>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold mb-4">Thank you for trusting UsITech 🚀</h2>
        
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-6 leading-relaxed">
          We hope this workflow empowers your automation journey.  
          Stay tuned for more updates and new releases — we&apos;re committed to helping you grow faster.
        </p>
        
        {/* Stats */}
        <div className="flex justify-center gap-8 mt-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Heart className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">Loved by 1,200+ users</span>
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">4.9/5 rating</span>
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Active community</span>
            </div>
          </div>
        </div>
        
        {/* Call to action */}
        <div className="mt-8">
          <p className="text-sm opacity-80">
            Need help? Contact our support team or join our community forum.
          </p>
        </div>
      </div>
    </div>
  );
}
