import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
import { FriendDetailsModel, ModalAddFriendsProps } from '../../screens/BuscarPlayers/props';
import { MotiView } from 'moti';
import { useQuery } from '@apollo/client';
import { GET_PLAYER_DATA } from '../../graphql/queries';


export function ModalFriendDetails({ handleClose, id }: { handleClose(): ModalAddFriendsProps, id: number }) {






    function handlePress() {
        const { data, loading, error } = useQuery(GET_PLAYER_DATA,
            { variables: { steamAccountId: id } });
        console.log(JSON.stringify(data, null, 2))
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
                >{id}</Text>

                <View
                    style={styles.buttonContainer}
                >
                    <TouchableOpacity
                        style={styles.buttonContent}
                        onPress={() => {
                            handleClose()

                        }}
                    >
                        <Text
                            style={styles.buttonText}
                        >Fechar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonContent}

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