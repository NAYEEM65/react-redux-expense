import React from 'react';
import loadingSpiner from '../../../assets/LoadingSpiner.svg';

const Loading = () => {
    return (
        <div className="loading">
            <img src={loadingSpiner} alt="loadingSpiner" />;
        </div>
    );
};

export default Loading;
