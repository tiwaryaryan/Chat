import { useChat } from "../ex/useChat";
import { useEffect, useRef } from "react";

import ChatHeader from "./chatheader";
import MessageInput from "./messageinput";
import MessageSkeleton from "./Messageskel";
import { useAuth } from "../ex/useAuth";
import profile from "../assets/profile.png"
import { formatMessageTime } from "../ex/msg-time";

// // const ChatContainer = () => {
// //   const {
// //     messages,
// //     getMessages,
// //     isMessagesLoading,
// //     selectedUser,
// //     subscribeToMessages,
// //     unsubscribeFromMessages,
// //   } = useChat();
// //   const { authUser } = useAuth();
// //   const messageEndRef = useRef(null);

// //   useEffect(() => {
// //     getMessages(selectedUser._id);

// //     subscribeToMessages();

// //     return () => unsubscribeFromMessages();
// //   }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

// //   useEffect(() => {
// //     if (messageEndRef.current && messages) {
// //       messageEndRef.current.scrollIntoView({ behavior: "smooth" });
// //     }
// //   }, [messages]);

// //   if (isMessagesLoading) {
// //     return (
// //       <div className="flex-1 flex flex-col overflow-auto">
// //         <ChatHeader />
// //         <MessageSkeleton />
// //         <MessageInput />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="flex-1 flex flex-col overflow-auto">
// //       <ChatHeader />

// //       <div className="flex-1 overflow-y-auto p-4 space-y-4">
// //         {messages.map((message) => (
// //           <div
// //             key={message._id}
// //             className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
// //             ref={messageEndRef}
// //           >
// //             <div className=" chat-image avatar">
// //               <div className="size-10 rounded-full border">
// //                 <img
// //                   src={
// //                     message.senderId === authUser._id
// //                       ? authUser.profilePic || profile
// //                       : selectedUser.profilePic || profile
// //                   }
// //                   alt="profile pic"
// //                 />
// //               </div>
// //             </div>
// //             <div className="chat-header mb-1">
// //               <time className="text-xs opacity-50 ml-1">
// //                 {formatMessageTime(message.createdAt)}
// //               </time>
// //             </div>
// //             <div className="chat-bubble flex flex-col">
// //               {message.image && (
// //                 <img
// //                   src={message.image}
// //                   alt="Attachment"
// //                   className="sm:max-w-[200px] rounded-md mb-2"
// //                 />
// //               )}
// //               {message.text && <p>{message.text}</p>}
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       <MessageInput />
// //     </div>
// //   );
// // };
// // export default ChatContainer;


// // import { useChat } from "../ex/useChat";
// // import { useEffect, useRef } from "react";
// // import ChatHeader from "./chatheader";
// // import MessageInput from "./messageinput";
// // import MessageSkeleton from "./Messageskel";
// // import { useAuth } from "../ex/useAuth";
// // import profile from "../assets/profile.png";
// // import { formatMessageTime } from "../ex/msg-time";

// const ChatContainer = ({ isMobile }) => {
//   const {
//     messages,
//     getMessages,
//     isMessagesLoading,
//     selectedUser,
//     subscribeToMessages,
//     unsubscribeFromMessages,
//   } = useChat();
//   const { authUser } = useAuth();
//   const messageEndRef = useRef(null);

//   useEffect(() => {
//     getMessages(selectedUser._id);

//     subscribeToMessages();

//     return () => unsubscribeFromMessages();
//   }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

//   useEffect(() => {
//     if (messageEndRef.current && messages) {
//       messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   if (isMessagesLoading) {
//     return (
//       <div className={`flex-1 ${isMobile ? "hidden" : "flex"} flex-col overflow-auto`}>
//         <ChatHeader />
//         <MessageSkeleton />
//         <MessageInput />
//       </div>
//     );
//   }

//   return (
//     <div className={`flex-1 ${isMobile && !selectedUser ? "hidden" : "flex"} flex-col overflow-auto`}>
//       <ChatHeader />

//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message._id}
//             className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
//             ref={messageEndRef}
//           >
//             <div className="chat-image avatar">
//               <div className="size-10 rounded-full border">
//                 <img
//                   src={
//                     message.senderId === authUser._id
//                       ? authUser.profilePic || profile
//                       : selectedUser.profilePic || profile
//                   }
//                   alt="profile pic"
//                 />
//               </div>
//             </div>
//             <div className="chat-header mb-1">
//               <time className="text-xs opacity-50 ml-1">
//                 {formatMessageTime(message.createdAt)}
//               </time>
//             </div>
//             <div className="chat-bubble flex flex-col">
//               {message.image && (
//                 <img
//                   src={message.image}
//                   alt="Attachment"
//                   className="sm:max-w-[200px] rounded-md mb-2"
//                 />
//               )}
//               {message.text && <p>{message.text}</p>}
//             </div>
//           </div>
//         ))}
//       </div>

//       <MessageInput />
//     </div>
//   );
// };

// export default ChatContainer;


// import { useChat } from "../ex/useChat";
// import { useEffect, useRef } from "react";

// import ChatHeader from "./ChatHeader";
// import MessageInput from "./MessageInput";
// import MessageSkeleton from "./MessageSkeleton";
// import { useAuth } from "../ex/useAuth";
// import profile from "../assets/profile.png";
// import { formatMessageTime } from "../ex/msg-time";

const ChatContainer = ({ isMobile, onBack }) => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChat();
  const { authUser } = useAuth();
  const messageEndRef = useRef(null);

  // Guard clause to handle the case where selectedUser is null
  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">No chat selected</p>
      </div>
    );
  }

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);

      subscribeToMessages();

      return () => unsubscribeFromMessages();
    }
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader isMobile={isMobile} onBack={onBack} />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader isMobile={isMobile} onBack={onBack} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || profile
                      : selectedUser.profilePic || profile
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;

