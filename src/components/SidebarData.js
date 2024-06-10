import React from 'react';
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome size={28}/>,
        className: 'nav-text'
    },
    {
        title: 'Matches',
        path: '/games',
        icon: <IoIcons.IoIosPaper size={28}/>,
        className: 'nav-text'
    },
    {
        title: 'Side Bets',
        path: '/side-bets',
        icon: <BsIcons.BsCash size={28}/>,
        className: 'nav-text'
    },
    {
        title: 'Table',
        path: '/table',
        icon: <AiIcons.AiOutlineTrophy size={28}/>,
        className: 'nav-text'
    }   
]
    