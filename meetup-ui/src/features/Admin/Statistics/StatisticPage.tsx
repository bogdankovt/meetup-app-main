import { Box } from "@mui/system";
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchStatistics, statisticSelector } from "./StatisticControlSlice";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarFilterButton, useGridApiContext, useGridState } from "@mui/x-data-grid";
import { Pagination, Typography } from "@mui/material";
import moment from "moment";
import CustomPieChart from "../../../components/Charts/CustomPieChart";


function CustomPagination() {
    const apiRef = useGridApiContext();
    const [state] = useGridState(apiRef);

    return (
        <Pagination
            color="primary"
            count={state.pagination.pageCount}
            page={state.pagination.page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    );
}

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
        </GridToolbarContainer>
    );
}

export const StatisticPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStatistics())
    }, [])

    const statisticControl = useSelector(statisticSelector);
    console.log(statisticControl);

    let changeDate = statisticControl.data.map((s: any) => ({ ...s, date: moment(s.date).calendar() }));

    const columns = [
        { field: 'title', headerName: 'Мітап', width: 200 },
        { field: 'date', headerName: 'Дата проведення', width: 160 },
        { field: 'registrations', headerName: 'Зареєстровані', type: 'number', width: 130 },
        { field: 'student', headerName: 'Навчаються', type: 'number', width: 120 },
        { field: 'it', headerName: 'Працюють в ІТ', type: 'number', width: 140 },
        { field: 'work', headerName: 'Працюють', type: 'number', width: 105 },
        { field: 'chnu', headerName: 'З ЧНУ', type: 'number', width: 80 },
        { field: 'csbc', headerName: 'З ЧДБК', type: 'number', width: 90 },
        { field: 'chdtu', headerName: 'З ЧДТУ', type: 'number', width: 90 },
        // { field: 'topLink', headerName: 'Джерело', type: 'number', width: 130 }
    ];

    let add = (a: number, b: number) => a + b;
    let reduce = (reducer: any, initVal: number) => (list: any) => list.reduce(reducer, initVal);

    let countOfAllRegisteredFromChnu = 0;
    let countOfAllRegisteredFromChdtu = 0;
    let countOfAllRegisteredFromCsbc = 0;
    if (statisticControl.length != 0) {
        countOfAllRegisteredFromChnu = statisticControl.data.map((s: any) => s.chnu).reduce(add, 0);
        countOfAllRegisteredFromChdtu = statisticControl.data.map((s: any) => s.chdtu).reduce(add, 0);
        countOfAllRegisteredFromCsbc = statisticControl.data.map((s: any) => s.csbc).reduce(add, 0);
    }

    const allRegisteredFromUniversitiesPieChart = {
        title: 'Кількість зареєстрованих на всі мітапи по ВНЗ',
        data: [
            ['ВНЗ', 'Кількість'],
            ['ЧНУ', countOfAllRegisteredFromChnu],
            ['ЧДТУ', countOfAllRegisteredFromChdtu],
            ['ЧДБК', countOfAllRegisteredFromCsbc],
        ]
    };

    let countOfAllRegisteredFromFirstActivity = 0;
    let countOfAllRegisteredFromSecondActivity = 0;
    let countOfAllRegisteredFromThirdActivity = 0;
    if (statisticControl.length != 0) {
        countOfAllRegisteredFromFirstActivity = statisticControl.data.map((s: any) => s.student).reduce(add, 0);
        countOfAllRegisteredFromSecondActivity = statisticControl.data.map((s: any) => s.work).reduce(add, 0);
        countOfAllRegisteredFromThirdActivity = statisticControl.data.map((s: any) => s.it).reduce(add, 0);
    }

    const allRegisteredFromActivitiesPieChart = {
        title: 'Кількість зареєстрованих на всі мітапи по діяльності',
        data: [
            ['Діяльність', 'Кількість'],
            ['Відвідую ВНЗ', countOfAllRegisteredFromFirstActivity],
            ['Працюю в IT', countOfAllRegisteredFromSecondActivity],
            ['Хочу в IT', countOfAllRegisteredFromThirdActivity],
        ]
    };

    return (
        <Box sx={{ pt: "40px" }}>
            <Typography variant="h2">Статистика по мітапам</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <CustomPieChart title={allRegisteredFromUniversitiesPieChart.title} data={allRegisteredFromUniversitiesPieChart.data} />
                <CustomPieChart title={allRegisteredFromActivitiesPieChart.title} data={allRegisteredFromActivitiesPieChart.data} />
            </Box>
            <Box sx={{ height: 500, width: "100%", pt: "80px" }}>
                <DataGrid
                    pagination
                    disableColumnMenu={true}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    components={{
                        Toolbar: CustomToolbar,
                        Pagination: CustomPagination,
                    }}
                    rows={changeDate}
                    columns={columns}
                ></DataGrid>
            </Box>
        </Box>
    );
}