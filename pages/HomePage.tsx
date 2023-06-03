import CustomCardView from "../components/CustomCardView";
import NewsArticle from '../components/NewsArticle';

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const WelcomeCard = () => 
{    
  return (
    <CustomCardView height={120} backgroundColor="#303030" displayChildrenAsRow={true} childrenAlignment='center'>
      <Image source={require('../images/icon_bear.png')} style={{width: 100, height: 100}} />
      <Text style={{ marginLeft: 10, fontSize: 26, color: "white"}}>Welcome to Animalib!</Text>
    </CustomCardView>
  );
};

const NewsCard = () => 
{ 
  return (    
    <CustomCardView height={610} backgroundColor="#303030" displayChildrenAsRow={false} childrenAlignment='flex-start'>
      <ScrollView>
        <View>
          <View style={styles.cardContent}>
            <Image source={require('../images/icon_news.png')} style={{width: 50, height: 50}} />
            <Text style={{ marginLeft: 10, fontSize: 50, color: "white" }}>News</Text>
          </View>
        </View>
        <View>
            <NewsArticle title="24.01.2023: Another £2 million funding by the UK government!" 
                         content="The UK government announces another £2 million in funding to protect pangolins, sharks &amp; other endangered species." />
            <NewsArticle title="20.01.2023: 40 Starving Sheep have been Saved from a Backyard!" 
                         content="40 Starving Sheep Have Been Saved From A Backyard Slaughter Operation In New York’s Hudson Valley." />
            <NewsArticle title="19.01.2023: New York bans sale of cosmetics tested on animals!" 
                         content="Victory! New York becomes the 10th state in the U.S. to Ban the sale of cosmetics tested on animals" />
            <NewsArticle title="18.01.2023: 2 Pandas saved moving to Sanctuary in China" 
                         content="Victory! Suffering pandas Yaya &amp; Lele at the memphis zoo will finally be sent to a sanctuary in china." />
            <NewsArticle title="17.01.2023: Biden signs the shark fin sales elimination act" 
                         content="Victory! President Biden signs the shark fin sales elimination act helping to protect sharks in the U.S." />
            <NewsArticle title="17.01.2023: Three chimpanzees shot!" 
                         content="Breaking! Three chimpanzees are shot &amp; killed after escaping from their enclosure at a swedish zoo." />
            <NewsArticle title="15.01.2023: Stricter animal welfare laws in Queensland Australia" 
                         content="Queensland, Australia, passes stricter animal welfare laws for the first time in more than two decades." />
            <NewsArticle title="13.01.2023: New Research on climate impact of factory farming in Canada" 
                         content="First-of-its-Kind research reveals the staggering impact factory farming in Canada has on our climate." />
            <NewsArticle title="12.01.2023: £4 million funding by the UK government!" 
                         content="The UK government announces £4 million in funding to protect pangolins, sharks &amp; other endangered species." />            
        </View>
      </ScrollView>
    </CustomCardView>    
  );
};

const HomePage = () => 
{  
  return (
    <View style={styles.container}>
      <WelcomeCard />
      <NewsCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  card: {
    backgroundColor: '#333',
    borderRadius: 10,
    marginBottom: 10,
    height: 200
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',    
    padding: 10,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 20,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 20,
  }
});

export default HomePage;