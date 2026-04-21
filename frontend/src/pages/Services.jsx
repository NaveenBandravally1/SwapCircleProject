export default function Services() {
  const services = [
    {
      icon: '📚',
      title: 'Buy & Sell Books',
      desc: 'List your old textbooks or find the ones you need at a fraction of the price.',
    },
    {
      icon: '💻',
      title: 'Electronics Exchange',
      desc: 'Trade laptops, calculators, earphones, and more with verified students.',
    },
    {
      icon: '🚲',
      title: 'Cycles & Bikes',
      desc: 'Campus commuting made affordable — buy or sell cycles on SwapCircle.',
    },
    {
      icon: '🛋️',
      title: 'Furniture & Appliances',
      desc: 'Moving out? Sell your hostel furniture quickly to incoming students.',
    },
    {
      icon: '💬',
      title: 'In-App Chat',
      desc: 'Chat directly with sellers to negotiate and arrange pickup safely on campus.',
    },
    {
      icon: '🤝',
      title: 'Make Offers',
      desc: 'Send a price offer on any listing and get notified when accepted.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-20 px-6 pb-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-extrabold mb-3">
            What <span className="text-red-500">SwapCircle</span> Offers
          </h1>
          <p className="text-gray-400 text-lg">Everything you need to buy and sell on campus</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="bg-gray-900 border border-gray-800 hover:border-red-500 rounded-2xl p-6 transition-colors">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
