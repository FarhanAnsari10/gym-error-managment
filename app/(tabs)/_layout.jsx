import colors from "@/assets/colors";
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import Foundation from '@expo/vector-icons/Foundation';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { useEffect, useRef, useContext } from 'react';
import { Animated, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale } from "react-native-size-matters";
import { useTheme } from '../../context/ThemeContext';
import { userDetailContext } from '../../context/userDetailContext';

// Animated tab icon component for smooth transitions
function AnimatedTabIcon({ focused, children }) {
  const scaleAnim = useRef(new Animated.Value(focused ? 1.1 : 1)).current;
  const bgAnim = useRef(new Animated.Value(focused ? 1 : 0)).current;
  
  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: focused ? 1.1 : 1,
      useNativeDriver: false,
      friction: 6,
    }).start();
    Animated.timing(bgAnim, {
      toValue: focused ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [focused]);
  
  const bgColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', colors.gwhite],
  });
  
  return (
    <Animated.View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18, 
        backgroundColor: bgColor,
        width: 60, 
        height: 36, 
        transform: [{ scale: scaleAnim }],
      }}
    >
      {children}
    </Animated.View>
  );
}

export default function Layout() {
  const { isDarkMode } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const { userDetail } = useContext(userDetailContext); 

  return (
    <Tabs
      screenOptions={{
        animationEnabled: false,
        headerShown: false,
        tabBarActiveTintColor: colors.gwhite,
        tabBarInactiveTintColor: colors.twhite,
        tabBarShowLabel: true,
        backgroundColor: isDarkMode ? '#181818' : '#fff',
        tabBarStyle: {
          backgroundColor: colors.wblack,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: moderateScale(65) + bottom,
          borderTopWidth: 0,
          paddingBottom: bottom + moderateScale(5),
          paddingTop: moderateScale(10),
        },
        tabBarItemStyle: {
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarLabelStyle: {
          fontSize: moderateScale(10),
          fontWeight: '500',
          marginTop: moderateScale(6),
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon focused={focused}>
              <Entypo name="home" size={22} color={focused ? colors.wblack : color} />
            </AnimatedTabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="member"
        options={{
          tabBarLabel: 'Member',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon focused={focused}>
              <MaterialIcons name="people" size={22} color={focused ? colors.wblack : color} />
            </AnimatedTabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="addmember"
        options={{
          tabBarLabel: 'Add Member',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon focused={focused}>
              <Feather name="plus" size={22} color={focused ? colors.wblack : color} />
            </AnimatedTabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon focused={focused}>
              <Foundation name="graph-pie" size={22} color={focused ? colors.wblack : color} />
            </AnimatedTabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon focused={focused}>
              {userDetail?.profileImage ? (
                <Image
                  source={{ uri: userDetail.profileImage }}
                  style={{ width: 24, height: 24, borderRadius: 12 }}
                />
              ) : (
                <Feather name="user" size={22} color={focused ? colors.wblack : color} />
              )}
            </AnimatedTabIcon>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
