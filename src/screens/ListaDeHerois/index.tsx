import React, { useState } from 'react';
import { View, Text, Image, FlatList, Modal, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { HeroesList } from '../../components/Heroes/heroesList';
import { PICTURE_HERO_BASE_URL } from '../../constants/player';
import { Border } from '../../components/Border';
import { ModalDestacarHeroi } from '../../components/Modals/ModalDestacarHeroi';

export function ListaDeHerois() {

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



    const listaDeHerois = HeroesList();
    const columns = 6;


    const renderItem = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity
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
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <View
                style={{ height: 750, top: 10 }}>
                <FlatList
                    data={listaDeHerois}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={columns}
                    key={columns}
                />
            </View>
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
        </View>

    );
}