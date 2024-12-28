import { create } from "zustand";
import { axiosInstance } from "./axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const useAuth = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {

        try{
            const res = await  axiosInstance.get("/auth/check");

            set ({authUser: res.data});
            // set ({authUser: null});
            get().connectSocket();
        }
        catch(err){
            set ({authUser: null});
            console.log(err.message);
        }

    },

    signup: async (data) => {
        // console.log(data);
        // console.log("sign1")
        set({ isSigningUp: true });
        //console.log("sign2")
        try {
           
            // console.log(get().authUser);
          const res = await axiosInstance.post("/signup", data);
          
          set({ authUser: res.data });
          
          toast.success("Account created successfully");
          get().connectSocket();
        } catch (error) {
          toast.error(error);
          console.log(error.message);
         
        } finally {
            
          set({ isSigningUp: false });
          
        }

        // console.log(get().isSigningUp);
        // console.log(get().authUser);
      },


      login: async (data) => {
        //console.log(data);
        set({ isLoggingIn: true });
        
        try {
           
          //console.log(get().authUser);
          const res = await axiosInstance.post("/login", data);
          
          set({ authUser: res.data });
          //console.log(get().authUser);
         
          toast.success("Logged in successfully");
          get().connectSocket();
        } catch (error) {
          toast.error(error.response?.data?.error );  //for printing the error message already writen in backend
          console.log(error.message);
         
        } finally {
            
          set({ isLoggingIn: false });
        }

        // console.log(get().isSigningUp);
        // console.log(get().authUser);
      },


      updateProfile: async (data) => {
        ////console.log("ok1");
        set({ isUpdatingProfile: true });
        try {
          //console.log("ok2");
          const res = await axiosInstance.put("/update-profile", data);
          set({ authUser: res.data });
          //console.log("ok3");
          toast.success("Profile updated successfully");
        } catch (error) {
          console.log("error in update profile:", error);
          toast.error(error.response.data.message);
        } finally {
          set({ isUpdatingProfile: false });
        }
      },

      logout: async () => {
        try {
          await axiosInstance.post("/logout");
          set({ authUser: null });
          toast.success("Logged out successfully");
          get().disconnectSocket();
        } catch (error) {

          toast.error(error.response.data.message);
        }
      },


      connectSocket: () => {
        const { authUser, socket } = get();
        //console.log("authUser:", authUser, "socket:", socket);
        if (!authUser || (socket && socket.connected)) return;
    
        const newSocket = io("https://chat-app-backend-zhsl.onrender.com" , {
          query: {
            userId: authUser._id,
          }
        });
        set({ socket: newSocket });
        newSocket.connect();

        newSocket.on("getOnlineUsers" ,(userIds) => {

          set({onlineUsers: userIds});
        });
    },
    
    disconnectSocket: () => {
      const { socket } = get();
      if (socket) {
          socket.disconnect();
          set({ socket: null });
      }
  },
  
    

}));

