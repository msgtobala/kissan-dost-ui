import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function NewsDetailScreen() {
  const params = useLocalSearchParams<{
    id: string;
    title: string;
    category: string;
    thumbnail: string;
    timeAgo: string;
    readTime: string;
  }>();

  // Debug: Show what we're receiving
  console.log('DEBUG - Article ID:', params.id);
  console.log('DEBUG - Article Title:', params.title);
  console.log('DEBUG - Is ID 4?', params.id === '4');

  const handleBack = () => {
    router.back();
  };

  const getArticleDescription = () => {
    console.log('Article title:', params.title);
    console.log('Title lowercase:', params.title.toLowerCase());
    console.log('Contains tomato:', params.title.toLowerCase().includes('tomato'));
    console.log('Contains paddy:', params.title.toLowerCase().includes('paddy'));
    console.log('Contains rice:', params.title.toLowerCase().includes('rice'));
    console.log('Contains wheat:', params.title.toLowerCase().includes('wheat'));
    console.log('Contains carrot:', params.title.toLowerCase().includes('carrot'));
    console.log('Article ID:', params.id);
    console.log('Is ID 4?', params.id === '4');

    if (params.title.toLowerCase().includes('tomato')) {
      console.log('Returning tomato description');
      return "Tomato prices have surged sharply across various states in India due to a significant drop in supply caused by unseasonal rainfall, pest attacks, and transport disruptions. In major markets, retail prices have crossed ₹100 per kg, severely impacting household budgets and restaurant operations. Farmers are urging for government intervention, while consumers are turning to alternatives as tomato becomes a luxury item in many kitchens.";
    }
    if (params.id === '4' || params.title.toLowerCase().includes('carrot')) {
      console.log('Returning carrot description');
      return "A bumper harvest of carrots this season has led to an oversupply in local markets, causing prices to fall sharply. Farmers in regions like Punjab, Himachal Pradesh, and Karnataka are struggling to recover production costs as wholesale rates drop below ₹10 per kg. The sudden glut in supply, coupled with limited cold storage and transport options, has further worsened the situation. While consumers are benefiting from low prices, many farmers are forced to either sell at a loss or dump unsold produce.";
    }
    if (params.title.toLowerCase().includes('paddy') || params.title.toLowerCase().includes('rice')) {
      console.log('Returning paddy/rice description');
      return "Heavy and continuous rainfall in eastern parts of India, including states like West Bengal, Bihar, and Odisha, has led to widespread damage of paddy fields. The excessive waterlogging has affected crop growth and raised concerns of reduced yield this season. Farmers are facing mounting losses, and agricultural experts warn of a potential rise in rice prices if the situation persists. State authorities are assessing the damage and considering compensation for the affected farmers.";
    }
    if (params.title.toLowerCase().includes('wheat')) {
      console.log('Returning wheat description');
      return "Wheat farmers across India are grappling with increasing input costs, including higher prices for seeds, fertilizers, pesticides, and diesel. The rising expenses are reducing profit margins, making wheat cultivation less sustainable for small and marginal farmers. Many growers have expressed concerns over the lack of adequate support or subsidies, and are calling on the government to revise the Minimum Support Price (MSP) to match the growing production costs. If the trend continues, experts fear it could lead to a decline in wheat acreage in the upcoming season.";
    }
    console.log('Returning generic description');
    return "This is a detailed description of the news article. It provides comprehensive information about the topic, including background context, current developments, and potential implications for the agricultural sector. The article covers various aspects of farming practices, market trends, and technological advancements in agriculture.\n\nFarmers across the region are adapting to new challenges and opportunities in the agricultural landscape. This includes implementing sustainable farming practices, leveraging technology for better crop management, and responding to changing market demands.";
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.light.primary} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Article</ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Article Image */}
        <Image source={{ uri: params.thumbnail }} style={styles.articleImage} />

        {/* Article Content */}
        <View style={styles.articleContent}>
          {/* Category */}
          <View style={styles.categoryContainer}>
            <ThemedText style={[styles.categoryTag, { color: Colors.light.success }]}>
              {params.category}
            </ThemedText>
          </View>

          {/* Title */}
          <ThemedText style={styles.articleTitle}>{params.title}</ThemedText>

          {/* Metadata */}
          <View style={styles.metadataContainer}>
            <ThemedText style={styles.metadataText}>
              {params.timeAgo} • {params.readTime}
            </ThemedText>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <ThemedText style={styles.descriptionTitle}>Description</ThemedText>
            <ThemedText style={styles.descriptionText}>
              {getArticleDescription()}
            </ThemedText>
          </View>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.primary,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  articleImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  articleContent: {
    padding: 20,
  },
  categoryContainer: {
    marginBottom: 12,
  },
  categoryTag: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  articleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    lineHeight: 32,
    marginBottom: 12,
  },
  metadataContainer: {
    marginBottom: 24,
  },
  metadataText: {
    fontSize: 14,
    color: Colors.light.placeholder,
  },
  descriptionContainer: {
    marginTop: 8,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
    marginBottom: 16,
  },
}); 