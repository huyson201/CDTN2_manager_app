import React, { useState, Component } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image
} from "react-native";
import { WHITE, BLUE1, BLUE2, LIGHT_GRAY, DARK_GRAY } from "../src/values/color";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Button } from 'react-native-elements';

const data = [
    { key: 'Profile', image: 'https://cdn-icons.flaticon.com/png/512/560/premium/560260.png?token=exp=1636452488~hmac=7e64325fd84882f9f39cbf935570181d' },
    { key: 'Staff', image: 'https://cdn-icons.flaticon.com/png/512/923/premium/923445.png?token=exp=1636452807~hmac=0a6c18c683921405d43b5fecd60af729' },
    { key: 'Hotel List', image: 'https://cdn-icons-png.flaticon.com/512/4252/4252324.png' },
    { key: 'Invoice', image: 'https://cdn-icons-png.flaticon.com/512/1611/1611236.png' },
    { key: 'Sign out', image: 'https://cdn-icons.flaticon.com/png/512/3808/premium/3808289.png?token=exp=1636438377~hmac=6008919cd949702a100dbb40d5fe4df7' }
];

const numColumns = 2;

class DashboardItem extends React.Component {
    render() {
        const { key, image } = this.props.dashboardItem
        return (
            <TouchableOpacity style={styles.item}>
                <Image
                        style={styles.itemImage}
                        source={{ uri: image }} />
                <View style={styles.border}>
                    
                </View>
                <Text style={styles.itemText}>{key}</Text>
            </TouchableOpacity>
        )
    }
}

const DashBoardScreen = function ({ navigation }) {
    return (
        <View style={styles.container}>
            <FlatList
                numColumns={2}
                data={data}
                renderItem={({ item }) => (<DashboardItem dashboardItem={item} />)}>
            </FlatList>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: LIGHT_GRAY,
        marginLeft: 5,
        marginRight: 5,
    },
    item: {
        backgroundColor: WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 5,
        height: Dimensions.get('window').width / numColumns,
        borderRadius: 10,
    },
    itemImage: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },
    itemText: {
        fontSize: 17,
        color: DARK_GRAY,
    },
});

export default DashBoardScreen;
