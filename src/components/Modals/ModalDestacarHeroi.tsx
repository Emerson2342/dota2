import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { PICTURE_HERO_BASE_URL } from '../../constants/player';

export function ModalDestacarHeroi({ name, handleClose }: { name: string, handleClose(): void }) {


    let fontImage = PICTURE_HERO_BASE_URL + name + ".png"


    return (
        <View
            style={styles.container}>
            <View
                style={styles.modal}
            >
                <Text>{name}</Text>
                <Image
                    style={styles.image}
                    source={{
                        uri: fontImage
                    }}
                    onError={(error) => console.error("Erro ao carregar a imgae: ", error)}
                />
                <TouchableOpacity
                    onPress={() => handleClose()}
                >
                    <Text>Voltar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: 160,
        height: 150,
        resizeMode: "contain"
    },
    modal: {
        alignItems: "center",
        backgroundColor: "#fff",
        width: "75%",
        borderRadius: 5

    }
})