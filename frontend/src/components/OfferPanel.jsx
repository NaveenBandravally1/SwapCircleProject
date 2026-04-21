import { useEffect, useState } from 'react';
import { createOffer, getOffersByItem, updateOfferStatus } from '../api';
import { useUser } from '../context/UserContext';

export default function OfferPanel({ itemId }) {
  const { username } = useUser();
  const [offers, setOffers] = useState([]);
  const [amount, setAmount] = useState('');
  const [sending, setSending] = useState(false);

  const refreshOffers = () => getOffersByItem(itemId).then(setOffers).catch(() => {});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { refreshOffers(); }, [itemId]);

  const handleOffer = async (e) => {
    e.preventDefault();
    if (!amount || !username) return;
    setSending(true);
    try {
      await createOffer({ itemId, buyer: username, offeredPrice: parseFloat(amount) });
      setAmount('');
      refreshOffers();
    } finally {
      setSending(false);
    }
  };

  const handleStatus = async (id, status) => {
    await updateOfferStatus(id, status);
    refreshOffers();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-2 mb-3">
        {offers.length === 0 ? (
          <p className="text-gray-500 text-sm text-center mt-8">No offers yet.</p>
        ) : (
          offers.map((o) => (
            <div key={o.id} className="bg-gray-800 rounded-xl px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">{o.buyer}</p>
                <p className="text-green-400 font-bold">₹{o.offeredPrice?.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                {o.status === 'PENDING' ? (
                  <>
                    <button onClick={() => handleStatus(o.id, 'ACCEPTED')} className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full">Accept</button>
                    <button onClick={() => handleStatus(o.id, 'REJECTED')} className="text-xs bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded-full">Decline</button>
                  </>
                ) : (
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${o.status === 'ACCEPTED' ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-400'}`}>
                    {o.status}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleOffer} className="border-t border-gray-700 pt-3 flex gap-2">
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Your offer in ₹"
          disabled={!username}
          className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
        />
        <button
          type="submit"
          disabled={sending || !username}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm px-4 py-2 rounded-full transition-colors font-medium"
        >
          Offer
        </button>
      </form>
    </div>
  );
}
