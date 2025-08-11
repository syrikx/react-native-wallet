import 'react-native-get-random-values';
import { Text, View, Button } from "react-native";
import { useState } from "react";
import { PhantomProvider, AddressType } from "@phantom/react-native-sdk";
import { WalletScreen } from "./WalletScreen";



export default function App() {
  const [showWallet, setShowWallet] = useState(false);

  if (showWallet) {
    return (
      <PhantomProvider
        config={{
          organizationId: "org_123456789",
          scheme: "mywalletapp", // Must match app.json scheme
          embeddedWalletType: "user-wallet",
          addressTypes: [AddressType.solana],
          apiBaseUrl: "https://api.phantom.app/v1/wallets",
          authOptions: {
            redirectUrl: "mywalletapp://phantom-auth-callback",
          },
        }}
      >
        <WalletScreen />
      </PhantomProvider>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ marginBottom: 20 }}>Welcome to Wallet App</Text>
      <Button title="Go to Wallet" onPress={() => setShowWallet(true)} />
    </View>
  );
}
