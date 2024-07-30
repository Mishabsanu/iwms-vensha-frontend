import React from 'react';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import {Typography} from "@mui/material";
import JumboDdMenu from "@jumbo/components/JumboDdMenu/JumboDdMenu";
import JumboRqTabs from "@jumbo/components/JumboReactQuery/JumboRqTabs";
import JumboRqList from "@jumbo/components/JumboReactQuery/JumboRqList";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import PropertyItem from "./PropertyItem";
import {useTranslation} from "react-i18next";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";

const PropertiesList = () => {
    const {t} = useTranslation();
    const {theme} = useJumboTheme();

    const [queryOptions, setQueryOptions] = React.useState({
        queryKey: "properties",
        queryParams: {category: {id: 1, name: 'All', slug: 'all'}},
        dataKey: "propertiesList",
    });
    const handleCategory = (category) => {
        setQueryOptions(state => ({...state, queryParams: {category: category}}))
    };

    const renderPropertyItem = React.useCallback((propertyItem) => {
        return <PropertyItem item={propertyItem}/>
    });

    return (
        <JumboCardQuick
            title={
                <Typography
                    component={"div"}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        [theme.breakpoints.down('md')]: {
                            flexWrap: 'wrap'
                        }
                    }}
                >
                    <Typography
                        variant={"h4"}
                        mb={0}
                        sx={{
                            [theme.breakpoints.down('md')]: {
                                width: '100%',
                                marginBottom: 2
                            }
                        }}
                    >
                        {t("widgets.title.properties1")}
                    </Typography>
                </Typography>
            }
            action={
                <JumboDdMenu
                    menuItems={[
                        {title: "More Detail", slug: "more-detail"},
                        {title: "Close", slug: "close"}
                    ]}
                />
            }
            headerSx={{
                borderBottom: 1,
                borderBottomColor: 'divider',

                '& .MuiCardHeader-action': {
                    my: -.75
                }
            }}
            wrapperSx={{
                p: 0,
                '&:last-child': {
                    pb: 2
                },
                '& .MuiCollapse-entered:last-child': {
                    '& .MuiListItemButton-root': {
                        borderBottom: 0,
                        borderBottomColor: 'transparent',
                    }
                }
            }}
        >
        </JumboCardQuick>
    );
};

export default PropertiesList;
