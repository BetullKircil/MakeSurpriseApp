import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = () => {
    const getData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            return value;
        } catch (error) {
            console.error("Hata oluştu:", error);
        }
    };

    return { getData };
};

export default useAsyncStorage;
