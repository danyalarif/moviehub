const styles = (theme) => ({
    card: {
        transition: '500ms',
        cursor: 'pointer',
        '&: hover': {
            transform: 'scale(1.02)',
        }
    },
    cardImage: {
        height: 200
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 600,
        color: theme.colors.yellow[6]
    },
    headingSubTitle: {
        fontSize: 14,
        fontWeight: 600
    },
    sepratorDot: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: -16
    }
})
export default styles