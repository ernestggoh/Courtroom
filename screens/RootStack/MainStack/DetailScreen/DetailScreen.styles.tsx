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
    color: "gray",
  },
  image: {
    height: 200,
    width: "100%",
    marginBottom: 20,
  },
});
