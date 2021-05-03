import React from "react";
import { StyleSheet } from "react-native";
import { AppStyles } from "../../../../AppStyles";

export const styles = StyleSheet.create({
  ...AppStyles,
  view: {
    flex: 1,
    margin: 20,
  },
  subtitle: {
    color: "#000000",
    fontSize: 16
  },
  image: {
    height: 150,
    width: 150,
    marginBottom: 20,
    borderRadius: 75,
    borderColor: "#000000",
    borderWidth: 1,
    alignSelf: 'center'
  },
});
