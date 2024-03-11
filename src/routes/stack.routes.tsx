import { createStackNavigator } from "@react-navigation/stack";

const { Screen, Navigator } = createStackNavigator();

import { Home } from "../screens/Home";
import { BuscarPartidasPorId } from "../screens/BuscarPartidasPorId";
import { BuscarPlayers } from "../screens/BuscarPlayers";
import { BuscarProPlayers } from "../screens/BuscarProPlayers";
import { HeroisMaisJogados } from "../screens/HeroisMaisJogados";
import { ListaDeHerois } from "../screens/ListaDeHerois";

export function StackRoutes() {
    return (
        <Navigator>
            <Screen
                name="home"
                component={Home}
                options={{
                    headerShown: false
                }}
            />
            <Screen
                name="buscarPartidasPorId"
                component={BuscarPartidasPorId}
                options={{
                    headerShown: false
                }}
            />
            <Screen
                name='buscarPlayers'
                component={BuscarPlayers}
                options={{
                    headerShown: false
                }}
            />
            <Screen
                name="buscarProPlayers"
                component={BuscarProPlayers}
                options={{
                    headerShown: false
                }}
            />
            <Screen
                name='heroisMaisJogados'
                component={HeroisMaisJogados}
                options={{
                    headerShown: false
                }}
            />
            <Screen
                name='listaDeHerois'
                component={ListaDeHerois}
                options={{
                    headerShown: false
                }}
            />
        </Navigator>






    )
}