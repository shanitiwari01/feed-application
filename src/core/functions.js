import * as React from 'react'
import { ActivityIndicator, View, StyleSheet} from "react-native";

/**
 * 
 * stop code excution for specfic time
 * 
 * @param {*} ms 
 * @returns 
 */
export const wait = ms => new Promise(res => setTimeout(res, ms));


/**
 * show loader
 */
export const Loader = () => {
    return (
        <View style={styles.loaderLayout}>
            <ActivityIndicator size="large" color="#6200ee" />
        </View>
    )
}

/**
 * functions component styling
 */
const styles = StyleSheet.create({
    loaderLayout : {
        position : 'absolute', 
        height : '100%', 
        width : '100%', 
        alignItems : 'center', 
        justifyContent : 'center', 
        zIndex : 1
    }
})