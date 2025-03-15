'use client';

import Ball from "@/app/bouncing-ball/components/Ball";
import {useEffect, useRef, useState} from "react";
import {BALL_WEIGHTS, FALL_HEIGHTS, MULTIPLE_INPUT_THRESHOLD_MS} from "@/consts/bouncing-ball.const";
import styles from './Simulator.module.scss';

function Simulator() {
    const [drop, setDrop] = useState(false)
    const lastInputTime = useRef(0);
    const inputCount = useRef(0);

    useEffect(() => {
        window.addEventListener('keyup', onKeyUp);
        return () => {
            window.removeEventListener('keyup', onKeyUp);
        }
    }, []);

    const dropBall = () => setDrop(true)
    const resetBall = () => setDrop(false)


    const handleInput = () => {
        const currentTime = Date.now();
        if (currentTime - lastInputTime.current < MULTIPLE_INPUT_THRESHOLD_MS) {
            inputCount.current++;
        } else {
            inputCount.current = 1;
        }
        lastInputTime.current = currentTime;

        if (inputCount.current === 2) {
            dropBall();
        } else if (inputCount.current === 3) {
            resetBall();
            inputCount.current = 0;
        }
    }

    const onKeyUp = (event: KeyboardEvent) => {
        if (event.code === 'Space') {
            handleInput();
        }
    }

    return <div className={styles.simulator}>
        <div>
            {FALL_HEIGHTS.map(fallHeight => (
                <div key={fallHeight}>
                    <h3>낙하 높이: {fallHeight}m</h3>
                    {BALL_WEIGHTS.map(weight => (
                        <Ball key={weight} weight={weight} fallHeight={fallHeight} drop={drop}/>
                    ))}
                </div>
            ))}
            <Ball weight={50} fallHeight={100} drop={drop}/>

        </div>
        <button onClick={handleInput}>스페이스바</button>
    </div>
}

export default Simulator;

