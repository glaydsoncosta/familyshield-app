import Button from "@/components/ui/Button";
import Typography from "@/components/ui/Typography";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FamilyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeareaViewContainer}>
      <View style={styles.mainContainer}>
        <Stack.Screen options={{ headerShown: false }} />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 100,
          }}
        >
          <Typography
            size={20}
            weight="bold"
            style={{ marginTop: 5, textAlign: "center" }}
            text="Congratulations on completing the onboarding process!"
          />
          <Typography
            size={13}
            style={{ marginTop: 10, textAlign: "center" }}
            text="Now you can start using FamilyShield to protect your family."
          />
          <Image
            style={styles.centerIcon}
            source={require("../../assets/images/icon.png")}
          />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            justifyContent: "center",
            width: Dimensions.get("window").width,
            paddingHorizontal: 20,
          }}
        >
          <Button
            type="primary"
            text="Finish"
            onPress={() => {
              router.replace({
                pathname: "/pages/welcome",
              });
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaViewContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  centerIcon: {
    width: 256,
    height: 256,
    marginTop: 20,
  },
});
