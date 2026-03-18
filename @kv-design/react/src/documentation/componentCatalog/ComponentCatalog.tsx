import { Link } from '../../components/link/Link';
import { Card } from '../../components/card/Card';
import { Heading } from '../../components/typography/heading/Heading';
import classes from './componentCatalog.module.css';


function getComponentNames() {
    const modules = import.meta.glob('../../components/**/*.stories.tsx', {
        // eager: true,
    });

    return Object.keys(modules).map((path) => {
        const parts = path.split('/');
        const file = parts[parts.length -1];
        return file.replace('.stories.tsx', '');
    });
};

function toCamelCase(str: string) {
    return str[0].toLowerCase() + str.slice(1);
};

export function ComponentIndex() {
    const componentNames = getComponentNames();

    return (
        <div className={classes.grid} >
            {componentNames.map((name) => (
                <Card >
                    <Card.Block>
                        <Heading>
                            <Link href={`/?path=/docs/components-${toCamelCase(name)}--docs`}>
                            {name}
                            </Link>
                        </Heading>
                    </Card.Block>
                </Card>
            ))}
        </ div>
    )
};
