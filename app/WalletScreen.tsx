// WalletScreen.tsx
import 'react-native-get-random-values';
import React from "react";
import { View, Button, Text, Alert } from "react-native";
import { useConnect, useAccounts, useSignMessage, useDisconnect } from "@phantom/react-native-sdk";


export function WalletScreen() {
  const { connect, isConnecting, error: connectError } = useConnect();
  const { addresses, isConnected, walletId } = useAccounts();
  const { signMessage, isSigning } = useSignMessage();
  const { disconnect } = useDisconnect();

  const handleConnect = async () => {
    try {
      await connect({ provider: "google" });
      Alert.alert("Success", "Wallet connected!");
    } catch (error) {
      Alert.alert("Error", `Failed to connect: ${error.message}`);
    }
  };

  const handleSignMessage = async () => {
    try {
      const signature = await signMessage({
        message: "Hello from my React Native app!",
        networkId: "solana:mainnet",
      });
      Alert.alert("Signed!", `Signature: ${signature.slice(0, 10)}...`);
    } catch (error) {
      Alert.alert("Error", `Failed to sign: ${error.message}`);
    }
  };

  if (!isConnected) {
    return (
      <View style={{ padding: 20 }}>
        <Button
          title={isConnecting ? "Connecting..." : "Connect Wallet"}
          onPress={handleConnect}
          disabled={isConnecting}
        />
        {connectError && <Text style={{ color: "red", marginTop: 10 }}>Error: {connectError.message}</Text>}
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Wallet Connected</Text>
      <Text>Wallet ID: {walletId}</Text>
      <Text>Address: {addresses[0]?.address}</Text>

      <Button
        title={isSigning ? "Signing..." : "Sign Message"}
        onPress={handleSignMessage}
        disabled={isSigning}
        style={{ marginTop: 10 }}
      />

      <Button title="Disconnect" onPress={disconnect} style={{ marginTop: 10 }} />
    </View>
  );
}