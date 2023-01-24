import { gql } from "@apollo/client";
import client from "../services/api-graphql";

type ISendMessage = {
  chat_id: string;
  user_id: string;
  sender_type: 'customer' | 'supplier';
  booking: boolean;
  message: string;
}

const startNewChat = async (customer_id: string, supplier_id: string) => {
  const results = await client.mutate({
    mutation: gql`
      mutation ($customerId: String!, $supplierId: String!) {
        startChat(customerId: $customerId, supplierId: $supplierId) {
          id
        }
      }    
    `,
    variables: {
      customerId: customer_id,
      supplierId: supplier_id
    }
  });

  return results.data.startChat;
}

const getMyChat = async (chat_id: string, user_id: string, sender_type: 'customer' | 'supplier') => {
  const results = await client.query({
    query: gql`
      query($chatId: String!, $userId: String!, $senderType: String!) {
        myChat(chatId: $chatId, userId: $userId, senderType: $senderType) {
          id
          messages {
            sender_id
            message
          }
        }
      }
    `,
    variables: {
      chatId: chat_id,
      userId: user_id,
      senderType: sender_type
    }
  });

  return results.data.myChat;
}

const getMyChats = async (user_id: string, sender_type: 'customer' | 'supplier') => {
  const results = await client.query({
    query: gql`
      query($userId: String!, $senderType: String!) {
        myChats(userId: $userId, senderType: $senderType) {
          id
        }
      }
    `,
    variables: {
      userId: user_id,
      senderType: sender_type
    }
  });

  return results.data.myChats;
}

const sendMessage = async ({ chat_id, user_id, sender_type, booking, message }: ISendMessage) => {
  const results = await client.mutate({
    mutation: gql`
      mutation (
        $chatId: String!
        $senderId: String!
        $sender: String!
        $message: String!
        $booking: Boolean!
      ) {
        sendMessage(
          chatId: $chatId
          senderId: $senderId
          sender: $sender
          message: $message
          booking: $booking
        ) {
          message
          sender_id
          sender
        }
      }
    `,
    variables: {
      chatId: chat_id,
      senderId: user_id,
      sender: sender_type,
      message: message,
      booking: booking
    }
  });

  return results.data.sendMessage;
}

export { getMyChats, sendMessage, getMyChat, startNewChat };