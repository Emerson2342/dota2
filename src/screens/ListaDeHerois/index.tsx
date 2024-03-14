import React, { useState } from 'react';
import { View, Text, Image, FlatList, Modal, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { HeroesList } from '../../components/Heroes/heroesList';
import { PICTURE_HERO_BASE_URL } from '../../constants/player';
import { Border } from '../../components/Border';
import { ModalDestacarHeroi } from '../../components/Modals/ModalDestacarHeroi';

export function ListaDeHerois() {

    const [modalVisible, setModalVisible] = useState(false)
    const [heroIndex, setHeroIndex] = useState('')

    const listaDeHerois = HeroesList();
    const columns = 6;


    const renderItem = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setModalVisible(true);
                    setHeroIndex(item.name)
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
            <Border />


            <View

                style={{ height: 700, top: 10 }}>
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
                    name={heroIndex}
                />

            </Modal>
        </View>

    );
}