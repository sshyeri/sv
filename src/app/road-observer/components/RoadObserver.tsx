"use client";

import {useCallback, useState} from 'react';
import useRoadStream from "@/hooks/useRoadStream.hook";
import {SelectedVehicleData} from '@/types/road-observer.type';
import VehicleContainer from '@/app/road-observer/components/VehicleContainer';
import VehicleModal from "@/app/road-observer/components/VehicleModal";


export default function RoadObserver() {
    const [selectedVehicleData, setSelectedVehicleData] = useState<SelectedVehicleData | null>(null);
    const [isPaused, setIsPaused] = useState(true);
    const {road} = useRoadStream(isPaused);
    const togglePlay = () => {
        setIsPaused(current => !current);
    }

    const closeModal = useCallback((): void => {
        setSelectedVehicleData(null);
        setIsPaused(false);
    }, []);

    const selectVehicle = useCallback((data: SelectedVehicleData): void => {
        setSelectedVehicleData(data);
        setIsPaused(true);

    }, [])

    return (
        <div>
            <button onClick={togglePlay}
                    area-label="play/pause"
                    style={{fontSize: 20, padding: 6, marginBottom: 20}}>
                {isPaused ? 'play' : 'pause'}
            </button>
            {road
                ? (<div style={{position: "relative"}}>
                    <VehicleContainer width={road.width}
                                      height={road.length}
                                      vehicles={road.vehicles}
                                      observer={road.observer}
                                      onVehicleClick={selectVehicle}/>
                    {selectedVehicleData &&
                        <VehicleModal data={selectedVehicleData}
                                      onClose={closeModal}/>
                    }
                </div>)
                : (<p>No road data available. Click play to start.</p>)
            }
        </div>
    );
}
