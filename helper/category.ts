import mccJSON from '../assets/mccGroupedUk.json';

// Визначення типу для об'єкта з ключами типу string і значеннями типу string
interface ICategyIconsByMccGroup {
    [key: string]: string;
}

interface ICategyIconsByMcc {
    [key: string]: string;
}


const categyIconsByMccGroup: ICategyIconsByMccGroup = {
    'AS': 'agriculture',
    'CS': 'handyman',
    'WSM': 'local_shipping',
    'AL': 'airplanemode_active',
    'CR': 'car_rental',
    'HR': 'hotel',
    'TS': 'directions_bus',
    'US': 'build',
    'SP': 'engineering',
    'ROS': 'shopping-cart',
    'CV': 'directions_car',
    'CLS': 'checkroom',
    'MS': 'food-bank',
    'MTS': 'local_post_office',
    'PS': 'person',
    'BS': 'business_center',
    'RS': 'home_repair_service',
    'ES': 'theaters',
    'PFS': 'account_balance',
    'MO': 'groups',
    'GS': 'account_balance',
    'NC': 'help_outline',
}

const categyIconsByMcc: ICategyIconsByMcc = {
    "5818": "computer",
    "7230": "face-retouching-natural",
    "5993": "smoke-free",
    "7997": "sports"
}

type MccType = {
    mcc: string;
    group: Group;
    fullDescription: Description;
    shortDescription: Description;
}

interface Group {
    type: string;
    description: Description;
}
interface Description {
    uk: string;
    en: string;
    ru: string;
}

interface Category {
    mcc: string[];
    group: {
        type: string;
        description: string;
    };
    description: string;
}
const manualIncomeCategories: Category[] = [
    {
        mcc: [],
        group: { type: 'income', description: 'Зарплата' },
        description: 'Зарплата'
    },
    // Додайте інші категорії за потребою
];
const groupByDescription = (mccData: MccType[]): Category[] => {
    const grouped = new Map<string, Category>();

    mccData.forEach(mcc => {
        const description = mcc.shortDescription.uk;
        if (grouped.has(description)) {
            const category = grouped.get(description);
            if (category && !category.mcc.includes(mcc.mcc)) {
                category.mcc.push(mcc.mcc);
            }
        } else {
            grouped.set(description, {
                mcc: [mcc.mcc],
                group: {
                    type: mcc.group.type,
                    description: mcc.group.description.uk,
                },
                description,
            });
        }
    });

    return Array.from(grouped.values());
};

const categories: {
    income: Category[];
    expense: Category[];
} = {
    income: manualIncomeCategories,
    expense: mccJSON,
};

export const CategoryHelper = {
    getCategryIconByMcc: (mcc: string): string | undefined => {

        const data: Category | undefined = mccJSON.find(el => el['mcc'].includes(mcc));
  


        if (!data) return 'help-outline';

        if (categyIconsByMcc.hasOwnProperty(mcc)) {
            return categyIconsByMcc[mcc];
        }
        const iconKey = data.group.type;
        if (categyIconsByMccGroup.hasOwnProperty(iconKey)) {
            return categyIconsByMccGroup[iconKey];
        } else {
            return 'defaultIcon';
        }
    },
    getAllByType: (type: 'income' | 'expense') => {
        return categories[type];
    },
    byMcc: (mcc: string) => {
        return mccJSON.find(el => el.mcc.includes(mcc))
    }

} 