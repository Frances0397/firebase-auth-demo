import { Button, FAB, Portal, Dialog, PaperProvider, TextInput, List } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Input, Chip } from '@rneui/themed';
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown';

export default function UserDialog(openDialog, visible, setVisible) {
    // const [visible, setVisible] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    //DUMMY
    const roles = ["Admin", "Manager", "SUser", "User"];

    return (
        <PaperProvider>
            <View style={styles.container}>
                {/* <Button icon="plus" mode="contained" onPress={() => console.log('Pressed')}>
          </Button> */}
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Dettagli utente</Dialog.Title>
                        <Dialog.Content>
                            <TextInput
                                label="Nome"
                                value={firstName}
                                onChangeText={firstName => setFirstName(firstName)}
                            />
                            <TextInput
                                label="Cognome"
                                value={lastName}
                                onChangeText={lastName => setLastName(lastName)}
                            />
                            <SelectDropdown
                                data={roles}
                                defaultButtonText="Tipologia"
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index)
                                    setType(selectedItem);
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => { return selectedItem }}
                                rowTextForSelection={(item, index) => { return item }}
                            />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog} >Close</Button>
                            <Button onPress={hideDialog}>Save</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
                <StatusBar style="auto" />
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});