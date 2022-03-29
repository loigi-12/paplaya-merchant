import { ToastAndroid } from "react-native";

export default Toast = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};
