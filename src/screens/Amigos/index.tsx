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
import { usePlayerContext } from '../../context/useDatasContex';


export function Friends({ navigation }: any) {

    const { friendsFocus, setFriendsFocus, keyCounter, setKeyCounter, setPlayerFocus, modalFocus, setModalFocus } = useKeyCounter();
    const { friendDetails, setFriendDetails } = useFriendsListContext();
    const { friendsList, setFriendsList } = useFriendsListContext();
    const { setPlayerId } = usePlayerContext();
    const [id, setId] = useState(0);


    const [modalAddVisible, setModalAddVisible] = useState(false);

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');


    function navToHome() {
        setKeyCounter(keyCounter + 1);
        setFriendsFocus(false);
        setTimeout(() => {
            navigation.goBack()
        }, 900)
    }

    function navToPlayers() {
        setKeyCounter(keyCounter + 17);
        setFriendsFocus(false)
        setPlayerFocus(true)
        setTimeout(() => {
            navigation.navigate("buscarPlayers")
        }, 900)
    }

    const { data, loading, error } = useQuery(GET_PLAYER_DATA,
        {
            variables: { steamAccountId: id },
            skip: id === null,
        });

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

    }, [id, data])

    console.log("Carregando? " + loading)
    console.log("Erro? " + error)

    useEffect(() => {

        const existingFriendIds = new Set(friendDetails.map(friend => friend.idFriend));
        const newFriends = friendsList.filter(friend => !existingFriendIds.has(friend.idFriend));
        const newFriendDetails = newFriends.map(friend => ({
            avatar: '',
            personaname: '',
            name: '',
            account_id: friend.idFriend,
            medal: 0,
            friend: friend.friend,
            idFriend: friend.idFriend,
            att: ''
        }));

        if (newFriendDetails.length > 0) {
            setFriendDetails(prevDetails => [...prevDetails, ...newFriendDetails]);
        }
    }, [friendsList, friendDetails]);


    //console.log(id)
    //console.log("Perfil " + JSON.stringify(friendDetails, null, 2))
    console.log(modalFocus)
    const renderItem = ({ item, index }: { item: FriendDetailsModel, index: number }) => {

        const handlePress = () => {
            const formattedDateTime = `${day}/${month}/${year} às ${hours}:${minutes}:${seconds}`;

            setFriendDetails(prevDetails => prevDetails.map(friend =>
                friend.idFriend === item.idFriend
                    ? { ...friend, att: formattedDateTime }
                    : friend
            ));
        };
        const medalRank = item.medal;
        const avatar = item.avatar;

        return (
            <MotiView
                style={styles.renderItem}
                key={keyCounter + 20}
                from={{ translateX: friendsFocus ? 500 : 0 }}
                animate={{ translateX: friendsFocus ? 0 : 1500 }}
                transition={{ type: 'timing', duration: 5 * (500 * ((1 + index) * 0.5)) }}
            >
                <Text style={styles.text}>{item.friend}</Text>
                <View
                    style={styles.listaContent}
                >

                    <View>
                        <Image
                            style={styles.imageProfile}
                            source={{
                                uri: avatar == '' ? 'fafa' : avatar
                            }}
                        />
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Image
                            style={styles.imageMedal}
                            source={{
                                uri: `${Medal(medalRank)}`
                            }}
                        />

                    </View>
                    <View>
                        <Text style={[styles.text, { fontSize: 17, fontStyle: 'italic' }]}>{item.personaname}</Text>
                        <Text style={[styles.text, { color: 'gray', fontStyle: 'italic' }]}> id: {item.idFriend}</Text>
                    </View>
                    <View
                        style={{ height: '100%' }}
                    >
                        <TouchableOpacity
                            style={{
                                marginTop: "15%",
                                alignItems: "center"
                            }}
                            onPress={() => {
                                navToPlayers();
                                setPlayerId(item.account_id.toString())
                            }}
                        >
                            <Image
                                style={{ width: 30, height: 30 }}
                                source={require('../../images/profile.png')}
                            />
                            <Text style={{ color: "#fff" }}>Abrir Perfil</Text></TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                marginTop: "3%",
                                alignItems: "center"
                            }}
                            onPress={() => {
                                setId(item.idFriend);
                                handlePress()
                            }}
                        >
                            <Image
                                style={{ width: 30, height: 30 }}
                                source={require('../../images/refresh.png')}
                            />
                        </TouchableOpacity>

                    </View>
                </View>

                {item.att.length > 0 ? <Text style={[styles.text, { color: 'gray', fontStyle: 'italic' }]}>Atualizado em {item.att}</Text> : <Text style={[styles.text, { color: 'gray', fontStyle: 'italic' }]}>Favor Atualizar</Text>}
            </MotiView>
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
                    alignItems: 'center', marginTop: '5%', width: '95%', alignSelf: 'center'
                }}
            >
                <FlatList
                    style={styles.flatList}
                    data={friendDetails}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.friend.toString()}
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
                    onPress={() => {
                        setModalAddVisible(true);
                        setModalFocus(true);
                    }}>
                    <Text style={[styles.textVoltar, { color: "#fff" }]}>A</Text><Text style={styles.textVoltar}>dicionar Amigos</Text>
                </TouchableOpacity>
            </MotiView>

            <Modal
                visible={modalAddVisible}
                transparent={true}
            >
                <ModalAddFriends
                    handleClose={() => {
                        setModalAddVisible(false);
                        setId(0);
                    }}
                />
            </Modal>
        </View>
    );
}