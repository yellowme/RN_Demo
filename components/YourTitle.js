import React from 'react';
import styled from "styled-components";

const Title = styled.Text`
    font-family: DM Serif Display;
    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 49px;
    color: ${ props => props.color };
`;
const SpanTitle = styled.Text`
    font-family: DM Serif Display;
    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 49px;
    color: ${ props => props.color };
`;

export default YourTitle = props => (
    <Title color={ props.theme.SECONDARY }>
        Your
        <SpanTitle color={ props.theme.PRIMARY }> { props.secondWord } </SpanTitle>
    </Title>
);