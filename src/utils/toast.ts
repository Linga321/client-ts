import { toast } from "react-toastify";
export type MesgType = "info" | "success" | "warning" | "error" 
export const notifyByTost = (message: string , typeOfMeg: MesgType) => {
    toast[typeOfMeg](message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  };