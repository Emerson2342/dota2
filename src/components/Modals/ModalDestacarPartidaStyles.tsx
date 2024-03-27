import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 420,
        height: 280,
        position: "absolute",
        resizeMode: "stretch",

    },
    modal: {
        backgroundColor: "#fff",
        width: "95%",
        borderRadius: 5,
        padding: 10,
        borderWidth: 2,
        borderColor: "green",
        overflow: "hidden",
        flex: 1

    },
    modalContent: {
        top: 20,
        flexDirection: "row",
        justifyContent: 'space-around',

    },
    button: {
        top: 40,
        alignSelf: "center",
        alignItems: "center",
        padding: 5,
        backgroundColor: "green",
        borderRadius: 7,
        width: "50%"
    },
    textButton: {
        color: "#000",
        fontSize: 20,
        fontWeight: "bold"
    },
    textNome: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#fff"
    },
    textValue: {
        fontSize: 15,
        fontWeight: "bold",
        color: "green"
    },
    info: {
        flexDirection: 'row',
    }
});