import { Button, FAB, Portal, Dialog, PaperProvider, TextInput, List, Provider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Input, Chip } from '@rneui/themed';
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default function UserDialog({ visible, setVisible }) {
    // const [visible, setVisible] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [role, setRole] = useState("");
    const [type, setType] = useState("");
    const [roles, setRoles] = useState({});
    const [types, setTypes] = useState({});

    console.log("visible");
    console.log(visible);

    // @TODO - axios.get dei ruoli possibili
    useEffect(() => {
        console.log("useEffect");
        fetchTypes();
        fetchRoles();

        console.log(roles);
        console.log(types);
    }, []);

    const fetchTypes = async () => {
        await axios.get("http://192.168.1.12:3000/user/type").then(
            function (res) {
                console.log(res.data);
                setTypes(res.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    const fetchRoles = async () => {
        await axios.get("http://192.168.1.12:3000/user/profile").then(
            function (res) {
                console.log(res.data);
                setRoles(res.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    //DUMMY
    // const roles = ["Admin", "Manager", "SUser", "User"];
    // const types = ["Funzionale", "Sviluppatore"];
    console.log(roles);
    console.log(types);

    //User creation
    const auth = getAuth();

    const onSave = () => {
        let created = false;
        createUserWithEmailAndPassword(auth, newEmail, newPassword)
            .then((userCredential) => {
                console.log("signed up");
                created = true;
                saveUserToDB(newEmail, firstName, lastName, role, type);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
            });

        console.log(created);

        // if (created) {
        //     console.log("Saving to DB");
        //     saveUserToDB(newEmail, firstName, lastName, role, type);
        // }

        setVisible(false);
    }

    const saveUserToDB = async (email, firstname, lastname, role, type) => {
        var userData = { email: email, firstname: firstname, lastname: lastname, profile: role };
        var resourceData = { name: firstname, surname: lastname, resource_type: type };

        console.log(userData);
        console.log(resourceData);
        //saving user
        await axios.post("http://192.168.1.12:3000/user", userData).then(
            function (res) {
                console.log(res);
                console.log("user saved");
            }
        ).catch(function (error) {
            console.error(error);
        })

        //saving resource
        await axios.post("http://192.168.1.12:3000/resource", resourceData).then(
            function (res) {
                console.log(res);
                console.log("resource saved");
            }
        ).catch(function (error) {
            console.error(error);
        })
    }

    return (
        // <Provider>
        <Portal>
            < Dialog visible={visible} onDismiss={() => setVisible(false)} style={{ zIndex: 1000 }}>
                <Dialog.Title>Dettagli utente</Dialog.Title>
                <Dialog.Content>
                    <View style={styles.inputContainer}>
                        <TextInput
                            mode="outlined"
                            label="Email"
                            value={newEmail}
                            onChangeText={newEmail => setNewEmail(newEmail)}
                            style={styles.inputBoxes}></TextInput>
                        <TextInput
                            mode="outlined"
                            label="Password"
                            value={newPassword}
                            onChangeText={newPassword => setNewPassword(newPassword)}
                            secureTextEntry
                            right={<TextInput.Icon icon="eye" />}
                            style={styles.inputBoxes}></TextInput>
                        <View styles={{ flexDirection: "row" }}>
                            <TextInput
                                label="Nome"
                                value={firstName}
                                onChangeText={firstName => setFirstName(firstName)}
                                style={[styles.inputBoxes, { width: "30%" }]}
                            />
                            <TextInput
                                label="Cognome"
                                value={lastName}
                                onChangeText={lastName => setLastName(lastName)}
                                style={[styles.inputBoxes, { width: "30%" }]}
                            />
                        </View>
                        <SelectDropdown
                            data={roles}
                            defaultButtonText="Tipologia utente"
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem.profile, index);
                                setRole(selectedItem.profile);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => { return selectedItem.profile }}
                            rowTextForSelection={(item, index) => { return item.profile; }}
                            style={styles.inputBoxes}
                        />
                        <SelectDropdown
                            data={types}
                            defaultButtonText="Ruolo"
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem.type, index);
                                setType(selectedItem.type);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => { return selectedItem.type }}
                            rowTextForSelection={(item, index) => { return item.type }}
                            style={styles.inputBoxes}
                        />
                    </View>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => setVisible(false)} >Close</Button>
                    <Button onPress={onSave}>Save</Button>
                </Dialog.Actions>
            </Dialog >
        </Portal >
        // </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        //flex: 1,
        //flexDirection: "column",
        //justifyContent: "space-between"
    },
    inputBoxes: {
        margin: 10
    },
    personalDataContainer: {
        flexDirection: "row",
    }
});