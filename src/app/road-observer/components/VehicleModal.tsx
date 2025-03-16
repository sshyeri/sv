'use client';

import {useEffect} from "react";
import {Coordinate} from "@/types/road-observer.type";

type VehicleModalProps = {
    position: Coordinate;
    fovCoverageRatio: number;
    onClose: () => void;
}

export default function VehicleModal({position, fovCoverageRatio, onClose}: VehicleModalProps) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        });
        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', () => {});
        }
    }, []);

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
                borderRadius: '5px',
                top: position.y,
                left: position.x,
                padding: 15

            }} onClick={(e) => e.stopPropagation()}>
                <h4>FOV Coverage Ratio: {fovCoverageRatio}%</h4>
                <button onClick={onClose}>close</button>
            </div>

        </div>
    )

}
