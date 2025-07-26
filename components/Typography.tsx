import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Platform, Text, TextStyle } from "react-native";

interface TypographyProps {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body1"
    | "body2"
    | "caption"
    | "subtitle1"
    | "subtitle2";
  color?: string;
  style?: TextStyle;
  children: React.ReactNode;
  numberOfLines?: number;
  onPress?: () => void;
}

export function Typography({
  variant = "body1",
  color,
  style,
  children,
  numberOfLines,
  onPress,
}: TypographyProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const getTypographyStyle = (): TextStyle => {
    const fontFamily = Platform.select({
      ios: "System",
      android: "Roboto",
      default: "System",
    });

    switch (variant) {
      case "h1":
        return {
          fontSize: 32,
          fontWeight: "700",
          lineHeight: 40,
          fontFamily,
        };
      case "h2":
        return {
          fontSize: 28,
          fontWeight: "600",
          lineHeight: 36,
          fontFamily,
        };
      case "h3":
        return {
          fontSize: 24,
          fontWeight: "600",
          lineHeight: 32,
          fontFamily,
        };
      case "h4":
        return {
          fontSize: 20,
          fontWeight: "600",
          lineHeight: 28,
          fontFamily,
        };
      case "h5":
        return {
          fontSize: 18,
          fontWeight: "600",
          lineHeight: 24,
          fontFamily,
        };
      case "h6":
        return {
          fontSize: 16,
          fontWeight: "600",
          lineHeight: 22,
          fontFamily,
        };
      case "subtitle1":
        return {
          fontSize: 16,
          fontWeight: "500",
          lineHeight: 24,
          fontFamily,
        };
      case "subtitle2":
        return {
          fontSize: 14,
          fontWeight: "500",
          lineHeight: 20,
          fontFamily,
        };
      case "body1":
        return {
          fontSize: 16,
          fontWeight: "400",
          lineHeight: 24,
          fontFamily,
        };
      case "body2":
        return {
          fontSize: 14,
          fontWeight: "400",
          lineHeight: 20,
          fontFamily,
        };
      case "caption":
        return {
          fontSize: 12,
          fontWeight: "400",
          lineHeight: 16,
          fontFamily,
        };
      default:
        return {
          fontSize: 16,
          fontWeight: "400",
          lineHeight: 24,
          fontFamily,
        };
    }
  };

  const textStyle: TextStyle = {
    ...getTypographyStyle(),
    color: color || colors.text,
    ...style,
  };

  return (
    <Text style={textStyle} numberOfLines={numberOfLines} onPress={onPress}>
      {children}
    </Text>
  );
}
