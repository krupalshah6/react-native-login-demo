import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Image,
  TouchableOpacity,
  Button,
  Text,
  ScrollView,
} from 'react-native';
import {styles} from './styles';
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
import {getRequest, getRequestWithParams} from '../../network/APIRequest';
import ApiUrls from '../../network/APIUrl';
import {showMessage} from '../../resource/validationRules';
import NetInfo from '@react-native-community/netinfo';
import {getRegion, setCurrentRegion, getFeesType} from '../../redux/actions/basicActions';
import {setMicData} from '../../redux/actions/micActions';
import {dispatch} from '../../redux/store';
import {BarIndicator} from 'react-native-indicators';

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
      region: [],
      feesType: [],
      defaultRegion: {},
      filterData: {},
      micData: [],
      loader: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleDashboard = this.handleDashboard.bind(this);
  }

  componentDidMount() {
    var dayIndex;
    this.state.days.map((data, index) => {
      if (data.selected === true) {
        dayIndex = data.id;
      };
    });
      const dayValue = {
      0:'6',
      1:'7',
      2:'1',
      3:'2',
      4:'3',
      5:'4',
      6:'5',
    };

   const day_filter = parseInt(dayValue[dayIndex]);
   const region_filter = 1;
   const fees_filter = '';
   const featured_filter = false;
   const search_filter = '';
   const category_filter = '';
   const page = 1;
    this.checkAuth();
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );

    NetInfo.isConnected.fetch().done(isConnected => {
      if (isConnected === true) {
        this.getRegionData();
        this.getMicFeesType();
        this.getMicWithFilter(day_filter, region_filter, fees_filter, featured_filter, search_filter, category_filter, page);
        this.setState({isConnected: true});
      } else {
        this.setState({isConnected: false});
      }
    });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );
  }

  componentDidUpdate(preProps) {
    if (preProps.defaultRegion !== this.props.defaultRegion) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({defaultRegion: this.props.defaultRegion}, () => {
        console.log('default region', this.state.defaultRegion)
        var dayIndex;
        this.state.days.map((data, index) => {
          if (data.selected === true) {
            dayIndex = data.id;
          };
        });
          const dayValue = {
          0:'6',
          1:'7',
          2:'1',
          3:'2',
          4:'3',
          5:'4',
          6:'5',
        };
    
       const day_filter = parseInt(dayValue[dayIndex]);
       const region_filter = this.state.defaultRegion.id;
       const fees_filter = '';
       const featured_filter = false;
       const search_filter = '';
       const category_filter = '';
       const page = 1;
       this.setState({ loader: true});
       this.getMicWithFilter(day_filter, region_filter, fees_filter, featured_filter, search_filter, category_filter, page);
      });
    }
    if (preProps.filterData !== this.props.filterData) {
      this.setState({filterData: this.props.filterData}, () => {
        console.log('filter data', this.state.filterData)
        var dayIndex;
        this.state.days.map((data, index) => {
          if (data.selected === true) {
            dayIndex = data.id;
          };
        });
          const dayValue = {
          0:'6',
          1:'7',
          2:'1',
          3:'2',
          4:'3',
          5:'4',
          6:'5',
        };
    
       const day_filter = parseInt(dayValue[dayIndex]);
       const region_filter = this.state.defaultRegion.id;
       const fees_filter = this.state.filterData.feesType.key;
       const featured_filter = false;
       const search_filter = this.state.filterData.searchKeyword;
       const category_filter = '';
       const page = 1;
       this.setState({ loader: true});
       this.getMicWithFilter(day_filter, region_filter, fees_filter, featured_filter, search_filter, category_filter, page);

      });
    }
  } 

  _handleConnectivityChange = isConnected => {
    if (isConnected === true) {
      this.setState({isConnected: true});
    } else {
      this.setState({isConnected: false});
    }
  };

  async getRegionData() {
    if (!this.state.isConnected) {
      showMessage(strings.NO_INTERNET_CONNECTION);
      return;
    }
    const result = await getRequest(ApiUrls.GET_REGION);
    if (result.code === 200 && result.status === true) {
      const currentRegion = {
        id: result.data[0].id,
        name: result.data[0].region,
        image: result.data[0].region_image,
      };
      dispatch(getRegion(result.data));
      dispatch(setCurrentRegion(currentRegion));
      this.setState({region: result.data, defaultRegion: currentRegion});
    } else if (result.code === 200 && result.status === false) {
      showMessage(result.message);
    }
  }

  async getMicFeesType() {
    if (!this.state.isConnected) {
      showMessage(strings.NO_INTERNET_CONNECTION);
      return;
    }
    const result = await getRequest(ApiUrls.GET_FEES);
    if (result.code === 200 && result.status === true) {
      this.setState({feesType:result.data});
      dispatch(getFeesType(result.data));
    }
  }

  async getMicWithFilter(day_filter, region_filter, fees_filter, featured_filter, search_filter, category_filter, page) {
    if (!this.state.isConnected) {
      showMessage(strings.NO_INTERNET_CONNECTION);
      return;
    }

    const params = {
      region_filter:region_filter,
      fees_filter:fees_filter,
      featured_filter:featured_filter,
      day_filter:day_filter,
      search_filter:search_filter,
      category_filter:category_filter,
      page:page
    }
    let urlParameters = Object.entries(params)
        .map(e => e.join("="))
        .join("&");
    console.log('url', ApiUrls.GET_MIC_WITH_FILTER + '?' + urlParameters)
    const result = await getRequestWithParams(ApiUrls.GET_MIC_WITH_FILTER + '?' + urlParameters);
    if (result.code === 200 && result.status === true) {
      setTimeout(() => {
        this.setState({ loader: false });
      }, 1000);
      dispatch(setMicData(result.data));
      this.setState({micData: result.data});
    } else if(result.code === 200 && result.status === false) {
      showMessage(result.message);
    }
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
    let days = [...this.state.days];
    days.map(data => {
      if (data.id === item.id) {
        data.selected = true;
      } else {
        data.selected = false;
      }
      return;
    });
    this.setState({days: days}, () => {
      var dayIndex;
        this.state.days.map((data, index) => {
          if (data.selected === true) {
            dayIndex = data.id;
          };
        });
          const dayValue = {
          0:'6',
          1:'7',
          2:'1',
          3:'2',
          4:'3',
          5:'4',
          6:'5',
        };
    
       const day_filter = parseInt(dayValue[dayIndex]);
       const region_filter = this.state.defaultRegion.id;
       const fees_filter = '';
       const featured_filter = false;
       const search_filter = '';
       const category_filter = '';
       const page = 1;
       this.setState({ loader: true});
       this.getMicWithFilter(day_filter, region_filter, fees_filter, featured_filter, search_filter, category_filter, page);
    });
  };

  handleViewDays = () => {
    this.scrollRef.scrollTo({x: 0, animated: true});
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
              <Image
                style={styles.imageLogo}
                source={icon.LOGOMAIN}
                resizeMode="contain"
              />
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
                    {this.state.defaultRegion.name}
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
                  showsHorizontalScrollIndicator={false}
                  ref={ref => (this.scrollRef = ref)}>
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
              <Mic navigation={this.props.navigation} micData={this.state.micData} />
            </View>
          </ScrollView>
        </View>
        <RegionModal
          modalVisible={this.state.modalVisible}
          toggleModal={this.toggleModal}
          region={this.state.region}
        />
        <FilterModal
          modalVisible={this.state.filterModalVisible}
          toggleModal={this.filterToggleModal}
          feesType={this.state.feesType}
        />
        {this.state.modalVisible && <View style={styles.overlay} />}
        {this.state.loader === true &&
        <View style={styles.overlay}>
          <BarIndicator color='white' count={5}/>
        </View>
        } 
      </SideMenu>
    );
  }
}

const mapStateToProps = state => ({
  defaultRegion: state.basicReducers.defaultRegion,
  filterData: state.basicReducers.filterData,
});
export default connect(
  mapStateToProps,
  null,
)(HomeScreen);
