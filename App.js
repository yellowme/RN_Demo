import React from 'react';
import styled, { ThemeConsumer, ThemeProvider } from 'styled-components';
import CustomButton from "./components/CustomButton";

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
				<Container theme={ theme }>
					<CustomButton text="SIGN UP" theme = { theme } />
				</Container>
			</ThemeProvider>
		);
	}
}