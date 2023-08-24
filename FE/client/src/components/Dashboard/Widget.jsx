import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;


const Widget = ({ date, data, description, children, icon }) => {
    return (
        <>
            <Card
                style={{
                    width: "100%",
                    marginTop: 16,
                }}

                actions={date ? [new Date(date).toUTCString()] : []}
            >
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: 'space-between',

                    }}
                >

                    <Meta
                        avatar={icon}
                        style={{ width: '50%' }}

                    />
                    <div style={{
                        width: '50%',
                        textAlign: 'end'
                    }}>
                        <div> {data}</div>
                        <div> {description}</div>
                    </div>

                    {children}
                </div>

            </Card >
        </>
    );
};

export default Widget