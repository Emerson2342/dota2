import React, { useState } from 'react';
import { View, Text, Image, FlatList, Modal, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { HeroesList } from '../../components/Heroes/heroesList';
import { PICTURE_HERO_BASE_URL } from '../../constants/player';
import { ModalDestacarHeroi } from '../../components/Modals/ModalDestacarHeroi';

import { useKeyCounter } from '../../context/useKeyCounter';

export function ListaDeHerois({ navigation }: any) {

    const { keyCounter, setKeyCounter, setHomeFocus } = useKeyCounter();

    function resetAnimation() {
        setKeyCounter(keyCounter + 1);
        setHomeFocus(true);
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [heroIndex, setHeroIndex] = useState({
        id: 0,
        name: "",
        localized_name: "",
        primary_attr: "",
        attack_type: "",
        roles: [
            "",
            "",
            ""
        ],
        "legs": 0
    });

    function navToHome() {
        navigation.goBack();
        resetAnimation();
    }

    const columns = 2;


    const renderItem = ({ item }: { item: any }) => {
        let atributo;

        switch (item.primary_attr) {
            case "all":
                atributo = "Universal";
                break;
            case "str":
                atributo = "Força";
                break;
            case "agi":
                atributo = "Agilidade";
                break;
            case "int":
                atributo = "Inteligência";
                break;
        }


        return (
            <TouchableOpacity
                style={styles.listaHeroi}
                onPress={() => {
                    setModalVisible(true);
                    setHeroIndex({
                        id: item.id,
                        name: item.name,
                        localized_name: item.localized_name,
                        primary_attr: item.primary_attr,
                        attack_type: item.attack_type,
                        roles: item.roles.slice(0, 5),
                        legs: item.legs
                    })
                }}
            >
                <Image
                    style={styles.image}
                    source={{
                        uri: PICTURE_HERO_BASE_URL + item.name + ".png"
                    }}
                    onError={(error) => console.error("Erro ao carregar a imgae: ", error)}
                />
                <View
                    style={{ alignSelf: 'center' }}
                >
                    <Text
                        style={{ color: "yellow", textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}
                    >{item.localized_name}</Text>
                    <Text
                        style={{ color: '#fff', textAlign: 'center' }}
                    >{atributo}</Text>
                </View>
                <View></View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <Image
                style={{ position: 'absolute', opacity: 0.7 }}
                source={
                    require('../../images/orc.jpg')
                }
            />
            <View
                style={styles.titleContainer}
            >
                <Text
                    style={[styles.titleText, { color: "#fff" }]}>
                    H
                </Text>
                <Text
                    style={styles.titleText}>
                    eróis
                </Text>
            </View>
            <View
                style={{ height: 550, paddingTop: 15 }}
            >
                <FlatList
                    data={HeroesList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={columns}
                    key={columns}
                />
            </View>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navToHome()}
            >
                <View
                    style={styles.button}
                >
                    <Text
                        style={[styles.text, { color: "#fff" }]}
                    >V</Text>
                    <Text
                        style={styles.text}
                    >oltar</Text>
                </View>
            </TouchableOpacity>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType='fade'
            >
                <ModalDestacarHeroi
                    handleClose={() => setModalVisible(false)}
                    image={heroIndex.name}
                    name={heroIndex.localized_name}
                    primary_attr={heroIndex.primary_attr}
                    attack_type={heroIndex.attack_type}
                    roles={heroIndex.roles}
                />

            </Modal>

        </View >

    );
}