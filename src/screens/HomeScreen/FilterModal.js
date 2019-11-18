import React, {PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Picker,
} from 'react-native';
import Modal from 'react-native-modal';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import colors from '../../resource/colors';
import {icon} from '../../resource/icons';

class FilterModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      micType: '',
    };
    this.selectedMicType = this.selectedMicType.bind(this);
    this.micTypeOptions = [
      {label: 'No Drink Minimum', value: 'No Drink Minimum'},
      {label: 'Drink Minimum', value: 'Drink Minimum'},
    ];
  }

  selectedMicType(value) {
    this.setState({micType: value});
  }

  handleReSendMail() {}
  render() {
    const {modalVisible, toggleModal} = this.props;
    console.log('modal', this.props);
    return (
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.mainView}>
          <ScrollView>
            <View style={styles.logoView}>
              <Image
                style={styles.logoImage}
                source={icon.WHITELOGO}
                resizeMode="contain"
              />
            </View>
            <View style={styles.micTypeView}>
              <Picker
                selectedValue={this.state.micType}
                onValueChange={this.selectedMicType}
                style={styles.micPickerStyle}>
                {this.micTypeOptions.map((data, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={data.label}
                      value={data.label}
                    />
                  );
                })}
              </Picker>
            </View>
          </ScrollView>
          <View style={styles.rowView}>
            <TouchableOpacity style={styles.closeIcon} onPress={toggleModal}>
              <View>
                <Text style={styles.closeIconSize}>X</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

let styles = StyleSheet.create({
  mainView: {
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(80),
    alignSelf: 'center',
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    flexDirection: 'row',
  },
  rowView: {
    flexDirection: 'row',
    position: 'absolute',
    end: 0,
  },
  closeIcon: {
    margin: 20,
  },
  closeIconSize: {
    fontSize: RFPercentage(3),
  },
  ScrollableView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoView: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  logoImage: {
    width: widthPercentageToDP(80),
    height: heightPercentageToDP(23),
  },
  micTypeView: {},
  micPickerStyle: {
    margin: 20,
  },
});

export default FilterModal;
