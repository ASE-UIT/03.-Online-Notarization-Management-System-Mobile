import React from 'react';
import { Text } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { colors } from '@theme';

interface CreateProgressProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const customStyles = {
  stepIndicatorSize: 40,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: colors.primary[500],
  stepStrokeWidth: 2,
  separatorStrokeFinishedWidth: 4,
  stepStrokeFinishedColor: colors.primary[500],
  stepStrokeUnFinishedColor: colors.gray[100],
  separatorFinishedColor: colors.primary[500],
  separatorUnFinishedColor: colors.gray[100],
  stepIndicatorFinishedColor: colors.primary[500],
  stepIndicatorUnFinishedColor: colors.gray[100],
  stepIndicatorCurrentColor: colors.white[100],
  stepIndicatorLabelFontSize: 12,
  currentStepIndicatorLabelFontSize: 12,
  labelColor: colors.gray[100],
  labelSize: 12,
  currentStepLabelColor: colors.primary[500],
};

const CreateProgressBar: React.FC<CreateProgressProps> = ({ currentPage, setCurrentPage }) => {
  const renderStepIndicator = ({ position }: { position: number }) => (
    <Text
      style={{
        color: position === currentPage ? colors.primary[500] : colors.white[100],
        fontSize: 14,
        fontWeight: 'bold',
      }}>
      {position + 1}
    </Text>
  );

  return (
    <StepIndicator
      currentPosition={currentPage}
      stepCount={3}
      customStyles={customStyles}
      renderStepIndicator={renderStepIndicator}
      labels={['Chọn loại công chứng', 'Cung cấp thông tin', 'Kiểm tra lại yêu cầu']}
    />
  );
};

export default CreateProgressBar;
