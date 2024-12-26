import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native';
import useAsyncStorage from '../../helper/useAsyncStorage';
import TagSelector from '../../components/Order/TagSelector';
import CustomTagSelectionModal from '../../components/Order/CustomTagSelectionModal';


const AddUserRelative = ( {navigation, route}) => {
    const { userRelativeType} = route.params;
    const tags = ["Aile", "Sevgili", "Arkadaş", "Özel Gün", "Diğer"];
    const [selectedTags, setSelectedTags] = useState([]);
    const [showCustomTagInput, setShowCustomTagInput] = useState(false);
    const [customTag, setCustomTag] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(prevSelectedTags => prevSelectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags(prevSelectedTags => [...prevSelectedTags, tag]);
        }
    };
    const { getData } = useAsyncStorage();

    const addCustomTag = () => {
        if (customTag.trim() && !selectedTags.includes(customTag)) {
            setSelectedTags((prevTags) => [...prevTags, customTag.trim()]);
        }
        setShowCustomTagInput(false);
        setCustomTag('');
    };

    const isButtonDisabled = !firstName.trim() || !lastName.trim() || !phone.trim() || selectedTags.length === 0;

    const handleSubmit = async () => {
        setIsLoading(true);
        const userId = await getData("userID");
        console.log("userId:", userId) 
        const payload = {
            FirstName: firstName.trim(),
            LastName: lastName.trim(),
            PhoneNumber: phone.trim(),
            Tag: selectedTags.join(', '),
            UserRelativeType: userRelativeType,
            userId: await getData("userID")
        };

        try {
            navigation.navigate("SurveyScreen", {ProfileInfo: payload});
        } catch (error) {
            console.error('İstek gönderme hatası:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Yeni Profil Ekle</Text>
            <TextInput
                placeholder="Ad"
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                placeholder="Soyad"
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
            />
            <TextInput
                placeholder="Telefon Numarası"
                keyboardType="phone-pad"
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
            />
            <TagSelector
                tags={["Aile", "Sevgili", "Arkadaş", "Özel Gün", "Diğer"]}
                selectedTags={selectedTags}
                toggleTag={toggleTag}
                showCustomTagInput={showCustomTagInput}
                setShowCustomTagInput={setShowCustomTagInput}
            />
            <CustomTagSelectionModal
                visible={showCustomTagInput}
                onClose={() => setShowCustomTagInput(false)}
                onSubmit={addCustomTag}
                customTag={customTag}
                setCustomTag={setCustomTag}
            />
            <TouchableOpacity
                style={[styles.submitButton, { opacity: isButtonDisabled ? 0.5 : 1 }]}
                disabled={isButtonDisabled || isLoading}
                onPress={handleSubmit}
            >
                <Text style={styles.submitButtonText}>
                    {isLoading ? 'Kaydediliyor...' : 'Kaydet ve İlerle'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddUserRelative;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    tagsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        flexWrap: 'wrap',
    },
    tag: {
        backgroundColor: '#d9a4f7',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        fontSize: 14,
        marginHorizontal: 2,
        marginBottom: 10,
    },
    selectedTag: {
        backgroundColor: '#8A2BE2',
    },
    tagText: {
        color: '#fff',
    },
    input: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DDD',
        marginBottom: 15,
    },
    submitButton: {
        backgroundColor: '#8A2BE2',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cancelButton: {
        backgroundColor: '#ccc',
        padding: 10,
        marginTop: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    cancelButtonText: {
        color: '#333',
        fontSize: 16,
    },
});
