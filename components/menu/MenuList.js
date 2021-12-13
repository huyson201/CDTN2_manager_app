import React, { useEffect, useState } from "react";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from "react-native-popup-menu";
import {
    CHANGE_STATUS_INVOICE,
    COMFIRM,
    DELETE,
    WAIT_COMFIRM,
} from "../../src/values/constants";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet } from "react-native";
import { LIGHT_GRAY } from "../../src/values/color";
import invoiceApi from "../../api/invoiceApi";
import { useDispatch, useSelector } from "react-redux";
import { setCheck } from "../../features/invoice/invoiceSlice";
import {useToast} from 'react-native-toast-notifications';
const MenuList = (props) => {
    const toast = useToast();
    const token = useSelector(state => state.users.token)
    const dispatch = useDispatch()
    const handleComfirm = async () => {
        try {
            const status = Object.values(CHANGE_STATUS_INVOICE[props.status])
            console.log(status, "status");
            const res = await invoiceApi.update(props.id, status[0], props.room_quantity, token)
            if (res.data.data) {
                toast.show("Cập nhật thành công", {
                    type: 'success',
                    placement: 'top',
                    duration: 3000,
                    offset: 0,
                    animationType: 'slide-in',
                  });
                dispatch(setCheck(true))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = async () => {
        // try {
        //     const res = await invoiceApi.delete(props.id, token)
        //     if (res.data) {
        //         console.log(res.data);
        //         dispatch(setCheck(true))
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
        try {
            // const status = Object.values(CHANGE_STATUS_INVOICE[props.status])
            // console.log(status, "status");
            const res = await invoiceApi.update(props.id, 5, props.room_quantity, token)
            if (res.data.data) {
                console.log(res.data.data);
                dispatch(setCheck(true))
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Menu style={{ margin: 10, marginTop: 15 }}>
            <MenuTrigger>
                <Icon2 style={styles.icon_menu} name="dots-vertical" size={20} />
            </MenuTrigger>
            <MenuOptions>
                <MenuOption onSelect={handleComfirm} text={COMFIRM} />
                <MenuOption onSelect={handleCancel} text={DELETE} />
            </MenuOptions>
        </Menu>
    )
}

const styles = StyleSheet.create({
    icon_menu: {
        paddingLeft: 15,
        color: LIGHT_GRAY,
    },
    // icon: {
    //   color: "#05375a",
    //   marginTop: 2,
    //   marginRight: 2,
    // },
});
export default MenuList