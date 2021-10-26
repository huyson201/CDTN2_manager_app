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
import {WHITE, BLUE1, BLUE2} from "../src/values/color";
import Icon from "react-native-vector-icons/FontAwesome";

const StaffList = ({ navigation }) => {
  const data = [1, 2, 3, 4, 5, 6];
  return (
    <TouchableOpacity style={styles.plusButton}>
        <Icon name="plus" size={30} color={WHITE}></Icon>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    plusButton: {
      backgroundColor: BLUE2,
      width: 55,
      height: 55,
      position: "absolute",
      bottom: 45,
      right: 20,
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default StaffList;
