import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import {useStore} from '../store/useStore';
import FeedScreen from '../screen/Feedscreen/FeedScreen';
import CreatePostScreen from '../screen/creactpost/CreatePostScreen';
import LoginScreen from '../screen/Login/LoginScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const user = useStore(state => state.user);
  console.log('user', user);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {user && user !== null ? (
          <>
            <Stack.Screen name="Feed" component={FeedScreen} />
            <Stack.Screen name="CreatePost" component={CreatePostScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
