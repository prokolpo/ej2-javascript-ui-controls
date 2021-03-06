/**
 * Maps Annotation
 */
import { Maps, Annotations, Marker, MapsTheme, ILoadEventArgs, MapAjax } from '../src/index';
import { Africa_Continent } from './MapData/Africa_Continent';
import { IAnnotationRenderingEventArgs } from '../src/maps/model/interface';

Maps.Inject(Annotations, Marker);

    let maps: Maps = new Maps({
        zoomSettings: {
            enable: false
        },
        annotations: [
            {
                content: '#maps-annotation',
                x: '0%', y: '50%'
            }, {
                content: '#compass-maps',
                x: '80%', y: '5%'
            }
        ],
        annotationRendering: (args: IAnnotationRenderingEventArgs) => {
            if (args.content === '#compass-maps') {
                 args.cancel = true;
               }
        },
        layers: [
            {
                shapeDataPath: 'name',
                shapePropertyPath: 'name',
                shapeData: Africa_Continent,
                shapeSettings: {
                    fill: 'url(#grad1)'
                },
                markerSettings: [
                    {
                        visible: true,
                        template: '<h3 style="color:white">{{:name}}</h3>',
                        animationDuration: 1,
                        dataSource: [{
                            name: 'Africa', latitude: 13.97274101999902, longitude: 20.390625
                        }]
                    }
                ]
            }
        ]
    });
    maps.appendTo('#maps');