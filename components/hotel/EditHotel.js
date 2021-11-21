import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
    ImageBackground,
} from 'react-native';
import { WHITE, BLUE1, BLUE2 } from "../src/values/color";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import { Picker } from '@react-native-picker/picker';

const EditHotel = () => {
    const [selectedPosition, setSelectedPosition] = useState();
    return (
        <View>
            <View style={styles.header}>
                <TouchableOpacity>
                    <ImageBackground
                        style={styles.imgStaff}
                        imageStyle={{ borderRadius: 15 }}
                        source={require('../src/images/detail_hotel_1.jpg')} >
                        <View style={styles.view_camera}>
                            <Icon name="camera" size={25} color={WHITE} style={styles.icon_camera} />
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 20, marginRight: 20 }}>
                <View style={styles.flex_row}>
                    <Icon name="user" size={23} style={styles.icon} />
                    <TextInput
                        defaultValue="Staff name"
                        placeholder="Input Your Name"
                        autoCapitalize="none"
                        style={{
                            fontSize: 17,
                            paddingLeft: 20
                        }} />
                </View>
                <View style={styles.flex_row}>
                    <Icon2 name="location-history" size={25} style={styles.icon} />
                    <Picker
                        selectedValue={selectedPosition}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedPosition(itemValue)
                        }>
                        <Picker.Item label="Nhân viên" value="Nhân viên" style={{fontSize: 17}} />
                        <Picker.Item label="Lễ Tân" value="Lễ Tân" style={{fontSize: 17}}/>
                    </Picker>
                </View>
                <View style={styles.flex_row}>
                    <Icon2 name="contact-phone" size={23} style={styles.icon} />
                    <TextInput
                        defaultValue="0987654321"
                        placeholder="Input Your Phone"
                        autoCapitalize="none"
                        style={{
                            fontSize: 17,
                            paddingLeft: 20
                        }} />
                </View>
                <View style={styles.flex_row}>
                    <Icon2 name="mail-outline" size={25} style={styles.icon} />
                    <TextInput
                        defaultValue="abc@gmail.com"
                        placeholder="Input Your Email"
                        autoCapitalize="none"
                        style={{
                            fontSize: 17,
                            paddingLeft: 20
                        }} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.text_button}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.text_button}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        justifyContent: "center",
        alignItems: "center",
        padding: 50,
        backgroundColor: BLUE2
    },
    imgStaff: {
        width: 110,
        height: 110,
    },
    view_camera: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    icon_camera: {
        opacity: 0.5,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: WHITE,
        borderRadius: 10,
        padding: 5,
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
        width: 150,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    icon: {
        paddingTop: 13,
        color: BLUE2,
    },
    picker: {
        width: 290,
        height: 40,
    },
    text_button: {
        color: WHITE,
        fontWeight: 'bold',
        fontSize: 15,
    }
});

export default EditHotel;