import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Dimensions, Platform, Image, TextInput, RefreshControl, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStatusBar from "../components/AppStatusBar";
import { AsyncKey } from "../core/constant";
import { wait } from "../core/functions";

export default class SplashScreen extends React.Component {


    constructor(props) {
        super(props);
    }

    componentDidMount() {

        this.setupSplashScreen();
    }

    setupSplashScreen = async () => {
        try {

            await wait(3000);
            let user =  await AsyncStorage.getItem(AsyncKey.user);
            if(user){
                global.userDetails = JSON.parse(user);
                this.props.navigation.navigate('Feed');
            }else{
                this.props.navigation.navigate('Login');
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <View style={styles.SplashLayout}>
                <AppStatusBar barStyle={'light-content'} backgroundColor={'#6200ee'} />
                <Image source={require('./../images/logo.png')} />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    SplashLayout: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6200ee",
        fontFamily: 'monospace'
    }
});