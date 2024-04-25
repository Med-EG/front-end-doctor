function ChatItem({ src, name, onClick }) {
  return (
    <button onClick={onClick} className="w-full">
      <div className="flex items-center gap-6 w-80">
        <img src={`https://api-medeg.online/${src}`} alt="" className="rounded-full w-20 h-20 object-cover" />
        <h2 className="font-bold text-lg">{name}</h2>
      </div>
    </button>
  );
}

export default ChatItem;
