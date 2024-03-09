import mccJSON from '../assets/mcc.json'

// Визначення типу для об'єкта з ключами типу string і значеннями типу string
interface ICategyIconsByMccGroup {
    [key: string]: string;
}

interface ICategyIconsByMcc {
    [key: string]: string;
}

interface Category {
    id: string; // Унікальний ідентифікатор категорії
    name: string; // Назва категорії
    mcc?: number[]; // Список MCC, асоційованих з категорією
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
} | undefined;

interface Group {
    type: string;
    description: Description;
}
interface Description {
    uk: string;
    en: string;
    ru: string;
}

const categories = {
    income: mccJSON.map(mcc => {
        return {
            mcc: [mcc.mcc],
            group: {
                type: mcc.group.type,
                description: mcc.group.description.uk,
            },
            description: mcc.shortDescription.uk
        }

    }),
    expense: [
        {
            mcc: [''],
            group: {
                type: '',
                description: '',
            },
            description: 'Зарплата'
        }
    ]
}

export const CategoryHelper = {
    getCategryIconByMcc: (mcc: string): string | undefined => {

        const data: MccType = mccJSON.find(el => el['mcc'] == mcc);


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
        return mccJSON.find(el => el.mcc == mcc)
    }

} 