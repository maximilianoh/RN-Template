import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput
} from "react-native";
import CameraManager from "../components/CameraManager";
import { Button as ButtonElement } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { ThemeProvider } from "react-native-elements";

const theme = {
  colors: {
    primary: "#3f51b5"
  }
};

export default function HomeScreen() {
  const [isCameraActivate, setIsCameraActivate] = useState(false);
  const [input, setInput] = useState("");
  const validationNumber = () => {
    if (input === "") return false;
    return /^(([0-9]{2}\.[0-9]{3}\.[0-9]{3})||([0-9]{8}))$/g.test(input);
  };

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        {isCameraActivate ? (
          <CameraManager desactiveCamera={setIsCameraActivate} />
        ) : (
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.welcomeContainer}>
              <Image
                source={
                  __DEV__
                    ? require("../assets/images/robot-dev.png")
                    : require("../assets/images/robot-prod.png")
                }
                style={styles.welcomeImage}
              />
            </View>

            <View style={styles.form}>
              <TextInput
                keyboardType="numeric"
                style={styles.textForm}
                onChangeText={text => setInput(text)}
                placeholder="Enter your DNI here"
              />
              <ButtonElement
                title="Send DNI"
                onPress={() => {}}
                disabled={!validationNumber()}
                iconRight={true}
                icon={
                  <Icon
                    name="send"
                    size={18}
                    color="white"
                    style={{ marginLeft: "5%" }}
                  />
                }
              />
            </View>
            <View style={styles.helpContainer}>
              <ButtonElement
                title="Take Picture"
                onPress={() => setIsCameraActivate(true)}
                iconRight={true}
                icon={
                  <Icon
                    name="camera"
                    size={18}
                    color="white"
                    style={{ marginLeft: "5%" }}
                  />
                }
              />
              <View style={styles.helpContainer}>
                <Text
                  onPress={handleLearnMorePress}
                  style={styles.helpLinkText}
                >
                  Learn more
                </Text>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </ThemeProvider>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    "https://github.com/maximilianoh/RN-Template/tree/feature-barcode-reader"
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    width: "80%",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center"
  },
  form: {
    width: "80%",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    marginBottom: "5%"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7",
    textAlign: "center"
  },
  textForm: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: "2%",
    textAlign: "center"
  }
});
