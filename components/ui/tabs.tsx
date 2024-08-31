import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import { View, ViewProps } from 'react-native';

interface BaseTabData {
    value: string;
}

interface TabsProps<T extends BaseTabData> extends ViewProps {
    tabs: T[];
    defaultValue: T['value'];
    children: ReactNode;
}

interface TabsListProps<T extends BaseTabData> extends ViewProps {
    renderTrigger: (props: { tab: T; isActive: boolean; changeTab: () => void }) => React.ReactNode;
    renderActiveTrigger?: (child: React.ReactNode) => React.ReactNode;
}

type TabsContextProps<T extends BaseTabData> = {
    tabs: T[];
    activeTab: T['value'];
    handleChangeTab: (value: T['value']) => void;
};

const TabsContext = createContext<TabsContextProps<BaseTabData> | undefined>(undefined);

const useTabsContext = <T extends BaseTabData>() => {
    const context = useContext((TabsContext as unknown) as React.Context<TabsContextProps<T> | undefined>);
    if (!context) {
        throw new Error('useTabsContext must be used within a Tabs component');
    }
    return context;
};
const Tabs = <T extends BaseTabData>({ defaultValue, children, tabs, ...props }: TabsProps<T>) => {
    type TabValue = T['value'];
    const [activeTab, setActiveTab] = React.useState<TabValue>(defaultValue);

    const handleChangeTab = useCallback((value: string) => {
        setActiveTab(value);
    }, []);

    return (
        <TabsContext.Provider value={{ activeTab, handleChangeTab, tabs }}>
            <View {...props}>{children}</View>
        </TabsContext.Provider>
    );
};

const TabsList = <T extends BaseTabData>({
    renderTrigger,
    renderActiveTrigger = (child) => <>{child}</>,
    ...props
}: TabsListProps<T>) => {
    const context = useTabsContext<T>();

    if (!context) {
        throw new Error('TabsList must be used within a Tabs component');
    }

    const { activeTab, handleChangeTab, tabs } = context;

    return (
        <View style={{ flexDirection: 'row' }} {...props}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.value;
                const render = (isActive: boolean): ReactNode => renderTrigger({
                    tab,
                    isActive: isActive,
                    changeTab: () => handleChangeTab(tab.value),
                })
                return isActive ? renderActiveTrigger(
                    render(true)
                ) : render(false);
            }
            ).map((element, index) => (
                <React.Fragment key={tabs[index].value}>
                    {element}
                </React.Fragment>
            ))}
        </View>
    );
};


interface TabPanelProps<T extends BaseTabData> extends ViewProps {
    value: T['value'];
    children: React.ReactNode;
}

const TabPanel = <T extends BaseTabData>({ children, ...props }: TabPanelProps<T>) => {
    return <>{children}</>; // Дітям не потрібно знати про значення, оскільки фільтрація буде в TabPanels
};

const TabPanels = <T extends BaseTabData>({ children, ...props }: { children: React.ReactNode } & ViewProps) => {
    const { activeTab } = useTabsContext<T>(); // Отримуємо активну вкладку з контексту

    return (
        <View {...props}>
            {React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) return null;

                // Відображаємо тільки той контент, що відповідає активній вкладці
                return child.props.value === activeTab ? child : null;
            })}
        </View>
    );
};


export { Tabs, TabsList, TabPanels, TabPanel };
