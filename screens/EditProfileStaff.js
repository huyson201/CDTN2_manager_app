import React, { useState } from 'react';
import {
    View,
    Image,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Text,
    TextInput,
} from 'react-native';
import { WHITE, BLUE1, BLUE2 } from "../src/values/color";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/MaterialIcons";

const EditProfileStaff = () => {
    return (
        <View>
            <View style={{ justifyContent: "center", alignItems: "center", padding: 50, backgroundColor: BLUE2 }}>
                <Image
                    style={styles.imgStaff}
                    source={require('../src/images/detail_hotel_1.jpg')} />
            </View>
            <View style={{ marginLeft: 20, marginRight: 20 }}>
                <View style={styles.flex_row}>
                    <Icon name="user" size={23} color={BLUE2} style={{ paddingTop: 13, paddingRight: 15 }} />
                    <TextInput
                        defaultValue="Staff name"
                        placeholder="Input Your Name"
                        autoCapitalize="none"
                        style={{
                            fontSize: 17
                        }} />
                </View>
                <View style={styles.flex_row}>
                    <Icon2 name="location-history" size={25} color={BLUE2} style={{ paddingTop: 13, paddingRight: 15 }} />
                    <TextInput
                        defaultValue="Nhân Viên"
                        placeholder="Input Your Position"
                        autoCapitalize="none"
                        style={{
                            fontSize: 17
                        }} />
                </View>
                <View style={styles.flex_row}>
                    <Icon2 name="contact-phone" size={23} color={BLUE2} style={{ paddingTop: 13, paddingRight: 15 }} />
                    <TextInput
                        defaultValue="0987654321"
                        placeholder="Input Your Phone"
                        autoCapitalize="none"
                        style={{
                            fontSize: 17
                        }} />
                </View>
                <View style={styles.flex_row}>
                    <Icon2 name="mail-outline" size={25} color={BLUE2} style={{ paddingTop: 13, paddingRight: 15 }} />
                    <TextInput
                        defaultValue="abc@gmail.com"
                        placeholder="Input Your Email"
                        autoCapitalize="none"
                        style={{
                            fontSize: 17
                        }} />
                </View>
                <View>
                    <TouchableOpacity style={styles.button}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    imgStaff: {
        width: 100,
        height: 100,
        borderRadius: 15,
    },
    flex_row: {
        flexDirection: "row",
        justifyContent: "flex-start",
        borderBottomColor: BLUE2,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        paddingTop: 20
    },
    button: {
        backgroundColor: BLUE2,
        width: 100,
        height: 40,
        position: "absolute",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50
      },
});

export default EditProfileStaff;