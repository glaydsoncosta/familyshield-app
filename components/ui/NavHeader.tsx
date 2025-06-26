import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type INavHeaderProps = {
  title?: string;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
};

export default function NavHeader(props: INavHeaderProps) {
  const { title, onBackPress, rightComponent } = props;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.leftContainer}>
        {onBackPress && (
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={onBackPress}
          >
            <Image
              source={require("../../assets/images/back-button.png")}
              style={styles.backButtonContainer}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      <View>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.rightContainer}>{rightComponent}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    paddingHorizontal: 5,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  leftContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    width: "10%",
  },
  rightContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    width: "10%",
  },
  backButtonContainer: {
    width: 28,
    height: 28,
  },
  buttonContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
