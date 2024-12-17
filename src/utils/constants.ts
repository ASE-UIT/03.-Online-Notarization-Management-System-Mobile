const DOCUMENT_TYPE_LABELS = {
  identity_doc: 'Giấy tờ tuỳ thân',
  residence_book: 'Sổ hộ khẩu',
  marriage_cert: 'Giấy chứng nhận kết hôn',
  loan_contract: 'Hợp đồng vay',
  loan_info: 'Thông tin vay',
  guarantee_contract: 'Hợp đồng bảo lãnh',
  chattel_mortgage: 'Hợp đồng thế chấp động sản',
  land_cert: 'Giấy chứng nhận quyền sử dụng đất',
  future_asset_agreement: 'Hợp đồng tài sản tương lai',
  will: 'Di chúc',
  inheritance_doc: 'Giấy tờ thừa kế',
  death_cert: 'Giấy chứng tử',
  relation_proof: 'Giấy chứng nhận quan hệ',
  deposit_contract: 'Hợp đồng tiền gửi',
  cancel_doc: 'Giấy tờ hủy bỏ',
  gift_agreement: 'Hợp đồng tặng cho',
  lease_contract: 'Hợp đồng cho thuê',
  business_cert: 'Giấy chứng nhận đăng ký kinh doanh',
  translated_doc: 'Giấy tờ dịch thuật',
  auth_contract: 'Hợp đồng ủy quyền',
  ownership_proof: 'Giấy tờ chứng minh quyền sở hữu',
  rep_identity_doc: 'Giấy tờ tùy thân của người đại diện pháp lý',
  certified_copy: 'Bản sao công chứng',
  agreement_minutes: 'Biên bản thỏa thuận',
  original_doc: 'Bản gốc tài liệu cần sao y',
  default: 'Tài liệu không xác định',
};

export const DOCUMENT_STATUS_LABELS = {
  pending: 'Đang chờ xử lý',
  processing: 'Đang xử lý',
  digitalSignature: 'Sẵn sàng ký số',
  completed: 'Hoàn tất',
  rejected: 'Không hợp lệ',
};

export type DocumentTypeCode = keyof typeof DOCUMENT_TYPE_LABELS;

export type DocumentStatusCode = keyof typeof DOCUMENT_STATUS_LABELS;

export const getDocumentNameByCode = (code: DocumentTypeCode): string =>
  DOCUMENT_TYPE_LABELS[code] || DOCUMENT_TYPE_LABELS.default;

export const getDocumentStatusByCode = (code: DocumentStatusCode): string =>
  DOCUMENT_STATUS_LABELS[code] || DOCUMENT_STATUS_LABELS.pending;
