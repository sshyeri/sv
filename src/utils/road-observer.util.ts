import {Observer, Vehicle} from "@/types/road-observer.type";
import {G, Rect} from "@svgdotjs/svg.js";
import {VEHICLE_RECT_DATA_KEY, VehicleColor, VehicleType} from "@/consts/road-observer.const";

function degreeToRadian (degree: number): number {
    return (Math.PI / 180) * degree;
}

function calcFovCoverageRatio(vehicle: Vehicle, observer: Observer): number {
    const slope = Math.tan(degreeToRadian((180 - observer.fov) / 2));

    const {
        direction: observerDirection,
        position: {y: observerY, x: observerX},
        length: observerLength,
        width: observerWidth
    } = observer;
    const {position: {x, y}, length, width, direction} = vehicle;
    const centerX = observerX + observerWidth / 2;
    const centerY = observerDirection === 1 ? observerY + observerLength : observerY;

    const x1 = x - centerX;
    const x2 = x - centerX + width;
    const y1 = (y - centerY) * direction;
    const y2 = (y - centerY + length) * direction;

    const allowedY1 = slope * x1 * direction;
    const allowedY2 = slope * x2 * direction;

    if (y1 < allowedY1 && y2 < allowedY2) {
        return 0;
    } else if (y1 > allowedY1 && y2 > allowedY2) {
        return 1;
    } else {
        const targetY = Math.max(y1, y2);
        return (Math.abs(targetY - allowedY1) + Math.abs(targetY - allowedY2)) / (2 * length);
    }
}

function createVehicleRectBase(vehicle: Vehicle | Observer, group: G): Rect {
    const {width, length, position: {x, y}, direction} = vehicle;
    const rect = group.rect(width, length).move(x, y);
    const frontY = direction === 1 ? y + length : y;
    group.circle().center(x + width / 2, frontY).radius(1).fill('yellow');
    return rect;
}

export function createObserverRect(observer: Observer, group: G) {
    const rect = createVehicleRectBase(observer, group);
    rect.fill(VehicleColor[VehicleType.Observer]);
}

export function createVehicleRect(vehicle: Vehicle, observer: Observer, group: G): Rect {
    const rect = createVehicleRectBase(vehicle, group)
    const fovCoverageRatio = calcFovCoverageRatio(vehicle, observer);
    if (fovCoverageRatio === 1) {
        rect.fill(VehicleColor[VehicleType.Visible]);
    } else if (fovCoverageRatio === 0) {
        rect.fill(VehicleColor[VehicleType.Invisible]);
    } else {
        rect.fill(VehicleColor[VehicleType.Straddle]).opacity(fovCoverageRatio);
        rect.data(VEHICLE_RECT_DATA_KEY, fovCoverageRatio);
    }
    return rect;
}
