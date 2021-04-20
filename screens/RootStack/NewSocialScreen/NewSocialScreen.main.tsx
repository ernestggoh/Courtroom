import React, { useState, useEffect } from "react";
import { Platform, View } from "react-native";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { getFileObjectAsync } from "../../../Utils";

// See https://github.com/mmazzarolo/react-native-modal-datetime-picker
// Most of the date picker code is directly sourced from the example
import DateTimePickerModal from "react-native-modal-datetime-picker";

// See https://docs.expo.io/versions/latest/sdk/imagepicker/
// Most of the image picker code is directly sourced from the example
import * as ImagePicker from "expo-image-picker";
import { styles } from "./NewSocialScreen.styles";

import firebase from "firebase/app";
import "firebase/firestore";
import { UserModel } from "../../../models/user";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackScreen";
import * as WebBrowser from "expo-web-browser";
interface Props {
  navigation: StackNavigationProp<RootStackParamList, "NewSocialScreen">;
}


// I am doing for lawyers only, we need to explore cilents too

export default function NewSocialScreen({ navigation }: Props) {
  // Event details.
  const [nickname, setNickname] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState<string | undefined>(undefined);
  const [typeOfCase, setTypeOfCase] = useState("");
  const [location, setLocation] = useState("");
  const [visible, setVisible] = useState(false);
  // Snackbar.
  const [message, setMessage] = useState("");
  // Loading state for submit button
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState<any | null>(null);

  // const handlePressButtonAsync = async () => {
  //   let result = await WebBrowser.openBrowserAsync(
  //     "https://calcentral.berkeley.edu/dashboard"
  //   );
  //   setLink(result);
  // };
  // Code for ImagePicker (from docs)
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  // Code for ImagePicker (from docs)
  const pickImage = async () => {
    console.log("picking image");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("done");
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // Code for SnackBar (from docs)
  const onDismissSnackBar = () => setVisible(false);
  const showError = (error: string) => {
    setMessage(error);
    setVisible(true);
  };

  // This method is called AFTER all fields have been validated.
  const saveEvent = async () => {
    if (!nickname) {
      showError("Please enter a nickname.");
      return;
    } else if (!location) {
      showError("Please enter your location.");
      return;
    } else if (!typeOfCase) {
      showError("Please enter your type of case.");
      return;
    } else if (!about) {
      showError("Please enter description for About.");
      return;
    } else if (!image) {
      showError("Please choose a profile picture.");
      return;
    } else {
      setLoading(true);
    }

    try {
      // Firestore wants a File Object, so we first convert the file path
      // saved in eventImage to a file object.
      console.log("getting file object");
      const object: Blob = (await getFileObjectAsync(image)) as Blob;
      // Generate a brand new doc ID by calling .doc() on the socials node.
      const userRef = firebase.firestore().collection("lawyers").doc();
      console.log("putting file object");
      const result = await firebase
        .storage()
        .ref()
        .child(userRef.id + ".jpg")
        .put(object);
      console.log("getting download url");
      const downloadURL = await result.ref.getDownloadURL();
      const doc: UserModel = {
        userNickname: nickname,
        userAbout: about,
        userTypeOfCase: typeOfCase,
        userLocation: location,
        userImage: downloadURL,
        owner: firebase.auth().currentUser!.uid,
      };
      console.log("setting download url");
      await userRef.set(doc);
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      showError(error.toString());
    }
  };

  const Bar = () => {
    return (
      <Appbar.Header>
        <Appbar.Action onPress={navigation.goBack} icon="close" />
        <Appbar.Content title="Courtroom" />
      </Appbar.Header>
    );
  };

  return (
    <>
      <Bar />
      <View style={{ ...styles.container, padding: 20 }}>
        <TextInput
          label="Nickname"
          value={nickname}
          onChangeText={(name) => setNickname(name)}
          style={{ backgroundColor: "white", marginBottom: 10 }}
        />
        <TextInput
          label="About"
          value={about}
          multiline={true}
          onChangeText={(desc) => setAbout(desc)}
          style={{ backgroundColor: "white", marginBottom: 10 }}
        />
        <TextInput
          label="Location"
          value={location}
          onChangeText={(major) => setLocation(major)}
          style={{ backgroundColor: "white", marginBottom: 10 }}
        />
        <TextInput
          label="Type of Case"
          value={typeOfCase}
          onChangeText={(text) => setTypeOfCase(text)}
          style={{ backgroundColor: "white", marginBottom: 10 }}
        />
        {/* <Button onPress={handlePressButtonAsync}>Open WebBrowser</Button> */}
        <Button mode="outlined" onPress={pickImage} style={{ marginTop: 20 }}>
          {image ? "Change Image" : "Pick an Image"}
        </Button>
        <Button
          mode="contained"
          onPress={saveEvent}
          style={{ marginTop: 20 }}
          loading={loading}
        >
          Save Event
        </Button>
        <Snackbar
          duration={3000}
          visible={visible}
          onDismiss={onDismissSnackBar}
        >
          {message}
        </Snackbar>
      </View>
    </>
  );
}
