import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import axios from 'axios';

import { styles } from './styles';
import { useQuery, gql } from '@apollo/client';
import { GET_PLAYER_DATA } from '../../graphql/queries';

export function BuscarProPlayers() {
  const playerId = 392743290;

  const { data, loading, error } = useQuery(GET_PLAYER_DATA);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    console.log(error)
    return (
      <View>
        <Text>Ocorreu um erro ao buscar os dados do jogador.</Text>
      </View>
    );
  }

  console.log(JSON.stringify(data, null, 2))
  return (
    <View style={styles.container}>
      <Text>{data.player.winCount}</Text>
    </View>

  );
}