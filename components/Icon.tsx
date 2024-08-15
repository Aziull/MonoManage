import { icons, LucideIcon } from 'lucide-react-native';
import { TextStyle } from 'react-native';

const Icon = ({ name, color, size, style }: {
    name: string,
    color?: string,
    size?: number,
    style?: TextStyle
}) => {
    const LucideIconComponent = icons[name as keyof typeof icons] as LucideIcon | undefined;

    if (!LucideIconComponent) {
        console.error(`Icon with name "${name}" does not exist.`);
        return null;
    }

    return <LucideIconComponent color={color} size={size} style={style} />;
};

export default Icon;