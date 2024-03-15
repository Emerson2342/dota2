import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: 130,
        height: 100,
        borderRadius: 10,
    },
    textName: {
        textAlign: "center",
        fontSize: 15,
        color: "#9999"
    },
    textAtributo: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 25,
        color: "#777"
    },
    modal: {
        backgroundColor: "#000",
        width: "90%",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "red"

    },
    nameContainer: {
        padding: 15
    },
    nameText: {
        textAlign: "center",
        fontSize: 35,
        color: "#e2e2e2",
        fontWeight: "bold"
    },
    info: {
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 15

    },
    atributos: {
        justifyContent: "center",
        flex: 1
    },
    button: {
        backgroundColor: "#c72546",
        width: "50%",
        margin: 15,
        borderRadius: 5,
        alignSelf: "center",

    },
    textButton: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
        padding: 5


    }
})