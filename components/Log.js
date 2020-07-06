import React from "react";
import styled from "styled-components";
import YourTitle from "./YourTitle";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { Button } from "react-native";

export default Log = props => {
    const richText = React.createRef();

    const [title, setTitle] = React.useState("");

    const Save = async () => {
        let html = await richText.current?.getContentHtml();
        html = html.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim();
        alert( `TITLE: ${title} HTML: ${html}`);
    }

    return(
        <LogContainer backgroundColor={ props.theme.FOURTH }>
            <YourTitle secondWord="Day" theme={ props.theme } />
            <Date color={ props.theme.SECONDARY } >{ props.date }</Date>
            <FullEditorContainer>
                <EditorContainer backgroundColor={ props.theme.THIRD }>
                    <Title
                        color={ props.theme.SECONDARY }
                        placeholder="Name your log"
                        onChangeText={ text =>  setTitle(text) }
                        value={ props.value }
                    />
                    <RichEditor
                        editorStyle={{ backgroundColor: props.theme.THIRD }}
                        style={[{ minHeight: 380, flex: 1}, props.theme.THIRD]}
                        ref={ richText }
                        useContainer={ false }
                        placeholder="Write here you story..."
                        initialContentHTML={props.richText}
                    />
                </EditorContainer>
                <RichToolbar
                    editor={ richText }
                    iconTint={ props.theme.SECONDARY }
                    style={[{ backgroundColor: props.theme.FOURTH, marginTop: 26 }, props.theme.FOURTH]}
                />
                {/* <Button title="Save" onPress={ () => Save() } ></Button> */}
            </FullEditorContainer>
        </LogContainer>
    );
}

const LogContainer = styled.View`
    flex: 1;
    background-color: ${ props => props.backgroundColor };
    padding: 22px 16px;
`;
const Date = styled.Text`
    font-family: Noto Sans JP;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 26px;
    color: ${ props => props.color }
`;
const FullEditorContainer = styled.View`
    flex: 1;
    flex-direction: column-reverse;

`;
const EditorContainer = styled.ScrollView`
    flex:1;
    background: ${ props => props.backgroundColor };
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
    color: ${ props => props.color };
`;