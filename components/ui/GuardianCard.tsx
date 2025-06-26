import { IGuardian } from "@/models";
import { Image, StyleSheet, View } from "react-native";
import Typography from "./Typography";

type FamilyMemberProps = {
  data: IGuardian | undefined;
};

export default function GuardianCard(props: FamilyMemberProps) {
  const { data } = props;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.leftSectionContainer}>
        <View>
          <Image
            style={styles.iconPhotoContainer}
            source={require("../../assets/images/shield.png")}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.mainSectionContainer}>
        <View style={{ flex: 1, paddingVertical: 10 }}>
          <Typography text={data?.name} size={14} weight="bold" />
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            <Typography weight="bold" text="E-mail: " size={12} />
            <Typography text={data?.email} size={12} />
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            <Typography weight="bold" text="Phone number: " size={12} />
            <Typography text={data?.phone} size={12} />
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
              <Typography weight="bold" text="Role: " size={12} />
              <Typography text={data?.role?.toString()} size={12} />
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  mainSectionContainer: {
    alignSelf: "stretch",
    paddingVertical: 15,
  },
  iconPhotoContainer: {
    width: 50,
    height: 80,
    borderRadius: 25,
  },
  genderIconContainer: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
});
