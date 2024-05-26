import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, StatusBar, Alert } from 'react-native';
import { Friend, ModalAddFriendsProps } from '../../screens/BuscarPlayers/props';
import { useFriendsListContext } from '../../context/useFriendsListContext';
import { MotiView } from 'moti';


export function ModalAddFriends({ handleClose }: ModalAddFriendsProps) {

    const { friendsList, setFriendsList } = useFriendsListContext();

    // const [friendsList, setFriendsList] = useState([]);
    const [friendName, setFriendName] = useState('');
    const [friendId, setFriendId] = useState('');

    const handleSalvar = () => {
        const verificarId = /^[0-9]+$/;

        if (friendName === '') {
            Alert.alert('Atenção', "Nome não pode ficar vazio");
        } else if (friendId.length !== 9) {
            Alert.alert('Erro', 'O ID deve conter 9 dígitos');
        } else if (!verificarId.test(friendId)) {
            Alert.alert('Erro', 'O ID do jogador deve conter apenas números');
        } else {
            const newFriend: Friend = {
                friend: friendName.trim(),
                idFriend: parseInt(friendId, 10),
            }
            setFriendsList([...friendsList, newFriend]);

            handleClose();
        }
    }


    return (
        <MotiView style={styles.container}>
            <StatusBar
                backgroundColor={'rgba(0,0,0,0.5)'}
            />
            <View
                style={styles.modalContainer}
            >
                <Text
                    style={styles.textTitle}
                >Adicionar Amigo</Text>
                <View
                    style={styles.inputContainer}
                >
                    <TextInput
                        style={styles.input}
                        placeholder='Digite o nome do jogador'
                        // value={friendName}
                        onChangeText={setFriendName}
                    />
                    <TextInput
                        keyboardType='numeric'
                        style={styles.input}
                        placeholder='Digite o ID do jogador'
                        // value={friendId}
                        onChangeText={setFriendId}
                    />
                </View>
                <View
                    style={styles.buttonContainer}
                >
                    <TouchableOpacity
                        style={styles.buttonContent}
                        onPress={() => {
                            handleClose()
                            console.log(JSON.stringify(friendsList, null, 2))
                        }}
                    >
                        <Text
                            style={styles.buttonText}
                        >Fechar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonContent}
                        onPress={handleSalvar}
                    >
                        <Text
                            style={styles.buttonText}
                        >Salvar</Text>
                    </TouchableOpacity>

                </View>
            </View>

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
        fontSize: 30,
        textAlign: 'center',
        padding: '2%',
        fontWeight: 'bold',
        color: 'yellow',
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