import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AnimalDetailPage from './AnimalDetailPage';
import Animal from '../datamodels/Animal';

const AnimalsPage = ({ navigation }: any) => { 
  const [animalList, setAnimalList] = useState([]);  

  function navigateToDetailPage(item: Animal)
  {            
    navigation.navigate('AnimalDetailPage', { animal: item });
  }

  useEffect(() => {
    fetch('http://192.168.178.51:57565/api/Animals')
    .then((response) => response.json())
    .then((json) => {
      const objectList = json.map((item: any) => new Animal(
        item.id,
        item.name,
        item.height,
        item.weight,
        item.species,
        item.regions,
        item.description,
        item.image
      ));
      setAnimalList(objectList);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [])

  interface RenderItemProps
  {
    item: Animal;
    index: number;
  }

  const renderItem = ({ item }: RenderItemProps) => (
    <TouchableOpacity onPress={() => { navigateToDetailPage(item); }}>
      <View style={styles.itemContainer}>        
        <Image source={{ uri: `data:image/jpg;base64,${item.image}` }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.text}>Regionen: {item.regions}</Text>
          <Text style={styles.text}>Spezies: {item.species}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>        
      <View style={styles.header}>
        <Image source={require('../images/icon_title_animals.png')} style={styles.headerIcon} />
        <Text style={styles.headerTitle}>Animals</Text>
      </View>
      <FlatList
        data={animalList}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
      />
    </View>
  );
}

const Stack = createStackNavigator();

const AnimalsStack = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="AnimalsPage" component={AnimalsPage} options={ { headerShown: false } } />
        <Stack.Screen name="AnimalDetailPage" component={AnimalDetailPage} options={ { headerStyle: { backgroundColor: '#303030' }, headerTintColor: '#FFFFFF' } } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 20,
  },
  headerIcon: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 40,
    color: 'white',
    marginLeft: 5,
  },
  list: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    backgroundColor: '#303030',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#10D182',
    overflow: 'hidden',
    marginLeft: 10,
  },
  textContainer: {
    marginLeft: 10,
  },
  title: {
    color: '#10D180',
    fontSize: 20,
  },
  text: {
    color: 'white',
    fontSize: 14,
  }
});

export default AnimalsStack;