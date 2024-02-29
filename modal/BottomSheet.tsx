import React, { useEffect, ReactNode, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, Animated, PanResponder, Dimensions, View, ModalProps } from 'react-native';

type BottomSheetProps = {
    isVisible: boolean;
    onDismiss: () => void;
    children: ReactNode;
    
} & ModalProps;

const BottomSheet: React.FC<BottomSheetProps> = ({ isVisible, onDismiss, children, style }) => {
    const [draggedPositionY, setDraggedPositionY] = useState(new Animated.Value(0));
    const screenHeight = Dimensions.get('window').height;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            if (gestureState.dy > 0) {
                Animated.event([null, { dy: draggedPositionY }], { useNativeDriver: false })(
                    null,
                    { dy: gestureState.dy }
                );
            }
        },
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dy > screenHeight * 0.2) {
                Animated.timing(draggedPositionY, {
                    toValue: screenHeight,
                    duration: 200,
                    useNativeDriver: false,
                }).start(onDismiss);
            } else {
                Animated.timing(draggedPositionY, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false,
                }).start();
            }
        },
    });

    useEffect(() => {
        if (isVisible) {
            setDraggedPositionY(new Animated.Value(0));
        }
    }, [isVisible]);

    return (
        <Modal visible={isVisible} transparent onRequestClose={onDismiss} animationType="slide">
            <TouchableOpacity
                onPress={onDismiss}
                activeOpacity={1}
                style={[styles.overlay]}
            >
                <Animated.View
                    style={[
                        styles.container,
                        {
                            transform: [{ translateY: draggedPositionY }],
                        },
                        style
                    ]}
                    {...panResponder.panHandlers}
                >
                    <View style={styles.draggableIndicator} />
                    {children}
                </Animated.View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    container: {
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        minHeight: 300,
        padding: 16,
        paddingTop:10,
        paddingBottom: 0, 
    },
    draggableIndicator: {
        width: 30,
        height: 6,
        backgroundColor: '#ccc',
        borderRadius: 3,
        alignSelf: 'center',
        marginBottom: 3,
    },
});

export default BottomSheet;