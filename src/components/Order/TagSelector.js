import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TagSelector = ({ tags, selectedTags, toggleTag, showCustomTagInput, setShowCustomTagInput }) => (
    <View style={styles.tagsContainer}>
                {tags.map((tag) => (
                    tag === "Diğer" ? (
                        <TouchableOpacity
                            key={tag}
                            onPress={() => setShowCustomTagInput(true)}
                            style={[styles.tag, selectedTags.includes(tag) && styles.selectedTag]}
                        >
                            <Text style={styles.tagText}>{tag}</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            key={tag}
                            onPress={() => toggleTag(tag)}
                            style={[styles.tag, selectedTags.includes(tag) && styles.selectedTag]}
                        >
                            <Text style={styles.tagText}>{tag}</Text>
                        </TouchableOpacity>
                    )
                ))}
                {selectedTags.filter(tag => tag !== "Diğer").map((tag, index) => (
                    <View key={index} style={[styles.tag, styles.selectedTag]}>
                        <Text style={styles.tagText}>{tag}</Text>
                    </View>
                ))}
            </View>
);

const styles = StyleSheet.create({
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
});

export default TagSelector;
