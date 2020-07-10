import 'react-native-gesture-handler';
import React, { Component, useState } from 'react';
import { Text, View, TextInput, ScrollView, FlatList, Button } from 'react-native';
import styled, { ThemeConsumer, ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Edit from '../assets/icons/edit.svg'

const Title = styled.Text`
  font-size: 36px;
  font-family: DMSerifDisplay-Regular;
  margin-bottom: 9px;
  margin-start: 20px;
`;

const EntryButton = styled.TouchableOpacity`
  width: 96px;
	height: 48px;
  background: #BD5AEC;
  border-top-right-radius: 48px;
  border-top-left-radius: 48px;
  padding-top: 15px;
  align-items: center;
`

const DayBox = styled.View`
  width: 33px;
  height: 30px;
  background: black;
  position: absolute;
  top: -15px;
  left: 16px;
  justify-content: center;
  align-items: center;
`

const Day = styled.Text`
  color: white;
  font-size: 18px;
`

const EntryDataContainer = styled.TouchableOpacity`
  margin-bottom: 16px;
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
  background: #FCFCFC;
  padding: 16px;
  box-shadow: 0px 2px 16px black;
  border-radius: 12px;
  elevation: 10;
`

export const LogSchema = {
    name: 'Log',
    primaryKey: 'id',
    properties: {
        id: 'string',
        title: 'string',
        date: 'date',
        content: 'string',
        formattedContent: 'string'
    }
};

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// const realm = new Realm({ schema: [LogSchema] });

function JournalEntry(props) {
    return (
        <View style={{ flex: 1, marginStart: 20, marginEnd: 20 }}>
            <EntryDataContainer onPress={() => {
                props.navigation.navigate('Editor', props.item)
            }}>
                <DayBox>
                    <Day>{props.date.getDate()}</Day>
                </DayBox>
                <View>
                    <Text style={{ fontFamily: "NotoSans-Bold", fontSize: 14 }}>{months[props.date.getMonth()] + " " + props.date.getFullYear()}</Text>
                    <Text style={{ fontFamily: "NotoSans-Bold", fontSize: 18 }}>{props.title}</Text>
                    <Text numberOfLines={1} style={{ fontFamily: "NotoSans-Regular", fontSize: 14 }}>{props.content}</Text>
                </View>
            </EntryDataContainer>
        </View>
    );
}

export default class LogList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { realm: null }
    }

    componentWillUnmount() {
        // Close the realm if there is one open.
        const { realm } = this.state;
        if (realm !== null && !realm.isClosed) {
            realm.close();
        }
    }

    

    render() {
        let realm = new Realm({ schema: [LogSchema] });
        let logs = realm.objects('Log');
        return (
            <View style={{ flex: 1, paddingTop: 20 }}>
                <Title style={{ color: '#000000' }}>
                    Your
              <Title style={{ color: '#BD5AEC' }}> journal</Title>
                </Title>
                <FlatList
                    style={{ flex: 1 }}
                    data={logs.sorted('date', true)}
                    renderItem={({ item }) => (
                        <JournalEntry
                            title={item.title}
                            date={item.date}
                            content={item.content}
                            navigation={this.props.navigation}
                            item={item}
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />


                <View style={{
                    marginTop: 20,
                    alignItems: "center",
                }}>

                    <EntryButton
                        onPress={() => {
                            this.props.navigation.navigate('Editor', undefined)
                        }}>
                        <Edit width={25} height={25} />
                    </EntryButton>

                </View>
            </View>
        );
    }
}