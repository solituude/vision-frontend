import {Outlet} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-resizable/css/styles.css';
import 'app/app.scss';


const App = () => {
    return (
        <div className={"background__loader"}>
            <Outlet/>
        </div>
    );
};

export default App;
