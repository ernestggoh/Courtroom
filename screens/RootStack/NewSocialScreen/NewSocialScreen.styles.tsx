import { StyleSheet } from "react-native";
import { AppStyles } from "../../../AppStyles";

export const styles = StyleSheet.create({
  ...AppStyles,
  button: {
    marginTop: 40, 
    borderRadius: 40, 
    height: 40, 
    backgroundColor: "#00F0FF", 
    width: 200, 
    alignSelf: 'center',
    shadowColor: "#FFFFFF"
  }
});
