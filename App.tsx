import { StatusBar, StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomePage from './pages/HomePage';
import AnimalsStack from './pages/AnimalsPage';
import SpeciesPage from './pages/SpeciesPage';
import RegionsPage from './pages/RegionsPage';
import SettingsPage from './pages/SettingsPage';

const App = () =>
{  
  const Tab = createBottomTabNavigator();

  return (    
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#10D180'} />  
        <Tab.Navigator initialRouteName="Home" 
                       screenOptions={{headerShown: false, tabBarActiveTintColor: "#10D180", tabBarInactiveTintColor: "white", tabBarStyle: {backgroundColor:'#303030', height: 60, borderTopWidth: 0}}}>
          <Tab.Screen name="Home" 
                      component={HomePage} 
                      options={({ route }) => ({ tabBarIcon: ({ focused }) => (<Image source={require('../Ranimalib/images/icon_home.png')} 
                      style={route.name === "Home" && focused ? styles.iconActive : styles.iconInactive}/>) })} />
          <Tab.Screen name="Animals" 
                      component={AnimalsStack} 
                      options={({ route }) => ({ tabBarIcon: ({ focused }) => (<Image source={require('../Ranimalib/images/icon_animals.png')} 
                      style={route.name === "Animals" && focused ? styles.iconActive : styles.iconInactive}/>) })} />
          <Tab.Screen name="Species" 
                      component={SpeciesPage} 
                      options={({ route }) => ({ tabBarIcon: ({ focused }) => (<Image source={require('../Ranimalib/images/icon_dna_2.png')} 
                      style={route.name === "Species" && focused ? styles.iconActive : styles.iconInactive}/>) })} />
          <Tab.Screen name="Regions" 
                      component={RegionsPage} 
                      options={({ route }) => ({ tabBarIcon: ({ focused }) => (<Image source={require('../Ranimalib/images/icon_globe.png')} 
                      style={route.name === "Regions" && focused ? styles.iconActive : styles.iconInactive}/>) })} />
          <Tab.Screen name="Settings" 
                      component={SettingsPage} 
                      options={({ route }) => ({ tabBarIcon: ({ focused }) => (<Image source={require('../Ranimalib/images/icon_settings.png')} 
                      style={route.name === "Settings" && focused ? styles.iconActive : styles.iconInactive}/>) })} />
        </Tab.Navigator>
    </NavigationContainer>    
  )
}

const styles = StyleSheet.create({
  iconActive: {
    width: 30, 
    height: 30, 
    tintColor: "#10D180"
  },
  iconInactive: {
    width: 25, 
    height: 25,
    tintColor: "white"
  }
});

export default App;