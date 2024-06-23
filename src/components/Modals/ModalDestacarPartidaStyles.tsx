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
    detalhesContainer: {
        backgroundColor: '#000',
        borderWidth: 3,
        borderColor: '#3c3c3c',
        borderRadius: 5
    },
    detalhesContext: {
        flexDirection: 'row',
        justifyContent: "space-around",
        width: '90%',
    },
    textDetails: {
        alignItems: "center",
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: "yellow",
        padding: '1%'
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
        width: "100%",
        borderRadius: 5,
        marginVertical: 5,
        borderWidth: 2,
        borderColor: "green",
        padding: 1
    },
    modalTemidos: {
        backgroundColor: "#000",
        width: "100%",
        borderRadius: 5,
        marginVertical: 5,
        borderWidth: 2,
        borderColor: "red",
        padding: 1
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
        marginTop: '7%',
        width: "50%",
        alignSelf: 'center',
        flexDirection: "row",
        borderRadius: 5,
        backgroundColor: "#050a64",
        borderWidth: 3,
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
        borderRadius: 3,
        width: '100%'
    },
    playerDestaque: {
        borderWidth: 2,
        borderColor: "rgba(0,255, 255, 0.9)",
    },
    title: {
        fontSize: 23,
        color: "#fff",
        fontStyle: "italic",
        fontWeight: "bold",
    },
    cabecalho: {
        flexDirection: "row",
        justifyContent: "center",
        width: "77%",
        alignSelf: "flex-end",
    },
    cabecalhoText: {
        color: "#fff",
        textAlign: "center",
        alignSelf: "center",
    },
    imageHero: {
        width: 40,
        height: 'auto',
        resizeMode: 'contain',
    },
    imageMedal: {
        width: 40,
        height: 40,
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
        width: '6%',
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
        width: '17%',
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
        width: '17%',
        textAlign: 'center',
        alignSelf: "center"
    }
});