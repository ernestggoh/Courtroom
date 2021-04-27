import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FeedScreen from "./FeedScreen/FeedScreen.main";
import DetailScreen from "./DetailScreen/DetailScreen.main";
import CommentsScreen from "./CommentsScreen/CommentsScreen.main";
import SavedScreen from "./SavedScreen/SavedScreen.main";
import { UserModel } from "../../../models/user";
import { User } from "firebase";

export type MainStackParamList = {
  FeedScreen: { updatedLawyers: any } | undefined;
  DetailScreen: { user: UserModel };
  CommentsScreen: { user: UserModel };
  NewCommentScreen: { user: UserModel };
  NewSocialScreen: undefined;
  FilterScreen: { lawyerList: any };
  SortScreen: { lawyerList: any };
  SavedScreen: { lawyerList: any };
};

const MainStack = createStackNavigator<MainStackParamList>();

export function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="FeedScreen"
        options={{ headerShown: false }}
        component={FeedScreen}
      />
      <MainStack.Screen
        name="DetailScreen"
        options={{ headerShown: false }}
        component={DetailScreen}
      />
      <MainStack.Screen
        name="CommentsScreen"
        options={{ headerShown: false }}
        component={CommentsScreen}
      />
    </MainStack.Navigator>
  );
}
