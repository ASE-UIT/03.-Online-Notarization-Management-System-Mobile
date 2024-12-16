import { colors, fonts } from '@theme';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FlatList } from 'react-native-gesture-handler';
import { getDocumentStatusByCode, DocumentStatusCode } from '@utils/constants';
import { DocumentService, IDocumentHistoryStatus } from '@modules/document';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StackProps } from '@navigator';

export default function Search({ navigation }: Readonly<StackProps>) {
  const [searching, setSearching] = useState(false);
  const [fileId, setFileId] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [initialResults, setInitialResults] = useState<any[]>([]);

  const STATUS_COLORS: { [key in DocumentStatusCode]: string } = {
    digitalSignature: colors.blue[500],
    processing: colors.yellow[500],
    completed: colors.green[500],
    rejected: colors.red[500],
    pending: colors.gray[400],
  };

  useEffect(() => {
    fetchDocumentHistory();
  }, []);

  const handleGetDocumentDetail = async (documentId: string) => {
    try {
      navigation.navigate('DetailDocument', { documentId });
    } catch (error) {
      console.error('Error fetching document detail', error);
    }
  };

  const fetchDocumentHistory = async () => {
    try {
      setSearching(true);
      const response = await DocumentService.getDocumentHistoryWithStatus();
      setResults(response);
      setInitialResults(response);
    } catch (error) {
      console.error('Error fetching document history', error);
    } finally {
      setSearching(false);
    }
  };

  const handleSearch = async () => {
    try {
      setSearching(true);
      if (fileId.trim() === '') {
        await fetchDocumentHistory();
      } else {
        const filteredData = initialResults.filter(item => item._id.includes(fileId));
        setResults(filteredData);
      }
    } catch (error) {
      console.error('Error during search', error);
    } finally {
      setSearching(false);
    }
  };

  const renderItem = ({ item }: { item: IDocumentHistoryStatus }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>#{item._id}</Text>
      <View style={styles.cardContentContainer}>
        <View style={{ flex: 2 }}>
          <Text style={styles.cardText}>Người yêu cầu: {item.requesterInfo.fullName}</Text>
          <Text style={styles.cardText}>
            Ngày: {new Date(item.createdAt).toLocaleDateString('vi-VN')}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.cardText}>Trạng thái: </Text>
            <Text
              style={[
                styles.cardText,
                {
                  color: STATUS_COLORS[item.status.status as DocumentStatusCode] || colors.black,
                },
              ]}>
              {getDocumentStatusByCode(item.status.status as DocumentStatusCode)}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.detailButton}
          onPress={() => {
            handleGetDocumentDetail(item._id);
          }}>
          <Text style={styles.detailButtonText}>Chi tiết</Text>
          <Ionicons name="play-forward-circle" size={24} color={colors.white[100]} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text style={styles.title}>Tra cứu hồ sơ công chứng</Text>
      <Text style={styles.subTitle}>Lịch sử công chứng của bạn sẽ hiển thị ở đây</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập mã số hồ sơ"
          value={fileId}
          onChangeText={text => {
            setFileId(text);
            if (text.trim() === '') {
              fetchDocumentHistory();
            }
          }}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <FontAwesome name="search" size={20} color={colors.primary[400]} />
          <Text style={styles.searchButtonText}>Tìm kiếm</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
        <Text style={styles.redSubTitle}>Tổng số tài liệu tìm thấy: {results.length}</Text>
      </View>

      {searching ? (
        <ActivityIndicator size="large" color={colors.primary[400]} style={styles.loader} />
      ) : (
        <FlatList
          style={{ marginBottom: '3%' }}
          data={results}
          keyExtractor={item => item._id}
          renderItem={renderItem}
          nestedScrollEnabled
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={<Text style={styles.noResults}>Không tìm thấy hồ sơ phù hợp</Text>}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white[50],
    paddingHorizontal: '4%',
    paddingTop: '8%',
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.beVietnamPro.bold,
    color: colors.black,
  },
  subTitle: {
    fontSize: 15,
    fontFamily: fonts.beVietnamPro.bold,
    color: colors.gray[400],
  },
  redSubTitle: {
    marginVertical: '2%',
    fontSize: 15,
    fontFamily: fonts.beVietnamPro.bold,
    color: colors.primary[400],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '3%',
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 5,
    paddingHorizontal: '2%',
    marginRight: '2%',
    fontFamily: fonts.beVietnamPro.regular,
    fontSize: 14,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    height: 45,
    paddingHorizontal: '2%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.gray[300],
  },
  searchButtonText: {
    marginLeft: '3%',
    color: colors.primary[400],
    fontFamily: fonts.beVietnamPro.semiBold,
    fontSize: 14,
  },
  searchingText: {
    marginLeft: '2%',
    color: colors.black,
    fontFamily: fonts.beVietnamPro.semiBold,
    fontSize: 14,
  },
  loader: {
    marginTop: '5%',
  },
  card: {
    backgroundColor: colors.white[50],
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 5,
    padding: '3%',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 17,
    fontFamily: fonts.beVietnamPro.bold,
    color: colors.black,
  },
  cardText: {
    fontSize: 14,
    fontFamily: fonts.beVietnamPro.semiBold,
    color: colors.gray[600],
    marginTop: '2%',
  },
  cardContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '3%',
    marginTop: '5%',
    backgroundColor: colors.primary[500],
    padding: '2%',
    borderRadius: 5,
    flex: 1,
  },
  detailButtonText: {
    color: colors.white[100],
    textAlign: 'center',
    fontFamily: fonts.beVietnamPro.semiBold,
    marginRight: '3%',
  },
  noResults: {
    textAlign: 'center',
    color: colors.gray[400],
    fontSize: 14,
    fontFamily: fonts.beVietnamPro.regular,
    marginTop: '5%',
  },
});
