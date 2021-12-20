import React from 'react';
import Chart from 'react-google-charts';

export default function CustomPieChart(props:any) {

    // const props_example = {
    //     title: 'Кількість зареєстрованих на мітап',
    //     data: [
    //         ['ВНЗ', 'Кількість'],
    //         ['ЧНУ', 12],
    //         ['ЧДТУ', 8],
    //         ['ЧДБК', 4],
    //     ]
    // }
    return (
        <Chart
            width={'500px'}
            height={'300px'}
            chartType="PieChart"
            loader={<div>Завантаження секторного графіку</div>}
            data={ props.data }
            options={{
                title: props.title
            }}
            rootProps={{ 'data-testid': '1' }}
        />
    );
}

