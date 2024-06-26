import { useNavigation } from "@react-navigation/native";
import { Divider, Layout, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MyIcon } from "../components/ui/MyIcon";

interface Props {
    title: string;
    subTitle?: string; 
    rightAction?: () => void;
    rightActionIcon?: string;
    children: React.ReactNode;
    logo?: any;
}

export const MainLayout = ({ title, subTitle, rightAction, rightActionIcon, children, logo }: Props) => {
    const { top } = useSafeAreaInsets();
    const { canGoBack, goBack } = useNavigation();

    const renderBackAction = () => (
        <TopNavigationAction 
            icon={<MyIcon name="arrow-back-outline" />}
            onPress={goBack}
        />
    );

    const renderRightAction = () => {
        if (logo) {
            return <Image source={logo} style={styles.logo} />;
        }
        return null;
    };

    const TitleWithLogo = () => (
        <View style={styles.titleContainer}>
            {logo && <Image source={logo} style={styles.logo} />}
            <Text style={styles.title}>{subTitle}</Text>
        </View>
    );

    return (
        <Layout style={{ paddingTop: top }}>
            <TopNavigation 
                title={TitleWithLogo}
                subtitle=''
                alignment="center"
                accessoryLeft={canGoBack() ? renderBackAction : undefined}
                accessoryRight='' // ira usuario y logout
            />
            <Divider />
            <Layout style={{ height: '100%' }}>
                {children}
            </Layout>
        </Layout>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 40, // Ajustar el tamaño del logo según sea necesario
        height: 40,
        resizeMode: 'contain',
        marginRight: 8, // Espacio entre el logo y el título
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
        color: '#a8a7ac'
    }
});
