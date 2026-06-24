import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useHomePage } from "./lib/hooks";
import { Providers } from "./lib/providers";

function HomePageContent() {
	const { data: homePage, isLoading, error } = useHomePage();

	if (isLoading) {
		return <Text style={styles.text}>Loading...</Text>;
	}

	if (error) {
		return <Text style={styles.text}>Error: {error.message}</Text>;
	}

	if (!homePage) {
		return <Text style={styles.text}>No home page set in Payload CMS!</Text>;
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{homePage.title}</Text>
		</View>
	);
}

export default function App() {
	return (
		<Providers>
			<View style={styles.container}>
				<Text style={styles.header}>Camping Inventory</Text>
				<HomePageContent />
				<StatusBar style="auto" />
			</View>
		</Providers>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 20,
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	text: {
		fontSize: 16,
		textAlign: "center",
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		textAlign: "center",
	},
});
