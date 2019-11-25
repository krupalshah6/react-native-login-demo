/* eslint-disable react/no-did-mount-set-state */
import React, {PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './RegionModalStyle';
import {icon} from '../../resource/icons';
import strings from '../../resource/string';
import { dispatch } from '../../redux/store';
import { setCurrentRegion } from '../../redux/actions/basicActions';
class RegionModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      regionList: [],
    };
  }

  componentDidMount() {
    const {region} = this.props;
    if (region.length > 0) {
      this.setState({regionList: region});
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.region !== this.state.region) {
      if (this.props.region.length > 0) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({regionList: this.props.region});
      }
    }
  }

  handleSelectRegion = item => {
    const currentRegion = {
      id: item.id,
      name: item.region,
      image: item.region_image,
    };
    dispatch(setCurrentRegion(currentRegion));
    this.props.toggleModal();
  };

  render() {
    const {modalVisible, toggleModal} = this.props;
    console.log('region list', this.state.regionList);
    return (
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.mainView}>
          <ScrollView>
            <View style={styles.ScrollableView}>
              <View style={styles.logoView}>
                <Image
                  style={styles.logoImage}
                  source={icon.WHITELOGO}
                  resizeMode="contain"
                />
              </View>
              <View>
                <Text style={styles.textView}>{strings.REGINTEXT}</Text>
              </View>
              <View style={styles.dotted} />
              <FlatList
                data={this.state.regionList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => this.handleSelectRegion(item)}>
                    <View style={styles.regionImageMainView}>
                      <View>
                        <Image
                          style={styles.regionImageStyle}
                          source={{uri: item.region_image}}
                        />
                        <View style={styles.overlay} />
                      </View>
                      <Text style={styles.regionButtonText}>{item.region}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
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

export default RegionModal;
