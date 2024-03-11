import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",

    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: '95%',
        margin: 20,
    },
    input: {
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 7,
    },
    buttonBuscar: {
        backgroundColor: "#e83b31",
        width: "30%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    jogadorInfo: {
        marginTop: 50,
        alignItems: "center"
    },
    nomeJogador: {
        fontSize: 30,
        fontWeight: "bold",
        fontStyle: "italic",
        color: "#fff",
    },
    image: {
        height: 150,
        width: 150,
        borderRadius: 5
    },
    text: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold"
    },
    flatListContainer: {
        height: 300,
        overflow: "hidden",
        padding: 5,
        width: "90%"
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: "space-around",
        width: "100%",


    },
    listTitle: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    textList: {
        color: "#fff",
        textAlign: 'center',
        alignSelf: "center",
        fontWeight: "bold"
    }
});