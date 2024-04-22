import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "50%",
        backgroundColor: "#000"

    },
    buttonContainer: {
        width: "50%",
        backgroundColor: "rgba(0,0,0,0.8)",
        alignSelf: "flex-end",
        marginRight: 10,
        borderWidth: 5,
        borderTopColor: "#3c3c3c",
        borderLeftColor: "#3c3c3c",
        borderRadius: 8,
        padding: 5,
    },
    button: {
        width: "100%",
        alignSelf: 'flex-end',
        padding: 10,
        backgroundColor: '#050a64',
        borderTopColor: 'blue',
        borderLeftColor: 'blue',
        borderWidth: 5,
        marginVertical: 5,
        borderRadius: 9,
        flexDirection: 'row',
        justifyContent: 'center'

    },
    textButton: {
        color: "yellow",
        fontSize: 20,
        letterSpacing: 1,
        fontWeight: "bold",
        textAlign: "center"
    }
});