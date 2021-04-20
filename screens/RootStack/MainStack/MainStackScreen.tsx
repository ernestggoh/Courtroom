import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FeedScreen from "./FeedScreen/FeedScreen.main";
import DetailScreen from "./DetailScreen/DetailScreen.main";
import CommentsScreen from "./CommentsScreen/CommentsScreen.main";
import { SocialModel } from "../../../models/social";

export type MainStackParamList = {
  FeedScreen: undefined;
  DetailScreen: { social: SocialModel };
  CommentsScreen: { social: SocialModel };
  NewCommentScreen: { social: SocialModel };
  NewSocialScreen: undefined;
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
