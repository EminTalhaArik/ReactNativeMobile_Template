import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import {MainStackParamList} from './types';
import {HomeScreen} from '@features/home/screens/HomeScreen';
import {ProfileScreen} from '@features/profile/screens/ProfileScreen';

const Tab = createBottomTabNavigator<MainStackParamList>();

export const MainNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarIcon: ({color, size}) => {
        const iconName = route.name === 'Home' ? 'home' : 'user';
        return <Icon name={iconName} size={size} color={color} />;
      },
    })}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);
