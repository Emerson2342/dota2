import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { MotiView } from 'moti';
import { useKeyCounter } from '../../context/useKeyCounter';

export function Home({ navigation }: any) {
    const { keyCounter, setKeyCounter, homeFocus, setHomeFocus, playerFocus, setPlayerFocus, setFriendsFocus } = useKeyCounter();

    function resetAnimation() {
        setKeyCounter(keyCounter + 1);
    }

    console.log(keyCounter)
    console.log(homeFocus)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            resetAnimation();
            homeFocus ? setHomeFocus(true) : setHomeFocus(false);
        });
        return unsubscribe;
    }, [navigation]);

    function navToPlayers() {
        setHomeFocus(false)
        setPlayerFocus(true)
        resetAnimation()
        setTimeout(() => {
            navigation.navigate("buscarPlayers")
        }, 900)
    }

    function navToFriends() {
        setHomeFocus(false);
        setFriendsFocus(true);
        setKeyCounter(keyCounter + 1);
        setTimeout(() => {
            navigation.navigate("friends")
        }, 900)
    }

    function navToListaDeHerois() {
        setHomeFocus(false)
        resetAnimation()
        setTimeout(() => {
            navigation.navigate('listaDeHerois');
        }, 900);
    }

    return (
        <View style={styles.container}>
            <  MotiView
                key={keyCounter + 500}
                from={{ opacity: homeFocus ? 0 : 1 }}
                animate={{ opacity: homeFocus ? 1 : 0 }}
                transition={{ duration: 900 }}
            >
                <Image
                    style={{ position: 'absolute' }}
                    source={
                        require('../../images/home.jpg')
                    }
                />
            </MotiView>
            <MotiView
                key={keyCounter}
                from={{ translateY: homeFocus ? -600 : 0, opacity: 1 }}
                animate={{ translateY: homeFocus ? 0 : -600, opacity: 1 }}
                transition={{ type: homeFocus ? 'spring' : 'timing', duration: homeFocus ? 8000 : 1000 }}
                style={{ flex: 1, top: '-25%' }}
            >

                <View
                    style={{ width: "50%", left: 260 }}
                >
                    <Image
                        style={{ resizeMode: 'contain' }}
                        source={
                            require('../../images/corrente.png')
                        }
                    />
                </View>

                <View
                    style={styles.buttonContainer}
                >
                    <TouchableOpacity
                        onPress={navToPlayers}
                        style={styles.button}
                    >
                        <Text style={[styles.textButton, { color: '#fff' }]}>P</Text>
                        <Text style={styles.textButton}>erfil</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={navToFriends}
                        style={styles.button}
                    >
                        <Text style={[styles.textButton, { color: '#fff' }]}>A</Text>
                        <Text style={styles.textButton}>migos</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={navToListaDeHerois}
                        style={styles.button}
                    >
                        <Text style={[styles.textButton, { color: '#fff' }]}>L</Text>
                        <Text style={styles.textButton}>ista de Heróis</Text>
                    </TouchableOpacity>

                </View>
            </MotiView>

        </View >
    );
}