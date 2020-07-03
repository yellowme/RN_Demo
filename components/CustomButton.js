import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.TouchableOpacity`
width: 136px;
height: 44px;
background: ${ props => props.primary };
box-shadow: 0px 0px 16px ${ props => props.shadow };
border-radius: 12px;
padding: 13px 34px;
shadowColor: ${ props => props.shadow };
elevation: 10;
`;

const ButtonText = styled.Text`
    font-family: Red Hat Display;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;

    text-align: center;

    color: ${ props => props.color };
`;

export default CustomButton = props => (
    <ButtonContainer
        onPress={() => alert('Hi!')}
        primary={ props.theme.PRIMARY }
        shadow={ props.theme.PRIMARY_BTN_SHADOW}
    >
        <ButtonText color={ props.theme.FIFTH} >{ props.text }</ButtonText>
    </ButtonContainer>
);