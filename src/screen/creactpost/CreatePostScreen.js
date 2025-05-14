import {useState} from 'react';
import {Button, TextInput, View, StyleSheet, Text} from 'react-native';
import {insertPost} from '../../services/db';
import {useStore} from '../../store/useStore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
  verticalScale,
} from 'react-native-size-matters';

 const CreatePostScreen=({navigation})=> {
  const [content, setContent] = useState('');
  const addPost = useStore(state => state.addPost);
  const fetchLocalPosts = useStore(state => state.fetchLocalPosts);

  const handlePost = () => {
    const newPost = {id: Date.now(), content, synced: 0};
    insertPost(content, 0);
    addPost(newPost); 
    setContent('');
    fetchLocalPosts();
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.iconContainer}>
        <View>
          <AntDesign
            name="arrowleft"
            size={25}
            color={'black'}
            onPress={() => navigation.navigate('Feed')}
          />
        </View>

        <Text style={styles.ProductText}>CreatePost</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          placeholder="Write something..."
          value={content}
          onChangeText={setContent}
          style={styles.input}
          multiline
          placeholderTextColor={'black'}
        />
        <View style={styles.buttonContainer}>
          <Button title="Post" onPress={handlePost} color="#4CAF50" />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
    minHeight: 100,
    textAlignVertical: 'top',
    color: 'black',
  },
  buttonContainer: {
    marginTop: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateVerticalScale(7),
    backgroundColor: '#b8d8c9',
  },
  ProductText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(120),
  },
});
export default CreatePostScreen
