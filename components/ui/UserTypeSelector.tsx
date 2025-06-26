import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "./Typography";

export type UserTypeOption = {
  id: number;
  title: string;
  type: "parent" | "child";
  image?: any;
  selected: boolean;
};

type UserTypeSelectorProps = {
  selectedOption: UserTypeOption;
  onSelect: (type: UserTypeOption) => void;
};

export default function UserTypeSelector(props: UserTypeSelectorProps) {
  const { selectedOption, onSelect } = props;
  const optionList: UserTypeOption[] = [
    {
      id: 1,
      title: "I'm a Parent",
      type: "parent",
      image: require("../../assets/images/parents.png"),
      selected: selectedOption.id === 1 ? true : false,
    },
    {
      id: 2,
      title: "I'm a Child",
      type: "child",
      image: require("../../assets/images/children.png"),
      selected: selectedOption.id === 2 ? true : false,
    },
  ];

  return (
    <View style={styles.mainContainer}>
      {optionList.map((option: UserTypeOption) => (
        <TouchableOpacity key={option.id} onPress={() => onSelect(option)}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View
              style={{
                width: 150,
                height: 150,
                borderRadius: 10,
                borderColor: option.selected ? "#2196F3" : "transparent",
                borderWidth: 1,
                backgroundColor: option.selected ? "#E3F2FD" : "transparent",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={option.image}
                style={{ width: 80, height: 80 }}
                resizeMode="contain"
              />
              <Typography
                text={option.title}
                size={16}
                style={{ textAlign: "center", marginTop: 10 }}
              />
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
});
