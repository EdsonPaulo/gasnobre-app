import colors from './colors';
import metrics from './metrics';

const general = {
  background: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  container: {
    padding: metrics.baseMargin,
  },
  card: {
    borderRadius: 5,
    padding: metrics.baseMargin,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 4,
  },
  headerButton: {
    width: 40,
    height: 40,
    marginLeft: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default general;
