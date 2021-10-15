import React, {useState, useRef} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
interface IQuest {
  id: number;
  duration: number;
  name: string;
  description: string;
  category: string;
  missedCheckin: boolean;
  completionEXP: number;
}
interface IFriends {
  id: number;
  name: string;
  activeQuests: IQuest[];
}

interface IProps {
  data: IFriends[];
}

const CarouselComponent = ({data}: IProps): JSX.Element => {
  const [active, setActive] = useState<number>(0);
  const ref = useRef(null);

  const pagination = (): JSX.Element => {
    return (
      <Pagination
        dotsLength={data.length}
        activeDotIndex={active}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };

  const renderItem: ListRenderItem<IFriends> = ({item}) => {
    return (
      <View style={styles.carousel}>
        <View>
          <Text style={styles.friendName}>{item.userName}</Text>
          <TouchableOpacity onPress={() => console.log('hello')}>
            <Image
              style={styles.avatar}
              source={require('../assets/friend1.png')}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.activeQuest}>
          Active Quest: {item.activeQuests}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Carousel
        ref={ref}
        data={data}
        renderItem={renderItem}
        sliderWidth={350}
        itemWidth={300}
        onSnapToItem={(index: number) => setActive(index)}
      />
      <View>{pagination()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  friendName: {
    color: '#979dac',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  carousel: {
    borderWidth: 1,
    borderColor: '#979dac',
    flexDirection: 'row',
  },
  activeQuest: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    color: '#979dac',
    fontWeight: 'bold',
  },
  avatar: {},
});

export default CarouselComponent;
