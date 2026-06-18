import { createStyles } from 'antd-style';

const useStyles = createStyles(() => {
  return {
    main: {
      width: 368,
      margin: '0 auto',
      padding: '24px 0',

      h3: {
        marginBottom: 24,
        fontSize: 24,
        fontWeight: 600,
        textAlign: 'center',
      },
    },

    footer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      alignItems: 'center',
      width: '100%',
    },

    submit: {
      width: '100%',
    },
  };
});

export default useStyles;
