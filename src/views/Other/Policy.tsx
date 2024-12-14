import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function Policy({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Entypo name="chevron-left" size={24} color="black" onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Chính sách</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>1. Mục Đích Sử Dụng</Text>
        <Text style={styles.text}>
          • Ứng dụng Công Chứng Online (sau đây gọi là "Ứng dụng") được thiết kế để cung cấp các
          dịch vụ công chứng, chứng thực và xử lý văn bản pháp lý qua nền tảng trực tuyến, đảm bảo
          tiện lợi và minh bạch cho người dùng..
        </Text>

        <Text style={styles.sectionTitle}>2. Quy Định Chung</Text>
        <Text style={styles.text}>2.1. Đối tượng áp dụng</Text>
        <Text style={styles.text}>
          • Chính sách này áp dụng cho tất cả người dùng đã đăng ký tài khoản và sử dụng dịch vụ
          trên Ứng dụng.
        </Text>
        <Text style={styles.text}>2.2. Điều kiện sử dụng</Text>
        <Text style={styles.text}>
          • Người dùng phải đảm bảo cung cấp thông tin chính xác, đầy đủ khi đăng ký tài khoản và sử
          dụng dịch vụ.
        </Text>
        <Text style={styles.text}>
          • Người dùng phải đủ 18 tuổi và có đủ năng lực hành vi dân sự theo quy định pháp luật.
        </Text>
        <Text style={styles.text}>2.3. Quyền và trách nhiệm của người dùng</Text>
        <Text style={styles.text}>
          • Người dùng có quyền truy cập và sử dụng các dịch vụ theo điều kiện được nêu trong chính
          sách này.
        </Text>
        <Text style={styles.text}>
          • Người dùng chịu trách nhiệm về tính chính xác của thông tin và tài liệu cung cấp trong
          quá trình sử dụng dịch vụ
        </Text>

        <Text style={styles.sectionTitle}>3. Quyền và Trách Nhiệm của Nhà Cung Cấp Dịch Vụ</Text>
        <Text style={styles.text}>3.1. Quyền hạn</Text>
        <Text style={styles.text}>
          • Có quyền từ chối cung cấp dịch vụ nếu phát hiện người dùng vi phạm chính sách sử dụng
          hoặc cung cấp thông tin sai lệch.
        </Text>
        <Text style={styles.text}>
          • Chỉnh sửa, nâng cấp và thay đổi tính năng của Ứng dụng mà không cần thông báo trước,
          nhưng sẽ đảm bảo quyền lợi của người dùng.
        </Text>
        <Text style={styles.text}>3.2. Trách nhiệm</Text>
        <Text style={styles.text}>
          • Bảo vệ thông tin cá nhân của người dùng theo quy định pháp luật về bảo mật thông tin.
        </Text>
        <Text style={styles.text}>• Đảm bảo chất lượng dịch vụ theo tiêu chuẩn đã công bố.</Text>

        <Text style={styles.sectionTitle}>4. Chính Sách Bảo Mật Thông Tin</Text>
        <Text style={styles.text}>4.1. Phạm vi thu thập thông tin</Text>
        <Text style={styles.text}>
          • Ứng dụng thu thập thông tin cá nhân như: họ tên, số điện thoại, email, địa chỉ, tài liệu
          liên quan để phục vụ mục đích công chứng.
        </Text>
        <Text style={styles.text}>4.2. Mục đích sử dụng thông tin</Text>
        <Text style={styles.text}>• Thực hiện các dịch vụ mà người dùng yêu cầu.</Text>
        <Text style={styles.text}>
          • Gửi thông báo, hỗ trợ kỹ thuật hoặc thông tin liên quan đến dịch vụ.
        </Text>
        <Text style={styles.text}>4.3. Cam kết bảo mật</Text>
        <Text style={styles.text}>
          • Thông tin cá nhân sẽ không được chia sẻ, bán hoặc tiết lộ cho bên thứ ba, trừ khi có yêu
          cầu từ cơ quan pháp luật.
        </Text>

        <Text style={styles.sectionTitle}>5. Thanh Toán và Hoàn Tiền</Text>
        <Text style={styles.text}>5.1. Hình thức thanh toán</Text>
        <Text style={styles.text}>
          • Ứng dụng hỗ trợ thanh toán qua các hình thức: ví điện tử, thẻ tín dụng, thẻ ghi nợ hoặc
          chuyển khoản ngân hàng.
        </Text>
        <Text style={styles.text}>5.2. Chính sách hoàn tiền</Text>
        <Text style={styles.text}>
          • Người dùng có thể yêu cầu hoàn tiền trong các trường hợp: dịch vụ không được thực hiện
          đúng cam kết hoặc lỗi phát sinh từ phía nhà cung cấp.
        </Text>
        <Text style={styles.text}>
          • Thời gian xử lý yêu cầu hoàn tiền: từ 7 đến 15 ngày làm việc.
        </Text>

        <Text style={styles.sectionTitle}>6. Quy Định Về Tài Liệu và Tài Sản Công Chứng</Text>
        <Text style={styles.text}>6.1. Tài liệu công chứng</Text>
        <Text style={styles.text}>
          • Người dùng cam kết tài liệu cung cấp là hợp pháp và không vi phạm quy định pháp luật.
        </Text>
        <Text style={styles.text}>6.2. Trách nhiệm đối với tài liệu</Text>
        <Text style={styles.text}>
          • Nhà cung cấp dịch vụ không chịu trách nhiệm về tính chính xác, pháp lý của tài liệu mà
          người dùng cung cấp.
        </Text>

        <Text style={styles.sectionTitle}>Chính sách Phản hồi và Hỗ trợ</Text>
        <Text style={styles.text}>
          • Người dùng có quyền gửi khiếu nại qua tính năng hỗ trợ khách hàng trong Ứng dụng.
        </Text>
        <Text style={styles.text}>
          • Khiếu nại sẽ được giải quyết trong vòng 7 ngày làm việc kể từ ngày nhận được thông tin.
        </Text>

        <Text style={styles.sectionTitle}>8. Điều Khoản Hiệu Lực</Text>
        <Text style={styles.text}>• Chính sách này có hiệu lực kể từ ngày được công bố</Text>
        <Text style={styles.text}>
          • Nhà cung cấp dịch vụ có quyền thay đổi nội dung chính sách, người dùng sẽ được thông báo
          trước khi các thay đổi có hiệu lực.
        </Text>
        <Text style={styles.text} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
    padding: 15,
    marginBottom: 50,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    fontStyle: 'italic',
  },
  text: {
    fontSize: 14,
    marginTop: 10,
    lineHeight: 20,
    fontStyle: 'italic',
  },
});
