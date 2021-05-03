import React, { useState, useEffect } from "react";
import { Platform, View } from "react-native";
import { Appbar, TextInput, Snackbar, Button, RadioButton, Text } from "react-native-paper";
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
<<<<<<< HEAD
//import * as WebBrowser from "expo-web-browser";
=======
// import * as WebBrowser from "expo-web-browser";
>>>>>>> 46bdbf20b11821d248514b9cada51d2aaf2fd01a
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
  const [type, setType] = useState("");
  // Snackbar.
  const [message, setMessage] = useState("");
  // Loading state for submit button
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState<any | null>(null);
  const [lawyerProfileExists, setLawyerProfileExists] = useState(false);
  const [cilentProfileExists, setCilentProfileExists] = useState(false);
  const [isCilent, setIsCilent] = useState<boolean | null>(null);
  const [cilentProfiles, setCilentProfiles] = useState<string[]>([]);
  const [lawyerProfiles, setLawyerProfiles] = useState<string[]>([]);
  const [checked, setChecked] = React.useState("first");
  var do1 = true;
  // const handlePressButtonAsync = async () => {
  //   let result = await WebBrowser.openBrowserAsync(
  //     "https://calcentral.berkeley.edu/dashboard"
  //   );
  //   setLink(result);
  // };


  const currentUserId = firebase.auth().currentUser!.uid;
  const db = firebase.firestore();
  // const getCilents = async () => {
  //   console.log("picking image");
  //   await   db.collection("lawyers").where("owner", "==", currentUserId)
  //   .get()
  //   .then((querySnapshot) => {
  //       var lawyerProfilesIDs: string[] = [];
  //       querySnapshot.forEach((lawyer) => {
  //           // doc.data() is never undefined for query doc snapshots
  //           // console.log(doc.id, " => ", doc.data());
  //           const newLawyer = lawyer.data() as UserModel;
  //           setLawyerProfileExists(true);
  //           setNickname(newLawyer.userNickname);
  //           setAbout(newLawyer.userAbout);
  //           setImage(newLawyer.userImage);
  //           setTypeOfCase(newLawyer.userTypeOfCase);
  //           setLocation(newLawyer.userLocation);
  //           lawyerProfilesIDs.push(lawyer.id);
  //       });
  //       setLawyerProfiles(lawyerProfilesIDs);
  //   })
  //   .catch((error) => {
  //       console.log("Error getting documents: ", error);
  //   });
  // };
  // getCilents();
  // if (do1) {
  //   console.log("doing this 1");
  //   db.collection("lawyers").where("owner", "==", currentUserId)
  //     .get()
  //     .then((querySnapshot) => {
  //         var lawyerProfilesIDs: string[] = [];
  //         querySnapshot.forEach((lawyer) => {
  //             // doc.data() is never undefined for query doc snapshots
  //             // console.log(doc.id, " => ", doc.data());
  //             const newLawyer = lawyer.data() as UserModel;
  //             console.log(newLawyer.userNickname);
  //             setLawyerProfileExists(true);
  //             setNickname(newLawyer.userNickname);
  //             setAbout(newLawyer.userAbout);
  //             setImage(newLawyer.userImage);
  //             setTypeOfCase(newLawyer.userTypeOfCase);
  //             setLocation(newLawyer.userLocation);
  //             lawyerProfilesIDs.push(lawyer.id);
  //         });
  //         setLawyerProfiles(lawyerProfilesIDs);
  //     })
  //     .catch((error) => {
  //         console.log("Error getting documents: ", error);
  //     });
  //   do1 = false;
  // }

  console.log("doing this 1");
  
  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db
      .collection("lawyers")
      .where("owner", "==", currentUserId)
      .onSnapshot((querySnapshot) => {
        var lawyerProfilesIDs: string[] = [];
        querySnapshot.forEach((lawyer) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            const newLawyer = lawyer.data() as UserModel;
            console.log(newLawyer.userNickname);
            setLawyerProfileExists(true);
            setNickname(newLawyer.userNickname);
            setAbout(newLawyer.userAbout);
            setImage(newLawyer.userImage);
            setTypeOfCase(newLawyer.userTypeOfCase);
            setLocation(newLawyer.userLocation);
            setChecked("lawyer");
            lawyerProfilesIDs.push(lawyer.id);
        });
        setLawyerProfiles(lawyerProfilesIDs);
        console.log(lawyerProfilesIDs);
      });
    return unsubscribe;
  }, []);
  
  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db
      .collection("cilents")
      .where("owner", "==", currentUserId)
      .onSnapshot((querySnapshot) => {
        var cilentProfilesIDs: string[] = [];
      querySnapshot.forEach((cilents) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          const newCilent = cilents.data() as UserModel;
          setCilentProfileExists(true);
          setNickname(newCilent.userNickname);
          setAbout(newCilent.userAbout);
          setImage(newCilent.userImage);
          setTypeOfCase(newCilent.userTypeOfCase);
          setLocation(newCilent.userLocation);
          setChecked("cilent");
          cilentProfilesIDs.push(cilents.id);
      });
      setCilentProfiles(cilentProfilesIDs);
      });
    return unsubscribe;
  }, []);


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
      // Delete all existing portfolios
      // deleting cilent
      // cilentProfiles.forEach(cilentProfile => {
      //   db.collection("cilents").doc(cilentProfile).delete().then(() => {
      //     console.log("Document successfully deleted!");
      //   }).catch((error) => {
      //       console.error("Error removing document: ", error);
      //   });
      // });
      // deleting lawyers

      lawyerProfiles.forEach(lawyerProfile => {
        console.log("printing for deletion");
        console.log(lawyerProfile);
        db.collection("lawyers").doc(lawyerProfile).delete().then(() => {
          console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
      });

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
        userType: type,
        userAbout: about,
        userTypeOfCase: typeOfCase,
        userLocation: location,
        userImage: downloadURL,
        interested: {},
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
        <Appbar.Content title="Your Portfolio" />
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
          label="Pro Bono/Public Defender/Client"
          value={type}
          onChangeText={(type) => setType(type)}
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
        <RadioButton.Group onValueChange={newValue => setChecked(newValue)} value={checked}>
        <View>
          <Text>Cilent</Text>
          <RadioButton value="cilent" color="red"/>
        </View>
        <View>
          <Text>Lawyer</Text>
          <RadioButton value="lawyer" color="red"/>
        </View>
      </RadioButton.Group>
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
          Update Portfolio
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
