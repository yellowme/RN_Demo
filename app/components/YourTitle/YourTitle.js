import React from 'react';
import styled from "styled-components";

const Title = styled.Text`
    font-family: DMSerifDisplay-Regular;
    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 49px;
    color: ${ props => props.color };
`;
const SpanTitle = styled.Text`
    font-family: DMSerifDisplay-Regular;
    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 49px;
    color: ${ props => props.color };
`;

const YourTitle = props => (
    <Title color={ props.theme.SECONDARY }>
        { props.firstWord ? props.firstWord : "Your" }
        <SpanTitle color={ props.theme.PRIMARY }> { props.secondWord } </SpanTitle>
    </Title>
);

export default YourTitle;
