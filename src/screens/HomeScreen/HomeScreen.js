import React, {PureComponent} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Button,
  Text,
  ScrollView,
} from 'react-native';
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
import colors from '../../resource/colors';
import Mic from '../../components/mic/Mic';
import AsyncStorage from '@react-native-community/async-storage';

class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      modalVisible: false,
      filterModalVisible: false,
      vieWDays: false,
      isAuthenticate: false,
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
    this.handleLogout = this.handleLogout.bind(this);
    this.handleDashboard = this.handleDashboard.bind(this);
  }

  componentDidMount() {
    this.checkAuth();
  }

  checkAuth() {
    AsyncStorage.getItem('user').then(data => {
      if (data) {
        if (data.token !== '') {
          this.setState({isAuthenticate: true});
        } else {
          this.setState({isAuthenticate: false});
        }
      } else {
        this.setState({isAuthenticate: false});
      }
    });
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

  handleLogout() {
    this.setState({isAuthenticate: false});
    AsyncStorage.clear();
  }

  handleSignup() {
    this.props.navigation.replace('SIGNUP');
  }

  handleDashboard() {
    this.props.navigation.replace('DashBoard');
  }

  toggleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };

  filterToggleModal = () => {
    this.setState({filterModalVisible: !this.state.filterModalVisible});
  };

  handleDayNavigation = item => {
    console.log('item', item);
    let days = [...this.state.days];
    days.map(data => {
      if (data.id === item.id) {
        data.selected = true;
      } else {
        data.selected = false;
      }
      return;
    });
    this.setState({days: days});
  };

  handleViewDays = () => {
    this.setState({vieWDays: !this.state.vieWDays}, () => {
      if (this.state.vieWDays === false) {
        let days = [...this.state.days];
        days.map(data => {
          if (data.id === 0) {
            data.selected = true;
          } else {
            data.selected = false;
          }
          return;
        });
        this.setState({days: days});
      }
    });
  };

  render() {
    var menu;
    if (this.state.isAuthenticate === false) {
      menu = (
        <MainMenu
          navigator={this.props.navigation}
          onPress={this.toggleMenu}
          buttonLabel={strings.LOGIN}
          onMethodPress={this.handleLogin}
          onMethodPressTwo={this.handleSignup}
          buttonLabelTwo={strings.SIGNUP}
        />
      );
    } else {
      menu = (
        <MainMenu
          navigator={this.props.navigation}
          onPress={this.toggleMenu}
          buttonLabelTwo={strings.LOGOUT}
          onMethodPressTwo={this.handleLogout}
          onMethodPress={this.handleDashboard}
          buttonLabel={strings.DASHBOARD}
        />
      );
    }

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
          <ScrollView>
            <View style={{backgroundColor: colors.BG_MAIN, flex: 1}}>
              <View style={styles.tabButtonMainView}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {this.state.days.map((data, index) => {
                    if (this.state.vieWDays === false) {
                      if (data.id <= 1) {
                        return (
                          <TouchableOpacity
                            key={data.id}
                            onPress={() => this.handleDayNavigation(data)}>
                            <View
                              style={[
                                styles.buttonView,
                                data.selected
                                  ? styles.bActive
                                  : styles.bInactive,
                              ]}>
                              <Text
                                style={[
                                  styles.tabButtonText,
                                  data.selected
                                    ? styles.active
                                    : styles.inactive,
                                ]}>
                                {data.day}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      }
                    } else {
                      return (
                        <TouchableOpacity
                          key={data.id}
                          onPress={() => this.handleDayNavigation(data)}>
                          <View
                            style={[
                              styles.buttonView,
                              data.selected ? styles.bActive : styles.bInactive,
                            ]}>
                            <Text
                              style={[
                                styles.tabButtonText,
                                data.selected ? styles.active : styles.inactive,
                              ]}>
                              {data.day}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }
                  })}
                </ScrollView>
              </View>
              <View style={styles.weekDaysView}>
                <View style={styles.btn_View}>
                  <TouchableOpacity onPress={this.handleViewDays}>
                    <Text style={styles.weekDaysText}>
                      {this.state.vieWDays
                        ? strings.HIDE_WEEK_DAYS
                        : strings.WEEK_DAYS}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Mic />
            </View>
          </ScrollView>
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
