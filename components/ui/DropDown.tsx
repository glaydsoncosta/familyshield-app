import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Typography from "./Typography";

export type DropDownItem = {
  label: string;
  value: string;
};

type DropDownProps = {
  placeholder: string;
  value?: string | null;
  onChange?: (value: string | null) => void;
  style?: object;
  error?: boolean;
  required?: boolean;
  options?: DropDownItem[];
  dropdownIcon: string;
};

const DropDown = (props: DropDownProps) => {
  const {
    placeholder,
    value = null,
    onChange,
    style,
    error,
    required,
    options,
    dropdownIcon,
  } = props;
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "#007BFF" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={options ?? []}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          if (onChange) {
            onChange(item.value);
          }
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? "#007BFF" : "black"}
            name={dropdownIcon}
            size={20}
          />
        )}
      />
      {error && required && (
        <Typography
          style={{ marginTop: 5, color: "red" }}
          size={12}
          text="This field is required."
        />
      )}
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginTop: 20,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
