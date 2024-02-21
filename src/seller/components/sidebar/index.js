import { Fragment } from "react";
import { FiBox } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

export const Sidebar = ({ children}) =>  (<div className="w-[220px] fixed top-0 left-0 bottom-0 bg-purple-500 z-50">{children}</div>) ;

Sidebar.Child = ({ name = "", href = "#!", icon: Icon }) => {

    return (
        <Fragment>
            <Link to={href} className=" text-white  hover:text-purple-800">
                <div className={`py-[6px] w-full px-4 items-center  flex gap-x-2 ${window.location.pathname==href?'bg-[#ffffff2c] text-white':''}`}>
                    <div className="pl-8 pt-1">{Icon}</div>
                    <p className=" text-lg">{name}</p>
                </div>
            </Link>
        </Fragment>
    )
}