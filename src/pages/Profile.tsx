
import { useState, useEffect } from 'react';
import { User, LogOut, MapPin, ShoppingBag, Bell, HelpCircle, Settings } from 'lucide-react';
import { Motion } from '@/components/ui/motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { cn } from '@/lib/utils';
import { applyMicroInteraction } from '@/utils/animations';
import LazyImage from '@/components/ui/LazyImage';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { getItemCount } = useCart();

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const ProfileItem = ({ icon, title, onClick }: { icon: React.ReactNode, title: string, onClick?: () => void }) => (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 p-4 rounded-lg hover:bg-secondary",
        "transition-all duration-200",
        applyMicroInteraction('hover')
      )}
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <span className="font-medium">{title}</span>
    </button>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar title="Profile" />
        <div className="layout-container py-20">
          <div className="animate-pulse space-y-4">
            <div className="w-full h-32 rounded-xl bg-muted"></div>
            <div className="w-2/3 h-6 rounded-md bg-muted"></div>
            <div className="w-1/2 h-4 rounded-md bg-muted"></div>
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full h-16 rounded-lg bg-muted"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar title="Profile" />
      
      <div className="layout-container pt-20 pb-24">
        <Motion animation="fade-in" className="space-y-6">
          {/* Profile Header */}
          <div className="flex flex-col items-center sm:flex-row sm:items-start sm:gap-6 p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/40">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-background mb-4 sm:mb-0">
              <LazyImage 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="text-center sm:text-left">
              <h1 className="text-xl font-bold">John Doe</h1>
              <p className="text-muted-foreground mb-2">john.doe@example.com</p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">New York, USA</span>
              </div>
              
              <button
                className={cn(
                  "px-4 py-2 text-sm rounded-lg border border-border",
                  "hover:bg-secondary transition-colors duration-200",
                  applyMicroInteraction('click')
                )}
              >
                Edit Profile
              </button>
            </div>
          </div>
          
          {/* Profile Statistics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-background/50 backdrop-blur-sm border border-border/40 p-4 text-center">
              <p className="text-2xl font-bold">{getItemCount()}</p>
              <p className="text-xs text-muted-foreground">Items in Cart</p>
            </div>
            <div className="rounded-xl bg-background/50 backdrop-blur-sm border border-border/40 p-4 text-center">
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-muted-foreground">Past Orders</p>
            </div>
            <div className="rounded-xl bg-background/50 backdrop-blur-sm border border-border/40 p-4 text-center">
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-muted-foreground">Saved Addresses</p>
            </div>
          </div>
          
          {/* Profile Menu */}
          <div className="rounded-xl bg-background/50 backdrop-blur-sm border border-border/40 p-2">
            <div className="space-y-1">
              <ProfileItem 
                icon={<ShoppingBag className="w-5 h-5" />} 
                title="My Orders" 
                onClick={() => navigate('/orders')}
              />
              
              <ProfileItem 
                icon={<MapPin className="w-5 h-5" />} 
                title="Saved Addresses" 
                onClick={() => navigate('/addresses')}
              />
              
              <ProfileItem 
                icon={<Bell className="w-5 h-5" />} 
                title="Notifications" 
                onClick={() => navigate('/notifications')}
              />
              
              <Separator className="my-2" />
              
              <ProfileItem 
                icon={<HelpCircle className="w-5 h-5" />} 
                title="Help & Support" 
                onClick={() => navigate('/support')}
              />
              
              <ProfileItem 
                icon={<Settings className="w-5 h-5" />} 
                title="Settings" 
                onClick={() => navigate('/settings')}
              />
              
              <ProfileItem 
                icon={<LogOut className="w-5 h-5" />} 
                title="Log Out" 
                onClick={() => alert('Logging out would clear the session in a real app')}
              />
            </div>
          </div>
        </Motion>
      </div>
    </div>
  );
};

export default Profile;
