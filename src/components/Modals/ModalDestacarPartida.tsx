import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './ModalDestacarPartidaStyles';

export function ModalDestacarPartida() {
    return (
        <View style={styles.container}>
            <View
                style={styles.modal}
            >
                <Text> Patida</Text>
            </View>
        </View>
    );
}