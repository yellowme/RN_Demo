import 'react-native-gesture-handler';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Log from "app/components/Log";
import theme from 'app/config/theme';
import Home from 'app/screens/Home';
import LogList from 'app/screens/LogList';

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

	render() {
		return (
			<NavigationContainer>
				<ThemeProvider theme={ theme }>
				<Stack.Navigator initialRouteName="Home" >
					<Stack.Screen
						name="Home"
						options={{
							title: '',
							headerStyle: {
							  backgroundColor: theme.FOURTH,
							  elevation: 0
							},
							cardShadowEnabled: false,
						}}
					>
						{ props => <Home {...props} theme={ theme }/>}
					</Stack.Screen>
					<Stack.Screen
						name="Logs"
						component={LogList}
						options={{ headerShown: false }}
					/>
					<Stack.Screen name="Editor">
						{ props => <Log {...props} theme={ theme } date=" 27 June 2020" />}
					</Stack.Screen>
				</Stack.Navigator>
				</ThemeProvider>
			</NavigationContainer>
		);
	}
}
