import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Image,SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import { Text, Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { AuthStackParamList } from "./AuthStackScreen";
import firebase from "firebase";
// import { Text } from "react-native-paper/lib/typescript/components/Avatar/Avatar";

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, "SignInScreen">;
}

export default function SignInScreen({ navigation }: Props) {
  // Login details.
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  // Loading state for submit button
  const [loading, setLoading] = useState(false);

  // Code for snackbar
  // https://callstack.github.io/react-native-paper/snackbar.html

  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const showError = (error: string) => {
    setMessage(error);
    setVisible(true);
  };

  // --------------------------------------------------------------

  const signIn = async () => {
    if (userEmail === "") {
      showError("Please enter your email.");
    } else if (userPassword === "") {
      showError("Please enter a password.");
    } else {
      setLoading(true);
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(userEmail, userPassword);
      } catch (error) {
        showError(error.message);
        setLoading(false);
      }
    }
  };

  const resetPassword = async () => {
    if (userEmail === "") {
      showError(
        "Please enter an email that you'd like to reset your password for."
      );
    } else {
      setLoading(true);
      try {
        await firebase.auth().sendPasswordResetEmail(userEmail);
        showError("A password reset link has been sent to your email.");
      } catch (error) {
        showError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  /** -- removed from return to fit Figma design
   * <Appbar.Header dark={true}>
        <Appbar.Content title="CourtRoom" />
        </Appbar.Header>  
        
        
        -- can be used for adding Social Logins, but we will not be using it for now
        <View style= {{ flexDirection:"row", justifyContent: 'center' , marginTop: 40}}>
            <View style={{marginHorizontal: 0}}>
            < Text style={{backgroundColor: '#1B68FF', height: 2, width: 120, marginTop: 7}}> </Text>
            </View>
            <View>
            <Text style={styles.socialText}>Social Login</Text>
            </View>
            <View>
              <Text style={{backgroundColor: '#1B68FF', height: 2, width: 120, marginTop: 7}}> </Text>
            </View>
          </View>

          <View style= {{ flexDirection:"row", justifyContent: 'center' , marginTop: 20}}>
            <View style={{marginHorizontal: 20, marginTop: 5}}>
              <Text>Facebook</Text>
            </View>
            <View style={{marginHorizontal: 20, marginTop: 5}}>
              <Text>Instagram</Text>
              </View>
            <View style={{marginHorizontal: 20, marginTop: 5}}>
              <Text>Twitter</Text>
            </View>
          </View>
        
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
          <Text style={{marginLeft:20, fontSize: 25, textAlign: 'center'}}>Welcome Back!</Text>
          <View style={{justifyContent: 'center', alignItems:'center', marginTop: 20}}>
            <Image source={require('./LogoBriefcase.png')} style={{width: 50,
    height: 50}}></Image>
        </View>  
          <TextInput
            label="Email"
            value={userEmail}
            onChangeText={(text) => setUserEmail(text)}
            style={{ backgroundColor: "white", marginBottom: 10, marginTop: 30 }}
          />
          <TextInput
            label="Password"
            value={userPassword}
            secureTextEntry={true}
            onChangeText={(text) => setUserPassword(text)}
            style={{ backgroundColor: "white", marginBottom: 10 }}
          />
          <Button
            color="#bfbfbf"
            onPress={() => resetPassword()}
            style={styles.resetPass}
          >
            RESET PASSWORD
          </Button>
          <Button
            mode="contained"
            onPress={signIn}
            style={{ marginTop: 40, borderRadius: 40, height: 40, backgroundColor: "#00F0FF", width: 200, alignSelf: 'center', shadowColor: "#FFFFFF"}}
            loading={loading}
            dark={true}
          >
            Login
          </Button>
          
      

          <View style= {{ flexDirection:"row", justifyContent: 'flex-start' , marginTop: 5, marginBottom:10, marginLeft: 3}}>
            <View style={{marginHorizontal: 0, marginTop: 9}}>
              <Text>Don't have an account?</Text>
            </View>
            <Button
            onPress={() => navigation.navigate("SignUpScreen")}
            style={{ marginTop: 0 }}
          >
          Sign Up
          </Button>
            
          </View>

          
        </ScrollView>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          style={{ marginBottom: 50 }}
        >
          {message}
        </Snackbar>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    flex: 1,
    padding: 32,
    backgroundColor: "#ffffff",
  },
  socialText: {
    height: 30,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    color: '#1B68FF',
    fontSize: 15
  }, 
  resetPass: {
    fontSize: 50,
    marginTop: 0,
    
  }
});
