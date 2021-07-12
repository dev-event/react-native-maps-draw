<div align="center">
  <img src="./draw.gif" height="500" title="React Native Maps Draw Polygon"   alt="Accordion Animated" style="box-shadow: 0 20px 30px 3px rgba(9, 9, 16, 0.2);">
</div>

<br>
<br>

<h1 align="center">React Native Maps Draw (Polygon)</h1>
<p align="center">Interactive drawing of polygons on the map. Beta version</p>
<h6 align="center">Made with ❤️ by developer for developers</h6>

<br>
<p align="center">
<img src="http://img.shields.io/travis/badges/badgerbadgerbadger.svg?style=flat-square" alt="build"/>
<img src="https://img.shields.io/github/issues/dev-event/react-native-maps-draw" alt="build"/>
<img src="https://img.shields.io/bitbucket/pr-raw/dev-event/react-native-maps-draw" alt="build"/>
<img src="http://img.shields.io/:license-mit-blue.svg?style=flat-square" alt="build"/>
</p>



## Thanks
<p>Please, click on ⭐ button.</p>

# Documentation & Examples

- [Installation](#installation)
- [Motivation](#motivation)
- [Usage](#usage)
- [Props](#props)
- [Example](#example)
- [What's inside](#whats-inside)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

## Installation

```bash
yarn add @dev-event/react-native-maps-draw
# or
npm install @dev-event/react-native-maps-draw
```
> Also, you need to install [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler) & [react-native-svg](https://github.com/react-native-community/react-native-svg), and follow theirs installation instructions.

##  🦥 Motivation
- 💚 I love [React Native](https://reactnative.dev/)


Big love and gratitude to all people who are working on React Native, Expo and React Native Navigation!

## Usage

For more complete example open [App.tsx](https://github.com/dev-event/react-native-maps-draw/blob/main/example/src/App.tsx)

```tsx
import React, { useState, useCallback, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import MapView, { 
  ILocationProps,
  IDrawResult, 
  TouchPoint,
  Marker
} from 'react-native-maps-draw';


const App: React.FC = () => {
  const mapRef = useRef<MapView>(null);

  const initialPolygon = useRef({
    polygons: [],
    distance: 0,
    lastLatLng: undefined,
    initialLatLng: undefined,
    centerLatLng: undefined,
  });

  const [modePolygon, setPolygonCreated] = useState<boolean>(false);

  const [isActiveDraw, setDrawMode] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [points, setPoints] = useState<TouchPoint[]>([]);

  const [polygon, setPolygon] = useState<IDrawResult>(initialPolygon.current);

  const handleMapReady = useCallback(() => mapRef.current && setIsReady(true), []);

  const handleRemovePolygon = useCallback(() => {
    setPolygon(initialPolygon.current);
    setPolygonCreated(false);
  }, []);

  const handleClear = useCallback(() => {
    setPolygon(initialPolygon.current);
    setPolygonCreated(false);
    setPoints([]);
  }, []);

  const handleIsDraw = useCallback(() => {
    if (!mapRef.current) return;
    setDrawMode((prevMode) => !prevMode);
  }, [handleClear, isActiveDraw]);

  const handleCanvasEndDraw = useCallback((locations) => {
    zoomCenterPolygon(locations.centerLatLng).then(() => {
      setPolygon(locations);
      setPolygonCreated(true);
    });
    setDrawMode((prevMode) => !prevMode);
  }, []);

  const zoomCenterPolygon = async (center: ILocationProps) => {
    if (!mapRef.current) return;
    const camera = await mapRef.current.getCamera();
    if (Platform.OS === 'ios') {
      mapRef.current.animateCamera({
        center: center,
      });
    }
    if (Platform.OS === 'android') {}
  };

 
  const hasMarkerClose = polygon.centerLatLng && (
    <Marker onPress={handleRemovePolygon} coordinate={polygon.centerLatLng}>
      <MarkerLocation />
    </Marker>
  );

  const handlePolygon = useCallback(
    (item, index) => <AnimatedPolygon key={index} coordinates={polygon.polygons} />,
    [polygon.polygons]
  );
  
  
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        points={points}
        widthLine={3}
        onEndDraw={handleCanvasEndDraw}
        isDrawMode={isActiveDraw}
        onMapReady={handleMapReady}
        onStartDraw={handleClear}
        createdPolygon={modePolygon}
        onChangePoints={setPoints}
        backgroundCanvas={'rgba(0, 0, 0, 0.0)'}
      >
        {isReady && modePolygon && polygon.polygons && polygon.polygons.length > 0 && (
          <>
            {hasMarkerClose}
            {polygon.polygons.map(handlePolygon)}
          </>
        )}
      </MapView>

      <TouchableOpacity style={styles.button} onPress={handleIsDraw}>
        {isActiveDraw ? (
          <Text style={styles.title}>ON</Text>
        ) : (
          <Text style={styles.title}>OFF</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    top: '10%',
    right: '10%',
    position: 'absolute',
    backgroundColor: 'tomato',
    padding: 16,
    zIndex: 4,
    borderRadius: 18,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});

```




## Props

| name                 | description                                                                                         | required | type                                                                                                        | default          |
| -------------------- | --------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------| -----------------|
| `points`             | An array of x, y coordinates for the drawing of the polygon.                                        | YES      | [`TouchPoint[]`](https://github.com/dev-event/react-native-maps-draw/blob/features/draw/src/types/index.ts) | []               |
| `unitDistance`       | Distance unit                                                                                       | NO       | [`Units`](https://github.com/dev-event/react-native-maps-draw/blob/features/draw/src/maps/types.d.ts)| 'm'              |
| `colorLine`          | Drawing line color                                                                                  | NO       | string                                                                                                      | '#791679'        |
| `widthLine`          | Drawing line width                                                                                  | NO       | number                                                                                                      | 3                |
| `onEndDraw`          | Callback is called after drawing is complete                                                        | NO       | (item: IDrawResult) => void                                                                                 |                  |
| `isDrawMode`         | Draw mode enabled / disabled | NO                                                                   | YES      | boolean                                                                                                     | false            |
| `renderPath`         | Custom canvas for drawing                                                                           | NO       | (path: string) => JSX.Element                                                                               |                  |
| `onStartDraw`        | Callback is called when drawing starts                                                              | NO       | () => void                                                                                                  |                  |
| `createdPolygon`     | Polygon rendering modifier                                                                          | YES      | boolean                                                                                                     | true             |
| `onChangePoints`     | Callback returns x, y touches                                                                       | YES      | (points: TouchPoint[]) => void                                                                              |                  |
| `fillColorCanvas`    | Canvas background                                                                                   | NO       | string                                                                                                      | 'rgba(0,0,0,0.0)'|
| `backgroundCanvas`   | The background of the View element overlapping the map (zIndex: 1)                                  | NO       | string                                                                                                      | rgba(0,0,0,0.10) |

## 🎉 Example

Checkout the example [here](https://github.com/dev-event/react-native-accordion).


## 📖 What's inside
- [React Native Maps](https://github.com/wix/react-native-navigation) -  is a component system for maps that ships with platform-native code that needs to be compiled together with React Native.
- [React Native Svg](https://github.com/react-native-svg/react-native-svg) - provides SVG support to React Native on iOS and Android, and a compatibility layer for the web.


## ✌️ Contributing

Pull requests are always welcome! Feel free to open a new GitHub issue for any changes that can be made.

## Author

Reach out to me at one of the following places!

- E-mail <a href="#" target="_blank">effectwaater@gmail.com</a>
- Medium at <a href="https://medium.com/@effectwaaters" target="_blank">https://medium.com/@effectwaaters </a>
- Instagram at <a href="https://www.instagram.com/dev_event/" target="_blank">https://www.instagram.com/dev_event/ </a>


## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
