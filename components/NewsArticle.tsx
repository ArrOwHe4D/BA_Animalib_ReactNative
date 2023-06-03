import { StyleSheet, Text, View } from "react-native";

interface ArticleProps 
{
    title: String;    
    content: String;
}

const NewsArticle = ({ title, content }: ArticleProps) => {
    return (
      <View style={styles.articleContainer}>
        <Text style={styles.articleTitle}>{title}</Text>
        <Text style={styles.articleContent}>{content}</Text>
      </View>
    );
};

const styles = StyleSheet.create({  
  cardTitle: {
    color: '#fff',
    fontSize: 20,
  },
  articleContainer: {
    padding: 10,        
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#10D180"
  },
  articleContent: {
    fontSize: 16,
    marginTop: 5,
    color: "white"
  }
});

export default NewsArticle;
  