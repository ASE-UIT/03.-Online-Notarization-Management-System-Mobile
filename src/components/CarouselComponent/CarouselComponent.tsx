import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { View, Image, StyleSheet } from 'react-native';

function CarouselComponent({
  componentRef,
  width,
  height,
  data,
  progress,
  color,
  onPressPagination,
}: {
  componentRef: React.RefObject<ICarouselInstance>;
  width: number;
  height: number;
  data: any[];
  progress: any;
  color: string;
  onPressPagination: (index: number) => void;
}) {
  return (
    <View>
      <Carousel
        ref={componentRef}
        width={width - 32}
        height={height}
        data={data}
        onProgressChange={progress}
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Image source={data[index].source} style={styles.mainImage} resizeMode="cover" />
          </View>
        )}
      />
      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 50 }}
        activeDotStyle={{ backgroundColor: color }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  mainImage: {
    width: '100%',
    height: 150,
    borderRadius: 16,
    marginBottom: 16,
  },
});

export default CarouselComponent;
