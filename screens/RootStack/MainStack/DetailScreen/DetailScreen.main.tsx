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
  const { social } = route.params;

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
          <Image style={styles.image} source={{ uri: social.eventImage }} />
          <Text style={{ ...styles.h1, marginVertical: 10 }}>
            {social.eventName}
          </Text>
          <Text style={{ ...styles.subtitle, marginBottom: 5 }}>
            {"Major: " + social.major}
          </Text>
          <Text style={{ ...styles.subtitle, marginTop: 5, marginBottom: 20 }}>
            {"Description: " + social.eventDescription}
          </Text>
          <Text style={{ ...styles.subtitle, marginTop: 0, marginBottom: 20 }}>
            {"Commitments: " + social.commitments}
          </Text>
          <Text style={{ ...styles.subtitle, marginTop: 0, marginBottom: 20 }}>
            {"Upvotes: " + social.upvotes}
          </Text>
          <Button
            color="blue"
            onPress={() =>
              navigation.navigate("CommentsScreen", {
                social: social,
              })
            }
          >
            {"Comments"}
          </Button>
        </View>
      </ScrollView>
    </>
  );
}
