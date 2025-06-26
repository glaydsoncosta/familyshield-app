import Button from "@/components/ui/Button";
import DropDown, { DropDownItem } from "@/components/ui/DropDown";
import NavHeader from "@/components/ui/NavHeader";
import TextField from "@/components/ui/TextField";
import Typography from "@/components/ui/Typography";
import { IGuardian } from "@/models";
import { storage, storageKeys } from "@/services/storage";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const guardinRoleList: DropDownItem[] = [
  { label: "Mom", value: "Mom" },
  { label: "Dad", value: "Dad" },
  { label: "Guardian", value: "Guardian" },
  { label: "Grandfather", value: "Grandfather" },
  { label: "Grandmother", value: "Grandmother" },
  { label: "Stepmom", value: "Stepmom" },
  { label: "Stepdad", value: "Stepdad" },
];

export default function GuardianScreen() {
  const initialFormData: IGuardian = {
    id: 1,
    name: "",
    email: "",
    phone: "",
    role: null,
    familyGoals: "",
    familyValues: "",
    admin: true,
  };

  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);
  const [formValidated, setFormValidated] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [multilineFocused, setMultilineFocused] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Create refs for each TextField
  const emailRef = useRef<any>(null);
  const phoneRef = useRef<any>(null);
  const goalsRef = useRef<any>(null);
  const valuesRef = useRef<any>(null);

  useEffect(() => {
    const loadGuardianData = async () => {
      const savedGuardian = await storage.getItem<IGuardian>(
        storageKeys.guardianData
      );
      if (savedGuardian) {
        setFormData(savedGuardian);
      }
    };
    loadGuardianData();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        // Only scroll to bottom if a multiline field is focused
        if (multilineFocused) {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        // Only scroll to top if a multiline field was focused
        if (multilineFocused) {
          scrollViewRef.current?.scrollTo({ y: 0, animated: true });
        }
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [multilineFocused]);

  useEffect(() => {
    setFormValid(false);
    if (
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.role &&
      formData.familyGoals &&
      formData.familyValues
    ) {
      setFormValid(true);
    }
  }, [formData]);

  const handleSaveGuardian = async (guardianData: IGuardian) => {
    guardianData.id = 1; // Set a default ID for the guardian
    storage.setItem(storageKeys.userOboardingStep, "3");
    storage.setItem(storageKeys.guardianData, guardianData);
    router.push("/pages/family");
  };

  return (
    <SafeAreaView style={styles.safeareaViewContainer}>
      <NavHeader
        title="Guardian"
        onBackPress={() => {
          router.back();
        }}
      />
      <View style={styles.mainContainer}>
        <Stack.Screen options={{ headerShown: false }} />
        <View>
          <Typography size={18} text="Now, let's get to know you better." />
        </View>
        <View
          style={{
            marginTop: 20,
            marginBottom: 60,
            flex: 1,
          }}
        >
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ paddingBottom: 300 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <KeyboardAvoidingView>
              <TextField
                autoCapitalize="words"
                error={formData.name === "" && formValidated}
                required
                label="Name"
                placeholder="Enter your name"
                value={formData.name}
                onChangeText={(text: string) => {
                  console.log("Name changed:", text);
                  setFormData((prev) => ({ ...prev, name: text }));
                }}
                onFocus={() => setMultilineFocused(false)}
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current?.focus()}
              />
              <TextField
                ref={emailRef}
                autoCapitalize="none"
                keyboardType="email-address"
                error={formData.email === "" && formValidated}
                required
                label="Email"
                placeholder="Enter your email"
                value={formData.email}
                onChangeText={(text: string) => {
                  setFormData((prev) => ({ ...prev, email: text }));
                }}
                style={{ marginTop: 20 }}
                onFocus={() => setMultilineFocused(false)}
                returnKeyType="next"
                onSubmitEditing={() => phoneRef.current?.focus()}
              />
              <TextField
                ref={phoneRef}
                autoCapitalize="none"
                keyboardType="phone-pad"
                error={formData.phone === "" && formValidated}
                required
                label="Phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChangeText={(text: string) => {
                  setFormData((prev) => ({ ...prev, phone: text }));
                }}
                style={{ marginTop: 20 }}
                onFocus={() => setMultilineFocused(false)}
                returnKeyType="next"
                onSubmitEditing={() => goalsRef.current?.focus()}
              />
              <DropDown
                value={
                  formData.role
                    ? guardinRoleList.find(
                        (item) => item.label === formData.role
                      )?.value ?? null
                    : null
                }
                options={guardinRoleList}
                onChange={(value: string | null) => {
                  console.log("Role changed:", value);
                  setFormData((prev) => ({
                    ...prev,
                    role: value
                      ? (guardinRoleList.find((item) => item.value === value)
                          ?.label as IGuardian["role"])
                      : null,
                  }));
                }}
                placeholder="Select your role"
                dropdownIcon="Safety"
              />
              <TextField
                ref={goalsRef}
                autoCapitalize="none"
                error={formData.familyGoals === "" && formValidated}
                required
                multiline
                label="Family Goals"
                placeholder="Enter your family goals"
                value={formData.familyGoals}
                onFocus={() => setMultilineFocused(true)}
                onBlur={() => setMultilineFocused(true)}
                onChangeText={(text: string) => {
                  setFormData((prev) => ({ ...prev, familyGoals: text }));
                }}
                style={{ marginTop: 20 }}
                returnKeyType="next"
                onSubmitEditing={() => valuesRef.current?.focus()}
              />
              <TextField
                ref={valuesRef}
                autoCapitalize="none"
                error={formData.familyValues === "" && formValidated}
                required
                multiline
                label="Family Values"
                placeholder="Enter your family values"
                value={formData.familyValues}
                onFocus={() => setMultilineFocused(true)}
                onBlur={() => setMultilineFocused(true)}
                onChangeText={(text: string) => {
                  setFormData((prev) => ({ ...prev, familyValues: text }));
                }}
                style={{ marginTop: 20 }}
                returnKeyType="done"
              />
            </KeyboardAvoidingView>
          </ScrollView>
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
            text="Continue"
            onPress={() => {
              setFormValidated(true);
              if (formValid) {
                handleSaveGuardian(formData);
              }
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
});
