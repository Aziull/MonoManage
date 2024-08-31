import React, { ReactNode, useEffect, useRef } from 'react';
import { Animated, Dimensions, Modal, ModalProps, PanResponder, StyleSheet, TouchableOpacity, View } from 'react-native';

type BottomSheetProps = {
    isVisible: boolean;
    onDismiss: () => void;
    children: ReactNode;

} & ModalProps;

const BottomSheet: React.FC<BottomSheetProps> = ({ isVisible, onDismiss, children, style }) => {
    const draggedPositionY = useRef(new Animated.Value(0)).current;
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
            draggedPositionY.setValue(0);
        }
    }, [isVisible]);

    return (
        <Modal visible={isVisible} transparent onRequestClose={onDismiss} animationType='fade'>
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
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    container: {
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 16,
        paddingTop: 10,
        paddingBottom: 0,
        maxHeight: 550,
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