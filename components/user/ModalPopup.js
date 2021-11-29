import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {BLUE2} from '../../src/values/color';
const ModalPopup = ({visible, children, setVisible, title, setFirstTime}) => {
  return (
    <Modal
      animationType={'fade'}
      transparent
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}>
      <TouchableOpacity
        style={{flex: 1}}
        activeOpacity={1}
        onPressOut={() => {
          setVisible(false);
          setFirstTime &&setFirstTime(false);
        }}>
        <View style={styles.modalBackGround}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.header}>{title}</Text>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                {children}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    // paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: BLUE2,
    marginBottom: 5,
  },
});
export default ModalPopup;
