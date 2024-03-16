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
        backgroundColor: "#e83b31",
        width: "30%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
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
    image: {
        height: 100,
        width: 100,
        borderRadius: 20,
    },
    imageMedal: {
        height: 70,
        width: 70,
        position: "absolute",
        top: -20,
        left: 0,
        // backgroundColor: "#fafa"

    },
    textRank: {
        color: "#fff",
        position: "absolute",
        left: 17,
        top: 29,
        width: 40,
        textAlign: 'center',
        fontSize: 13,
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
        borderColor: "green",
        borderWidth: 2,
        borderRadius: 3
    },
    imageHeroD: {
        borderColor: "red"
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
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 3,
        backgroundColor: "rgba(0,0,0,0.5)",
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
        backgroundColor: 'rgba(255,0,0,0.7)',
        borderRadius: 9,
        padding: 5,
        alignSelf: 'center',

    },
});
