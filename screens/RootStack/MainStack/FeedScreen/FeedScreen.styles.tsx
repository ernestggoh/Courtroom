import { StyleSheet } from "react-native";
import { AppStyles } from "../../../../AppStyles";

export const styles = StyleSheet.create({
  ...AppStyles,
  sortingButtons: {
    borderColor: "#000000",
    borderBottomColor: "#000000",
    borderWidth: 1,
    borderRadius: 0,
    marginTop: 10,
    width: 200
  },
  savedUsersButton: {
    borderColor: "#000000",
    borderBottomColor: "#000000",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    height: 40,
    marginLeft: 15,
    marginRight: 15
  },
  searchBar: {
    borderRadius: 10,
    backgroundColor: "#d3d3d3",
    marginTop: 10,
    marginLeft: 15, 
    marginRight: 15,
    marginBottom: 5,
    shadowRadius: 0,
    shadowColor: "#FFFFFF"
  }, 
  cardStyle: {
    margin: 15, 
    height: 80, 
    borderRadius: 15,
    borderColor: "#000000",
    borderWidth: 1,
  }
});
