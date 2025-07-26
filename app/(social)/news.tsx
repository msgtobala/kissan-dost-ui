import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const newsArticles = [
    {
      id: '1',
      title: 'Tomato Prices Soar Across India Amidst Supply Shortage',
      category: 'Agriculture',
      thumbnail: 'https://cropnuts.com/wp-content/uploads/2024/06/Cropnuts-Website-Header-1.png', // Crop image (wheat field)
      timeAgo: '1 day ago',
      readTime: '4 min read',
    },
    {
      id: '2',
      title: 'Excess Rainfall Damages Paddy Crops in Eastern India',
      category: 'Farming',
      thumbnail: 'https://media.istockphoto.com/id/1451566335/photo/paddy.jpg?s=612x612&w=0&k=20&c=cIxF8lDzeJdp5jydm6nwoL_qLdb-XwaLupWIqrUK8QQ=', // Farmer in field
      timeAgo: '1 day ago',
      readTime: '4 min read',
    },
    {
      id: '3',
      title: 'Wheat Farmers Struggle with Rising Input Costs',
      category: 'Agriculture',
      thumbnail: 'https://images.stockcake.com/public/c/3/b/c3b57717-fa0c-467f-92a1-91b4571ed968_large/harvesting-wheat-crop-stockcake.jpg', // Greenhouse
      timeAgo: '1 day ago',
      readTime: '4 min read',
    },
    {
      id: '4',
      title: 'Carrot Prices Drop as Supply Exceeds Market Demand',
      category: 'Farming',
      thumbnail: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=400&q=80', // Irrigation system
      timeAgo: '1 day ago',
      readTime: '4 min read',
    },
  ];

export default function NewsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Optional: Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>News</Text>
      </View>
      <ScrollView style={styles.newsFeed} showsVerticalScrollIndicator={false}>
        {newsArticles.map((article) => (
          <TouchableOpacity 
            key={article.id} 
            style={styles.articleCard} 
            activeOpacity={0.7}
            onPress={() => router.push({
              pathname: '/(social)/news-detail',
              params: { 
                id: article.id,
                title: article.title,
                category: article.category,
                thumbnail: article.thumbnail,
                timeAgo: article.timeAgo,
                readTime: article.readTime
              }
            })}
          >
            <Image source={{ uri: article.thumbnail }} style={styles.thumbnail} />
            <View style={styles.articleContent}>
              <Text style={[styles.categoryTag, { color: Colors.light.success }]}>{article.category}</Text>
              <Text style={styles.articleTitle} numberOfLines={2}>{article.title}</Text>
              <Text style={styles.articleMetadata}>{article.timeAgo} • {article.readTime}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.primary,
  },
  newsFeed: {
    flex: 1,
    paddingHorizontal: 20,
  },
  articleCard: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  articleContent: {
    flex: 1,
    justifyContent: 'center',
  },
  categoryTag: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
    lineHeight: 22,
    marginBottom: 8,
  },
  articleMetadata: {
    fontSize: 14,
    color: Colors.light.placeholder,
  },
});