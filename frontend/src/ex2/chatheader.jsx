import { X } from "lucide-react";
import { useAuth } from "../ex/useAuth";
import { useChat } from "../ex/useChat";
import profile from "../assets/profile.png"

// const ChatHeader = () => {
//   const { selectedUser, setSelectedUser } = useChat();
//   const { onlineUsers } = useAuth();

//   return (
//     <div className="p-2.5 border-b border-base-300">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           {/* Avatar */}
//           <div className="avatar">
//             <div className="size-10 rounded-full relative">
//               <img src={selectedUser.profilePic || profile} alt={selectedUser.name} />
//             </div>
//           </div>

//           {/* User info */}
//           <div>
//             <h3 className="font-medium">{selectedUser.name}</h3>
//             <p className="text-sm text-base-content/70">
//               {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
//             </p>
//           </div>
//         </div>

//         {/* Close button */}
//         <button onClick={() => setSelectedUser(null)}>
//           <X />
//         </button>
//       </div>
//     </div>
//   );
// };
// export default ChatHeader;



// const ChatHeader = ({ isMobile, onBack }) => {
//   const { selectedUser } = useChat();

//   if (!selectedUser) return null;

//   return (
//     <div className="border-b border-base-300 p-4 flex items-center gap-4">
//       {isMobile && (
//         <button
//           onClick={onBack}
//           className="btn btn-ghost btn-sm text-xl"
//         >
//           ←
//         </button>
//       )}
//       <div className="flex items-center gap-2">
//         <img
//           src={selectedUser.profilePic || profile}
//           alt={selectedUser.name}
//           className="size-10 rounded-full"
//         />
//         <div>
//           <div className="font-medium">{selectedUser.name}</div>
//           <div className="text-sm text-gray-500">
//             {selectedUser.online ? "Online" : "Offline"}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatHeader;

const ChatHeader = ({ isMobile, onBack }) => {
  const { selectedUser, setSelectedUser } = useChat();

  if (!selectedUser) return null;

  return (
    <div className="border-b border-base-300 p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {isMobile && (
          <button
            onClick={onBack}
            className="btn btn-ghost btn-sm text-xl"
          >
            ←
          </button>
        )}
        <img
          src={selectedUser.profilePic || profile}
          alt={selectedUser.name}
          className="size-10 rounded-full"
        />
        <div>
          <div className="font-medium">{selectedUser.name}</div>
          <div className="text-sm text-gray-500">
            {selectedUser.online ? "Online" : "Offline"}
          </div>
        </div>
      </div>
      {/* Cross Button - Hidden in smaller screens */}
      <button
        onClick={() => setSelectedUser(null)}
        className="btn btn-ghost btn-sm text-xl hidden lg:block"
        aria-label="Close Chat"
      >
        ✕
      </button>
    </div>
  );
};

export default ChatHeader;
