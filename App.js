import 'react-native-gesture-handler';
import React from 'react';
import styled, { ThemeConsumer, ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Log from "./components/Log";
import theme from './theme';
import { Button } from 'react-native';

const Container = styled.View`
	flex: 1;
	background-color: ${ props => props.theme.FOURTH };
	justify-content: center;
	align-items: center;
`;
const Stack = createStackNavigator();

const dummyLogs = ({ navigation }) => (
	<Container>
		<Button title="go editor" onPress={() => navigation.navigate('Editor')}></Button>
	</Container>
);

export default class App extends React.Component {

	render() {
		return (
			<NavigationContainer>
				<ThemeProvider theme={ theme }>
				<Stack.Navigator initialRouteName="Logs" >
					<Stack.Screen name="Logs" component={dummyLogs} />
					<Stack.Screen name="Editor">
						{ props => <Log {...props} theme={ theme } date=" 27 June 2020" />}
					</Stack.Screen>
				</Stack.Navigator>
				</ThemeProvider>
			</NavigationContainer>
		);
	}
}