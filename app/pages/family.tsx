import Button from "@/components/ui/Button";
import DropDown, { DropDownItem } from "@/components/ui/DropDown";
import FamilyMember from "@/components/ui/FamilyMember";
import GuardianCard from "@/components/ui/GuardianCard";
import NavHeader from "@/components/ui/NavHeader";
import TextField from "@/components/ui/TextField";
import Typography from "@/components/ui/Typography";
import { IChild, IGuardian } from "@/models";
import { storage, storageKeys } from "@/services/storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Keyboard,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const relationshipOptionList: DropDownItem[] = [
  { label: "Child", value: "Child" },
  { label: "Step-Child", value: "Step-Child" },
  { label: "Grandchild", value: "Grandchild" },
  { label: "Other", value: "Other" },
];

const genderOptionList: DropDownItem[] = [
  { label: "Boy", value: "Boy" },
  { label: "Girl", value: "Girl" },
  { label: "Non-Binary", value: "Non-Binary" },
  { label: "Other", value: "Other" },
];

const relatioshipQualityOptionList: DropDownItem[] = [
  { label: "Good", value: "Good" },
  { label: "Average", value: "Average" },
  { label: "Poor", value: "Poor" },
];

export default function FinishScreen() {
  const router = useRouter();
  const [guardianDetails, setGuardianDetails] = useState<IGuardian | undefined>(
    undefined
  );
  const [familyMembers, setFamilyMembers] = useState<IChild[] | undefined>(
    undefined
  );
  const [familyMemberModalVisible, setFamilyMemberModalVisible] =
    useState(false);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState<
    IChild | undefined
  >(undefined);
  const [isEditingFamilyMember, setIsEditingFamilyMember] = useState(false);

  useEffect(() => {
    const loadGuardianData = async () => {
      const savedGuardian = await storage.getItem<IGuardian>(
        storageKeys.guardianData
      );
      if (savedGuardian) {
        setGuardianDetails(savedGuardian);
      }
    };
    const loadFamilyMembers = async () => {
      const savedFamilyMembers = await storage.getItem<IChild[]>(
        storageKeys.familyData
      );
      console.log("Loaded Family Members:", savedFamilyMembers);
      if (savedFamilyMembers) {
        console.log("Loaded Family Members:", savedFamilyMembers);
        setFamilyMembers(savedFamilyMembers);
      }
    };
    loadFamilyMembers();
    loadGuardianData();
  }, []);

  useEffect(() => {
    if (familyMembers) {
      console.log("Family Members:", familyMembers);
    }
  }, [familyMembers]);

  useEffect(() => {
    if (familyMembers) {
      storage.setItem(storageKeys.familyData, familyMembers);
    }
  }, [familyMembers]);

  return (
    <SafeAreaView style={styles.safeareaViewContainer}>
      <NavHeader
        title="Family"
        onBackPress={() => {
          router.back();
        }}
        rightComponent={
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => {
              let familyMember: IChild = {
                id:
                  familyMembers && familyMembers.length > 0
                    ? familyMembers[familyMembers.length - 1].id + 1
                    : 1,
                name: "",
                age: null,
                relationship: null, // Default relationship type
                gender: null,
                guardians: [],
                guardianRelationshipQuality: null,
              };
              setIsEditingFamilyMember(false);
              setSelectedFamilyMember(familyMember);
              setFamilyMemberModalVisible(true);
            }}
          >
            <AntDesign color={"#007BFF"} name="plus" size={22} />
          </TouchableOpacity>
        }
      />
      <View style={styles.mainContainer}>
        <Stack.Screen options={{ headerShown: false }} />
        <Modal
          animationType="slide"
          presentationStyle="pageSheet"
          visible={familyMemberModalVisible}
        >
          <View style={{ flex: 1, padding: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Typography
                size={18}
                weight="bold"
                style={{ marginTop: 5 }}
                text="Manage Family Member"
              />
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => {
                  setFamilyMemberModalVisible(false);
                }}
              >
                <AntDesign color={"red"} name="close" size={22} />
              </TouchableOpacity>
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View>
                <TextField
                  style={{ marginTop: 30 }}
                  autoCapitalize="words"
                  error={false}
                  required
                  label="Name"
                  placeholder="Enter family member name"
                  value={selectedFamilyMember?.name ?? ""}
                  onChangeText={(text: string) => {
                    setSelectedFamilyMember((prev) =>
                      prev
                        ? {
                            ...prev,
                            name: text,
                            id: prev.id, // ensure id is always present
                            age: prev.age ?? null,
                            relationship: prev.relationship ?? null,
                            gender: prev.gender ?? null,
                            guardians: prev.guardians ?? [],
                            guardianRelationshipQuality:
                              prev.guardianRelationshipQuality ?? null,
                          }
                        : undefined
                    );
                  }}
                  returnKeyType="next"
                />
                <TextField
                  style={{ marginTop: 10 }}
                  autoCapitalize="words"
                  error={false}
                  required
                  label="Age"
                  placeholder="Enter family member age"
                  value={selectedFamilyMember?.age?.toString() ?? ""}
                  onChangeText={(text: string) => {
                    setSelectedFamilyMember((prev) =>
                      prev
                        ? {
                            ...prev,
                            name: prev.name ?? "",
                            id: prev.id, // ensure id is always present
                            age: parseInt(text),
                            relationship: prev.relationship ?? null,
                            gender: prev.gender ?? null,
                            guardians: prev.guardians ?? [],
                            guardianRelationshipQuality:
                              prev.guardianRelationshipQuality ?? null,
                          }
                        : undefined
                    );
                  }}
                  returnKeyType="next"
                  keyboardType="numeric"
                />
                <DropDown
                  value={selectedFamilyMember?.relationship ?? null}
                  options={relationshipOptionList}
                  onChange={(value: string | null) => {
                    setSelectedFamilyMember((prev) =>
                      prev
                        ? {
                            ...prev,
                            relationship: value as
                              | "Child"
                              | "Step-Child"
                              | "Grandchild"
                              | "Other"
                              | null,
                          }
                        : undefined
                    );
                  }}
                  placeholder="Select relationship"
                  dropdownIcon="team"
                />
                <DropDown
                  value={selectedFamilyMember?.gender ?? null}
                  options={genderOptionList}
                  onChange={(value: string | null) => {
                    setSelectedFamilyMember((prev) =>
                      prev
                        ? {
                            ...prev,
                            gender: value as
                              | "Boy"
                              | "Girl"
                              | "Non-Binary"
                              | "Other"
                              | null,
                          }
                        : undefined
                    );
                  }}
                  placeholder="Select gender"
                  dropdownIcon="user"
                />
                <DropDown
                  value={
                    selectedFamilyMember?.guardianRelationshipQuality ?? null
                  }
                  options={relatioshipQualityOptionList}
                  onChange={(value: string | null) => {
                    setSelectedFamilyMember((prev) =>
                      prev
                        ? {
                            ...prev,
                            guardianRelationshipQuality: value as
                              | "Good"
                              | "Average"
                              | "Poor"
                              | null,
                          }
                        : undefined
                    );
                  }}
                  placeholder="Relationship quality"
                  dropdownIcon="check"
                />
                <Button
                  style={{ marginTop: 30 }}
                  disabled={!selectedFamilyMember?.name}
                  type="primary"
                  text="Save"
                  onPress={() => {
                    if (selectedFamilyMember) {
                      if (isEditingFamilyMember) {
                        // Edit: update the existing member
                        setFamilyMembers((prev) =>
                          prev
                            ? prev.map((m) =>
                                m.id === selectedFamilyMember.id
                                  ? selectedFamilyMember
                                  : m
                              )
                            : [selectedFamilyMember]
                        );
                      } else {
                        // Add: push new member
                        setFamilyMembers((prev) => [
                          ...(prev ?? []),
                          selectedFamilyMember,
                        ]);
                      }
                      setFamilyMemberModalVisible(false);
                      setSelectedFamilyMember(undefined);
                      setIsEditingFamilyMember(false);
                    }
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Typography size={20} text="Hello " />
            <Typography
              size={20}
              weight="bold"
              text={`${guardianDetails?.name},`}
            />
          </View>
          <Typography
            size={18}
            style={{ marginTop: 5 }}
            text="let's gather some information about your family."
          />
        </View>
        <View
          style={{
            marginTop: 20,
            marginBottom: 60,
            flex: 1,
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View>
              <Typography
                size={20}
                style={{ marginTop: 5 }}
                weight="bold"
                text="Guardian(s)"
              />
              <GuardianCard data={guardianDetails} />
              <Typography
                size={20}
                style={{ marginTop: 20 }}
                weight="bold"
                text="Family Members"
              />
              {familyMembers?.map((member) => (
                <FamilyMember
                  key={member.id}
                  data={member}
                  onDelete={() => {
                    Alert.alert(
                      "Remove Family Member",
                      `Are you sure you want to remove ${
                        member.name || "this member"
                      }?`,
                      [
                        { text: "Cancel", style: "cancel" },
                        {
                          text: "Delete",
                          style: "destructive",
                          onPress: () => {
                            setFamilyMembers((prev) =>
                              prev ? prev.filter((m) => m.id !== member.id) : []
                            );
                          },
                        },
                      ]
                    );
                  }}
                  onEdit={() => {
                    setSelectedFamilyMember(member);
                    setIsEditingFamilyMember(true);
                    setFamilyMemberModalVisible(true);
                  }}
                />
              ))}
              {!familyMembers || familyMembers.length === 0 ? (
                <Typography
                  size={16}
                  style={{ marginTop: 100, textAlign: "center", color: "#888" }}
                  text="No family members added yet. Click the top right button to add."
                />
              ) : null}
            </View>
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
            disabled={familyMembers === undefined || familyMembers.length === 0}
            type="primary"
            text="Continue"
            onPress={() => {
              storage.setItem(storageKeys.userOboardingStep, "4");
              router.push({
                pathname: "/pages/finish",
                params: { familyMembers: JSON.stringify(familyMembers) },
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
});
