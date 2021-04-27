import React, { useState, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import { Appbar, Button, Card, Avatar, Searchbar } from "react-native-paper";
import firebase from "firebase/app";
import "firebase/firestore";
import { UserModel } from "../../../../models/user.js";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../MainStackScreen.js";
import { RouteProp } from "@react-navigation/native";

interface Props {
  navigation: StackNavigationProp<MainStackParamList, "FeedScreen">;
  route: RouteProp<MainStackParamList, "FilterScreen">;
}

export default function LawyerFilterScreen({ navigation, route }: Props) {
  const [lawyers, setLawyers] = useState<UserModel[]>([]);
  const { lawyerList } = route.params;

  useEffect(() => {
    setLawyers(lawyerList);
  }, [lawyerList]);

  const onPressImmigration = () => {
    let data = lawyers;
    data = data.filter((item) => item.userTypeOfCase == "Immigration");
    navigation.navigate("FeedScreen", { updatedLawyers: data });
  };
  const onPressCivil = () => {
    let data = lawyers;
    data = data.filter((item) => item.userTypeOfCase == "Civil");
    navigation.navigate("FeedScreen", { updatedLawyers: data });
  };

  const onPressCriminal = () => {
    let data = lawyers;
    data = data.filter((item) => item.userTypeOfCase == "Criminal");
    navigation.navigate("FeedScreen", { updatedLawyers: data });
  };

  const onPressPro = () => {
    let data = lawyers;
    data = data.filter((item) => item.userType == "Pro Bono");
    navigation.navigate("FeedScreen", { updatedLawyers: data });
  };
  const onPressPublic = () => {
    let data = lawyers;
    data = data.filter((item) => item.userType == "Public Defender");
    navigation.navigate("FeedScreen", { updatedLawyers: data });
  };
  const onPressClient = () => {
    let data = lawyers;
    data = data.filter((item) => item.userType == "Client");
    navigation.navigate("FeedScreen", { updatedLawyers: data });
  };
  const onPressUndo = () => {
    navigation.navigate("FeedScreen", { updatedLawyers: lawyers });
  };

  return (
    <View>
      <Button onPress={onPressCivil}>Civil</Button>
      <Button onPress={onPressCriminal}>Criminal</Button>
      <Button onPress={onPressImmigration}>Immigration</Button>
      <Button onPress={onPressPro}>Pro Bono Lawyers</Button>
      <Button onPress={onPressPublic}>Public Defenders</Button>
      <Button onPress={onPressClient}>Clients</Button>
      <Button onPress={onPressUndo} style={{ paddingTop: 50 }}>
        Undo Changes
      </Button>
    </View>
  );
}
