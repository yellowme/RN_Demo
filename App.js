import 'react-native-gesture-handler';
import React, { Component, useState } from 'react';
import { Text, View, TextInput, ScrollView, FlatList, Button } from 'react-native';
import styled, { ThemeConsumer, ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Log from "./components/Log";
import theme from './theme';
import LogList from './components/LogList';

const Container = styled.View`
	flex: 1;
	background-color: ${ props => props.theme.FOURTH};
	justify-content: center;
	align-items: center;
`;

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <Stack.Navigator initialRouteName="Logs" >
            <Stack.Screen
              name="Logs"
              component={LogList}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Editor"
              component={Log}>
            </Stack.Screen>
          </Stack.Navigator>
        </ThemeProvider>
      </NavigationContainer>
    );
  }
}
