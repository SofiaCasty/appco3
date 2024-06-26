import React from "react";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { MyIcon } from "./MyIcon";
import { Text } from "@ui-kitten/components";

interface Props {
    iconName: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    texto?: string;
}

export const FAB = ({ iconName, onPress, style, texto }: Props) => {
    return (
        <View style={[styles.btnContainer, style]}>
            <Pressable onPress={onPress} style={styles.pressable}>
                {texto && <Text style={styles.text}>{texto}</Text>}
                <MyIcon name={iconName} color="white" white={true} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    btnContainer: {
        zIndex: 1,
        position: "absolute",
        borderRadius: 30,
        backgroundColor: "black",
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 0.27,
            width: 4.5,
        },
        elevation: 5,
        padding: 10,
        flexDirection: 'row',
    },
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: "white",
        marginRight: 5,
        fontWeight:"bold"
    },
});
