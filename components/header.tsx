import {
    Burger,
    Center,
    Container,
    createStyles,
    Group,
    Header,
    Menu,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
    inner: {
        height: 56,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    links: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
        },
    },

    linkLabel: {
        marginRight: 5,
    },
}));

export interface HeaderSearchProps {
    links: {
        link: string;
        label: string;
        links?: { link: string; label: string }[];
        onClick: () => void;
    }[];
}

interface IProps {
    links: any;
}

export function HeaderMenuColored(props: IProps) {
    const { links } = props;
    const { classes } = useStyles();
    const [opened, { toggle }] = useDisclosure(false);

    const items = links.links.map((link: any) => {
        const menuItems = link.links?.map((item: any) => (
            <Menu.Item key={item.link} onClick={() => item?.onClick()}>
                {item.label}
            </Menu.Item>
        ));

        if (menuItems) {
            return (
                <Menu
                    key={link.label}
                    trigger="hover"
                    exitTransitionDuration={0}
                >
                    <Menu.Target>
                        <a
                            href={link.link}
                            className={classes.link}
                            onClick={() => link?.onClick()}
                        >
                            <Center>
                                <span className={classes.linkLabel}>
                                    {link.label}
                                </span>
                            </Center>
                        </a>
                    </Menu.Target>
                    <Menu.Dropdown>{menuItems}</Menu.Dropdown>
                </Menu>
            );
        }

        return (
            <a
                key={link.label}
                href={link.link}
                className={classes.link}
                onClick={() => link?.onClick()}
            >
                {link.label}
            </a>
        );
    });

    return (
        <Header height={56} className={classes.link} mb={120}>
            <Container>
                <div className={classes.inner}>
                    💱 hinnateavitus
                    <Group spacing={5} className={classes.links}>
                        {items}
                    </Group>
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        className={classes.burger}
                        size="sm"
                        color="#fff"
                    />
                </div>
            </Container>
        </Header>
    );
}
