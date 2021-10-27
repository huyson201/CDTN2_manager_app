import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import {
    BLUE2,
    WHITE,
    LIGHT_GRAY,
    ORANGE,
    MAP_MARKER,
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
} from "../../src/values/constants";

const StaffItem = (props) => {
    return (
        <View style={[styles.view, styles.flex_row]}>
            {/* Image */}
            <Image
                style={styles.imgStaff}
                source={require('../../src/images/staff.jpg')} />
            {/* Name, position */}
            <View style={{ paddingLeft: 10, paddingTop: 10 }}>
                <View style={styles.flex_row}>
                    <Text style={styles.title}>Name: </Text>
                    <Text style={styles.content}>{STAFF_NAME}</Text>
                </View>
                <View style={styles.flex_row}>
                    <Text style={styles.title}>Position: </Text>
                    <Text style={styles.content}>{STAFF_POSITION}</Text>
                </View>
            </View>
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
    title: {
        lineHeight: 30,
        fontSize: 16,
        fontWeight: "bold",
    },
    content: {
        lineHeight: 30,
        fontSize: 16,
    }
});

export default StaffItem;
