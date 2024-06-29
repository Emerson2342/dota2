import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: '10%',
        backgroundColor: "#000"
    },
    topContainer: {
        borderTopColor: '#3c3c3c',
        borderLeftColor: '#3c3c3c',
        backgroundColor: "rgba(0,0,0,0.8)",
        borderWidth: 5,
        borderRadius: 5,
        width: '95%',
        zIndex: 1
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 5,
    },
    titleText: {
        fontSize: 25,
        color: "yellow",
        fontStyle: 'italic',
        fontWeight: "bold",
        textAlign: 'center'
    },
    inputContainer: {
        width: '100%',
        zIndex: 1,
        padding: 5,
        alignItems: "center"
    },
    input: {
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 7,
        width: '80%',
        textAlign: 'center',
        fontSize: 17,
    },
    profile: {
        flexDirection: "row",
        alignItems: 'center',
        padding: 15,
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
        color: "aqua",
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
        borderRadius: 7,
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
        fontSize: 25,
        color: "yellow",
        letterSpacing: 1,
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
        height: "55%",
        padding: 5,
        width: "95%",
        alignSelf: 'center'
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: "space-around",
        width: "100%",
        borderRadius: 3,
        marginVertical: 3,
        backgroundColor: "rgba(0,0,0,0.5)",
    },

    listTitle: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    textList: {
        color: '#fff',
        textAlign: 'center',
        alignSelf: "center",
    },
    textTitle: {
        color: "yellow",
        textAlign: 'center',
        alignSelf: "center",
        fontWeight: "bold"
    },

    buttonVoltar: {
        width: "90%",
        flexDirection: "row",
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: "#050a64",
        borderWidth: 5,
        borderTopColor: "blue",
        borderLeftColor: "blue",
    },
    carregandoContent: {
        backgroundColor: "#050a64",
        marginTop: 50,
        borderWidth: 3,
        borderTopColor: "blue",
        borderLeftColor: "blue",
        borderRadius: 5,
        padding: 5,
    },
    carregando: {
        color: "yellow",
        fontSize: 15,
        textAlign: 'center',
    },
});
