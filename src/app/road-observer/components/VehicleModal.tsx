'use client';

import {useCallback, useEffect} from "react";
import {SelectedVehicleData} from "@/types/road-observer.type";

type VehicleModalProps = {
    data: SelectedVehicleData;
    onClose: () => void;
}

export default function VehicleModal({data: {position, fovCoverageRatio}, onClose}: VehicleModalProps) {

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [handleKeyDown]);

    return (
        <div style={{
            position: 'fixed',
            backgroundColor: 'rgba(0,0,0,0.2)',
            top: 0,
            left: 0,
            zIndex: 1,
            width: '100vw',
            height: '100vh',
        }} onClick={onClose}>
            <div style={{
                position: 'absolute',
                backgroundColor: 'white',
                borderRadius: 5,
                top: position.y,
                left: position.x,
                padding: 15
            }} onClick={(e) => e.stopPropagation()}>
                <h4>FOV Coverage Ratio: {Math.round(fovCoverageRatio * 100)}%</h4>
                <button onClick={onClose}>close</button>
            </div>

        </div>
    )

}
