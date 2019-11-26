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
class Mic extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      micData: [],
    }
  }
  
  componentDidMount() {
    const {micData} = this.props;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.micData !== this.props.micData) {
      this.setState({micData: this.props.micData});
    }
  } 

  render() {
    return (
      <View>
        {this.state.micData.length > 0 ?
        <FlatList
          data={this.state.micData}
          keyExtractor={(data, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('MIC', {micData: this.state.micData})}>
              <View style={styles.micFirstView}>
                <View style={styles.micSecondView}>
                  <View style={styles.micImageView}>
                    <Image
                      style={styles.micImage}
                      source={item.poster_image !== null? {uri:item.poster_image} : icon.DEFAULT_MIC}
                      resizeMode="contain"
                    />
                  </View>
                </View>
                <Text style={styles.micNameText}>{item.mic_name}</Text>
                <View style={styles.timeView}>
                  <Image style={styles.clockIcon} source={icon.ICON_CLOCK} />
                  <Text>{item.mic_time} PM, </Text>
                  <Text>{item.mic_day_name}</Text>
                </View>
                <View style={styles.timeView}>
                  <Image style={styles.clockIcon} source={icon.ICON_LOCATION} />
                  <Text>{item.mic_venue}, </Text>
                </View>
                <Text style={styles.regionText}>{item.region.region}</Text>
                <View style={styles.addressView}>
                  <Text style={styles.addressText}>{item.address}</Text>
                </View>
                <View style={styles.timeView}>
                  <Image style={styles.clockIcon} source={icon.ICON_MIC} />
                  <Text>About The Mic</Text>
                </View>
                <View style={styles.addressView}>
                  <Text style={styles.aboutMicText}>{item.about_mic}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        : <View style={styles.noEventFound}>
          <Text style={styles.noEventText}>No Event Found..!</Text>
          </View>}
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
    flex: 1,
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
  regionText: {
    marginStart: 50,
  },
  noEventFound: {
    margin: 20,
  },
  noEventText: {
    fontSize: RFPercentage(3),
    color: colors.GRAY_DARK_TEXT,
  },
});
export default Mic;
