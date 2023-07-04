import logo from '../../assets/images/logo.svg';
import './loadingSpinner.scss';

const LoadingSpinner = ({loading = true, size = 32}) => {

    if (!loading) {
        return null;

    }

    return (
        <img className="loading-spinner" src={logo} width={size} height={size} alt="loading"/>
    )
}

export default LoadingSpinner;