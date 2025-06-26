import Button from "@/components/ui/Button";
import Typography from "@/components/ui/Typography";
import UserTypeSelector, {
  UserTypeOption,
} from "@/components/ui/UserTypeSelector";
import { storage, storageKeys } from "@/services/storage";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const router = useRouter();

  const defaultUserType: UserTypeOption = {
    id: 1,
    title: "I'm a Parent",
    type: "parent",
    selected: true,
  };

  const [userType, setUserType] = useState<UserTypeOption>(defaultUserType);

  // Load userType from storage on mount
  useEffect(() => {
    const loadUserType = async () => {
      const storedUserTypeString = await storage.getItem(storageKeys.userType);
      if (storedUserTypeString) {
        setUserType(JSON.parse(storedUserTypeString));
      }
    };
    loadUserType();
  }, []);

  return (
    <SafeAreaView style={styles.safeareaViewContainer}>
      <View style={styles.mainContainer}>
        <Stack.Screen options={{ headerShown: false }} />
        <Typography size={25} weight="bold" text="Welcome to" />
        <Typography size={25} weight="bold" text="FamilyShield" />
        <View style={{ marginTop: 30 }}>
          <Typography
            size={18}
            text="We are here to help families to gently monitor the digital safety of their children."
          />
        </View>
        <View
          style={{
            marginTop: 20,
            flex: 1,
            justifyContent: "center",
            paddingBottom: 350,
          }}
        >
          <View>
            <Typography
              style={{ textAlign: "center" }}
              size={18}
              text="Which one are you?"
            />
            <UserTypeSelector
              selectedOption={userType}
              onSelect={(option: UserTypeOption) => {
                setUserType(option);
                storage.setItem(storageKeys.userType, JSON.stringify(option));
              }}
            />
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              paddingVertical: 20,
            }}
          >
            <Button
              disabled={!userType || userType.type !== "parent"}
              type="primary"
              text="Get started"
              onPress={() => {
                storage.setItem(storageKeys.userOboardingStep, "2");
                router.push({
                  pathname: "/pages/guardian",
                  params: { userType: JSON.stringify(userType) }, // Pass the userType as a parameter
                });
              }}
            />
          </View>
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
});
