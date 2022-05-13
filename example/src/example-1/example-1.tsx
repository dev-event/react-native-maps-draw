import React, { useState, useCallback, useRef, useMemo } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import MapView, { IDrawResult, TouchPoint, Marker } from '../../../src';
import { MarkerLocation } from '../assets';
import AnimatedPolygon from '../components/polygon';

const Example1 = () => {
    const mapRef = useRef<MapView>(null);

    const initialPolygon = useRef({
        polygons: [],
        distance: 0,
        lastLatLng: undefined,
        initialLatLng: undefined,
        centerLatLng: undefined,
    });

    const [isActiveDraw, setDrawMode] = useState<boolean>(false);
    const [polygon, setPolygon] = useState<IDrawResult>(initialPolygon.current);
    const [isReady, setIsReady] = useState<boolean>(false);
    const [points, setPoints] = useState<TouchPoint[]>([]);

    /**
     * handle map ready callback
     */
    const handleMapReady = useCallback(() => mapRef.current && setIsReady(true), []);

    const handleRemovePolygon = useCallback(() => {
        setPolygon(initialPolygon.current);
    }, []);

    /**
     * Let go of your finger - draw coordinates on the map
     */
    const handleCanvasEndDraw = useCallback((locations) => {
        setPolygon(locations);
        setDrawMode(false)
    }, []);

    const handlePolygon = useCallback(
        (item, index) => <AnimatedPolygon key={index} coordinates={polygon.polygons} />,
        [polygon.polygons],
    );

    const isVisiblePolygons = useMemo(
        () => isReady && polygon.polygons && polygon.polygons.length > 0,
        [isReady, polygon.polygons],
    );

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                points={points}
                widthLine={3}
                onEndDraw={handleCanvasEndDraw}
                isDrawMode={isActiveDraw}
                onMapReady={handleMapReady}
                onChangePoints={setPoints}
                backgroundCanvas={'rgba(0, 0, 0, 0.0)'}
                configuration={{
                    type: 'draw',
                }}
            >
                {isVisiblePolygons && (
                    <>
                        {polygon.centerLatLng && (
                            <Marker
                                onPress={handleRemovePolygon}
                                coordinate={polygon.centerLatLng}
                            >
                                <MarkerLocation />
                            </Marker>
                        )}
                        {polygon.polygons.map(handlePolygon)}
                    </>
                )}
            </MapView>

            <View style={styles.panel}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setPolygon(initialPolygon.current);
                        setPoints([]);
                        setDrawMode(true);
                    }}
                >
                    <Image
                        source={require('../assets/pen.png')}
                        resizeMode={'stretch'}
                        style={styles.img}
                    />
                    <Text style={styles.title}>Draw Area</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default Example1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    panel: {
        flexDirection: 'row',
        top: '10%',
        left: '10%',
        position: 'absolute',
    },
    title: {
        color: '#000000',
        fontSize: 14,
    },
    button: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: 'white',
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    img: {
        height: 24,
        width: 36,
    },
    map: {
        flex: 1,
    },
});
