import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { AuthStackParamList } from "./AuthStackScreen";
import firebase from "firebase";

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, "SignUpScreen">;
}

export default function SignUpScreen({ navigation }: Props) {
  // Login details.
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  // Loading state for submit button
  const [loading, setLoading] = useState(false);

  // Code for snackbar
  // https://callstack.github.io/react-native-paper/snackbar.html
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const showError = (error: any) => {
    setMessage(error);
    setVisible(true);
  };

  const signUp = async () => {
    if (userEmail === "") {
      showError("Please enter an email.");
    } else if (userPassword === "") {
      showError("Please enter a password.");
    } else {
      setLoading(true);
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(userEmail, userPassword);
      } catch (error) {
        showError(error.message);
        setLoading(false);
      }
    }
  };

  /** -- removed for aesthetic purposes
   * <Appbar.Header dark={true}>
        <Appbar.Content title="Create an Account" />
      </Appbar.Header>
   */

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={{marginLeft:20, fontSize: 20, color: "#00F0FF" }}>Courtroom</Text>
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps="never"
          alwaysBounceVertical={false}
        >
          <Text style={{marginTop:20, fontSize: 25, textAlign: 'center'}}> Sign Up </Text>
          <TextInput
            label="Email"
            value={userEmail}
            onChangeText={(text) => setUserEmail(text)}
            style={{ backgroundColor: "white", marginBottom: 10 }}
          />
          <TextInput
            label="Password"
            value={userPassword}
            secureTextEntry={true}
            onChangeText={(text) => setUserPassword(text)}
            style={{ backgroundColor: "white", marginBottom: 10 }}
          />
          <Button
            mode="contained"
            onPress={signUp}
            style={{ marginTop: 40, borderRadius: 40, height: 40, backgroundColor: "#1FAEFF", width: 250, alignSelf: 'center', shadowColor: "#FFFFFF" }}
            loading={loading}
            dark={true}
          >
            Register
          </Button>
          <Button
            onPress={() => navigation.navigate("SignInScreen")}
            style={{ marginTop: 20 }}
          >
            OR, SIGN IN INSTEAD
          </Button>
        </ScrollView>
        <Snackbar visible={visible} onDismiss={() => setVisible(false)} style={{marginBottom: 50}}>
          {message}
        </Snackbar>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: "#ffffff",
  },
});
