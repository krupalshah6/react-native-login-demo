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
class RegionModal extends PureComponent {
  handleReSendMail() {}
  render() {
    const {modalVisible, toggleModal} = this.props;
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
                data={[
                  {id: 1, title: 'Bridgeport Gloucester', icon: icon.PLACEONE},
                  {id: 2, title: 'Manhattan', icon: icon.PLACETWO},
                  {id: 3, title: 'Bridgeport Gloucester', icon: icon.PLACEONE},
                  {id: 4, title: 'Manhattan', icon: icon.PLACETWO},
                  {id: 5, title: 'Bridgeport Gloucester', icon: icon.PLACEONE},
                  {id: 6, title: 'Manhattan', icon: icon.PLACETWO},
                ]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity>
                    <View style={styles.regionImageMainView}>
                      <View>
                        <Image
                          style={styles.regionImageStyle}
                          source={item.icon}
                        />
                        <View style={styles.overlay} />
                      </View>
                      <Text style={styles.regionButtonText}>{item.title}</Text>
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
