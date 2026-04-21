import { useState } from 'react';
import ChatPanel from './ChatPanel';
import OfferPanel from './OfferPanel';

const BASE = 'http://localhost:8081';

export default function ItemModal({ item, onClose }) {
  const [tab, setTab] = useState('chat');

  if (!item) return null;

  const raw = item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[0] : null;
  const imageUrl = raw
    ? raw.startsWith('http')
      ? raw
      : raw.startsWith('/images/')
        ? BASE + raw
        : null
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-3xl max-h-[90vh] flex overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: item details */}
        <div className="w-2/5 flex-shrink-0 flex flex-col border-r border-gray-800">
          <div className="bg-gray-800 h-56 flex items-center justify-center overflow-hidden">
            {imageUrl ? (
              <img src={imageUrl} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              <div className="text-gray-600 text-4xl">📦</div>
            )}
          </div>
          <div className="p-4 flex flex-col gap-2 flex-1">
            <h2 className="text-white font-bold text-lg leading-tight">{item.title}</h2>
            <p className="text-green-400 font-bold text-2xl">₹{item.price?.toFixed(2)}</p>
            <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full w-fit">{item.condition}</span>
            {item.owner && <p className="text-gray-500 text-xs">Listed by <span className="text-gray-300">{item.owner}</span></p>}
            <p className="text-gray-400 text-sm mt-1">{item.description}</p>
          </div>
        </div>

        {/* Right: tabs */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex border-b border-gray-700 items-center">
            {['chat', 'offers'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-3 text-sm font-semibold capitalize transition-colors ${
                  tab === t ? 'text-white border-b-2 border-red-500' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {t === 'chat' ? 'Chat' : 'Offers'}
              </button>
            ))}
            <button onClick={onClose} className="px-4 text-gray-500 hover:text-white transition-colors text-lg pb-0.5">✕</button>
          </div>

          <div className="flex-1 overflow-hidden p-4 flex flex-col">
            {tab === 'chat' ? <ChatPanel item={item} /> : <OfferPanel itemId={item.id} />}
          </div>
        </div>
      </div>
    </div>
  );
}
