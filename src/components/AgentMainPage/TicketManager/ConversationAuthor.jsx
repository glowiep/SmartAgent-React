function ConversationAuthor({ initial, author }) {
  return (
    <div className="conversation-author flex flex-row gap-2 font-bold text-gray-700 dark:text-white text-2xl mb-1">
      <div className="avatar placeholder">
        <div className="bg-neutral text-neutral-content rounded-full w-8">
          <span className="text-xs">{initial}</span>
        </div>
      </div>
      {author}
      <span className="font-normal"> wrote</span>
    </div>
  );
}

export default ConversationAuthor;
