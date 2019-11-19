import React, {PureComponent} from 'react';
import {View, Image, TouchableOpacity, Button, Text, ScrollView} from 'react-native';
import {styles} from './styles';
//images
import micLogo from '../../assets/images/logoMain.png';
import toggleMenu from '../../assets/images/openMic/icon/menu-white.png';

//sidemenu
import SideMenu from 'react-native-side-menu';
//menu
import MainMenu from '../../components/menu/SideMenu';
import strings from '../../resource/string';
import {icon} from '../../resource/icons';
import RegionModal from './RegionModal';
import FilterModal from './FilterModal';

class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      modalVisible: false,
      filterModalVisible: false,
      vieWDays: false,
      days: [
        {id: 0, day: 'Saturday', selected: true},
        {id: 1, day: 'Sunday', selected: false},
        {id: 2, day: 'Monday', selected: false},
        {id: 3, day: 'Tuesday', selected: false},
        {id: 4, day: 'Wednesday', selected: false},
        {id: 5, day: 'Thursday', selected: false},
        {id: 6, day: 'Friday', selected: false},
      ],
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  toggleMenu() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({isOpen});
  }

  handleLogin() {
    this.props.navigation.replace('LOGIN');
  }

  handleSignup() {
    this.props.navigation.replace('SIGNUP');
  }

  toggleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };

  filterToggleModal = () => {
    this.setState({filterModalVisible: !this.state.filterModalVisible});
  };

  handleDayNavigation = (item) => {
    console.log('item', item)
    let days = [...this.state.days];
    days.map((data) => {
      if (data.id === item.id) {
         data.selected = true;
      } else {
         data.selected = false;
      }
      return;
    });
    this.setState({ days: days });
  }

  handleViewDays = () => {
  this.setState({ vieWDays: !this.state.vieWDays}, () => {
    if (this.state.vieWDays === false) {
      let days = [...this.state.days];
      days.map((data) => {
        if (data.id === 0) {
          data.selected = true
        } else {
          data.selected = false
        }
        return;
      });
      this.setState({ days: days });
    }
  });
  }

  render() {
    const menu = (
      <MainMenu
        navigator={this.props.navigation}
        onPress={this.toggleMenu}
        buttonLabel={strings.LOGIN}
        onMethodPress={this.handleLogin}
        onMethodPressTwo={this.handleSignup}
        buttonLabelTwo={strings.SIGNUP}
      />
    );
    return (
      <SideMenu
        menu={this.state.isOpen && menu}
        isOpen={this.state.isOpen}
        menuPosition="right"
        onChange={isOpen => this.updateMenuState(isOpen)}>
        <View style={styles.container}>
          <View style={styles.rowCenter}>
            <View style={styles.imageView}>
              <Image source={micLogo} />
            </View>
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={this.toggleMenu}>
              <Image source={toggleMenu} />
            </TouchableOpacity>
          </View>
          <View style={styles.theaterView}>
            <Image style={styles.theaterLogo} source={icon.THEATER} />
          </View>
          <View style={styles.filterButton}>
            <TouchableOpacity
              style={styles.regionView}
              onPress={this.toggleModal}>
              <View style={styles.boxMain}>
                <View style={styles.boxView}>
                  <Text style={styles.regionValueText}>
                    Bridgeport Gloucester
                  </Text>
                </View>
                <Text style={styles.regionText}>{strings.BTN_REGION}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterView}
              onPress={this.filterToggleModal}>
              <View style={styles.filterViewBox}>
                <Text style={styles.filterText}>{strings.BTN_FILTER}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.tabButtonMainView}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator = {false}> 
          {this.state.days.map((data, index) => {
            if (this.state.vieWDays === false) {
              if (data.id <= 1) {
                return  <View key={data.id}  style={[styles.buttonView, data.selected? styles.bActive : styles.bInactive]}>
              <TouchableOpacity onPress={() => this.handleDayNavigation(data)}>
                <Text style={[styles.tabButtonText, data.selected? styles.active:styles.inactive]}>{data.day}</Text>
              </TouchableOpacity>
            </View>
              } 
            } else {
              return  <View key={data.id}   style={[styles.buttonView, data.selected? styles.bActive : styles.bInactive]}>
              <TouchableOpacity onPress={() => this.handleDayNavigation(data)}>
                <Text style={[styles.tabButtonText, data.selected? styles.active:styles.inactive]}>{data.day}</Text>
              </TouchableOpacity>
            </View>
            }
              
          })}
          </ScrollView>
          </View>
          <View style={styles.weekDaysView}>
          <View style={styles.btn_View}>
            <TouchableOpacity onPress={this.handleViewDays}>
              <Text style={styles.weekDaysText}>{this.state.vieWDays? strings.HIDE_WEEK_DAYS:strings.WEEK_DAYS}</Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
        <RegionModal
          modalVisible={this.state.modalVisible}
          toggleModal={this.toggleModal}
        />
        <FilterModal
          modalVisible={this.state.filterModalVisible}
          toggleModal={this.filterToggleModal}
        />
        {this.state.modalVisible && <View style={styles.overlay} />}
      </SideMenu>
    );
  }
}

export default HomeScreen;
