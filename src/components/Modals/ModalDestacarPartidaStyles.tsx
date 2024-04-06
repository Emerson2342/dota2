import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.8)",
        justifyContent: 'center',
        alignItems: 'center',
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
    modal: {
        backgroundColor: "#000",
        width: "97%",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "green",
    },
    modalContent: {
        top: 20,
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
    info: {
        flexDirection: 'row',
    },
    radiantContainer: {
        flexDirection: "row",
        borderRadius: 10

    },
    title: {
        fontSize: 30,
        color: "#fff",
        fontStyle: "italic",
        fontWeight: "bold",

    },
    cabecalho: {
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "80%",
        alignSelf: "flex-end",
        padding: 5
    },
    cabecalhoText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
        alignSelf: "flex-end"
    },
    imageHero: {
        width: 45,
        height: 30,
        resizeMode: "contain",
        borderRadius: 3
    },
    imageMedal: {
        height: 30,
        width: 25,
        resizeMode: "contain"
    },
    infoContainer: {
        flexDirection: 'row',
        width: "80%",
        justifyContent: "space-around"
    },
    k: {
        fontWeight: 'bold',
        color: "green",
        width: '7%',
        textAlign: 'center',
        alignSelf: "center"
    },
    d: {
        fontWeight: 'bold',
        color: "red",
        width: '7%',
        textAlign: 'center',
        alignSelf: "center"
    },
    a: {
        fontWeight: 'bold',
        color: "yellow",
        width: '7%',
        textAlign: 'center',
        alignSelf: "center"
    },
    lhs: {
        fontWeight: 'bold',
        color: "orange",
        width: '10%',
        textAlign: 'center',
        alignSelf: "center"
    },
    denies: {
        fontWeight: 'bold',
        color: "yellow",
        width: '8%',
        textAlign: 'center',
        alignSelf: "center"
    },
    hDamage: {
        fontWeight: 'bold',
        color: "orange",
        width: '15%',
        textAlign: 'center',
        alignSelf: "center"
    },
    tDamage: {
        fontWeight: 'bold',
        color: "yellow",
        width: '15%',
        textAlign: 'center',
        alignSelf: "center"
    },
    healing: {
        fontWeight: 'bold',
        color: "orange",
        width: '15%',
        textAlign: 'center',
        alignSelf: "center"
    },
    netWorth: {
        fontWeight: 'bold',
        color: "yellow",
        width: '15%',
        textAlign: 'center',
        alignSelf: "center"
    }
});