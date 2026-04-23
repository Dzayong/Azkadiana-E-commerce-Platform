import { useState } from 'react';
import { 
  ShoppingBag, 
  LayoutDashboard, 
  Package, 
  Users, 
  LogOut, 
  Menu, 
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
type Role = 'Customer' | 'Admin' | 'Warehouse' | 'Owner';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

interface Order {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: 'Unpaid' | 'Paid' | 'Processing' | 'Shipped';
  items: string[];
}

// --- Mock Data ---
const PRODUCTS: Product[] = [
  { id: '1', name: 'Zahra Silk Abaya', price: 850000, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop', category: 'Abaya', stock: 12 },
  { id: '2', name: 'Noor Satin Hijab', price: 150000, image: 'https://images.unsplash.com/photo-1606761560479-6646793ee22d?q=80&w=1000&auto=format&fit=crop', category: 'Hijab', stock: 45 },
  { id: '3', name: 'Laila Linen Set', price: 920000, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop', category: 'Set', stock: 8 },
  { id: '4', name: 'Amira Embroidered Kaftan', price: 1200000, image: 'https://images.unsplash.com/photo-1539109132381-31a1b97dee4d?q=80&w=1000&auto=format&fit=crop', category: 'Kaftan', stock: 5 },
  { id: '5', name: 'Daria Pleated Skirt', price: 450000, image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop', category: 'Skirt', stock: 20 },
  { id: '6', name: 'Safiya Prayer Set', price: 550000, image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop', category: 'Prayer', stock: 15 },
];

const ORDERS: Order[] = [
  { id: 'ORD-001', customerName: 'Fatimah Az-Zahra', date: '2024-03-20', total: 1000000, status: 'Paid', items: ['Zahra Silk Abaya', 'Noor Satin Hijab'] },
  { id: 'ORD-002', customerName: 'Aisha Rahma', date: '2024-03-21', total: 450000, status: 'Unpaid', items: ['Daria Pleated Skirt'] },
  { id: 'ORD-003', customerName: 'Siti Nurhaliza', date: '2024-03-21', total: 920000, status: 'Processing', items: ['Laila Linen Set'] },
];

// --- Components ---

const Sidebar = ({ role, setRole, activeTab, setActiveTab }: { role: Role, setRole: (r: Role) => void, activeTab: string, setActiveTab: (t: string) => void }) => {
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
    <div className="w-64 glass-sidebar h-screen flex flex-col hidden md:flex sticky top-0 px-8 py-10">
      <div className="mb-12">
        <h1 className="text-2xl font-bold tracking-[0.2em] text-brand-green uppercase">Azkadiana</h1>
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
                  className={`flex items-center space-x-3 transition-colors ${
                    activeTab === item.id 
                      ? 'text-brand-green font-medium' 
                      : 'text-brand-green/60 hover:text-brand-green'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${activeTab === item.id ? 'bg-brand-green' : 'border border-brand-green/30'}`} />
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

const RoleSwitcher = ({ currentRole, setRole }: { currentRole: Role, setRole: (r: Role) => void }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 group">
      <div className="hidden group-hover:flex flex-col space-y-2 mb-2 items-end">
        {(['Owner', 'Admin', 'Warehouse', 'Customer'] as Role[]).map(role => (
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
      <button className="w-12 h-12 bg-brand-green text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
        <LayoutDashboard size={24} />
      </button>
    </div>
  );
};

// --- View Components ---

const LandingPage = ({ onStart }: { onStart: () => void }) => (
  <div className="relative h-screen flex items-center px-12 md:px-20 overflow-hidden bg-brand-beige">
    <div className="absolute inset-0 z-0">
      <img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2000&auto=format&fit=crop" alt="Hero bg" className="w-full h-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-beige to-transparent"></div>
    </div>
    
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative z-10 max-w-2xl"
    >
      <span className="text-brand-rose uppercase tracking-[0.3em] text-xs font-bold">Collection 2024</span>
      <h1 className="text-6xl md:text-8xl text-brand-green leading-tight mt-4 mb-10">
        Timeless <br />
        <span className="italic font-light text-brand-dark">Elegance in Modesty</span>
      </h1>
      <button onClick={onStart} className="btn-primary">
        Mulai Belanja
      </button>

      <div className="mt-16 flex gap-4 hidden lg:flex">
        <div className="w-40 h-48 rounded-[40px] bg-brand-rose/20 border border-white/40 flex items-center justify-center text-brand-rose text-[10px] uppercase tracking-widest rotate-2">Silk Scarf</div>
        <div className="w-40 h-48 rounded-[40px] bg-brand-green/10 border border-white/40 flex items-center justify-center text-brand-green text-[10px] uppercase tracking-widest -rotate-2 mt-12">Abaya Pro</div>
      </div>
    </motion.div>
  </div>
);

const ShopPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  if (showCheckout) return <CheckoutView onBack={() => setShowCheckout(false)} />;

  return (
    <div className="p-4 md:p-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-brand-tan/20 pb-8">
        <div>
          <h2 className="text-4xl text-brand-green leading-tight">Catalog Showcase</h2>
          <p className="text-brand-rose italic mt-2">Gaya elegan untuk setiap momen spesial</p>
        </div>
        <div className="relative mt-6 md:mt-0">
          <input className="pl-10 pr-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-brand-tan/20 focus:outline-none focus:ring-1 focus:ring-brand-green w-full md:w-72 text-sm" placeholder="Search collection..." />
          <Search className="absolute left-3 top-2.5 text-brand-tan" size={18} />
          <span className="absolute -top-6 right-0 text-[10px] text-brand-rose uppercase tracking-widest font-bold">32 Items Found</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {PRODUCTS.map((product, idx) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group"
          >
            <div className="relative overflow-hidden rounded-[40px] aspect-[4/5] mb-6 p-4 bg-white/40 border border-brand-tan/10 shadow-sm transition-all hover:shadow-xl hover:border-brand-tan/30">
              <img src={product.image} className="w-full h-full object-cover rounded-[32px] transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-brand-green/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-8">
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="bg-white text-brand-green px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform"
                >
                  Quick View
                </button>
              </div>
            </div>
            <div className="px-2 flex justify-between items-start">
              <div>
                <p className="label-micro">{product.category}</p>
                <h3 className="text-xl text-brand-green mt-1">{product.name}</h3>
                <p className="font-bold text-brand-dark/60 mt-1">Rp {product.price.toLocaleString('id-ID')}</p>
              </div>
              <button onClick={() => setShowLoginModal(true)} className="btn-outline !p-2 rounded-full !w-10 !h-10 flex items-center justify-center">
                <Plus size={20} />
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
              className="relative bg-white p-10 rounded-[40px] shadow-2xl max-w-sm w-full text-center border border-brand-tan/30"
            >
              <div className="w-20 h-20 bg-brand-beige rounded-full flex items-center justify-center mx-auto mb-8 border border-brand-tan/20">
                <User className="text-brand-green" size={32} />
              </div>
              <h3 className="text-3xl font-serif text-brand-green mb-3">Member Exclusive</h3>
              <p className="text-sm text-brand-rose mb-10 leading-relaxed font-medium">Bergabunglah dengan komunitas Azkadiana untuk akses koleksi eksklusif.</p>
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
                <button onClick={() => setShowLoginModal(false)} className="w-full text-[10px] font-black uppercase tracking-[0.2em] text-brand-tan hover:text-brand-green transition-colors">
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

const CheckoutView = ({ onBack }: { onBack: () => void }) => {
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);

  if (success) return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center p-8">
      <div className="w-24 h-24 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mb-8 border border-brand-green/20">
        <Truck size={40} />
      </div>
      <h2 className="text-4xl font-serif text-brand-green mb-4">Timeless Arrival</h2>
      <p className="text-brand-rose mb-10 max-w-xs font-medium italic">Pesanan Anda sedang dalam perjalanan menuju keanggunan baru.</p>
      <button onClick={onBack} className="btn-primary">Return to Boutique</button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-12 flex flex-col md:flex-row gap-12">
      <div className="flex-1">
        <button onClick={onBack} className="flex items-center space-x-2 text-brand-rose mb-12 hover:text-brand-green transition-colors uppercase tracking-widest text-[10px] font-black">
          <X size={16} />
          <span>Cancel Session</span>
        </button>

        <div className="flex items-center space-x-6 mb-16">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= s ? 'bg-brand-green text-white shadow-lg' : 'bg-white border border-brand-tan/30 text-brand-tan'}`}>
                {s}
              </div>
              {s === 1 && <div className={`w-16 h-px mx-4 ${step > 1 ? 'bg-brand-green' : 'bg-brand-tan/30'}`} />}
            </div>
          ))}
          <span className="text-2xl font-serif text-brand-green ml-4">{step === 1 ? 'Personal Details' : 'Payment Portal'}</span>
        </div>

        {step === 1 ? (
          <form className="space-y-10" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="label-micro">Full Name</label>
                <input required className="input-editorial" placeholder="Your name..." />
              </div>
              <div className="space-y-4">
                <label className="label-micro">WhatsApp No.</label>
                <input required className="input-editorial" placeholder="+62..." />
              </div>
            </div>
            <div className="space-y-4">
              <label className="label-micro">Destination Address</label>
              <textarea required className="input-editorial min-h-[80px]" placeholder="Shipping details..." />
            </div>
            <div className="space-y-4">
              <label className="label-micro">Email Address</label>
              <input required type="email" className="input-editorial" placeholder="email@gmail.com" />
            </div>
            <button type="submit" className="btn-primary w-full !rounded-xl">Continue to Checkout</button>
          </form>
        ) : (
          <div className="space-y-10">
            <div className="space-y-4">
               <button onClick={() => setSuccess(true)} className="w-full flex items-center justify-between px-8 py-5 bg-white border border-brand-tan/20 rounded-2xl hover:border-brand-green group transition-all">
                  <div className="flex items-center space-x-4">
                    <CreditCard className="text-brand-green" size={20} />
                    <span className="font-bold text-sm tracking-widest uppercase">Bank Transfer</span>
                  </div>
                  <ChevronDown className="text-brand-tan group-hover:text-brand-green transition-transform group-hover:rotate-180" />
               </button>
               <button onClick={() => setSuccess(true)} className="w-full flex items-center justify-between px-8 py-5 bg-white border border-brand-tan/20 rounded-2xl hover:border-brand-green group transition-all">
                  <div className="flex items-center space-x-4">
                    <ShoppingCart className="text-brand-green" size={20} />
                    <span className="font-bold text-sm tracking-widest uppercase">Digital Wallet</span>
                  </div>
                  <ChevronDown className="text-brand-tan group-hover:text-brand-green" />
               </button>
            </div>
          </div>
        )}
      </div>

      <div className="w-full md:w-80 space-y-6">
        <div className="bg-brand-green rounded-[32px] p-8 text-white flex flex-col justify-between min-h-[300px] shadow-2xl">
          <div className="space-y-6">
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-70 font-black">Order Summary</p>
            <div className="space-y-4">
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
          <div className="space-y-6 pt-8 border-t border-white/10">
            <div className="flex justify-between items-end">
              <span className="text-[10px] uppercase font-bold tracking-widest">Total</span>
              <span className="text-3xl font-serif">Rp1.240.000</span>
            </div>
            {step === 2 && (
              <button 
                onClick={() => setSuccess(true)}
                className="w-full py-4 bg-white text-brand-green text-xs font-black uppercase tracking-[0.2em] rounded-xl hover:bg-brand-beige transition-all"
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

const AdminDashboard = () => {
  const [orders, setOrders] = useState(ORDERS);

  const updateStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <div className="p-8">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-4xl text-brand-green">Order Portal</h2>
          <p className="text-brand-rose italic mt-2">Monitoring premium customer transactions</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-6 py-2 bg-brand-rose text-white text-[10px] font-bold uppercase rounded-full shadow-lg shadow-brand-rose/20">Admin View</button>
          <button className="px-6 py-2 bg-white text-brand-rose text-[10px] font-bold uppercase rounded-full border border-brand-tan/40">Reports</button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] overflow-hidden border border-brand-tan/20 shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-brand-beige text-brand-green text-[10px] uppercase font-bold tracking-widest border-b border-brand-tan/30">
              <th className="px-8 py-5">Order Reference</th>
              <th className="px-8 py-5">Customer Essence</th>
              <th className="px-8 py-5">Financials</th>
              <th className="px-8 py-5">Lifecycle</th>
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
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <select 
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value as Order['status'])}
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
  );
};

const WarehouseView = () => {
  return (
    <div className="p-8">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-4xl text-brand-green">Inventory Control</h2>
          <p className="text-brand-rose italic mt-2">Manage premium stock & distribution</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map(product => (
          <div key={product.id} className="bg-white/60 backdrop-blur-sm p-8 rounded-[40px] border border-brand-tan/20 shadow-sm flex flex-col">
            <div className="flex gap-6 flex-1">
              <div className="w-24 h-24 bg-brand-beige rounded-[32px] overflow-hidden border border-brand-tan/10 p-1">
                <img src={product.image} className="w-full h-full object-cover rounded-[28px]" />
              </div>
              <div className="flex-1">
                <p className="label-micro">Collection ID</p>
                <h3 className="text-xl text-brand-green mt-1">PRD-{product.id}</h3>
                <p className="text-sm font-medium text-brand-rose mt-1">{product.name}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="px-4 py-1 bg-brand-green/5 rounded-full border border-brand-green/10">
                    <span className="text-[10px] font-black uppercase text-brand-green">Stock: {product.stock}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-brand-beige rounded-xl hover:bg-brand-tan/20 transition-colors text-brand-rose" title="Print Barcode">
                      <Printer size={16} />
                    </button>
                    <button className="p-2 bg-brand-beige rounded-xl hover:bg-brand-green/10 transition-colors text-brand-green" title="Scan QR">
                      <QrCode size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-brand-tan/10 flex flex-col gap-4">
               <p className="text-[10px] text-brand-rose italic text-center opacity-60">Security Locked: stock adjustment requires executive bypass</p>
               <div className="flex gap-3">
                  <button className="flex-1 bg-brand-green text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-green/20">Scan Arrival</button>
                  <button className="flex-1 border border-brand-green text-brand-green py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-green hover:text-white transition-all">Quick Print</button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const OwnerView = () => {
  return (
    <div className="p-8">
       <div className="mb-12">
          <h2 className="text-4xl text-brand-green">Business Essence</h2>
          <p className="text-brand-rose italic mt-2">Deep analytics of the Azkadiana lifecycle</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {[
            { label: 'Total Revenue', val: 'Rp 142M', delta: '+12%', icon: TrendingUp },
            { label: 'Order Flow', val: '1,280', delta: '+5%', icon: ShoppingBag },
            { label: 'Customer Base', val: '842', delta: '+18%', icon: Users },
            { label: 'AOV Premium', val: 'Rp 450k', delta: '-2%', icon: CreditCard },
          ].map(stat => (
            <div key={stat.label} className="bg-white/60 backdrop-blur-sm p-8 rounded-[40px] border border-brand-tan/20 shadow-sm relative overflow-hidden group hover:scale-[1.02] transition-transform">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/5 rounded-bl-full transform translate-x-8 -translate-y-8 transition-transform group-hover:translate-x-4 group-hover:-translate-y-4" />
              <div className="flex items-center justify-between mb-6 relative">
                <div className="p-2.5 bg-brand-green/10 text-brand-green rounded-2xl border border-brand-green/20">
                  <stat.icon size={22} />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${stat.delta.startsWith('+') ? 'text-green-600' : 'text-brand-rose'}`}>
                  {stat.delta}
                </span>
              </div>
              <p className="label-micro opacity-60 mb-1">{stat.label}</p>
              <p className="text-3xl font-serif text-brand-green font-bold">{stat.val}</p>
            </div>
          ))}
       </div>

       <div className="bg-white/60 backdrop-blur-sm rounded-[40px] p-10 border border-brand-tan/20 mb-12 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-serif text-brand-green underline decoration-brand-tan/40 decoration-4 underline-offset-8">Lifecycle Stream</h3>
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-rose bg-brand-rose/10 px-4 py-1.5 rounded-full">Real-time Pulse</span>
          </div>
          <div className="space-y-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-start space-x-6 pb-8 border-b border-brand-tan/10 last:border-0 last:pb-0">
                <div className="w-1.5 h-10 bg-brand-tan/20 rounded-full flex-shrink-0" />
                <div>
                  <p className="text-brand-green font-medium text-lg leading-snug">New stock restock for <span className="italic font-light opacity-70">'Zahra Silk Abaya'</span> completed by internal warehouse protocols.</p>
                  <div className="flex items-center space-x-3 mt-3">
                    <span className="w-2 h-2 rounded-full bg-brand-green" />
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
  const [role, setRole] = useState<Role>('Customer');
  const [activeTab, setActiveTab] = useState('shop');
  const [isStarted, setIsStarted] = useState(false);

  // Auto-set tab based on role
  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    if (newRole === 'Admin') setActiveTab('orders');
    else if (newRole === 'Warehouse') setActiveTab('inventory');
    else if (newRole === 'Owner') setActiveTab('analytics');
    else setActiveTab('shop');
  };

  const renderContent = () => {
    if (role === 'Customer') {
      if (!isStarted) return <LandingPage onStart={() => setIsStarted(true)} />;
      if (activeTab === 'profile') return <div className="p-8 text-center text-gray-400 font-serif text-2xl">Profil Pelanggan (Demo Content)</div>;
      return <ShopPage />;
    }

    switch(activeTab) {
      case 'analytics': return <OwnerView />;
      case 'orders': return <AdminDashboard />;
      case 'inventory': return <WarehouseView />;
      case 'products': return <div className="p-8 text-center text-gray-400 font-serif text-2xl">Katalog Manager (Demo Content)</div>;
      case 'users': return <div className="p-8 text-center text-gray-400 font-serif text-2xl">Staff Manager (Demo Content)</div>;
      default: return <div className="p-8 text-center text-gray-400 font-serif text-2xl">Coming Soon</div>;
    }
  };

  return (
    <div className="min-h-screen bg-brand-beige flex overflow-hidden">
      {/* Sidebar for roles or when customer starts */}
      {(role !== 'Customer' || (role === 'Customer' && isStarted)) && (
        <Sidebar role={role} setRole={handleRoleChange} activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      <main className="flex-1 overflow-y-auto">
        {/* Top Navbar for Customers */}
        {role === 'Customer' && isStarted && (
          <header className="px-8 py-6 flex items-center justify-between bg-white/20 backdrop-blur-md sticky top-0 z-40">
             <h1 className="text-2xl font-serif text-brand-green font-bold tracking-widest">AZKADIANA</h1>
             <div className="flex items-center space-x-6">
                <button onClick={() => setActiveTab('shop')} className={`text-sm font-bold uppercase tracking-widest ${activeTab === 'shop' ? 'text-brand-green border-b-2 border-brand-green' : 'text-gray-400'}`}>Shop</button>
                <button onClick={() => setActiveTab('profile')} className={`text-sm font-bold uppercase tracking-widest ${activeTab === 'profile' ? 'text-brand-green border-b-2 border-brand-green' : 'text-gray-400'}`}>Profile</button>
                <div className="w-10 h-10 bg-brand-green text-white rounded-full flex items-center justify-center">
                  <ShoppingCart size={20} />
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
           <footer className="bg-brand-dark text-white p-12 mt-20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                <div className="space-y-6">
                   <h2 className="text-3xl font-serif tracking-widest">AZKADIANA</h2>
                   <p className="text-gray-400 text-sm leading-relaxed">
                     Pakaian Modest Premium untuk wanita yang menghargai keanggunan, kualitas, dan detail yang tak lekang oleh waktu.
                   </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-brand-rose">Contact Us</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-gray-400 text-sm">
                      <Phone size={16} /> <span>+62 812 3456 7890</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-400 text-sm">
                      <Mail size={16} /> <span>hello@azkadiana.com</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-400 text-sm">
                      <MapPin size={16} /> <span>Jakarta, Indonesia</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 text-center md:text-left">
                   <h4 className="text-xs font-bold uppercase tracking-widest text-brand-rose">Newsletter</h4>
                   <div className="flex items-center border-b border-white/20 pb-2">
                      <input className="bg-transparent text-sm w-full outline-none" placeholder="Email Anda..." />
                      <button className="text-brand-rose font-bold text-xs">JOIN</button>
                   </div>
                </div>
              </div>
              <div className="mt-12 pt-12 border-t border-white/10 text-center text-xs text-gray-500 tracking-widest">
                &copy; 2024 AZKADIANA PREMIUM MODEST WEAR. ALL RIGHTS RESERVED.
              </div>
           </footer>
        )}
      </main>

      <RoleSwitcher currentRole={role} setRole={handleRoleChange} />
    </div>
  );
}
