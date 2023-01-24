import React, { useEffect, useState } from "react";
import { getMyChat, getMyChats, sendMessage, startNewChat } from "./graphQL";

import * as Styles from "./styles";

interface IMessage {
  sender_id: string;
  sender: "customer" | "supplier";
  message: string;
}

type IChat = {
  id: string;
  customer_id: string;
  supplier_id: string;
  booking: boolean;
  messages: IMessage[];
};

const Chats = () => {
  const [chats, setChats] = useState<IChat[]>([]);

  const [chatSelectedCustomer, setChatSelectedCustomer] = useState<
    IChat | undefined
  >(undefined);
  const [chatSelectedSupplier, setChatSelectedSupplier] = useState<
    IChat | undefined
  >(undefined);

  const [messageCustomer, setMessageCustomer] = useState("");
  const [messageSuppplier, setMessageSuppplier] = useState("");

  const customer_id = "1";
  const supplier_id = "2";

  useEffect(() => {
    getMyChats(customer_id, "customer").then((myChats) => setChats(myChats));
  }, []);

  const handleSendMessageCustomer = async (e: any) => {
    e.preventDefault();
    if (!chatSelectedCustomer) {
      return;
    }

    const new_message = await sendMessage({
      chat_id: chatSelectedCustomer?.id,
      user_id: customer_id,
      booking: false,
      message: messageCustomer,
      sender_type: "customer",
    });

    setChatSelectedCustomer({
      ...chatSelectedCustomer,
      messages: [...chatSelectedCustomer.messages, new_message],
    });
    getMyChat(chatSelectedCustomer.id, supplier_id, "supplier").then(
      (myChat) => {
        console.log(myChat);
        setChatSelectedSupplier({ ...myChat });
      }
    );
    setMessageCustomer("");
  };

  const handleSendMessageSupplier = async (e: any) => {
    e.preventDefault();
    if (!chatSelectedSupplier) {
      return;
    }

    const new_message = await sendMessage({
      chat_id: chatSelectedSupplier?.id,
      user_id: supplier_id,
      booking: false,
      message: messageSuppplier,
      sender_type: "supplier",
    });

    setChatSelectedSupplier({
      ...chatSelectedSupplier,
      messages: [...chatSelectedSupplier.messages, new_message],
    });
    setMessageSuppplier("");

    getMyChat(chatSelectedSupplier.id, customer_id, "customer").then(
      (myChat) => {
        setChatSelectedCustomer({ ...myChat });
      }
    );
  };

  const handleSelectChat = async (chat: IChat) => {
    getMyChat(chat.id, customer_id, "customer").then((myChat) => {
      setChatSelectedCustomer(myChat);
    });

    getMyChat(chat.id, supplier_id, "supplier").then((myChat) => {
      setChatSelectedSupplier(myChat);
    });
  };

  const handleStartNewChat = async () => {
    const new_chat = await startNewChat(customer_id, supplier_id);
    setChats([...chats, new_chat]);
  };

  return (
    <Styles.Container>
      <div>
        <Styles.SideMenu>
          <Styles.PhotoContainer>
            <img
              src="https://media.licdn.com/dms/image/D5603AQENAG6mfTFtnw/profile-displayphoto-shrink_400_400/0/1672033168585?e=1680134400&v=beta&t=MnVWiFHHMp3inURDWDNuNDgkrL4Ss0G5fBf9hvXKxzk"
              alt="profile"
            />
          </Styles.PhotoContainer>
          <Styles.Name>Josef Stein Butzke</Styles.Name>
          <Styles.Divider />
          {chats.map((chat) => (
            <Styles.ChatButton
              key={chat.id}
              onClick={() => handleSelectChat(chat)}
              selected={chat.id === chatSelectedCustomer?.id}
            >
              <Styles.ChatName>{chat.id}</Styles.ChatName>
            </Styles.ChatButton>
          ))}
          <Styles.NewChatButton onClick={() => handleStartNewChat()}>
            <Styles.ChatName>NEW CHAT</Styles.ChatName>
          </Styles.NewChatButton>
        </Styles.SideMenu>
        <Styles.ChatContainer>
          <Styles.ChatContent>
            {chatSelectedCustomer &&
              chatSelectedCustomer.messages.map((message, index) => (
                <Styles.MessageContainer
                  key={index}
                  isMine={message.sender_id === customer_id}
                >
                  <Styles.MessageText>{message.message}</Styles.MessageText>
                </Styles.MessageContainer>
              ))}
          </Styles.ChatContent>
          <form action="submit" onSubmit={handleSendMessageCustomer}>
            <input
              placeholder="write a message to supplier"
              value={messageCustomer}
              onChange={(e) => setMessageCustomer(e.target.value)}
              enterKeyHint="enter"
            />
          </form>
        </Styles.ChatContainer>
        <Styles.ChatContainer>
          <Styles.ChatContent>
            {chatSelectedSupplier?.messages.map((message, index) => (
              <Styles.MessageContainer
                key={index}
                isMine={message.sender_id === supplier_id}
              >
                <Styles.MessageText>{message.message}</Styles.MessageText>
              </Styles.MessageContainer>
            ))}
          </Styles.ChatContent>
          <form action="submit" onSubmit={handleSendMessageSupplier}>
            <input
              placeholder="write a message to customer"
              value={messageSuppplier}
              onChange={(e) => setMessageSuppplier(e.target.value)}
              enterKeyHint="enter"
            />
          </form>
        </Styles.ChatContainer>
      </div>
    </Styles.Container>
  );
};

export default Chats;
