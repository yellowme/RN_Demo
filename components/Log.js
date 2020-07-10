import React from "react";
import styled from "styled-components";
import YourTitle from "./YourTitle";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { Button } from "react-native";
import { LogSchema } from "./LogList";
import { months } from "./LogList"

const richText = React.createRef();

const theme = {
    mode: 'main',
    PRIMARY: "#BD5AEC",
    SECONDARY: "#000",
    THIRD: "#FCFCFC",
    FOURTH: "#F4ECFF",
    FIFTH: "#fff",
    PRIMARY_BTN_SHADOW: "#E9BBFF"
}

let realm = new Realm({ schema: [LogSchema] });

const Save = async (title, date, id) => {

    let html = await richText.current?.getContentHtml();
    html = html.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim();
    let justText = html.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim();
    realm.write(() => {
        let timestamp;
        if (id !== null) {
            timestamp = id;
            realm.create('Log', { id: timestamp, title: title, date: date, content: justText, formattedContent: html }, true);
        } else {
            timestamp = new window.Date().toString();
            realm.create('Log', { id: timestamp, title: title, date: date, content: justText, formattedContent: html });
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
                realm: null
            }
        } else {
            this.state = {
                title: "",
                date: new window.Date(),
                timestamp: null,
                realm: null
            }
        }
    }

    render() {
        return (
            <LogContainer backgroundColor={theme.FOURTH} >
                <YourTitle secondWord="Day" theme={theme} />
                <Date color={theme.SECONDARY}>{months[this.state.date.getMonth()] + " " + this.state.date.getDate() + " " + this.state.date.getFullYear()}</Date>
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
                    />
                </FullEditorContainer>
                <Button title="Save" onPress={() => {
                    Save(this.state.title, this.state.date, this.state.timestamp)
                    this.props.navigation.goBack();
                }} ></Button>
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
