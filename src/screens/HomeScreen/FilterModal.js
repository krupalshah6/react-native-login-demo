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
import {icon} from '../../resource/icons';
import strings from '../../resource/string';
import ModalSelector from 'react-native-modal-selector';;
import {styles} from './FilterModalStyle';
import {dispatch} from '../../redux/store';
import {setFilterData} from '../../redux/actions/basicActions';

class FilterModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      micType: '',
      searchValue: '',
      feesType: [],
    };
    this.selectedMicType = this.selectedMicType.bind(this);
    this.handleSearchValue = this.handleSearchValue.bind(this);
    this.micTypeOptions = [
      {key: 'No Drink Minimum', label: 'No Drink Minimum'},
      {key: 'Drink Minimum', label: 'Drink Minimum'},
    ];
  }

  componentDidMount() {
    let feesType = [...this.props.feesType];
    let updatedKeyValue = [];
    feesType.length > 0 && feesType.map(item => {
      updatedKeyValue.push({
        key: item.id,
        label: item.fees
      });
    })
    this.setState({feesType: updatedKeyValue});
  }

  componentDidUpdate(preProps) {
    if (preProps.feesType !== this.props.feesType) {
      let feesType = [...this.props.feesType];
      let updatedKeyValue = [];
      feesType.length > 0 && feesType.map(item => {
        updatedKeyValue.push({
          key: item.id,
          label: item.fees
        });
      })
      this.setState({feesType: updatedKeyValue});
    }
  }

  selectedMicType(value) {
    this.setState({micType: value});
  }

  handleSearchValue(value) {
    this.setState({searchValue: value});
  }

  handleSubmit = () => {
    const {micType, searchValue} = this.state;
    const filterData = {
      feesType: micType,
      searchKeyword: searchValue
    };
    dispatch(setFilterData(filterData));
    this.props.toggleModal();
  }

  handleReset = () => {
    this.setState({ micType: '', searchValue: ''}, () => {
      const {micType, searchValue} = this.state;
      const filterData = {
        feesType: micType,
        searchKeyword: searchValue
      };
      dispatch(setFilterData(filterData));
      this.props.toggleModal();
    }) 
  }

  render() {
    const {modalVisible, toggleModal} = this.props;
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
                data={this.state.feesType}
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
            <View style={styles.btnRowView}>
            <View style={styles.applyView}>
              <TouchableOpacity
                style={styles.buttonStyle}
                 onPress={this.handleSubmit}
              >
                <Text style={styles.textSignUp}>
                  {strings.BTN_FILTER_APPLY}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.applyView}>
              <TouchableOpacity
                style={styles.buttonStyle}
                 onPress={this.handleReset}
              >
                <Text style={styles.textSignUp}>
                  {strings.BTN_RESET}
                </Text>
              </TouchableOpacity>
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

export default FilterModal;
