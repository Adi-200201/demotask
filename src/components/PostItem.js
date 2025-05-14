import {StyleSheet, Text, View} from 'react-native';

const PostItem = ({post}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>{post.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  content: {
    fontSize: 16,
    marginBottom: 4,
    color: 'black',
  },
  status: {
    fontSize: 12,
    color: 'gray',
  },
});
export default PostItem;
