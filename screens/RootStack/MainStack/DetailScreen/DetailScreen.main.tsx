import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ScrollView, Image, Text, View } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { MainStackParamList } from "../MainStackScreen";
import { styles } from "./DetailScreen.styles";

interface Props {
  navigation: StackNavigationProp<MainStackParamList, "DetailScreen">;
  route: RouteProp<MainStackParamList, "DetailScreen">;
}

export default function DetailScreen({ route, navigation }: Props) {
  const { user } = route.params;

  const Bar = () => {
    return (
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate("FeedScreen")} />
        <Appbar.Content title="Schedule Rater" />
      </Appbar.Header>
    );
  };

  return (
    <>
      <Bar />
      <ScrollView style={styles.container}>
        <View style={styles.view}>
          <Image style={styles.image} source={{ uri: user.userImage }} />
          <Text style={{ ...styles.h1, marginVertical: 10 }}>
            {user.userNickname}
          </Text>
          <Text style={{ ...styles.subtitle, marginBottom: 5 }}>
            {"Location: " + user.userLocation}
          </Text>
          <Text style={{ ...styles.subtitle, marginTop: 5, marginBottom: 20 }}>
            {"Type of Case: " + user.userTypeOfCase}
          </Text>
          <Text style={{ ...styles.subtitle, marginTop: 0, marginBottom: 20 }}>
            {"About: " + user.userAbout}
          </Text>
          {/* <Button
            color="blue"
            onPress={() =>
              navigation.navigate("CommentsScreen", {
                social: social,
              })
            }
          > */}
            {/* {"Comments"}
          </Button> */}
        </View>
      </ScrollView>
    </>
  );
}
