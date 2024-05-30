import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, Modal } from 'react-native';

import { styles } from './styles';
import { MotiView } from 'moti';
import { useKeyCounter } from '../../context/useKeyCounter';
import { useFriendsListContext } from '../../context/useFriendsListContext';
import { ModalAddFriends } from '../../components/Modals/ModalAddFriends';
import { ModalRemoveFriends } from '../../components/Modals/ModalRemoveFriends';
import { FriendDetailsModel, PlayerModel } from '../BuscarPlayers/props';
import { Medal } from '../../components/Medals/MedalsList';
import { usePlayerContext } from '../../context/useDatasContex';
import { PLAYER_PROFILE_API_BASE_URL } from '../../constants/player';



export function Friends({ navigation }: any) {

    const { friendsFocus, setFriendsFocus, keyCounter, setKeyCounter, setPlayerFocus, modalFocus, setModalFocus } = useKeyCounter();
    const { friendDetails, setFriendDetails, friendsList, setFriendsList } = useFriendsListContext();
    const { setPlayerId } = usePlayerContext();
    const [player, setPlayer] = useState<PlayerModel | null>(null);
    const [load, setLoad] = useState(false);
    const [id, setId] = useState(0);

    const [indexToRemove, setIndexToRemove] = useState({
        idFriend: 0,
        friend: ''
    })


    const [modalAddVisible, setModalAddVisible] = useState(false);
    const [modalRemoveVisible, setModalRemoveVisible] = useState(false);

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

    const getSearchPlayer = async (url: string) => {

        const response = await fetch(url);
        const data = await response.json();
        setPlayer(data);
        setLoad(false);
        setPlayer(null);
    }

    useEffect(() => {
        if (load) {
            const searchPlayer = `${PLAYER_PROFILE_API_BASE_URL}${id}`;
            getSearchPlayer(searchPlayer);
        }

        if (player && player?.profile) {
            const newFriendDetails = friendDetails?.map(friend =>
                friend.idFriend === id ? {
                    ...friend, personaname: player?.profile.personaname,
                    avatar: player?.profile.avatarfull,
                    medal: player?.rank_tier
                } : friend
            )
            setFriendDetails(newFriendDetails);

            if (player?.leaderboard_rank) {
                const newFriendDetails = friendDetails?.map(friend =>
                    friend.idFriend === id ? {
                        ...friend, personaname: player?.profile.personaname,
                        avatar: player?.profile.avatarfull,
                        medal: player?.rank_tier,
                        leaderboard_rank: player?.leaderboard_rank
                    } : friend
                )
                setFriendDetails(newFriendDetails);
                if (player?.profile.name) {
                    const newFriendDetails = friendDetails?.map(friend =>
                        friend.idFriend === id ? {
                            ...friend, personaname: player?.profile.name,
                            avatar: player?.profile.avatarfull,
                            medal: player?.rank_tier,
                            leaderboard_rank: player?.leaderboard_rank
                        } : friend
                    )
                    setFriendDetails(newFriendDetails);
                }
            }

        } else {
            const newFriendDetails = friendDetails?.map(friend =>
                friend.idFriend === id ? {
                    ...friend, personaname: "Id não encontrado",
                    avatar: undefined,
                    medal: 0
                } : friend
            )
            setFriendDetails(newFriendDetails);
        }
        console.log(JSON.stringify(player, null, 2))

    }, [load, id])





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


    const renderItem = ({ item, index }: { item: FriendDetailsModel, index: number }) => {

        const handlePress = () => {
            const formattedDateTime = `${day}/${month}/${year} às ${hours}:${minutes}:${seconds}`;

            setFriendDetails(prevDetails => prevDetails.map(friend =>
                friend.idFriend === item.idFriend
                    ? { ...friend, att: formattedDateTime }
                    : friend
            ));
        };

        const handleDelete = (idFriend: number, friend: string) => {
            setIndexToRemove({ idFriend, friend })

        }
        const handleDeleteModal = () => {
            setModalRemoveVisible(true);
            setModalFocus(true);
        }
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
                <Text style={[styles.text, { fontSize: 17 }]}>{item.friend}</Text>
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
                    <View
                        style={{ alignItems: "center" }}
                    >
                        <Image
                            style={styles.imageMedal}
                            source={{
                                uri: `${Medal(medalRank)}`
                            }}
                        />
                        <Text style={{ color: "#fff", fontWeight: 'bold', top: -27 }}>{item.leaderboard_rank}</Text>

                    </View>
                    <View
                        style={{ width: '50%' }}
                    >
                        <Text style={[styles.text, { fontSize: 17, fontStyle: 'italic' }]}>{item.personaname}</Text>
                        <Text style={[styles.text, { color: 'gray', fontStyle: 'italic' }]}> id: {item.idFriend}</Text>
                    </View>
                </View>
                <View
                    style={styles.buttonContent}
                >
                    <TouchableOpacity
                        onPress={() => {
                            navToPlayers();
                            setPlayerId(item.account_id.toString())
                        }}
                    >
                        <Image
                            style={styles.icon}
                            source={require('../../images/profile.png')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setId(item.idFriend);
                            setLoad(true);
                            handlePress()
                        }}
                    >
                        <Image
                            style={styles.icon}
                            source={require('../../images/refresh.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPressIn={() => handleDelete(item.idFriend, item.friend)}
                        onPressOut={handleDeleteModal}
                    >
                        <Image
                            style={styles.icon}
                            source={require('../../images/delete.png')}
                        />
                    </TouchableOpacity>
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
                        require('../../images/wallpaper.jpg')
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
            <Modal
                visible={modalRemoveVisible}
                transparent={true}
            >
                <ModalRemoveFriends
                    handleClose={() => {
                        setModalRemoveVisible(false);
                    }}
                    idFriend={indexToRemove.idFriend}
                    friend={indexToRemove.friend}
                />
            </Modal>
        </View>
    );
}