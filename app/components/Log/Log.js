import React, { Component } from 'react'
import styled from "styled-components";
import YourTitle from "../YourTitle";
import { View, Image } from 'react-native';
import CustomButton from "../CustomButton";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import LogRealmService from "app/services/LogRealmService/LogRealmService";
import DateHelper from "app/helpers/DateHelper";
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';


const logService = new LogRealmService();
const richText = React.createRef();
const imagePath = 'yourjournal'
const pickerOptions = {
    title: "Select Image",
    storageOptions: {
        skipBackup: true,
        path: imagePath,
    },
}
const defaultWidth = 274
const defaultHeight = 161

class Log extends Component {

    constructor(props) {
        super(props);
        if (this.props.route.params !== undefined) {
            this.state = {
                title: this.props.route.params.title,
                formattedContent: this.props.route.params.formattedContent,
                date: this.props.route.params.date,
                timestamp: this.props.route.params.id,
                imageFile: this.props.route.params.image,
                width: this.props.route.params.image ? defaultWidth : 0,
                height: this.props.route.params.image ? defaultHeight : 0
            }
        } else {
            this.state = {
                title: "",
                date: new window.Date(),
                timestamp: null,
                imageFile: null,
                width: 0,
                height: 0
            }
        }

        if (this.state.imageFile !== null) {
            RNFetchBlob.fs.readFile(this.state.imageFile, 'base64')
                .then((data) => {
                    console.log('Read data is: ' + data);
                    this.setState({ imageData: data });
                })
        }
    }

    componentDidMount() {
        logService.init()
    }

    componentWillUnmount() {
        logService.close()
    }

    render() {
        const { theme, navigation } = this.props;

        const saveLog = async () => {
            const { title, date, timestamp, imageFile } = this.state;
            let html = await richText.current?.getContentHtml();
            await logService.save(timestamp, title, date, html, imageFile)
        };

        return (
            <LogContainer backgroundColor={theme.FOURTH} >
                <YourTitle secondWord="Day" theme={theme} />
                <Date color={theme.SECONDARY}>{
                    DateHelper.getNameOfMonth(this.state.date.getMonth()) +
                    " " + this.state.date.getDate() +
                    " " + this.state.date.getFullYear()
                }
                </Date>
                <FullEditorContainer style={{ marginBottom: 15 }}>
                    <EditorContainer backgroundColor={theme.THIRD}>
                        <Title
                            color={theme.SECONDARY}
                            placeholder="Name your log"
                            onChangeText={text => this.setState({ title: text })}
                            value={this.state.title}
                        />
                        <RichEditor
                            editorStyle={{ backgroundColor: theme.THIRD }}
                            style={[{ minHeight: 380, flex: 1 }, theme.THIRD]}
                            ref={richText}
                            useContainer={false}
                            placeholder="Write here your story..."
                            initialContentHTML={this.state.formattedContent}
                        />
                    </EditorContainer>
                    <RichToolbar
                        editor={richText}
                        iconTint={theme.SECONDARY}
                        style={[{ backgroundColor: theme.FOURTH, marginTop: 26 }, theme.FOURTH]}
                        onPressAddImage={() => {
                            console.log("Button Pressed")

                            let date = new window.Date().getTime().toString();
                            let fileName = RNFetchBlob.fs.dirs.DocumentDir + '/' + date + '.jpg';

                            ImagePicker.showImagePicker(pickerOptions, (response) => {
                                if (response.didCancel) {
                                    console.log('User cancelled Image Picker');
                                } else if (response.error) {
                                    console.log('Image Picker Error: ', response.error)
                                } else {
                                    const data = response.data;
                                    try {
                                        RNFetchBlob.fs.writeFile(fileName, data, 'base64').then(() => {
                                            console.log('File name is ' + fileName)

                                            this.setState({ imageFile: fileName });

                                            RNFetchBlob.fs.readFile(fileName, 'base64')
                                                .then((data) => {
                                                    this.setState({ imageData: data })
                                                    this.setState({ width: defaultWidth, height: defaultHeight });
                                                })
                                        });
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }
                            });
                        }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 20 }}>
                        <Image
                            style={{ width: this.state.width, height: this.state.height, borderRadius: 25, flex: 1 }}
                            source={{
                                uri: 'data:image/jpeg;base64,' + this.state.imageData
                            }}
                        />
                    </View>
                </FullEditorContainer>
                <CustomButton
                    text="SAVE"
                    theme={theme}
                    function={() => {
                        saveLog();
                        navigation.goBack();
                    }}
                >
                </CustomButton>
            </LogContainer>
        );
    }

}

export default Log;

const LogContainer = styled.View`
    flex: 1;
    background-color: ${ props => props.backgroundColor};
    padding: 22px 16px;
`;
const Date = styled.Text`
    font-family: Noto Sans JP;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 26px;
    color: ${ props => props.color}
`;
const FullEditorContainer = styled.View`
    flex: 1;
    flex-direction: column-reverse;

`;
const EditorContainer = styled.ScrollView`
    flex:1;
    background: ${ props => props.backgroundColor};
    border-radius: 12px;
    margin-top: 15px;
    padding: 28px;
    elevation: 2;
`;

const Title = styled.TextInput`
    font-family: Noto Sans JP;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 22px;
    color: ${ props => props.color};
`;
