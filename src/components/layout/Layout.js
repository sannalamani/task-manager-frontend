import React, { useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Outlet } from 'react-router-dom';


const Header = () => {
    const { logout, user } = useContext(AuthContext);
    return (
        <div>
            <div className=" bg-slate-900 h-12 flex">
                <h1 className="text-white text-2xl font-bold ml-8 my-auto"> Boyager </h1>
                <div className="w-full flex flex-row justify-end items-center gap-8 mr-8">
                    <h1 className="text-white text-xl font-bold"> {user?.name}</h1>
                    <button
                        className="text-white font-semibold bg-red-700 rounded-2xl px-3 my-auto"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default Header;