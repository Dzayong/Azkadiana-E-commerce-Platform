import { useState } from 'react';
import { 
  ShoppingBag, 
  LayoutDashboard, 
  Package, 
  Users, 
  LogOut, 
  X, 
  ShoppingCart, 
  User, 
  Truck, 
  CreditCard, 
  Search, 
  Plus, 
  QrCode, 
  Printer, 
  TrendingUp,
  ChevronDown,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
// Role: 'Customer' | 'Admin' | 'Warehouse' | 'Owner'

// --- Mock Data ---
const PRODUCTS = [
  { 
    id: '1', 
    name: 'Zahra Silk Abaya', 
    price: 850000, 
    image: 'https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?q=80&w=800&auto=format&fit=crop', 
    category: 'Abaya', 
    stock: 12 
  },
  { 
    id: '2', 
    name: 'Noor Satin Hijab', 
    price: 150000, 
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=800&auto=format&fit=crop', 
    category: 'Hijab', 
    stock: 45 
  },
  { 
    id: '3', 
    name: 'Laila Linen Set', 
    price: 920000, 
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800&auto=format&fit=crop', 
    category: 'Set', 
    stock: 8 
  },
  { 
    id: '4', 
    name: 'Amira Embroidered Kaftan', 
    price: 1200000, 
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=800&auto=format&fit=crop', 
    category: 'Kaftan', 
    stock: 5 
  },
  { 
    id: '5', 
    name: 'Daria Pleated Skirt', 
    price: 450000, 
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=800&auto=format&fit=crop', 
    category: 'Skirt', 
    stock: 20 
  },
  { 
    id: '6', 
    name: 'Safiya Prayer Set', 
    price: 550000, 
    image: 'https://images.unsplash.com/photo-1590735213920-68192a487bc2?q=80&w=800&auto=format&fit=crop', 
    category: 'Prayer', 
    stock: 15 
  },
];

const ORDERS = [
  { id: 'ORD-001', customerName: 'Fatimah Az-Zahra', date: '2024-03-20', total: 1000000, status: 'Paid', items: ['Zahra Silk Abaya', 'Noor Satin Hijab'] },
  { id: 'ORD-002', customerName: 'Aisha Rahma', date: '2024-03-21', total: 450000, status: 'Unpaid', items: ['Daria Pleated Skirt'] },
  { id: 'ORD-003', customerName: 'Siti Nurhaliza', date: '2024-03-21', total: 920000, status: 'Processing', items: ['Laila Linen Set'] },
];

// --- Sidebar ---
const Sidebar = ({ role, setRole, activeTab, setActiveTab }) => {
  const getNavItems = () => {
    switch(role) {
      case 'Owner':
        return [
          { id: 'analytics', label: 'Analytics', icon: TrendingUp },
          { id: 'orders', label: 'All Orders', icon: ShoppingBag },
          { id: 'users', label: 'Staff Management', icon: Users },
        ];
      case 'Admin':
        return [
          { id: 'orders', label: 'Order Management', icon: ShoppingBag },
          { id: 'products', label: 'Product Catalog', icon: Package },
          { id: 'customers', label: 'Customers', icon: Users },
        ];
      case 'Warehouse':
        return [
          { id: 'inventory', label: 'Inventory', icon: Package },
          { id: 'shipping', label: 'Shipping Labels', icon: Truck },
        ];
      default:
        return [
          { id: 'shop', label: 'Belanja', icon: ShoppingBag },
          { id: 'profile', label: 'Profil Saya', icon: User },
        ];
    }
  };

  return (
    <div className="w-64 glass-sidebar h-screen flex-col hidden md:flex sticky top-0 px-8 py-10 shrink-0">
      <div className="mb-12">
        <h1 className="text-2xl font-bold tracking-[0.2em] text-brand-green uppercase">Azkadiena</h1>
        <p className="text-[10px] uppercase tracking-widest text-brand-rose mt-1">Premium Modest Wear</p>
      </div>
      
      <nav className="flex-1 space-y-8">
        <div className="space-y-4">
          <label className="label-micro">Navigation</label>
          <ul className="space-y-3">
            {getNavItems().map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-3 transition-colors w-full text-left ${
                    activeTab === item.id 
                      ? 'text-brand-green font-medium' 
                      : 'text-brand-green/60 hover:text-brand-green'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${activeTab === item.id ? 'bg-brand-green' : 'border border-brand-green/30'}`} />
                  <span className="text-sm">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="mt-auto pt-6 border-t border-brand-tan/20">
        <div className="p-4 bg-brand-rose/10 rounded-xl border border-brand-rose/20">
          <p className="text-[10px] text-brand-rose italic">Logged in as</p>
          <p className="text-sm font-semibold text-brand-green">{role}</p>
        </div>
        <button onClick={() => setRole('Customer')} className="w-full flex items-center space-x-3 mt-4 text-brand-rose/60 hover:text-red-500 transition-all text-xs font-bold uppercase tracking-widest">
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

// --- Mobile Nav ---
const MobileNav = ({ role, activeTab, setActiveTab, onMenuOpen }) => {
  const getNavItems = () => {
    switch(role) {
      case 'Owner': return [
        { id: 'analytics', label: 'Analytics', icon: TrendingUp },
        { id: 'orders', label: 'Orders', icon: ShoppingBag },
        { id: 'users', label: 'Staff', icon: Users },
      ];
      case 'Admin': return [
        { id: 'orders', label: 'Orders', icon: ShoppingBag },
        { id: 'products', label: 'Products', icon: Package },
        { id: 'customers', label: 'Customers', icon: Users },
      ];
      case 'Warehouse': return [
        { id: 'inventory', label: 'Inventory', icon: Package },
        { id: 'shipping', label: 'Shipping', icon: Truck },
      ];
      default: return [
        { id: 'shop', label: 'Belanja', icon: ShoppingBag },
        { id: 'profile', label: 'Profil', icon: User },
      ];
    }
  };

  if (role === 'Customer') return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-brand-tan/20 flex items-center justify-around px-4 py-3">
      {getNavItems().map(item => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-colors ${
            activeTab === item.id ? 'text-brand-green' : 'text-brand-tan'
          }`}
        >
          <item.icon size={20} />
          <span className="text-[9px] font-bold uppercase tracking-wider">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

// --- Role Switcher ---
const RoleSwitcher = ({ currentRole, setRole }) => {
  return (
    <div className="fixed bottom-6 right-4 md:right-6 z-50 flex flex-col space-y-2 group">
      <div className="hidden group-hover:flex flex-col space-y-2 mb-2 items-end">
        {(['Owner', 'Admin', 'Warehouse', 'Customer']).map(role => (
          <button
            key={role}
            onClick={() => setRole(role)}
            className={`px-4 py-2 rounded-full shadow-xl text-[10px] font-bold tracking-widest uppercase transition-all border ${
              currentRole === role 
                ? 'bg-brand-green text-white border-brand-green' 
                : 'bg-white/80 backdrop-blur-sm text-brand-dark border-brand-tan/20 hover:bg-brand-beige'
            }`}
          >
            {role}
          </button>
        ))}
      </div>
      <button className="w-12 h-12 bg-brand-green text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all ml-auto">
        <LayoutDashboard size={24} />
      </button>
    </div>
  );
};

// --- Landing Page ---
const LandingPage = ({ onStart }) => (
  <div className="relative min-h-screen flex items-center px-6 md:px-20 overflow-hidden bg-brand-beige">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?q=80&w=1600&auto=format&fit=crop" 
        alt="Hero background muslimah"
        className="w-full h-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-beige via-brand-beige/80 to-transparent"></div>
    </div>
    
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative z-10 max-w-2xl w-full py-16"
    >
      <span className="text-brand-rose uppercase tracking-[0.3em] text-xs font-bold">AZKADIANA COLLECTION</span>
      <h1 className="text-5xl md:text-7xl lg:text-8xl text-brand-green leading-tight mt-4 mb-10">
        Keanggunan <br />
        <span className="italic font-light text-brand-dark">dalam Kesederhanaan</span>
      </h1>
      <button onClick={onStart} className="btn-primary">
        Mulai Belanja
      </button>

      <div className="mt-12 hidden lg:flex gap-4">
        <div className="w-40 h-48 rounded-[40px] bg-brand-rose/20 border border-white/40 flex items-center justify-center text-brand-rose text-[10px] uppercase tracking-widest rotate-2">Silk Scarf</div>
        <div className="w-40 h-48 rounded-[40px] bg-brand-green/10 border border-white/40 flex items-center justify-center text-brand-green text-[10px] uppercase tracking-widest -rotate-2 mt-12">Abaya Pro</div>
      </div>
    </motion.div>
  </div>
);

// --- Shop Page ---
const ShopPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [search, setSearch] = useState('');

  if (showCheckout) return <CheckoutView onBack={() => setShowCheckout(false)} />;

  const filtered = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 lg:p-12 pb-20 md:pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 border-b border-brand-tan/20 pb-6 md:pb-8 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl text-brand-green leading-tight">Catalog Showcase</h2>
          <p className="text-brand-rose italic mt-2 text-sm md:text-base">Gaya elegan untuk setiap momen spesial</p>
        </div>
        <div className="relative w-full md:w-auto">
          <input 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-brand-tan/20 focus:outline-none focus:ring-1 focus:ring-brand-green w-full md:w-72 text-sm" 
            placeholder="Search collection..." 
          />
          <Search className="absolute left-3 top-2.5 text-brand-tan" size={18} />
          <span className="absolute -top-5 right-1 text-[10px] text-brand-rose uppercase tracking-widest font-bold hidden md:block">{filtered.length} Items Found</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {filtered.map((product, idx) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="group"
          >
            <div className="relative overflow-hidden rounded-[32px] md:rounded-[40px] aspect-[4/5] mb-4 md:mb-6 p-3 md:p-4 bg-white/40 border border-brand-tan/10 shadow-sm transition-all hover:shadow-xl hover:border-brand-tan/30">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover rounded-[24px] md:rounded-[32px] transition-transform duration-700 group-hover:scale-105" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-brand-green/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-8">
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="bg-white text-brand-green px-6 md:px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform"
                >
                  Quick View
                </button>
              </div>
            </div>
            <div className="px-2 flex justify-between items-start">
              <div className="flex-1 min-w-0 mr-3">
                <p className="label-micro">{product.category}</p>
                <h3 className="text-lg md:text-xl text-brand-green mt-1 leading-tight">{product.name}</h3>
                <p className="font-bold text-brand-dark/60 mt-1 text-sm md:text-base">Rp {product.price.toLocaleString('id-ID')}</p>
              </div>
              <button 
                onClick={() => setShowLoginModal(true)} 
                className="btn-outline !p-0 rounded-full w-10 h-10 flex items-center justify-center shrink-0 mt-1"
              >
                <Plus size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginModal(false)}
              className="absolute inset-0 bg-brand-green/20 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white p-8 md:p-10 rounded-[32px] md:rounded-[40px] shadow-2xl max-w-sm w-full text-center border border-brand-tan/30"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-beige rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 border border-brand-tan/20">
                <User className="text-brand-green" size={28} />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif text-brand-green mb-3">Member Exclusive</h3>
              <p className="text-sm text-brand-rose mb-8 md:mb-10 leading-relaxed font-medium">Bergabunglah dengan komunitas Azkadiena untuk akses koleksi eksklusif.</p>
              <div className="space-y-4">
                <button 
                  onClick={() => {
                    setShowLoginModal(false);
                    setShowCheckout(true);
                  }}
                  className="btn-primary w-full"
                >
                  Confirm (Join now)
                </button>
                <button onClick={() => setShowLoginModal(false)} className="w-full text-[10px] font-black uppercase tracking-[0.2em] text-brand-tan hover:text-brand-green transition-colors py-2">
                  Maybe Later
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Checkout View ---
const CheckoutView = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);

  if (success) return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-8">
      <div className="w-20 h-20 md:w-24 md:h-24 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mb-8 border border-brand-green/20">
        <Truck size={36} />
      </div>
      <h2 className="text-3xl md:text-4xl font-serif text-brand-green mb-4">Timeless Arrival</h2>
      <p className="text-brand-rose mb-10 max-w-xs font-medium italic text-sm md:text-base">Pesanan Anda sedang dalam perjalanan menuju keanggunan baru.</p>
      <button onClick={onBack} className="btn-primary">Return to Boutique</button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 lg:p-12 flex flex-col md:flex-row gap-8 md:gap-12 pb-20 md:pb-12">
      <div className="flex-1 min-w-0">
        <button onClick={onBack} className="flex items-center space-x-2 text-brand-rose mb-8 md:mb-12 hover:text-brand-green transition-colors uppercase tracking-widest text-[10px] font-black">
          <X size={16} />
          <span>Cancel Session</span>
        </button>

        <div className="flex items-center space-x-4 mb-10 md:mb-16 flex-wrap gap-y-2">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${step >= s ? 'bg-brand-green text-white shadow-lg' : 'bg-white border border-brand-tan/30 text-brand-tan'}`}>
                {s}
              </div>
              {s === 1 && <div className={`w-12 md:w-16 h-px mx-3 md:mx-4 ${step > 1 ? 'bg-brand-green' : 'bg-brand-tan/30'}`} />}
            </div>
          ))}
          <span className="text-xl md:text-2xl font-serif text-brand-green">{step === 1 ? 'Personal Details' : 'Payment Portal'}</span>
        </div>

        {step === 1 ? (
          <form className="space-y-8 md:space-y-10" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <div className="space-y-3 md:space-y-4">
                <label className="label-micro">Full Name</label>
                <input required className="input-editorial w-full" placeholder="Your name..." />
              </div>
              <div className="space-y-3 md:space-y-4">
                <label className="label-micro">WhatsApp No.</label>
                <input required className="input-editorial w-full" placeholder="+62..." />
              </div>
            </div>
            <div className="space-y-3 md:space-y-4">
              <label className="label-micro">Destination Address</label>
              <textarea required className="input-editorial min-h-[80px] w-full" placeholder="Shipping details..." />
            </div>
            <div className="space-y-3 md:space-y-4">
              <label className="label-micro">Email Address</label>
              <input required type="email" className="input-editorial w-full" placeholder="email@gmail.com" />
            </div>
            <button type="submit" className="btn-primary w-full !rounded-xl">Continue to Checkout</button>
          </form>
        ) : (
          <div className="space-y-4">
            <button onClick={() => setSuccess(true)} className="w-full flex items-center justify-between px-6 md:px-8 py-4 md:py-5 bg-white border border-brand-tan/20 rounded-2xl hover:border-brand-green group transition-all">
              <div className="flex items-center space-x-4">
                <CreditCard className="text-brand-green shrink-0" size={20} />
                <span className="font-bold text-sm tracking-widest uppercase">Bank Transfer</span>
              </div>
              <ChevronDown className="text-brand-tan group-hover:text-brand-green transition-transform group-hover:rotate-180 shrink-0" size={18} />
            </button>
            <button onClick={() => setSuccess(true)} className="w-full flex items-center justify-between px-6 md:px-8 py-4 md:py-5 bg-white border border-brand-tan/20 rounded-2xl hover:border-brand-green group transition-all">
              <div className="flex items-center space-x-4">
                <ShoppingCart className="text-brand-green shrink-0" size={20} />
                <span className="font-bold text-sm tracking-widest uppercase">Digital Wallet</span>
              </div>
              <ChevronDown className="text-brand-tan group-hover:text-brand-green shrink-0" size={18} />
            </button>
          </div>
        )}
      </div>

      <div className="w-full md:w-80 shrink-0">
        <div className="bg-brand-green rounded-[28px] md:rounded-[32px] p-6 md:p-8 text-white flex flex-col justify-between min-h-[240px] md:min-h-[300px] shadow-2xl">
          <div className="space-y-4 md:space-y-6">
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-70 font-black">Order Summary</p>
            <div className="space-y-3 md:space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="opacity-60">Subtotal</span>
                <span>Rp1.240k</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="opacity-60">Arrival Fee</span>
                <span className="italic">Free</span>
              </div>
            </div>
          </div>
          <div className="space-y-4 md:space-y-6 pt-6 md:pt-8 border-t border-white/10">
            <div className="flex justify-between items-end">
              <span className="text-[10px] uppercase font-bold tracking-widest">Total</span>
              <span className="text-2xl md:text-3xl font-serif">Rp1.240.000</span>
            </div>
            {step === 2 && (
              <button 
                onClick={() => setSuccess(true)}
                className="w-full py-3 md:py-4 bg-white text-brand-green text-xs font-black uppercase tracking-[0.2em] rounded-xl hover:bg-brand-beige transition-all"
              >
                Confirm Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Admin Dashboard ---
const AdminDashboard = () => {
  const [orders, setOrders] = useState(ORDERS);

  const updateStatus = (id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <div className="p-4 md:p-8 pb-20 md:pb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl text-brand-green">Order Portal</h2>
          <p className="text-brand-rose italic mt-2 text-sm">Monitoring premium customer transactions</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 md:px-6 py-2 bg-brand-rose text-white text-[10px] font-bold uppercase rounded-full shadow-lg shadow-brand-rose/20">Admin View</button>
          <button className="px-4 md:px-6 py-2 bg-white text-brand-rose text-[10px] font-bold uppercase rounded-full border border-brand-tan/40">Reports</button>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-2xl p-5 border border-brand-tan/20 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-bold text-brand-green">{order.customerName}</p>
                <p className="text-[10px] text-brand-rose italic font-mono mt-0.5">{order.id} · {order.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                order.status === 'Paid' ? 'bg-green-100 text-green-700' :
                order.status === 'Unpaid' ? 'bg-brand-rose/10 text-brand-rose' :
                'bg-blue-100 text-blue-700'
              }`}>{order.status}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-brand-tan/10">
              <p className="font-bold text-brand-dark">Rp {order.total.toLocaleString('id-ID')}</p>
              <select 
                value={order.status}
                onChange={(e) => updateStatus(order.id, e.target.value)}
                className="bg-brand-beige/50 border border-brand-tan/20 text-[10px] font-bold uppercase rounded-lg px-3 py-1.5 outline-none focus:ring-1 focus:ring-brand-green"
              >
                <option value="Unpaid">Unpaid</option>
                <option value="Paid">Paid</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-[32px] overflow-hidden border border-brand-tan/20 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="bg-brand-beige text-brand-green text-[10px] uppercase font-bold tracking-widest border-b border-brand-tan/30">
                <th className="px-8 py-5">Order Reference</th>
                <th className="px-8 py-5">Customer</th>
                <th className="px-8 py-5">Financials</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-tan/10 text-sm">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-brand-beige/20 transition-colors">
                  <td className="px-8 py-5 font-mono text-xs text-brand-rose/80">{order.id}</td>
                  <td className="px-8 py-5">
                    <p className="font-bold text-brand-green">{order.customerName}</p>
                    <p className="text-[10px] text-brand-rose italic">{order.date}</p>
                  </td>
                  <td className="px-8 py-5 font-bold">Rp {order.total.toLocaleString('id-ID')}</td>
                  <td className="px-8 py-5">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      order.status === 'Paid' ? 'bg-green-100 text-green-700' :
                      order.status === 'Unpaid' ? 'bg-brand-rose/10 text-brand-rose italic' :
                      'bg-blue-100 text-blue-700'
                    }`}>{order.status}</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <select 
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="bg-brand-beige/50 border border-brand-tan/20 text-[10px] font-bold uppercase rounded-lg px-3 py-1.5 outline-none focus:ring-1 focus:ring-brand-green"
                    >
                      <option value="Unpaid">Unpaid</option>
                      <option value="Paid">Paid</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- Warehouse View ---
const WarehouseView = () => {
  return (
    <div className="p-4 md:p-8 pb-20 md:pb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl text-brand-green">Inventory Control</h2>
          <p className="text-brand-rose italic mt-2 text-sm">Manage premium stock & distribution</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {PRODUCTS.map(product => (
          <div key={product.id} className="bg-white/60 backdrop-blur-sm p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-brand-tan/20 shadow-sm flex flex-col">
            <div className="flex gap-4 md:gap-6 flex-1">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-brand-beige rounded-[24px] md:rounded-[32px] overflow-hidden border border-brand-tan/10 p-1 shrink-0">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-[18px] md:rounded-[24px]" loading="lazy" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="label-micro">Collection ID</p>
                <h3 className="text-lg md:text-xl text-brand-green mt-1">PRD-{product.id}</h3>
                <p className="text-sm font-medium text-brand-rose mt-1 truncate">{product.name}</p>
                <div className="mt-3 flex items-center justify-between gap-2 flex-wrap">
                  <div className="px-3 py-1 bg-brand-green/5 rounded-full border border-brand-green/10">
                    <span className="text-[10px] font-black uppercase text-brand-green">Stock: {product.stock}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-brand-beige rounded-xl hover:bg-brand-tan/20 transition-colors text-brand-rose" title="Print Barcode">
                      <Printer size={15} />
                    </button>
                    <button className="p-2 bg-brand-beige rounded-xl hover:bg-brand-green/10 transition-colors text-brand-green" title="Scan QR">
                      <QrCode size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-brand-tan/10 flex flex-col gap-3">
              <p className="text-[10px] text-brand-rose italic text-center opacity-60">Security Locked: stock adjustment requires executive bypass</p>
              <div className="flex gap-3">
                <button className="flex-1 bg-brand-green text-white py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-green/20">Scan Arrival</button>
                <button className="flex-1 border border-brand-green text-brand-green py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-green hover:text-white transition-all">Quick Print</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Owner View ---
const OwnerView = () => {
  return (
    <div className="p-4 md:p-8 pb-20 md:pb-8">
      <div className="mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl text-brand-green">Business Essence</h2>
        <p className="text-brand-rose italic mt-2 text-sm">Deep analytics of the Azkadiena lifecycle</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-10 md:mb-16">
        {[
          { label: 'Total Revenue', val: 'Rp 142M', delta: '+12%', icon: TrendingUp },
          { label: 'Order Flow', val: '1,280', delta: '+5%', icon: ShoppingBag },
          { label: 'Customer Base', val: '842', delta: '+18%', icon: Users },
          { label: 'AOV Premium', val: 'Rp 450k', delta: '-2%', icon: CreditCard },
        ].map(stat => (
          <div key={stat.label} className="bg-white/60 backdrop-blur-sm p-5 md:p-8 rounded-[28px] md:rounded-[40px] border border-brand-tan/20 shadow-sm relative overflow-hidden group hover:scale-[1.02] transition-transform">
            <div className="absolute top-0 right-0 w-20 h-20 bg-brand-green/5 rounded-bl-full transform translate-x-6 -translate-y-6 transition-transform group-hover:translate-x-3 group-hover:-translate-y-3" />
            <div className="flex items-center justify-between mb-4 relative">
              <div className="p-2 bg-brand-green/10 text-brand-green rounded-xl border border-brand-green/20">
                <stat.icon size={18} />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${stat.delta.startsWith('+') ? 'text-green-600' : 'text-brand-rose'}`}>
                {stat.delta}
              </span>
            </div>
            <p className="label-micro opacity-60 mb-1 text-[9px]">{stat.label}</p>
            <p className="text-xl md:text-3xl font-serif text-brand-green font-bold">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="bg-white/60 backdrop-blur-sm rounded-[28px] md:rounded-[40px] p-6 md:p-10 border border-brand-tan/20 shadow-sm">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 md:mb-10 gap-3">
          <h3 className="text-xl md:text-2xl font-serif text-brand-green underline decoration-brand-tan/40 decoration-4 underline-offset-8">Lifecycle Stream</h3>
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-rose bg-brand-rose/10 px-4 py-1.5 rounded-full self-start">Real-time Pulse</span>
        </div>
        <div className="space-y-6 md:space-y-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-start space-x-4 md:space-x-6 pb-6 md:pb-8 border-b border-brand-tan/10 last:border-0 last:pb-0">
              <div className="w-1.5 h-10 bg-brand-tan/20 rounded-full shrink-0 mt-1" />
              <div>
                <p className="text-brand-green font-medium text-base md:text-lg leading-snug">New stock restock for <span className="italic font-light opacity-70">'Zahra Silk Abaya'</span> completed by internal warehouse protocols.</p>
                <div className="flex items-center space-x-3 mt-3">
                  <span className="w-2 h-2 rounded-full bg-brand-green shrink-0" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-rose">2 hours ago • System Log #8822</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---
export default function App() {
  const [role, setRole] = useState('Customer');
  const [activeTab, setActiveTab] = useState('shop');
  const [isStarted, setIsStarted] = useState(false);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === 'Admin') setActiveTab('orders');
    else if (newRole === 'Warehouse') setActiveTab('inventory');
    else if (newRole === 'Owner') setActiveTab('analytics');
    else { setActiveTab('shop'); setIsStarted(false); }
  };

  const renderContent = () => {
    if (role === 'Customer') {
      if (!isStarted) return <LandingPage onStart={() => setIsStarted(true)} />;
      if (activeTab === 'profile') return <div className="p-8 text-center text-gray-400 font-serif text-2xl min-h-[60vh] flex items-center justify-center">Profil Pelanggan (Demo Content)</div>;
      return <ShopPage />;
    }

    switch(activeTab) {
      case 'analytics': return <OwnerView />;
      case 'orders': return <AdminDashboard />;
      case 'inventory': return <WarehouseView />;
      case 'products': return <div className="p-8 text-center text-gray-400 font-serif text-2xl min-h-[60vh] flex items-center justify-center">Katalog Manager (Demo Content)</div>;
      case 'users': return <div className="p-8 text-center text-gray-400 font-serif text-2xl min-h-[60vh] flex items-center justify-center">Staff Manager (Demo Content)</div>;
      default: return <div className="p-8 text-center text-gray-400 font-serif text-2xl min-h-[60vh] flex items-center justify-center">Coming Soon</div>;
    }
  };

  return (
    <div className="min-h-screen bg-brand-beige flex overflow-hidden">
      {(role !== 'Customer' || (role === 'Customer' && isStarted)) && (
        <Sidebar role={role} setRole={handleRoleChange} activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      <main className="flex-1 overflow-y-auto min-w-0">
        {/* Top Navbar for Customers */}
        {role === 'Customer' && isStarted && (
          <header className="px-4 md:px-8 py-4 md:py-6 flex items-center justify-between bg-white/20 backdrop-blur-md sticky top-0 z-40">
            <h1 className="text-xl md:text-2xl font-serif text-brand-green font-bold tracking-widest">AZKAdiena</h1>
            <div className="flex items-center space-x-4 md:space-x-6">
              <button onClick={() => setActiveTab('shop')} className={`text-xs md:text-sm font-bold uppercase tracking-widest ${activeTab === 'shop' ? 'text-brand-green border-b-2 border-brand-green' : 'text-gray-400'}`}>Shop</button>
              <button onClick={() => setActiveTab('profile')} className={`text-xs md:text-sm font-bold uppercase tracking-widest ${activeTab === 'profile' ? 'text-brand-green border-b-2 border-brand-green' : 'text-gray-400'}`}>Profile</button>
              <div className="w-9 h-9 md:w-10 md:h-10 bg-brand-green text-white rounded-full flex items-center justify-center">
                <ShoppingCart size={18} />
              </div>
            </div>
          </header>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={`${role}-${activeTab}-${isStarted}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        {/* Brand Footer */}
        {role === 'Customer' && isStarted && (
          <footer className="bg-brand-dark text-white p-8 md:p-12 mt-16 md:mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-3xl font-serif tracking-widest">AZKAdiena</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Pakaian Modest Premium untuk wanita yang menghargai keanggunan, kualitas, dan detail yang tak lekang oleh waktu.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-rose">Contact Us</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-400 text-sm">
                    <Phone size={15} className="shrink-0" /> <span>+62 812 3456 7890</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400 text-sm">
                    <Mail size={15} className="shrink-0" /> <span>hello@azkadiena.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400 text-sm">
                    <MapPin size={15} className="shrink-0" /> <span>Jakarta, Indonesia</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-rose">Newsletter</h4>
                <div className="flex items-center border-b border-white/20 pb-2">
                  <input className="bg-transparent text-sm w-full outline-none placeholder-gray-500" placeholder="Email Anda..." />
                  <button className="text-brand-rose font-bold text-xs ml-2 shrink-0">JOIN</button>
                </div>
              </div>
            </div>
            <div className="mt-10 md:mt-12 pt-8 md:pt-12 border-t border-white/10 text-center text-xs text-gray-500 tracking-widest">
              &copy; 2024 AZKAdiena PREMIUM MODEST WEAR. ALL RIGHTS RESERVED.
            </div>
          </footer>
        )}
      </main>

      {/* Mobile Bottom Nav for non-customer roles */}
      <MobileNav role={role} activeTab={activeTab} setActiveTab={setActiveTab} onMenuOpen={() => {}} />

      <RoleSwitcher currentRole={role} setRole={handleRoleChange} />
    </div>
  );
}
