/**
 * Drawer Content Screen
 */
import React, { Component, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Avatar,
    Title,
    Drawer,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { MenuItems } from '../../theme/DataConstants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './DrawerContentStyle';

export default class DrawerContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuItems: MenuItems
        }
    }

    onPressMenuItem = (itemMenu) => {
        let localMenuItems = this.state.menuItems;
        let selectedLocalIndex = localMenuItems.findIndex((item) => item.index === itemMenu.index);
        let lastSelectedLocalIndex = localMenuItems.findIndex ((item) => item.active === true);
        localMenuItems[selectedLocalIndex].active = true;
        localMenuItems[lastSelectedLocalIndex].active = false;
        this.setState({ menuItems: localMenuItems }, () => {
            this.props.navigation.navigate(itemMenu.screenName)
        });
    }

    renderMenuItems = () => {
        return (
            <Drawer.Section style={styles.drawerSection}>
                {this.state.menuItems.map((item, index) => {
                    return (
                        <DrawerItem
                            focused={item.active}
                            activeTintColor="#ff8400"
                            activeBackgroundColor={'rgba(0, 0, 0, 0.1)'}
                            inactiveTintColor="#ababab"
                            icon={({ color, size }) => (
                                <Icon
                                    name={item.iconName}
                                    color={color}
                                    size={size}
                                />
                            )}
                            label={item.label}
                            onPress={() => this.onPressMenuItem(item)}
                        />
                    )
                })}
            </Drawer.Section>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                <DrawerContentScrollView {...this.props}>
                    <View style={styles.drawerContent}>
                        <Drawer.Section>
                            <View style={styles.userInfoSection}>
                                <View style={{ marginTop: 0, alignItems: 'center' }}>
                                    <Avatar.Image
                                        source={{
                                            uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                        }}
                                        size={50}
                                    />
                                    <Title style={styles.title}>John Doe</Title>
                                </View>
                            </View>
                        </Drawer.Section>
                        {this.renderMenuItems()}
                    </View>
                </DrawerContentScrollView>
            </View>
        );
    }
}
