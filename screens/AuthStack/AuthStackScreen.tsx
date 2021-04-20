import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";

export type AuthStackParamList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

export function AuthStackScreen() {
  const options = { headerShown: false };
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignInScreen"
        options={options}
        component={SignInScreen}
      />
      <AuthStack.Screen
        name="SignUpScreen"
        options={options}
        component={SignUpScreen}
      />
    </AuthStack.Navigator>
  );
}
