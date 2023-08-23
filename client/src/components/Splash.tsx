import {StyleSheet, View, ActivityIndicator} from 'react-native';

const Splash = () => {
    return(
        <View style={[styles.container, {transform: [{scale: 1.5}]}]}>
    <ActivityIndicator size="large" color="#0000ff" />
        </View>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default Splash