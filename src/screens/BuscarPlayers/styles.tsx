import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        //justifyContent: "center",
        alignItems: "center",

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
        alignItems: "center"
    },
    profile: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        width: "80%"
    },
    nomeJogador: {
        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "italic",
        color: "#fff",
        width: "100%",
        textAlign: "center"
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 20
    },
    text: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",

    },
    flatListContainer: {
        height: 500,
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
        justifyContent: "space-around",
        padding: 10
    },
    textList: {
        color: "#fff",
        textAlign: 'center',
        alignSelf: "center",
        fontWeight: "bold"
    },
    textListV: {
        color: "green",
        textAlign: 'center',
        alignSelf: "center",
        fontWeight: "bold"
    },
    textListD: {
        color: "red",
        textAlign: 'center',
        alignSelf: "center",
        fontWeight: "bold"
    },
    buttonVoltar: {
        top: 30,
        width: "85%",
        marginTop: 15,
        alignItems: "center",
        backgroundColor: 'red',
        borderRadius: 9,
        padding: 5,
        alignSelf: 'center'

    },
});
