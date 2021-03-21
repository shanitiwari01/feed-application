import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, } from 'react-native';

import AppStatusBar from "../components/AppStatusBar";
import { TextInput, Button } from 'react-native-paper';
import { Loader } from "../core/functions";
import { base_url } from "../core/constant";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncKey } from "../core/constant";

export default class LoginScreen extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            username: "",               // to store username
            usernameMessage: false,     // username flag to error message
            password: "",               // to store password
            passwordMessage: false,     // password flag to password message
            loading: false,             // manage loader
        }

    }

    /**
     * authenticate user
     */
    authentication = async () => {

        this.setState({ loading: true })
        const { username, password } = this.state;
        let errorFlag = false;

        // input validation
        if (username) {
            errorFlag = true;
            this.setState({ usernameMessage: false });
        } else {
            errorFlag = false;
            this.setState({ usernameMessage: true })
        }

        if (password) {
            errorFlag = true;
            this.setState({ passwordMessage: false });
        } else {
            errorFlag = false;
            this.setState({ passwordMessage: true })
        }

        if (errorFlag) {
            console.log("errorFlag");
            fetch(base_url + 'login.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                })
            })
                .then(response => {
                    return response.json();
                })
                .then( async (res) => {
                    this.setState({ loading: false });
                    if(res.error == 0){

                        // store on async
                        await AsyncStorage.setItem(AsyncKey.user, JSON.stringify(res.data));
                        global.userDetails = res.data;

                        this.props.navigation.navigate('Feed');
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.setState({ loading: false });
                });
        } else {
            this.setState({ loading: false });
        }
    }

    render() {
        return (
            <View>
                <AppStatusBar barStyle={'dark-content'} backgroundColor={'#FFFFFF'} />
                <ScrollView>
                    <View style={styles.LoginLayout}>
                        <View style={styles.LogoLayout}>
                            <Image source={require('./../images/logo.png')} />
                        </View>
                        <View style={styles.inputLayout}>
                            <TextInput
                                label="Username"
                                value={this.state.username}
                                onChangeText={username => this.setState({username})}
                            />
                            {
                                this.state.usernameMessage && <Text style={styles.textDanger}>{"username is required"}</Text>
                            }
                        </View>
                        <View style={styles.inputLayout}>
                            <TextInput
                                label="Password"
                                value={this.state.password}
                                secureTextEntry={true}
                                onChangeText={password => this.setState({password})}
                            />
                            {
                                this.state.passwordMessage && <Text style={styles.textDanger}>{"Password is required"}</Text>
                            }
                        </View>
                        <View style={styles.inputLayout}>
                            <Button mode="contained" onPress={() => this.authentication()}>
                                Sign In
                        </Button>
                        </View>
                    </View>
                </ScrollView>

                {
                    this.state.loading && <Loader />
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    LoginLayout: {
        flex: 1,
        padding: 20
    },
    LogoLayout: {
        alignItems: "center",
        padding: 20
    },
    inputLayout: {
        paddingBottom: 20,
    },
    textDanger: {
        color: "#dc3545"
    }
});