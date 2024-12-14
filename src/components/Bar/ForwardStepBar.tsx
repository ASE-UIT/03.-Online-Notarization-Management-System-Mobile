import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, fonts } from '@theme';

interface ForwardStepBarProps {
  step: number;
  totalStep: number;
  onBack?: () => void;
  onNext?: () => void;
}

const ForwardStepBar: React.FC<ForwardStepBarProps> = ({ step, totalStep, onBack, onNext }) => {
  const isLastStep = step === totalStep;

  return (
    <View style={styles.footer}>
      <Pressable onPress={onBack} style={[styles.forwardButton, !onBack && styles.hiddenButton]}>
        <Text style={styles.actionsText}>Quay lại</Text>
      </Pressable>

      <Text style={styles.pagingText}>
        {step}/{totalStep}
      </Text>

      <Pressable
        onPress={onNext}
        style={[
          styles.forwardButton,
          !onNext && styles.hiddenButton,
          isLastStep ? styles.lastStepButton : null,
        ]}>
        <Text style={styles.actionsText}>{isLastStep ? 'Gửi yêu cầu' : 'Tiếp tục'}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '5%',
    backgroundColor: colors.white[100],
    borderTopWidth: 1,
    borderTopColor: colors.gray[300],
  },
  forwardButton: {
    flex: 0.8,
    paddingVertical: '3%',
    paddingHorizontal: '5%',
    borderRadius: 5,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsText: {
    color: colors.white[100],
    fontFamily: fonts.beVietnamPro.regular,
    fontSize: 16,
  },
  pagingText: {
    flex: 0.8,
    color: colors.black,
    fontSize: 18,
    lineHeight: 30,
    fontFamily: fonts.beVietnamPro.semiBold,
    textAlign: 'center',
    letterSpacing: 2,
  },
  hiddenButton: {
    opacity: 0,
    pointerEvents: 'none',
  },
  lastStepButton: {
    flex: 0.8,
    paddingVertical: '3%',
    paddingHorizontal: '5%',
    borderRadius: 5,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ForwardStepBar;
