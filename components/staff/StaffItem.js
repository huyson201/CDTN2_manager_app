import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
    WHITE,
} from "../../src/values/color";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from "react-native-popup-menu";
import {
    STAFF_NAME,
    STAFF_POSITION,
    STAFF_PHONE,
    STAFF_EMAIL,
    STAFF_EDIT,
    STAFF_DELETE,
} from "../../src/values/constants";

const StaffItem = (props) => {
    return (
        <View style={[styles.view, styles.flex_row]}>
            {/* Image */}
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                    style={styles.imgStaff}
                    source={require('../../src/images/staff.jpg')} />
            </View>

            {/* Name, position */}
            <View style={{ paddingLeft: 20, }}>
                <View style={styles.flex_row}>
                    <Text style={styles.title1}>Name: </Text>
                    <Text style={styles.content1}>{STAFF_NAME}</Text>
                </View>
                <View style={styles.flex_row}>
                    <Text style={styles.title2}>Position: </Text>
                    <Text style={styles.content2}>{STAFF_POSITION}</Text>
                </View>
                <View style={styles.flex_row}>
                    <Text style={styles.title2}>Phone: </Text>
                    <Text style={styles.content2}>{STAFF_PHONE}</Text>
                </View>
                <View style={styles.flex_row}>
                    <Text style={styles.title2}>Email: </Text>
                    <Text style={styles.content2}>{STAFF_EMAIL}</Text>
                </View>
            </View>

            <Menu style={{ marginLeft: 15, }}>
                <MenuTrigger>
                    <Icon name="dots-vertical" size={25} />
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption text={STAFF_EDIT} />
                    <MenuOption onSelect={() => alert('Xóa')} text={STAFF_DELETE} />
                </MenuOptions>
            </Menu>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        margin: 5,
        padding: 10,
        backgroundColor: WHITE,
        borderRadius: 5,
        elevation: 3,
    },
    flex_row: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    imgStaff: {
        width: 90,
        height: 90,
        borderRadius: 100,
    },
    title1: {
        lineHeight: 25,
        fontSize: 16,
        fontWeight: "bold",
    },
    content1: {
        lineHeight: 25,
        fontSize: 16,
        maxWidth: "75%",
    },
    title2: {
        lineHeight: 25,
        fontSize: 13,
        fontWeight: "bold",
    },
    content2: {
        lineHeight: 25,
        fontSize: 14,
        maxWidth: "75%",
    }
});

export default StaffItem;
