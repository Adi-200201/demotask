import {useEffect} from 'react';
import {Button, FlatList, Text, View, StyleSheet} from 'react-native';
import {syncPostToServer} from '../../utils/api';
import {getUnsyncedPosts, markPostAsSynced} from '../../services/db';
import {useStore} from '../../store/useStore';
import PostItem from '../../components/PostItem';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

const FeedScreen = ({navigation}) => {
  const posts = useStore(state => state.posts);
  const fetchLocalPosts = useStore(state => state.fetchLocalPosts);
  const syncUnsyncedPosts = useStore(state => state.syncUnsyncedPosts);

  useEffect(() => {
    fetchLocalPosts();
    // syncUnsyncedPosts();
  }, []);
  useEffect(() => {
    fetchLocalPosts();
    const sync = async () => {
      const unsynced = await getUnsyncedPosts();
      for (let post of unsynced) {
        const res = await syncPostToServer(post);
        if (res.success) {
          markPostAsSynced(post.id);
        }
      }
      fetchLocalPosts();
    };
    sync();
  }, []);

  return (
    <>
      <View style={styles.iconContainer}>
        <Text style={styles.ProductText}>Feed</Text>
      </View>
      <View style={styles.container}>
        <Button
          title="Create Post"
          onPress={() => navigation.navigate('CreatePost')}
          color="#4CAF50"
        />
        <FlatList
          data={posts}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <PostItem post={item} />}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No posts available</Text>
          }
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
  header: {
    paddingVertical: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  list: {
    marginTop: 16,
  },
  emptyText: {
    marginTop: 32,
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    paddingVertical: moderateVerticalScale(7),
    backgroundColor: '#b8d8c9',
  },
  ProductText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(150),
  },
});
export default FeedScreen;