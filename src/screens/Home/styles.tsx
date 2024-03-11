import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
    border: {

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
        flexDirection: "row",
        width: "100%",
        flexWrap: "wrap",

        justifyContent: "space-around"

    },
    button: {
        width: "45%",
        padding: 5,
        backgroundColor: "#e83b31",
        borderRadius: 9,
        marginVertical: 5,

    },
    textButton: {
        color: "#000",
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center"
    }
});