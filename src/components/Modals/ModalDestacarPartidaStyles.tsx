import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.8)",
        alignItems: 'center',
        justifyContent: 'center'
    },
    carregandoContent: {
        width: '85%',
        justifyContent: 'center',
    },
    carregando: {
        color: "#fff",
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonModal: {
        top: 250,
        backgroundColor: "rgb(0,255, 255)",
        width: '70%',
        alignSelf: "center",
        padding: 5,
        borderRadius: 5
    },

    textButtonModal: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: "bold",
        color: "#000"
    },
    modalIluminados: {
        backgroundColor: "#000",
        width: "95%",
        borderRadius: 5,
        marginVertical: 10,
        borderTopColor: 'green',
        borderWidth: 5,
        borderLeftColor: 'green',
        borderRightColor: "#073d12",
        borderBottomColor: "#073d12",
        padding: 5
    },
    modalTemidos: {
        backgroundColor: "#000",
        width: "95%",
        borderRadius: 5,
        marginVertical: 10,
        borderTopColor: 'red',
        borderWidth: 5,
        borderLeftColor: 'red',
        borderRightColor: "#3c1c1c",
        borderBottomColor: "#3c1c1c",
        padding: 5
    },

    button: {
        top: 65,
        alignSelf: "center",
        alignItems: "center",
        padding: 5,
        backgroundColor: "green",
        borderRadius: 7,
        width: "75%",
    },

    buttonFechar: {
        width: "50%",
        alignSelf: 'center',
        flexDirection: "row",
        borderRadius: 5,
        backgroundColor: "#050a64",
        borderWidth: 5,
        borderTopColor: "blue",
        borderLeftColor: "blue",
        padding: 5,
        justifyContent: 'center'
    },
    textButton: {
        color: "yellow",
        fontSize: 20,
        letterSpacing: 1,
        fontWeight: "bold",
        textAlign: 'center',

    },
    textNome: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#fff"
    },
    radiantContainer: {
        flexDirection: "row",
        borderRadius: 5
    },
    title: {
        fontSize: 30,
        color: "#fff",
        fontStyle: "italic",
        fontWeight: "bold",
    },
    cabecalho: {
        flexDirection: "row",
        justifyContent: "center",
        width: "80%",
        alignSelf: "flex-end",
    },
    cabecalhoText: {
        color: "#fff",
        textAlign: "center",
        alignSelf: "center",
    },
    imageHero: {
        width: 40,
        height: 35,
        borderRadius: 3,
        resizeMode: 'center',
    },
    imageMedal: {
        width: 35,
        height: 35,
        resizeMode: 'center',
    },
    infoContainer: {
        flexDirection: 'row',
        width: "80%",
        justifyContent: "center"
    },
    k: {
        color: "green",
        width: '7%',
        textAlign: 'center',
        alignSelf: "center"
    },
    d: {
        color: "red",
        width: '7%',
        textAlign: 'center',
        alignSelf: "center"
    },
    a: {
        color: "yellow",
        width: '7%',
        textAlign: 'center',
        alignSelf: "center"
    },
    lhs: {
        color: "orange",
        width: '10%',
        textAlign: 'center',
        alignSelf: "center"
    },
    denies: {
        color: "yellow",
        width: '8%',
        textAlign: 'center',
        alignSelf: "center"
    },
    hDamage: {
        color: "orange",
        width: '15%',
        textAlign: 'center',
        alignSelf: "center"
    },
    tDamage: {
        color: "yellow",
        width: '15%',
        textAlign: 'center',
        alignSelf: "center"
    },
    healing: {
        color: "orange",
        width: '15%',
        textAlign: 'center',
        alignSelf: "center"
    },
    netWorth: {
        color: "yellow",
        width: '15%',
        textAlign: 'center',
        alignSelf: "center"
    }
});