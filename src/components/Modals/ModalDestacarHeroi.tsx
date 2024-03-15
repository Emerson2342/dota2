import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { PICTURE_HERO_BASE_URL } from '../../constants/player';
import { styles } from './ModalDestacarHeroiStyles';

export function ModalDestacarHeroi({ name, image, handleClose, primary_attr, attack_type, roles }: { name: string, image: string, handleClose(): void, primary_attr: string, attack_type: string; roles: string[] }) {


    let fontImage = PICTURE_HERO_BASE_URL + image + ".png"

    let atributo = ""

    switch (primary_attr) {
        case "int":
            atributo = "Inteligência"
            break;
        case "agi":
            atributo = "Agilidade"
            break;
        case "str":
            atributo = "Força"
            break;
        case "all":
            atributo = "Universal"
            break;
        default:
            alert("Atributo inválido!")
    }


    return (
        <View
            style={styles.container}>
            <View
                style={styles.modal}
            >
                <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>{name}</Text>
                </View>
                <View
                    style={styles.info}
                >
                    <View>
                        <Image
                            style={styles.image}
                            source={{
                                uri: fontImage
                            }}
                            onError={(error) => console.error("Erro ao carregar a imgae: ", error)}
                        /></View>
                    <View
                        style={styles.atributos}>
                        <Text style={styles.textAtributo}>
                            {atributo}
                        </Text>
                        <Text style={[styles.textAtributo, { fontSize: 20 }]}>
                            {attack_type}
                        </Text>
                        <Text style={styles.textName}>
                            {roles.map((role, index) => index !== roles.length - 1 ? `${role}, ` : role)}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleClose()}
                >
                    <Text style={styles.textButton}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

