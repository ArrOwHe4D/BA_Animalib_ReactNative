import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Region from '../datamodels/Region';

const RegionsPage = () => 
{ 
  const [regionList, setRegionList] = useState([]);  

  useEffect(() => {
    fetch('http://192.168.178.51:57565/api/Regions')
    .then((response) => response.json())
    .then((json) => {
      const objectList = json.map((item: any) => new Region(
        item.name,
        item.size,
        item.speciesCount,
        item.image
      ));
      setRegionList(objectList);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [])

  interface RenderItemProps
  {
    item: Region;
    index: number;
  }

  const renderItem = ({ item }: RenderItemProps) => (
    <TouchableOpacity>
      <View style={styles.itemContainer}>        
        <Image source={{ uri: `data:image/jpg;base64,${item.image}` }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.text}>Fläche: {item.size} km²</Text>
          <Text style={styles.text}>Spezies: {item.speciesCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>        
    <View style={styles.header}>
      <Image source={require('../images/icon_title_regions.png')} style={styles.headerIcon} />
      <Text style={styles.headerTitle}>Regions</Text>
    </View>
    <FlatList
      data={regionList}
      renderItem={renderItem}
      keyExtractor={item => item.name}
      style={styles.list}
    />
  </View>
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

export default RegionsPage;