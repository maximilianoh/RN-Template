import React, { useState, useEffect } from "react";
import { Text, TextInput, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button as ButtonElement } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

export default function CameraManager(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    const regex = data.match(/@([0-9]{8})@/g);
    if (regex !== null) {
      const dni = regex[0].substring(1, regex[0].length - 1);
      setScanned(true);
      alert(`Bar code DNI: ${dni} has been scanned!`);
    }
  };

  if (hasPermission === null) {
    return <View></View>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const { desactiveCamera } = props;
  return (
    <View style={styles.view}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.barCodeScanner}
      />

      <View style={styles.form}>
        {scanned && (
          <ButtonElement
            title={"Scan Again"}
            onPress={() => setScanned(false)}
            buttonStyle={styles.buttonForm}
            iconRight={true}
            icon={
              <Icon
                name="repeat"
                size={16}
                color="white"
                style={{
                  marginLeft: "5%"
                }}
              />
            }
          />
        )}
        <ButtonElement
          title={"Back to Home"}
          onPress={() => desactiveCamera(false)}
          buttonStyle={styles.buttonForm}
          icon={
            <Icon
              name="arrow-left"
              size={16}
              color="white"
              style={{ marginRight: "5%" }}
            />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    width: "70%",
    height: "70%"
  },
  barCodeScanner: {
    width: "100%",
    height: "80%"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  buttonMargin: {
    marginTop: "50%",
    marginBottom: "10%"
  },
  form: {
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    marginBottom: "5%"
  },
  buttonForm: {
    width: "100%",
    marginTop: "2%"
  }
});
