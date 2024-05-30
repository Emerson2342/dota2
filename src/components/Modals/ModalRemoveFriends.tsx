import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, StatusBar, Alert } from 'react-native';
import { FriendDetailsModel, ModalAddFriendsProps } from '../../screens/BuscarPlayers/props';
import { useFriendsListContext } from '../../context/useFriendsListContext';
import { MotiView } from 'moti';
import { useKeyCounter } from '../../context/useKeyCounter';


export function ModalRemoveFriends({ handleClose, idFriend, friend }: { handleClose(): void, idFriend: number, friend: string }) {

    const { friendDetails, setFriendDetails } = useFriendsListContext();

    const { modalFocus, setModalFocus, keyCounter } = useKeyCounter();

    const handleDelete = () => {
        const updatedFriendsList = friendDetails.filter(friend => friend.idFriend !== idFriend);
        alert(JSON.stringify(updatedFriendsList, null, 2))
        setFriendDetails(updatedFriendsList);
        /*  setTimeout(() => {
             handleClose();
         }, 1200)
         setModalFocus(false); */
        handleClose();

    }


    return (
        <MotiView style={styles.container}>
            <StatusBar
                backgroundColor={'rgba(0,0,0,0.5)'}
            />
            <MotiView
                key={keyCounter}
                style={styles.modalContainer}
                from={{ rotateY: modalFocus ? '90deg' : '0deg', opacity: 1 }}
                animate={{ rotateY: modalFocus ? '0deg' : '-90deg', opacity: 1 }}
                transition={{ type: 'timing', duration: 700 }}
            >

                <View>
                    <Text style={styles.textTitle}>
                        Deseja remover <Text style={[styles.textTitle, { color: "yellow" }]}>{friend}</Text> da lista?
                    </Text>
                </View>

                <View
                    style={styles.buttonContainer}
                >
                    <TouchableOpacity
                        style={styles.buttonContent}
                        onPress={() => {
                            setTimeout(() => {
                                handleClose();
                            }, 1200)
                            setModalFocus(false)
                        }}
                    >
                        <Text
                            style={styles.buttonText}
                        >Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonContent}
                        onPress={() => handleDelete()}
                    // onPress={() => console.log(JSON.stringify(friendsList, null, 2))}
                    >
                        <Text
                            style={styles.buttonText}
                        >Remover</Text>
                    </TouchableOpacity>

                </View>
            </MotiView>

        </MotiView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#rgba(0,0,0,0.5)",
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: "#000",
        width: '85%',
        borderWidth: 5,
        borderTopColor: "#3c3c3c",
        borderLeftColor: "#3c3c3c",
    },
    textTitle: {
        fontSize: 20,
        textAlign: 'center',
        padding: '2%',
        fontWeight: 'bold',
        color: '#fff',
        fontStyle: 'italic'
    },
    inputContainer: {
        alignItems: 'center'
    },
    input: {
        marginVertical: '1%',
        padding: '2%',
        backgroundColor: "#fff",
        width: '70%',
        borderRadius: 7,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        padding: '2%'
    },
    buttonContent: {
        backgroundColor: "#050a64",
        borderWidth: 3,
        borderTopColor: "blue",
        borderLeftColor: "blue",
        width: '45%',
        paddingTop: '2%',
        paddingBottom: '2%'
    },
    buttonText: {
        color: "yellow",
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }

})