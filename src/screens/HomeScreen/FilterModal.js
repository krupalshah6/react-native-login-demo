import React, {PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Picker,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import colors from '../../resource/colors';
import {icon} from '../../resource/icons';
import strings from '../../resource/string';
import ModalSelector from 'react-native-modal-selector'

class FilterModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      micType: '',
      searchValue: '',
    };
    this.selectedMicType = this.selectedMicType.bind(this);
    this.handleSearchValue = this.handleSearchValue.bind(this);
    this.micTypeOptions = [
      {key: 'No Drink Minimum', label: 'No Drink Minimum'},
      {key: 'Drink Minimum', label: 'Drink Minimum'},
    ];
  }

  selectedMicType(value) {
    this.setState({micType: value});
  }

  handleSearchValue(value) {
    this.setState({searchValue: value});
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
              <Text style={styles.micPickerText}>{strings.MICTYPE}</Text>
              <ModalSelector
                data={this.micTypeOptions}
                initValue={strings.MICTYPE}
                onChange={this.selectedMicType}
              />
            </View>
            <View style={styles.micSearchView}>
              <Text style={styles.searchText}>{strings.SEARCHMIC}</Text>
              <View style={styles.searchInputView}>
                <TextInput
                  value={this.state.searchValue}
                  onChangeText={this.handleSearchValue}
                  style={styles.searchInput}
                />
              </View>
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
  micTypeView: {
    margin: 20,
  },
  micPickerText: {
    fontSize: 20,
  },
  micSearchView: {
    margin: 20,
  },
  searchText: {
    fontSize: 20,
  },
  searchInputView: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.BG_GRAY,
  },
  searchInput: {
    width: widthPercentageToDP(80),
    padding: 10,
  },
});

export default FilterModal;
