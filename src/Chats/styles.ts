import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  padding: 0 5%;
  height: 100vh;
  width: 90%;

  & > div {
    display: flex;
    flex-direction: row;
    margin: auto 0;
    height: 100%;
    width: 100%;
  }
`;

export const SideMenu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #b28dfe;
  height: 80%;
  align-items: center;
  padding: 16px;
  border-radius: 16px;
  margin: auto 0;

  img {
    width: 96px;
    height: 96px;
    border-radius: 48px;
  }
`;

export const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.div`
  margin-top: 16px;
  color: white;
  font-weight: 600;
`;

export const Divider = styled.hr`
  color: white;
  border-style: solid;
  width: 100%;
`;

export const ChatButton = styled.button<{ selected: boolean }>`
  border: 0;
  background-color: ${props => props.selected ? 'greenyellow' : 'white'};
  margin-top: 8px;
  padding: 16px 16px;
  width: 100%;
  border-radius: 8px;

  cursor: pointer;
  
  :hover {
    background-color: greenyellow;

    div {
      color: white;
    }
  }
`;

export const NewChatButton = styled.button`
  border: 0;
  background-color: #b28dfe;
  margin-top: 8px;
  padding: 16px 16px;
  width: 100%;
  border-radius: 8px;

  div {
      color: white;
    }

  cursor: pointer;
  
  :hover {
    background-color: purple;

    filter: brightness(1.4);

    div {
      color: white;
    }
  }
`;

export const ChatName = styled.div`
  color: gray;
  font-weight: 600;
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  background-color: white;
  height: 80%;
  padding: 16px;
  border-radius: 16px;
  margin: auto 16px;
  border: 2px solid #b28dfe;

  
  form {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: auto;

    input {
      width: 100%;
      display: flex;
      flex-direction: row;
      height: 48px;
      border-radius: 16px;
      border: 1px solid gray;
     
      
      font-size: 18px;
      padding-left: 16px;
      color: darkcyan;
    }
  }
`;

export const ChatContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  overflow-y: auto;
  padding-bottom: 48px;
`;

export const MessageContainer = styled.div<{ isMine: boolean }>`
  display: flex;
  flex-direction: row;
  margin-right: ${props => props.isMine ? 'auto' : '0'};
  margin-left: ${props => props.isMine ? '0' : 'auto'};
  background-color: ${props => props.isMine ? 'greenyellow' : '#b1b7d3'};
  margin-top: 4px;
  padding: 8px 16px;
  border-radius: 8px;
`;

export const MessageText = styled.div``;
