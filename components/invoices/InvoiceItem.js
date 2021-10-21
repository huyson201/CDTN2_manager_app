import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  BLUE2,
  WHITE,
  LIGHT_GRAY,
  ORANGE,
  MAP_MARKER,
} from "../../src/values/color";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import {
  WAIT_COMFIRM,
  COMFIRM,
  COMFIRMED,
  TOTAL,
} from "../../src/values/constants";
import Icon from "react-native-vector-icons/FontAwesome5";

const InvoiceItem = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        // alert("clicked");
        props.navigation
          ? props.navigation.navigate("Invoice")
          : console.log("navigation");
      }}
    >
      <View style={styles.view}>
        <View style={[styles.flex_row, styles.header]}>
          <Text style={[styles.padding, styles.roomName]}>
            {props.roomName}
          </Text>
          <Menu style={{ margin: 10, marginTop: 15 }}>
            <MenuTrigger>
              <Icon2 style={styles.icon_menu} name="dots-vertical" size={20} />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() => alert(COMFIRMED)} text={COMFIRM} />
              <MenuOption onSelect={() => alert(COMFIRMED)} text={COMFIRM} />
              <MenuOption onSelect={() => alert(COMFIRMED)} text={COMFIRM} />
              <MenuOption onSelect={() => alert(COMFIRMED)} text={COMFIRM} />
              <MenuOption disabled={true} text="Disabled" />
            </MenuOptions>
          </Menu>
        </View>

        <View style={[styles.body, styles.padding, styles.flex_row]}>
          <View>
            <Text>Thời gian</Text>
            <Text style={styles.color_text}>2/3/2001 - 5/3/2001</Text>
          </View>
          <View style={[styles.flex_row, styles.padding_status]}>
            {props.status >= 1 ? (
              <>
                <Icon
                  name="check"
                  size={14}
                  color="#05375a"
                  style={styles.icon}
                ></Icon>
                <Text style={styles.color_text}>Còn phòng</Text>
              </>
            ) : (
              <>
                <Octicons
                  name="x"
                  size={14}
                  style={[styles.icon, styles.color_red]}
                ></Octicons>
                <Text style={{ color: MAP_MARKER, fontSize: 12.5 }}>
                  Hết phòng
                </Text>
              </>
            )}
          </View>
        </View>
        <View style={[styles.footer, styles.padding, styles.flex_row]}>
          <Text>{`${TOTAL}`} : 300000</Text>
          <Text style={{ color: ORANGE }}>{WAIT_COMFIRM}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 5,
    backgroundColor: WHITE,
    borderRadius: 5,
    elevation: 3,
  },
  header: {
    backgroundColor: BLUE2,
  },
  body: {
    paddingBottom: 10,
    paddingTop: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: LIGHT_GRAY,
  },
  footer: {
    paddingBottom: 12,
    paddingTop: 7,
    color: "#000",
  },
  flex_row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  padding: {
    padding: 15,
  },
  padding_status: {
    paddingTop: 15,
  },
  color_text: {
    color: "#05375a",
    fontSize: 12.5,
  },
  color_red: {
    color: MAP_MARKER,
    fontSize: 14,
    marginRight: 5,
  },
  roomName: {
    fontSize: 15,
    fontWeight: "600",
    textTransform: "uppercase",
    color: WHITE,
  },

  icon_menu: {
    paddingLeft: 15,
    color: LIGHT_GRAY,
  },
  icon: {
    color: "#05375a",
    marginTop: 2,
    marginRight: 2,
  },
});

export default InvoiceItem;
