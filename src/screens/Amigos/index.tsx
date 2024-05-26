import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, Modal } from 'react-native';

import { styles } from './styles';
import { MotiView } from 'moti';
import { useKeyCounter } from '../../context/useKeyCounter';
import { useFriendsListContext } from '../../context/useFriendsListContext';
import { ModalAddFriends } from '../../components/Modals/ModalAddFriends';
import { FriendDetailsModel, PlayerModel } from '../BuscarPlayers/props';
import { useQuery } from '@apollo/client';
import { GET_PLAYER_DATA } from '../../graphql/queries';
import { ModalFriendDetails } from '../../components/Modals/ModalFriendDetails';
import { Medal } from '../../components/Medals/MedalsList';

export function Friends({ navigation }: any) {

    const { friendsFocus, setFriendsFocus, keyCounter, setKeyCounter } = useKeyCounter();

    const { friendsList, setFriendsList } = useFriendsListContext();
    const [id, setId] = useState(0);


    const [modalAddVisible, setModalAddVisible] = useState(false);
    const [modalFriendDetail, setModalFriendDetail] = useState(false);

    const [friendDetails, setFriendDetails] = useState<FriendDetailsModel[]>([]);

    function navToHome() {
        setKeyCounter(keyCounter + 1);
        setFriendsFocus(false);
        setTimeout(() => {
            navigation.goBack()
        }, 900)
    }

    const { data, loading, error } = useQuery(GET_PLAYER_DATA,
        { variables: { steamAccountId: id } });

    useEffect(() => {
        if (id !== null && data) {
            const newFriendDetails = friendDetails?.map(friend =>
                friend.idFriend === id ? {
                    ...friend, personaname: data.player.steamAccount.name,
                    avatar: data.player.steamAccount.avatar,
                    medal: data.player.steamAccount.seasonRank
                } : friend
            )
            setFriendDetails(newFriendDetails);
        }

    }, [id])

    useEffect(() => {
        const initialFriendDetails = friendsList.map(friend => ({
            avatar: '',
            personaname: '',
            name: '',
            account_id: 0,
            medal: 0,
            friend: friend.friend,
            idFriend: friend.idFriend,
        }));
        setFriendDetails(initialFriendDetails);
    }, [friendsList]);

    console.log(id)
    console.log("Perfil " + JSON.stringify(friendDetails, null, 2))

    const renderItem = ({ item, index }: { item: FriendDetailsModel, index: number }) => {

        const medalRank = item.medal

        return (
            <View >
                <TouchableOpacity
                    style={styles.listaContent}
                    onPress={() => setId(item.idFriend)}
                >
                    <View
                        style={{ backgroundColor: "#000", width: '30%' }}
                    >
                        <Image
                            style={styles.imageMedal}
                            source={{
                                uri: `${Medal(medalRank)}`
                            }}
                        />
                        <Text style={styles.text}>{item.personaname}</Text>

                    </View>
                    <View
                        style={{ width: '70%' }}
                    >
                        <Text style={[styles.text, { fontSize: 30, fontStyle: 'italic' }]}>{item.friend}</Text>
                        <Text style={[styles.text, { color: 'gray', fontStyle: 'italic' }]}> id: {item.idFriend}</Text>
                    </View>


                </TouchableOpacity>
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

                <FlatList
                    style={styles.flatList}
                    data={friendDetails}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.idFriend.toString()}
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

            <Modal
                visible={modalFriendDetail}
                transparent={true}
            >
                <ModalFriendDetails
                    handleClose={() => setModalFriendDetail(false)}
                    id={id}
                />
            </Modal>

        </View>
    );
}