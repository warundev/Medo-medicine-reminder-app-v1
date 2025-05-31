import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 2,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace("/auth");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Use the container style for centering
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0071E3", "#2997FF"]}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View
        style={[
          styles.iconContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Ionicons name="medkit" size={100} color="white" />
        <Text style={styles.appName}>Medo</Text>
        <Text style={styles.subName}>Your Smart Medicine Minder</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
    // Removed marginTop to allow perfect vertical centering
  },
  appName: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 8, // Reduce margin to keep name closer to logo
    letterSpacing: 1,
  },
  subName: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 8,
    letterSpacing: 0.5,
    opacity: 0.85,
    textAlign: "center",
  },
});
