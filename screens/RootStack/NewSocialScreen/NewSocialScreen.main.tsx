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
import { SocialModel } from "../../../models/social";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackScreen";
import * as WebBrowser from "expo-web-browser";
interface Props {
  navigation: StackNavigationProp<RootStackParamList, "NewSocialScreen">;
}

export default function NewSocialScreen({ navigation }: Props) {
  // Event details.
  const [eventName, setEventName] = useState("");
  const [units, setUnits] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventImage, setEventImage] = useState<string | undefined>(undefined);
  const [major, setMajor] = useState("");
  const [commitments, setCommitments] = useState("");
  const [visible, setVisible] = useState(false);
  // Snackbar.
  const [message, setMessage] = useState("");
  // Loading state for submit button
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState<any | null>(null);

  const handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(
      "https://calcentral.berkeley.edu/dashboard"
    );
    setLink(result);
  };
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
      setEventImage(result.uri);
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
    if (!eventName) {
      showError("Please enter an event name.");
      return;
    } else if (!units) {
      showError("Please enter the number of units.");
      return;
    } else if (!major) {
      showError("Please enter a major.");
      return;
    } else if (!eventDescription) {
      showError("Please enter an event description.");
      return;
    } else if (!eventImage) {
      showError("Please choose an event image.");
      return;
    } else {
      setLoading(true);
    }

    try {
      // Firestore wants a File Object, so we first convert the file path
      // saved in eventImage to a file object.
      console.log("getting file object");
      const object: Blob = (await getFileObjectAsync(eventImage)) as Blob;
      // Generate a brand new doc ID by calling .doc() on the socials node.
      const socialRef = firebase.firestore().collection("socials").doc();
      console.log("putting file object");
      const result = await firebase
        .storage()
        .ref()
        .child(socialRef.id + ".jpg")
        .put(object);
      console.log("getting download url");
      const downloadURL = await result.ref.getDownloadURL();
      const doc: SocialModel = {
        eventName: eventName,
        units: units,
        major: major,
        commitments: commitments,
        eventDescription: eventDescription,
        eventImage: downloadURL,
        owner: firebase.auth().currentUser!.uid,
        interested: {},
        upvotes: 0,
      };
      console.log("setting download url");
      await socialRef.set(doc);
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
        <Appbar.Content title="Schedule Rater" />
      </Appbar.Header>
    );
  };

  return (
    <>
      <Bar />
      <View style={{ ...styles.container, padding: 20 }}>
        <TextInput
          label="Schedule Name"
          value={eventName}
          onChangeText={(name) => setEventName(name)}
          style={{ backgroundColor: "white", marginBottom: 10 }}
        />
        <TextInput
          label="Schedule Description"
          value={eventDescription}
          multiline={true}
          onChangeText={(desc) => setEventDescription(desc)}
          style={{ backgroundColor: "white", marginBottom: 10 }}
        />
        <TextInput
          label="Major"
          value={major}
          onChangeText={(major) => setMajor(major)}
          style={{ backgroundColor: "white", marginBottom: 10 }}
        />
        <TextInput
          label="Units"
          keyboardType="numeric"
          value={units}
          onChangeText={(text) => setUnits(text)}
          style={{ backgroundColor: "white", marginBottom: 10 }}
        />
        <TextInput
          label="Other Commitments"
          value={commitments}
          onChangeText={(text) => setCommitments(text)}
          style={{ backgroundColor: "white", marginBottom: 10 }}
        />
        <Button onPress={handlePressButtonAsync}>Open WebBrowser</Button>
        <Button mode="outlined" onPress={pickImage} style={{ marginTop: 20 }}>
          {eventImage ? "Change Image" : "Pick an Image"}
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
