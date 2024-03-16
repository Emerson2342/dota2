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
        top: 250,
        flexDirection: "row",
        width: "100%",
        flexWrap: "wrap",
        justifyContent: "space-around"

    },
    button: {
        width: "40%",
        padding: 5,
        backgroundColor: 'rgb(0,255, 255)',
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