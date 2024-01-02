import { Button, FAB, Portal, Dialog, PaperProvider, TextInput, List, Provider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Input, Chip } from '@rneui/themed';
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default function UserDialog(visible, setVisible) {
    // const [visible, setVisible] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    console.log("visible");
    console.log(visible);

    // @TODO - axios.get dei ruoli possibili

    //DUMMY
    const roles = ["Admin", "Manager", "SUser", "User"];

    //User creation
    const auth = getAuth();

    const onSave = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("signed up");
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
            });
        setVisible(false);
    }

    return (
        // <Provider>
        <Portal>
            < Dialog visible={visible.visible} onDismiss={() => visible.setVisible(false)} style={{ zIndex: 1000 }}>
                <Dialog.Title>Dettagli utente</Dialog.Title>
                <Dialog.Content>
                    <View style={styles.inputContainer}>
                        <TextInput
                            mode="outlined"
                            label="Email"
                            value={newEmail}
                            onChangeText={newEmail => setNewEmail(newEmail)}></TextInput>
                        <TextInput
                            mode="outlined"
                            label="Password"
                            value={newPassword}
                            onChangeText={newPassword => setNewPassword(newPassword)}
                            secureTextEntry
                            right={<TextInput.Icon icon="eye" />}></TextInput>
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
                    </View>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => visible.setVisible(false)} >Close</Button>
                    <Button onPress={onSave}>Save</Button>
                </Dialog.Actions>
            </Dialog >
        </Portal>
        // </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between"
    }
});