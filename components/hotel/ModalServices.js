import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {Modal, View} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import {BLUE1, BLUE2, LIGHT_GRAY} from '../../src/values/color';
import {Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {setServices} from '../../features/hotel/hotelSlice';
export const ModalServices = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [selectedService, setSelectedService] = useState([]);
  const refSearch = useRef();
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setShow(true);
    },
  }));

  const close = () => {
    setShow(false);
  };

  const onSelectedItemsChange = selectedItems => {
    setSelectedService(selectedItems);
    setCheck(true);
  };

  useEffect(() => {
    if (selectedService.length > 0) {
      dispatch(setServices(selectedService));
    }
  }, [selectedService]);

  useEffect(() => {
    setSelectedService(props.serviceAvailable ? props.serviceAvailable : []);
  }, [props.serviceAvailable]);
  console.log(selectedService, '=====HOTEL SERVICES');

  return (
    <Modal onRequestClose={close} visible={show}>
      <View style={{margin: 10, backgroundColor: {LIGHT_GRAY}}}>
        <View ref={refSearch} style={{marginTop: 10, marginLeft: 10}}>
          {console.log(selectedService, 'hihiihiiihihihi')}
          {console.log(refSearch.current)}
          {refSearch.current &&
            refSearch.current.getSelectedItemsExt(selectedService)}
        </View>
        <View style={{paddingTop: 10}}>
          <MultiSelect
            items={props.services}
            uniqueKey="id"
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedService}
            selectText="Chọn dịch vụ "
            styleTextDropdown={{fontSize: 15, marginLeft: 30}}
            searchInputPlaceholderText="Nhấn vào để tìm dịch vụ"
            tagRemoveIconColor={BLUE2}
            tagBorderColor="#CCC"
            tagTextColor={BLUE2}
            selectedItemTextColor="#000"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="item"
            searchInputStyle={{color: '#CCC'}}
            removeSelected
            hideSubmitButton
            hideTags={check}
            ref={component => {
              refSearch.current = component;
            }}
          />
          <Button
            onPress={() => {
              refSearch.current && refSearch.current._removeAllItems();
              close();
            }}
            title={'Xong'}
          />
        </View>
      </View>
    </Modal>
  );
});
