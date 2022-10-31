import React from 'react';
import './Plan.css';
import { load } from '@2gis/mapgl';
import { Feature } from 'geojson';

enum BuildingParts {
    building = 'yes',
    wall = 'wall',
    concrete = 'concrete',
    stairs = 'stairs',
    elevator = 'elevator',
    toilet = 'toilet',
    office = 'office'
}

export class Plan extends React.Component {
    map: any = null;
    async componentDidMount(): Promise<void> {
        const [mapglAPI, data] = await Promise.all([load(), (await fetch('./floor.geojson')).json()]);

        data.features = data.features.map((value: Feature) => {
            return { ...value, properties: { type: value.properties?.tags?.Type || value.properties?.tags?.indoor } };
        });

        this.map = new mapglAPI.Map('map-container', {
            center: [27.634883, 53.917105],
            zoom: 20,
            key: '1c5eb4a7-23cb-4787-a5b1-b9dcc55c4d42'
        });

        new mapglAPI.GeoJsonSource(this.map, { data });

        this.map.on('styleload', () => {
            this.map.addLayer({
                id: `${BuildingParts.building}-object`,
                filter: ['match', ['get', 'type'], [BuildingParts.building], true, false],
                type: 'polygon',
                style: {
                    color: '#b4d5eddc'
                }
            });
            this.map.addLayer({
                id: `${BuildingParts.wall}-object`,
                filter: ['match', ['get', 'type'], [BuildingParts.wall], true, false],
                type: 'line',
                style: {
                    color: '#000'
                }
            });
            this.map.addLayer({
                id: `${BuildingParts.concrete}-object`,
                filter: ['match', ['get', 'type'], [BuildingParts.concrete], true, false],
                type: 'line',
                style: {
                    color: '#8193a1'
                }
            });
            this.map.addLayer({
                id: `${BuildingParts.stairs}-object`,
                filter: ['match', ['get', 'type'], [BuildingParts.stairs], true, false],
                type: 'line',
                style: {
                    color: '#ed3e67'
                }
            });
            this.map.addLayer({
                id: `${BuildingParts.elevator}-object`,
                filter: ['match', ['get', 'type'], [BuildingParts.elevator], true, false],
                type: 'line',
                style: {
                    color: '#413eed'
                }
            });
            this.map.addLayer({
                id: `${BuildingParts.toilet}-object`,
                filter: ['match', ['get', 'type'], [BuildingParts.toilet], true, false],
                type: 'line',
                style: {
                    color: '#000'
                }
            });
            this.map.addLayer({
                id: `${BuildingParts.office}-object`,
                filter: ['match', ['get', 'type'], [BuildingParts.office], true, false],
                type: 'line',
                style: {
                    color: '#000'
                }
            });
        });
    }

    componentWillUnmount(): void {
        this.map?.destroy();
    }

    render(): JSX.Element {
        return (
            <div className="panel">
                <div id="map-container" className="map"></div>
            </div>
        );
    }
}
