import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MainStackScreen } from "./MainStack/MainStackScreen";
import NewSocialScreen from "./NewSocialScreen/NewSocialScreen.main";
import NewCommentScreen from "./MainStack/CommentsScreen/NewCommentScreen.main";
import { NavigationContainer } from "@react-navigation/native";

export type RootStackParamList = {
  Main: undefined;
  NewSocialScreen: undefined;
  NewCommentScreen: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export function RootStackScreen() {
  const options = { headerShown: false };
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal" initialRouteName="Main">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={options}
        />
        <RootStack.Screen
          name="NewSocialScreen"
          options={options}
          component={NewSocialScreen}
        />

        <RootStack.Screen
          name="NewCommentScreen"
          options={options}
          component={NewCommentScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
