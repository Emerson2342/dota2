import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 20
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: "90%",
        padding: 10,
        marginTop: 15,

    },
    titleText: {
        fontSize: 25,
        color: "yellow",
        fontStyle: 'italic',
        fontWeight: "bold",
        textAlign: 'center'
    },
    listaHeroi: {
        flexDirection: 'row',
        width: '48%',
        justifyContent: 'space-between',
        backgroundColor: "rgba(0,0,0,0.1)",
        padding: 5,
        margin: 3,
        borderRadius: 5
    },
    image: {
        width: 60,
        height: 40,
        resizeMode: "contain"
    },
    button: {
        top: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 7,
        width: '80%',
        borderRadius: 5,
        backgroundColor: "rgba(0,0,0,0.3)",
        borderWidth: 5,
        borderTopColor: "#3c3c3c",
        borderLeftColor: "#3c3c3c",
    },
    text: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "yellow"
    },

});