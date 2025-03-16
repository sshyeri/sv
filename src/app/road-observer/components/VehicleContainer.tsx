import {useEffect, useRef, useState} from "react";
import {Container, SVG} from "@svgdotjs/svg.js";
import {Coordinate, Observer, SelectedVehicleData, Vehicle} from "@/types/road-observer.type";
import {createObserverRect, createVehicleRect} from "@/utils/road-observer.util";
import {VEHICLE_RECT_DATA_KEY} from "@/consts/road-observer.const";

type SvgContainerProps = {
    width: number;
    height: number;
    vehicles: Vehicle[];
    observer: Observer;
    onVehicleClick: (data: SelectedVehicleData) => void;
}

export default function VehicleContainer({width, height, vehicles, observer, onVehicleClick}: SvgContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [svgContainer, setSvgContainer] = useState<Container | null>(null);
    const [svgContainerRectPosition, setSvgContainerRectPosition] = useState<Coordinate>({x: 0, y: 0});

    useEffect(() => {
        if (!containerRef.current) return;
        const container = SVG().addTo(containerRef.current).size(width, height);
        setSvgContainer(container);

        const rect = containerRef.current.getBoundingClientRect();
        setSvgContainerRectPosition({x: rect.x, y: rect.y});

        return () => {
            container.clear();
            container.remove();
        }
    }, [width, height]);

    useEffect(() => {
        if (!svgContainer) return;
        svgContainer.clear();
        const group = svgContainer.group();

        createObserverRect(observer, group);
        vehicles.forEach(vehicle => {
            const rect = createVehicleRect(vehicle, observer, group);
            const fovCoverageRatio = rect.data(VEHICLE_RECT_DATA_KEY);
            if (fovCoverageRatio > 0 && fovCoverageRatio < 1) {
                rect.on('click', () => onVehicleClick({
                    position: {
                        x: vehicle.position.x + vehicle.width + svgContainerRectPosition.x,
                        y: vehicle.position.y + svgContainerRectPosition.y
                    },
                    fovCoverageRatio
                }));
            }
        });

    }, [vehicles, observer, svgContainer, svgContainerRectPosition, onVehicleClick]);

    return <div ref={containerRef} style={{width: 'fit-content', backgroundColor: 'lightgray'}}></div>;
}
