import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
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

const FeedStack = createStackNavigator<MainStackParamList>();
const ChatStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function FeedStackScreen() {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen
        name="FeedScreen"
        options={{ headerShown: false }}
        component={FeedScreen}
      />
      <FeedStack.Screen
        name="DetailScreen"
        options={{ headerShown: false }}
        component={DetailScreen}
      />
    </FeedStack.Navigator>
  );
}

function ChatStackScreen() {
  /* not fully implemented. This will be the stack for chat*/
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="CommentsScreen"
        options={{ headerShown: false }}
        component={CommentsScreen}
      />
      <ChatStack.Screen
        name="NewCommentsScreen"
        options={{ headerShown: false }}
        component={CommentsScreen}
      />
    </ChatStack.Navigator>
  );
}

export function MainStackScreen() {
  return (
    <Tab.Navigator
      activeColor={"#000000"}
      labeled={false}
      barStyle={{ backgroundColor: "#DBDBDB", paddingTop: 5 }}
    >
      <Tab.Screen
        name="Home"
        component={FeedStackScreen}
        options={{ tabBarIcon: "home" }}
      />
      <Tab.Screen
        name="Comments"
        component={ChatStackScreen}
        options={{ tabBarIcon: "chat" }}
      />
    </Tab.Navigator>
  );
}

/**
 * MainStackScreen()
 * <MainStack.Navigator>
      
      <MainStack.Screen
        name="CommentsScreen"
        options={{ headerShown: false }}
        component={CommentsScreen}
      />
    </MainStack.Navigator>
 */
