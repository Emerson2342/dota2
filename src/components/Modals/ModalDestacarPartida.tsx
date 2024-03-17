import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './ModalDestacarPartidaStyles';

export function ModalDestacarPartida(
    {
        handleClose,
        id,
        data,
        modo,
        heroi,
        kills,
        deaths,
        assists,
        xp,
        gold,
        heroDamage,
        towerDamage,
        lhs
    }:
        {
            handleClose(): void,
            id: number,
            data: string,
            modo: string,
            heroi: number,
            kills: number,
            deaths: number,
            assists: number,
            xp: number,
            gold: number,
            heroDamage: number,
            towerDamage: number,
            lhs: number
        }) {
    return (
        <View style={styles.container}>
            <View
                style={styles.modal}
            >
                <View
                    style={styles.modalContent}>
                    <View>
                        <View style={styles.info}>
                            <Text style={styles.textNome}>Id da partida:</Text><Text style={styles.textValue}> {id}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.textNome}>Data:</Text><Text style={styles.textValue}> {data}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.textNome}>Modo:</Text><Text style={styles.textValue}> {modo}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.textNome}>Herói:</Text><Text style={styles.textValue}>{heroi}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.textNome}>KDA:</Text><Text style={styles.textValue}> {kills}/{deaths}/{assists}</Text>
                        </View>
                    </View>
                    <View>
                        <View style={styles.info}>
                            <Text style={styles.textNome}>XP por minuto:</Text><Text style={styles.textValue}> {xp}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.textNome}>GOLD por minuto:</Text><Text style={styles.textValue}> {gold}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.textNome}>Dano em heróis:</Text><Text style={styles.textValue}> {heroDamage}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.textNome}>Dano em torres:</Text><Text style={styles.textValue}> {towerDamage}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.textNome}>LH's:</Text><Text style={styles.textValue}>{lhs}</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => handleClose()}
                    style={styles.button}>
                    <Text>Fechar</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}