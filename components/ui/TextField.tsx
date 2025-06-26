import { TextInput, View } from "react-native";
import Typography from "./Typography";

type TextFieldProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  style?: object;
  error?: boolean;
  autoFocus?: boolean;
  required?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  multiline?: boolean;
  numberOfLines?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  returnKeyType?: "done" | "next" | "go" | "search" | "send";
  onSubmitEditing?: () => void;
  ref?: React.RefObject<TextInput>;
};

export default function TextField(props: TextFieldProps) {
  const {
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    style,
    error,
    autoFocus,
    required,
    autoCapitalize,
    keyboardType,
    multiline,
    numberOfLines = 3,
    onFocus,
    onBlur,
    returnKeyType,
    onSubmitEditing,
    ref,
  } = props;

  return (
    <View>
      <Typography style={style} size={15} weight="500" text={label} />
      <View>
        <TextInput
          ref={ref}
          style={{
            borderWidth: 1,
            borderColor: error ? "red" : "#9E9E9E",
            borderRadius: 5,
            padding: 10,
            marginTop: 5,
            height: multiline ? 100 : null,
          }}
          returnKeyType={returnKeyType || "default"}
          keyboardType={keyboardType || "default"}
          autoCapitalize={autoCapitalize}
          autoFocus={autoFocus}
          value={value}
          onChangeText={(text) => {
            if (onChangeText) {
              onChangeText(text);
            }
          }}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical={multiline ? "top" : "center"}
          onFocus={onFocus}
          onBlur={onBlur}
          onSubmitEditing={onSubmitEditing}
          autoComplete="off"
          autoCorrect={false}
        />
        {error && required && (
          <Typography
            style={{ marginTop: 5, color: "red" }}
            size={12}
            text="This field is required."
          />
        )}
      </View>
    </View>
  );
}
