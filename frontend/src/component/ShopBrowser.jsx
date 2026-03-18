import React, { useState, useEffect } from 'react';
import { MapPin, Search, Star, Clock, ArrowRight, Navigation, LayoutGrid, Map as MapIcon } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { dummyShops } from '../utils/dummyData';
import { useNavigate } from 'react-router-dom';

// Fix for default Leaflet icon
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom component to handle map center changes
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const ShopBrowser = () => {
  const [shops, setShops] = useState(dummyShops);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState([28.6139, 77.2090]); // Default: Delhi
  const [viewMode, setViewMode] = useState('split'); // 'map', 'list', 'split'
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => console.log("Location access denied", error)
      );
    }
  }, []);

  const filteredShops = shops.filter(shop => 
    shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // User Marker Icon
  const userIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: #3b82f6; width: 15px; height: 15px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>`,
    iconSize: [15, 15],
    iconAnchor: [7, 7]
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-100">
              <Navigation size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Shop Discovery</h1>
              <p className="text-gray-400 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                <MapPin size={14} className="text-orange-500" />
                Find local treasures within 1km
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
             <button 
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50'}`}
             >
                <LayoutGrid size={20} />
             </button>
             <button 
                onClick={() => setViewMode('map')}
                className={`p-3 rounded-xl transition-all ${viewMode === 'map' ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50'}`}
             >
                <MapIcon size={20} />
             </button>
             <div className="w-[1px] h-6 bg-gray-100 mx-2" />
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search shops..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500 transition-all font-bold text-sm min-w-[250px]"
                />
             </div>
          </div>
        </div>

        {/* Map Section */}
        {viewMode !== 'list' && (
          <div className={`w-full overflow-hidden rounded-[2.5rem] shadow-2xl shadow-gray-200 border-8 border-white relative ${viewMode === 'map' ? 'h-[70vh]' : 'h-[400px]'}`}>
            <MapContainer center={userLocation} zoom={15} className="w-full h-full z-10">
              <ChangeView center={userLocation} zoom={15} />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              
              {/* User Location Marker */}
              <Marker position={userLocation} icon={userIcon}>
                <Popup>You are here</Popup>
              </Marker>

              {/* Shop Markers */}
              {filteredShops.map((shop) => (
                <Marker 
                  key={shop.id} 
                  position={[shop.location.lat, shop.location.lng]}
                  eventHandlers={{
                    click: () => {
                      // Optional: Highlight shop in list
                    },
                  }}
                >
                  <Popup>
                    <div className="p-2 min-w-[150px]">
                      <h4 className="font-black text-gray-900">{shop.name}</h4>
                      <p className="text-xs text-gray-500 font-bold uppercase">{shop.category}</p>
                      <button 
                        onClick={() => navigate(`/products?shopId=${shop.id}`)}
                        className="mt-3 w-full bg-orange-500 text-white text-[10px] font-black py-2 rounded-lg uppercase tracking-widest"
                      >
                        Visit Store
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
            
            {/* Map Overlay Button */}
            <div className="absolute bottom-6 left-6 z-[20] flex items-center gap-3">
               <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-white/20 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Scanning Live Zone</span>
               </div>
            </div>
          </div>
        )}

        {/* List Section */}
        {viewMode !== 'map' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mx-2">
               <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                  <div className="w-2 h-6 bg-orange-500 rounded-full" />
                  Stores Near Your Location
               </h2>
               <span className="text-gray-400 font-bold text-sm uppercase tracking-widest">{filteredShops.length} Found</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredShops.map((shop) => (
                <div 
                  key={shop.id} 
                  className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={shop.image} 
                      alt={shop.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-black text-gray-900 text-xs">{shop.rating}</span>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 border border-white/10">
                      <Clock size={14} className="text-white" />
                      <span className="font-bold text-white text-[10px] uppercase tracking-tighter">{shop.deliveryTime}</span>
                    </div>
                  </div>

                  <div className="p-7">
                    <h3 className="text-xl font-black text-gray-900 group-hover:text-orange-600 transition-colors mb-2">{shop.name}</h3>
                    <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-6">
                      <span className="text-orange-500 bg-orange-50 px-2 py-0.5 rounded-md">{shop.category}</span>
                      <span className="w-1 h-1 bg-gray-200 rounded-full" />
                      <span>{shop.distance}</span>
                    </div>

                    <button 
                      onClick={() => navigate(`/products?shopId=${shop.id}`)}
                      className="w-full py-4 bg-gray-50 hover:bg-orange-500 rounded-2xl flex items-center justify-center gap-2 group/btn transition-all duration-300 active:scale-95"
                    >
                      <span className="font-black text-gray-800 group-hover/btn:text-white transition-colors uppercase text-xs tracking-widest">Shop Now</span>
                      <ArrowRight size={18} className="text-orange-500 group-hover/btn:text-white transition-all group-hover/btn:translate-x-1" />
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
};

export default ShopBrowser;
