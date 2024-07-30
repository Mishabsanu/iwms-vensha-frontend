import React from 'react';
import {Typography} from "@mui/material";
import JumboRqTabs from "@jumbo/components/JumboReactQuery/JumboRqTabs";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import JumboRqList from "@jumbo/components/JumboReactQuery/JumboRqList";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import TaskItem from "./TaskItem";
import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import {useTranslation} from "react-i18next";

const TasksList2 = ({scrollHeight}) => {
    const {t} = useTranslation();

    const renderTasksItem = React.useCallback((taskItem) => {
        return <TaskItem item={taskItem}/>
    }, []);

    const [queryOptions, setQueryOptions] = React.useState({
        queryKey: "tasks",
        queryParams: {myTask: {id: 1, name: 'All Tasks', userId: 100}},
        dataKey: "tasks"
    });

    const handleCategory = React.useCallback((myTask) => {
        setQueryOptions(state => ({...state, queryParams: {myTask: myTask}}))
    }, []);

    return (
        <JumboCardQuick
            title={
                <Typography
                    component={"div"}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant={"h4"} mb={0}>
                        {t("widgets.title.taskList")}
                    </Typography>
                </Typography>}
            action={
                <JumboDdMenu
                    menuItems={[
                        {id: 1, title: 'More Detail', slug: 'more-detail'},
                        {id: 2, title: 'Close', slug: 'close'}
                    ]}
                />
            }
            headerSx={{
                borderBottom: 1,
                borderColor: 'divider',

                '& .MuiCardHeader-action': {
                    my: -.75
                }
            }}
            wrapperSx={{p: 0}}
        >
        </JumboCardQuick>
    );
};

export default TasksList2;
