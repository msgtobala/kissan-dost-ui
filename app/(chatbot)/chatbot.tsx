import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ChatMessage } from "../../types/chatbot";

// Mock data using the existing ChatMessage type
const mockMessages: ChatMessage[] = [
  {
    cid: "1",
    uid: "user123",
    question: "How can I improve my crop yield?",
    response:
      "To improve your crop yield, consider soil testing, proper irrigation, crop rotation, and using quality seeds. Also ensure adequate spacing and timely pest management.",
  },
  {
    cid: "2",
    uid: "user123",
    question: "What are the best practices for organic farming?",
    response:
      "Organic farming best practices include crop rotation, composting, natural pest control, avoiding synthetic chemicals, and maintaining soil health through cover crops.",
  },
  {
    cid: "3",
    uid: "user123",
    question: "How often should I water my vegetables?",
    response:
      "Most vegetables need 1-2 inches of water per week. Water deeply and less frequently rather than shallow and often. Check soil moisture before watering.",
  },
];

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (inputText.trim() === "") return;

    const newMessage: ChatMessage = {
      cid: Date.now().toString(),
      uid: "user123",
      question: inputText,
      response:
        "Thank you for your question! I'm here to help with your farming queries. This is a demo response - in a real app, this would be processed by an AI service.",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
    }, 6500);
  };

  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const renderMessage = ({
    item,
    index,
  }: {
    item: ChatMessage;
    index: number;
  }) => {
    const isUser = index % 2 === 0; // Alternate between user and bot for demo

    return (
      <View style={styles.messageContainer}>
        <View
          style={isUser ? styles.messageWrapperUser : styles.messageWrapper}
        >
          {!isUser && (
            <View style={styles.botAvatar}>
              <Ionicons name={"leaf"} size={20} color={"#10a37f"} />
            </View>
          )}
          <View
            style={[
              styles.messageBubble,
              isUser ? styles.userBubble : styles.botBubble,
              isUser ? styles.userBubbleAlign : styles.botBubbleAlign,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                isUser ? styles.userText : styles.botText,
              ]}
            >
              {isUser ? item.question : item.response}
            </Text>
          </View>
          {isUser && (
            <View style={styles.userAvatar}>
              <Ionicons name={"person"} size={20} color={"#fff"} />
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={"padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 30}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.botAvatar}>
              <Ionicons name="leaf" size={24} color="#10a37f" />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Kissan Assistant</Text>
              <Text style={styles.headerSubtitle}>Your farming companion</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="ellipsis-vertical" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.cid}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />

        {/* Typing indicator */}
        {isTyping && (
          <View style={styles.typingContainer}>
            <View style={styles.messageWrapper}>
              <View style={styles.botAvatar}>
                <Ionicons name="leaf" size={20} color="#10a37f" />
              </View>
              <View style={styles.typingBubble}>
                <View style={styles.typingDots}>
                  <View style={[styles.dot, styles.dot1]} />
                  <View style={[styles.dot, styles.dot2]} />
                  <View style={[styles.dot, styles.dot3]} />
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Message Kissan Assistant..."
              placeholderTextColor="#9ca3af"
              multiline
              maxLength={500}
              returnKeyType="send"
              onSubmitEditing={sendMessage}
              blurOnSubmit={false}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                inputText.trim() === "" && styles.sendButtonDisabled,
              ]}
              onPress={sendMessage}
              disabled={inputText.trim() === ""}
            >
              <Ionicons
                name="send"
                size={18}
                color={inputText.trim() === "" ? "#9ca3af" : "#fff"}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.inputFooter}>
            Kissan Assistant can make mistakes. Consider checking important
            information.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f0fdf4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  userAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#10a37f",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 1,
  },
  menuButton: {
    padding: 8,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 8,
  },
  messageContainer: {
    marginBottom: 0,
  },
  messageWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageWrapperUser: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    marginLeft: "40%",
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  userMessage: {
    backgroundColor: "#f7f7f8",
  },
  botMessage: {
    backgroundColor: "#ffffff",
  },
  messageBubble: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    maxWidth: "75%",
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: "#10a37f",
    borderRadius: 18,
    borderBottomRightRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginLeft: 8,
    shadowColor: "#10a37f",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  botBubble: {
    backgroundColor: "#f0fdf4",
    borderRadius: 18,
    borderBottomLeftRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#e0f2ef",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  userBubbleAlign: {
    alignSelf: "flex-end",
  },
  botBubbleAlign: {
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#374151",
  },
  userText: {
    color: "#fff",
  },
  botText: {
    color: "#374151",
  },
  typingContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
  },
  typingBubble: {
    flex: 1,
    paddingVertical: 8,
  },
  typingDots: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#9ca3af",
    marginHorizontal: 2,
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.7,
  },
  dot3: {
    opacity: 1,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#374151",
    maxHeight: 120,
    paddingVertical: 0,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#10a37f",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: "#f3f4f6",
  },
  inputFooter: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 16,
  },
});
