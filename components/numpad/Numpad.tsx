import React, { useRef, useState } from 'react';
import { StyleSheet, Vibration, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NumpadButton from './NumpadButton';

const buttons = [
  ['1', '2', '3',],
  ['4', '5', '6',],
  ['7', '8', '9',],
  ['.', '0', 'delete',],
];

const Numpad = ({ onKeyPress, style }: { onKeyPress: (value: string) => void, style?: ViewStyle}) => {

  const withVibratePress = (value: string) => {
    Vibration.vibrate(50)
    onKeyPress(value)
  }

  return (
    <View style={[styles.container, style]}>

      {buttons.map((row, i) => (
        <View key={i} style={{ flexDirection: 'row', columnGap: 4 }}>
          {row.map((button) => (
            <View key={button} style={{ flexGrow: 1, flexBasis: 1, overflow: 'hidden' }}>
              {button === 'delete' && <DeleteButton onKeyPress={withVibratePress} />}
              {(button === '.') &&
                <NumericButton
                  button={button}
                  onKeyPress={withVibratePress}
                  style={{
                    backgroundColor: '#dbd4ff',
                  }}
                />
              }
              {(button !== 'delete' && button !== '.') &&
                <NumericButton button={button} onKeyPress={withVibratePress} />
              }

            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

const NumericButton = ({ button, onKeyPress, style }: { style?: ViewStyle, button: string, onKeyPress: (key: string) => void }) => {
  const [isPressed, setIsPressed] = useState(false);
  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };
  return <NumpadButton
    onPressIn={handlePressIn}
    onPressOut={handlePressOut}
    width='full'
    key={button}
    button={button}
    onKeyPress={onKeyPress}
    style={[
      isPressed && {
        borderRadius: 9999,
      },
      style
    ]}
  />
}

const DeleteButton = ({ onKeyPress }: { onKeyPress: (value: string) => void }) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startDeleting = async () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      onKeyPress('delete')
    }, 100);
  };

  const stopDeleting = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };


  return <NumpadButton

    onLongPress={startDeleting}
    onPressOut={stopDeleting}
    shape='rounded'
    width='full'
    grow={1}
    button={'delete'}
    onKeyPress={onKeyPress}
    style={[
      {
        backgroundColor: '#dbd4ff',
      },
    ]}

    IconComonent={<Icon name="backspace" size={16} color={"#7e47ff"} />}
    size={'icon'}
  />
}
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  }
});


export default Numpad; 