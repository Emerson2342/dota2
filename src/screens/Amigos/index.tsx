import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, Modal } from 'react-native';

import { styles } from './styles';
import { MotiView } from 'moti';
import { useKeyCounter } from '../../context/useKeyCounter';
import { useFriendsListContext } from '../../context/useFriendsListContext';
import { ModalAddFriends } from '../../components/Modals/ModalAddFriends';
import { Friend } from '../BuscarPlayers/props';

export function Friends({ navigation }: any) {

    const { friendsFocus, setFriendsFocus, keyCounter, setKeyCounter } = useKeyCounter();

    const { friendsList, setFriendsList } = useFriendsListContext();
    const [modalAddVisible, setModalAddVisible] = useState(false);

    function navToHome() {
        setKeyCounter(keyCounter + 1);
        setFriendsFocus(false);
        setTimeout(() => {
            navigation.goBack()
        }, 900)
    }

    const renderItem = ({ item, index }: { item: Friend, index: number }) => {
        return (
            <View
                style={styles.listaContent}
            >
                <Text
                    style={styles.text}
                >Avatar</Text>
                <Text
                    style={styles.text}
                >{item.friend}</Text>
                <Text
                    style={styles.text}
                >{item.idFriend}</Text>
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <  MotiView
                key={keyCounter + 10}
                from={{ opacity: friendsFocus ? 0 : 1 }}
                animate={{ opacity: friendsFocus ? 1 : 0 }}
                transition={{ duration: 1200, type: 'timing' }}
            >
                <Image
                    style={styles.imageBackground}
                    source={
                        require('../../images/orc.jpg')
                    }
                />
            </MotiView>
            <MotiView
                style={styles.titleContainer}
                key={keyCounter + 20}
                from={{ translateY: friendsFocus ? -150 : 0 }}
                animate={{ translateY: friendsFocus ? 0 : -150 }}
                transition={{ duration: 1000, type: 'timing' }}
            >
                <View
                    style={styles.titleContent}
                >
                    <Text
                        style={styles.titleText}
                    >Lista de Amigos</Text>
                </View>
            </MotiView>
            <View
                style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    borderWidth: 5,
                    borderTopColor: "#3c3c3c",
                    borderLeftColor: "#3c3c3c", alignItems: 'center', marginTop: '5%', width: '95%', alignSelf: 'center'
                }}
            >
                <View
                    style={{ flexDirection: "row", justifyContent: 'space-around', width: '80%' }}
                >
                    <Text style={styles.text}>Avatar</Text><Text style={styles.text}>Nome</Text><Text style={styles.text}>ID Steam</Text>
                </View>
                <FlatList
                    style={styles.flatList}
                    data={friendsList}
                    renderItem={renderItem}
                />
            </View>

            <MotiView
                style={styles.buttonContainer}
                key={keyCounter + 100}
                from={{ translateY: friendsFocus ? 150 : 0 }}
                animate={{ translateY: friendsFocus ? 0 : 150 }}
                transition={{ duration: 1000, type: 'timing' }}
            >
                <TouchableOpacity
                    onPress={navToHome}
                    style={[styles.buttonVoltar, { width: '30%' }]}
                >
                    <Text
                        style={[styles.textVoltar, { color: "#fff", paddingBottom: '4.5%', paddingTop: '4.5%' }]}
                    >V</Text><Text
                        style={[styles.textVoltar, { paddingBottom: '4.5%', paddingTop: '4.5%' }]}
                    >oltar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonVoltar}
                    onPress={() => setModalAddVisible(true)}
                >
                    <Text style={[styles.textVoltar, { color: "#fff" }]}>A</Text><Text style={styles.textVoltar}>dicionar Amigos</Text>
                </TouchableOpacity>
            </MotiView>

            <Modal
                visible={modalAddVisible}
                transparent={true}
            >
                <ModalAddFriends
                    handleClose={() => setModalAddVisible(false)}
                />
            </Modal>

        </View>
    );
}