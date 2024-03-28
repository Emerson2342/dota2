import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
    logoContainer: {
        padding: 50
    },
    imageLogo: {
        margin: 50,
        width: 200,
        resizeMode: "contain"
    },
    buttonContainer: {
        top: 350,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around"

    },
    button: {
        width: "40%",
        padding: 10,
        backgroundColor: 'red',
        marginVertical: 5,
        borderRadius: 9,
    },
    textButton: {
        color: "#000",
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center"
    }
});