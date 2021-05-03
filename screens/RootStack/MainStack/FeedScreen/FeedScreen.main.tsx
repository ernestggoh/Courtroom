import React, { useState, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import { Appbar, Button, Card, Avatar, Searchbar } from "react-native-paper";
import firebase from "firebase/app";
import "firebase/firestore";
import { UserModel } from "../../../../models/user.js";
import { styles } from "./FeedScreen.styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../MainStackScreen.js";

import { TabRouter } from "@react-navigation/routers";
import { RouteProp } from "@react-navigation/native";

interface Props {
  navigation: StackNavigationProp<MainStackParamList, "FeedScreen">;
  route: RouteProp<MainStackParamList, "FeedScreen">;
}

export default function FeedScreen({ navigation, route }: Props) {
  // List of user objects
  // I am starting with Cilent Point of View, displaying Lawyers
  /*TODO insert if-else clause to deal with lawyer point of view */
  const [filteredLawyers, setFilteredLawyers] = useState<UserModel[]>([]);
  const [user, setUsers] = useState<UserModel[]>([]);
  const [search, setSearch] = useState("");
  const [isCilent, setIsCilent] = useState<boolean | null>(true);
  const currentUserId = firebase.auth().currentUser!.uid;

  // checking if user is a lawyer
  useEffect(() => {

    const db = firebase.firestore();
    const unsubscribe = db
      .collection("lawyers")
      .where("owner", "==", currentUserId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((lawyer) => {
            console.log("DOES THIS RUN 1");
            setIsCilent(false);
        });
      });
    return unsubscribe;
  }, []);

// checking if user is a cilent
  useEffect(() => {

    const db = firebase.firestore();
    const unsubscribe = db
      .collection("cilents")
      .where("owner", "==", currentUserId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((cilent) => {
            console.log("DOES THIS RUN 2");
            setIsCilent(true);
        });
      });
    return unsubscribe;
  }, []);

  if (isCilent === true){
    useEffect(() => {
      console.log("creating lsist of lawyers");
      const db = firebase.firestore();
      const unsubscribe = db
        .collection("lawyers")
        .orderBy("userNickname", "asc")
        .onSnapshot((querySnapshot) => {
          var newLawyers: UserModel[] = [];
          querySnapshot.forEach((lawyer) => {
            const newLawyer = lawyer.data() as UserModel;
            newLawyer.id = lawyer.id;
            newLawyers.push(newLawyer);
          });
          setUsers(newLawyers);
          setFilteredLawyers(newLawyers);
        });
      return unsubscribe;
    }, [isCilent]);
  } else {
    useEffect(() => {
      console.log("creating lsist of cilents");
      const db = firebase.firestore();
      const unsubscribe = db
        .collection("cilents")
        .orderBy("userNickname", "asc")
        .onSnapshot((querySnapshot) => {
          var newCilents: UserModel[] = [];
          querySnapshot.forEach((cilent) => {
            const newCilent = cilent.data() as UserModel;
            newCilent.id = cilent.id;
            newCilents.push(newCilent);
          });
          setUsers(newCilents);
          setFilteredLawyers(newCilents);
        });
      return unsubscribe;
    }, [isCilent]);
  }


  useEffect(() => {
    if (route.params?.updatedLawyers) {
      setFilteredLawyers(route.params.updatedLawyers);
    }
  }, [route.params?.updatedLawyers]);

  const deleteSocial = (social: UserModel) => {
    firebase.firestore().collection("socials").doc(social.id).delete();
  };

  const selectedSortButton = () => {
    navigation.navigate("SortScreen", { lawyerList: filteredLawyers });
  };
  const selectedSavedButton = () => {
    navigation.navigate("SavedScreen", { lawyerList: user });
  };
  const selectedFilterButton = () => {
    navigation.navigate("FilterScreen", { lawyerList: user });
  };

  const renderSocial = ({ item }: { item: UserModel }) => {
    const onPress = () => {
      navigation.navigate("DetailScreen", {
        user: item,
      });
    };

    let meetsSearchCriteria =
      search.trim() == "" ||
      item.userNickname.toLowerCase().includes(search.trim().toLowerCase());
    // let meetsActorsCriteria =
    //   actors.length == 0 || overlapFound(actors, item.actors);
    if (meetsSearchCriteria) {
      return (
        <Card onPress={onPress} style={{ margin: 16 }}>
          <Card.Title
            title={item.userNickname}
            subtitle={
              item.userLocation + " • " + item.userTypeOfCase
            }
            left={(props) => (
              <Avatar.Image size={50} source={{ uri: item.userImage }} />
            )}
          />
        </Card>
      );
    } else {
      // If the item doesn't meet search/filter criteria, then we can
      // simply return null and it won't be rendered in the list!
      return null;
    }
  };

  const Bar = () => {
    return (
      <Appbar.Header>
        <Appbar.Action
          icon="exit-to-app"
          onPress={() => firebase.auth().signOut()}
        />
        <Appbar.Content title="Courtroom" />
        <Appbar.Action
          icon="account"
          onPress={() => {
            navigation.navigate("NewSocialScreen");
          }}
        />
      </Appbar.Header>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <View>
        <Text style={{ color: "gray", margin: 30, textAlign: "center" }}>
          {
            "Welcome! To get started, use the plus button in the top-right corner to create a profile."
          }
        </Text>
      </View>
    );
  };

  return (
    <>
      <Bar />
      <View style={styles.container}>
        <Searchbar
          placeholder="Type Here..."
          onChangeText={setSearch}
          value={search}
        />
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Button onPress={selectedSortButton}>Sort</Button>
          <Button onPress={selectedFilterButton}>Filter</Button>
        </View>
        <Button onPress={selectedSavedButton}>Saved Users</Button>
        <FlatList
          data={filteredLawyers}
          renderItem={renderSocial}
          keyExtractor={(_, index) => "key-" + index}
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>
    </>
  );
}
