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
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import colors from '../../resource/colors';
import {icon} from '../../resource/icons';
import strings from '../../resource/string';
class RegionModal extends PureComponent {
  handleReSendMail() {}
  render() {
    const {modalVisible, toggleModal} = this.props;
    console.log('modal', this.props);
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
  textView: {
    textAlign: 'center',
    color: colors.DARKGRAY,
    fontSize: RFPercentage(3),
  },
  dotted: {
    marginTop: 10,
    marginBottom: 10,
    borderColor: colors.DARKGRAY,
    height: 0.52,
    width: widthPercentageToDP(90),
    borderRadius: 1, // hack for borderStyle.
    borderWidth: 0.52,
    borderStyle: 'dashed',
  },
  regionImageMainView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  regionImageStyle: {
    width: widthPercentageToDP(80),
    height: heightPercentageToDP(15),
    borderRadius: 10,
  },
  regionButtonText: {
    position: 'absolute',
    textAlign: 'center',
    color: colors.WHITE,
    fontSize: RFPercentage(3),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
  },
});

export default RegionModal;
