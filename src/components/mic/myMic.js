import React, {PureComponent} from 'react';
import {View, ScrollView, Image, StyleSheet, Text, Alert} from 'react-native';
import {icon} from '../../resource/icons';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import colors from '../../resource/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {TouchableOpacity} from 'react-native-gesture-handler';
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
class MyMic extends PureComponent {
  render() {
    const {currentTab} = this.props;
    return (
      <View>
        {micData.map((data, index) => {
          return (
            <View key={index} style={styles.micFirstView}>
              <View style={styles.micSecondView}>
                <View style={styles.micImageView}>
                  <Image
                    style={styles.micImage}
                    source={data.icon}
                    resizeMode="contain"
                  />
                </View>
              </View>
              <Text style={styles.micNameText}>{data.name}</Text>
              <View style={styles.timeView}>
                <Image style={styles.clockIcon} source={icon.ICON_CLOCK} />
                <Text>{data.time}, </Text>
                <Text>{data.day}</Text>
              </View>
              <View style={styles.timeView}>
                <Image style={styles.clockIcon} source={icon.ICON_LOCATION} />
                <Text>{data.venue}, </Text>
              </View>
              <Text style={styles.regionText}>{data.region}</Text>
              <View style={styles.addressView}>
                <Text style={styles.addressText}>{data.address},</Text>
              </View>
              <View style={styles.timeView}>
                <Image style={styles.clockIcon} source={icon.ICON_MIC} />
                <Text>About The Mic</Text>
              </View>
              <View style={styles.addressView}>
                <Text style={styles.aboutMicText}>{data.about}</Text>
              </View>
              <View style={styles.buttonsMainView}>
                <View style={styles.editButtonView}>
                  <TouchableOpacity>
                    <Text
                      style={
                        currentTab === 0
                          ? styles.unPublishButtonText
                          : styles.publishButtonText
                      }>
                      {currentTab === 0 ? 'Unpublish' : 'Publish'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* <View style={styles.editButtonView}>
                  <TouchableOpacity>
                    <Text style={styles.editButtonText}>Edit mic</Text>
                  </TouchableOpacity>
                </View> */}
                <View style={styles.editButtonView}>
                  <TouchableOpacity
                    onPress={() =>
                      Alert.alert(
                        'Delete Mic',
                        'Are you sure you want to delete mic?',
                        [
                          {text: 'Cancel', onPress: () => console.log()},
                          {text: 'Delete', onPress: () => console.log()},
                        ],
                      )
                    }>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}

let styles = StyleSheet.create({
  micFirstView: {
    margin: 20,
    backgroundColor: colors.WHITE,
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
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  clockIcon: {
    width: 20,
    height: 20,
    marginEnd: 10,
  },
  regionText: {
    marginStart: 50,
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
  buttonsMainView: {
    flexDirection: 'row',
  },
  editButtonView: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.BG_GRAY,
    flex: 1,
  },
  publishButtonText: {
    fontSize: RFPercentage(2),
    textAlign: 'center',
    margin: 25,
    color: colors.MIC_NAME,
  },
  unPublishButtonText: {
    fontSize: RFPercentage(2),
    textAlign: 'center',
    marginStart: 10,
    marginEnd: 10,
    marginTop: 25,
    marginBottom: 25,
    color: colors.MIC_NAME,
  },
  editButtonText: {
    fontSize: RFPercentage(2),
    textAlign: 'center',
    margin: 25,
  },
  deleteButtonText: {
    fontSize: RFPercentage(2),
    textAlign: 'center',
    margin: 25,
    color: colors.TORCH_RED,
  },
});
export default MyMic;
