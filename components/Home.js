import React from "react";
import styled from "styled-components";

import YourTitle from "./YourTitle";
import CustomButton from "../components/CustomButton";
import { NavigationContainer } from "@react-navigation/native";

const Container = styled.View`
    flex: 1;
    text-align: left;
    padding: 26px;
    flex-direction: column-reverse;
    background: ${ props => props.theme.FOURTH };
`;

const ButtonsContainer = styled.View`
    background: ${ props => props.theme.FIFTH };
    height: 123px;
    z-index: 1;
    position: absolute;
    flex: 1;
    align-items: center;
    justify-content: center;
    left: 0;
    right: 0;
`;

export default Home = ({ theme, navigation}) => (
    <Container theme={ theme }>
        <YourTitle firstWord="Your logs" theme={ theme } />
        <YourTitle firstWord="Your omg" theme={ theme } />
        <YourTitle firstWord="Your baby" theme={ theme } />
        <YourTitle firstWord="Your" secondWord="journal" theme={ theme } />
        <YourTitle firstWord="Your logs" theme={ theme } />
        <YourTitle firstWord="Your space" theme={ theme } />
        <YourTitle firstWord="Your stories" theme={ theme } />
        <ButtonsContainer theme={ theme } >
            <CustomButton theme={ theme } text="START" function={ () => navigation.navigate("Logs")} />
        </ButtonsContainer>
    </Container>
);