import { Label } from '../../components/typography/label/Label';
import styles from './ColorBox.module.css';

const colors = [
    { hex: '#1A833B', textColor: '#ffffff', label: 'accent' },
    { hex: '#1A589F', textColor: '#ffffff', label: 'accent' },
    { hex: '#171717', textColor: '#ffffff', label: 'neutral' },
    { hex: '#FA782D', textColor: '#000000', label: 'support-1' },
    { hex: '#8C4799', textColor: '#ffffff', label: 'support-2' },
    { hex: '#439CCD', textColor: '#000000', label: 'info' },
    { hex: '#3AA426', textColor: '#000000', label: 'success' },
    { hex: '#FFC600', textColor: '#000000', label: 'warning' },
    { hex: '#D72800', textColor: '#ffffff', label: 'danger' },
]

function ColorItem({ hex, textColor, label }) {
    return (
        <div className={styles.item}>
            <div 
                className={styles.box}
                style={{
                    backgroundColor: hex,
                    color: textColor,
                }} 
            >
                {hex}
            </div>
            <Label>{label}</Label>
        </div>
    )
}

export function ColorBox() {
    return (
        <div className={styles.container}>
            {colors.map((color) => (
                <ColorItem 
                    key={color.hex}
                    hex={color.hex}
                    textColor={color.textColor}
                    label={color.label}
                />
            ))}
        </div>
    )
};
