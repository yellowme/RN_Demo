import React from "react";
import styled from "styled-components";
import YourTitle from "./YourTitle";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { Button } from "react-native";

export default Log = props => {
    const richText = React.createRef();

    const Save = async () => {
        let html = await richText.current?.getContentHtml();
        html = html.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim();
        // console.log(html);
        alert(html);
    }


    return(
        <LogContainer backgroundColor={ props.theme.FOURTH }>
            <YourTitle secondWord="Day" theme={ props.theme } />
            <Date color={ props.theme.SECONDARY } >{ props.date }</Date>
            <FullEditorContainer>
                <EditorContainer>
                    <Title placeholder="Name your log" />
                    <RichEditor
                        editorStyle={{ backgroundColor: props.theme.THIRD }}
                        style={[{ minHeight: 380, flex: 1}, props.theme.THIRD]}
                        ref={ richText }
                        useContainer={ false }
                        initialContentHTML={'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'}
                    />
                </EditorContainer>
                <RichToolbar
                    editor={ richText }
                    iconTint={ props.theme.SECONDARY }
                    style={[{ backgroundColor: props.theme.FOURTH, marginTop: 26 }, props.theme.FOURTH]}
                />
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
    background: #FCFCFC;
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
    color: #000;
`;