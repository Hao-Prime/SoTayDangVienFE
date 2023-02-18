import React, { useEffect, useState } from 'react';

import { useTheme } from '@mui/system'
import ReactEcharts from 'echarts-for-react'
import Services from 'app/services';

const DoughnutChart = ({ height, color = [] }) => {
    const theme = useTheme()
    const [option, setOption] = useState({
        legend: {
            show: true,
            itemGap: 20,
            icon: 'circle',
            bottom: 0,
            textStyle: {
                color: theme.palette.text.secondary,
                fontSize: 13,
                fontFamily: 'roboto',
            },
        },
        tooltip: {
            show: false,
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        xAxis: [
            {
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
        ],
        yAxis: [
            {
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
        ],

        series: [
            {
                name: 'Traffic Rate',
                type: 'pie',
                radius: ['45%', '72.55%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                hoverOffset: 5,
                stillShowZeroSum: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center', // shows the description data to center, turn off to show in right side
                        textStyle: {
                            color: theme.palette.text.secondary,
                            fontSize: 13,
                            fontFamily: 'roboto',
                        },
                        formatter: '{a}',
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '14',
                            fontWeight: 'normal',
                            // color: "rgba(15, 21, 77, 1)"
                        },
                        formatter: '{b} \n{c} ({d}%)',
                    },
                },
                labelLine: {
                    normal: {
                        show: false,
                    },
                },
                data: [
                    {
                        value: 65,
                        name: 'Đảng viên',
                    },
                    {
                        value: 20,
                        name: 'Dự bị',
                    },
                    { value: 15, name: 'Quần chúng ưu tú' },
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    });

    var isMounted = true;
    useEffect(() => {
        isMounted = true;
        Services.getThongKeService().getTiLeChucVuDangVien().then(
            (response) => {
                if (response.data != null) {
                    setOption({
                        legend: {
                            show: true,
                            itemGap: 20,
                            icon: 'circle',
                            bottom: 0,
                            textStyle: {
                                color: theme.palette.text.secondary,
                                fontSize: 13,
                                fontFamily: 'roboto',
                            },
                        },
                        tooltip: {
                            show: false,
                            trigger: 'item',
                            formatter: '{a} <br/>{b}: {c} ({d}%)',
                        },
                        xAxis: [
                            {
                                axisLine: {
                                    show: false,
                                },
                                splitLine: {
                                    show: false,
                                },
                            },
                        ],
                        yAxis: [
                            {
                                axisLine: {
                                    show: false,
                                },
                                splitLine: {
                                    show: false,
                                },
                            },
                        ],

                        series: [
                            {
                                name: 'Traffic Rate',
                                type: 'pie',
                                radius: ['45%', '72.55%'],
                                center: ['50%', '50%'],
                                avoidLabelOverlap: false,
                                hoverOffset: 5,
                                stillShowZeroSum: false,
                                label: {
                                    normal: {
                                        show: false,
                                        position: 'center', // shows the description data to center, turn off to show in right side
                                        textStyle: {
                                            color: theme.palette.text.secondary,
                                            fontSize: 13,
                                            fontFamily: 'roboto',
                                        },
                                        formatter: '{a}',
                                    },
                                    emphasis: {
                                        show: true,
                                        textStyle: {
                                            fontSize: '14',
                                            fontWeight: 'normal',
                                            // color: "rgba(15, 21, 77, 1)"
                                        },
                                        formatter: '{b} \n{c} ({d}%)',
                                    },
                                },
                                labelLine: {
                                    normal: {
                                        show: false,
                                    },
                                },
                                data: [
                                    {
                                        value: response.data?.soLuongDangVienChinhThuc,
                                        name: 'Đảng viên',
                                    },
                                    {
                                        value: response.data?.soLuongDangVienDuBi,
                                        name: 'Dự bị',
                                    },
                                    {
                                        value: response.data?.soLuongQCUT,
                                        name: 'Quần chúng ưu tú'
                                    },
                                ],
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                                    },
                                },
                            },
                        ],
                    })
                }

            }
        );
        return () => { isMounted = false; };
    }, []);
    return (
        <ReactEcharts
            style={{ height: height }}
            option={{
                ...option,
                color: [...color],
            }}
        />
    )
}

export default DoughnutChart
