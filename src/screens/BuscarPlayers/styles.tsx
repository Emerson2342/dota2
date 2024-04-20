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
        zIndex: 1
    },
    input: {
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 7,
    },
    buttonBuscar: {
        backgroundColor: "#050a64",
        width: "45%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        borderTopColor: 'blue',
        borderLeftColor: 'blue',
        borderWidth: 5,
    },
    buscarText: {
        fontSize: 20,
        color: "yellow",
        letterSpacing: 1,
        fontWeight: "bold",
    },
    jogadorInfo: {
        alignItems: "center",
    },
    profile: {
        flexDirection: "row",
        alignItems: 'center',
        padding: 15,
        backgroundColor: "rgba(0,0,0,0.7)",
        borderWidth: 5,
        borderTopColor: "#3c3c3c",
        borderLeftColor: "#3c3c3c",
        borderRadius: 8,
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
        fontSize: 20,
        color: "yellow",
        letterSpacing: 1,
        fontWeight: "bold",
        padding: 5
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
        height: 450,
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
        color: "yellow",
        textAlign: 'center',
        alignSelf: "center",
        fontWeight: "bold"
    },
    buttonVoltar: {
        alignItems: 'center',
        backgroundColor: '#050a64',
        borderRadius: 5,
        padding: 5,
        borderTopColor: 'blue',
        borderLeftColor: 'blue',
        borderWidth: 5,
    },
    carregandoContent: {
        top: 150,
        backgroundColor: "#000000",
        width: '85%',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: "rgb(0,255, 255)",
        borderRadius: 5,
        padding: 10,
    },
    carregando: {
        color: "#fff",
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
