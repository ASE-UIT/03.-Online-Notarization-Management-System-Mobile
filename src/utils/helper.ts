import { colors } from '@theme';

const formatDate = isoString => {
  const date = new Date(isoString); // Parse the ISO string
  const day = String(date.getDate()).padStart(2, '0'); // Add leading zero to day
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
const randerBackgroundColor = (status: string): string => {
  switch (status) {
    case 'completed':
      return colors.green[50];
    case 'digitalSignature':
      return colors.blue[50];
    case 'rejected':
      return colors.primary[50];
    case 'processing':
      return colors.yellow[50];
    case 'pending':
      return colors.yellow[50];
    case 'verification':
      return colors.yellow[50];
    default:
      return colors.gray[100];
  }
};
const renderTextColor = (status: string) => {
  switch (status) {
    case 'completed':
      return colors.green[500];
    case 'digitalSignature':
      return colors.blue[500];
    case 'rejected':
      return colors.primary[500];
    case 'processing':
      return colors.yellow[500];
    case 'pending':
      return colors.yellow[500];
    case 'verification':
      return colors.yellow[500];
    default:
      return colors.gray[500];
  }
};

const renderStatus = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Hoàn tất';
    case 'digitalSignature':
      return 'Sẵn sàng ký số';
    case 'rejected':
      return 'Không hợp lệ';
    case 'processing':
      return 'Đang xử lý';
    case 'pending':
      return 'Chờ xử lý';
    case 'verification':
      return 'Đang xác thực';
    default:
      return 'Không xác định';
  }
};
export { formatDate, randerBackgroundColor, renderTextColor, renderStatus };
