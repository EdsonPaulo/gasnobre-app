import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'

import { CustomInput, CustomButton } from '../../../components'
import { colors, metrics, general } from '../../../constants'
import { RectButton } from 'react-native-gesture-handler'

export default index = () => {

    const navigation = useNavigation()
    const [editable, setEditable] = useState(false)
    const [saving, setSaving] = useState(false)


    const [userInfo, setUserInfo] = useState({
        id: 12313,
        name: 'Gonçalo Guedes',
        phone: '+244942682194',
        email: 'edsonpaulo24@gmail.com',
        address1: 'Casa 12, Rua B, Luanda - Angola',
        address2: '',
    })

    useEffect(() => {
        return () => {
            //salvar dados dos inputs
        }
    }, [])

    const handleSave = () => {
        setSaving(true)

        setTimeout(() => {
            ToastAndroid.show("Dados salvos com sucesso!", 1000)
            setSaving(false)
            setEditable(false)
        }, 2000)

    }

    const inputStyle = editable ? null : { backgroundColor: colors.bgColor, borderWidth: 0 }

    return (
        <SafeAreaView style={general.background}>
            <View style={styles.topContainer}>
                <FontAwesome5 name="user-circle" color="white" size={40} />
                <Text style={[styles.userName, styles.userDetails]}>{userInfo.name}</Text>
                <Text style={styles.userDetails}>{userInfo.address1}</Text>
            </View>

            <View style={styles.container}>
                {
                    editable ? null :
                        <RectButton style={{ alignSelf: "flex-end", padding: 7 }} onPress={() => setEditable(true)}>
                            <Text style={{ fontWeight: "bold" }}><FontAwesome5 name="edit" /> Editar</Text>
                        </RectButton>
                }
                <Text style={styles.labelStyle}>Nome</Text>
                <CustomInput type="name" value={userInfo.name} style={inputStyle} editable={editable} placeholder="Nome e Sobrenome"
                    onChangeText={name => setUserInfo({ ...userInfo, name: name })} />

                <Text style={styles.labelStyle}>Telefone</Text>
                <CustomInput type="phone" placeholder="Telefone" style={inputStyle} editable={editable} value={userInfo.phone}
                    onChangeText={phone => setUserInfo({ ...userInfo, phone: phone })} />

                <Text style={styles.labelStyle}>Email</Text>
                <CustomInput type="email" placeholder="Email de Contacto" style={inputStyle} editable={editable} value={userInfo.email}
                    onChangeText={email => setUserInfo({ ...userInfo, email: email })} />

                <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5, justifyContent: 'space-between', alignItems: "center" }}>
                    <Text style={styles.labelStyle}>
                        Endereço Principal</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("address")}>
                        <Text style={{ fontSize: 15, }}>+ Alterar</Text>
                    </TouchableOpacity>
                </View>

                <CustomInput type="address" value={userInfo.address1} style={inputStyle} editable={false} multiline />
                {
                    !editable ? null :
                        <View style={{ marginTop: 20, flexDirection: "row", flex: 1 }}>
                            <CustomButton style={{ flex: 1, marginRight: 20 }} title="Salvar" loading={saving} primary onPress={handleSave} />
                            <CustomButton style={{ flex: 1 }} title="Cancelar" onPress={() => setEditable(false)} />
                        </View>
                }
            </View>
            <StatusBar style="light" backgroundColor={colors.primary} translucent={false} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    topContainer: {
        height: "auto",
        backgroundColor: colors.primary,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userDetails: {
        fontFamily: 'RobotoCondensed_400Regular',
        color: "white",
    },
    labelStyle: {
        color: colors.grayDark,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 2,
        marginLeft: 10,
        fontFamily: 'RobotoCondensed_400Regular',
    },
})
