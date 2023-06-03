import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import CustomCardView from '../components/CustomCardView';
import { useNavigation } from '@react-navigation/native';

const AnimalDetailPage = ({ route }: any) => {  
  const navigation = useNavigation();
  useEffect(() => { navigation.setOptions({ headerTitle: route.params.animal.name }); }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
          <Image
            source={{ uri: `data:image/jpg;base64,${route.params.animal.image}` }}
            style={styles.image}
          />
      </View>

      <ScrollView>
        <CustomCardView height={390} backgroundColor='#303030' displayChildrenAsRow={false} childrenAlignment={'flex-start'}>
          <View>
            <Text style={styles.cardTitle}>Daten</Text>
            <Text style={styles.text}>Bezeichnung: {route.params.animal.name}</Text>
            <Text style={styles.text}>Größe: {route.params.animal.height}</Text>
            <Text style={styles.text}>Gewicht: {route.params.animal.weight}</Text>
            <Text style={styles.text}>Spezies: {route.params.animal.species}</Text>
            <Text style={styles.text}>Regionen: {route.params.animal.regions}</Text>
            <Text style={styles.cardSubtitle}>Beschreibung</Text>
            <Text style={styles.text}>{route.params.animal.description}</Text>
          </View>
        </CustomCardView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#10D180',
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 35,
    color: '#10D180',
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 20,
    color: '#10D180',
    marginVertical: 10,
  },
  text: {
    color: 'white',
    fontSize: 14
  },
});

export default AnimalDetailPage;