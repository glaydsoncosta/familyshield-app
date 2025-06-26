import { IChild } from "@/models";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "./Typography";

type FamilyMemberProps = {
  data: IChild;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function FamilyMember(props: FamilyMemberProps) {
  const { data, onEdit, onDelete } = props;

  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case "Boy":
        return require("../../assets/images/gender-boy.png");
      case "Girl":
        return require("../../assets/images/gender-girl.png");
      case "Non-Binary":
        return require("../../assets/images/gender-non-binary.png");
      case "Other":
        return require("../../assets/images/gender-other.png");
      default:
        return require("../../assets/images/gender-other.png");
    }
  };

  const getFamilyMemberIcon = (gender: string) => {
    switch (gender) {
      case "Boy":
        return require("../../assets/images/boy.png");
      case "Girl":
        return require("../../assets/images/girl.png");
      case "Non-Binary":
        return require("../../assets/images/non-binary.png");
      case "Other":
        return require("../../assets/images/non-binary.png");
      default:
        return require("../../assets/images/non-binary.png");
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.leftSectionContainer}>
        <View>
          <Image
            style={styles.iconPhotoContainer}
            source={getFamilyMemberIcon(data.gender)}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.mainSectionContainer}>
        <View style={{ flex: 1, paddingVertical: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Typography text={data.name} size={14} weight="bold" />
            <Image
              style={styles.genderIconContainer}
              source={getGenderIcon(data.gender)}
              resizeMode="contain"
            />
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            <Typography weight="bold" text="Relationship: " size={12} />
            <Typography text={data.relationship} size={12} />
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            <Typography weight="bold" text="Age: " size={12} />
            <Typography text={`${data.age.toString()} yo`} size={12} />
          </View>
          <View
            style={{
              marginTop: 15,
              flexDirection: "row",
              justifyContent: "space-between",
              width: "85%",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Typography
                weight="bold"
                text="Relationship Quality: "
                size={12}
              />
              <Typography text={data.guardianRelationshipQuality} size={12} />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={onEdit}>
                <AntDesign color={"#007BFF"} name="edit" size={20} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 10 }} onPress={onDelete}>
                <AntDesign color={"red"} name="delete" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    borderRadius: 5,
    borderColor: "#9E9E9E",
    backgroundColor: "#FFF",
    borderWidth: 0,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.84,
    elevation: 5,
    marginHorizontal: 1,
  },
  leftSectionContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  mainSectionContainer: {
    alignSelf: "stretch",
    paddingVertical: 15,
  },
  iconPhotoContainer: {
    width: 72,
    height: 72,
  },
  genderIconContainer: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
});
