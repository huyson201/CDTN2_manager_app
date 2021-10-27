import React from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Button,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { WHITE, BLUE1, BLUE2 } from "../src/values/color";
import Icon from "react-native-vector-icons/FontAwesome";
import StaffItem from "../components/staff/StaffItem";

const StaffList = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={{ backgroundColor: "#ececec" }}>
              <StaffItem
                key={item}
                status={1}
              />
            </View>
          );
        }}
      />

      <TouchableOpacity style={styles.plusButton}>
        <Icon name="plus" size={30} color={WHITE}></Icon>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  plusButton: {
    backgroundColor: BLUE2,
    width: 55,
    height: 55,
    position: "absolute",
    bottom: 10,
    right: 5,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StaffList;
