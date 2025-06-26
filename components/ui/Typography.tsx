import { Text, TextStyle } from "react-native";

type ITypographyProps = {
  text: string | undefined;
  size?: number;
  style?: TextStyle;
  weight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
};

export default function Typography(props: ITypographyProps) {
  const { size = 14, weight = "normal", text, style } = props;
  return (
    <Text style={[{ fontSize: size, fontWeight: weight || "normal" }, style]}>
      {text}
    </Text>
  );
}
