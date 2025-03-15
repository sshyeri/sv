'use client';

type BallProps = {
    weight: number;
    fallHeight: number;
    drop: boolean;
}

export default function Ball({weight, fallHeight, drop}: BallProps) {
    return (
        <div
            style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                backgroundColor: 'pink',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >{weight}kg</div>
    );
}
