import ConversationAuthor from "./ConversationAuthor";
import { CgAttachment } from "react-icons/cg";
// Date formatting
import ReactTimeAgo from 'react-time-ago';
import PropTypes from 'prop-types';

function Conversation({
  customer_name,
  from_customer,
  customer_email,
  created_at,
  body,
  attachments_urls,
  agent_name,
}) {
  const getConversationDivClassName = (from_customer) => {
    return from_customer
      ? "mb-10 border p-5 dark:bg-gray-700"
      : "mb-10 border p-5 bg-gray-100 dark:bg-inherit";
  };

  const getConversationInfoDivClassName = (from_customer) => {
    return from_customer ? "mb-4 text-gray-400" : "mb-4 text-gray-500";
  };

  const initial = Array.from(customer_name)[0];

  return (
    <div className={getConversationDivClassName(from_customer)}>
      <div
        id="conversation-info-heading"
        className="flex flex-row justify-between"
      >
        <div className={getConversationInfoDivClassName(from_customer)}>
          {from_customer ? (
            <div>
              <ConversationAuthor initial={initial} author={customer_name} />

              {/* From customer email details */}
              <p>
                From: {customer_name} &lt;{customer_email}&gt;
              </p>
              <p>To: SmartAgent &lt;smartagents3@gmail.com&gt;</p>
            </div>
          ) : (
            <div>
              <ConversationAuthor initial="S" author={agent_name !== null ? `SmartAgent (${agent_name}) ` : `SmartAgent`} />

              {/* To customer email details */}
              <p>From: SmartAgent &lt;smartagents3@gmail.com&gt;</p>
              <p>
                To: {customer_name} &lt;{customer_email}&gt;
              </p>
            </div>
          )}
        </div>
        <div>
          <ReactTimeAgo date={Date.parse(created_at)} locale="en-US"/>
        </div> {/* Need to format datetime */}
      </div>

      {/* Divider */}
      <div className="flex-grow border-t dark:inherit mb-4"></div>

      {/* Body of conversation */}
      <div
        className="dark:text-white"
        dangerouslySetInnerHTML={{ __html: body }}
      />
      
      {/* Attachments */}
      <div className="mt-5">
      {attachments_urls &&
          attachments_urls.map((attachments, index) => (
            <a key={index} href={attachments.url} target="_blank" rel="noopener noreferrer" >
              <CgAttachment className="h-[20px] w-[20px] inline"/> {attachments.filename}
            </a>
          ))}
      </div>
    </div>
  );
}

Conversation.propTypes = {
  customer_name: PropTypes.string.isRequired,
  from_customer: PropTypes.bool.isRequired,
  customer_email: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  attachments_urls: PropTypes.array,
};


export default Conversation;
