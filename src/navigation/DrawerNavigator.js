/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ROUTES} from '../constants/index';
import {NewChatScreen} from '../screens/index';

export default function DrawerNavigator() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Drawer.Screen name={ROUTES.NEW_CHAT} component={NewChatScreen} />
    </Drawer.Navigator>
  );
}
