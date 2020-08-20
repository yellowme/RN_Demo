import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { FlatList, Text, View, Image } from 'react-native';
import styled from 'styled-components';
import Edit from 'app/assets/icons/edit.svg'
import DateHelper from "app/helpers/DateHelper";
import LogRealmService from "app/services/LogRealmService/LogRealmService";
import RNFetchBlob from 'rn-fetch-blob';

const logService = new LogRealmService();

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
`;

const DayBox = styled.View`
  width: 33px;
  height: 30px;
  background: black;
  position: absolute;
  left: 16px;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
`;

const LogImage = styled.Image`
  height: 200px;
  border-radius: 12px;
`;

const Day = styled.Text`
  color: white;
  font-size: 18px;
`;

const EntryDataContainer = styled.TouchableOpacity`
  margin-bottom: 16px;
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
  background: #FCFCFC;
  box-shadow: 0px 2px 16px black;
  padding-bottom: 16px;
  border-top-start-radius: 12px;
  border-top-end-radius: 12px;
  border-bottom-start-radius: 12px;
  elevation: 10;
`;

function JournalEntry(props) {
  const [imageData, setImageData] = useState(null);

  if (props.item.image !== null) {
    RNFetchBlob.fs.readFile(props.item.image, 'base64')
      .then((data) => {
        setImageData(data);
        console.log('Read data is: ' + data);
      })
  }

  return (
    <View style={{ flex: 1, marginStart: 20, marginEnd: 20 }}>
      <EntryDataContainer onPress={() => {
        props.navigation.navigate('Editor', props.item)
      }}>
        <LogImage
          style={{ height: imageData ? 200 : 0 }}
          source={{ uri: imageData ? ('data:image/jpeg;base64,' + imageData) : null }}
        />

        <DayBox style={{ top: imageData ? 185 : -15 }}>
          <Day>{props.date.getDate()}</Day>
        </DayBox>

        <View style={{ marginStart: 16, marginEnd: 16, marginTop: 16 }}>
          <Text style={{ fontFamily: "NotoSans-Bold", fontSize: 14 }}>
            {DateHelper.getNameOfMonth(props.date.getMonth()) + " " + props.date.getFullYear()}
          </Text>
          <Text style={{ fontFamily: "NotoSans-Bold", fontSize: 18 }}>
            {props.title}
          </Text>
          <Text
            numberOfLines={1}
            style={{ fontFamily: "NotoSans-Regular", fontSize: 14 }}
          >
            {props.content}
          </Text>
        </View>
      </EntryDataContainer>
    </View>
  );
}

class LogList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { logs: null };
  }

  componentDidMount() {
    logService.init();
    logService.addOnChangeListener(() => {
      this.forceUpdate()
    });
    this.setState({ logs: logService.getAll() })
  }

  componentWillUnmount() {
    logService.close()
  }

  render() {
    const { logs } = this.state;

    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <Title style={{ color: '#000000' }}>
          Your
          <Title style={{ color: '#BD5AEC' }}> journal</Title>
        </Title>
        {logs !== null &&
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
            keyExtractor={item => item.id}
          />
        }

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

export default LogList;
