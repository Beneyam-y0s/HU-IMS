import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar.jsx";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";
// Note: You may need to install lucide-react: npm install lucide-react
import { Package, Layers, CheckCircle, Activity } from "lucide-react";

const StoreManagerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  const fetchData = async () => {
    try {
      const [prodRes, catRes, reqRes] = await Promise.all([
        axios.get("http://localhost:5000/api/products"),
        axios.get("http://localhost:5000/api/categories"),
        axios.get("http://localhost:5000/api/requests"),
      ]);
      setProducts(prodRes.data.products);
      setCategories(catRes.data.categories);
      setRequests(reqRes.data.filter((r) => r.status === "approved"));
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const productsByCategory = categories.map((cat) => ({
    name: cat.name,
    value: products.filter((p) => p.category === cat.name).length,
  }));

  const requestsByDepartment = [...new Set(requests.map((r) => r.department))].map((dep) => ({
    name: dep,
    value: requests.filter((r) => r.department === dep).length,
  }));

  const statusCount = {
    new: products.filter((p) => p.status === "new").length,
    used: products.filter((p) => p.status === "used").length,
    damaged: products.filter((p) => p.status === "damaged").length,
  };

  return (
    <div className="min-h-screen px-4 pb-12">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Store Manager Dashboard</h2>
            <p className="text-slate-500 mt-1">Overview of inventory, categories, and approved logistics.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-600">Live System Status</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r shadow-sm">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Products" value={products.length} icon={<Package className="text-blue-600" />} color="bg-blue-50" />
          <StatCard title="Total Categories" value={categories.length} icon={<Layers className="text-emerald-600" />} color="bg-emerald-50" />
          <StatCard title="Approved Requests" value={requests.length} icon={<CheckCircle className="text-orange-600" />} color="bg-orange-50" />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Products by Category */}
          <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-6">
              <Activity size={20} className="text-slate-400" />
              <h3 className="font-bold text-slate-700">Products by Category</h3>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie data={productsByCategory} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={5} label>
                  {productsByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Approved Requests by Department */}
          <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-6">
              <Activity size={20} className="text-slate-400" />
              <h3 className="font-bold text-slate-700">Requests by Department</h3>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={requestsByDepartment}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Status Footer Section */}
        <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-8">
          <h3 className="font-bold text-slate-700 mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
            Inventory Health Status
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatusTile label="New" count={statusCount.new} color="text-blue-600" bgColor="bg-blue-50" />
            <StatusTile label="Used" count={statusCount.used} color="text-amber-600" bgColor="bg-amber-50" />
            <StatusTile label="Damaged" count={statusCount.damaged} color="text-red-600" bgColor="bg-red-50" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components for cleaner UI code
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 flex items-center justify-between hover:scale-[1.02] transition-transform cursor-default">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <p className="text-3xl font-bold text-slate-800">{value}</p>
    </div>
    <div className={`p-4 rounded-xl ${color}`}>
      {icon}
    </div>
  </div>
);

const StatusTile = ({ label, count, color, bgColor }) => (
  <div className={`${bgColor} rounded-2xl p-6 text-center transition-all hover:brightness-95`}>
    <p className={`text-sm font-bold uppercase tracking-wider ${color} mb-1`}>{label}</p>
    <p className="text-4xl font-black text-slate-800">{count}</p>
  </div>
);

export default StoreManagerDashboard;