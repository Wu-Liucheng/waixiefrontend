import React, { Component } from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store/index';
import Login from './pages/login';
import MainInterface from './pages/mainInterface';
import PersonalNeedingLists from './pages/personalNeedingLists';
import NeedingDetails from './pages/needingDetails';
import NeedingLists from './pages/needingLists';
import Register from './pages/register';
import Forget from './pages/forget';
import SelfInfo from './pages/selfInfo';
import adminMain from './adminPages/adminMain';
import adminLogin from './adminPages/adminLogin';
class App extends Component {
    render() {
        return (
            <div>
                {/*provider内部的组件可以使用store*/}
                <Provider store={store}>
                    <div>
                        <BrowserRouter>
                            <div>
                                <Route path = '/' exact component = {Login}/>
                                <Route path = '/main' exact component = {MainInterface}/>
                                <Route path = '/personal' exact component = {PersonalNeedingLists}/>
                                <Route path = '/details' exact component = {NeedingDetails}/>
                                <Route path = '/lists' exact component = {NeedingLists}/>
                                <Route path = '/register' exact component = {Register}/>
                                <Route path = '/forget' exact component = {Forget}/>
                                <Route path = '/self' exact component = {SelfInfo}/>
                                <Route path = '/admin' exact component = {adminLogin}/>
                                <Route path = '/admin/main' exact component = {adminMain}/>
                            </div>
                        </BrowserRouter>
                    </div>
                </Provider>
            </div>
        );
    }
}

export default App;
