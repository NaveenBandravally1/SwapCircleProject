import { useEffect, useRef, useState } from 'react';
import { getMessagesByItem, sendMessage } from '../api';
import { useUser } from '../context/UserContext';

export default function ChatPanel({ item }) {
  const { username } = useUser();
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const bottomRef = useRef(null);
  const receiver = item?.owner && item.owner !== username ? item.owner : 'seller';

  useEffect(() => {
    const fetch = () => getMessagesByItem(item.id).then(setMessages).catch(() => {});
    fetch();
    const interval = setInterval(fetch, 3000);
    return () => clearInterval(interval);
  }, [item.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!content.trim() || !username) return;
    await sendMessage({ itemId: item.id, sender: username, receiver, content });
    setContent('');
    getMessagesByItem(item.id).then(setMessages).catch(() => {});
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 mb-3">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-sm text-center mt-8">No messages yet. Say hi!</p>
        ) : (
          messages.map((m) => {
            const isMe = m.sender === username;
            return (
              <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${isMe ? 'bg-red-600 text-white rounded-br-sm' : 'bg-gray-700 text-white rounded-bl-sm'}`}>
                  {!isMe && <p className="text-xs text-gray-400 mb-0.5 font-medium">{m.sender}</p>}
                  <p>{m.content}</p>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="border-t border-gray-700 pt-3 flex gap-2">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={username ? `Message as ${username}...` : 'Loading...'}
          disabled={!username}
          className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
        />
        <button
          type="submit"
          disabled={!username}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm px-4 py-2 rounded-full transition-colors font-medium"
        >
          Send
        </button>
      </form>
    </div>
  );
}
