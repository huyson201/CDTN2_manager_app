import React from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import InvoiceItem from "../components/invoices/InvoiceItem";

const InvoiceList = ({ navigation }) => {
  const data = [1, 2, 3, 4, 5, 6];
  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={{ backgroundColor: "#ececec" }}>
              <InvoiceItem
                key={item}
                roomName={"deluxe room"}
                status={1}
                navigation={navigation}
              />
            </View>
          );
        }}
      />
    </>
  );
};

export default InvoiceList;
