import './skeleton.css';

export default function TicketSkeleton() {
  return (
    <tr className="bg-yellow-100 border-b dark:bg-gray-300 dark:border-gray-700 hover:bg-yellow-200  dark:hover:text-black dark:hover:bg-gray-100 rounded cursor-pointer dark:text-black"
    >
      {/* Request title */}
      <th scope="row" className=" rounded-none ticket-skeleton w-full h-16 px-6 py-4 font-bold whitespace-wrap">
      </th>

      {/* Customer name */}
      <td className=" rounded-none ticket-skeleton w-full h-20 px-6 py-4"></td>

      {/* Ticket ID */}
      <td className=" rounded-none ticket-skeleton w-full h-16 px-2 py-4"></td>

      {/* Status */}
      <td className=" rounded-none ticket-skeleton w-full h-16 px-6 py-4"></td>

      {/* Created At */}
      <td className=" rounded-none ticket-skeleton w-full h-16 px-6 py-4">
        
      </td>

      {/* Assigned to agent */}
      <td className=" rounded-none ticket-skeleton w-full h-16 py-4">
        
      </td>

      {/* Actions */}
      <td className=" rounded-none ticket-skeleton w-full h-16 px-6">
        
      </td>
    </tr>
  );
}
