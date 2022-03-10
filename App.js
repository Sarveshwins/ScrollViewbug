import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../constants/themes';
const DemoScreen = () => {
  const [sizeOfHeight, setsizeOfHeight] = useState(40);
  const [bottomSizeOfHeight, setBottomSizeOfHeight] = useState(40);
  const ChangeHeight = () => {
    setsizeOfHeight(prevState => {
      return prevState === 40 ? 90 : 40;
    });
  };
  const ChangeBottomHeight = () => {
    setBottomSizeOfHeight(prevState => {
      return prevState === 40 ? 90 : 40;
    });
  };
  function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const generate = (size = 10) => {
    const rows = new Array(size).fill(true).map((item, index) => ({
      key: index,
      size: Math.round(Math.random() * 100),
      color: getRandomColor(),
    }));
    return rows;
  };
  const [dataForVisible, setdataForVisible] = useState(generate());
  const OnAppend = () => {
    setdataForVisible(state => {
      return [
        {
          size: Math.round(Math.random() * 100),
          color: getRandomColor(),
          widthsize: sizeOfHeight,
        },

        ...state,
      ];
    });
  };
  const onFilter = () => {
    setdataForVisible(state => {
      return state.filter((item, index) => index != 0);
    });
  };
  const addAtBottom = () => {
    setdataForVisible(state => {
      return [
        ...state,
        {
          size: Math.round(Math.random() * 100),
          color: getRandomColor(),
          widthsize: bottomSizeOfHeight,
        },
      ];
    });
  };

  const DeletAtBottom = () => {
    setdataForVisible(state => {
      return state.filter((item, index) => index != state.length - 1);
    });
  };
  console.log('generate', generate());
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text>DemoScreen</Text>
      <ScrollView
        style={{flex: 1}}
        maintainVisibleContentPosition={{minIndexForVisible: 0}}>
        {dataForVisible.map(item => {
          return (
            <View
              style={{
                backgroundColor: item.color,
                width: '100%',
                marginVertical: 2,
                height: item.widthsize ? item.widthsize : 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'black'}}>{item.key}</Text>
              <Text style={{color: 'black'}}>{item.size}</Text>
            </View>
          );
        })}
      </ScrollView>
      <View style={{height: 130}}>
        <View style={styles.footer}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <TouchableOpacity style={styles.action} onPress={() => OnAppend()}>
              <Text>Add Top</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action} onPress={() => onFilter()}>
              <Text>Delete Top</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.action}
              onPress={() => ChangeHeight()}>
              <Text>Top Height</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', flex: 1}}>
            <TouchableOpacity
              style={styles.action}
              onPress={() => addAtBottom()}>
              <Text>Add Bottom</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.action}
              onPress={() => DeletAtBottom()}>
              <Text>Delete Bottom</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.action}
              onPress={() => ChangeBottomHeight()}>
              <Text>Bottom Height</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DemoScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // justifyContent: "center",
    padding: 10,
    backgroundColor: '#0f1420',
    // alignItems: "center",
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 130,
    backgroundColor: '#333',
  },
  action: {
    flex: 1,
    margin: 5,
    backgroundColor: '#ccc',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
