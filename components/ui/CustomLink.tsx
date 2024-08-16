import { Link } from 'expo-router';
import { LinkProps } from 'expo-router/build/link/Link';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function CustomLink(props: LinkProps) {
    const color = useThemeColor({}, 'link');

    return (
        <Link
            {...props}
            style={{
                textDecorationLine: 'underline',
                color,
            }}
        />
    );
}
