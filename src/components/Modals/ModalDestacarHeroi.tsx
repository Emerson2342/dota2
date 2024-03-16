import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { PICTURE_HERO_BASE_URL } from '../../constants/player';
import { styles } from './ModalDestacarHeroiStyles';
import int from '../../images/int.png';
import agi from '../../images/agi.png';
import str from '../../images/str.png';
import all from '../../images/all.png';

export function ModalDestacarHeroi({ name, image, handleClose, primary_attr, attack_type, roles }: { name: string, image: string, handleClose(): void, primary_attr: string, attack_type: string; roles: string[] }) {


    let fontImage = PICTURE_HERO_BASE_URL + image + ".png"

    let atributo = "";
    let attImage = null;

    switch (primary_attr) {
        case "int":
            atributo = "Inteligência"
            attImage = int
            break;
        case "agi":
            atributo = "Agilidade"
            attImage = agi
            break;
        case "str":
            atributo = "Força"
            attImage = str
            break;
        case "all":
            atributo = "Universal"
            attImage = all
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
                <Text style={styles.nameText}>{name}</Text>
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
                        />
                        <View
                            style={{ paddingTop: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}
                        >
                            <Image
                                style={{ width: 30, height: 30 }}
                                source={attImage}
                            />
                            <Text style={styles.textAtributo}>
                                {atributo}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={styles.atributos}>

                        <Text style={styles.textAtributo}>
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

