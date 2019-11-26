import React, {PureComponent} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {icon} from '../../resource/icons';
import colors from '../../resource/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import ParticipantDetailsModal from './ParticipantDetailsModal';

class IntrestedToParticipate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      participant: [
        {
          id: 0,
          name: 'Krupal Shah',
          comment: 'Test comment',
          date: '11/07/2019',
          time: '17:24',
        },
        {
          id: 0,
          name: 'Chetan Prajapati',
          comment: 'Test comment',
          date: '14/07/2019',
          time: '18:24',
        },
      ],
    };
    this.renderModal = this.renderModal.bind(this);
  }

  renderModal() {
    this.setState({showModal: !this.state.showModal});
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.participant}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.borderBoxView}>
              <TouchableOpacity onPress={this.renderModal}>
                <View style={styles.rowView}>
                  <View style={styles.imageView}>
                    <Image source={icon.PROFILE_DEFAULT} />
                  </View>
                  <View style={styles.contactMainView}>
                    <View>
                      <Text style={styles.nameText}>{item.name}</Text>
                    </View>
                    <View style={styles.rowView}>
                      <View>
                        <Text style={styles.commentText} numberOfLines={1}>
                          {item.comment}
                        </Text>
                      </View>
                      <View style={styles.contactView}>
                        <Text style={styles.contactText}>Contact</Text>
                      </View>
                    </View>
                    <View style={styles.borderLine} />
                    <View style={styles.rowView}>
                      <View>
                        <Text style={styles.commentText} numberOfLines={1}>
                          {item.date}
                        </Text>
                      </View>
                      <View style={styles.contactView}>
                        <Text style={styles.contactText}>{item.time} pm</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
        <ParticipantDetailsModal
          modalVisible={this.state.showModal}
          toggleModal={this.renderModal}
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  borderBoxView: {
    margin: 20,
    borderWidth: 1,
    borderColor: colors.BG_GRAY,
    backgroundColor: colors.WHITE,
  },
  rowView: {
    flexDirection: 'row',
  },
  imageView: {
    marginStart: 20,
    marginTop: 20,
    marginBottom: 20,
    flex: 1,
    // backgroundColor: 'red',
  },
  contactMainView: {
    marginEnd: 20,
    marginTop: 20,
    marginBottom: 20,
    // backgroundColor: 'yellow',
    flex: 2,
  },
  nameText: {
    fontSize: RFPercentage(3),
    color: colors.MIC_NAME,
    marginBottom: 10,
  },
  contactView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    //backgroundColor: 'red',
    flex: 1,
  },
  commentText: {
    fontSize: RFPercentage(2),
    color: colors.BTN_TAB_GRAY,
    overflow: 'hidden',
    maxWidth: widthPercentageToDP(30),
  },
  contactText: {
    fontSize: RFPercentage(2),
    color: colors.GREEN,
  },
  borderLine: {
    borderWidth: 1,
    borderColor: colors.BG_GRAY,
    marginTop: 10,
    marginBottom: 10,
  },
});
export default IntrestedToParticipate;
