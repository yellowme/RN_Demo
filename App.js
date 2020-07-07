import React from 'react';
import styled, { ThemeConsumer, ThemeProvider } from 'styled-components';
import Log from "./components/Log";
import theme from './theme';

const Container = styled.View`
	flex: 1;
	background-color: ${ props => props.theme.FOURTH };
	justify-content: center;
	align-items: center;
`;
export default class App extends React.Component {

	render() {
		return (
			<ThemeProvider theme={ theme }>
				<Log theme={ theme } date="June 27 2020" />
			</ThemeProvider>
		);
	}
}