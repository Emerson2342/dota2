import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000"
    },
    imageBackground: {
        position: 'absolute',
        width: '100%',
        aspectRatio: 1,
        resizeMode: 'cover',
        opacity: 0.8
    },
    titleContainer: {
        marginTop: '11%',
        alignItems: 'center',
    },
    titleContent: {
        width: '80%',
        backgroundColor: "rgba(0,0,0,0.8)",
        borderWidth: 5,
        borderTopColor: "#3c3c3c",
        borderLeftColor: "#3c3c3c",
    },
    titleText: {
        padding: '2%',
        color: 'yellow',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    flatList: {
        height: '75%',
        width: '100%',
    },
    renderItem: {
        backgroundColor: "rgba(0,0,0,0.7)",
        borderWidth: 5,
        borderTopColor: "#3c3c3c",
        borderLeftColor: "#3c3c3c",
        alignItems: "center",
        marginVertical: '0.5%',
    },
    listaContent: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    imageMedal: {
        width: 70,
        height: 80,
        resizeMode: 'contain',
    },
    imageProfile: {
        width: 60,
        height: 60,
        borderRadius: 3
    },

    text: {
        color: "#fff",
        textAlign: 'center',
        fontWeight: 'bold'
    },
    buttonContent: {
        flexDirection: "row",
        justifyContent: 'space-between',
        width: '50%',
    },
    icon: {
        width: 20,
        height: 20
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        marginBottom: '5%',
        flexDirection: 'row',
    },
    buttonVoltar: {
        width: "60%",
        borderRadius: 5,
        backgroundColor: "#050a64",
        borderWidth: 5,
        borderTopColor: "blue",
        borderLeftColor: "blue",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',

    },
    textVoltar: {
        textAlign: 'center',
        paddingTop: '2%',
        paddingBottom: '2%',
        color: 'yellow',
        fontSize: 20,
        fontWeight: 'bold'
    }
});