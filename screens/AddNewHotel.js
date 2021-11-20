import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
    ImageBackground,
    ToastAndroid,
} from 'react-native';
import { WHITE, BLUE1, BLUE2 } from '../src/values/color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';

const AddNewHotel = ({ navigation, route }) => {
    return (
        <View>
            {/* Image */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <ImageBackground
                        style={styles.imgStaff}
                        imageStyle={{ borderRadius: 15 }} >
                        <View style={styles.view_camera}>
                            <Icon name="camera" size={25} color={WHITE} style={styles.icon_camera} />
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
            {/* Input infor */}
            <View style={{ marginLeft: 20, marginRight: 20 }}>
                {/* Hotel name */}
                <View style={styles.flex_row}>
                    <Icon name="hotel" size={23} style={styles.icon} />
                    <TextInput
                        placeholder="Hotel Name"
                        autoCapitalize="none"
                        style={{
                            fontSize: 17,
                            paddingLeft: 20
                        }} />
                </View>
                {/* Phone number */}
                <View style={styles.flex_row}>
                    <Icon name="phone-alt" size={23} style={styles.icon} />
                    <TextInput
                        placeholder="Phone number"
                        autoCapitalize="none"
                        style={{
                            fontSize: 17,
                            paddingLeft: 20
                        }} />
                </View>
                {/* Star */}
                <View style={styles.flex_row}>
                    <Icon2 name="star" size={25} style={styles.icon} />
                    <Picker
                        style={styles.picker}>
                        <Picker.Item label="1" value="1" style={{ fontSize: 17 }} />
                        <Picker.Item label="2" value="2" style={{ fontSize: 17 }} />
                        <Picker.Item label="3" value="3" style={{ fontSize: 17 }} />
                        <Picker.Item label="4" value="4" style={{ fontSize: 17 }} />
                        <Picker.Item label="5" value="5" style={{ fontSize: 17 }} />
                    </Picker>
                </View>
                {/* Address */}
                <View style={styles.flex_row}>
                    <Icon2 name="location-history" size={25} style={styles.icon} />
                    <Picker
                        style={styles.picker}>
                        <Picker.Item label="TP Hồ Chí Minh" value="TP Hồ Chí Minh" style={{ fontSize: 17 }} />
                        <Picker.Item label="Đà Nẵng" value="Đà Nẵng" style={{ fontSize: 17 }} />
                    </Picker>
                </View>

                <View style={styles.flex_row}>
                    <Icon2 name="location-history" size={25} style={styles.icon} />
                    <Picker
                        style={styles.picker}>
                        <Picker.Item label="Quận 2" value="Quận 2" style={{ fontSize: 17 }} />
                        <Picker.Item label="Quận 3" value="Quận 3" style={{ fontSize: 17 }} />
                    </Picker>
                </View>

                <View style={styles.flex_row}>
                    <Icon2 name="location-history" size={25} style={styles.icon} />
                    <Picker
                        style={styles.picker}>
                        <Picker.Item label="Phường Bến Nghé" value="Phường Bến Nghé" style={{ fontSize: 17 }} />
                        <Picker.Item label="Phường Bến Nghé" value="Phường Bến Nghé" style={{ fontSize: 17 }} />
                    </Picker>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.text_button}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.text_button}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
        backgroundColor: BLUE2,
    },
    imgStaff: {
        width: 110,
        height: 110,
    },
    view_camera: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon_camera: {
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: WHITE,
        borderRadius: 10,
        padding: 5,
    },
    flex_row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderBottomColor: BLUE2,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        paddingTop: 20,
    },
    button: {
        backgroundColor: BLUE2,
        width: 150,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
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
    },
});

export default AddNewHotel;