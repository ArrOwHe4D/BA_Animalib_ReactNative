import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View, Dimensions, Switch, GestureResponderEvent, Button, PermissionsAndroid } from "react-native";
import DeviceInfo from 'react-native-device-info';
import CustomCardView from "../components/CustomCardView";
import { gyroscope, barometer, accelerometer, magnetometer, setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
import { RNCamera } from 'react-native-camera';
import { useCamera } from "react-native-camera-hooks";
import GeoLocation from 'react-native-geolocation-service';
import Toast from 'react-native-toast-message';
import Geocoder from 'react-native-geocoding';
import { launchCamera } from "react-native-image-picker";
import CompassHeading from 'react-native-compass-heading';
import Stopwatch from '../utils/Stopwatch';

setUpdateIntervalForType(SensorTypes.gyroscope, 20);
setUpdateIntervalForType(SensorTypes.barometer, 20);
setUpdateIntervalForType(SensorTypes.accelerometer, 20);
setUpdateIntervalForType(SensorTypes.magnetometer, 20);

const GEOCODING_API_KEY = ''; //In order to make the geocoding api work, you need to generate an API_KEY described at https://developers.google.com/maps/documentation/geocoding/get-api-key?hl=en 

const SettingsPage = () => 
{
  Geocoder.init(GEOCODING_API_KEY);

  function showToast(type: string, primaryText: string, secondaryText: string, duration: number)
  {
    Toast.show({type: type, text1: primaryText, text2: secondaryText, autoHide: true, visibilityTime: duration, position: 'bottom', bottomOffset: 50});
  }

  //Battery Info 
  const batteryChargeLevel = DeviceInfo.getBatteryLevelSync() * 100;  
  const powerState = DeviceInfo.getPowerStateSync();

  //Camera
  const [{ cameraRef }] = useCamera();
  const [flashlightActive, setFlashlightActive] = useState(false);

  //Sensors  
  let gyroscopeSubscription: any;
  const [gyroscopeActive, setGyroscopeActive] = useState(false);
  const [gyroscopeX, setGyroscopeX] = useState(0);
  const [gyroscopeY, setGyroscopeY] = useState(0);
  const [gyroscopeZ, setGyroscopeZ] = useState(0);  
  
  let barometerSubscription: any;
  const [barometerActive, setBarometerActive] = useState(false);
  const [barometerValue, setBarometerValue] = useState(0);
    
  let accelerometerSubscription: any;
  const [accelerometerActive, setAccelerometerActive] = useState(false);
  const [accelerometerX, setAccelerometerX] = useState(0);
  const [accelerometerY, setAccelerometerY] = useState(0);
  const [accelerometerZ, setAccelerometerZ] = useState(0);
      
  let magnetometerSubscription: any;
  const [magnetometerActive, setMagnetometerActive] = useState(false);
  const [magnetometerX, setMagnetometerX] = useState(0);
  const [magnetometerY, setMagnetometerY] = useState(0);
  const [magnetometerZ, setMagnetometerZ] = useState(0);
    
  const [compassReading, setCompassReading] = useState('');

  //Location
  const [currentLocationLatitude, setCurrentLocationLatitude] = useState(0);
  const [currentLocationLongitude, setCurrentLocationLongitude] = useState(0);

  const [locationByAddressLatitude, setLocationByAddressLatitude] = useState(0);
  const [locationByAddressLongitude, setLocationByAddressLongitude] = useState(0);

  const [addressByLocationString, setAddressByLocationString] = useState(''); 

  const takePicture = async () =>
  {
    const stopwatch = new Stopwatch();
    stopwatch.start();
    
    await launchCamera({ mediaType: "photo" });

    stopwatch.stop();

    showToast('success' ,'Task completed!', `Time: ${stopwatch.getElapsedTimeInMilliseconds()} ms`, 2000);
  }

  const toggleFlashlight = () => 
  {    
    setFlashlightActive(!flashlightActive);
  }

  const getCurrentLocation = async() => 
  {
    const locationAccessPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, 
    { 
      title: 'Location Access required', 
      message: 'This App needs to Access your current location!', 
      buttonPositive: 'OK', buttonNegative: 'Deny' 
    });

    if (locationAccessPermission === PermissionsAndroid.RESULTS.GRANTED)
    {
      GeoLocation.getCurrentPosition((position) => 
      {
        setCurrentLocationLatitude(position.coords.latitude);
        setCurrentLocationLongitude(position.coords.longitude);        
      },
      (error) => 
      {        
        showToast("error", 'Location Error', error.message, 2000);
      });      
    }
    else 
    {
      showToast('error' ,'Location Access not granted!', 'You need to grant Location Access permissions to this app!', 2000);
    }
  }

  const getLocationByAddress = (event: GestureResponderEvent, address: string) =>
  {
    Geocoder.from(address)
      .then(response => 
      { 
        const { lat, lng } = response.results[0].geometry.location; 
        setLocationByAddressLatitude(lat);
        setLocationByAddressLongitude(lng);      
      })
      .catch(error => showToast('error', 'Geocoding Error', error.message, 2000));
  }

  const getAddressByLocation = (event: GestureResponderEvent, latitude: number, longitude: number) =>
  {
    Geocoder.from(latitude, longitude)
    .then(response => 
    { 
      const address = response.results[0].formatted_address; 
      setAddressByLocationString(address);     
    })
    .catch(error => showToast('error', 'Geocoding Error', error.message, 2000));
  }

  function toggleGyroscope(): void | Promise<void> 
  {
    setGyroscopeActive(!gyroscopeActive);

    if (gyroscopeActive)
    {
      gyroscopeSubscription = gyroscope.subscribe(({ x, y, z }) => 
      {      
        setGyroscopeX(x);
        setGyroscopeY(y);
        setGyroscopeZ(z);
      });    
    }
    else
    {
      gyroscopeSubscription.unsubscribe();
      gyroscopeSubscription.remove();
    }
  }

  function toggleBarometer(): void | Promise<void> 
  {
    setBarometerActive(!barometerActive);

    if (barometerActive)
    {
      barometerSubscription = barometer.subscribe(({ pressure }) => 
      {      
        setBarometerValue(pressure);
      });
    }    
    else
    {
      barometerSubscription.unsubscribe();
      barometerSubscription.remove();
    }    
  }

  function toggleAccelerometer(): void | Promise<void> 
  {               
    setAccelerometerActive(!accelerometerActive);        
    
    if (accelerometerActive)
    {
      accelerometerSubscription = accelerometer.subscribe(({ x, y, z }) => 
      {      
        setAccelerometerX(x);
        setAccelerometerY(y);
        setAccelerometerZ(z);
      });      
    }
    else 
    {
      accelerometerSubscription.unsubscribe(); 
      magnetometerSubscription.remove();           
    }
  }

  function toggleMagnetometer(): void | Promise<void> 
  {
    setMagnetometerActive(!magnetometerActive);

    if (magnetometerActive)
    {
      magnetometerSubscription = magnetometer.subscribe(({ x, y, z }) => 
      {      
        setMagnetometerX(x);
        setMagnetometerY(y);
        setMagnetometerZ(z);
      });
    }
    else
    {
      magnetometerSubscription.unsubscribe();
      magnetometerSubscription.remove();
    }
  }

  function readCompass(): void | Promise<void> 
  {
    const degree_update_rate = 3;

    CompassHeading.start(degree_update_rate, ({heading, accuracy}) => 
    {
      console.log('Heading: ', heading);
      console.log('Accuracy: ', accuracy);
      setCompassReading(heading as string + accuracy as string);
    })
    .catch((error) => { showToast('error', 'Compass Error', error.message, 2000); });
  }

  return (  
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../images/icon_title_settings.png')} style={{width: 40, height: 40}}/>
        <Text style={styles.headerTitle}>Settings</Text>        
      </View> 

      <CustomCardView height={Dimensions.get('window').height * 0.82} backgroundColor="#303030" displayChildrenAsRow={false} childrenAlignment={'flex-start'}>      
          <ScrollView>
            <View style={{alignItems: 'flex-start'}}>              
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../images/icon_battery.png')}
                  style={{width: 40, height: 40}}
                />
                <Text style={{fontSize: 24, color: '#10D180', marginLeft: 10}}>Battery Info</Text>
              </View>         
              <Text style={styles.textNormal}>Battery Percentage: {batteryChargeLevel}%</Text>  
              <Text style={styles.textNormal}>Battery Status: {powerState.batteryState}</Text>  
              <Text style={styles.textNormal}>Power Source: <Text style={styles.textUnavailable}>N/A</Text></Text>  

              <View style={{marginTop: 10}} />   
                            
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../images/icon_screen.png')}
                  style={{width: 40, height: 40}}
                />
                <Text style={{fontSize: 24, color: '#10D180', marginLeft: 10}}>Display Info</Text>
              </View>           
              <Text style={styles.textNormal}>Width: {Dimensions.get('window').width} Pixels</Text>  
              <Text style={styles.textNormal}>Height: {Dimensions.get('window').height} Pixels</Text>
              <Text style={styles.textNormal}>Orientation: <Text style={styles.textUnavailable}>N/A</Text></Text> 
              <Text style={styles.textNormal}>Rotation: <Text style={styles.textUnavailable}>N/A</Text></Text>  
              <Text style={styles.textNormal}>Refresh Rate: <Text style={styles.textUnavailable}>N/A</Text></Text> 

              <View style={{marginTop: 10}} />

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../images/icon_device.png')}
                  style={{width: 40, height: 40}}
                />
                <Text style={{fontSize: 24, color: '#10D180', marginLeft: 10}}>Device Info</Text>
              </View>           
              <Text style={styles.textNormal}>Platform: {DeviceInfo.getSystemName()}</Text>  
              <Text style={styles.textNormal}>OS Version: {DeviceInfo.getSystemVersion()}</Text> 
              <Text style={styles.textNormal}>Type: {DeviceInfo.getDeviceType()}</Text>
              <Text style={styles.textNormal}>Idiom: <Text style={styles.textUnavailable}>N/A</Text></Text>
              <Text style={styles.textNormal}>Model: {DeviceInfo.getModel()}</Text>  
              <Text style={styles.textNormal}>Manufacturer: {DeviceInfo.getManufacturerSync()}</Text> 
              <Text style={styles.textNormal}>Name: {DeviceInfo.getDeviceNameSync()}</Text> 

              <View style={{marginTop: 10}} />  

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('../images/icon_camera.png')} style={{width: 40, height: 40}}/>
                <Text style={{fontSize: 24, color: '#10D180', marginLeft: 10}}>Camera</Text>
              </View>   
              <RNCamera ref={cameraRef} type={RNCamera.Constants.Type.back} /*flashMode={flashlightActive ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}*/ />              
              <View style={{marginTop: 10}} />     
              <Button title="Take Picture" color="#10D180" onPress={takePicture} />   
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.textNormal}>Flashlight: </Text>
                <Switch style={styles.switch} value={flashlightActive} onValueChange={toggleFlashlight} />
              </View>

              <View style={{marginTop: 10}} />   

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../images/icon_title_regions.png')}
                  style={{width: 40, height: 40}}
                />
                <Text style={{fontSize: 24, color: '#10D180', marginLeft: 10}}>Location</Text>
              </View>           
              <Text style={styles.textNormal}>Current Location Lat: {currentLocationLatitude}</Text>  
              <Text style={styles.textNormal}>Current Location Lon: {currentLocationLongitude}</Text>  
              <View style={{marginTop: 10}} />  
              <Button title="Get Current Location" color="#10D180" onPress={getCurrentLocation}></Button> 
              <Text style={styles.textNormal}>Address: Steinmüllerallee 1, 51643 Gummersbach</Text>
              <Text style={styles.textNormal}>Latitude: {locationByAddressLatitude}</Text>  
              <Text style={styles.textNormal}>Longitude: {locationByAddressLongitude}</Text>  
              <View style={{marginTop: 10}} />  
              <Button title="Get TH-Köln Location" color="#10D180" onPress={(event) => getLocationByAddress(event, 'Steinmüllerallee 1, 51643 Gummersbach')}></Button> 
              <Text style={styles.textNormal}>Address Location: (Lon: 7.5618184, Lat: 51.0230325)           </Text>
              <Text style={styles.textNormal}>Address: {addressByLocationString}</Text>   
              <View style={{marginTop: 10}} />  
              <Button title="Get TH-Köln Location" color="#10D180" onPress={(event) => getAddressByLocation(event, 51.0230325, 7.5618184)}></Button>  

              <View style={{marginTop: 10}} />  

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('../images/icon_sensors.png')} style={{width: 40, height: 40}}/>
                <Text style={{fontSize: 24, color: '#10D180', marginLeft: 10}}>Sensors</Text>
              </View>      
              <Text style={styles.textNormal}>Gyroscope:</Text>                 
                <Text style={styles.textSensorValues}>X: {gyroscopeX}, Y: {gyroscopeY}, Z: {gyroscopeZ}</Text>
                <Switch style={styles.switch} value={gyroscopeActive} onValueChange={toggleGyroscope} />              
              <Text style={styles.textNormal}>Barometer:</Text>                 
                <Text style={styles.textSensorValues}>{barometerValue} hPa</Text>
                <Switch style={styles.switch} value={barometerActive} onValueChange={toggleBarometer} />              
              <Text style={styles.textNormal}>Accelerometer:</Text>                 
                <Text style={styles.textSensorValues}>X: {accelerometerX}, Y: {accelerometerY}, Z: {accelerometerZ}</Text>
                <Switch style={styles.switch} value={accelerometerActive} onValueChange={toggleAccelerometer} />              
              <Text style={styles.textNormal}>Magnetometer:</Text>                 
                <Text style={styles.textSensorValues}>X: {magnetometerX}, Y: {magnetometerY}, Z: {magnetometerZ}</Text>
                <Switch style={styles.switch} value={magnetometerActive} onValueChange={toggleMagnetometer} />              
              <Text style={styles.textNormal}>Compass:</Text>   
                <Text style={styles.textSensorValues}>{compassReading}</Text>                
                <View style={{marginTop: 10}} />
                <Button title="Read Compass" color="#10D180" onPress={readCompass}></Button>  
            </View>
          </ScrollView>      
      </CustomCardView>
      <Toast/>
    </View>
  ); 
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    width: 100,
    height: 50,    
    borderRadius: 20,
  },
  switch: {
    marginTop: 10
  },
  container: {
    flex: 1,    
    backgroundColor: 'black',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  textNormal: {
    fontSize: 14,
    color: 'white',
    marginTop: 10,    
  },
  textUnavailable: {
    fontSize: 14,
    color: 'red',
    marginTop: 10
  },
  textSensorValues: {
    fontSize: 14,
    color: '#10D180',
    marginTop: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',  
    justifyContent: 'center',  
    marginBottom: 10,
    marginLeft: 20,
  },
  headerTitle: {
    fontSize: 40,
    color: 'white',
    marginLeft: 5,
  }
});

export default SettingsPage;