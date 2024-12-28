// // // import { useChat } from "../ex/useChat";

// // // import Sidebar from "../ex2/Sidebar";
// // // import NoChatSelected from "../ex2/NoChatSelected";
// // // import ChatContainer from "../ex2/ChatContainer";

// // // const HomePage = () => {
// // //   const { selectedUser } = useChat();

// // //   return (
// // //     <div className="h-screen bg-base-200">
// // //       <div className="flex items-center justify-center pt-20 px-4">
// // //         <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
// // //           <div className="flex h-full rounded-lg overflow-hidden">
// // //             <Sidebar />

// // //             {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
  
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };
// // // export default HomePage;


// // import { useChat } from "../ex/useChat";

// // import Sidebar from "../ex2/Sidebar";
// // import NoChatSelected from "../ex2/NoChatSelected";
// // import ChatContainer from "../ex2/ChatContainer";
// // import { useState, useEffect } from "react";

// // const HomePage = () => {
// //   const { selectedUser } = useChat();
// //   const [isMobile, setIsMobile] = useState(false);

// //   useEffect(() => {
// //     const handleResize = () => {
// //       setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
// //     };

// //     handleResize(); // Set initial value
// //     window.addEventListener("resize", handleResize);

// //     return () => {
// //       window.removeEventListener("resize", handleResize);
// //     };
// //   }, []);

// //   return (
// //     <div className="h-screen bg-base-200">
// //       <div className="flex items-center justify-center pt-20 px-4">
// //         <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
// //           <div className="flex h-full rounded-lg overflow-hidden">
// //             {isMobile ? (
// //               selectedUser ? (
// //                 <ChatContainer isMobile={isMobile} />
// //               ) : (
// //                 <Sidebar isMobile={isMobile} />
// //               )
// //             ) : (
// //               <>
// //                 <Sidebar isMobile={isMobile} />
// //                 {!selectedUser ? <NoChatSelected /> : <ChatContainer isMobile={isMobile} />}
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default HomePage;


// import { useChat } from "../ex/useChat";

// import Sidebar from "../ex2/Sidebar";
// import NoChatSelected from "../ex2/NoChatSelected";
// import ChatContainer from "../ex2/ChatContainer";
// import { useState, useEffect } from "react";

// const HomePage = () => {
//   const { selectedUser } = useChat();
//   const [isMobile, setIsMobile] = useState(false);
//   const [isSidebarVisible, setIsSidebarVisible] = useState(true);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
//     };

//     handleResize(); // Set initial value
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return (
//     <div className="h-screen bg-base-200">
//       <div className="flex items-center justify-center pt-20 px-4">
//         <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
//           <div className="flex h-full rounded-lg overflow-hidden">
//             {isMobile ? (
//               isSidebarVisible ? (
//                 <Sidebar
//                   isMobile={isMobile}
//                   onClose={() => setIsSidebarVisible(false)}
//                 />
//               ) : (
//                 selectedUser && (
//                   <ChatContainer
//                     isMobile={isMobile}
//                     onBack={() => setIsSidebarVisible(true)}
//                   />
//                 )
//               )
//             ) : (
//               <>
//                 <Sidebar isMobile={isMobile} />
//                 {!selectedUser ? <NoChatSelected /> : <ChatContainer isMobile={isMobile} />}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import { useChat } from "../ex/useChat";

import Sidebar from "../ex2/Sidebar";
import NoChatSelected from "../ex2/NoChatSelected";
import ChatContainer from "../ex2/ChatContainer";
import { useState, useEffect } from "react";

const HomePage = () => {
  const { selectedUser, setSelectedUser } = useChat();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // When a chat is selected, hide the sidebar on mobile
  const handleSelectChat = (user) => {
    setSelectedUser(user);
    if (isMobile) {
      setIsSidebarVisible(false);
    }
  };

  // Handle back to sidebar from the chat container on mobile
  const handleBackToSidebar = () => {
    setIsSidebarVisible(true);
  };

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            {isMobile ? (
              isSidebarVisible ? (
                <Sidebar
                  isMobile={isMobile}
                  onClose={() => setIsSidebarVisible(false)}
                  onSelectChat={handleSelectChat} // Pass select chat handler
                />
              ) : (
                <ChatContainer
                  isMobile={isMobile}
                  onBack={handleBackToSidebar} // Pass back handler
                />
              )
            ) : (
              <>
                <Sidebar
                  isMobile={isMobile}
                  onSelectChat={handleSelectChat} // Pass select chat handler
                />
                {!selectedUser ? <NoChatSelected /> : <ChatContainer isMobile={isMobile} />}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

