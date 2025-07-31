import { Play } from "lucide-react";
import { Card } from "@/components/ui/card";

interface InfluencerVideoProps {
  title: string;
  influencer: string;
  duration: string;
  thumbnail: string;
}

export const InfluencerVideo = ({ title, influencer, duration, thumbnail }: InfluencerVideoProps) => {
  return (
    <Card className="relative overflow-hidden group cursor-pointer">
      <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 text-primary ml-1" fill="currentColor" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
          {duration}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-muted-foreground">by {influencer}</p>
      </div>
    </Card>
  );
};