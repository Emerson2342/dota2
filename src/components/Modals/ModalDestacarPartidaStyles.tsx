import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
        justifyContent: 'center',
        alignItems: 'center',
    },
    carregandoContent: {
        backgroundColor: "#000",
        width: '85%',
        height: 90,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 5
    },
    carregando: {
        color: "#fff",
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold'
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
        width: "75%"
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
    },
    radiantContainer: {
        flexDirection: "row",
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
        backgroundColor: "#000",
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
        textAlign: 'center'
    },
    d: {
        fontWeight: 'bold',
        color: "red",
        width: '7%',
        textAlign: 'center',
    },
    a: {
        fontWeight: 'bold',
        color: "yellow",
        width: '7%',
        textAlign: 'center',
    },
    lhs: {
        fontWeight: 'bold',
        color: "orange",
        width: '10%',
        textAlign: 'center'
    },
    denies: {
        fontWeight: 'bold',
        color: "yellow",
        width: '8%',
        textAlign: 'center',
    },
    hDamage: {
        fontWeight: 'bold',
        color: "orange",
        width: '15%',
        textAlign: 'center'
    },
    tDamage: {
        fontWeight: 'bold',
        color: "yellow",
        width: '15%',
        textAlign: 'center'
    },
    healing: {
        fontWeight: 'bold',
        color: "orange",
        width: '15%',
        textAlign: 'center'
    },
    netWorth: {
        fontWeight: 'bold',
        color: "yellow",
        width: '15%',
        textAlign: 'center'
    }
});