import React, {PureComponent} from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {icon} from '../../resource/icons';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import colors from '../../resource/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
const micData = [
  {
    id: 0,
    name: 'Comedy open Mic',
    time: '04:20 PM',
    day: 'Saturday',
    venue: 'Mickey Cafe',
    region: 'Bridgeport Gloucester',
    address: '1232- Fashion street',
    about:
      'This mic is for open to all. Main purpose of this mic is entertainment of the people.',
    icon: icon.MIC,
  },
  {
    id: 1,
    name: 'Comedy open Mic',
    time: '03:20 PM',
    day: 'Saturday',
    venue: 'Mickey Cafe',
    region: 'Bridgeport Gloucester',
    address: '1232- Fashion street',
    about:
      'This mic is for open to all. Main purpose of this mic is entertainment of the people.',
    icon: icon.MICTWO,
  },
];
class Mic extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <FlatList
          data={micData}
          keyExtractor={(data, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('MIC')}>
              <View style={styles.micFirstView}>
                <View style={styles.micSecondView}>
                  <View style={styles.micImageView}>
                    <Image
                      style={styles.micImage}
                      source={item.icon}
                      resizeMode="contain"
                    />
                  </View>
                </View>
                <Text style={styles.micNameText}>{item.name}</Text>
                <View style={styles.timeView}>
                  <Image style={styles.clockIcon} source={icon.ICON_CLOCK} />
                  <Text>{item.time}, </Text>
                  <Text>{item.day}</Text>
                </View>
                <View style={styles.timeView}>
                  <Image style={styles.clockIcon} source={icon.ICON_LOCATION} />
                  <Text>{item.venue}, </Text>
                  <Text>{item.region}</Text>
                </View>
                <View style={styles.addressView}>
                  <Text style={styles.addressText}>{item.address},</Text>
                </View>
                <View style={styles.timeView}>
                  <Image style={styles.clockIcon} source={icon.ICON_MIC} />
                  <Text>About The Mic</Text>
                </View>
                <View style={styles.addressView}>
                  <Text style={styles.aboutMicText}>{item.about}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  micFirstView: {
    margin: 20,
    backgroundColor: colors.WHITE,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
  },
  micSecondView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    marginStart: 20,
    marginEnd: 20,
  },
  micImageView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 20,
    marginEnd: 20,
  },
  micImage: {
    marginStart: 20,
    marginEnd: 20,
    width: widthPercentageToDP(80),
    height: heightPercentageToDP(30),
  },
  micNameText: {
    color: colors.MIC_NAME,
    fontSize: RFPercentage(3),
    marginStart: 20,
    marginEnd: 20,
    marginTop: 10,
  },
  timeView: {
    flexDirection: 'row',
    marginStart: 20,
    marginEnd: 20,
    marginTop: 10,
  },
  clockIcon: {
    width: 20,
    height: 20,
    marginEnd: 10,
  },
  addressView: {
    marginStart: 50,
    marginEnd: 20,
    marginTop: 10,
  },
  addressText: {
    color: colors.BTN_TAB_GRAY,
  },
  aboutMicText: {
    color: colors.BTN_TAB_GRAY,
    marginBottom: 10,
  },
});
export default Mic;
