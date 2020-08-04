import React from "react";
import styled from "styled-components";
import YourTitle from "./YourTitle";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { LogSchema } from "./LogList";
import { months } from "./LogList"
import CustomButton from "./CustomButton";
import { Image, StyleSheet, View } from 'react-native';
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from "react-native-fetch-blob";

const richText = React.createRef();

const imagePath = 'yourjournal'

const pickerOptions = {
    title: "Select Image",
    storageOptions: {
        skipBackup: true,
        path: imagePath,
    },
}


const Save = async (title, date, id, imageFile) => {

    let html = await richText.current?.getContentHtml();
    let justText = '';
    let realm = new Realm({ schema: [LogSchema] });

    html = html.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim();
    justText = html.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim();

    realm.write(() => {
        let timestamp;
        if (id !== null) {
            timestamp = id;
            realm.create('Log', { id: timestamp, title: title, date: date, content: justText, formattedContent: html, image: imageFile }, true);
        } else {
            timestamp = new window.Date().toString();
            realm.create('Log', { id: timestamp, title: title, date: date, content: justText, formattedContent: html, image: imageFile });
        }
    })
}

export default class Log extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.route.params !== undefined) {
            this.state = {
                title: this.props.route.params.title,
                formattedContent: this.props.route.params.formattedContent,
                date: this.props.route.params.date,
                timestamp: this.props.route.params.id,
                imageFile: this.props.route.params.image,
                realm: new Realm({ schema: [LogSchema] }),
                width: this.props.route.params.image ? 274 : 0,
                height: this.props.route.params.image ? 161 : 0
            }
        } else {
            this.state = {
                title: "",
                date: new window.Date(),
                timestamp: null,
                realm: new Realm({ schema: [LogSchema] }),
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

    render() {

        const { theme, navigation } = this.props;

        return (
            <LogContainer backgroundColor={theme.FOURTH} >
                <YourTitle secondWord="Day" theme={theme} />
                <Date color={theme.SECONDARY}>
                    {months[this.state.date.getMonth()] + " " + this.state.date.getDate() + " " + this.state.date.getFullYear()}
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
                            let date = new window.Date().getTime().toString();
                            let fileName = RNFetchBlob.fs.dirs.DocumentDir + '/' + date + '.jpg';

                            ImagePicker.showImagePicker(pickerOptions, (response) => {
                                if (response.didCancel) {
                                    console.log('User cancelled image picker');
                                } else if (response.error) {
                                    console.log('ImagePicker Error: ', response.error);
                                } else {
                                    const base64data = response.data;
                                    console.log('Created data is ' + base64data);
                                    try {
                                        RNFetchBlob.fs.writeFile(fileName, base64data, 'base64').then(() => {
                                            console.log('File name is ' + fileName);

                                            this.setState({ imageFile: fileName });

                                            RNFetchBlob.fs.readFile(fileName, 'base64')
                                                .then((data) => {
                                                    console.log('Read data is: ' + data);
                                                    this.setState({ imageData: data });
                                                    this.setState({ width: 274, height: 161 });
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
                            style={{ width: this.state.width, height: this.state.height, borderRadius: 25 , flex: 1}}
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
                        Save(this.state.title, this.state.date, this.state.timestamp, this.state.imageFile);
                        navigation.goBack();
                    }}
                >
                </CustomButton>
            </LogContainer>
        );
    }

}

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
