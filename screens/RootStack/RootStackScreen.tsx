import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MainStackScreen } from "./MainStack/MainStackScreen";
import NewSocialScreen from "./NewSocialScreen/NewSocialScreen.main";
import NewCommentScreen from "./MainStack/CommentsScreen/NewCommentScreen.main";
import LawyerFilterScreen from "./MainStack/OrganizeScreens/LawyerFilterScreen.main";
import SavedScreen from "./MainStack/SavedScreen/SavedScreen.main";
import SortScreen from "./MainStack/OrganizeScreens/SortScreen.main";
import { NavigationContainer } from "@react-navigation/native";
import { UserModel } from "../../models/user";

export type RootStackParamList = {
  Main: undefined;
  NewSocialScreen: undefined;
  NewCommentScreen: undefined;
  FilterScreen: undefined;
  SortScreen: undefined;
  SavedScreen: undefined;
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

        <RootStack.Screen
          name="FilterScreen"
          component={LawyerFilterScreen}
          options={{ headerTitleAlign: "center" }}
        />

        <RootStack.Screen
          name="SortScreen"
          component={SortScreen}
          options={{ headerTitleAlign: "center" }}
        />

        <RootStack.Screen
          name="SavedScreen"
          component={SavedScreen}
          options={{ headerTitleAlign: "center" }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
