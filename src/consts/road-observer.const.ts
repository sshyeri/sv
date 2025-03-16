export const ROAD_WIDTH = 80;
export const ROAD_LENGTH = 880;
export const VEHICLE_RECT_DATA_KEY = 'fovCoverageRatio'

export enum VehicleType {
    Visible = 'Visible',
    Invisible = 'Invisible',
    Observer = 'Observer',
    Straddle = 'Straddle',
    null = 'null'
}

export const VehicleColor: Record<VehicleType, string> = {
    [VehicleType.Visible]: 'green',
    [VehicleType.Invisible]: 'red',
    [VehicleType.Observer]: 'pink',
    [VehicleType.Straddle]: 'blue',
    [VehicleType.null]: 'gray',
};

