// // // import { useEffect, useState } from "react";
// // // import { useChat } from "../ex/useChat";
// // // import { useAuth } from "../ex/useAuth";
// // // import SidebarSkeleton from "./Sidebarskel";
// // // import { Users } from "lucide-react";
// // // import profile from "../assets/profile.png"

// // // const Sidebar = () => {
// // //   const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChat();

// // //    const { onlineUsers } = useAuth();
// // //   const [showOnlineOnly, setShowOnlineOnly] = useState(false);

// // //   useEffect(() => {
// // //     getUsers();
// // //   }, [getUsers]);


// // //   const filteredUsers = showOnlineOnly
// // //     ? users.filter((user) => onlineUsers.includes(user._id))
// // //     : users;

// // //   if (isUsersLoading) return <SidebarSkeleton />;

// // //   return (
// // //     <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
// // //       <div className="border-b border-base-300 w-full p-5">
// // //         <div className="flex items-center gap-2">
// // //           <Users className="size-6" />
// // //           <span className="font-medium hidden lg:block">Contacts</span>
// // //         </div>
// // //         {/* Online filter toggle */}
// // //         <div className="mt-3 hidden lg:flex items-center gap-2">
// // //           <label className="cursor-pointer flex items-center gap-2">
// // //             <input
// // //               type="checkbox"
// // //               checked={showOnlineOnly}
// // //               onChange={(e) => setShowOnlineOnly(e.target.checked)}
// // //               className="checkbox checkbox-sm"
// // //             />
// // //             <span className="text-sm">Show online only</span>
// // //           </label>
// // //           <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
// // //         </div>
// // //       </div>

// // //       <div className="overflow-y-auto w-full py-3">
// // //         {filteredUsers.map((user) => (
// // //           <button
// // //             key={user._id}
// // //             onClick={() => setSelectedUser(user)}
// // //             className={`
// // //               w-full p-3 flex items-center gap-3
// // //               hover:bg-base-300 transition-colors
// // //               ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
// // //             `}
// // //           >
// // //             <div className="relative mx-auto lg:mx-0">
// // //               <img
// // //                 src={user.profilePic || profile}
// // //                 alt={user.name}
// // //                 className="size-12 object-cover rounded-full"
// // //               />
// // //               {onlineUsers.includes(user._id) && (
// // //                 <span
// // //                   className="absolute bottom-0 right-0 size-3 bg-green-500 
// // //                   rounded-full ring-2 ring-zinc-900"
// // //                 />
// // //               )}
// // //             </div>

// // //             {/* User info - only visible on larger screens */}
// // //             <div className="hidden lg:block text-left min-w-0">
// // //               <div className="font-medium truncate">{user.name}</div>
// // //               <div className="text-sm text-zinc-400">
// // //                 {onlineUsers.includes(user._id) ? "Online" : "Offline"}
// // //               </div>
// // //             </div>
// // //           </button>
// // //         ))}

// // //         {filteredUsers.length === 0 && (
// // //           <div className="text-center text-zinc-500 py-4">No online users</div>
// // //         )}
// // //       </div>
// // //     </aside>
// // //   );
// // // };
// // // export default Sidebar;


// // import { useEffect, useState } from "react";
// // import { useChat } from "../ex/useChat";
// // import { useAuth } from "../ex/useAuth";
// // import SidebarSkeleton from "./Sidebarskel";
// // import { Users } from "lucide-react";
// // import profile from "../assets/profile.png";

// // const Sidebar = ({ isMobile, onClose }) => {
// //   const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChat();
// //   const { onlineUsers } = useAuth();
// //   const [showOnlineOnly, setShowOnlineOnly] = useState(false);

// //   useEffect(() => {
// //     getUsers();
// //   }, [getUsers]);

// //   const filteredUsers = showOnlineOnly
// //     ? users.filter((user) => onlineUsers.includes(user._id))
// //     : users;

// //   if (isUsersLoading) return <SidebarSkeleton />;

// //   return (
// //     <aside
// //       className={`h-full ${
// //         isMobile && selectedUser ? "hidden" : "flex"
// //       } lg:flex w-20 lg:w-72 border-r border-base-300 flex-col transition-all duration-200`}
// //     >
// //       <div className="border-b border-base-300 w-full p-5">
// //         <div className="flex items-center gap-2">
// //           <Users className="size-6" />
// //           <span className="font-medium hidden lg:block">Contacts</span>
// //         </div>
// //         <div className="mt-3 hidden lg:flex items-center gap-2">
// //           <label className="cursor-pointer flex items-center gap-2">
// //             <input
// //               type="checkbox"
// //               checked={showOnlineOnly}
// //               onChange={(e) => setShowOnlineOnly(e.target.checked)}
// //               className="checkbox checkbox-sm"
// //             />
// //             <span className="text-sm">Show online only</span>
// //           </label>
// //           <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
// //         </div>
// //       </div>

// //       <div className="overflow-y-auto w-full py-3">
// //         {filteredUsers.map((user) => (
// //           <button
// //             key={user._id}
// //             onClick={() => {
// //               setSelectedUser(user);
// //               if (isMobile) onClose(); // Close sidebar on mobile
// //             }}
// //             className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
// //               selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""
// //             }`}
// //           >
// //             <div className="relative mx-auto lg:mx-0">
// //               <img
// //                 src={user.profilePic || profile}
// //                 alt={user.name}
// //                 className="size-12 object-cover rounded-full"
// //               />
// //               {onlineUsers.includes(user._id) && (
// //                 <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
// //               )}
// //             </div>
// //             <div className="hidden lg:block text-left min-w-0">
// //               <div className="font-medium truncate">{user.name}</div>
// //               <div className="text-sm text-zinc-400">
// //                 {onlineUsers.includes(user._id) ? "Online" : "Offline"}
// //               </div>
// //             </div>
// //           </button>
// //         ))}
// //         {filteredUsers.length === 0 && (
// //           <div className="text-center text-zinc-500 py-4">No online users</div>
// //         )}
// //       </div>
// //     </aside>
// //   );
// // };

// // export default Sidebar;


import { useEffect, useState } from "react";
import { useChat } from "../ex/useChat";
import { useAuth } from "../ex/useAuth";
import SidebarSkeleton from "./Sidebarskel";
import { Users } from "lucide-react";
import profile from "../assets/profile.png";

// const Sidebar = ({ isMobile, onClose }) => {
//   const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChat();
//   const { onlineUsers } = useAuth();
//   const [showOnlineOnly, setShowOnlineOnly] = useState(false);

//   useEffect(() => {
//     getUsers();
//   }, [getUsers]);

//   const filteredUsers = showOnlineOnly
//     ? users.filter((user) => onlineUsers.includes(user._id))
//     : users;

//   if (isUsersLoading) return <SidebarSkeleton />;

//   return (
//     <aside
//       className={`h-full w-full lg:w-72 border-r border-base-300 flex-col transition-all duration-200 ${
//         isMobile ? "fixed z-50 bg-base-100" : "flex"
//       }`}
//     >
//       {/* Header */}
//       <div className="border-b border-base-300 w-full p-5 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <Users className="size-6" />
//           <span className="font-medium hidden lg:block">Contacts</span>
//         </div>
//         {isMobile && (
//           <button
//             onClick={onClose}
//             className="text-lg font-bold hover:text-gray-400 transition-colors"
//           >
//             &times;
//           </button>
//         )}
//       </div>

//       {/* Online Filter */}
//       <div className="mt-3 hidden lg:flex items-center gap-2 px-5">
//         <label className="cursor-pointer flex items-center gap-2">
//           <input
//             type="checkbox"
//             checked={showOnlineOnly}
//             onChange={(e) => setShowOnlineOnly(e.target.checked)}
//             className="checkbox checkbox-sm"
//           />
//           <span className="text-sm">Show online only</span>
//         </label>
//         <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
//       </div>

//       {/* User List */}
//       <div className="overflow-y-auto w-full py-3">
//         {filteredUsers.map((user) => (
//           <button
//             key={user._id}
//             onClick={() => setSelectedUser(user)}
//             className={`w-full p-4 flex items-center gap-4 hover:bg-base-300 transition-colors ${
//               selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""
//             }`}
//           >
//             <div className="relative">
//               <img
//                 src={user.profilePic || profile}
//                 alt={user.name}
//                 className="size-14 object-cover rounded-full"
//               />
//               {onlineUsers.includes(user._id) && (
//                 <span className="absolute bottom-0 right-0 size-4 bg-green-500 rounded-full ring-2 ring-zinc-900" />
//               )}
//             </div>
//             <div className="text-left">
//               <div className="font-medium truncate">{user.name}</div>
//               <div className="text-sm text-zinc-400">
//                 {onlineUsers.includes(user._id) ? "Online" : "Offline"}
//               </div>
//             </div>
//           </button>
//         ))}
//         {filteredUsers.length === 0 && (
//           <div className="text-center text-zinc-500 py-4">No online users</div>
//         )}
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;



// const Sidebar = ({ isMobile, onClose, onSelectChat }) => {
//   const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChat();
//   const { onlineUsers } = useAuth();
//   const [showOnlineOnly, setShowOnlineOnly] = useState(false);

//   useEffect(() => {
//     getUsers();
//   }, [getUsers]);

//   const filteredUsers = showOnlineOnly
//     ? users.filter((user) => onlineUsers.includes(user._id))
//     : users;

//   if (isUsersLoading) return <SidebarSkeleton />;

//   return (
//     <aside
//       className={`h-full w-full lg:w-72 border-r border-base-300 flex-col transition-all duration-200 ${
//         isMobile ? "fixed z-50 bg-base-100" : "flex"
//       }`}
//     >
//       {/* Header */}
//       <div className="border-b border-base-300 w-full p-5 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <Users className="size-6" />
//           <span className="font-medium hidden lg:block">Contacts</span>
//         </div>
//         {isMobile && (
//           <button
//             onClick={onClose}
//             className="text-lg font-bold hover:text-gray-400 transition-colors"
//           >
//             &times;
//           </button>
//         )}
//       </div>

//       {/* Online Filter */}
//       <div className="mt-3 hidden lg:flex items-center gap-2 px-5">
//         <label className="cursor-pointer flex items-center gap-2">
//           <input
//             type="checkbox"
//             checked={showOnlineOnly}
//             onChange={(e) => setShowOnlineOnly(e.target.checked)}
//             className="checkbox checkbox-sm"
//           />
//           <span className="text-sm">Show online only</span>
//         </label>
//         <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
//       </div>

//       {/* User List */}
//       <div className="overflow-y-auto w-full py-3">
//         {filteredUsers.map((user) => (
//           <button
//             key={user._id}
//             onClick={() => onSelectChat(user)} // Trigger the handler
//             className={`w-full p-4 flex items-center gap-4 hover:bg-base-300 transition-colors ${
//               selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""
//             }`}
//           >
//             <div className="relative">
//               <img
//                 src={user.profilePic || profile}
//                 alt={user.name}
//                 className="size-14 object-cover rounded-full"
//               />
//               {onlineUsers.includes(user._id) && (
//                 <span className="absolute bottom-0 right-0 size-4 bg-green-500 rounded-full ring-2 ring-zinc-900" />
//               )}
//             </div>
//             <div className="text-left">
//               <div className="font-medium truncate">{user.name}</div>
//               <div className="text-sm text-zinc-400">
//                 {onlineUsers.includes(user._id) ? "Online" : "Offline"}
//               </div>
//             </div>
//           </button>
//         ))}
//         {filteredUsers.length === 0 && (
//           <div className="text-center text-zinc-500 py-4">No online users</div>
//         )}
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

const Sidebar = ({ isMobile, onClose, onSelectChat }) => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChat();
  const { onlineUsers } = useAuth();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside
      className={`h-full w-full lg:w-72 border-r border-base-300 flex-col transition-all duration-200 ${
        isMobile ? "fixed z-50 bg-base-100" : "flex"
      }`}
    >
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium">Contacts</span>
        </div>
      </div>

      {/* Online Filter */}
      <div className="mt-3 hidden lg:flex items-center gap-2 px-5">
        <label className="cursor-pointer flex items-center gap-2">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="checkbox checkbox-sm"
          />
          <span className="text-sm">Show online only</span>
        </label>
        <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user, index) => (
          <div key={user._id}>
            <button
              onClick={() => onSelectChat(user)}
              className={`w-full p-4 flex items-center gap-4 hover:bg-base-300 transition-colors ${
                selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""
              }`}
            >
              <div className="relative">
                <img
                  src={user.profilePic || profile}
                  alt={user.name}
                  className="size-14 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-4 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                )}
              </div>
              <div className="text-left">
                <div className="font-medium truncate">{user.name}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
            {/* Add a separator line after each user except the last one */}
            {index < filteredUsers.length - 1 && <hr className="border-t-[2px] border-t-black-900 border-secondary-00 mx-4" />}
          </div>
        ))}
        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
