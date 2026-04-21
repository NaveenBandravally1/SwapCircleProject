const BASE = 'http://localhost:8081';

export default function ItemCard({ item, onClick }) {
  const raw = item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[0] : null;
  // Handle: /images/file.png → prepend base; http:// → use as-is; absolute path → no image
  const image = raw
    ? raw.startsWith('http')
      ? raw
      : raw.startsWith('/images/')
        ? BASE + raw
        : null
    : null;

  return (
    <div
      onClick={() => onClick(item)}
      className="relative group cursor-pointer rounded-lg overflow-hidden bg-gray-900 border border-gray-800 hover:border-red-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-900/20"
    >
      <div className="aspect-[3/4] bg-gray-800 flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={image} alt={item.title} className="w-full h-full object-cover" onError={(e) => { e.target.style.display='none'; }} />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-600">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs">No image</span>
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-white font-semibold text-sm truncate">{item.title}</h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-green-400 font-bold text-sm">₹{item.price?.toFixed(2)}</span>
          <span className="text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded-full">{item.condition}</span>
        </div>
      </div>

      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors">
          View
        </button>
      </div>
    </div>
  );
}
