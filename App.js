import React from 'react';
import styled from 'styled-components';
const CustomButton = props => (
	<ButtonContainer
		onPress={() => alert('Hi!')}
		backgroundColor={props.backgroundColor}
	>
		<ButtonText textColor={props.textColor}>{props.text}</ButtonText>
	</ButtonContainer>
);
const ButtonContainer = styled.TouchableOpacity`
	width: 100px;
	height: 100px;
	padding: 12px;
	border-radius: 50px;
	background-color: ${props => props.backgroundColor};
`;
const ButtonText = styled.Text`
	font-size: 15px;
	color: ${props => props.textColor};
	text-align: center;
`;
const Container = styled.View`
	flex: 1;
	background-color: papayawhip;
	justify-content: center;
	align-items: center;
`;
const Title = styled.Text`
	font-size: 24px;
	font-weight: 500;
	color: palevioletred;
`;
export default class App extends React.Component {
	render() {
		return (
			<Container>
				<CustomButton text="Me" textColor="#01d1e5" backgroundColor="lavenderblush" />
			</Container>
		);
	}
}