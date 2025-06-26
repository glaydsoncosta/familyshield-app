import { StyleSheet, Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  style?: object;
  type?: "primary" | "secondary" | "tertiary";
};

export default function Button(props: ButtonProps) {
  const { text, onPress, disabled = false, style, type = "primary" } = props;

  const getButtonColor = (type: string, disabled: boolean) => {
    if (disabled) {
      return { backgroundColor: "#D3D3D3", color: "#A9A9A9" };
    }
    switch (type) {
      case "primary":
        return { backgroundColor: "#007BFF" };
      case "secondary":
        return { backgroundColor: "#FFF" };
      case "tertiary":
        return { backgroundColor: "#F8F9FA" };
      default:
        return { backgroundColor: "#007BFF" };
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.mainContainer,
        style,
        {
          ...getButtonColor(type, disabled),
          borderColor: type === "secondary" ? "#F44336" : "transparent",
          borderWidth: type === "secondary" ? 1.5 : 0,
        },
      ]}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          fontWeight: "bold",
          color:
            type === "primary"
              ? "#FFF"
              : type === "secondary"
              ? "#F44336"
              : "#000",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    textAlign: "center",
    borderRadius: 15,
    width: "100%",
    paddingVertical: 15,
    justifyContent: "center",
  },
});
