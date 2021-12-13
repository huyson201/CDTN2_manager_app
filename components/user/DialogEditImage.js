import React from "react";
import { PermissionsAndroid, StyleSheet, View } from "react-native";
import Dialog from "react-native-dialog";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { setCheckPickerImage, setFile } from "../../features/auth/userSlice";

const DialogEditImage = () => {
    const { checkPickerImage } = useSelector(state => state.users)
    // console.log(checkPickerImage);
    const dispatch = useDispatch()
    const options = {
        title: 'Select Avatar',
        // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    const setFileImage = (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else {
            console.log(response)
            dispatch(setFile({
                uri: response.assets[0].uri,
                type: response.assets[0].type,
                name: response.assets[0].fileName
            }));
        }
    }

    const handleCancel = () => {
        dispatch(setCheckPickerImage(false));
    };

    const handleClickTakePhoto = async () => {
        dispatch(setCheckPickerImage(false));
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    message: "Bạn cần truy cập máy ảnh ? ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                launchCamera(options, (response) => {
                    setFileImage(response)
                });
                console.log("Camera permission given");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const handleClickLibrary = () => {
        dispatch(setCheckPickerImage(false));
        launchImageLibrary(options, (response) => {
            setFileImage(response)
        });
    }

    return (
        <View style={styles.container}>
            <Dialog.Container style={{ position: 'absolute', bottom: 0 }} visible={checkPickerImage} verticalButtons={true}>
                <Dialog.Title>Ảnh đại diện</Dialog.Title>
                <Dialog.Button style={styles.btn} label="CHỤP ẢNH MỚI" onPress={handleClickTakePhoto} />
                <Dialog.Button style={styles.btn} label="CHỌN ẢNH TỪ THIẾT BỊ" onPress={handleClickLibrary} />
                <Dialog.Button label="HỦY" onPress={handleCancel} />
            </Dialog.Container>
        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        position: "relative",
        width: '100%',
    },
    btn: {
        width: 300,
        borderBottomWidth: 1,
        borderBottomColor: "#f1f1f1",
        margin: 0
    }
});

export default DialogEditImage