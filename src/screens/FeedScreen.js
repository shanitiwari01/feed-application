import React from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity, Dimensions, Platform, Image, RefreshControl, Linking } from 'react-native';

import Headerbar from "../components/Headerbar";
import { Loader } from "../core/functions";
import { base_url } from "../core/constant";
import { Avatar, Button, Card, TextInput, Paragraph } from 'react-native-paper';
import VideoPlayer from "../components/VideoPlayer";

const screen = Dimensions.get('window');
export default class FeedScreen extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            loading: true,      // to manage loader
            intialFeeds: [],    // add all feeds get from server
            feeds: [],          // to manage feeds list and search 
            search: "",         // to manage search
        }

    }

    componentDidMount() {
        this.setupFeedScreen();
    }

    /**
     * Setup Feed screen ( fetch all feeds details )
     */
    setupFeedScreen = async () => {
        this.setState({ loading: true });

        fetch(base_url + 'feeds.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                return response.json();
            })
            .then(async (res) => {
                this.setState({ loading: false });
                if (res.error == 0) {
                    this.setState({ feeds: res.data, intialFeeds: res.data })
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false });
            });

    }

    /**
     * Render when feeds empty
     * 
     * @returns message
     */
    renderEmptyContainer() {
        return (
            <View style={styles.emptyFeedsLayput}>
                <Text style={styles.emptyText}>Feeds Not found</Text>
            </View>
        )
    }

    /**
     * 
     * setup & Manage video
     * 
     * @param {*} data 
     * @param {*} index 
     * @returns videoplayer
     */
    setupVideoPlayer(data, index) {
        let imageUrl = base_url + data.image;

        return (
            <View style={styles.videoLayout}>
                <VideoPlayer
                    source={{ uri: base_url + data.video }}
                    navigator={this.props.navigator}
                    tapAnywhereToPause={false}
                    toggleResizeModeOnFullscreen={false}
                    isFullScreen={false}
                    thumbnail={imageUrl}
                    disableBack={true}
                    disableVolume={true}
                    controlTimeout={5000}
                    paused={this.state.paused}
                    seekColor={'#576CEC'}
                />
            </View>
        )
    }

    /**
     * Render all feed item
     * 
     * @param {*} item 
     * @param {*} index 
     * @returns feed
     */
    renderFeedItem = ({ item, index }) => {
        return (
            <Card style={[styles.feedCard, { marginTop: index == 0 ? 20 : 0 }]}>
                <Card.Title title={item.first_name + ' ' + item.last_name}
                    left={(props) => <Avatar.Image size={35} source={{ uri: base_url + item.user_image }} />} />
                <Card.Content>
                    <Paragraph>{item.text}</Paragraph>
                </Card.Content>
                {
                    item.type == "photo" && <Card.Cover source={{ uri: base_url + item.image }} />
                }

                {
                    item.type == 'video' &&

                    <View>
                        {this.setupVideoPlayer(item)}
                    </View>
                }
                <Card.Actions style={{ justifyContent: "space-between" }}>
                    <Button>Like</Button>
                    <Button>Comment</Button>
                </Card.Actions>
            </Card>
        );
    }

    /**
     * Render search input
     * 
     * @returns search input
     */
    renderSearchContainer() {
        return (
            <View style={styles.inputLayout}>
                <TextInput
                    label="Search Feeds"
                    value={this.state.search}
                    onChangeText={(searchText) => this.searchFeeds(searchText)}
                />
            </View>
        )
    }

    /**
     * Handle & manage search feed filter
     * 
     * @param {*} searchText 
     */
    searchFeeds(searchText) {
        const { intialFeeds, search } = this.state;

        // filetered matching feeds
        let feedsList = intialFeeds.filter((e => e.text.toLowerCase().includes(searchText.toLowerCase())));

        this.setState({ feeds: feedsList, search: searchText });
    }

    render() {
        const { feeds } = this.state;
        return (
            <View style={styles.FeedLayout}>
                <Headerbar title={"Feeds"} plus={true} navigation={this.props.navigation} />
                <View style={styles.contentLayout}>
                    <FlatList
                        data={feeds}

                        ListHeaderComponent={this.renderSearchContainer()}
                        renderItem={this.renderFeedItem}
                        ListEmptyComponent={this.renderEmptyContainer()}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        extraData={feeds}
                    />
                </View>
                {
                    this.state.loading && <Loader />
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    FeedLayout: {
        flex: 1,
    },
    contentLayout: {
        flex: 1,
    },
    emptyFeedsLayput: {
        flex: 1,
        justifyContent: "center",
    },
    emptyText: {
        fontSize: 20,
        fontWeight: "500",
        color: "#f1f1f1"
    },
    feedCard: {
        marginBottom: 20,
        marginHorizontal: 20,
    },
    videoLayout: {
        height: screen.height / 3,
        width: '100%'
    },
    inputLayout: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
});