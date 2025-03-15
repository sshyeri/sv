'use client';

import {BALL_SIZE, GRAVITY} from "@/consts/bouncing-ball.const";

type BallProps = {
    weight: number;
    fallHeight: number;
    drop: boolean;
}

export default function Ball({weight, fallHeight, drop}: BallProps) {

    const fallTimeSeconds = Math.sqrt((2 * fallHeight) / GRAVITY);
    const ballStyle = {
        width: BALL_SIZE,
        height: BALL_SIZE,
        borderRadius: '50%',
        backgroundColor: 'hotpink',
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: drop ? `transform ${fallTimeSeconds}s ease-in` : 'none',
        transform: drop ? `translateY(${fallHeight}px)` : 'translateY(0)',
    }

    return (
        <div style={ballStyle}>{weight}kg</div>
    );
}
