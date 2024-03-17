import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        backgroundColor: "#fff",
        width: "95%",
        borderRadius: 5,
        padding: 10,
    },
    modalContent: {
        flexDirection: "row",
        justifyContent: 'space-around'
    },
    button: {
        alignSelf: "center",
        alignItems: "center",
        padding: 5,
        backgroundColor: "#cece",
        borderRadius: 7,
        width: "50%"
    },
    textNome: {
        fontSize: 15,
        fontWeight: "bold"
    },
    textValue: {
        fontSize: 15
    },
    info: {
        flexDirection: 'row'
    }
});