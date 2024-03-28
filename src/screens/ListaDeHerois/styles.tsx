import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        paddingTop: 20

    },
    image: {
        width: 60,
        height: 40,
        resizeMode: "contain"
    },
    button: {
        backgroundColor: "red",
        top: 20,
        padding: 7,
        borderRadius: 5,
        width: '80%'
    },
    text: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold"
    },

});