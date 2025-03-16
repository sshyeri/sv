'use client';

import Ball from "@/app/bouncing-ball/components/Ball";
import {useEffect, useRef, useState} from "react";
import {BALL_SIZE, BALL_WEIGHTS, FALL_HEIGHTS, MULTIPLE_INPUT_THRESHOLD_MS} from "@/consts/bouncing-ball.const";
import styles from './Simulator.module.scss';

export default function Simulator() {
    const [drop, setDrop] = useState(false)
    const lastInputTime = useRef<number>(0);
    const inputCount = useRef<number>(0);

    useEffect(() => {
        window.addEventListener('keyup', onKeyUp);
        return () => {
            window.removeEventListener('keyup', onKeyUp);
        }
    }, []);

    const dropBall = () => setDrop(true)
    const resetBall = () => setDrop(false)
    const ballContainerHeight = Math.max(...FALL_HEIGHTS) + BALL_SIZE;

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

    const ballContainerStyle = (fallHeight: number) => {
        return {
            height: `${ballContainerHeight}px`,
            top: `${ballContainerHeight - fallHeight - BALL_SIZE}px`
        }
    }
    return <div className={styles.simulator}>
        <p className={styles.simulator__description}>
            {drop ? '공을 원래 위치로 되돌리고 싶으면, 아래 스페이스바 버튼을 세 번 연속 클릭하거나 키보드의 스페이스바를 세 번 연속 입력해주세요.'
                : '낙하를 시작하려면 아래 스페이스바 버튼을 더블클릭하거나, 키보드의 스페이스바를 두 번 연속 입력해주세요.'}
        </p>
        <button className={styles.simulator__button} onClick={handleInput}>스페이스바</button>
        <div className={styles["simulator__fall-area"]}>
            {FALL_HEIGHTS.map(fallHeight => (
                <div key={fallHeight} className={styles["simulator__fall-area__column"]}>
                    <h2>낙하 높이: {fallHeight}m</h2>
                    <div className={styles["ball-container"]} style={ballContainerStyle(fallHeight)}>
                        {BALL_WEIGHTS.map(weight => (
                            <Ball key={weight} weight={weight} fallHeight={fallHeight} drop={drop}/>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        <div className={styles.ground}></div>
    </div>
}
