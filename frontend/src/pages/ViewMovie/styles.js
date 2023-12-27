const styles = (theme) => ({
    card: {
        height: '100%'
    },
    movieTitle: {
        fontSize: 24,
        fontWeight: 600,
        color: theme.colors.yellow[6]
    },
    secondaryText: {
        fontSize: 14,
        fontStyle: 'italic',
        fontWeight: 600
    },
    styledHead: {
        fontSize: 16,
        fontWeight: 600,
        backgroundColor: theme.colors.yellow[6],
        color: theme.white,
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 16,
        paddingLeft: 16,
        borderRadius: 10
    },
    mainHeading: {
        fontSize: 32,
        fontWeight: 600,
        marginBottom: 8,
        textAlign: 'center'
    }
})

export default styles