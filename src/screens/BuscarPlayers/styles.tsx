import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
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
        backgroundColor: "red",
        width: "45%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,

    },
    buscarText: {
        fontSize: 20,
    },
    jogadorInfo: {
        alignItems: "center",
    },
    profile: {
        flexDirection: "row",
        alignItems: 'center',
        width: "93%",
    },
    medals: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    nomeJogador: {
        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "italic",
        color: "#fff",
        textAlign: "center",
    },
    title: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 13,
        fontWeight: 'bold'
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 20,
    },
    imageMedal: {
        height: 60,
        width: 60,
        position: "absolute",
        top: 10,
        left: 0,
    },
    textRank: {
        color: "#fff",
        position: "absolute",
        left: 10,
        top: 52,
        width: 40,
        textAlign: 'center',
        fontSize: 10,
        fontWeight: "bold",
    },
    text: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",

    },
    imageHero: {
        width: 53,
        height: 30,
        resizeMode: "contain",
        borderRadius: 3,
        borderWidth: 2,
        borderColor: "rgb(0,255, 0)"
    },
    flatListContainer: {
        height: 500,
        overflow: "hidden",
        padding: 5,
        width: "95%"
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: "space-around",
        width: "100%",
        padding: 1,
        borderRadius: 3,
        borderWidth: 1,
        marginVertical: 3,
        backgroundColor: "rgba(0,0,0,0.7)",
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
    textTitle: {
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
        borderRadius: 5,
        padding: 5,
        alignSelf: 'center',

    },
});
