import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Header: React.FC = () => {

    return <View style={styles.headerView}>
        <Image source={{uri: 'https://www.investcorp.com/wp-content/uploads/2020/05/Revature.png'}} resizeMode='contain' style={styles.revatureLogo}/>
    </View>;
}

const styles = StyleSheet.create({
headerView: {
    height: 75,
    padding: 20,
    backgroundColor: '#ffffff',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
},

revatureLogo: {
    height: 30
}
});

export default Header;